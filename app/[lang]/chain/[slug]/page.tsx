import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import { CHAINS, getChainBySlug, getProjectsForChain } from "@/data/projects.config";
import { CERTS } from "@/data/certs.config";
import CredentialChip from "@/components/CredentialChip";
import { LANGS, getDict, isLang, langPath, type Lang } from "@/lib/i18n";

export async function generateStaticParams() {
  return LANGS.flatMap((lang) => CHAINS.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const chain = getChainBySlug(slug);
  if (!chain) return { title: "Not found" };
  const t = getDict(lang);
  const meta = t.meta.chain(chain.name, chain.blurb);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://lucasalmeida.me/${lang}/chain/${slug}` },
  };
}

export default async function ChainPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const t = getDict(lang);
  const chain = getChainBySlug(slug);
  if (!chain) notFound();

  const projects = getProjectsForChain(chain);
  const chainCerts = CERTS.filter((c) => c.ecosystem === chain.ecosystem);

  return (
    <main className="mx-auto max-w-2xl px-6">
      <article className="pt-4 pb-16">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)] mb-6">
          <Link href={langPath(lang, "/work")} className="hover:text-[color:var(--color-foreground)]">
            {t.chain.back}
          </Link>
        </p>

        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] font-mono text-[10px] font-bold tracking-wider text-[color:var(--color-primary)]">
            {chain.id}
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)]">
            {chain.focus}
          </span>
        </div>

        <h1 className="font-editorial text-[3rem] sm:text-[4rem] leading-[0.95] mb-6">
          {chain.name}
        </h1>
        <p className="text-[17px] leading-relaxed text-[color:var(--color-foreground)]/85 max-w-prose pb-8 border-b border-[color:var(--color-border)]">
          {chain.blurb}
        </p>

        <section className="pt-8 pb-12">
          <p className="text-caps mb-6">{t.chain.projects}</p>
          {projects.length > 0 ? (
            <div className="flex flex-col">
              {projects.map((s) => (
                <ProjectRow key={s.id} ship={s} lang={lang} />
              ))}
            </div>
          ) : (
            <EmptyProjects lang={lang} template={t.chain.projectsEmpty} />
          )}
        </section>

        {chainCerts.length > 0 ? (
          <section className="pt-8 pb-8 border-t border-[color:var(--color-border)]">
            <p className="text-caps mb-4">{t.chain.credentials}</p>
            <div className="flex flex-wrap gap-1.5">
              {chainCerts.map((c) => (
                <CredentialChip key={c.credentialId} cert={c} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="pt-8 border-t border-[color:var(--color-border)]">
          <p className="text-caps mb-4">{t.chain.others}</p>
          <div className="flex flex-wrap gap-2">
            {CHAINS.filter((c) => c.slug !== chain.slug).map((c) => (
              <Link
                key={c.slug}
                href={langPath(lang, `/chain/${c.slug}`)}
                className="link-bracket font-mono text-[11px] tracking-[0.14em] uppercase hover:text-[color:var(--color-primary)]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

function EmptyProjects({
  lang,
  template,
}: {
  lang: Lang;
  template: (a: string, ac: string, b: string, bc: string) => string;
}) {
  const OA = "@@lopen@@";
  const OC = "@@lclose@@";
  const OB = "@@wopen@@";
  const OBC = "@@wclose@@";
  const raw = template(OA, OC, OB, OBC);
  const pattern = /(@@lopen@@[\s\S]*?@@lclose@@|@@wopen@@[\s\S]*?@@wclose@@)/g;
  const parts = raw.split(pattern);
  return (
    <p className="text-[color:var(--color-muted-foreground)]">
      {parts.map((part, i) => {
        if (part.startsWith(OA)) {
          const inner = part.slice(OA.length, part.length - OC.length);
          return (
            <Link key={i} href={langPath(lang, "/work")} className="link-bracket text-[color:var(--color-primary)]">
              {inner}
            </Link>
          );
        }
        if (part.startsWith(OB)) {
          const inner = part.slice(OB.length, part.length - OBC.length);
          return (
            <Link key={i} href={langPath(lang, "/writing")} className="link-bracket text-[color:var(--color-primary)]">
              {inner}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
