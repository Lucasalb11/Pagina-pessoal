export function truncateAddress(addr: string, head = 4, tail = 4): string {
  if (!addr) return "";
  if (addr.length <= head + tail + 1) return addr;
  return `${addr.slice(0, head)}…${addr.slice(-tail)}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

const CLUSTER = process.env.SOLANA_CLUSTER ?? "mainnet";
const SOLSCAN_SUFFIX = CLUSTER === "mainnet" ? "" : `?cluster=${CLUSTER}`;

export function solscan(mint: string): string {
  return `https://solscan.io/token/${mint}${SOLSCAN_SUFFIX}`;
}

export function solscanAccount(address: string): string {
  return `https://solscan.io/account/${address}${SOLSCAN_SUFFIX}`;
}

export function solscanTx(signature: string): string {
  return `https://solscan.io/tx/${signature}${SOLSCAN_SUFFIX}`;
}

export function relativeTime(iso: string | null): string {
  if (!iso) return "unknown";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.floor((now - then) / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
