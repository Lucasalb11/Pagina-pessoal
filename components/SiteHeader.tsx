import Image from "next/image";
import Link from "next/link";
import { PROFILE } from "@/data/profile";

const NAV = [
  { href: "/#projects", label: "Projects" },
  { href: "/#path", label: "Path" },
  { href: "/credentials", label: "Certificates" },
  { href: "/#contact", label: "Contact" },
];

/** Same bar on every page: who this is on the left, where to go on the right. */
export function SiteHeader() {
  return (
    <header className="mb-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 sm:mb-20">
      <Link href="/" className="flex items-center gap-2.5 font-medium">
        <Image
          src="/portrait.jpg"
          alt=""
          width={28}
          height={28}
          priority
          className="h-7 w-7 rounded-full object-cover"
        />
        {PROFILE.name}
      </Link>
      <nav aria-label="Main" className="flex gap-x-5 text-[15px]">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
