import Link from "next/link";
import { type Lang, langPath } from "@/lib/i18n";

interface FooterProps {
  lang: Lang;
  labels: {
    role: string;
    email: string;
    github: string;
    x: string;
    linkedin: string;
    credentials: string;
  };
}

export default function Footer({ lang, labels }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto max-w-2xl px-6 pt-16 pb-14 border-t border-[color:var(--color-border)] mt-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <p className="font-editorial text-2xl leading-none">Lucas de Almeida</p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase text-[color:var(--color-muted-foreground)]">
            {labels.role} · {year}
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase">
          <a href="mailto:lucasalb11@gmail.com" className="hover:text-[color:var(--color-primary)]">
            {labels.email}
          </a>
          <a href="https://github.com/Lucasalb11" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--color-primary)]">
            {labels.github}
          </a>
          <a href="https://x.com/11lucasa" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--color-primary)]">
            {labels.x}
          </a>
          <a href="https://www.linkedin.com/in/lucasalb11/" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--color-primary)]">
            {labels.linkedin}
          </a>
          <Link href={langPath(lang, "/credentials")} className="hover:text-[color:var(--color-primary)]">
            {labels.credentials}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
