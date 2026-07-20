import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { loadMdx, listMdxSlugs, readingMinutes } from "@/lib/mdx";
import { LANGS, getDict, isLang, langPath, type Lang } from "@/lib/i18n";

interface EssayFrontmatter {
  title?: string;
  date?: string;
  summary?: string;
  tags?: string[];
}

export async function generateStaticParams() {
  const slugs = await listMdxSlugs("writing");
  return LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const entry = await loadMdx<EssayFrontmatter>("writing", slug, lang);
  if (!entry) return { title: "Not found" };
  return {
    title: entry.frontmatter.title ?? slug,
    description: entry.frontmatter.summary,
    alternates: { canonical: `https://lucasalmeida.me/${lang}/writing/${slug}` },
    openGraph: {
      title: entry.frontmatter.title,
      description: entry.frontmatter.summary,
      type: "article",
      publishedTime: entry.frontmatter.date,
    },
  };
}

export default async function Essay({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const t = getDict(lang);
  const entry = await loadMdx<EssayFrontmatter>("writing", slug, lang);
  if (!entry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.frontmatter.title,
    description: entry.frontmatter.summary,
    datePublished: entry.frontmatter.date,
    author: { "@id": "https://lucasalmeida.me/#lucas" },
    mainEntityOfPage: `https://lucasalmeida.me/${lang}/writing/${slug}`,
    inLanguage: lang === "pt" ? "pt-BR" : "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-2xl px-6">
        <article className="pt-4 pb-16">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)] mb-6">
            <Link href={langPath(lang, "/writing")} className="hover:text-[color:var(--color-foreground)]">
              {t.writing.back}
            </Link>
          </p>

          <div className="flex items-center gap-3 mb-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)]">
            {entry.frontmatter.date ? <span>{entry.frontmatter.date}</span> : null}
            <span className="opacity-40">·</span>
            <span>{readingMinutes(entry.source)} {t.writing.minRead}</span>
          </div>

          <h1 className="font-editorial text-[2.5rem] sm:text-[3.5rem] leading-[1] mb-6">
            {entry.frontmatter.title ?? slug}
          </h1>
          {entry.frontmatter.summary ? (
            <p className="font-editorial italic text-xl leading-snug text-[color:var(--color-foreground)]/85 mb-8 pb-8 border-b border-[color:var(--color-border)]">
              {entry.frontmatter.summary}
            </p>
          ) : (
            <div className="mb-8 pb-8 border-b border-[color:var(--color-border)]" />
          )}

          <div>
            <MDXRemote source={entry.source} components={mdxComponents} />
          </div>

          <div className="mt-16 pt-8 border-t border-[color:var(--color-border)] flex items-center justify-between flex-wrap gap-4">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[color:var(--color-muted-foreground)]">
              {t.writing.sig}
            </p>
            <a
              href="mailto:lucasalb11@gmail.com"
              className="link-bracket font-mono text-[11px] tracking-[0.14em] uppercase hover:text-[color:var(--color-primary)]"
            >
              {t.writing.replyByEmail}
            </a>
          </div>
        </article>
      </main>
    </>
  );
}
