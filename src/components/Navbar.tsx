import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/brand/Logo";
import { useLang } from "@/hooks/useLang";

const Navbar = () => {
  const { lang, toggle, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("nav.story"),    href: "#story" },
    { label: t("nav.track"),    href: "#track" },
    { label: t("nav.shipped"),  href: "#shipped" },
    { label: t("nav.pillars"),  href: "#pillars" },
    { label: t("nav.signal"),   href: "#signal" },
  ];

  const handleLink = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-auto max-w-5xl"
    >
      <div
        className={`flex items-center justify-between gap-2 sm:gap-5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-border/80 shadow-[0_8px_40px_-12px_hsl(0_0%_0%/0.8)]"
            : "bg-background/45 backdrop-blur-md border-border/40"
        }`}
      >
        <Logo
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="pl-1 pr-1 sm:pr-2"
          size={26}
        />

        <div className="hidden md:flex items-center gap-0.5">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLink(link.href)}
              data-cursor="hover"
              className="relative px-2.5 py-1.5 font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors rounded-full"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="/lucas-almeida-cv.pdf"
            download
            data-cursor="hover"
            data-cursor-label="CV.PDF"
            className="link-bracket font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            {t("nav.cv")}
          </a>
          <button
            onClick={toggle}
            data-cursor="hover"
            aria-label="Toggle language"
            className="font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-full"
          >
            <span className={lang === "en" ? "text-foreground" : ""}>EN</span>
            <span className="mx-1 text-border">·</span>
            <span className={lang === "pt" ? "text-foreground" : ""}>PT</span>
          </button>
          <button
            onClick={() => handleLink("#contact")}
            data-cursor="hover"
            data-cursor-label="Contact"
            data-magnetic
            className="inline-flex items-center gap-1.5 pl-4 pr-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-[0_0_24px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_32px_hsl(var(--primary)/0.6)]"
          >
            {t("nav.contact")}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-3 rounded-3xl bg-background/95 backdrop-blur-xl border border-border shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLink(link.href)}
                  className="text-left px-4 py-2.5 font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground hover:bg-secondary rounded-2xl transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center justify-between px-4 pt-2 border-t border-border/60 mt-1">
                <a
                  href="/lucas-almeida-cv.pdf"
                  download
                  className="link-bracket font-code text-[10px] tracking-[0.22em] uppercase text-primary"
                >
                  {t("nav.cv")}
                </a>
                <button
                  onClick={toggle}
                  className="font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground"
                >
                  <span className={lang === "en" ? "text-foreground" : ""}>EN</span>
                  <span className="mx-1 text-border">·</span>
                  <span className={lang === "pt" ? "text-foreground" : ""}>PT</span>
                </button>
              </div>
              <button
                onClick={() => handleLink("#contact")}
                className="mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium bg-primary text-primary-foreground rounded-2xl"
              >
                {t("nav.contact")} <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
