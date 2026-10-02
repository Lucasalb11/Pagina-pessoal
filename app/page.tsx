import Image from "next/image";
import Link from "next/link";
import { NOW, PATH, PROFILE } from "@/data/profile";
import { getPortfolio } from "@/lib/portfolio";

export const revalidate = 3600;

export default async function Home() {
  const { projects, extras } = await getPortfolio();

  return (
    <main className="space-y-14">
      <header className="flex items-center gap-4">
        <Image
          src="/portrait.jpg"
          alt="Lucas de Almeida"
          width={64}
          height={64}
          priority
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-[17px] font-semibold leading-tight">{PROFILE.name}</h1>
          <p className="text-[15px] text-[var(--color-soft)]">{PROFILE.headline}</p>
        </div>
      </header>

      <section className="space-y-4">
        <p>I&rsquo;m studying Computer Engineering at UFRPE and learning to build and secure DeFi protocols.</p>
        <p>
          Before software, I worked in real estate: construction, development, sales and operations, coordinating
          teams of more than 100 people. Blockchain showed me another way to build financial products, and I&rsquo;ve
          followed that thread since, through hackathons, Web3 communities and a lot of small projects.
        </p>
        <p>
          Right now I&rsquo;m building the fundamentals (programming, systems, computer science) while going deeper into
          cybersecurity and smart-contract security. I want to go from writing Web3 apps to understanding, evaluating
          and designing secure decentralized financial systems. This site keeps track of that: what I&rsquo;m studying,
          what I&rsquo;m building and what I&rsquo;m learning.
        </p>
      </section>

      <section>
        <h2 className="heading">Now</h2>
        <dl className="space-y-2">
          {NOW.map((item) => (
            <div key={item.label} className="grid grid-cols-[6rem_1fr] gap-4 max-sm:grid-cols-1 max-sm:gap-0">
              <dt className="text-[var(--color-faint)]">{item.label}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="heading">Experiments</h2>
        <p className="mb-5 text-[15px] text-[var(--color-soft)]">
          Learning projects from hackathons and self-study. None of them are live products; each has notes on what I
          built and what I&rsquo;d fix.
        </p>
        <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {projects.map((p) => (
            <li key={p.id} className="py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <Link href={`/work/${p.id}`} className="font-medium hover:text-[var(--color-link)]">
                  {p.name}
                </Link>
                <span className="text-[14px] text-[var(--color-faint)]">
                  {p.context}, {p.year}
                </span>
              </div>
              <p className="mt-1 text-[15px] text-[var(--color-soft)]">{p.summary}</p>
              <p className="mt-1.5 flex gap-4 text-[14px]">
                <Link href={`/work/${p.id}`} className="link">
                  notes
                </Link>
                <a href={`https://github.com/${p.repo}`} className="link">
                  code
                </a>
                {p.liveUrl ? (
                  <a href={p.liveUrl} className="link">
                    demo
                  </a>
                ) : null}
              </p>
            </li>
          ))}
          {extras.map((e) => (
            <li key={e.repoUrl} className="py-4">
              <span className="font-medium">{e.name}</span>
              {e.summary ? <p className="mt-1 text-[15px] text-[var(--color-soft)]">{e.summary}</p> : null}
              <p className="mt-1.5 flex gap-4 text-[14px]">
                <a href={e.repoUrl} className="link">
                  code
                </a>
                {e.liveUrl ? (
                  <a href={e.liveUrl} className="link">
                    demo
                  </a>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="heading">Path</h2>
        <ul className="space-y-2">
          {PATH.map((entry) => (
            <li key={entry.period} className="grid grid-cols-[6rem_1fr] gap-4 max-sm:grid-cols-1 max-sm:gap-0">
              <span className="text-[var(--color-faint)]">{entry.period}</span>
              <span>{entry.text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[15px]">
          <Link href="/credentials" className="link">
            Course certificates
          </Link>
          <span className="text-[var(--color-soft)]">, issued as soulbound NFTs on Solana devnet.</span>
        </p>
      </section>

      <footer className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--color-rule)] pt-6 text-[15px]">
        <a href={`mailto:${PROFILE.email}`} className="link">
          {PROFILE.email}
        </a>
        <a href={PROFILE.github} className="link">
          GitHub
        </a>
        <a href={PROFILE.linkedin} className="link">
          LinkedIn
        </a>
        <a href={PROFILE.cv} className="link">
          CV
        </a>
      </footer>
    </main>
  );
}
