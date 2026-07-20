import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { CERTS, PROGRAM_STATS } from "@/data/certs.config";
import { solscan, solscanAccount, truncateAddress } from "@/lib/format";
import { getDict, isLang, type Lang } from "@/lib/i18n";

const COLLECTION_ADDR = process.env.CERT_COLLECTION ?? "";

const STATUS_STYLE: Record<string, string> = {
  MINTED: "text-[color:var(--color-accent)] bg-onchain border-onchain",
  READY_TO_MINT:
    "text-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10 border-[color:var(--color-primary)]/40",
  PENDING:
    "text-[color:var(--color-muted-foreground)] bg-[color:var(--color-surface)] border-[color:var(--color-border)]",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const t = getDict(lang);
  return {
    title: t.meta.credentials.title,
    description: t.meta.credentials.description,
    alternates: { canonical: `https://lucasalmeida.me/${lang}/credentials` },
  };
}

export default async function CredentialsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const t = getDict(lang);

  return (
    <main className="mx-auto max-w-2xl px-6">
      <section className="pt-4 pb-12">
        <p className="text-caps mb-6">{t.credentials.kicker}</p>
        <h1 className="font-editorial text-[3rem] sm:text-[4rem] leading-[0.95] mb-6">
          {t.credentials.title}
        </h1>
        <CredentialsIntro lang={lang} render={t.credentials.intro} />
      </section>

      <section className="pb-10 border-t border-[color:var(--color-border)] pt-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Stat label={t.credentials.issued} value={PROGRAM_STATS.totalCount} />
          <Stat label={t.credentials.minted} value={PROGRAM_STATS.mintedCount} accent />
          <Stat label={t.credentials.pending} value={PROGRAM_STATS.totalCount - PROGRAM_STATS.mintedCount} />
        </div>
        {COLLECTION_ADDR ? (
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[color:var(--color-muted-foreground)]">
            {t.credentials.collection} ·{" "}
            <a
              href={solscanAccount(COLLECTION_ADDR)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-bracket text-[color:var(--color-accent)] hover:opacity-70"
            >
              {truncateAddress(COLLECTION_ADDR, 6, 6)}
            </a>{" "}
            · MPL Core · devnet
          </p>
        ) : null}
      </section>

      <section className="pb-16 border-t border-[color:var(--color-border)] pt-6">
        <ul className="flex flex-col">
          {CERTS.map((cert) => {
            const href = cert.mintAddress ? solscan(cert.mintAddress) : cert.verifyUrl ?? "#";
            const isOnChain = cert.status === "MINTED" && !!cert.mintAddress;
            return (
              <li
                key={cert.credentialId}
                className="border-t border-[color:var(--color-border)] py-6 first:border-t-0 first:pt-0"
              >
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`font-mono text-[9px] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full border ${STATUS_STYLE[cert.status]}`}
                      >
                        {cert.status.replace("_", " ")}
                      </span>
                      {cert.ecosystem ? (
                        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)]">
                          {cert.ecosystem}
                        </span>
                      ) : null}
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)]">
                        · {cert.dateIssued}
                      </span>
                    </div>
                    <h2 className="font-editorial text-2xl leading-tight text-[color:var(--color-foreground)]">
                      {cert.name}
                    </h2>
                    <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[color:var(--color-muted-foreground)]/80 mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={lang === "pt" ? "Verificar no Solscan" : "Verify on Solscan"}
                    className="shrink-0 inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-accent)]"
                  >
                    {isOnChain ? "solscan" : "issuer"}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-[15px] leading-relaxed text-[color:var(--color-foreground)]/85 max-w-prose mb-2">
                  {cert.description}
                </p>
                {isOnChain && cert.mintAddress ? (
                  <p className="font-mono text-[11px] text-[color:var(--color-muted-foreground)] break-all">
                    mint ·{" "}
                    <a
                      href={solscan(cert.mintAddress)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--color-accent)] hover:opacity-70"
                    >
                      {truncateAddress(cert.mintAddress, 8, 8)}
                    </a>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="pt-8 pb-16 border-t border-[color:var(--color-border)]">
        <MintNote render={t.credentials.mintNote} />
      </section>
    </main>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-editorial text-3xl leading-none ${
          accent ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-foreground)]"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-muted-foreground)]">
        {label}
      </div>
    </div>
  );
}

function CredentialsIntro({
  render,
}: {
  lang: Lang;
  render: (sa: string, sac: string, pa: string, pac: string) => string;
}) {
  const SA = "@@sopen@@";
  const SAC = "@@sclose@@";
  const PA = "@@popen@@";
  const PAC = "@@pclose@@";
  const raw = render(SA, SAC, PA, PAC);
  const pattern = /(@@sopen@@[\s\S]*?@@sclose@@|@@popen@@[\s\S]*?@@pclose@@)/g;
  const parts = raw.split(pattern);
  return (
    <p className="text-[17px] leading-relaxed text-[color:var(--color-foreground)]/85 max-w-prose">
      {parts.map((part, i) => {
        if (part.startsWith(SA)) {
          const inner = part.slice(SA.length, part.length - SAC.length);
          return (
            <span key={i} className="text-[color:var(--color-accent)] font-medium">
              {inner}
            </span>
          );
        }
        if (part.startsWith(PA)) {
          const inner = part.slice(PA.length, part.length - PAC.length);
          return (
            <code key={i} className="font-mono text-[0.9em] text-[color:var(--color-accent)]">
              {inner}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

function MintNote({
  render,
}: {
  render: (ma: string, mac: string, sa: string, sac: string) => string;
}) {
  const MA = "@@mopen@@";
  const MAC = "@@mclose@@";
  const SA = "@@sopen@@";
  const SAC = "@@sclose@@";
  const raw = render(MA, MAC, SA, SAC);
  const pattern = /(@@mopen@@[\s\S]*?@@mclose@@|@@sopen@@[\s\S]*?@@sclose@@)/g;
  const parts = raw.split(pattern);
  return (
    <p className="text-[14px] leading-relaxed text-[color:var(--color-muted-foreground)] max-w-prose">
      {parts.map((part, i) => {
        if (part.startsWith(MA)) {
          const inner = part.slice(MA.length, part.length - MAC.length);
          return (
            <a
              key={i}
              href="https://developers.metaplex.com/core"
              target="_blank"
              rel="noopener noreferrer"
              className="link-bracket text-[color:var(--color-primary)]"
            >
              {inner}
            </a>
          );
        }
        if (part.startsWith(SA)) {
          const inner = part.slice(SA.length, part.length - SAC.length);
          return (
            <a
              key={i}
              href="https://github.com/Lucasalb11"
              target="_blank"
              rel="noopener noreferrer"
              className="link-bracket text-[color:var(--color-primary)]"
            >
              {inner}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
