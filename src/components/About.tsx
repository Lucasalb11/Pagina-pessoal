import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/hooks/useLang";

const Story = () => {
  const { t } = useLang();

  return (
    <section id="story" className="py-32 relative overflow-hidden">
      <div className="absolute top-12 right-4 sm:right-12 section-marker">03</div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("story.kicker")}
              </span>
            </div>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-[3.5rem] leading-[1.1] max-w-3xl">
              {t("story.title")}
            </h2>
          </Reveal>

          <Reveal>
            <div className="max-w-[680px] space-y-6 text-base sm:text-[17px] leading-relaxed text-foreground/85">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Story;
