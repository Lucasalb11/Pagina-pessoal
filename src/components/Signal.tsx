import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Activity, ArrowUpRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { CHAINS } from "@/data/projects.config";

const Signal = () => {
  const { t } = useLang();
  return (
    <section id="signal" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[55%] bg-primary/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 left-4 sm:left-12 section-marker">04</div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="mb-14">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("signal.kicker")}
              </span>
            </div>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-[3.5rem] leading-[1.1] max-w-3xl">
              {t("signal.title")}
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
            <Reveal>
              <div className="max-w-[680px] space-y-6 text-base sm:text-[17px] leading-relaxed text-foreground/85">
                <p>{t("signal.p1")}</p>
                <p>{t("signal.p2")}</p>
                <p>{t("signal.p3")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative p-6 rounded-3xl border border-border bg-surface/70 backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                    <span className="font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                      Chains I work on
                    </span>
                  </div>
                  <span className="font-code text-[9px] tracking-[0.22em] uppercase text-muted-foreground/50">
                    {CHAINS.length} ACTIVE
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {CHAINS.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <Link
                        to={`/chain/${c.slug}`}
                        className="group flex items-center gap-3 p-3 rounded-2xl border border-border/60 bg-background/40 hover:border-primary/40 hover:bg-primary/[0.04] transition-all"
                      >
                        <div className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center font-code text-[10px] font-bold text-primary tracking-wider">
                          {c.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{c.name}</div>
                          <div className="font-code text-[9px] text-muted-foreground/70 tracking-[0.18em] uppercase mt-0.5">
                            {c.focus}
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signal;
