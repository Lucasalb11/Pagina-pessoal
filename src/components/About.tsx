import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const CHAPTERS = [
  {
    n:       "I",
    title:   "Built real businesses",
    period:  "2019 — 2025",
    kicker:  "Operator",
    body:    "Co-founded a real estate development company from zero. Led 100+ people across 12 simultaneous construction projects. Secured institutional financing through Caixa Econômica Federal. Real payroll. Real debt. Real stakes. That pressure shaped how I think about risk, capital and product.",
  },
  {
    n:       "II",
    title:   "Asked harder questions",
    period:  "The pivot",
    kicker:  "Inflection",
    body:    "Running a real business taught me one thing — the financial system is built for intermediaries, not builders. Slow. Opaque. Extractive. I started asking what capital would look like if it moved at the speed of code. What if anyone could verify where money went, on-chain, in real time, without asking permission?",
  },
  {
    n:       "III",
    title:   "Found Web3. Started shipping.",
    period:  "2023 — Present",
    kicker:  "Builder",
    body:    "Went all-in on on-chain. Got Solana certified through Ackee's School of Solana. Built wallet intelligence tools and DeFi analytics. Shipped Structa.finance at the Solana Frontier hackathon. The edge I bring isn't just code — it's understanding the business layer behind every protocol. I've run teams, managed capital, shipped under pressure. Now I do all of it on-chain.",
  },
];

const FACTS = [
  { label: "Name",     value: "Lucas de Almeida" },
  { label: "Location", value: "Recife, Brazil" },
  { label: "Focus",    value: "DeFi / On-chain" },
  { label: "Languages",value: "PT-BR · EN" },
  { label: "Status",   value: "Available · Remote" },
];

const About = () => (
  <section id="about" className="py-32 relative overflow-hidden">

    <div className="absolute top-12 right-4 sm:right-12 section-marker">01</div>

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Section header */}
        <Reveal className="mb-20 lg:mb-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-primary" />
            <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">Story · Chapter One</span>
          </div>
          <h2 className="text-display text-5xl sm:text-7xl lg:text-[8rem] leading-[0.9]">
            From ground up<br />
            <span className="font-serif italic font-normal text-muted-foreground/80">to on-chain.</span>
          </h2>
        </Reveal>

        {/* Chapters */}
        <div className="space-y-24 lg:space-y-36">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.05}>
              <div className="grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-16">

                <div className="flex lg:flex-col gap-4 lg:gap-2 lg:sticky lg:top-32 self-start">
                  <span className="font-serif text-7xl lg:text-9xl leading-none text-foreground">{c.n}</span>
                  <div className="flex flex-col gap-1 pt-2 lg:pt-0">
                    <span className="font-mono text-[10px] text-primary tracking-[0.25em] uppercase">{c.kicker}</span>
                    <span className="font-mono text-[10px] text-muted-foreground tracking-wider">{c.period}</span>
                  </div>
                </div>

                <div className="max-w-2xl">
                  <h3 className="text-display text-3xl sm:text-5xl lg:text-6xl leading-[0.95] mb-6">
                    {c.title}
                  </h3>
                  <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quick facts strip */}
        <Reveal className="mt-32">
          <div className="grid sm:grid-cols-5 gap-6 sm:gap-3 border-t border-border pt-10">
            {FACTS.map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5">
                <span className="font-mono text-[9px] text-muted-foreground tracking-[0.25em] uppercase">{f.label}</span>
                <span className="text-sm text-foreground font-medium">{f.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-6 flex-wrap">
            <p className="font-serif italic text-2xl lg:text-3xl text-foreground/90 max-w-2xl leading-tight">
              Code without business thinking is just code.
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              data-cursor="hover"
              className="group inline-flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors font-medium"
            >
              Let's build together
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
