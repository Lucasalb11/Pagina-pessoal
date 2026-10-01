import { PROFILE } from "@/data/profile";

export default function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 max-w-6xl border-t border-[var(--color-line)] px-5 py-10 text-[14px] text-[var(--color-faint)] sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p>
          {PROFILE.name}, {PROFILE.location}
        </p>
        <ul className="flex flex-wrap gap-5">
          <li><a className="hover:text-[var(--color-bone)]" href={PROFILE.github}>GitHub</a></li>
          <li><a className="hover:text-[var(--color-bone)]" href={PROFILE.linkedin}>LinkedIn</a></li>
          <li><a className="hover:text-[var(--color-bone)]" href={PROFILE.x}>X</a></li>
          <li><a className="hover:text-[var(--color-bone)]" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
        </ul>
      </div>
    </footer>
  );
}
