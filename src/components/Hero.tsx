import { useRef } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import profileImage from "@/assets/profile.jpeg";
import LiquidBackground from "@/components/fx/LiquidBackground";

const MARKERS = [
  { label: "Recife, BR" },
  { label: "Operator → On-chain" },
];

const STATS = [
  { value: "7 yrs",  label: "Operating"          },
  { value: "100+",   label: "Team led"           },
  { value: "12",     label: "Projects delivered" },
  { value: "2023",   label: "Pivot to on-chain"  },
];

/** Magnetic anchor — pulls toward cursor when hovered. */
const MagneticAnchor = ({
  children,
  className = "",
  href,
  download,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  download?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    x.set(dx);
    y.set(dy);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      data-cursor="hover"
      data-magnetic
      className={className}
    >
      {children}
    </motion.a>
  );
};

/** Photo card that tilts 3D based on cursor position over the card. */
const ParallaxPhotoCard = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotX = useTransform(py, [0, 1], [10, -10]);
  const rotY = useTransform(px, [0, 1], [-10, 10]);
  const sRotX = useSpring(rotX, { stiffness: 140, damping: 18 });
  const sRotY = useSpring(rotY, { stiffness: 140, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:block w-[300px] xl:w-[340px] relative shrink-0"
      style={{ perspective: 1000 }}
    >
      {/* Shadow card */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/20 blur-2xl scale-95 translate-y-4 -z-10" />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        data-cursor="hover"
        data-cursor-label="Builder · 01"
        style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d" }}
        className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-[0_30px_80px_-20px_hsl(0_0%_0%/0.8),_0_0_0_1px_hsl(var(--primary)/0.2)] holo-edge"
      >
        <img
          src={profileImage}
          alt="Lucas de Almeida — operator turned on-chain builder"
          className="w-full aspect-[4/5] object-cover"
          loading="eager"
          style={{ transform: "translateZ(0)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Caption */}
        <div className="absolute bottom-0 inset-x-0 p-5" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em]">
            <span className="text-primary">Lucas de Almeida</span>
            <span className="text-muted-foreground">2026</span>
          </div>
          <div className="mt-1 font-serif italic text-foreground text-lg leading-tight">
            Real businesses. Real capital. Now on-chain.
          </div>
        </div>

        {/* Top corner badge */}
        <div
          className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border text-[10px] font-mono uppercase tracking-widest text-foreground"
          style={{ transform: "translateZ(40px)" }}
        >
          Operator · 01
        </div>
      </motion.div>

      {/* Floating glow accent */}
      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 sm:pt-32 pb-20">

      {/* Liquid background field */}
      <LiquidBackground className="opacity-40 mix-blend-screen" />

      {/* Atmospheric layers */}
      <div className="absolute inset-0 bg-dot opacity-30 pointer-events-none" />
      <div className="absolute inset-0 gradient-hero pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">

          {/* Top kicker row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-10 sm:mb-14"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-400/30 bg-green-400/5">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-green-400/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
              </span>
              <span className="text-[11px] text-green-400/90 font-mono tracking-wider uppercase">Open to founding &amp; builder roles</span>
            </span>
            {MARKERS.map((m) => (
              <span key={m.label} className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/40 text-[11px] text-muted-foreground font-mono tracking-wider uppercase">
                {m.label}
              </span>
            ))}
          </motion.div>

          {/* The headline */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end">

            <div className="relative">

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-display text-[18vw] sm:text-[14vw] lg:text-[10.5rem] xl:text-[13rem] leading-[0.82] tracking-[-0.06em]"
              >
                <span className="block">On-chain capital</span>
                <span className="block">for the</span>
                <span className="block font-serif italic font-normal text-gradient -mt-2 sm:-mt-4">real economy.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 lg:mt-14 max-w-xl"
              >
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  I spent seven years operating a real-economy business —{" "}
                  <span className="text-foreground font-medium">100 people on payroll</span>,
                  institutional bank debt, 12 simultaneous projects. Now I build the{" "}
                  <span className="font-serif italic text-foreground">on-chain rails</span>{" "}
                  for the same kind of capital.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <MagneticAnchor
                    href="#projects"
                    onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="group inline-flex items-center gap-2 pl-5 pr-4 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)] text-sm"
                  >
                    See what I've shipped
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </MagneticAnchor>
                  <MagneticAnchor
                    href="/lucas-almeida-cv.pdf"
                    download
                    className="inline-flex items-center gap-2 px-5 py-3 border border-border text-foreground font-medium rounded-full hover:border-foreground/40 hover:bg-secondary/50 transition-all duration-300 text-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> CV
                  </MagneticAnchor>
                </div>
              </motion.div>
            </div>

            <ParallaxPhotoCard />
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 lg:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 border-t border-border/60 pt-8"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl sm:text-4xl font-bold text-foreground">{s.value}</div>
                <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 font-mono tracking-[0.15em] uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-px h-6 bg-gradient-to-b from-muted-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
