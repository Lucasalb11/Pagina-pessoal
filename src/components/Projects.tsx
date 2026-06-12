import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/hooks/useLang";

interface Ship {
  id: string;
  name: string;
  tagline: string;
  body: string;
  stack: string[];
  ecosystem: "Solana" | "Stellar" | "EVM" | "Multi";
  status: "LIVE" | "BUILT" | "WIP";
  metric: string;
  metricLabel: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

const SHIPS: Ship[] = [
  {
    id: "structa",
    name: "Structa.finance",
    tagline: "On-chain fundraising for Brazilian real estate, paid in USDC.",
    body:
      "Issuer raises capital against a real development; investors earn 16–22% APY backed by the asset. Built at Solana Frontier — production Anchor program + USDC settlement.",
    stack: ["Anchor", "USDC", "React", "RWA"],
    ecosystem: "Solana",
    status: "LIVE",
    metric: "16–22%",
    metricLabel: "APY · USDC",
    github: "https://github.com/Lucasalb11/structa-finance",
    featured: true,
  },
  {
    id: "kalefi",
    name: "KaleFi",
    tagline: "Collateralized lending on Stellar Soroban.",
    body:
      "Lend against on-chain collateral with transparent liquidations. Rust contracts on Soroban. Stellar Build Hackathon submission.",
    stack: ["Rust", "Soroban", "Stellar"],
    ecosystem: "Stellar",
    status: "BUILT",
    metric: "Soroban",
    metricLabel: "STELLAR BUILD",
    github: "https://github.com/Lucasalb11",
  },
  {
    id: "aegis",
    name: "Aegis",
    tagline: "Yield aggregation across Solana DeFi.",
    body:
      "Routes deposits across vetted strategies. One deposit, programmable rebalancing, transparent risk surface.",
    stack: ["Anchor", "SPL", "TypeScript"],
    ecosystem: "Solana",
    status: "WIP",
    metric: "Multi-vault",
    metricLabel: "AGGREGATOR",
    github: "https://github.com/Lucasalb11",
  },
  {
    id: "blinkpay",
    name: "Blinkpay",
    tagline: "Solana Blinks → real merchant rails.",
    body:
      "Single-action payment links that settle in USDC on Solana. Built for the Brazilian SMB layer that runs on Pix today.",
    stack: ["Solana Blinks", "USDC", "Next.js"],
    ecosystem: "Solana",
    status: "WIP",
    metric: "Blinks",
    metricLabel: "PAYMENTS",
    github: "https://github.com/Lucasalb11",
  },
];

const STATUS_STYLES: Record<Ship["status"], string> = {
  LIVE:  "bg-primary/10 text-primary border-primary/30",
  BUILT: "bg-onchain text-onchain border-onchain",
  WIP:   "bg-secondary/60 text-muted-foreground border-border",
};

const Shipped = () => {
  const { t } = useLang();
  const featured = SHIPS.find((s) => s.featured)!;
  const rest = SHIPS.filter((s) => !s.featured);

  return (
    <section id="shipped" className="py-32 relative overflow-hidden">
      <div className="absolute top-12 left-4 sm:left-12 section-marker">03</div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("shipped.kicker")}
              </span>
            </div>
            <h2 className="text-display text-4xl sm:text-6xl lg:text-[6rem] leading-[0.92] max-w-5xl">
              {t("shipped.title")}
            </h2>
          </Reveal>

          {/* Featured — Structa */}
          <Reveal className="mb-10">
            <a
              href={featured.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-cursor-label={featured.name}
              className="group relative grid lg:grid-cols-[1.4fr_1fr] gap-8 p-8 lg:p-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-surface/60 to-transparent backdrop-blur-sm overflow-hidden hover:border-primary/55 transition-all"
            >
              <div className="absolute -top-24 -right-24 w-[460px] h-[460px] bg-primary/30 rounded-full blur-[140px] pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-700" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                  <span className={`font-code text-[10px] tracking-[0.22em] uppercase px-2 py-1 rounded-full border ${STATUS_STYLES[featured.status]}`}>
                    {featured.status}
                  </span>
                  <span className="font-code text-[10px] text-muted-foreground tracking-[0.22em] uppercase">
                    {featured.ecosystem} · FEATURED
                  </span>
                </div>
                <h3 className="text-display text-3xl sm:text-4xl lg:text-5xl leading-[1] mb-4 group-hover:text-primary transition-colors">
                  {featured.name}
                </h3>
                <p className="font-serif italic text-xl text-foreground/90 leading-snug mb-4">
                  {t("shipped.featured.tagline")}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl">
                  {t("shipped.featured.line")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {featured.stack.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-full font-code text-[10px] text-foreground/70 bg-secondary/60 border border-border/60">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex flex-col justify-between gap-6 self-stretch">
                <ArrowUpRight className="w-6 h-6 self-end text-foreground/60 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                <div>
                  <div className="font-display text-5xl lg:text-6xl text-primary leading-none">
                    {featured.metric}
                  </div>
                  <div className="mt-3 font-code text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
                    {featured.metricLabel}
                  </div>
                </div>
              </div>
            </a>
          </Reveal>

          {/* Grid of rest */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {rest.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.06}>
                <motion.a
                  href={s.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  data-cursor="hover"
                  data-cursor-label={s.name}
                  className="group block h-full p-6 rounded-3xl border border-border bg-surface/50 backdrop-blur-sm hover:border-foreground/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className={`font-code text-[9px] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full border ${STATUS_STYLES[s.status]}`}>
                      {s.status}
                    </span>
                    <span className="font-code text-[9px] text-muted-foreground tracking-[0.22em] uppercase">
                      {s.ecosystem}
                    </span>
                  </div>
                  <h4 className="font-display text-2xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    {s.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 min-h-[3rem]">
                    {s.body}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {s.stack.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full font-code text-[9px] text-foreground/60 bg-secondary/50 border border-border/50">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <div>
                      <div className="font-display text-base text-foreground">{s.metric}</div>
                      <div className="font-code text-[9px] text-muted-foreground tracking-[0.18em] uppercase">{s.metricLabel}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex items-center justify-between gap-4 flex-wrap">
            <a
              href="https://github.com/Lucasalb11"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="link-bracket inline-flex items-center gap-2 font-code text-[11px] tracking-[0.22em] uppercase text-foreground hover:text-primary transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              ALL OPEN-SOURCE ON GITHUB
            </a>
            <a
              href="https://x.com/Lucasalb11"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-1.5 font-code text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              FOLLOW THE BUILDS
              <ExternalLink className="w-3 h-3" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Shipped;
