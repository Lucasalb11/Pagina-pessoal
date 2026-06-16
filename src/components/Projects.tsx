import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/hooks/useLang";
import { SHIPS, type Ship } from "@/data/projects.config";

const STATUS_STYLES: Record<Ship["status"], string> = {
  LIVE:  "bg-primary/10 text-primary border-primary/30",
  BUILT: "bg-onchain text-onchain border-onchain",
  WIP:   "bg-secondary/60 text-muted-foreground border-border",
};

const PROJECT_GRADIENTS: Record<string, string> = {
  structa:  "from-emerald-500/35 via-emerald-400/15 to-transparent",
  kalefi:   "from-amber-500/35 via-yellow-400/15 to-transparent",
  aegis:    "from-sky-500/35 via-cyan-400/15 to-transparent",
  blinkpay: "from-violet-500/35 via-fuchsia-400/15 to-transparent",
};

const ProjectImage = ({ ship }: { ship: Ship }) => {
  if (ship.image) {
    return (
      <img
        src={ship.image}
        alt={`${ship.name} preview`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
      />
    );
  }
  const gradient = PROJECT_GRADIENTS[ship.id] ?? "from-primary/30 via-primary/10 to-transparent";
  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--background)/0.0),hsl(var(--background)/0.6))]" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-8 lg:p-10">
        <span className="font-code text-[10px] text-foreground/60 tracking-[0.22em] uppercase mb-2">
          {ship.ecosystem}
        </span>
        <span className="font-display text-5xl lg:text-6xl text-foreground/85 leading-none">
          {ship.name}
        </span>
      </div>
    </div>
  );
};

const Shipped = () => {
  const { t } = useLang();
  const featured = SHIPS.find((s) => s.featured)!;
  const rest = SHIPS.filter((s) => !s.featured);

  return (
    <section id="shipped" className="py-32 relative overflow-hidden">
      <div className="absolute top-12 left-4 sm:left-12 section-marker">01</div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("shipped.kicker")}
              </span>
            </div>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-[3.5rem] leading-[1.1] max-w-3xl mb-6">
              {t("shipped.title")}
            </h2>
            <p className="max-w-[680px] text-base sm:text-[17px] leading-relaxed text-foreground/80">
              {t("shipped.intro")}
            </p>
          </Reveal>

          {/* Featured */}
          <Reveal className="mb-8">
            <a
              href={featured.live ?? featured.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-cursor-label={featured.name}
              className="group block rounded-3xl border border-border bg-surface/60 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="grid lg:grid-cols-[1.05fr_1fr]">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                  <ProjectImage ship={featured} />
                </div>

                <div className="p-8 lg:p-10 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-5 flex-wrap">
                      <span className={`font-code text-[10px] tracking-[0.22em] uppercase px-2 py-1 rounded-full border ${STATUS_STYLES[featured.status]}`}>
                        {featured.status}
                      </span>
                      <span className="font-code text-[10px] text-muted-foreground tracking-[0.22em] uppercase">
                        {featured.ecosystem} · Featured
                      </span>
                    </div>
                    <h3 className="text-display text-3xl lg:text-4xl leading-tight mb-4 group-hover:text-primary transition-colors">
                      {featured.name}
                    </h3>
                    <p className="font-serif italic text-lg text-foreground/85 leading-snug mb-4">
                      {t("shipped.featured.tagline")}
                    </p>
                    <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                      {t("shipped.featured.line")}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {featured.stack.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-full font-code text-[10px] text-foreground/70 bg-secondary/60 border border-border/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-4 pt-4 border-t border-border/60">
                    <div>
                      <div className="font-display text-3xl lg:text-4xl text-primary leading-none">
                        {featured.metric}
                      </div>
                      <div className="mt-2 font-code text-[10px] text-muted-foreground tracking-[0.22em] uppercase">
                        {featured.metricLabel}
                      </div>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-foreground/60 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </div>
              </div>
            </a>
          </Reveal>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.06}>
                <motion.a
                  href={s.live ?? s.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  data-cursor="hover"
                  data-cursor-label={s.name}
                  className="group block h-full rounded-3xl border border-border bg-surface/50 backdrop-blur-sm overflow-hidden hover:border-foreground/30 transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ProjectImage ship={s} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`font-code text-[9px] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full border ${STATUS_STYLES[s.status]}`}>
                        {s.status}
                      </span>
                      <span className="font-code text-[9px] text-muted-foreground tracking-[0.22em] uppercase">
                        {s.ecosystem}
                      </span>
                    </div>
                    <h4 className="font-display text-2xl leading-tight mb-2 group-hover:text-primary transition-colors">
                      {s.name}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 min-h-[3rem]">
                      {s.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {s.stack.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full font-code text-[9px] text-foreground/60 bg-secondary/50 border border-border/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/60">
                      <div>
                        <div className="font-display text-base text-foreground">{s.metric}</div>
                        <div className="font-code text-[9px] text-muted-foreground tracking-[0.18em] uppercase">{s.metricLabel}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex items-center justify-between gap-4 flex-wrap">
            <a
              href="https://github.com/Lucasalb11"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="link-bracket inline-flex items-center gap-2 font-code text-[11px] tracking-[0.22em] uppercase text-foreground hover:text-primary transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Every project is open on GitHub
            </a>
            <a
              href="https://x.com/11lucasa"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-1.5 font-code text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Build log on X
              <ExternalLink className="w-3 h-3" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Shipped;
