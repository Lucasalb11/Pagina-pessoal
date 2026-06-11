import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Global cursor:
 *   - tiny dot that hugs the pointer
 *   - larger outer ring that lags with spring
 *   - morphs over interactive elements (links, buttons, [data-cursor="hover"])
 *
 * Hidden on touch / coarse-pointer devices and when prefers-reduced-motion.
 */
export const CustomCursor = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  // Raw pointer (dot)
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Lagging ring — springy follow
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.4 });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on fine pointers without reduced-motion preference
    const fine = window.matchMedia?.("(pointer: fine)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none-mode");

    const onMove = (e: PointerEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        'a, button, [role="button"], [data-cursor="hover"]'
      ) as HTMLElement | null;
      if (interactive) {
        setHovering(true);
        const cl = interactive.getAttribute("data-cursor-label");
        setLabel(cl);
      } else {
        setHovering(false);
        setLabel(null);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("cursor-none-mode");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot — exact pointer */}
      <motion.div
        aria-hidden
        style={{ translateX: x, translateY: y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-primary mix-blend-difference"
      />
      {/* Outer ring — springy follow */}
      <motion.div
        aria-hidden
        style={{ translateX: ringX, translateY: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-5 -mt-5 flex h-10 w-10 items-center justify-center"
      >
        <motion.div
          animate={{
            scale: hovering ? 1.6 : 1,
            borderColor: hovering ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.4)",
            backgroundColor: hovering ? "hsl(var(--primary) / 0.08)" : "hsl(var(--foreground) / 0)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="h-10 w-10 rounded-full border backdrop-blur-[1px]"
        />
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.6)]"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
