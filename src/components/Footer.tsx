import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { useLang } from "@/hooks/useLang";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="relative border-t border-border overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 py-10 relative z-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Logo
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size={22}
            />
            <span className="text-muted-foreground/30">·</span>
            <p className="font-code text-[10px] text-muted-foreground tracking-[0.22em] uppercase">
              © {new Date().getFullYear()} LUCAS DE ALMEIDA
            </p>
          </div>

          <p className="hidden md:block font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground/60 max-w-sm text-center">
            {t("footer.tagline")}
          </p>

          <div className="flex items-center gap-2">
            {[
              { href: "https://github.com/Lucasalb11",           icon: Github,   label: "GitHub" },
              { href: "https://x.com/Lucasalb11",                icon: Twitter,  label: "X" },
              { href: "https://www.linkedin.com/in/lucasalb11/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:lucasalb11@gmail.com",             icon: Mail,     label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                data-cursor="hover"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
