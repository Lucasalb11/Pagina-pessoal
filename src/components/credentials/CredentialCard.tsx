import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Copy, ShieldCheck, User } from "lucide-react";
import type { Cert } from "@/data/certs.config";
import { truncateAddress, solscan } from "@/lib/format";

interface Props {
  cert: Cert;
  variant?: "drum" | "grid";
}

const STATUS_STYLES: Record<Cert["status"], { label: string; chip: string }> = {
  MINTED:         { label: "MINTED · ON-CHAIN", chip: "border-onchain bg-onchain text-onchain" },
  READY_TO_MINT:  { label: "READY",             chip: "border-primary/40 bg-primary/10 text-primary" },
  PENDING:        { label: "PENDING",           chip: "border-border bg-secondary/50 text-muted-foreground" },
};

const CredentialCard = ({ cert }: Props) => {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const status = STATUS_STYLES[cert.status];
  const Icon = cert.icon;
  const isAttested = cert.attest === "issuer";

  useEffect(() => {
    const mq = window.matchMedia?.("(hover: none), (pointer: coarse)");
    setIsTouch(!!mq?.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cert.mintAddress) return;
    try {
      await navigator.clipboard.writeText(cert.mintAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch { /* ignore */ }
  };

  const useHover = !reduce && !isTouch;

  return (
    <motion.div
      onHoverStart={() => useHover && setFlipped(true)}
      onHoverEnd={() => useHover && setFlipped(false)}
      onClick={() => !useHover && setFlipped((f) => !f)}
      data-cursor="hover"
      data-cursor-label={cert.name}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full aspect-[3/4] cursor-pointer"
      style={{ perspective: 1400 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-3xl border border-border bg-surface holo-edge overflow-hidden p-6 flex flex-col justify-between gradient-credential"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="flex items-start justify-between gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-code tracking-[0.18em] uppercase ${status.chip}`}>
              <span className="relative inline-flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-60" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-current" />
              </span>
              {status.label}
            </span>
            <span className="font-code text-[9px] tracking-[0.18em] uppercase text-muted-foreground">
              {cert.ecosystem ?? ""}
            </span>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-2xl border border-border/80 bg-background/40 backdrop-blur flex items-center justify-center">
              <Icon className="w-6 h-6 text-foreground/80" />
            </div>
            <div>
              <h4 className="font-display text-lg leading-tight">{cert.name}</h4>
              <p className="font-code text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1.5">
                {cert.issuer}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="font-code text-[9px] tracking-[0.18em] uppercase text-muted-foreground">
              {cert.dateIssued}
            </span>
            <span className={`inline-flex items-center gap-1 font-code text-[9px] tracking-[0.18em] uppercase ${isAttested ? "text-foreground/70" : "text-muted-foreground/50"}`}>
              {isAttested ? <ShieldCheck className="w-2.5 h-2.5" /> : <User className="w-2.5 h-2.5" />}
              {isAttested ? "ATTESTED" : "SELF"}
            </span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-3xl border border-onchain bg-surface-2 overflow-hidden p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <span className="font-code text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
              ATTRIBUTES
            </span>
            <div className="mt-3 space-y-1.5">
              {cert.attributes?.slice(0, 5).map((a) => (
                <div key={a.trait_type} className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-code text-muted-foreground tracking-[0.12em] uppercase">{a.trait_type}</span>
                  <span className="font-code text-foreground text-right truncate max-w-[60%]">{a.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {cert.mintAddress ? (
              <button
                onClick={copy}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-full border border-onchain bg-onchain font-code text-[10px] tracking-[0.18em] uppercase hover:bg-accent/20 transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-primary">COPIED.</motion.span>
                  ) : (
                    <motion.span key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-onchain">
                      MINT · {truncateAddress(cert.mintAddress)}
                    </motion.span>
                  )}
                </AnimatePresence>
                <Copy className="w-3 h-3 text-onchain/70" />
              </button>
            ) : (
              <div className="px-3 py-2 rounded-full border border-border bg-secondary/30 font-code text-[10px] tracking-[0.18em] uppercase text-muted-foreground text-center">
                {cert.status === "READY_TO_MINT" ? "READY TO MINT" : "PENDING"}
              </div>
            )}
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-cursor="hover"
                data-cursor-label="Verify with issuer"
                className="w-full link-bracket flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary font-code text-[10px] tracking-[0.18em] uppercase hover:bg-primary/20 transition-colors"
              >
                VERIFY · ISSUER
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {cert.mintAddress && (
              <a
                href={solscan(cert.mintAddress)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-cursor="hover"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-border font-code text-[10px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                VIEW ON SOLSCAN
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CredentialCard;
