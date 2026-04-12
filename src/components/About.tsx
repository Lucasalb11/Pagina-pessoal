import { Building2, Search, Layers, ArrowRight } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";

const CHAPTERS = [
  {
    number:  "01",
    icon:    Building2,
    title:   "Built Real Businesses First",
    period:  "2017 — 2024",
    body:    "Co-founded a real estate development company from scratch. Led teams of 100+ people. Orchestrated 12 simultaneous construction projects across Caruaru and Recife. Secured institutional financing through Caixa Econômica Federal. I learned what real execution looks like — under pressure, with actual capital on the line, and no tolerance for theory without practice.",
    accent:  "primary" as const,
  },
  {
    number:  "02",
    icon:    Search,
    title:   "Started Asking Harder Questions",
    period:  "The Inflection Point",
    body:    "Running a real business taught me one thing: the financial system is built for intermediaries, not builders. Slow, opaque, and extractive. I started asking — what if capital moved at the speed of code? What if anyone could verify where money went, on-chain, in real time, without asking permission?",
    accent:  "accent" as const,
  },
  {
    number:  "03",
    icon:    Layers,
    title:   "Found Web3. Started Shipping.",
    period:  "2023 — Present",
    body:    "Went all-in. Got Solana certified. Built wallet intelligence tools and DeFi analytics. Entered hackathons. The edge I bring isn't just code — it's understanding the business layer behind every protocol. I've run teams, managed capital, and shipped under pressure. Now I do all of it on-chain.",
    accent:  "primary" as const,
  },
];

const About = () => (
  <section id="about" className="py-24 relative overflow-hidden">
    <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/4 rounded-full blur-[100px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-end gap-6 mb-16 relative">
          <span className="section-number select-none absolute -top-4 left-0 leading-none">01</span>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">My Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              From Ground Up
              <br />
              <span className="text-gradient">to On-Chain</span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-12 lg:gap-20 items-start">

          {/* Left: Three chapters */}
          <div>
            {CHAPTERS.map((chapter, i) => (
              <div key={chapter.number} className="relative flex gap-6 pb-10 last:pb-0 group">

                {/* Connector line between chapters */}
                {i < CHAPTERS.length - 1 && (
                  <div
                    className={`absolute left-[19px] top-12 bottom-0 w-px ${
                      chapter.accent === "primary" ? "bg-primary/20" : "bg-accent/20"
                    }`}
                  />
                )}

                {/* Icon */}
                <div
                  className={`shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 ${
                    chapter.accent === "primary"
                      ? "border-primary/40 bg-primary/10 group-hover:border-primary group-hover:bg-primary/20"
                      : "border-accent/40 bg-accent/10 group-hover:border-accent group-hover:bg-accent/20"
                  }`}
                >
                  <chapter.icon
                    className={`w-4 h-4 ${chapter.accent === "primary" ? "text-primary" : "text-accent"}`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-mono text-[10px] text-muted-foreground/60 tracking-widest">
                      {chapter.number}
                    </span>
                    <span
                      className={`font-mono text-[10px] tracking-wider px-2 py-0.5 rounded border ${
                        chapter.accent === "primary"
                          ? "bg-primary/5 border-primary/20 text-primary/70"
                          : "bg-accent/5 border-accent/20 text-accent/70"
                      }`}
                    >
                      {chapter.period}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2.5">{chapter.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{chapter.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Photo + facts */}
          <div className="flex flex-col items-center lg:items-start gap-6">

            {/* Photo */}
            <div className="relative">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_60px_hsl(22_100%_55%/0.15)]">
                <img src={profileImage} alt="Lucas de Almeida" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20" />
              <div className="absolute -top-3 -left-3 w-9 h-9 rounded-lg bg-accent/10 border border-accent/20" />
            </div>

            {/* Quick facts */}
            <div className="w-full space-y-2 font-mono">
              {[
                { label: "NAME",     value: "Lucas de Almeida" },
                { label: "LOCATION", value: "Recife, Brazil" },
                { label: "FOCUS",    value: "DeFi / On-chain" },
                { label: "ENGLISH",  value: "B2 Level" },
                { label: "REMOTE",   value: "Ready" },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between border-b border-border/40 pb-1.5">
                  <span className="text-muted-foreground text-[11px] tracking-widest">{fact.label}</span>
                  <span className="text-foreground text-[11px]">{fact.value}</span>
                </div>
              ))}
              <div className="flex justify-between pb-1.5">
                <span className="text-muted-foreground text-[11px] tracking-widest font-mono">STATUS</span>
                <span className="flex items-center gap-1.5 text-[11px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Available
                </span>
              </div>
            </div>

            {/* Actively building */}
            <div className="w-full p-4 rounded-xl bg-card border border-accent/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] text-accent tracking-widest uppercase">Actively Building</span>
              </div>
              <ul className="space-y-1.5">
                {[
                  "Wallet intelligence tools (Solana)",
                  "DeFi analytics & on-chain data",
                  "Hackathon projects — Solana & Stellar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                    <span className="text-primary shrink-0 mt-0.5">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-1.5 text-sm text-primary/80 hover:text-primary transition-colors font-medium"
            >
              Let's build together <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
