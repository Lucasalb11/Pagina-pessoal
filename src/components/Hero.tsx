import { Github, Linkedin, Mail, ChevronDown, ArrowRight, Download } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const STATS = [
  { value: "22+", label: "Repositories" },
  { value: "4",   label: "Chains" },
  { value: "7+",  label: "Years Exp." },
];

const CHAINS = [
  {
    name:  "ethereum",
    fill:  9,
    color: "bg-primary",
    label: "Ethereum",
    skills: ["Solidity", "Foundry", "OpenZeppelin", "Hardhat", "Thirdweb", "EVM"],
    detail: "Primary EVM development environment. Smart contracts audited and deployed to mainnet.",
  },
  {
    name:  "solana  ",
    fill:  9,
    color: "bg-accent",
    label: "Solana",
    skills: ["Rust", "Anchor", "SPL Tokens", "PDAs", "CPIs"],
    detail: "Native Rust + Anchor programs. Token standards and on-chain state management.",
  },
  {
    name:  "stellar ",
    fill:  8,
    color: "bg-primary",
    label: "Stellar",
    skills: ["Soroban", "Rust", "Stellar SDK", "Horizon API"],
    detail: "Soroban smart contracts in Rust. Stellar network integration and payment flows.",
  },
  {
    name:  "base    ",
    fill:  7,
    color: "bg-accent",
    label: "Base",
    skills: ["Solidity", "EVM", "L2 Architecture", "Cross-chain Bridges"],
    detail: "EVM-compatible L2. Bridging, gas optimization and OP stack tooling.",
  },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-center min-h-[calc(100vh-4rem)] py-16">

          {/* ── Left: text content ── */}
          <div className="space-y-7 order-2 lg:order-1">

            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-mono tracking-wide">Available for new opportunities</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">
                Blockchain Developer · Recife, Brazil
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold leading-[0.92] tracking-tight">
                Lucas
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold leading-[0.92] tracking-tight">
                de{" "}
                <span className="text-gradient">Almeida</span>
                <span className="text-primary">.</span>
              </h1>
            </div>

            <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
              Combining{" "}
              <span className="text-foreground font-semibold">7+ years</span> of high-stakes
              operational leadership with hands-on{" "}
              <span className="text-primary font-medium">DeFi research</span> and{" "}
              <span className="text-primary font-medium">smart contract engineering</span>.
              I build what I understand — and I understand the business layer behind every protocol.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-[0_0_30px_hsl(22_100%_55%/0.3)] hover:shadow-[0_0_40px_hsl(22_100%_55%/0.5)] text-sm"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/lucas-almeida-cv.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/50 text-primary font-medium rounded-lg hover:bg-primary/10 transition-all duration-200 text-sm"
              >
                Download CV <Download className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-medium rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-200 text-sm"
              >
                Get in Touch
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 border-t border-border/50 pt-5">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 font-mono tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { href: "https://github.com/Lucasalb11",           icon: Github,   label: "GitHub" },
                { href: "https://www.linkedin.com/in/lucasalb11/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:lucasalb11@gmail.com",             icon: Mail,     label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: chain terminal ── */}
          <div className="order-1 lg:order-2 flex flex-col items-center justify-center animate-float">

            {/* Chain status card with tooltips */}
            <div className="w-full max-w-[280px] rounded-xl border border-border bg-card overflow-hidden shadow-[0_0_40px_hsl(22_100%_55%/0.05)]">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-card/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">chain_status.sh</span>
              </div>

              <div className="p-4 font-mono text-xs space-y-1">
                <p className="text-muted-foreground mb-3 text-[11px]">
                  <span className="text-accent">❯</span> hover chain for competencies
                </p>

                {CHAINS.map((chain) => (
                  <Tooltip key={chain.label}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 cursor-help hover:bg-foreground/5 px-1 py-1 rounded transition-colors">
                        <span className="text-muted-foreground w-[68px] text-[11px]">{chain.name}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 10 }, (_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-sm ${i < chain.fill ? chain.color : "bg-muted"}`}
                            />
                          ))}
                        </div>
                        <span className="text-green-400 text-[10px] ml-1">●</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-[220px] p-3 bg-card border-border">
                      <p className="font-semibold text-foreground text-xs mb-1.5">{chain.label}</p>
                      <p className="text-muted-foreground text-[11px] leading-relaxed mb-2">{chain.detail}</p>
                      <div className="flex flex-wrap gap-1">
                        {chain.skills.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] rounded border border-primary/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}

                {/* Audit score */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                  <span className="text-muted-foreground text-[11px] w-[68px]">audit   </span>
                  <span className="text-primary font-bold text-[11px]">96/100</span>
                  <div className="flex gap-0.5 ml-1">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-sm ${i < 9 ? "bg-primary" : "bg-muted"}`} />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-2">
                  <span className="text-accent text-[11px]">❯</span>
                  <span className="inline-block w-1.5 h-3 bg-primary animate-pulse" />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-muted-foreground/40" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
