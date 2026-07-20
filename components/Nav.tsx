"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Lang, langPath, isLang } from "@/lib/i18n";

interface NavProps {
  lang: Lang;
  labels: {
    work: string;
    writing: string;
    cv: string;
    email: string;
    langOther: string;
  };
}

export default function Nav({ lang, labels }: NavProps) {
  const pathname = usePathname() ?? "/";
  const other: Lang = lang === "en" ? "pt" : "en";

  // Swap the lang segment for the "other" one so the toggle preserves the current route.
  const seg = pathname.split("/")[1];
  const rest = isLang(seg) ? pathname.slice(seg.length + 1) : pathname;
  const otherHref = `/${other}${rest === "" ? "" : rest.startsWith("/") ? rest : `/${rest}`}`;

  return (
    <header className="mx-auto max-w-2xl px-6 pt-8 pb-6 flex items-center justify-between font-mono text-[11px] tracking-[0.14em] uppercase text-[color:var(--color-muted-foreground)]">
      <Link
        href={langPath(lang, "/")}
        className="text-[color:var(--color-foreground)] hover:text-[color:var(--color-primary)] transition-colors"
      >
        Lucas<span className="opacity-40">.</span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-5">
        <Link href={langPath(lang, "/work")} className="hover:text-[color:var(--color-foreground)] transition-colors">
          {labels.work}
        </Link>
        <Link href={langPath(lang, "/writing")} className="hover:text-[color:var(--color-foreground)] transition-colors">
          {labels.writing}
        </Link>
        <a
          href="/lucas-almeida-cv.pdf"
          className="link-bracket hover:text-[color:var(--color-primary)] transition-colors"
        >
          {labels.cv}
        </a>
        <Link
          href={otherHref}
          aria-label={`Switch language to ${other.toUpperCase()}`}
          className="link-bracket hover:text-[color:var(--color-primary)] transition-colors"
        >
          {labels.langOther}
        </Link>
      </nav>
    </header>
  );
}
