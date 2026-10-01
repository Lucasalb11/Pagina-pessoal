import Image from "next/image";
import Link from "next/link";
import Inspector from "@/components/Inspector";
import { BuildRow, FeaturedProject } from "@/components/ProjectCard";
import { getPortfolio } from "@/lib/portfolio";
import { EDUCATION, FINDINGS, PROFILE, TIMELINE, type Finding } from "@/data/profile";

export const revalidate = 60;

const SEVERITY_STYLE: Record<Finding["severity"], string> = {
  Critical: "text-[var(--color-coral)] border-[var(--color-coral)]/40",
  High: "text-[var(--color-amber)] border-[var(--color-amber)]/40",
  Medium: "text-[var(--color-dim)] border-[var(--color-line-strong)]",
};

export default async function Home() {
  const { projects, extras } = await getPortfolio();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const liveCount = projects.filter((p) => p.liveUrl).length;

  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* Hero */}
      <section className="grid items-start gap-12 pb-24 pt-12 lg:grid-cols-[1fr_25rem] lg:gap-16 lg:pt-20">
        <div className="flex flex-col gap-8">
          <h1 className="max-w-[18ch] text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[3.4rem]">
            I build protocols on Solana and Stellar, and review them like an attacker would.
          </h1>
          <div className="flex max-w-[58ch] flex-col gap-4 text-[17px] leading-relaxed text-[var(--color-dim)]">
            <p>
              Anchor programs, Soroban contracts and Solidity attestations, shipped end to end. Every
              project here comes with a written threat model: what can go wrong, what the code
              prevents, and what is still open.
            </p>
            <p>
              Before writing contracts I spent six years running a construction company with 100+
              people and bank financing, so I know what real money expects from the code that holds it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="rounded-full bg-[var(--color-mint)] px-5 py-2.5 text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bone)]"
            >
              Email me
            </a>
            <a
              href={PROFILE.cv}
              className="rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-[15px] text-[var(--color-bone)] transition-colors hover:border-[var(--color-bone)]"
            >
              Download CV
            </a>
            <a
              href={PROFILE.github}
              className="px-2 py-2.5 text-[15px] text-[var(--color-dim)] transition-colors hover:text-[var(--color-bone)]"
            >
              GitHub
            </a>
          </div>
          <p className="flex items-center gap-2.5 text-[14px] text-[var(--color-dim)]">
            <span aria-hidden className="pulse-dot h-2 w-2 rounded-full bg-[var(--color-mint)]" />
            Open to full-time remote roles in protocol and smart-contract engineering.
          </p>
        </div>

        <div className="flex flex-col gap-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl border border-b-0 border-[var(--color-line)]">
            <Image
              src="/portrait-duotone.jpg"
              alt="Lucas de Almeida"
              fill
              priority
              sizes="(min-width: 1024px) 400px, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="[&>section]:rounded-t-none">
            <Inspector builtCount={projects.length} liveCount={liveCount} />
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section id="work" className="scroll-mt-8 pb-20">
        <div className="section-head">
          <h2 className="text-[26px] font-semibold tracking-tight">Selected work</h2>
          <p className="text-[14px] text-[var(--color-faint)]">
            {projects.length} protocols, {liveCount} with a live demo
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {featured.map((p) => (
            <FeaturedProject key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* More builds */}
      <section className="pb-24">
        <h2 className="mb-2 text-[20px] font-semibold tracking-tight">More builds</h2>
        <div>
          {rest.map((p) => (
            <BuildRow key={p.id} project={p} />
          ))}
          {extras.map((e) => (
            <article key={e.repoUrl} className="flex flex-col gap-2 border-t border-[var(--color-line)] py-6">
              <h3 className="text-[18px] font-semibold tracking-tight">{e.name}</h3>
              {e.summary ? <p className="max-w-[64ch] text-[15px] text-[var(--color-dim)]">{e.summary}</p> : null}
              <div className="flex gap-5 text-[14px]">
                {e.liveUrl ? <a href={e.liveUrl} className="link">Open live app</a> : null}
                <a href={e.repoUrl} className="link">Source</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Findings */}
      <section id="findings" className="scroll-mt-8 pb-24">
        <div className="section-head">
          <h2 className="text-[26px] font-semibold tracking-tight">Findings in my own code</h2>
        </div>
        <p className="mb-8 max-w-[62ch] text-[16px] leading-relaxed text-[var(--color-dim)]">
          I review what I ship the way an auditor would. These are open issues I found in my own
          programs. Each one is written up in the project&rsquo;s deep dive, with the fix I&rsquo;m making.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-[var(--color-line)] text-[13px] text-[var(--color-faint)]">
                <th scope="col" className="py-3 pr-4 font-normal">Severity</th>
                <th scope="col" className="py-3 pr-4 font-normal">Project</th>
                <th scope="col" className="py-3 pr-4 font-normal">Issue</th>
                <th scope="col" className="py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {FINDINGS.map((f) => (
                <tr key={f.title} className="border-b border-[var(--color-line)] align-top">
                  <td className="py-4 pr-4">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[12px] ${SEVERITY_STYLE[f.severity]}`}>
                      {f.severity}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-4 pr-4">
                    <Link href={`/work/${f.projectId}#threat-model`} className="link">
                      {f.project}
                    </Link>
                  </td>
                  <td className="max-w-[52ch] py-4 pr-4 leading-relaxed text-[var(--color-dim)]">{f.title}</td>
                  <td className="py-4 text-[var(--color-amber)]">{f.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Experience */}
      <section className="grid gap-12 pb-24 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-6 text-[20px] font-semibold tracking-tight">Experience</h2>
          <ol className="flex flex-col">
            {TIMELINE.map((t) => (
              <li key={t.title} className="grid gap-1 border-t border-[var(--color-line)] py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <p className="text-[14px] text-[var(--color-faint)]">{t.period}</p>
                <div>
                  <p className="text-[16px] font-medium">
                    {t.title}{t.org ? <span className="font-normal text-[var(--color-faint)]"> at {t.org}</span> : null}
                  </p>
                  {t.body ? <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-dim)]">{t.body}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="mb-6 text-[20px] font-semibold tracking-tight">Education</h2>
          <ol className="flex flex-col">
            {EDUCATION.map((t) => (
              <li key={t.title} className="grid gap-1 border-t border-[var(--color-line)] py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <p className="text-[14px] text-[var(--color-faint)]">{t.period}</p>
                <p className="text-[16px] font-medium">
                  {t.title}{t.org ? <span className="font-normal text-[var(--color-faint)]"> at {t.org}</span> : null}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[15px] text-[var(--color-dim)]">
            Plus School of Solana (Ackee), Rust &amp; WebAssembly and Solidity 101 (NearX).{" "}
            <Link href="/credentials" className="link">
              Verify on-chain
            </Link>
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] px-6 py-12 sm:px-12">
        <h2 className="max-w-[22ch] text-[2rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2.5rem]">
          Hiring a protocol or smart-contract engineer?
        </h2>
        <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-[var(--color-dim)]">
          I&rsquo;m looking for a full-time remote role on a team shipping to mainnet. I reply within a day.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[16px]">
          <a href={`mailto:${PROFILE.email}`} className="link text-[18px]">
            {PROFILE.email}
          </a>
          <a href={PROFILE.linkedin} className="text-[var(--color-dim)] hover:text-[var(--color-bone)]">
            LinkedIn
          </a>
          <a href={PROFILE.cv} className="text-[var(--color-dim)] hover:text-[var(--color-bone)]">
            CV (PDF)
          </a>
        </div>
      </section>
    </main>
  );
}
