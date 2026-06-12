import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Terminal, Activity, Quote } from "lucide-react";
import { useLang } from "@/hooks/useLang";

/* Rotating thesis lines typed into the terminal */
const THESIS_LINES = [
  "$ status",
  "  > shipping on-chain rails for the real economy",
  "  > rust · anchor · soroban · solidity",
  "  > thesis: brazilian real-world assets on-chain",
  "  > open for: founding roles, builder partnerships",
  "  > online · reply <24h",
];

const TENETS = [
  {
    n: "I",
    title: "Capital should move at the speed of code.",
    body: "If I can settle a payment in 400ms on Solana, I refuse to wait three business days for TradFi.",
  },
  {
    n: "II",
    title: "Real economy beats speculative loops.",
    body: "I'd rather tokenize one real building than ten reflexive farm tokens. Cash flows beat narratives.",
  },
  {
    n: "III",
    title: "Operator first. Engineer second. Both at once.",
    body: "Code without business is theater. Business without code is overhead. The edge is doing both at the same table.",
  },
];

const CHAIN_BEACONS = [
  { id: "SOL",  name: "Solana",   focus: "Programs · Anchor · MPL Core" },
  { id: "XLM",  name: "Stellar",  focus: "Soroban · Contracts"       },
  { id: "ETH",  name: "Ethereum", focus: "Solidity · Foundry"         },
  { id: "BASE", name: "Base",     focus: "L2 · OP Stack"              },
];

const Typewriter = () => {
  const reduce = useReducedMotion();
  const [lines, setLines]   = useState<string[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (reduce) { setLines(THESIS_LINES); return; }
    let lineIdx = 0;
    let charIdx = 0;
    let alive   = true;

    const tick = () => {
      if (!alive) return;
      if (lineIdx >= THESIS_LINES.length) return;
      const target = THESIS_LINES[lineIdx];
      if (charIdx <= target.length) {
        setCurrent(target.slice(0, charIdx));
        charIdx += 1;
        const delay = target[charIdx - 1] === " " ? 12 : 22 + Math.random() * 28;
        setTimeout(tick, delay);
      } else {
        setLines((prev) => [...prev, target]);
        setCurrent("");
        lineIdx += 1;
        charIdx = 0;
        setTimeout(tick, 360);
      }
    };

    const start = setTimeout(tick, 400);
    return () => { alive = false; clearTimeout(start); };
  }, [reduce]);

  return (
    <div className="font-code text-xs sm:text-sm leading-relaxed">
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
  const { t } = useLang();
  return (
    <section id="signal" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[55%] bg-primary/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("signal.kicker")}
              </span>
              <span className="inline-flex items-center gap-2 ml-2 px-2 py-0.5 rounded-full border border-primary/30 bg-primary/5">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span className="font-code text-[9px] tracking-[0.22em] uppercase text-primary">ONLINE</span>
              </span>
            </div>
            <h2 className="text-display text-4xl sm:text-6xl lg:text-[6rem] leading-[0.92] max-w-4xl">
              {t("signal.title")}
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-6 mb-6">
            <Reveal>
              <div className="relative h-full p-6 sm:p-8 rounded-3xl border border-border bg-surface/70 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span className="font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                      lda@on-chain
                    </span>
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

            <Reveal delay={0.1}>
              <div className="relative h-full p-6 sm:p-8 rounded-3xl border border-border bg-surface/70 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                    <span className="font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                      CHAIN BEACONS
                    </span>
                  </div>
                  <span className="font-code text-[9px] tracking-[0.22em] uppercase text-muted-foreground/50">
                    {CHAIN_BEACONS.length} ACTIVE
                  </span>
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
                      <div className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center font-code text-[10px] font-bold text-primary tracking-wider">
                        {c.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{c.name}</div>
                        <div className="font-code text-[9px] text-muted-foreground/70 tracking-[0.18em] uppercase mt-0.5">
                          {c.focus}
                        </div>
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

          {/* Tenets */}
          <div className="grid sm:grid-cols-3 gap-4 lg:gap-5">
            {TENETS.map((tn, i) => (
              <Reveal key={tn.n} delay={0.2 + i * 0.05}>
                <article className="group h-full p-6 rounded-3xl border border-border bg-surface/50 backdrop-blur-sm hover:border-foreground/30 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <Quote className="w-4 h-4 text-primary/70" />
                    <span className="font-serif italic text-3xl text-muted-foreground/30 leading-none">
                      {tn.n}
                    </span>
                  </div>
                  <h4 className="font-display text-lg leading-snug text-foreground mb-3">
                    {tn.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tn.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signal;
