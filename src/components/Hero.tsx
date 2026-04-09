import { Github, Linkedin, Mail, ChevronDown, ArrowRight } from "lucide-react";

const STATS = [
  { value: "22+",  label: "Repositories" },
  { value: "4",    label: "Chains" },
  { value: "2+",   label: "Years" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Deep background grid */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Glowing orbs */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center min-h-[calc(100vh-4rem)] py-16">

          {/* Left — Text */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">
                Blockchain Developer · Recife, Brazil
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight">
                Lucas
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight">
                de{" "}
                <span className="text-gradient">Almeida</span>
                <span className="text-primary">.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Building{" "}
              <span className="text-foreground font-medium">secure, scalable</span>{" "}
              smart contracts and decentralized protocols across{" "}
              <span className="text-primary font-medium">Solidity</span>,{" "}
              <span className="text-primary font-medium">Rust</span>,{" "}
              Solana, and Stellar. Privacy-first, production-ready.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-[0_0_30px_hsl(22_100%_55%/0.3)] hover:shadow-[0_0_40px_hsl(22_100%_55%/0.5)]"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:border-primary/60 hover:text-primary transition-all duration-200"
              >
                Get in Touch
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-2 border-t border-border/50 pt-6">
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <div className="font-mono text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-mono tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 pt-2">
              {[
                { href: "https://github.com/Lucasalb11", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/lucasalb11/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:lucasalb11@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Terminal Visual */}
          <div className="order-1 lg:order-2 flex items-center justify-center animate-float">
            <div className="w-full max-w-sm rounded-xl border border-border bg-card shadow-[0_0_80px_hsl(22_100%_55%/0.08)] overflow-hidden">
              {/* Window bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-card/50">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">chain_status.sh</span>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-xs space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    <span className="text-accent">❯</span> chain_status --live
                  </p>
                  <div className="mt-3 space-y-2">
                    {[
                      { name: "ethereum", fill: 9, color: "bg-primary" },
                      { name: "solana  ", fill: 9, color: "bg-accent" },
                      { name: "stellar ", fill: 8, color: "bg-primary" },
                    ].map((chain) => (
                      <div key={chain.name} className="flex items-center gap-3">
                        <span className="text-muted-foreground w-20">{chain.name}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 10 }, (_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-sm ${i < chain.fill ? chain.color : "bg-muted"}`}
                            />
                          ))}
                        </div>
                        <span className="text-green-400 text-[10px]">●</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    <span className="text-accent">❯</span> contracts --deployed
                  </p>
                  <div className="mt-2 space-y-1">
                    {["vault.sol", "staking.sol", "bridge.sol"].map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <span className="text-green-400 text-[10px]">✓</span>
                        <span className="text-foreground/70">{f}</span>
                        <span className="text-primary text-[10px] ml-auto">verified</span>
                      </div>
                    ))}
                    <div className="text-muted-foreground text-[10px] pl-4">+ 12 more...</div>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    <span className="text-accent">❯</span> audit_score
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-primary font-bold">96/100</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-2.5 h-2 rounded-sm ${i < 9 ? "bg-primary" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="text-primary font-bold">A+</span>
                  </div>
                </div>

                {/* Cursor */}
                <div className="flex items-center gap-1">
                  <span className="text-accent">❯</span>
                  <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
