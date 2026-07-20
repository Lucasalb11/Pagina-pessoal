import { cache } from "react";
import { getOnChainStats } from "@/lib/helius";
import { relativeTime, solscanAccount, truncateAddress } from "@/lib/format";

const fetchStats = cache(getOnChainStats);

export default async function LiveOnChainBadge() {
  const stats = await fetchStats();
  const cluster = (process.env.SOLANA_CLUSTER ?? "mainnet").toLowerCase();

  const walletShort = stats.wallet ? truncateAddress(stats.wallet, 4, 4) : "";
  const walletHref = stats.wallet ? solscanAccount(stats.wallet) : "#";
  const activityLabel =
    stats.latestTxTime !== null
      ? `last tx ${relativeTime(stats.latestTxTime)}`
      : stats.slot > 0
        ? `slot ${stats.slot.toLocaleString("en-US")}`
        : "devnet reachable";

  return (
    <a
      href={walletHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full border border-onchain bg-onchain hover:border-[color:var(--color-accent)] transition-colors font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-accent)]"
      aria-label="On-chain wallet activity on Solscan"
    >
      <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
      </span>
      <span>solana · {cluster}</span>
      <span className="opacity-40">·</span>
      <span>{stats.credentialCount} credentials</span>
      <span className="opacity-40">·</span>
      <span>{activityLabel}</span>
      {walletShort ? (
        <>
          <span className="opacity-40">·</span>
          <span className="opacity-80 group-hover:opacity-100">{walletShort}</span>
        </>
      ) : null}
    </a>
  );
}
