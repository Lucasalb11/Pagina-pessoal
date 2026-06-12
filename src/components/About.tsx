import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/hooks/useLang";

const Story = () => {
  const { t } = useLang();

  const chapters = [
    {
      n: "I",
      title: t("story.ch1.title"),
      body:  t("story.ch1.body"),
      kicker: "2017 — 2024",
    },
    {
      n: "II",
      title: t("story.ch2.title"),
      body:  t("story.ch2.body"),
      kicker: "2023 — 2024",
    },
    {
      n: "III",
      title: t("story.ch3.title"),
      body:  t("story.ch3.body"),
      kicker: "2024 — NOW",
    },
  ];

  return (
    <section id="story" className="py-32 relative overflow-hidden">
      <div className="absolute top-12 right-4 sm:right-12 section-marker">01</div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-20 lg:mb-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("story.kicker")}
              </span>
            </div>
            <h2 className="text-display text-4xl sm:text-6xl lg:text-[6.5rem] leading-[0.92] max-w-5xl">
              {t("story.title.before")}
              <span className="font-serif italic font-normal text-primary">
                {t("story.title.accent")}
              </span>
            </h2>
          </Reveal>

          <div className="space-y-20 lg:space-y-28">
            {chapters.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.05}>
                <div className="grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-16">
                  <div className="flex lg:flex-col gap-4 lg:gap-2 lg:sticky lg:top-32 self-start">
                    <span className="font-serif text-7xl lg:text-9xl leading-none text-foreground">
                      {c.n}
                    </span>
                    <div className="flex flex-col gap-1 pt-2 lg:pt-0">
                      <span className="font-code text-[10px] text-primary tracking-[0.25em] uppercase">
                        CH. {c.n}
                      </span>
                      <span className="font-code text-[10px] text-muted-foreground tracking-wider">
                        {c.kicker}
                      </span>
                    </div>
                  </div>
                  <div className="max-w-2xl">
                    <h3 className="text-display text-2xl sm:text-4xl lg:text-5xl leading-[1] mb-5">
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
        </div>
      </div>
    </section>
  );
};

export default Story;
