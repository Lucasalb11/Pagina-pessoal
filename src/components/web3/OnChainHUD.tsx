import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useOnChainStats } from "@/hooks/useOnChainStats";
import { formatNumber } from "@/lib/format";
import { useLang } from "@/hooks/useLang";

function useCountUp(target: number, duration = 1200) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) { setV(target); return; }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduce]);
  return v;
}

const OnChainHUD = () => {
  const { t } = useLang();
  const { slot, credentialCount } = useOnChainStats();
  const slotShown = useCountUp(slot);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      className="font-code text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-muted-foreground"
    >
      <span className="text-foreground">6</span> {t("hero.stat.years")}
      <span className="mx-2 text-border">·</span>
      <span className="text-onchain">{credentialCount}</span>
      <span className="ml-1">{t("hero.stat.creds")}</span>
      <span className="mx-2 text-border">·</span>
      <span className="text-onchain">{t("hero.stat.slot")}</span>
      <span className="ml-1 text-foreground">{formatNumber(slotShown)}</span>
    </motion.div>
  );
};

export default OnChainHUD;
