import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Lock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + copyright */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono font-bold text-base tracking-wider hover:text-primary transition-colors"
            >
              LUCAS<span className="text-primary">.</span>
            </button>
            <span className="text-muted-foreground/40">|</span>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Lucas de Almeida
            </p>
          </div>

          {/* Built with */}
          <p className="text-xs text-muted-foreground/50 font-mono hidden md:block">
            React · TypeScript · Tailwind
          </p>

          {/* Social + admin */}
          <div className="flex items-center gap-3">
            {[
              { href: "https://github.com/Lucasalb11",              icon: Github,   label: "GitHub" },
              { href: "https://www.linkedin.com/in/lucasalb11/",    icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:lucasalb11@gmail.com",                icon: Mail,     label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
            <Link
              to="/admin"
              className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground/30 hover:border-border hover:text-muted-foreground transition-all duration-200"
              aria-label="Admin"
            >
              <Lock className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
