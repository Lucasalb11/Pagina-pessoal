import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollText, Boxes, Languages, Send, X, HelpCircle, ArrowDownRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const STORAGE_KEY = "lda:guide:seen";
const AUTO_OPEN_DELAY_MS = 2200;

export default function VisitorGuide() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(true); // start true to avoid SSR flash

  useEffect(() => {
    const prior = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : "1";
    if (prior) {
      setSeen(true);
      return;
    }
    setSeen(false);
    const id = window.setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  const dismiss = () => {
    setOpen(false);
    setSeen(true);
    try { window.localStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
  };

  const reopen = () => setOpen(true);

  const steps = [
    { Icon: ScrollText, title: t("guide.s1.title"), body: t("guide.s1.body") },
    { Icon: Boxes,      title: t("guide.s2.title"), body: t("guide.s2.body") },
    { Icon: Languages,  title: t("guide.s3.title"), body: t("guide.s3.body") },
    { Icon: Send,       title: t("guide.s4.title"), body: t("guide.s4.body") },
  ];

  return (
    <>
      {/* Floating re-open pill (always available after dismissal) */}
      <AnimatePresence>
        {!open && seen && (
          <motion.button
            key="reopen"
            type="button"
            onClick={reopen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 z-40 group inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-background/80 backdrop-blur-md hover:border-primary/60 hover:bg-background transition-colors"
            aria-label={t("guide.reopen")}
          >
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span className="font-code text-[10px] tracking-[0.22em] uppercase text-foreground group-hover:text-primary">
              {t("guide.reopen")}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Guide panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed bottom-5 right-5 z-50 w-[min(380px,calc(100vw-2.5rem))]"
            role="dialog"
            aria-label={t("guide.title")}
          >
            <div className="relative rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* holo edge */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
                style={{
                  background:
                    "conic-gradient(from 140deg at 50% 50%, hsl(var(--primary) / 0.0), hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.4), hsl(var(--primary) / 0.0))",
                  WebkitMask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                  WebkitMaskComposite: "xor" as unknown as string,
                  padding: "1px",
                }}
              />

              {/* header */}
              <div className="flex items-start justify-between gap-3 px-5 pt-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="relative inline-flex w-1.5 h-1.5">
                      <span className="absolute inset-0 rounded-full animate-ping opacity-60 bg-primary" />
                      <span className="relative w-1.5 h-1.5 rounded-full bg-primary" />
                    </span>
                    <span className="font-code text-[9px] tracking-[0.28em] uppercase text-primary">
                      ON-BOARDING
                    </span>
                  </div>
                  <h3 className="font-display text-lg leading-tight text-foreground">
                    {t("guide.title")}
                  </h3>
                  <p className="font-code text-[10px] tracking-[0.16em] uppercase text-muted-foreground mt-1">
                    {t("guide.subtitle")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Close guide"
                  className="shrink-0 -mr-1 -mt-1 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* steps */}
              <ol className="px-5 pt-5 pb-4 space-y-4">
                {steps.map(({ Icon, title, body }, i) => (
                  <li key={title} className="flex gap-3">
                    <div className="shrink-0">
                      <div className="w-7 h-7 rounded-md border border-border bg-foreground/[0.02] grid place-items-center">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="font-code text-[9px] tracking-[0.22em] text-muted-foreground mt-1.5 text-center">
                        0{i + 1}
                      </div>
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <div className="font-display text-sm text-foreground leading-snug">{title}</div>
                      <p className="text-[12px] leading-relaxed text-muted-foreground mt-0.5">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* footer actions */}
              <div className="border-t border-border px-5 py-3 flex items-center justify-between gap-3 bg-foreground/[0.015]">
                <a
                  href="#credentials"
                  onClick={dismiss}
                  className="group inline-flex items-center gap-1.5 font-code text-[10px] tracking-[0.22em] uppercase text-foreground hover:text-primary transition-colors"
                >
                  {t("guide.cta.openCreds")}
                  <ArrowDownRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </a>
                <button
                  type="button"
                  onClick={dismiss}
                  className="font-code text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                >
                  {t("guide.cta.dismiss")}
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
