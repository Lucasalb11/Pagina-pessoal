import type { MetadataRoute } from "next";
import { LANGS } from "@/lib/i18n";
import { CHAINS } from "@/data/projects.config";
import { SHIPS } from "@/data/projects.config";
import { listMdxSlugs } from "@/lib/mdx";

const SITE = "https://lucasalmeida.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const writingSlugs = await listMdxSlugs("writing");
  const workSlugs = await listMdxSlugs("work");

  const now = new Date().toISOString();

  const staticPaths = ["", "/work", "/writing", "/credentials"];
  const chainPaths = CHAINS.map((c) => `/chain/${c.slug}`);
  const workPaths = SHIPS.map((s) => `/work/${s.id}`).concat(
    workSlugs.filter((slug) => !SHIPS.some((s) => s.id === slug)).map((slug) => `/work/${slug}`),
  );
  const writingPaths = writingSlugs.map((slug) => `/writing/${slug}`);

  const allPaths = [...staticPaths, ...chainPaths, ...workPaths, ...writingPaths];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of allPaths) {
    for (const lang of LANGS) {
      entries.push({
        url: `${SITE}/${lang}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : path.startsWith("/writing/") || path.startsWith("/work/") ? 0.6 : 0.8,
        alternates: {
          languages: {
            en: `${SITE}/en${path}`,
            "pt-BR": `${SITE}/pt${path}`,
          },
        },
      });
    }
  }

  // Root redirects to /en; include so crawlers know it's canonical.
  entries.unshift({
    url: `${SITE}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  return entries;
}
