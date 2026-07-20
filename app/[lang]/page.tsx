import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import LiveOnChainBadge from "@/components/LiveOnChainBadge";
import ProjectRow from "@/components/ProjectRow";
import CredentialChip from "@/components/CredentialChip";
import { SHIPS } from "@/data/projects.config";
import { CERTS } from "@/data/certs.config";
import { listMdxSlugs, loadMdx, readingMinutes } from "@/lib/mdx";
import { getDict, isLang, langPath, type Lang } from "@/lib/i18n";

export const revalidate = 60;

const CREDENTIAL_ORDER = [
  "ackee-sos-8",
  "colosseum-frontier",
  "stellar-build",
  "nearx-rust-wasm",
  "nearx-solidity",
  "defiverso",
];

interface EssayFm {
  title?: string;
  date?: string;
  summary?: string;
}

function formatDate(iso: string) {
  const [y, m] = iso.split("-");
  return `${y}·${m}`;
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
    title: t.meta.home.title,
    description: t.meta.home.description,
    alternates: {
      canonical: `https://lucasalmeida.me/${lang}`,
      languages: {
        en: "https://lucasalmeida.me/en",
        "pt-BR": "https://lucasalmeida.me/pt",
      },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const t = getDict(lang);

  const featuredCredentials = CREDENTIAL_ORDER
    .map((id) => CERTS.find((c) => c.credentialId === id))
    .filter((c): c is (typeof CERTS)[number] => Boolean(c));

  const writingSlugs = await listMdxSlugs("writing");
  const writingEntries = (
    await Promise.all(
      writingSlugs.map(async (slug) => {
        const entry = await loadMdx<EssayFm>("writing", slug, lang);
        return entry ? { slug, entry } : null;
      }),
    )
  )
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .sort((a, b) =>
      (b.entry.frontmatter.date ?? "").localeCompare(a.entry.frontmatter.date ?? ""),
    )
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-2xl px-6">
      {/* Hero */}
      <section className="pt-8 pb-20">
        <p className="text-caps mb-6">{t.home.eyebrow}</p>
        <h1 className="font-editorial text-[3.25rem] sm:text-[4.5rem] leading-[0.95] mb-8">
          Lucas de Almeida.
        </h1>
        <p className="text-lg leading-relaxed text-[color:var(--color-foreground)]/85 mb-4">
          {t.home.role}{" "}
          <span className="text-[color:var(--color-muted-foreground)]">{t.home.roleTags}</span>
        </p>
        <p className="font-editorial italic text-xl leading-snug text-[color:var(--color-foreground)]/85 mb-8">
          {t.home.thesis}
        </p>
        <div className="mb-8">
          <Suspense fallback={<BadgeSkeleton />}>
            <LiveOnChainBadge />
          </Suspense>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase">
          <a
            href="mailto:lucasalb11@gmail.com"
            className="link-bracket text-[color:var(--color-foreground)] hover:text-[color:var(--color-primary)]"
          >
            {t.home.actions.email}
          </a>
          <a
            href="https://github.com/Lucasalb11"
            target="_blank"
            rel="noopener noreferrer"
            className="link-bracket hover:text-[color:var(--color-primary)]"
          >
            {t.home.actions.github}
          </a>
          <a
            href="/lucas-almeida-cv.pdf"
            className="link-bracket hover:text-[color:var(--color-primary)]"
          >
            {t.home.actions.cv}
          </a>
        </div>
      </section>

      {/* Currently building */}
      <section className="py-16 border-t border-[color:var(--color-border)]">
        <div className="flex items-baseline justify-between mb-6">
          <p className="text-caps">{t.home.now}</p>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)]">
            {t.home.nowLabel}
          </span>
        </div>
        <StructaBlurb lang={lang} body={t.home.nowBody} />
      </section>

      {/* Selected work */}
      <section className="py-16 border-t border-[color:var(--color-border)]">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-caps">{t.home.work}</p>
          <Link
            href={langPath(lang, "/work")}
            className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]"
          >
            {t.home.workAll}
          </Link>
        </div>
        <div className="flex flex-col">
          {SHIPS.map((s) => (
            <ProjectRow key={s.id} ship={s} lang={lang} />
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="py-16 border-t border-[color:var(--color-border)]">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-caps">{t.home.writing}</p>
          <Link
            href={langPath(lang, "/writing")}
            className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]"
          >
            {t.home.writingAll}
          </Link>
        </div>
        {writingEntries.length === 0 ? (
          <p className="text-[color:var(--color-muted-foreground)]">{t.home.writingEmpty}</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {writingEntries.map(({ slug, entry }) => (
              <li key={slug} className="group border-t border-[color:var(--color-border)] pt-4 first:border-t-0 first:pt-0">
                <Link href={langPath(lang, `/writing/${slug}`)} className="block">
                  <div className="flex items-baseline gap-4 mb-1 flex-wrap">
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[color:var(--color-muted-foreground)] shrink-0">
                      {entry.frontmatter.date ? formatDate(entry.frontmatter.date) : ""}
                    </span>
                    <span className="font-editorial text-xl leading-tight text-[color:var(--color-foreground)] group-hover:text-[color:var(--color-primary)] transition-colors">
                      {entry.frontmatter.title ?? slug}
                      <ArrowUpRight className="inline-block w-3.5 h-3.5 ml-1 opacity-40 group-hover:opacity-100" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[color:var(--color-muted-foreground)]/70">
                      {readingMinutes(entry.source)} {t.home.minRead}
                    </span>
                  </div>
                  {entry.frontmatter.summary ? (
                    <p className="pl-[3.75rem] text-[14px] leading-relaxed text-[color:var(--color-muted-foreground)]">
                      {entry.frontmatter.summary}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Track record */}
      <section className="py-16 border-t border-[color:var(--color-border)]">
        <p className="text-caps mb-8">{t.home.track}</p>
        <ul className="flex flex-col gap-6 text-[15px] leading-relaxed">
          <li>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)] mb-1">
              {t.home.trackRoles.arcos.period}
            </div>
            <div>
              <span className="font-editorial text-xl text-[color:var(--color-foreground)]">
                {t.home.trackRoles.arcos.title}
              </span>{" "}
              <span className="text-[color:var(--color-muted-foreground)]">
                — {t.home.trackRoles.arcos.role}
              </span>
            </div>
            <p className="mt-1 text-[color:var(--color-foreground)]/80">
              {t.home.trackRoles.arcos.body}
            </p>
          </li>
          <li>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)] mb-1">
              {t.home.trackRoles.indep.period}
            </div>
            <div>
              <span className="font-editorial text-xl text-[color:var(--color-foreground)]">
                {t.home.trackRoles.indep.title}
              </span>
            </div>
            <p className="mt-1 text-[color:var(--color-foreground)]/80">
              {t.home.trackRoles.indep.body}
            </p>
          </li>
        </ul>
        <p className="mt-8 font-mono text-[11px] tracking-[0.14em] uppercase">
          <a href="/lucas-almeida-cv.pdf" className="link-bracket hover:text-[color:var(--color-primary)]">
            {t.home.fullCv}
          </a>
        </p>
      </section>

      {/* Credentials chip row */}
      <section className="py-16 border-t border-[color:var(--color-border)]">
        <div className="flex items-baseline justify-between mb-6">
          <p className="text-caps">{t.home.credentials}</p>
          <Link
            href={langPath(lang, "/credentials")}
            className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]"
          >
            {t.home.credentialsProof}
          </Link>
        </div>
        <p className="text-[14px] text-[color:var(--color-muted-foreground)] mb-5 max-w-prose">
          {t.home.credentialsIntro}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {featuredCredentials.map((c) => (
            <CredentialChip key={c.credentialId} cert={c} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 border-t border-[color:var(--color-border)]">
        <p className="text-caps mb-6">{t.home.contact}</p>
        <p className="font-editorial text-3xl leading-tight mb-4">{t.home.contactTitle}</p>
        <p className="text-[15px] leading-relaxed text-[color:var(--color-foreground)]/85 mb-6 max-w-prose">
          {t.home.contactBody}
        </p>
        <a
          href="mailto:lucasalb11@gmail.com"
          className="inline-flex items-center gap-2 font-mono text-sm tracking-wide text-[color:var(--color-primary)] border-b border-[color:var(--color-primary)]/40 hover:border-[color:var(--color-primary)] pb-0.5"
        >
          lucasalb11@gmail.com
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </section>
    </main>
  );
}

function BadgeSkeleton() {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--color-border)] font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)]">
      <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-border)]" />
      loading on-chain…
    </span>
  );
}

