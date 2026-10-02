import type { Metadata } from "next";
import Link from "next/link";
import { CERTS } from "@/data/certs.config";
import { SITE_URL } from "@/data/profile";
import { solscan, truncateAddress } from "@/lib/format";

export const metadata: Metadata = {
  title: "Course certificates",
  description: "Courses and hackathons, each recorded as a non-transferable NFT on Solana devnet.",
  alternates: { canonical: `${SITE_URL}/credentials` },
};

export default function CredentialsPage() {
  return (
    <main>
      <p className="mb-10 text-[15px]">
        <Link href="/" className="text-[var(--color-soft)] hover:text-[var(--color-ink)]">
          ← Lucas de Almeida
        </Link>
      </p>

      <h1 className="text-[26px] font-semibold tracking-tight">Course certificates</h1>
      <p className="mt-2 mb-8 text-[var(--color-soft)]">
        Courses and hackathons I&rsquo;ve completed. I minted each one to my wallet on Solana devnet as a
        non-transferable NFT, mostly as an exercise with Metaplex Core; the issuer links are the real proof.
      </p>

      <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {CERTS.map((c) => (
          <li key={c.credentialId} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="font-medium">{c.name}</span>
              <span className="text-[14px] text-[var(--color-faint)]">{c.issuer}</span>
            </div>
            <p className="mt-1 text-[15px] text-[var(--color-soft)]">{c.description}</p>
            <p className="mt-1.5 flex gap-4 text-[14px]">
              {c.verifyUrl ? (
                <a href={c.verifyUrl} className="link">
                  issuer
                </a>
              ) : null}
              {c.status === "MINTED" && c.mintAddress ? (
                <a href={solscan(c.mintAddress)} className="link">
                  nft {truncateAddress(c.mintAddress, 4, 4)}
                </a>
              ) : (
                <span className="text-[var(--color-faint)]">in progress</span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
