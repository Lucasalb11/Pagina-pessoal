export function truncateAddress(addr: string, head = 4, tail = 4): string {
  if (!addr) return "";
  if (addr.length <= head + tail + 1) return addr;
  return `${addr.slice(0, head)}…${addr.slice(-tail)}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

const CLUSTER = (import.meta.env.VITE_SOLANA_CLUSTER as string | undefined) ?? "mainnet";
const SOLSCAN_SUFFIX = CLUSTER === "mainnet" ? "" : `?cluster=${CLUSTER}`;

export function solscan(mint: string): string {
  return `https://solscan.io/token/${mint}${SOLSCAN_SUFFIX}`;
}

export function solscanAccount(address: string): string {
  return `https://solscan.io/account/${address}${SOLSCAN_SUFFIX}`;
}