/**
 * Renders the "currently building" paragraph — parses the dict template's placeholders
 * and turns them into real Next Links to the Structa deep-dive.
 */
function StructaBlurb({
  lang,
  body,
}: {
  lang: Lang;
  body: (a: string, ac: string, b: string, bc: string) => string;
}) {
  const OPEN_A = "@@sopen@@";
  const CLOSE_A = "@@sclose@@";
  const OPEN_B = "@@dopen@@";
  const CLOSE_B = "@@dclose@@";
  const raw = body(OPEN_A, CLOSE_A, OPEN_B, CLOSE_B);
  const structaHref = langPath(lang, "/work/structa");

  const pattern = /(@@sopen@@[\s\S]*?@@sclose@@|@@dopen@@[\s\S]*?@@dclose@@)/g;
  const parts = raw.split(pattern);

  return (
    <p className="text-[17px] leading-relaxed text-[color:var(--color-foreground)]/85">
      {parts.map((part, i) => {
        if (part.startsWith(OPEN_A)) {
          const inner = part.slice(OPEN_A.length, part.length - CLOSE_A.length);
          return (
            <Link
              key={i}
              href={structaHref}
              className="font-editorial text-2xl text-[color:var(--color-foreground)] hover:text-[color:var(--color-primary)] transition-colors"
            >
              {inner}
            </Link>
          );
        }
        if (part.startsWith(OPEN_B)) {
          const inner = part.slice(OPEN_B.length, part.length - CLOSE_B.length);
          return (
            <Link
              key={i}
              href={structaHref}
              className="link-bracket text-[color:var(--color-primary)] hover:opacity-70"
            >
              {inner}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
