import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/hooks/useLang";
import CredentialDrum from "@/components/credentials/CredentialDrum";
import { PROGRAM_STATS } from "@/data/certs.config";

const Credentials = () => {
  const { t } = useLang();

  return (
    <section id="credentials" className="py-32 relative overflow-hidden">
      <div className="absolute top-12 right-4 sm:right-12 section-marker">05</div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("creds.kicker")}
              </span>
              <span className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-onchain bg-onchain">
                <span className="relative inline-flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full animate-ping opacity-60 bg-accent" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-code text-[9px] tracking-[0.22em] uppercase text-onchain">
                  ON-CHAIN PROOF
                </span>
              </span>
            </div>
            <h2 className="text-display text-4xl sm:text-6xl lg:text-[5.5rem] leading-[0.95] max-w-5xl">
              {t("creds.title")}
            </h2>
            <p className="font-serif italic text-xl lg:text-2xl text-muted-foreground mt-6 max-w-3xl leading-snug">
              {t("creds.sub")}
            </p>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              <span>
                <span className="text-foreground">{PROGRAM_STATS.totalCount}</span> ISSUED
              </span>
              <span className="text-border">·</span>
              <span>
                <span className="text-primary">{PROGRAM_STATS.mintedCount}</span> MINTED ON SOLANA
              </span>
              {PROGRAM_STATS.readyCount > 0 && (
                <>
                  <span className="text-border">·</span>
                  <span>
                    <span className="text-onchain">{PROGRAM_STATS.readyCount}</span> READY TO MINT
                  </span>
                </>
              )}
              <span className="text-border">·</span>
              <span>MPL CORE · SOULBOUND · DEVNET</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <CredentialDrum />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
