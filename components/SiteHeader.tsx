import Link from "next/link";
import { PROFILE } from "@/data/profile";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#findings", label: "Findings" },
  { href: "/credentials", label: "Credentials" },
];

export default function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 pb-4 pt-6 sm:px-8">
      <Link href="/" className="text-[15px] font-medium tracking-tight text-[var(--color-bone)]">
        Lucas de Almeida
      </Link>
      <nav aria-label="Main" className="flex items-center gap-5 text-[14px] text-[var(--color-dim)]">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hidden transition-colors hover:text-[var(--color-bone)] sm:inline"
          >
            {item.label}
          </Link>
        ))}
        <a href={PROFILE.cv} className="transition-colors hover:text-[var(--color-bone)]">
          CV
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="rounded-full border border-[var(--color-line-strong)] px-3.5 py-1.5 text-[var(--color-bone)] transition-colors hover:border-[var(--color-mint)] hover:text-[var(--color-mint)]"
        >
          Email me
        </a>
      </nav>
    </header>
  );
}
