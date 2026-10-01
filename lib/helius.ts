const RPC = process.env.HELIUS_RPC;
export const LUCAS_WALLET = process.env.LUCAS_WALLET ?? "";
export const CERT_COLLECTION = process.env.CERT_COLLECTION ?? "";
export const SOLANA_CLUSTER = process.env.SOLANA_CLUSTER ?? "mainnet";

export interface OnChainStats {
  slot: number;
  credentialCount: number;
  latestTxSignature: string | null;
  latestTxTime: string | null;
  wallet: string;
}

interface DasAsset {
  id: string;
  content?: {
    metadata?: { name?: string; symbol?: string };
    json_uri?: string;
    links?: { image?: string };
  };
  ownership?: { owner?: string };
  grouping?: { group_key: string; group_value: string }[];
}

interface Signature {
  signature: string;
  blockTime?: number;
  err?: unknown;
}

async function rpc<T>(method: string, params: unknown): Promise<T | null> {
  if (!RPC) return null;
  try {
    const res = await fetch(RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: "lda", method, params }),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.result ?? null) as T | null;
  } catch {
    return null;
  }
}

export async function getSlot(): Promise<number | null> {
  return rpc<number>("getSlot", []);
}

export async function searchAssetsByCollection(
  owner: string,
  collection: string,
): Promise<DasAsset[]> {
  if (!owner || !collection) return [];
  const result = await rpc<{ items: DasAsset[] }>("searchAssets", {
    ownerAddress: owner,
    grouping: ["collection", collection],
    page: 1,
    limit: 50,
  });
  return result?.items ?? [];
}

export async function getSignaturesForAddress(
  address: string,
  limit = 5,
): Promise<Signature[]> {
  if (!address) return [];
  const result = await rpc<Signature[]>("getSignaturesForAddress", [
    address,
    { limit },
  ]);
  return result ?? [];
}

export async function getOnChainStats(): Promise<OnChainStats> {
  const [slot, assets, sigs] = await Promise.all([
    getSlot(),
    LUCAS_WALLET && CERT_COLLECTION
      ? searchAssetsByCollection(LUCAS_WALLET, CERT_COLLECTION)
      : Promise.resolve([]),
    LUCAS_WALLET ? getSignaturesForAddress(LUCAS_WALLET, 1) : Promise.resolve([]),
  ]);

  const latest = sigs.find((s) => !s.err) ?? sigs[0];

  return {
    slot: slot ?? 0,
    credentialCount: assets.length,
    latestTxSignature: latest?.signature ?? null,
    latestTxTime: latest?.blockTime
      ? new Date(latest.blockTime * 1000).toISOString()
      : null,
    wallet: LUCAS_WALLET,
  };
}

export type { DasAsset };
