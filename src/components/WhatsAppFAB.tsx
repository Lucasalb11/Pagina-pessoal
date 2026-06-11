import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

/**
 * Floating WhatsApp button (bottom-right) with one-click direct chat.
 *
 * Number is currently a placeholder — update WA_NUMBER below.
 * Format: country code + area + number, digits only (e.g., "5581999999999").
 */
const WA_NUMBER = "5581995827273";
const WA_DEFAULT_MSG =
  "Oi Lucas, vi seu site (lucasalmeida.me) e queria conversar sobre uma oportunidade Web3.";

export const WhatsAppFAB = () => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // soft mount delay so it doesn't fight first paint
    const t = setTimeout(() => setMounted(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_DEFAULT_MSG)}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[80] flex flex-col items-end gap-3">
      {/* Tooltip card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[260px] rounded-2xl border border-border bg-card/95 backdrop-blur-xl p-4 shadow-[0_30px_60px_-20px_hsl(0_0%_0%/0.7)]"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-green-400/50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-green-400">
                  Online
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-sm text-foreground mb-1 font-medium">Falar agora</p>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Resposta direta. Builder partnerships, founding roles, hackathons.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-cursor-label="WhatsApp"
              className="group inline-flex w-full items-center justify-between gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#1ebe57] hover:shadow-[0_0_30px_hsl(141_70%_50%/0.45)]"
            >
              Open WhatsApp
              <MessageCircle className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The FAB itself */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open WhatsApp chat"
        data-cursor="hover"
        data-cursor-label="WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
        whileHover={reduce ? undefined : { scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_50px_-12px_hsl(141_70%_45%/0.7),_0_0_0_1px_hsl(141_70%_45%/0.3)]"
      >
        {/* Pulse rings */}
        {!reduce && (
          <>
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />
            <span
              className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
              style={{ animation: "pulse-glow 2.6s ease-in-out infinite" }}
            />
          </>
        )}
        {/* WhatsApp glyph (simplified) */}
        <svg
          viewBox="0 0 32 32"
          className="relative h-7 w-7 sm:h-8 sm:w-8"
          fill="currentColor"
          aria-hidden
        >
          <path d="M16 3C8.82 3 3 8.82 3 16c0 2.32.62 4.5 1.7 6.4L3 29l6.85-1.78A12.92 12.92 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.4c-1.97 0-3.85-.52-5.5-1.5l-.4-.24-4.07 1.06 1.08-3.96-.26-.41A10.4 10.4 0 1 1 16 26.4zm5.96-7.78c-.32-.16-1.92-.95-2.22-1.06-.3-.11-.52-.16-.74.16-.22.32-.85 1.06-1.05 1.28-.19.22-.39.24-.71.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.6-1.92-1.79-2.24-.18-.32-.02-.5.14-.66.14-.14.32-.39.48-.58.16-.19.21-.32.32-.54.11-.22.05-.4-.03-.56-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.68 0 1.58 1.16 3.11 1.32 3.33.16.22 2.27 3.47 5.5 4.86.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.92-.78 2.19-1.54.27-.76.27-1.4.19-1.54-.08-.13-.3-.21-.62-.37z" />
        </svg>
      </motion.button>
    </div>
  );
};

export default WhatsAppFAB;
