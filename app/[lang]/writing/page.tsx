import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { listMdxSlugs, loadMdx, readingMinutes } from "@/lib/mdx";
import { getDict, isLang, langPath, type Lang } from "@/lib/i18n";

interface EssayFrontmatter {
  title?: string;
  date?: string;
  summary?: string;
  tags?: string[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const t = getDict(lang);
  return {
    title: t.meta.writing.title,
    description: t.meta.writing.description,
    alternates: { canonical: `https://lucasalmeida.me/${lang}/writing` },
  };
}

export default async function WritingIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const t = getDict(lang);

  const slugs = await listMdxSlugs("writing");
  const entries = (
    await Promise.all(
      slugs.map(async (slug) => {
        const entry = await loadMdx<EssayFrontmatter>("writing", slug, lang);
        return entry ? { slug, entry } : null;
      }),
    )
  )
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .sort((a, b) =>
      (b.entry.frontmatter.date ?? "").localeCompare(a.entry.frontmatter.date ?? ""),
    );

  return (
    <main className="mx-auto max-w-2xl px-6">
      <section className="pt-4 pb-12">
        <p className="text-caps mb-6">{t.writing.kicker}</p>
        <h1 className="font-editorial text-[3rem] sm:text-[4rem] leading-[0.95] mb-6">
          {t.writing.title}
        </h1>
        <p className="text-[17px] leading-relaxed text-[color:var(--color-foreground)]/85 max-w-prose">
          {t.writing.intro}
        </p>
      </section>

      <section className="pb-16 border-t border-[color:var(--color-border)] pt-8">
        {entries.length === 0 ? (
          <p className="text-[color:var(--color-muted-foreground)]">{t.writing.empty}</p>
        ) : (
          <ul className="flex flex-col">
            {entries.map(({ slug, entry }) => (
              <li
                key={slug}
                className="group border-t border-[color:var(--color-border)] py-6 first:border-t-0 first:pt-0"
              >
                <Link href={langPath(lang, `/writing/${slug}`)} className="block">
                  <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[color:var(--color-muted-foreground)] shrink-0">
                      {entry.frontmatter.date ?? ""}
                    </span>
                    <span className="font-editorial text-2xl leading-tight text-[color:var(--color-foreground)] group-hover:text-[color:var(--color-primary)] transition-colors">
                      {entry.frontmatter.title ?? slug}
                      <ArrowUpRight className="inline-block w-4 h-4 ml-1 opacity-40 group-hover:opacity-100" />
                    </span>
                  </div>
                  {entry.frontmatter.summary ? (
                    <p className="text-[15px] leading-relaxed text-[color:var(--color-muted-foreground)] max-w-prose">
                      {entry.frontmatter.summary}
                    </p>
                  ) : null}
                  <p className="mt-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)]/70">
                    {readingMinutes(entry.source)} {t.writing.minRead}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
