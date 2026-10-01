import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface MdxEntry<T = Record<string, unknown>> {
  slug: string;
  frontmatter: T;
  source: string;
}

/** Load content/<dir>/<slug>.mdx, or null if it doesn't exist. */
export async function loadMdx<T = Record<string, unknown>>(
  dir: string,
  slug: string,
): Promise<MdxEntry<T> | null> {
  try {
    const raw = await readFile(path.join(CONTENT_ROOT, dir, `${slug}.mdx`), "utf8");
    const parsed = matter(raw);
    return { slug, frontmatter: parsed.data as T, source: parsed.content };
  } catch {
    return null;
  }
}
