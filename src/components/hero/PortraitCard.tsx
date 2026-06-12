import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import portrait from "@/assets/lucas-portrait.jpg";

const PortraitCard = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotX = useTransform(py, [0, 1], [6, -6]);
  const rotY = useTransform(px, [0, 1], [-8, 8]);
  const sRotX = useSpring(rotX, { stiffness: 130, damping: 18 });
  const sRotY = useSpring(rotY, { stiffness: 130, damping: 18 });

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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-[260px] sm:w-[300px] lg:w-[340px] shrink-0"
      style={{ perspective: 1400 }}
    >
      {/* Soft warm halo behind the portrait */}
      <div className="absolute -inset-8 -z-10 bg-primary/10 blur-[80px] rounded-[3rem] pointer-events-none" />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        data-cursor="hover"
        data-cursor-label="Lucas de Almeida"
        style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d" }}
        className="relative w-full rounded-[2rem] overflow-hidden border border-border bg-card shadow-[0_24px_80px_-32px_hsl(30_18%_18%/0.35)]"
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={portrait}
            alt="Portrait of Lucas de Almeida"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center"
            style={{ transform: "translateZ(0)" }}
          />
          {/* subtle warm wash for cohesion with the palette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
        </div>

        {/* Editorial caption */}
        <div className="px-5 py-4 flex items-center justify-between gap-3 border-t border-border/70 bg-card">
          <div className="min-w-0">
            <div className="font-display text-base text-foreground leading-tight truncate">
              Lucas de Almeida
            </div>
            <div className="font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground mt-1">
              Blockchain Engineer
            </div>
          </div>
          <span className="inline-flex items-center gap-1 font-code text-[9px] tracking-[0.22em] uppercase text-muted-foreground shrink-0">
            <MapPin className="w-3 h-3" />
            Recife · BR
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortraitCard;
