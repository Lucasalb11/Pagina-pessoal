import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Ship } from "@/data/projects.config";
import { type Lang, langPath } from "@/lib/i18n";

const STATUS_COLOR: Record<Ship["status"], string> = {
  LIVE:  "text-[color:var(--color-primary)] border-[color:var(--color-primary)]/40 bg-[color:var(--color-primary)]/10",
  BUILT: "text-[color:var(--color-warm)] border-[color:var(--color-warm)]/40 bg-[color:var(--color-warm)]/10",
  WIP:   "text-[color:var(--color-muted-foreground)] border-[color:var(--color-border)] bg-[color:var(--color-surface)]",
};

const DEEP_DIVE_LABEL: Record<Lang, string> = { en: "deep dive", pt: "deep dive" };

export default function ProjectRow({ ship, lang }: { ship: Ship; lang: Lang }) {
  return (
    <article className="group border-t border-[color:var(--color-border)] py-6 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={langPath(lang, `/work/${ship.id}`)}
            className="font-editorial text-2xl md:text-[1.75rem] leading-tight text-[color:var(--color-foreground)] group-hover:text-[color:var(--color-primary)] transition-colors"
          >
            {ship.name}
            <ArrowUpRight className="inline-block w-4 h-4 ml-1 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>
          <span
            className={`font-mono text-[9px] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full border ${STATUS_COLOR[ship.status]}`}
          >
            {ship.status}
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)]">
            {ship.ecosystem}
          </span>
        </div>

        <p className="text-[15px] leading-relaxed text-[color:var(--color-foreground)]/85 max-w-prose">
          {ship.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.14em] uppercase text-[color:var(--color-muted-foreground)]">
          <span className="opacity-70">{ship.stack.slice(0, 3).join(" · ")}</span>
          {ship.github ? (
            <a
              href={ship.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-bracket inline-flex items-center gap-1 hover:text-[color:var(--color-primary)]"
            >
              <Github className="w-3 h-3" />
              github
            </a>
          ) : null}
          {ship.live ? (
            <a
              href={ship.live}
              target="_blank"
              rel="noopener noreferrer"
              className="link-bracket hover:text-[color:var(--color-primary)]"
            >
              live
            </a>
          ) : null}
          <Link
            href={langPath(lang, `/work/${ship.id}`)}
            className="link-bracket hover:text-[color:var(--color-primary)] ml-auto"
          >
            {DEEP_DIVE_LABEL[lang]}
          </Link>
        </div>
      </div>
    </article>
  );
}
