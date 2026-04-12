import { Building2, TrendingUp, ArrowUpRight } from "lucide-react";

const EXPERIENCE = [
  {
    icon:        TrendingUp,
    company:     "Independent",
    role:        "Web3 Builder & DeFi Researcher",
    period:      "2023 — Present",
    location:    "Remote",
    type:        "Current",
    typeColor:   "accent" as const,
    description:
      "Building on-chain products and researching DeFi protocols across Ethereum, Solana, Stellar, and Base. Developing smart contracts, shipping open-source tools, and entering hackathons. This isn't a side hobby — it's the main act.",
    highlights: [
      "Active across 4 blockchain ecosystems — Ethereum, Solana, Stellar, Base",
      "22+ open-source repositories shipped on GitHub",
      "Solana certified — School of Solana (Ackee Blockchain)",
      "Whitepaper analysis, protocol governance, and on-chain data research",
    ],
  },
  {
    icon:        Building2,
    company:     "Arcos Construtora",
    role:        "Co-Founder & Director",
    period:      "2019 — 2025",
    location:    "Caruaru, Brazil",
    type:        "6 Years",
    typeColor:   "primary" as const,
    description:
      "Built a construction company from zero. Not a side project — a real business with payroll, bank debt, legal complexity, and 100+ people depending on decisions I made. That pressure is what shaped how I think about risk, capital, and product.",
    highlights: [
      "Orchestrated 12 simultaneous construction projects across the region",
      "Led and scaled a workforce of 100+ employees",
      "Secured institutional financing through Caixa Econômica Federal",
      "Developed economic feasibility models and investor-grade project plans",
    ],
  },
];

const Experience = () => (
  <section id="experience" className="py-24 relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-end gap-6 mb-16 relative">
          <span className="section-number select-none absolute -top-4 left-0 leading-none">02</span>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">Track Record</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              What I've{" "}
              <span className="text-gradient">Built & Run</span>
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {EXPERIENCE.map((exp) => (
            <div
              key={exp.role}
              className="group p-7 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 border-l-2 border-l-primary/25 hover:border-l-primary/70"
            >
              <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
                <div className="space-y-4">

                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                      <exp.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="font-bold text-lg text-foreground">{exp.role}</h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                            exp.typeColor === "accent"
                              ? "bg-accent/10 text-accent border border-accent/20"
                              : "bg-primary/10 text-primary border border-primary/20"
                          }`}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                        <span className="text-primary font-medium">{exp.company}</span>
                        <span className="text-border">·</span>
                        <span>{exp.period}</span>
                        <span className="text-border">·</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed pl-[60px]">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="pl-[60px] space-y-1.5">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5 shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Year watermark */}
                <span className="font-mono text-5xl font-bold text-foreground/4 select-none shrink-0 hidden md:block">
                  {exp.period.split(" ")[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Unique edge callout */}
        <div className="mt-10 p-6 rounded-xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 space-y-1">
            <p className="font-semibold text-foreground">The edge most Web3 devs don't have</p>
            <p className="text-sm text-muted-foreground">
              7 years running a 100-person company means I understand incentives, capital flows, risk,
              and what it actually takes to ship at scale. That operational DNA shapes every protocol
              and product I build — because code without business thinking is just code.
            </p>
          </div>
          <a
            href="/lucas-almeida-cv.pdf"
            download
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 border border-primary/40 text-primary text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors"
          >
            Full CV <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
