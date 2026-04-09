import { GraduationCap, BookOpen, Award, Code2, Cpu } from "lucide-react";

const EDUCATION = [
  {
    icon:        GraduationCap,
    institution: "UFRPE",
    title:       "Universidade Federal Rural de Pernambuco",
    subtitle:    "Bachelor's in Computer Engineering",
    description: "In progress. Core curriculum in algorithms, systems programming, distributed computing, and software engineering.",
    tag:         "In Progress",
    tagColor:    "accent",
  },
  {
    icon:        GraduationCap,
    institution: "UFPE",
    title:       "Universidade Federal de Pernambuco",
    subtitle:    "Bachelor's in Economics — 2019/20",
    description: "Attended but did not complete the degree. Strong foundation in economic theory, financial analysis, and quantitative modeling — directly applied to DeFi protocol design and tokenomics research.",
    tag:         "Incomplete",
    tagColor:    "primary",
  },
  {
    icon:        Cpu,
    institution: "Ackee",
    title:       "School of Solana — Ackee",
    subtitle:    "Advanced Solana Development",
    description: "In-depth Solana program development using Rust and Anchor framework. Covers PDAs, CPIs, token programs, and production-grade smart contract patterns.",
    tag:         "Certification",
    tagColor:    "primary",
  },
  {
    icon:        Code2,
    institution: "NearX",
    title:       "NearX Academy",
    subtitle:    "Rust Programming & WebAssembly Integration",
    description: "Hands-on Rust fundamentals for blockchain tooling and WebAssembly targets. Applied to smart contract development on Soroban and Solana ecosystems.",
    tag:         "Certification",
    tagColor:    "primary",
  },
  {
    icon:        Award,
    institution: "NearX",
    title:       "NearX Academy",
    subtitle:    "Solidity 101",
    description: "Foundational Solidity and EVM smart contract development covering security patterns, testing with Hardhat/Foundry, and OpenZeppelin standards.",
    tag:         "Certification",
    tagColor:    "primary",
  },
  {
    icon:        BookOpen,
    institution: "DeFiverso",
    title:       "DeFiverso",
    subtitle:    "DeFi Research & Protocol Analysis",
    description: "Deep-dive into DeFi protocol mechanics, whitepaper analysis, governance forums, and on-chain data interpretation. Liquidity pool dynamics and capital efficiency.",
    tag:         "Program",
    tagColor:    "accent",
  },
];

const Education = () => {
  return (
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
                <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">Education</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Learning &{" "}
                <span className="text-gradient">Growth</span>
              </h2>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-5">
              {EDUCATION.map((item) => (
                <div key={`${item.institution}-${item.subtitle}`} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-7 w-5 h-5 rounded-full bg-card border-2 border-primary/50 hidden md:flex items-center justify-center z-10 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors duration-300" />
                  </div>

                  <div className="md:ml-20 p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 border-l-2 border-l-primary/20 hover:border-l-primary/60">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>

                        {/* Text */}
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider
                                ${item.tagColor === "primary"
                                  ? "bg-primary/10 text-primary border border-primary/20"
                                  : "bg-accent/10 text-accent border border-accent/20"
                                }`}
                            >
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-primary text-sm font-medium">{item.subtitle}</p>
                          <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      {/* Institution code */}
                      <span className="font-mono text-3xl font-bold text-foreground/4 select-none shrink-0 self-end sm:self-start">
                        {item.institution}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
