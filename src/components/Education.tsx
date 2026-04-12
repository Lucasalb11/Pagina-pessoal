import { Award, GraduationCap, BookOpen, Code2, Cpu, Trophy } from "lucide-react";

const CERTIFICATIONS = [
  {
    icon:        Cpu,
    institution: "Ackee",
    title:       "School of Solana",
    subtitle:    "Advanced Solana Development",
    description: "In-depth Solana program development using Rust and Anchor. PDAs, CPIs, token programs, and production-grade smart contract patterns.",
    tag:         "Certification",
    highlight:   true,
  },
  {
    icon:        Code2,
    institution: "NearX",
    title:       "NearX Academy",
    subtitle:    "Rust Programming & WebAssembly",
    description: "Hands-on Rust fundamentals for blockchain tooling and WebAssembly targets. Applied to Soroban and Solana ecosystems.",
    tag:         "Certification",
    highlight:   false,
  },
  {
    icon:        Award,
    institution: "NearX",
    title:       "NearX Academy",
    subtitle:    "Solidity 101",
    description: "Foundational Solidity and EVM smart contract development. Security patterns, testing with Hardhat/Foundry, and OpenZeppelin standards.",
    tag:         "Certification",
    highlight:   false,
  },
  {
    icon:        BookOpen,
    institution: "DeFiverso",
    title:       "DeFiverso",
    subtitle:    "DeFi Research & Protocol Analysis",
    description: "Deep-dive into DeFi protocol mechanics, whitepaper analysis, governance forums, and on-chain data interpretation.",
    tag:         "Program",
    highlight:   false,
  },
];

const HACKATHONS = [
  {
    name:    "Solana Hackathon",
    ecosystem: "Solana",
    status:  "Participant",
    color:   "accent" as const,
  },
  {
    name:    "Stellar Build",
    ecosystem: "Stellar",
    status:  "Participant",
    color:   "primary" as const,
  },
];

const FORMAL = [
  {
    institution: "UFRPE",
    title:       "Bachelor's in Computer Engineering",
    subtitle:    "Universidade Federal Rural de Pernambuco",
    tag:         "In Progress",
  },
  {
    institution: "UFPE",
    title:       "Economics — Foundation",
    subtitle:    "Universidade Federal de Pernambuco · 2019/20",
    tag:         "Attended",
  },
];

const Education = () => (
  <section id="education" className="py-24 relative overflow-hidden">
    <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-end gap-6 mb-16 relative">
          <span className="section-number select-none absolute -top-4 left-0 leading-none">05</span>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">Proof of Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Already{" "}
              <span className="text-gradient">In the Game</span>
            </h2>
          </div>
        </div>

        {/* Certifications spotlight */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <Award className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Certifications</span>
          </div>

          {/* Featured certification */}
          {CERTIFICATIONS.filter((c) => c.highlight).map((cert) => (
            <div
              key={cert.subtitle}
              className="mb-4 p-6 rounded-xl bg-primary/5 border border-primary/30 flex items-start gap-5 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                <cert.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-bold text-foreground">{cert.title}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/25">
                    {cert.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                    Featured
                  </span>
                </div>
                <p className="text-primary text-sm font-medium mb-1.5">{cert.subtitle}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{cert.description}</p>
              </div>
              <span className="font-mono text-4xl font-bold text-foreground/5 select-none shrink-0 hidden sm:block">
                {cert.institution}
              </span>
            </div>
          ))}

          {/* Other certifications */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.filter((c) => !c.highlight).map((cert) => (
              <div
                key={cert.subtitle}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <cert.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="font-semibold text-foreground text-sm">{cert.title}</h3>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-primary/10 text-primary border border-primary/20">
                        {cert.tag}
                      </span>
                    </div>
                    <p className="text-primary/80 text-xs font-medium mb-1">{cert.subtitle}</p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">{cert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathons */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Hackathons</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {HACKATHONS.map((h) => (
              <div
                key={h.name}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border bg-card transition-all duration-300 hover:scale-[1.02] ${
                  h.color === "accent"
                    ? "border-accent/30 hover:border-accent/50"
                    : "border-primary/30 hover:border-primary/50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    h.color === "accent" ? "bg-accent/10" : "bg-primary/10"
                  }`}
                >
                  <Trophy className={`w-4 h-4 ${h.color === "accent" ? "text-accent" : "text-primary"}`} />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{h.name}</p>
                  <p className="text-muted-foreground text-[11px] font-mono">{h.status} · {h.ecosystem}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-border bg-card/50">
              <div className="w-8 h-8 rounded-lg bg-border/50 flex items-center justify-center">
                <span className="text-muted-foreground/50 text-lg font-bold">+</span>
              </div>
              <div>
                <p className="font-medium text-muted-foreground text-sm">More coming</p>
                <p className="text-muted-foreground/60 text-[11px] font-mono">Actively competing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formal education (compact) */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Formal Education</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {FORMAL.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-accent/10 text-accent border border-accent/20">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Education;
