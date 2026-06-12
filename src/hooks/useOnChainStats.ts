import { useEffect, useState } from "react";
import { getOnChainStats, type OnChainStats } from "@/lib/helius";
import { PROGRAM_STATS } from "@/data/certs.config";

const CACHE_KEY = "lda:onchain:v1";
const TTL_MS = 24 * 60 * 60 * 1000;

interface Cached {
  ts: number;
  data: OnChainStats;
}

const FALLBACK: OnChainStats = {
  slot: 312_884_419,
  credentialCount: PROGRAM_STATS.readyCount,
};

export function useOnChainStats() {
  const [stats, setStats] = useState<OnChainStats>(() => {
    if (typeof window === "undefined") return FALLBACK;
    try {
      const raw = window.localStorage.getItem(CACHE_KEY);
      if (!raw) return FALLBACK;
      const c = JSON.parse(raw) as Cached;
      if (Date.now() - c.ts < TTL_MS) return c.data;
    } catch {
      /* ignore */
    }
    return FALLBACK;
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await getOnChainStats();
      if (cancelled) return;
      if (data.slot === 0 && data.credentialCount === 0) return;
      setStats(data);
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data } satisfies Cached));
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}
