import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Terminal, Activity, Zap } from "lucide-react";

/** Rotating thesis lines typed into the terminal */
const THESIS_LINES = [
  "$ status",
  "  > building on-chain rails for the real economy",
  "  > rust · anchor · solidity · soroban",
  "  > thesis: brazilian real-world assets on-chain",
  "  > looking for: founding teams, builder partnerships",
  "  > online · responding in <24h",
];

/** Chain ticker — purely informational, no claim of address ownership */
const CHAIN_BEACONS = [
  { name: "Solana",   id: "SOL", code: "9wf...kp3a", focus: "Programs · Anchor" },
  { name: "Stellar",  id: "XLM", code: "GA...x9Q",   focus: "Soroban · Contracts" },
  { name: "Ethereum", id: "ETH", code: "0xae...8c2",  focus: "Solidity · Foundry" },
  { name: "Base",     id: "BASE", code: "0x71...d4f", focus: "L2 · OP Stack" },
];

/** Particle network — cursor-reactive constellation on canvas. */
const ParticleField = ({ active }: { active: boolean }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.scale(DPR, DPR);
    };

    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    const COUNT = 70;

    const seed = () => {
      pts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // update + draw points
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        // mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const d = Math.sqrt(d2) || 1;
          const force = (140 - d) / 140;
          p.x += (dx / d) * force * 2.5;
          p.y += (dy / d) * force * 2.5;
        }

        ctx.fillStyle = "hsl(20, 95%, 56%, 0.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // connect close pairs
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const alpha = 1 - Math.sqrt(d2) / 120;
            ctx.strokeStyle = `hsla(20, 95%, 56%, ${alpha * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // connect points to cursor (highlight beam)
      if (mouseX > 0) {
        for (const p of pts) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            const alpha = 1 - d / 180;
            ctx.strokeStyle = `hsla(35, 100%, 62%, ${alpha * 0.6})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    seed();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    if (active) raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [active, reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

/** Typewriter terminal that loops through THESIS_LINES */
const Typewriter = () => {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (reduce) {
      setLines(THESIS_LINES);
      return;
    }
    let lineIdx = 0;
    let charIdx = 0;
    let alive = true;

    const tick = () => {
      if (!alive) return;
      if (lineIdx >= THESIS_LINES.length) return;

      const target = THESIS_LINES[lineIdx];
      if (charIdx <= target.length) {
        setCurrent(target.slice(0, charIdx));
        charIdx += 1;
        const delay = target[charIdx - 1] === " " ? 12 : 22 + Math.random() * 30;
        setTimeout(tick, delay);
      } else {
        setLines((prev) => [...prev, target]);
        setCurrent("");
        lineIdx += 1;
        charIdx = 0;
        setTimeout(tick, 380);
      }
    };

    const start = setTimeout(tick, 400);
    return () => {
      alive = false;
      clearTimeout(start);
    };
  }, [reduce]);

  return (
    <div className="font-mono text-xs sm:text-sm leading-relaxed">
      {lines.map((l, i) => (
        <div key={i} className={i === 0 ? "text-primary" : "text-foreground/80"}>
          {l}
        </div>
      ))}
      {current && (
        <div className={lines.length === 0 ? "text-primary" : "text-foreground/80"}>
          {current}
          <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-primary animate-pulse" />
        </div>
      )}
    </div>
  );
};

const Signal = () => {
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="signal"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Particle canvas layer */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleField active={active} />
      </div>

      {/* Mesh fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-primary/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">Live Signal</span>
              <span className="ml-2 inline-flex items-center gap-2 px-2 py-0.5 rounded-full border border-green-400/30 bg-green-400/5">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-green-400/50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-green-400">Online</span>
              </span>
            </div>
            <h2 className="text-display text-5xl sm:text-7xl lg:text-[8rem] leading-[0.9] max-w-5xl">
              Currently<br />
              <span className="font-serif italic font-normal text-gradient">on-chain.</span>
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground mt-8 max-w-2xl leading-relaxed">
              A snapshot of where I'm building, what I'm thinking about, and how to reach me — refreshed in real time.
            </p>
          </Reveal>

          {/* The interactive bento */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-6">

            {/* Terminal pane */}
            <Reveal>
              <div className="relative h-full p-6 sm:p-8 rounded-3xl border border-border bg-card/80 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">lda@on-chain</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    <span className="w-2 h-2 rounded-full bg-primary/70" />
                  </div>
                </div>
                <Typewriter />
              </div>
            </Reveal>

            {/* Chain beacons */}
            <Reveal delay={0.1}>
              <div className="relative h-full p-6 sm:p-8 rounded-3xl border border-border bg-card/80 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Chain beacons</span>
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground/50">{CHAIN_BEACONS.length} active</span>
                </div>
                <div className="flex flex-col gap-3">
                  {CHAIN_BEACONS.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="group flex items-center gap-3 p-3 rounded-2xl border border-border/60 bg-background/40 hover:border-primary/30 hover:bg-primary/[0.03] transition-all"
                    >
                      <div className="w-8 h-8 rounded-xl border border-border bg-card flex items-center justify-center font-mono text-[10px] font-bold text-primary tracking-wider">
                        {c.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{c.name}</span>
                          <span className="font-mono text-[10px] text-muted-foreground truncate">{c.code}</span>
                        </div>
                        <div className="font-mono text-[9px] text-muted-foreground/70 tracking-wider uppercase mt-0.5">{c.focus}</div>
                      </div>
                      <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
                        <span className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom row — KPI strip */}
          <Reveal delay={0.2} className="mt-4 lg:mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
              {[
                { k: "Now",        v: "Shipping" },
                { k: "Stack",      v: "Rust · EVM" },
                { k: "Base",       v: "Recife · BR" },
                { k: "Reply",      v: "< 24h" },
              ].map((kpi) => (
                <div key={kpi.k} className="group p-4 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-3 h-3 text-primary/80" />
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">{kpi.k}</span>
                  </div>
                  <div className="font-display text-xl sm:text-2xl text-foreground">{kpi.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Signal;
