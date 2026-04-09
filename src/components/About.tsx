import { Code2, Shield, TrendingUp, Lightbulb } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";

const FOCUSES = [
  { icon: Code2,       title: "Smart Contracts",  description: "Solidity, Hardhat, Foundry development" },
  { icon: Shield,      title: "Security First",    description: "Auditing and privacy-preserving Web3" },
  { icon: TrendingUp,  title: "DeFi Protocols",    description: "Decentralized finance architecture" },
  { icon: Lightbulb,   title: "On-Chain Analytics", description: "Blockchain explorers & analytics" },
];

const LEARNING = [
  "Blockchain interoperability and cross-chain solutions",
  "Privacy-preserving Web3 technologies (ZK, FHE)",
  "Advanced tokenomics and scaling strategies",
  "Rust for system-level blockchain tooling",
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex items-end gap-6 mb-16 relative">
            <span className="section-number select-none absolute -top-4 left-0 leading-none">01</span>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-primary" />
                <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">About</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Who I <span className="text-gradient">Am</span>
              </h2>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
            {/* Left — Photo + quick facts */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="relative">
                <div className="w-52 h-52 rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_60px_hsl(22_100%_55%/0.15)]">
                  <img
                    src={profileImage}
                    alt="Lucas de Almeida"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Orange accent bar */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xl bg-primary/10 border border-primary/20" />
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20" />
              </div>

              {/* Quick facts */}
              <div className="space-y-3 w-full font-mono text-sm">
                {[
                  { label: "LOCATION", value: "Recife, BR" },
                  { label: "FOCUS",    value: "Web3 / DeFi" },
                  { label: "STATUS",   value: "Open to work" },
                ].map((fact) => (
                  <div key={fact.label} className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground text-xs tracking-widest">{fact.label}</span>
                    <span className="text-foreground text-xs">{fact.value}</span>
                  </div>
                ))}
                <div className="flex justify-between pb-2">
                  <span className="text-muted-foreground text-xs tracking-widest">STATUS</span>
                  <span className="flex items-center gap-1.5 text-xs text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* Right — Bio + cards */}
            <div className="space-y-8">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg text-foreground/90">
                  Blockchain developer with a background in Economics from{" "}
                  <span className="text-primary font-medium">UFPE</span>, combining financial
                  thinking with deep technical expertise in Web3.
                </p>
                <p>
                  I specialize in building{" "}
                  <span className="text-foreground font-medium">secure smart contracts</span> and
                  DeFi infrastructure across Ethereum, Solana, and Stellar ecosystems. My approach
                  is privacy-first, performance-driven, and always security-audited.
                </p>
              </div>

              {/* Focus cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {FOCUSES.map((focus) => (
                  <div
                    key={focus.title}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/40 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <focus.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-foreground mb-0.5">{focus.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{focus.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Currently learning */}
              <div className="p-5 rounded-lg bg-card border border-accent/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <h3 className="font-mono text-xs text-accent tracking-widest uppercase">Currently Learning</h3>
                </div>
                <ul className="space-y-2">
                  {LEARNING.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
