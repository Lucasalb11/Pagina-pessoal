import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ShieldCheck, Cpu } from "lucide-react";
import { CERTS } from "@/data/certs.config";

/**
 * The hero centerpiece: a rotating holographic credential card that stands in for
 * Lucas's Ackee SoS certificate. Replaces Meridian's floating island.
 */
const CredentialHologram = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotX = useTransform(py, [0, 1], [10, -10]);
  const rotY = useTransform(px, [0, 1], [-14, 14]);
  const sRotX = useSpring(rotX, { stiffness: 140, damping: 16 });
  const sRotY = useSpring(rotY, { stiffness: 140, damping: 16 });

  const featured = CERTS.find((c) => c.featured) ?? CERTS[0];

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-[260px] sm:w-[300px] lg:w-[340px] aspect-[3/4] shrink-0"
      style={{ perspective: 1400 }}
    >
      {/* Volumetric glows */}
      <div className="absolute -inset-12 -z-10 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -inset-8 -z-10 bg-accent/15 blur-[80px] rounded-full pointer-events-none" />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        data-cursor="hover"
        data-cursor-label={featured.name}
        style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full rounded-3xl border border-border bg-surface holo-edge overflow-hidden p-6 flex flex-col justify-between gradient-credential animate-breathe"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary font-code text-[9px] tracking-[0.22em] uppercase">
            <span className="relative inline-flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-60" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-current" />
            </span>
            ON-CHAIN CRED
          </span>
          <span className="font-code text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
            {featured.ecosystem}
          </span>
        </div>

        {/* Middle */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-2xl border border-border/80 bg-background/40 backdrop-blur flex items-center justify-center">
            <Cpu className="w-8 h-8 text-foreground/85" />
          </div>
          <div>
            <h4 className="font-display text-xl leading-tight">{featured.name}</h4>
            <p className="font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground mt-2">
              {featured.issuer}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-code text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
            {featured.dateIssued}
          </span>
          <span className="inline-flex items-center gap-1 font-code text-[9px] tracking-[0.22em] uppercase text-onchain">
            <ShieldCheck className="w-2.5 h-2.5" />
            SOULBOUND
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CredentialHologram;
