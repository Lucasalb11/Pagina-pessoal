import { useEffect } from "react";
import { useMotionValue, useSpring, useMotionValueEvent, useReducedMotion } from "framer-motion";

/**
 * Cursor spotlight — writes `--mx` / `--my` CSS vars on `:root`.
 * On touch / reduced-motion: parks the spotlight off-screen (so the mask layer stays dark).
 */
export function useSpotlight(opts: { spring?: { stiffness: number; damping: number; mass: number } } = {}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, opts.spring ?? { stiffness: 240, damping: 28, mass: 0.6 });
  const sy = useSpring(y, opts.spring ?? { stiffness: 240, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  useMotionValueEvent(sx, "change", (v) => {
    document.documentElement.style.setProperty("--mx", `${v}px`);
  });
  useMotionValueEvent(sy, "change", (v) => {
    document.documentElement.style.setProperty("--my", `${v}px`);
  });
}
