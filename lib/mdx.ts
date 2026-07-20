import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface MdxEntry<T = Record<string, unknown>> {
  slug: string;
  lang: "en" | "pt";
  frontmatter: T;
  source: string;
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await readFile(p, "utf8");
    return true;
  } catch {
    return false;
  }
}

/**
 * Load one MDX file at content/<dir>/<slug>.<lang>.mdx.
 * Falls back to content/<dir>/<slug>.mdx (no lang suffix) if the localized file
 * is missing, then to English.
 */
export async function loadMdx<T = Record<string, unknown>>(
  dir: string,
  slug: string,
  lang: "en" | "pt" = "en",
): Promise<MdxEntry<T> | null> {
  const candidates = [
    path.join(CONTENT_ROOT, dir, `${slug}.${lang}.mdx`),
    path.join(CONTENT_ROOT, dir, `${slug}.mdx`),
    path.join(CONTENT_ROOT, dir, `${slug}.en.mdx`),
  ];

  for (const filePath of candidates) {
    if (await fileExists(filePath)) {
      const raw = await readFile(filePath, "utf8");
      const parsed = matter(raw);
      return {
        slug,
        lang,
        frontmatter: parsed.data as T,
        source: parsed.content,
      };
    }
  }
  return null;
}

/**
 * List all slugs available under content/<dir>, deduped across language variants.
 */
export async function listMdxSlugs(dir: string): Promise<string[]> {
  const abs = path.join(CONTENT_ROOT, dir);
  try {
    const files = await readdir(abs);
    const slugs = new Set<string>();
    for (const f of files) {
      if (!f.endsWith(".mdx")) continue;
      // strip .mdx and any .en / .pt suffix
      const bare = f.replace(/\.mdx$/, "").replace(/\.(en|pt)$/, "");
      slugs.add(bare);
    }
    return [...slugs];
  } catch {
    return [];
  }
}

/**
 * Estimate reading time in minutes (assumes ~230 WPM for editorial pace).
 */
export function readingMinutes(source: string): number {
  const words = source.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
