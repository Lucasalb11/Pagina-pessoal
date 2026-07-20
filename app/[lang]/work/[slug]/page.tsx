import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { loadMdx, listMdxSlugs } from "@/lib/mdx";
import { SHIPS } from "@/data/projects.config";
import { solscanAccount } from "@/lib/format";
import { LANGS, getDict, isLang, langPath, type Lang } from "@/lib/i18n";

interface DeepDiveFrontmatter {
  programId?: string;
  network?: string;
  deployedAt?: string;
}

const STATUS_COLOR: Record<string, string> = {
  LIVE:  "text-[color:var(--color-primary)] border-[color:var(--color-primary)]/40 bg-[color:var(--color-primary)]/10",
  BUILT: "text-[color:var(--color-warm)] border-[color:var(--color-warm)]/40 bg-[color:var(--color-warm)]/10",
  WIP:   "text-[color:var(--color-muted-foreground)] border-[color:var(--color-border)] bg-[color:var(--color-surface)]",
};

export async function generateStaticParams() {
  const slugs = await listMdxSlugs("work");
  return LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const ship = SHIPS.find((s) => s.id === slug);
  if (!ship) return { title: "Not found" };
  return {
    title: ship.name,
    description: ship.tagline,
    alternates: { canonical: `https://lucasalmeida.me/${lang}/work/${slug}` },
  };
}

export default async function WorkDeepDive({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const t = getDict(lang);
  const ship = SHIPS.find((s) => s.id === slug);
  if (!ship) notFound();

  const entry = await loadMdx<DeepDiveFrontmatter>("work", slug, lang);

  return (
    <main className="mx-auto max-w-2xl px-6">
      <article className="pt-4 pb-16">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)] mb-6">
          <Link href={langPath(lang, "/work")} className="hover:text-[color:var(--color-foreground)]">
            {t.workDeepDive.back}
          </Link>
        </p>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            className={`font-mono text-[9px] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full border ${STATUS_COLOR[ship.status]}`}
          >
            {ship.status}
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)]">
            {ship.ecosystem}
          </span>
          {entry?.frontmatter.deployedAt ? (
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)]">
              · {entry.frontmatter.deployedAt}
            </span>
          ) : null}
        </div>

        <h1 className="font-editorial text-[3rem] sm:text-[4rem] leading-[0.95] mb-4">
          {ship.name}
        </h1>
        <p className="font-editorial italic text-xl text-[color:var(--color-foreground)]/85 mb-6">
          {ship.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase text-[color:var(--color-muted-foreground)] pb-6 border-b border-[color:var(--color-border)]">
          <span>{ship.stack.join(" · ")}</span>
          {ship.github ? (
            <a
              href={ship.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-bracket inline-flex items-center gap-1 hover:text-[color:var(--color-primary)]"
            >
              <Github className="w-3 h-3" />
              github
            </a>
          ) : null}
          {ship.live ? (
            <a
              href={ship.live}
              target="_blank"
              rel="noopener noreferrer"
              className="link-bracket hover:text-[color:var(--color-primary)]"
            >
              live
            </a>
          ) : null}
        </div>

        {entry?.frontmatter.programId ? (
          <aside className="mt-6 p-4 rounded-xl border border-onchain bg-onchain">
            <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-accent)]">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
              </span>
              {t.workDeepDive.deployedLabel} · {entry.frontmatter.network ?? "devnet"}
            </div>
            <a
              href={solscanAccount(entry.frontmatter.programId)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[color:var(--color-foreground)] break-all inline-flex items-center gap-1 hover:text-[color:var(--color-primary)]"
            >
              {entry.frontmatter.programId}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </aside>
        ) : null}

        <div className="mt-8">
          {entry ? (
            <MDXRemote source={entry.source} components={mdxComponents} />
          ) : (
            <p className="text-[color:var(--color-muted-foreground)]">
              {t.workDeepDive.empty}{" "}
              <a
                href={ship.github ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="link-bracket text-[color:var(--color-primary)]"
              >
                {t.workDeepDive.githubFallback}
              </a>
              .
            </p>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-[color:var(--color-border)]">
          <p className="font-editorial text-2xl leading-tight mb-2">{t.workDeepDive.ctaTitle}</p>
          <p className="text-[15px] leading-relaxed text-[color:var(--color-foreground)]/85 mb-4 max-w-prose">
            {t.workDeepDive.ctaBody}
          </p>
          <a
            href="mailto:lucasalb11@gmail.com"
            className="inline-flex items-center gap-2 font-mono text-sm text-[color:var(--color-primary)] border-b border-[color:var(--color-primary)]/40 hover:border-[color:var(--color-primary)] pb-0.5"
          >
            lucasalb11@gmail.com
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </article>
    </main>
  );
}
