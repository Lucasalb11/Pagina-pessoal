import { PROJECTS, type Project } from "@/data/projects";

export const GITHUB_USER = "Lucasalb11";
export const PORTFOLIO_TAG = "portfolio";
/** Repos carrying this GitHub topic are listed even when absent from data/projects.ts. */
const PORTFOLIO_TOPIC = "portfolio";
const REVALIDATE = 3600;

interface GithubRepo {
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  topics?: string[];
  language: string | null;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

interface VercelProject {
  link?: { type?: string; org?: string; repo?: string };
  targets?: { production?: { alias?: string[] } };
  alias?: { domain?: string }[];
}

export interface ResolvedProject extends Project {
  /** Verified-reachable live URL, if any. */
  liveUrl?: string;
  liveSource?: "vercel" | "github" | "config";
  pushedAt?: string;
}

export interface ExtraBuild {
  name: string;
  summary: string;
  repoUrl: string;
  liveUrl?: string;
  language: string | null;
}

const repoKey = (fullName: string) => fullName.toLowerCase();

async function getGithubRepos(): Promise<GithubRepo[]> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      { headers, next: { revalidate: REVALIDATE, tags: [PORTFOLIO_TAG] } },
    );
    if (!res.ok) return [];
    return (await res.json()) as GithubRepo[];
  } catch {
    return [];
  }
}

/** Production domain of every Vercel project linked to one of my GitHub repos. */
async function getVercelDomains(): Promise<Map<string, string>> {
  const domains = new Map<string, string>();
  const token = process.env.VERCEL_TOKEN;
  if (!token) return domains;
  const team = process.env.VERCEL_TEAM_ID ? `&teamId=${process.env.VERCEL_TEAM_ID}` : "";
  try {
    const res = await fetch(`https://api.vercel.com/v9/projects?limit=100${team}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE, tags: [PORTFOLIO_TAG] },
    });
    if (!res.ok) return domains;
    const { projects } = (await res.json()) as { projects: VercelProject[] };
    for (const p of projects) {
      if (p.link?.type !== "github" || !p.link.org || !p.link.repo) continue;
      if (p.link.org.toLowerCase() !== GITHUB_USER.toLowerCase()) continue;
      const domain =
        p.targets?.production?.alias?.[0] ?? p.alias?.find((a) => a.domain)?.domain;
      if (domain) domains.set(repoKey(`${p.link.org}/${p.link.repo}`), `https://${domain}`);
    }
  } catch {
    // Vercel unreachable: fall back to GitHub homepages.
  }
  return domains;
}

function normaliseUrl(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  const url = raw.startsWith("http") ? raw : `https://${raw}`;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? parsed.toString().replace(/\/$/, "") : undefined;
  } catch {
    return undefined;
  }
}

/** A link is only shown if it answers. Dead deployments are hidden, not advertised. */
async function isReachable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(6000),
      next: { revalidate: REVALIDATE, tags: [PORTFOLIO_TAG] },
    });
    return res.status < 400;
  } catch {
    return false;
  }
}

async function firstReachable(
  candidates: { url?: string; source: ResolvedProject["liveSource"] }[],
) {
  for (const c of candidates) {
    if (c.url && (await isReachable(c.url))) return c;
  }
  return undefined;
}

export async function getPortfolio(): Promise<{
  projects: ResolvedProject[];
  extras: ExtraBuild[];
}> {
  const [repos, vercel] = await Promise.all([getGithubRepos(), getVercelDomains()]);
  const byRepo = new Map(repos.map((r) => [repoKey(r.full_name), r]));

  const projects = await Promise.all(
    PROJECTS.map(async (p): Promise<ResolvedProject> => {
      const key = repoKey(p.repo);
      const gh = byRepo.get(key);
      const hit = await firstReachable([
        { url: vercel.get(key), source: "vercel" },
        { url: normaliseUrl(gh?.homepage), source: "github" },
        { url: p.live, source: "config" },
      ]);
      return { ...p, liveUrl: hit?.url, liveSource: hit?.source, pushedAt: gh?.pushed_at };
    }),
  );

  const known = new Set(PROJECTS.map((p) => repoKey(p.repo)));
  const extras = await Promise.all(
    repos
      .filter(
        (r) =>
          !r.fork &&
          !r.archived &&
          r.topics?.includes(PORTFOLIO_TOPIC) &&
          !known.has(repoKey(r.full_name)),
      )
      .map(async (r): Promise<ExtraBuild> => {
        const hit = await firstReachable([
          { url: vercel.get(repoKey(r.full_name)), source: "vercel" },
          { url: normaliseUrl(r.homepage), source: "github" },
        ]);
        return {
          name: r.name,
          summary: r.description ?? "",
          repoUrl: r.html_url,
          liveUrl: hit?.url,
          language: r.language,
        };
      }),
  );

  return { projects, extras };
}
