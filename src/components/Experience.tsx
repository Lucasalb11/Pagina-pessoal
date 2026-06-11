import { ArrowUpRight, Briefcase } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const EXPERIENCE = [
  {
    label:    "Current",
    company:  "Independent",
    role:     "Web3 Builder & DeFi Researcher",
    period:   "2023 — Present",
    yearTag:  "Now",
    body:     "Building on-chain products across Solana, Stellar, Base and Ethereum. Shipping open-source tooling, competing in hackathons (Solana Frontier, Solana House), researching DeFi protocols full-time.",
    outcomes: [
      { k: "Ackee",     v: "School of Solana"  },
      { k: "Rust · EVM", v: "Smart contract stack" },
      { k: "Structa",   v: "Hackathon ship"    },
    ],
    highlights: [
      "Built Structa.finance at Solana Frontier hackathon",
      "Solana certified — School of Solana (Ackee)",
      "Active across Solana, Stellar, Base, EVM",
      "Whitepaper, governance, on-chain data research",
    ],
    accent: "primary" as const,
  },
  {
    label:    "Founder",
    company:  "Arcos Construtora",
    role:     "Co-Founder & Director",
    period:   "2019 — 2025",
    yearTag:  "6 yrs",
    body:     "Built a construction company from zero. A real business with payroll, bank debt, legal complexity, and 100+ people depending on the decisions I made. That pressure shaped how I think about risk, capital, and product.",
    outcomes: [
      { k: "100+",  v: "Team led"         },
      { k: "12",    v: "Concurrent projects" },
      { k: "Caixa", v: "Institutional debt" },
      { k: "6 yrs", v: "Operating"        },
    ],
    highlights: [
      "Directed 12 concurrent projects with 100+ staff",
      "Institutional financing — Caixa Econômica Federal",
      "Built feasibility models, improved projected ROI",
      "Full lifecycle: land, budget, investors, risk",
    ],
    accent: "accent" as const,
  },
];

const Experience = () => (
  <section id="experience" className="py-32 relative overflow-hidden">

    <div className="absolute top-12 left-4 sm:left-12 section-marker">02</div>

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <Reveal className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-primary" />
            <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">Track Record</span>
          </div>
          <h2 className="text-display text-5xl sm:text-7xl lg:text-[7rem] leading-[0.9]">
            What I've<br />
            <span className="font-serif italic font-normal text-muted-foreground/80">built &amp; run.</span>
          </h2>
        </Reveal>

        {/* Bento positions */}
        <div className="space-y-8 lg:space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.1}>
              <article className="group relative grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-8 p-6 sm:p-10 lg:p-12 rounded-3xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden hover:border-foreground/20 transition-all duration-500">

                <div className={`absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700 ${
                  exp.accent === "primary" ? "bg-primary/40" : "bg-accent/30"
                }`} />

                <span className="absolute -bottom-8 -right-2 font-serif text-[10rem] sm:text-[14rem] leading-none text-foreground/[0.025] select-none pointer-events-none">
                  {exp.period.split(" ")[0]}
                </span>

                <div className="relative space-y-6 z-10">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase ${
                      exp.accent === "primary"
                        ? "bg-primary/10 text-primary border border-primary/25"
                        : "bg-accent/10 text-accent border border-accent/25"
                    }`}>
                      <Briefcase className="w-3 h-3" />
                      {exp.label}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">{exp.period}</span>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2 font-mono tracking-wider uppercase">{exp.company}</p>
                    <h3 className="text-display text-3xl sm:text-4xl lg:text-5xl leading-[0.95]">
                      {exp.role}
                    </h3>
                  </div>

                  <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                    {exp.body}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className={`mt-2 w-1 h-1 rounded-full shrink-0 ${exp.accent === "primary" ? "bg-primary" : "bg-accent"}`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative grid grid-cols-2 gap-3 self-start z-10">
                  {exp.outcomes.map((o) => (
                    <div key={o.v} className="p-4 rounded-2xl border border-border/80 bg-background/40 backdrop-blur-sm">
                      <div className={`font-display text-2xl lg:text-3xl font-bold leading-tight ${
                        exp.accent === "primary" ? "text-primary" : "text-accent"
                      }`}>
                        {o.k}
                      </div>
                      <div className="mt-1.5 font-mono text-[9px] text-muted-foreground tracking-[0.15em] uppercase">
                        {o.v}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Edge callout */}
        <Reveal className="mt-12">
          <div className="p-8 lg:p-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase mb-3">The edge most Web3 devs don't have</p>
              <p className="font-serif italic text-2xl lg:text-3xl leading-tight text-foreground">
                "Seven years running a 100-person company taught me incentives, capital flows and risk — the operational DNA behind every protocol I build."
              </p>
            </div>
            <a
              href="/lucas-almeida-cv.pdf"
              download
              data-cursor="hover"
              data-cursor-label="Download CV"
              className="group shrink-0 inline-flex items-center gap-2 px-5 py-3 border border-primary/40 text-foreground rounded-full hover:bg-primary/10 hover:border-primary text-sm font-medium transition-all"
            >
              Full CV
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Experience;
