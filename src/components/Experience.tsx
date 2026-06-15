import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/hooks/useLang";

const TrackRecord = () => {
  const { t } = useLang();

  const roles = [
    {
      label:    "OPERATOR",
      org:      "Grupo Arcos · Caruaru, PE",
      period:   "2019 — 2025",
      headline: t("track.role1.headline"),
      body:     t("track.role1.body"),
      accent:   "warm",
    },
    {
      label:    "BUILDER",
      org:      "Independent · On-chain",
      period:   "2024 — Now",
      headline: t("track.role2.headline"),
      body:     t("track.role2.body"),
      accent:   "primary",
    },
  ];

  return (
    <section id="track" className="py-32 relative overflow-hidden">
      <div className="absolute top-12 left-4 sm:left-12 section-marker">02</div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("track.kicker")}
              </span>
            </div>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-[3.5rem] leading-[1.1] max-w-3xl">
              {t("track.title")}
            </h2>
          </Reveal>

          <div className="space-y-10 lg:space-y-14">
            {roles.map((r, i) => (
              <Reveal key={r.org} delay={i * 0.06}>
                <article className="relative grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-12 py-8 border-t border-border">
                  <div className="flex flex-col gap-2">
                    <span className={`inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-code tracking-[0.22em] uppercase ${
                      r.accent === "primary"
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "bg-[hsl(15,87%,49%,0.1)] text-[hsl(15,87%,49%)] border border-[hsl(15,87%,49%,0.3)]"
                    }`}>
                      {r.label}
                    </span>
                    <span className="font-code text-[10px] text-muted-foreground tracking-wider uppercase">
                      {r.period}
                    </span>
                    <span className="font-code text-[10px] text-muted-foreground/70 tracking-[0.18em] uppercase mt-1">
                      {r.org}
                    </span>
                  </div>

                  <div className="max-w-[680px] space-y-4">
                    <h3 className="text-display text-2xl sm:text-3xl leading-tight">
                      {r.headline}
                    </h3>
                    <p className="text-base sm:text-[17px] leading-relaxed text-foreground/80">
                      {r.body}
                    </p>
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

export default TrackRecord;
