import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";
import { LUCAS_WALLET } from "@/lib/helius";
import { truncateAddress, solscanAccount } from "@/lib/format";

interface WalletPillProps {
  size?: "sm" | "md";
  showLabel?: boolean;
}

const DEMO_WALLET = "7xKXMNQ8aRHDVc4z5DKLPpqYbT2vMbNcQwHkLm9aB"; // visual placeholder when env is unset

const WalletPill = ({ size = "sm", showLabel = true }: WalletPillProps) => {
  const wallet = LUCAS_WALLET || DEMO_WALLET;
  const isLive = !!LUCAS_WALLET;
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(wallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch { /* ignore */ }
  };

  const padding = size === "md" ? "px-3 py-1.5" : "px-2.5 py-1";
  const textSize = size === "md" ? "text-xs" : "text-[10px]";

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border border-onchain bg-onchain ${padding}`}>
      {showLabel && (
        <span className={`font-code ${textSize} text-onchain tracking-[0.18em] uppercase`}>
          {isLive ? "WALLET" : "DEMO"}
        </span>
      )}
      <button
        onClick={copy}
        data-cursor="hover"
        data-cursor-label={copied ? "Copied" : "Copy address"}
        className={`font-code ${textSize} text-foreground/85 hover:text-foreground transition-colors`}
        aria-label="Copy wallet address"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-1 text-primary"
            >
              COPIED.
            </motion.span>
          ) : (
            <motion.span
              key="addr"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {truncateAddress(wallet)}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      {isLive && (
        <a
          href={solscanAccount(wallet)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          data-cursor-label="Open on Solscan"
          className="text-onchain/70 hover:text-onchain"
          onClick={(e) => e.stopPropagation()}
          aria-label="Open on Solscan"
        >
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
      <button
        onClick={copy}
        className="text-onchain/70 hover:text-onchain"
        aria-label="Copy"
      >
        <Copy className="w-3 h-3" />
      </button>
    </div>
  );
};

export default WalletPill;
