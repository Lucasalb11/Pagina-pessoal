import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PortraitCard from "@/components/hero/PortraitCard";
import OnChainHUD from "@/components/web3/OnChainHUD";
import WalletPill from "@/components/web3/WalletPill";
import { useLang } from "@/hooks/useLang";

const Hero = () => {
  const { t } = useLang();

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 sm:pt-36 pb-20">
      {/* Atmospherics */}
      <div className="absolute inset-0 bg-dot opacity-30 pointer-events-none" />
      <div className="absolute inset-0 gradient-hero pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px] h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[720px] h-[140px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          {/* Kicker row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-10 sm:mb-14"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-code text-[10px] text-primary tracking-[0.22em] uppercase">
                {t("hero.eyebrow")}
              </span>
            </span>
            <WalletPill />
          </motion.div>

          {/* The split: headline + hologram */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-end">
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-display text-[12vw] sm:text-[9vw] lg:text-[6.5rem] xl:text-[7.5rem] leading-[0.88]"
              >
                <span className="block">{t("hero.display.before")}</span>
                <span className="block font-serif italic font-normal text-primary">
                  {t("hero.display.accent")}
                </span>
                <span className="block">{t("hero.display.after").trim()}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-9 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
              >
                {t("hero.sub")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#shipped"
                  onClick={scrollTo("#shipped")}
                  data-cursor="hover"
                  data-cursor-label={t("hero.cta.primary")}
                  className="group inline-flex items-center gap-2 pl-5 pr-4 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.55)] hover:shadow-[0_18px_44px_-16px_hsl(var(--primary)/0.7)] text-sm"
                >
                  {t("hero.cta.primary")}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="#signal"
                  onClick={scrollTo("#signal")}
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-border text-foreground rounded-full hover:border-foreground/40 hover:bg-secondary/40 transition-all text-sm"
                >
                  {t("hero.cta.secondary")}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="mt-10"
              >
                <OnChainHUD />
              </motion.div>
            </div>

            <PortraitCard />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-code text-[10px] tracking-[0.32em] uppercase text-muted-foreground/50">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-px h-6 bg-gradient-to-b from-muted-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
