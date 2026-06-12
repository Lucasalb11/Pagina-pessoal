/**
 * Helius DAS API helpers. All calls are read-only.
 * Env: VITE_HELIUS_RPC (full URL with ?api-key=...), VITE_LUCAS_WALLET, VITE_CERT_COLLECTION.
 * Gracefully degrades to mocked values when env is absent (local dev).
 */

const RPC = import.meta.env.VITE_HELIUS_RPC as string | undefined;
export const LUCAS_WALLET = (import.meta.env.VITE_LUCAS_WALLET as string | undefined) ?? "";
export const CERT_COLLECTION = (import.meta.env.VITE_CERT_COLLECTION as string | undefined) ?? "";

export interface OnChainStats {
  slot: number;
  credentialCount: number;
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

async function rpc<T>(method: string, params: unknown): Promise<T | null> {
  if (!RPC) return null;
  try {
    const res = await fetch(RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: "lda", method, params }),
    });
    if (!res.ok) return null;
    const { result } = await res.json();
    return result as T;
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

export async function getOnChainStats(): Promise<OnChainStats> {
  const [slot, assets] = await Promise.all([
    getSlot(),
    LUCAS_WALLET && CERT_COLLECTION
      ? searchAssetsByCollection(LUCAS_WALLET, CERT_COLLECTION)
      : Promise.resolve([]),
  ]);
  return {
    slot: slot ?? 0,
    credentialCount: assets.length,
  };
}

export type { DasAsset };
