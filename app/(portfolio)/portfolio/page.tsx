import type { Metadata } from "next";
import Link from "next/link";
import { CERTS } from "@/data/certs.config";
import { NOW, NOW_UPDATED, PATH, PROFILE, SITE_URL } from "@/data/profile";
import { getPortfolio, type ResolvedProject } from "@/lib/portfolio";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Portfolio",
  description: PROFILE.headline,
  alternates: { canonical: `${SITE_URL}/portfolio` },
};

/** Where a demo runs, unless the project says otherwise. None of these demos hold real money. */
const NETWORK: Record<ResolvedProject["chain"], string> = {
  Solana: "Solana devnet",
  Stellar: "Stellar testnet",
  Multichain: "testnet",
};

function ProjectRow({ p }: { p: ResolvedProject }) {
  return (
    <li className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <Link href={`/work/${p.id}`} className="font-medium transition-colors hover:text-[#FFB477]">
          {p.name}
        </Link>
        <span className="meta whitespace-nowrap">{p.year}</span>
      </div>
      <p className="mt-1 text-[15px] text-[var(--color-soft)]">{p.summary}</p>
      <p className="meta mt-2">
        {p.context}
        {p.liveUrl ? (
          <>
            <span className="text-[#FF8A3D]/65"> · </span>
            {p.network ?? NETWORK[p.chain]}
          </>
        ) : null}
      </p>
      <p className="mt-1 flex gap-4 text-[14px]">
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
  );
}

export default async function Home() {
  const { projects, extras } = await getPortfolio();
  const withDemo = projects.filter((p) => p.liveUrl);
  const codeOnly = projects.filter((p) => !p.liveUrl);

  return (
    <main className="space-y-16">
      <section id="about">
        <h1 className="mb-5 text-[22px] font-semibold leading-snug tracking-tight">{PROFILE.headline}.</h1>
        <div className="space-y-4">
          <p>
            I&rsquo;m studying Computer Engineering at UFRPE and exploring how to build and secure blockchain
            applications, with a particular interest in Solana, smart contracts, and DeFi security.
          </p>
          <p>
            Before moving into software, I spent several years working in real estate, construction, and business
            operations, leading teams and managing projects. That experience shaped how I approach technology: start
            with a real problem, understand the business behind it, and build something useful.
          </p>
          <p>
            I&rsquo;m now strengthening my foundations in computer science, developing Web3 projects, and learning to
            analyze smart contracts from a security perspective. This site documents what I&rsquo;m building, what
            I&rsquo;m learning, and what I&rsquo;m improving along the way.
          </p>
        </div>
        <p className="mt-6 text-[15px]">{PROFILE.lookingFor}</p>
        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
          <a href={PROFILE.cv} className="link">
            CV (PDF)
          </a>
          <a href={PROFILE.github} className="link">
            GitHub
          </a>
          <a href={PROFILE.linkedin} className="link">
            LinkedIn
          </a>
        </p>
      </section>

      <section id="now">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="label !mb-0">Now</h2>
          <span className="meta whitespace-nowrap">updated {NOW_UPDATED}</span>
        </div>
        <dl className="space-y-2">
          {NOW.map((item) => (
            <div key={item.label} className="grid grid-cols-[6.5rem_1fr] gap-4 max-sm:grid-cols-1 max-sm:gap-0">
              <dt className="meta pt-[3px]">{item.label}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="projects">
        <h2 className="label">Projects</h2>
        <p className="mb-6 text-[15px] text-[var(--color-soft)]">
          Learning projects from hackathons and self-study, not products. Each has notes on how it works, what was
          wrong with it and what I fixed.
        </p>

        <h3 className="meta mb-1">With a working demo</h3>
        <div className="relative mb-8">
          <span aria-hidden="true" className="pointer-events-none absolute -top-px left-0 h-px w-5 bg-[#FF8A3D]/55" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-px right-0 h-px w-5 bg-[#FF8A3D]/55" />
          <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
            {withDemo.map((p) => (
              <ProjectRow key={p.id} p={p} />
            ))}
          </ul>
        </div>

        <h3 className="meta mb-1">Code and notes only</h3>
        <div className="relative">
          <span aria-hidden="true" className="pointer-events-none absolute -top-px left-0 h-px w-5 bg-[#FF8A3D]/55" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-px right-0 h-px w-5 bg-[#FF8A3D]/55" />
          <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
            {codeOnly.map((p) => (
              <ProjectRow key={p.id} p={p} />
            ))}
            {extras.map((e) => (
              <li key={e.repoUrl} className="py-4">
                <span className="font-medium">{e.name}</span>
                {e.summary ? <p className="mt-1 text-[15px] text-[var(--color-soft)]">{e.summary}</p> : null}
                <p className="mt-2 flex gap-4 text-[14px]">
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
        </div>
      </section>

      <section id="path">
        <h2 className="label">Path</h2>
        <ul className="space-y-2">
          {PATH.map((entry) => (
            <li key={entry.period} className="grid grid-cols-[6.5rem_1fr] gap-4 max-sm:grid-cols-1 max-sm:gap-0">
              <span className="meta pt-[3px]">{entry.period}</span>
              <span>{entry.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="certificates">
        <h2 className="label">Certificates</h2>
        <p className="mb-4 text-[15px] text-[var(--color-soft)]">
          Courses and hackathons I&rsquo;ve completed. They record what I&rsquo;ve studied; the projects above are where
          I show what I can do with it.
        </p>
        <ul className="space-y-2">
          {CERTS.filter((c) => c.status !== "PENDING").map((c) => (
            <li key={c.credentialId} className="grid grid-cols-[6.5rem_1fr] gap-4 max-sm:grid-cols-1 max-sm:gap-0">
              <span className="meta pt-[3px]">{c.dateIssued.slice(0, 4)}</span>
              <span>
                {c.verifyUrl ? (
                  <a href={c.verifyUrl} className="link">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
                <span className="text-[#FF8A3D]/65"> · </span>
                <span className="text-[var(--color-soft)]">{c.issuer}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[15px]">
          <Link href="/credentials" className="link">
            Details
          </Link>
          <span className="text-[var(--color-soft)]">, each also minted as a soulbound NFT on Solana devnet.</span>
        </p>
      </section>

      <section id="contact">
        <h2 className="label">Contact</h2>
        <p className="mb-3">
          The best way to reach me is email:{" "}
          <a href={`mailto:${PROFILE.email}`} className="link">
            {PROFILE.email}
          </a>
          .
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
          <a href={PROFILE.github} className="link">
            GitHub
          </a>
          <a href={PROFILE.linkedin} className="link">
            LinkedIn
          </a>
          <a href={PROFILE.x} className="link">
            X
          </a>
          <a href={PROFILE.cv} className="link">
            CV (PDF)
          </a>
        </p>
      </section>
    </main>
  );
}
