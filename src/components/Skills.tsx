import { Lightbulb, Link2, Code2, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/hooks/useLang";

const Pillars = () => {
  const { t } = useLang();

  const pillars = [
    {
      n: "I",   icon: Lightbulb,
      title: t("pillars.p1.title"), tag: t("pillars.p1.tag"),
      stack: ["Mechanism design", "RWA modeling", "Capital stacks", "GTM"],
    },
    {
      n: "II",  icon: Link2,
      title: t("pillars.p2.title"), tag: t("pillars.p2.tag"),
      stack: ["Anchor", "Soroban", "Foundry", "SPL · Token-2022"],
    },
    {
      n: "III", icon: Code2,
      title: t("pillars.p3.title"), tag: t("pillars.p3.tag"),
      stack: ["Rust", "TypeScript", "React", "Helius DAS"],
    },
    {
      n: "IV",  icon: Zap,
      title: t("pillars.p4.title"), tag: t("pillars.p4.tag"),
      stack: ["Team leadership", "Capital allocation", "Risk", "Crisis mgmt"],
    },
  ];

  return (
    <section id="pillars" className="py-32 relative overflow-hidden">
      <div className="absolute top-12 right-4 sm:right-12 section-marker">04</div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("pillars.kicker")}
              </span>
            </div>
            <h2 className="text-display text-4xl sm:text-5xl lg:text-[5rem] leading-[0.95] max-w-4xl">
              {t("pillars.title")}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {pillars.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <article className="group relative h-full p-8 lg:p-10 rounded-3xl border border-border bg-surface/60 backdrop-blur-sm overflow-hidden hover:border-foreground/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <span className="absolute -top-4 right-4 lg:right-6 font-serif text-[8rem] lg:text-[10rem] leading-none text-foreground/[0.035] select-none pointer-events-none">
                    {p.n}
                  </span>

                  <div className="relative">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-12 h-12 rounded-2xl border border-border bg-background/60 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                        <p.icon className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="font-code text-[10px] text-muted-foreground tracking-[0.22em] uppercase mt-3">
                        {p.n}
                      </span>
                    </div>

                    <h3 className="text-display text-2xl lg:text-3xl leading-tight mb-3">
                      {p.title}
                    </h3>
                    <p className="font-serif italic text-lg text-muted-foreground mb-6 leading-snug">
                      {p.tag}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-full font-code text-[10px] text-foreground/70 bg-secondary/60 border border-border/60 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all cursor-default"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
