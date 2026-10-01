import { cache } from "react";
import { getOnChainStats } from "@/lib/helius";
import { solscan, solscanAccount, truncateAddress } from "@/lib/format";
import { CERTS } from "@/data/certs.config";
import { PROFILE } from "@/data/profile";

const fetchStats = cache(getOnChainStats);

const HERO_CREDENTIALS = ["ackee-sos-8", "colosseum-frontier", "stellar-build", "nearx-rust-wasm"];

/**
 * The hero's signature element: my profile read like an account in a block
 * explorer. Every credential row resolves to a real soulbound mint.
 */
export default async function Inspector({
  builtCount,
  liveCount,
}: {
  builtCount: number;
  liveCount: number;
}) {
  const stats = await fetchStats();
  const cluster = (process.env.SOLANA_CLUSTER ?? "devnet").toLowerCase();
  const creds = HERO_CREDENTIALS.map((id) => CERTS.find((c) => c.credentialId === id)).filter(
    (c): c is (typeof CERTS)[number] => Boolean(c?.mintAddress),
  );

  return (
    <section
      aria-label="Profile, read as an on-chain account"
      className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)]"
    >
      <header className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-5 py-3.5">
        <span className="text-[13px] text-[var(--color-dim)]">Account</span>
        {stats.wallet ? (
          <a
            href={solscanAccount(stats.wallet)}
            className="font-mono text-[13px] text-[var(--color-mint)] hover:underline"
            aria-label="My wallet on Solscan"
          >
            {truncateAddress(stats.wallet, 6, 6)}
          </a>
        ) : (
          <span className="font-mono text-[13px] text-[var(--color-dim)]">lucasalmeida.me</span>
        )}
      </header>

      <dl className="resolve divide-y divide-[var(--color-line)] text-[14px]">
        <Row label="Role">Protocol engineer</Row>
        <Row label="Writes">Rust (Anchor, Soroban), Solidity, TypeScript</Row>
        <Row label="Based">
          {PROFILE.location}, {PROFILE.timezone}. Remote.
        </Row>
        <Row label="Protocols">
          {builtCount} built, <span className="text-[var(--color-mint)]">{liveCount} live</span>
        </Row>
        <div className="px-5 py-4">
          <dt className="mb-2.5 text-[var(--color-faint)]">Credentials, minted soulbound</dt>
          <dd>
            <ul className="space-y-2">
              {creds.map((c) => (
                <li key={c.credentialId} className="flex items-baseline justify-between gap-4">
                  <span className="flex items-baseline gap-2.5">
                    <span aria-hidden className="text-[var(--color-mint)]">✓</span>
                    <span className="text-[var(--color-bone)]">{c.name}</span>
                  </span>
                  <a
                    href={solscan(c.mintAddress!)}
                    className="shrink-0 font-mono text-[12px] text-[var(--color-faint)] hover:text-[var(--color-mint)]"
                    aria-label={`Verify ${c.name} on Solscan`}
                  >
                    {truncateAddress(c.mintAddress!, 4, 4)}
                  </a>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <footer className="flex items-center gap-2.5 border-t border-[var(--color-line)] bg-[var(--color-ink)]/40 px-5 py-3 font-mono text-[12px] text-[var(--color-faint)]">
        <span
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full ${stats.slot > 0 ? "pulse-dot bg-[var(--color-mint)]" : "bg-[var(--color-faint)]"}`}
        />
        {stats.slot > 0 ? (
          <span>
            solana {cluster}, slot {stats.slot.toLocaleString("en-US")}
          </span>
        ) : (
          <span>solana {cluster}</span>
        )}
      </footer>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 px-5 py-3">
      <dt className="text-[var(--color-faint)]">{label}</dt>
      <dd className="text-[var(--color-bone)]">{children}</dd>
    </div>
  );
}
