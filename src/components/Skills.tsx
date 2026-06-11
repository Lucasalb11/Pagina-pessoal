import { Lightbulb, Link2, Code2, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const PILLARS = [
  {
    n:       "I",
    icon:    Lightbulb,
    title:   "Product Thinking",
    tagline: "How I see problems",
    skills:  [
      "Tokenomics", "Mechanism Design", "Protocol Design",
      "DeFi Economics", "Go-to-Market",
    ],
  },
  {
    n:       "II",
    icon:    Link2,
    title:   "Web3 & Blockchain",
    tagline: "How I build on-chain",
    skills:  [
      "Rust", "Anchor", "Solidity", "Foundry", "Soroban", "SPL Tokens",
    ],
  },
  {
    n:       "III",
    icon:    Code2,
    title:   "Development",
    tagline: "How I ship",
    skills:  [
      "TypeScript", "React", "Node.js", "Solana RPC", "ethers.js / web3.js",
    ],
  },
  {
    n:       "IV",
    icon:    Zap,
    title:   "Execution",
    tagline: "How I operate",
    skills:  [
      "Team Leadership", "Capital Allocation", "Risk Management",
      "Investor Relations", "Crisis Management",
    ],
  },
];

const Skills = () => (
  <section id="skills" className="py-32 relative overflow-hidden">

    <div className="absolute top-12 right-4 sm:right-12 section-marker">03</div>

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <Reveal className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-primary" />
            <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">Capabilities</span>
          </div>
          <h2 className="text-display text-5xl sm:text-7xl lg:text-[7rem] leading-[0.9]">
            Four pillars<br />
            <span className="font-serif italic font-normal text-muted-foreground/80">of my edge.</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground mt-8 max-w-xl leading-relaxed">
            Most builders are strong in one. The rare ones cover all four.
          </p>
        </Reveal>

        {/* 2x2 Bento */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <article className="group relative h-full p-8 lg:p-10 rounded-3xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden hover:border-foreground/30 transition-all duration-500">

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Roman numeral */}
                <span className="absolute -top-4 right-4 lg:right-6 font-serif text-[8rem] lg:text-[10rem] leading-none text-foreground/[0.04] select-none pointer-events-none">
                  {p.n}
                </span>

                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl border border-border bg-background/60 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                      <p.icon className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground tracking-[0.25em] uppercase mt-3">
                      {p.tagline}
                    </span>
                  </div>

                  <h3 className="text-display text-3xl lg:text-4xl leading-tight mb-6">
                    {p.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5">
                    {p.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-full text-[11px] text-foreground/70 bg-secondary/60 border border-border/60 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="absolute -bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Languages strip */}
        <Reveal className="mt-12">
          <div className="p-6 rounded-3xl border border-border bg-card/40 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Languages</span>
              <span className="w-px h-4 bg-border" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Portuguese</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">Native</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">English</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-accent/10 text-accent border border-accent/20">Professional</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Skills;
