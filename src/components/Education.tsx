import { Award, GraduationCap, BookOpen, Code2, Cpu, Trophy } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

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
    name: "Solana Frontier",
    ecosystem: "Solana",
    status: "Participated",
    note: "Built Structa.finance",
    href: "https://colosseum.com/frontier",
  },
  {
    name: "Solana House",
    ecosystem: "Solana",
    status: "Attended",
    note: "Builder events · São Paulo",
    href: null as string | null,
  },
  {
    name: "Stellar Build",
    ecosystem: "Stellar",
    status: "Participated",
    note: "Soroban contracts",
    href: null as string | null,
  },
];

const FORMAL = [
  {
    institution: "UFRPE",
    title:       "Bachelor's in Computer Engineering",
    subtitle:    "Universidade Federal Rural de Pernambuco · Feb 2026 – Dec 2030",
    tag:         "In Progress",
  },
  {
    institution: "UFPE",
    title:       "Economics — Foundation",
    subtitle:    "Universidade Federal de Pernambuco · 2019/20",
    tag:         "Attended",
  },
];

const featured = CERTIFICATIONS.find((c) => c.highlight)!;
const others   = CERTIFICATIONS.filter((c) => !c.highlight);

const Education = () => (
  <section id="education" className="py-32 relative overflow-hidden">

    <div className="absolute top-12 right-4 sm:right-12 section-marker">05</div>

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <Reveal className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-primary" />
            <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">Proof of Work</span>
          </div>
          <h2 className="text-display text-5xl sm:text-7xl lg:text-[7rem] leading-[0.9]">
            Already<br />
            <span className="font-serif italic font-normal text-muted-foreground/80">in the game.</span>
          </h2>
        </Reveal>

        {/* Featured certification — cinematic */}
        <Reveal className="mb-12">
          <article className="relative grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 p-8 lg:p-12 rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] via-card/60 to-transparent overflow-hidden">

            <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase px-2 py-1 bg-primary/10 border border-primary/30 rounded-full">
                  Featured
                </span>
                <span className="font-mono text-[10px] text-muted-foreground tracking-[0.25em] uppercase">{featured.tag}</span>
              </div>

              <h3 className="text-display text-4xl lg:text-6xl leading-[0.95] mb-3">
                {featured.title}
              </h3>
              <p className="font-serif italic text-xl lg:text-2xl text-foreground/90 mb-6">
                {featured.subtitle}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                {featured.description}
              </p>
            </div>

            <div className="relative flex flex-col justify-between gap-6">
              {/* Institution badge */}
              <div className="aspect-square rounded-2xl border border-border bg-background/60 backdrop-blur flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-dot opacity-30" />
                <featured.icon className="w-12 h-12 text-primary mb-3 relative z-10" />
                <span className="font-display text-3xl font-bold text-foreground relative z-10">{featured.institution}</span>
                <span className="font-mono text-[10px] text-muted-foreground tracking-[0.25em] uppercase mt-1 relative z-10">Issuer</span>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Other certifications row */}
        <Reveal className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase">More certifications</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {others.map((c) => (
              <div key={c.subtitle} className="group p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm hover:border-foreground/30 transition-all">
                <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center mb-4 group-hover:border-primary/40 transition-all">
                  <c.icon className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
                </div>
                <span className="font-mono text-[9px] text-muted-foreground tracking-[0.25em] uppercase">{c.institution}</span>
                <h4 className="font-display text-lg font-semibold text-foreground mt-1 leading-tight">{c.title}</h4>
                <p className="text-sm text-foreground/70 mt-1 mb-3">{c.subtitle}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Hackathons */}
        <Reveal className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Hackathons</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {HACKATHONS.map((h) => {
              const Card = (
                <>
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-foreground leading-tight flex items-center gap-1.5">
                      {h.name}
                      {h.href && (
                        <span className="font-mono text-[9px] text-accent tracking-wider uppercase">↗</span>
                      )}
                    </h4>
                    <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase mt-1">
                      {h.status} · {h.ecosystem}
                    </p>
                    <p className="text-xs text-foreground/70 mt-2 leading-snug">{h.note}</p>
                  </div>
                </>
              );
              const base = "group p-5 rounded-2xl border border-border bg-card/40 backdrop-blur-sm hover:border-accent/40 transition-all flex items-start gap-4";
              return h.href ? (
                <a
                  key={h.name}
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-cursor-label={h.name}
                  className={base}
                >
                  {Card}
                </a>
              ) : (
                <div key={h.name} className={base}>
                  {Card}
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Formal */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Formal Education</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {FORMAL.map((item) => (
              <div key={item.title} className="p-5 rounded-2xl border border-border bg-card/40 backdrop-blur-sm hover:border-foreground/20 transition-all flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl border border-border flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-foreground/70" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-accent/10 text-accent border border-accent/25">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Education;
