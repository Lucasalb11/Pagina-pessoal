import type { Metadata } from "next";
import { CERTS } from "@/data/certs.config";
import { SITE_URL } from "@/data/profile";
import { solscan, solscanAccount, truncateAddress } from "@/lib/format";

export const metadata: Metadata = {
  title: "Credentials",
  description: "Soulbound credentials minted on Solana devnet: program completions and hackathon submissions, verifiable on Solscan.",
  alternates: { canonical: `${SITE_URL}/credentials` },
};

const COLLECTION = process.env.CERT_COLLECTION ?? "";

export default function CredentialsPage() {
  const minted = CERTS.filter((c) => c.status === "MINTED" && c.mintAddress);
  const pending = CERTS.filter((c) => !(c.status === "MINTED" && c.mintAddress));

  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-8">
      <header className="max-w-[44rem] pb-12 pt-14">
        <h1 className="text-[2.75rem] font-semibold leading-none tracking-[-0.035em] sm:text-[3.5rem]">Credentials</h1>
        <p className="mt-6 text-[17px] leading-relaxed text-[var(--color-dim)]">
          Each credential is a soulbound NFT minted to my wallet on Solana devnet with Metaplex Core and a{" "}
          <code className="rounded bg-[var(--color-raised)] px-1.5 py-0.5 font-mono text-[0.86em] text-[var(--color-bone)]">
            PermanentFreezeDelegate
          </code>{" "}
          plugin, so it can never be transferred. Open any mint on Solscan to check it.
        </p>
        {COLLECTION ? (
          <p className="mt-4 text-[14px] text-[var(--color-faint)]">
            Collection{" "}
            <a href={solscanAccount(COLLECTION)} className="link font-mono">
              {truncateAddress(COLLECTION, 6, 6)}
            </a>
          </p>
        ) : null}
      </header>

      <ul className="border-t border-[var(--color-line)]">
        {minted.map((c) => (
          <li key={c.credentialId} className="grid gap-3 border-b border-[var(--color-line)] py-6 md:grid-cols-[1fr_14rem] md:gap-10">
            <div>
              <h2 className="text-[19px] font-semibold tracking-tight">{c.name}</h2>
              <p className="mt-1 text-[14px] text-[var(--color-faint)]">
                {c.issuer}, {c.dateIssued}
              </p>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-[var(--color-dim)]">{c.description}</p>
            </div>
            <a
              href={solscan(c.mintAddress!)}
              className="flex items-start gap-2 self-start font-mono text-[13px] text-[var(--color-mint)] hover:underline md:justify-end"
              aria-label={`Verify ${c.name} on Solscan`}
            >
              <span aria-hidden>✓</span> {truncateAddress(c.mintAddress!, 6, 6)}
            </a>
          </li>
        ))}
        {pending.map((c) => (
          <li key={c.credentialId} className="grid gap-3 border-b border-[var(--color-line)] py-6 md:grid-cols-[1fr_14rem] md:gap-10">
            <div>
              <h2 className="text-[19px] font-semibold tracking-tight">{c.name}</h2>
              <p className="mt-1 text-[14px] text-[var(--color-faint)]">{c.issuer}</p>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-[var(--color-dim)]">{c.description}</p>
            </div>
            <p className="text-[13px] text-[var(--color-amber)] md:text-right">In progress</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
