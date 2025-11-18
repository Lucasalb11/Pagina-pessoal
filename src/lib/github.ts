/**
 * GitHub API Service
 * Fetches repositories from GitHub API
 */

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
}

/**
 * Fetches all public repositories for a GitHub user
 */
export async function fetchGitHubRepos(username: string): Promise<Project[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=all`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    return repos.map((repo) => ({
      id: repo.id,
      title: repo.name,
      description: repo.description || "No description available",
      tech: [repo.language || "Other", ...repo.topics].filter(Boolean),
      github: repo.html_url,
      homepage: repo.homepage || undefined,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      topics: repo.topics,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    throw error;
  }
}

/**
 * Fetches a single repository by name
 */
export async function fetchGitHubRepo(username: string, repoName: string): Promise<Project | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repo: GitHubRepo = await response.json();
    
    return {
      id: repo.id,
      title: repo.name,
      description: repo.description || "No description available",
      tech: [repo.language || "Other", ...repo.topics].filter(Boolean),
      github: repo.html_url,
      homepage: repo.homepage || undefined,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      topics: repo.topics,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
    };
  } catch (error) {
    console.error("Error fetching GitHub repo:", error);
    return null;
  }
}

