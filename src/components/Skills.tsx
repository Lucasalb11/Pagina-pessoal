import { Lightbulb, Link2, Code2, Zap } from "lucide-react";

const PILLARS = [
  {
    id:       "01",
    icon:     Lightbulb,
    title:    "Product Thinking",
    tagline:  "How I see problems",
    color:    "primary" as const,
    skills:   [
      "System Design",
      "Tokenomics",
      "Incentive Structures",
      "Protocol Design",
      "User Research",
      "DeFi Economics",
      "Capital Efficiency",
      "Go-to-Market",
    ],
  },
  {
    id:       "02",
    icon:     Link2,
    title:    "Web3 & Blockchain",
    tagline:  "How I build on-chain",
    color:    "accent" as const,
    skills:   [
      "Rust",
      "Anchor",
      "Solidity",
      "Soroban",
      "Foundry",
      "OpenZeppelin",
      "SPL Tokens",
      "PDAs / CPIs",
    ],
  },
  {
    id:       "03",
    icon:     Code2,
    title:    "Development",
    tagline:  "How I ship",
    color:    "primary" as const,
    skills:   [
      "TypeScript",
      "React",
      "Node.js",
      "Solana RPC",
      "Stellar Horizon",
      "REST APIs",
      "Git",
      "Web3.js / ethers.js",
    ],
  },
  {
    id:       "04",
    icon:     Zap,
    title:    "Execution",
    tagline:  "How I operate",
    color:    "accent" as const,
    skills:   [
      "Team Leadership",
      "Capital Allocation",
      "Risk Management",
      "Investor Relations",
      "Budget Oversight",
      "Negotiation",
      "Stakeholder Comms",
      "Crisis Management",
    ],
  },
];

const Skills = () => (
  <section id="skills" className="py-24 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-end gap-6 mb-4 relative">
          <span className="section-number select-none absolute -top-4 left-0 leading-none">03</span>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Four Pillars of{" "}
              <span className="text-gradient">My Edge</span>
            </h2>
          </div>
        </div>

        {/* Section sub-headline */}
        <p className="text-muted-foreground text-base max-w-2xl mb-12 ml-0">
          Most builders are strong in one of these. The rare ones cover all four.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      pillar.color === "primary"
                        ? "bg-primary/10 group-hover:bg-primary/20"
                        : "bg-accent/10 group-hover:bg-accent/20"
                    }`}
                  >
                    <pillar.icon
                      className={`w-4 h-4 ${pillar.color === "primary" ? "text-primary" : "text-accent"}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground leading-tight">{pillar.title}</h3>
                    <p
                      className={`text-[11px] font-mono mt-0.5 ${
                        pillar.color === "primary" ? "text-primary/60" : "text-accent/60"
                      }`}
                    >
                      {pillar.tagline}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground/40">{pillar.id}</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {pillar.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-all duration-200 cursor-default ${
                      pillar.color === "primary"
                        ? "bg-primary/5 border-primary/15 text-primary/80 hover:bg-primary/15 hover:border-primary/40 hover:text-primary"
                        : "bg-accent/5 border-accent/15 text-accent/80 hover:bg-accent/15 hover:border-accent/40 hover:text-accent"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Animated bottom line */}
              <div
                className={`mt-5 h-px w-0 group-hover:w-full transition-all duration-500 ${
                  pillar.color === "primary" ? "bg-primary/40" : "bg-accent/40"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-6 p-5 rounded-xl bg-card border border-border flex flex-wrap items-center gap-4">
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Languages</span>
          <div className="h-4 w-px bg-border" />
          {[
            { lang: "Portuguese", level: "Native" },
            { lang: "English",    level: "B2" },
          ].map(({ lang, level }) => (
            <div key={lang} className="flex items-center gap-2">
              <span className="text-sm text-foreground font-medium">{lang}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary/10 text-primary border border-primary/20">
                {level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
