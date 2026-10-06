import Link from "next/link";
import { NOW, NOW_UPDATED, PATH, PROFILE } from "@/data/profile";
import { getPortfolio, type ResolvedProject } from "@/lib/portfolio";

export const revalidate = 3600;

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
        <Link href={`/work/${p.id}`} className="font-medium hover:text-[var(--color-link)]">
          {p.name}
        </Link>
        <span className="meta whitespace-nowrap">{p.year}</span>
      </div>
      <p className="mt-1 text-[15px] text-[var(--color-soft)]">{p.summary}</p>
      <p className="meta mt-2">
        {p.context}
        {p.liveUrl ? ` · ${p.network ?? NETWORK[p.chain]}` : ""}
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
            I&rsquo;m Lucas de Almeida, a Computer Engineering student and developer focused on Blockchain, DeFi, and
            financial applications.
          </p>
          <p>
            My background combines Computer Engineering with Economics, business, and finance. After working closely
            with real businesses and financial decisions, I became increasingly interested in the systems behind them
            and started moving deeper into software and blockchain.
          </p>
          <p>
            Today, I build and explore Web3 applications across Solana, Ethereum, and Stellar, working mainly with Rust,
            Solidity, and TypeScript. My interests are centered around DeFi, protocol engineering, asset tokenization,
            and smart-contract security.
          </p>
          <p>
            Currently, I&rsquo;m pursuing my degree in Computer Engineering at UFRPE, strengthening my foundations in
            programming, computer systems, mathematics, and software engineering while continuing to explore blockchain
            and decentralized systems through projects and hands-on development.
          </p>
        </div>
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
        <ul className="mb-8 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {withDemo.map((p) => (
            <ProjectRow key={p.id} p={p} />
          ))}
        </ul>

        <h3 className="meta mb-1">Code and notes only</h3>
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
        <p className="mt-5 text-[15px]">
          <Link href="/credentials" className="link">
            Course certificates
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
