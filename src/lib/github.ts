/**
 * GitHub API Service
 * Fetches repositories from GitHub API
 */

const BADGE_DOMAINS = [
  'shields.io', 'badgen.net', 'img.shields.io', 'badge.fury.io',
  'travis-ci.org', 'travis-ci.com', 'circleci.com', 'codecov.io',
  'coveralls.io', 'snyk.io', 'david-dm.org', 'npmjs.com',
];

function isBadgeImage(url: string): boolean {
  try {
    const parsed = new URL(url);
    return BADGE_DOMAINS.some(domain => parsed.hostname.includes(domain));
  } catch {
    return false;
  }
}

function sanitizeImageUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;
    return url;
  } catch {
    return null;
  }
}

function resolveReadmeImageUrl(imageUrl: string, username: string, repoName: string, branch: string): string | null {
  const trimmed = imageUrl.trim();
  if (!trimmed) return null;

  // Already absolute URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    // Convert GitHub blob URLs to raw URLs
    const rawUrl = trimmed.replace(
      /https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\//,
      'https://raw.githubusercontent.com/$1/$2/'
    );
    if (isBadgeImage(rawUrl)) return null;
    return sanitizeImageUrl(rawUrl);
  }

  // Relative path → raw.githubusercontent.com
  const cleanPath = trimmed.replace(/^\.?\//, '');
  const raw = `https://raw.githubusercontent.com/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}/${branch}/${cleanPath}`;
  return sanitizeImageUrl(raw);
}

/**
 * Fetches the first meaningful image from a repository's README
 */
export async function fetchReadmeImage(username: string, repoName: string): Promise<string | null> {
  const branches = ['main', 'master'];

  for (const branch of branches) {
    try {
      const url = `https://raw.githubusercontent.com/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}/${branch}/README.md`;
      const response = await fetch(url);
      if (!response.ok) continue;

      const content = await response.text();

      // Extract all image URLs from markdown and HTML img tags
      const mdImages = [...content.matchAll(/!\[.*?\]\(([^)]+)\)/g)].map(m => m[1]);
      const htmlImages = [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
      const candidates = [...mdImages, ...htmlImages];

      for (const candidate of candidates) {
        const resolved = resolveReadmeImageUrl(candidate, username, repoName, branch);
        if (resolved) return resolved;
      }
    } catch {
      continue;
    }
  }

  return null;
}

/**
 * Enriches a list of projects with README images
 */
export async function enrichReposWithImages(repos: Project[], username: string): Promise<Project[]> {
  const results = await Promise.allSettled(
    repos.map(async (repo) => {
      if (repo.image) return repo;
      const image = await fetchReadmeImage(username, repo.title);
      return image ? { ...repo, image } : repo;
    })
  );

  return results.map((result, i) =>
    result.status === 'fulfilled' ? result.value : repos[i]
  );
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  homepage?: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  image?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
  size: number;
}

/**
 * Validates GitHub username to prevent injection attacks
 */
function validateUsername(username: string): boolean {
  if (!username || typeof username !== 'string') {
    return false;
  }
  // GitHub usernames can only contain alphanumeric characters and hyphens
  // Must be between 1 and 39 characters
  const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?![.-])){0,37}[a-zA-Z0-9]?$/;
  return usernameRegex.test(username) && username.length <= 39;
}

/**
 * Sanitizes repository data
 */
function sanitizeRepoData(repo: GitHubRepo): Project {
  return {
    id: repo.id,
    title: (repo.name || '').substring(0, 200),
    description: (repo.description || "No description available").substring(0, 2000),
    tech: [
      repo.language || "Other",
      ...(repo.topics || []).slice(0, 20).filter(Boolean)
    ].filter(Boolean),
    github: repo.html_url || '',
    homepage: repo.homepage ? repo.homepage.substring(0, 2048) : undefined,
    stars: Math.max(0, Math.min(1000000, repo.stargazers_count || 0)),
    forks: Math.max(0, Math.min(1000000, repo.forks_count || 0)),
    language: repo.language ? repo.language.substring(0, 50) : null,
    topics: (repo.topics || []).slice(0, 20),
    createdAt: repo.created_at || new Date().toISOString(),
    updatedAt: repo.updated_at || new Date().toISOString(),
    size: Math.max(0, repo.size || 0),
  };
}

/**
 * Fetches all public repositories for a GitHub user
 */
export async function fetchGitHubRepos(username: string): Promise<Project[]> {
  // Validate username to prevent injection
  if (!validateUsername(username)) {
    throw new Error("Invalid GitHub username");
  }

  try {
    // Encode username to prevent URL injection
    const encodedUsername = encodeURIComponent(username);
    const url = `https://api.github.com/users/${encodedUsername}/repos?sort=updated&per_page=100&type=all`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${username}" not found`);
      }
      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded");
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    if (!Array.isArray(repos)) {
      throw new Error("Invalid response from GitHub API");
    }
    
    // Sanitize all repository data
    return repos.map(sanitizeRepoData);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    throw error;
  }
}

/**
 * Validates repository name
 */
function validateRepoName(repoName: string): boolean {
  if (!repoName || typeof repoName !== 'string') {
    return false;
  }
  // Repository names can contain alphanumeric, hyphens, underscores, and dots
  const repoNameRegex = /^[a-zA-Z0-9._-]+$/;
  return repoNameRegex.test(repoName) && repoName.length <= 100;
}

/**
 * Fetches a single repository by name
 */
export async function fetchGitHubRepo(username: string, repoName: string): Promise<Project | null> {
  // Validate inputs
  if (!validateUsername(username) || !validateRepoName(repoName)) {
    throw new Error("Invalid username or repository name");
  }

  try {
    // Encode to prevent URL injection
    const encodedUsername = encodeURIComponent(username);
    const encodedRepoName = encodeURIComponent(repoName);
    const url = `https://api.github.com/repos/${encodedUsername}/${encodedRepoName}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded");
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repo: GitHubRepo = await response.json();
    
    // Sanitize repository data
    return sanitizeRepoData(repo);
  } catch (error) {
    console.error("Error fetching GitHub repo:", error);
    return null;
  }
}

