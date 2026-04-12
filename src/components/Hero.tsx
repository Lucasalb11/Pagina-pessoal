import { Github, Linkedin, Mail, ArrowRight, Download, Award, Cpu, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const CHAINS = [
  {
    name:   "solana  ",
    fill:   8,
    color:  "bg-accent",
    label:  "Solana",
    skills: ["Rust", "Anchor", "SPL Tokens", "PDAs", "CPIs"],
    detail: "Native Rust + Anchor programs. Token standards and on-chain state management.",
  },
  {
    name:   "stellar ",
    fill:   5,
    color:  "bg-primary",
    label:  "Stellar",
    skills: ["Soroban", "Rust", "Stellar SDK", "Horizon API"],
    detail: "Soroban smart contracts in Rust. Stellar network integration and payment flows.",
  },
  {
    name:   "base    ",
    fill:   4,
    color:  "bg-accent",
    label:  "Base",
    skills: ["Solidity", "EVM", "L2 Architecture"],
    detail: "EVM-compatible L2. Bridging, gas optimization and OP stack tooling.",
  },
  {
    name:   "ethereum",
    fill:   4,
    color:  "bg-primary",
    label:  "Ethereum",
    skills: ["Solidity", "Foundry", "OpenZeppelin", "EVM"],
    detail: "EVM smart contract development. Audited contracts deployed to mainnet.",
  },
];

const BADGES = [
  { icon: Award,      label: "Solana Certified" },
  { icon: Cpu,        label: "On-chain Builder" },
  { icon: TrendingUp, label: "DeFi Native" },
];

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
    <div className="absolute inset-0 bg-grid" />
    <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
    <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[80px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-20 items-center min-h-[calc(100vh-4rem)] py-16">

        {/* ── Left ── */}
        <div className="space-y-8 order-2 lg:order-1">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-mono tracking-wide">Open to opportunities · Remote</span>
          </div>

          {/* Identity headline */}
          <div className="space-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">Recife, Brazil · Web3</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.88] tracking-tight">
              Builder.
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.88] tracking-tight text-muted-foreground/40">
              Founder.
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.88] tracking-tight">
              <span className="text-gradient">Web3 Native.</span>
            </h1>
          </div>

          {/* Value proposition */}
          <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
            I build{" "}
            <span className="text-foreground font-semibold">on-chain intelligence tools</span>{" "}
            that track capital, surface alpha, and close the gap between DeFi and real-world
            finance. Combining{" "}
            <span className="text-primary font-medium">7+ years of operational execution</span>{" "}
            with hands-on blockchain engineering.
          </p>

          {/* Credibility badges */}
          <div className="flex flex-wrap gap-2">
            {BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 text-muted-foreground text-xs font-mono"
              >
                <Icon className="w-3 h-3 text-primary" />
                {label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-[0_0_30px_hsl(22_100%_55%/0.3)] hover:shadow-[0_0_40px_hsl(22_100%_55%/0.5)] text-sm"
            >
              See My Products <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary/50 text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-200 text-sm"
            >
              Let's Build Together
            </a>
            <a
              href="/lucas-almeida-cv.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-3 border border-border text-muted-foreground font-medium rounded-lg hover:border-primary/40 hover:text-foreground transition-all duration-200 text-sm"
            >
              <Download className="w-4 h-4" /> CV
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 border-t border-border/50 pt-6">
            {[
              { value: "7+",  label: "Years Executing" },
              { value: "22+", label: "Repositories" },
              { value: "4",   label: "Chains Active" },
              { value: "2+",  label: "Hackathons" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-xl font-bold text-primary">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 font-mono tracking-wide uppercase">
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

        {/* ── Right: Terminal + build card ── */}
        <div className="order-1 lg:order-2 flex flex-col items-center gap-4 animate-float">

          {/* Chain status terminal */}
          <div className="w-full max-w-[300px] rounded-xl border border-border bg-card overflow-hidden shadow-[0_0_40px_hsl(22_100%_55%/0.06)]">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-card/50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">chain_status.sh</span>
            </div>
            <div className="p-4 font-mono text-xs space-y-1">
              <p className="text-muted-foreground mb-3 text-[11px]">
                <span className="text-accent">❯</span> hover chain for stack
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
                            className={`w-1.5 h-1.5 rounded-full ${i < chain.fill ? chain.color : "bg-border"}`}
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground text-[10px] ml-1 font-mono">{chain.fill}/10</span>
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
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                <span className="text-muted-foreground text-[11px] w-[68px]">audit   </span>
                <span className="text-primary font-bold text-[11px]">96/100</span>
                <div className="flex gap-0.5 ml-1">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-accent text-[11px]">❯</span>
                <span className="inline-block w-1.5 h-3 bg-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Currently building card */}
          <div className="w-full max-w-[300px] rounded-xl border border-accent/25 bg-accent/5 p-4 font-mono">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-[10px] tracking-wider uppercase">Currently Building</span>
            </div>
            <p className="text-foreground font-semibold text-xs mb-1.5">On-chain Wallet Intelligence</p>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              DeFi tracker that surfaces wallet behavior patterns and identifies profitable
              on-chain strategies.
            </p>
            <div className="flex gap-1 mt-3">
              {["Rust", "Solana", "React"].map((t) => (
                <span key={t} className="px-1.5 py-0.5 bg-accent/10 text-accent text-[9px] rounded border border-accent/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <div className="flex flex-col items-center gap-1 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-muted-foreground/30" />
        <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
      </div>
    </div>
  </section>
);

export default Hero;
