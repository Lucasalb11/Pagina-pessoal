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
      bullets: [
        "Founding member · Construtora Arcos (Feb 2021 → Mar 2025)",
        "Admin director · Arcos Estratégias em Arquitetura e Engenharia",
        "Owner · Arcos Premoldados — capital, payroll, suppliers, delivery",
      ],
      stats: [
        { k: "3",    v: "COMPANIES" },
        { k: "6 YR", v: "TENURE" },
        { k: "PE",   v: "CARUARU" },
      ],
      accent: "warm",
    },
    {
      label:    "BUILDER",
      org:      "Independent · On-chain",
      period:   "2024 — NOW",
      headline: t("track.role2.headline"),
      bullets: [
        "Structa: on-chain fundraising for Brazilian RWA, settled in USDC",
        "KaleFi: collateralized lending on Stellar Soroban (Rust)",
        "Aegis, Blinkpay: yield aggregation + Solana Blinks payments",
      ],
      stats: [
        { k: "4",   v: "PROTOCOLS" },
        { k: "3",   v: "ECOSYSTEMS" },
        { k: "ALL", v: "PRODUCTION" },
      ],
      accent: "primary",
    },
  ];

  return (
    <section id="track" className="py-32 relative overflow-hidden">
      <div className="absolute top-12 left-4 sm:left-12 section-marker">02</div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("track.kicker")}
              </span>
            </div>
            <h2 className="text-display text-4xl sm:text-5xl lg:text-[5rem] leading-[0.95] max-w-4xl">
              {t("track.title")}
            </h2>
          </Reveal>

          <div className="space-y-6 lg:space-y-8">
            {roles.map((r, i) => (
              <Reveal key={r.org} delay={i * 0.08}>
                <article className="group relative grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 p-6 sm:p-10 lg:p-12 rounded-3xl border border-border bg-surface/60 backdrop-blur-sm overflow-hidden hover:border-foreground/20 transition-all duration-500">
                  <div
                    className={`absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-25 group-hover:opacity-55 transition-opacity duration-700 ${
                      r.accent === "primary" ? "bg-primary/40" : "bg-[hsl(15,87%,49%,0.4)]"
                    }`}
                  />
                  <span className="absolute -bottom-8 -right-2 font-serif text-[10rem] sm:text-[14rem] leading-none text-foreground/[0.025] select-none pointer-events-none">
                    {r.period.split(" ")[0]}
                  </span>

                  <div className="relative space-y-5 z-10">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-code tracking-[0.22em] uppercase ${
                        r.accent === "primary"
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "bg-[hsl(15,87%,49%,0.1)] text-[hsl(15,87%,65%)] border border-[hsl(15,87%,49%,0.3)]"
                      }`}>
                        {r.label}
                      </span>
                      <span className="font-code text-[10px] text-muted-foreground tracking-wider uppercase">
                        {r.period}
                      </span>
                    </div>

                    <div>
                      <p className="font-code text-[11px] text-muted-foreground tracking-[0.22em] uppercase mb-2">
                        {r.org}
                      </p>
                      <h3 className="text-display text-2xl sm:text-3xl lg:text-4xl leading-[1]">
                        {r.headline}
                      </h3>
                    </div>

                    <ul className="space-y-2 pt-1">
                      {r.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-foreground/80">
                          <span className={`mt-2 w-1 h-1 rounded-full shrink-0 ${
                            r.accent === "primary" ? "bg-primary" : "bg-[hsl(15,87%,55%)]"
                          }`} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative grid grid-cols-3 gap-3 self-start z-10">
                    {r.stats.map((s) => (
                      <div key={s.v} className="p-4 rounded-2xl border border-border/80 bg-background/40 backdrop-blur-sm">
                        <div className={`font-display text-2xl lg:text-3xl font-medium leading-tight ${
                          r.accent === "primary" ? "text-primary" : "text-[hsl(15,87%,65%)]"
                        }`}>
                          {s.k}
                        </div>
                        <div className="mt-1.5 font-code text-[9px] text-muted-foreground tracking-[0.18em] uppercase">
                          {s.v}
                        </div>
                      </div>
                    ))}
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
