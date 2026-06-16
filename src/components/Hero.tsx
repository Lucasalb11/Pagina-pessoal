import { motion } from "framer-motion";
import PortraitCard from "@/components/hero/PortraitCard";
import WalletPill from "@/components/web3/WalletPill";
import { useLang } from "@/hooks/useLang";

const Hero = () => {
  const { t } = useLang();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 sm:pt-36 pb-20">
      <div className="absolute inset-0 bg-dot opacity-30 pointer-events-none" />
      <div className="absolute inset-0 gradient-hero pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px] h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[720px] h-[140px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
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

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start">
            <div className="relative max-w-[640px]">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-display text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.1] mb-10"
              >
                {t("hero.greeting")}
              </motion.h1>

              <div className="space-y-5 text-base sm:text-[17px] leading-relaxed text-foreground/85">
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                >
                  {t("hero.p1")}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  {t("hero.p2")}
                </motion.p>
              </div>
            </div>

            <PortraitCard />
          </div>
        </div>
      </div>

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
