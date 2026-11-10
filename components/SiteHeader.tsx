import Image from "next/image";
import Link from "next/link";
import { PROFILE } from "@/data/profile";

const NAV = [
  { href: "/portfolio", label: "About" },
  { href: "/portfolio#projects", label: "Projects" },
  { href: "/portfolio#path", label: "Path" },
  { href: "/portfolio#certificates", label: "Certificates" },
  { href: "/portfolio#contact", label: "Contact" },
];

/** Same bar on every page: who this is on the left, where to go on the right. */
export function SiteHeader() {
  return (
    <header className="relative mb-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-[var(--color-rule)] pb-5 sm:mb-16">
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-px left-0 h-px w-6 bg-[#FF8A3D]/55" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-px right-0 h-px w-6 bg-[#FF8A3D]/55" />
      <Link href="/" className="group flex items-center gap-2.5 font-medium transition-colors hover:text-[#FFB477]">
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full p-[1px] ring-1 ring-[#FF8A3D]/45 shadow-[0_0_12px_rgba(255,107,53,0.2)] transition-all group-hover:ring-[#FFB477]/75">
          <Image
            src="/lucas-avatar.jpg"
            alt=""
            width={28}
            height={28}
            priority
            className="h-full w-full rounded-full object-cover"
          />
        </span>
        {PROFILE.name}
      </Link>
      <nav aria-label="Main" className="flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
