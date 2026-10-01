import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import ProjectCover from "@/components/ProjectCover";
import { mdxComponents } from "@/components/mdx-components";
import { PROJECTS } from "@/data/projects";
import { PROFILE, SITE_URL } from "@/data/profile";
import { loadMdx } from "@/lib/mdx";
import { getPortfolio } from "@/lib/portfolio";

export const revalidate = 3600;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `${SITE_URL}/work/${slug}` },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects } = await getPortfolio();
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const entry = await loadMdx("work", slug);
  const index = projects.findIndex((p) => p.id === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-8">
      <p className="pt-8 text-[14px]">
        <Link href="/#work" className="text-[var(--color-faint)] hover:text-[var(--color-bone)]">
          ← All work
        </Link>
      </p>

      <header className="grid gap-10 pb-12 pt-8 lg:grid-cols-[1fr_28rem] lg:items-end">
        <div className="flex flex-col gap-5">
          <p className="text-[14px] text-[var(--color-faint)]">{project.context}</p>
          <h1 className="text-[2.75rem] font-semibold leading-none tracking-[-0.035em] sm:text-[3.75rem]">
            {project.name}
          </h1>
          <p className="max-w-[56ch] text-[18px] leading-relaxed text-[var(--color-dim)]">{project.summary}</p>
          <dl className="grid max-w-xl grid-cols-[7rem_1fr] gap-x-4 gap-y-2 text-[14px]">
            <dt className="text-[var(--color-faint)]">Chain</dt>
            <dd>{project.chain}</dd>
            <dt className="text-[var(--color-faint)]">Stack</dt>
            <dd>{project.stack.join(", ")}</dd>
            {project.role ? (
              <>
                <dt className="text-[var(--color-faint)]">My role</dt>
                <dd>{project.role}</dd>
              </>
            ) : null}
            {project.onchain ? (
              <>
                <dt className="text-[var(--color-faint)]">On-chain</dt>
                <dd>
                  <a href={project.onchain.href} className="link">
                    {project.onchain.label}
                  </a>
                </dd>
              </>
            ) : null}
          </dl>
          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                className="rounded-full bg-[var(--color-mint)] px-5 py-2.5 text-[15px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-bone)]"
              >
                Open live app
              </a>
            ) : null}
            <a
              href={`https://github.com/${project.repo}`}
              className="rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-[15px] hover:border-[var(--color-bone)]"
            >
              View source
            </a>
          </div>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)]">
          {project.image ? (
            <Image src={project.image} alt={`${project.name} interface`} fill priority sizes="448px" className="object-cover object-top" />
          ) : (
            <ProjectCover project={project} live={Boolean(project.liveUrl)} />
          )}
        </div>
      </header>

      <article className="max-w-[44rem] border-t border-[var(--color-line)] pt-4">
        {entry ? (
          <MDXRemote
            source={entry.source}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />
        ) : (
          <p className="mt-10 text-[17px] text-[var(--color-dim)]">
            The write-up for this one is on its way. Until then, the{" "}
            <a href={`https://github.com/${project.repo}`} className="link">
              README on GitHub
            </a>{" "}
            covers the architecture.
          </p>
        )}
      </article>

      <nav aria-label="More work" className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--color-line)] pt-8">
        <a href={`mailto:${PROFILE.email}`} className="link text-[16px]">
          Questions about {project.name}? Email me
        </a>
        <Link href={`/work/${next.id}`} className="text-[16px] text-[var(--color-dim)] hover:text-[var(--color-bone)]">
          Next: {next.name}
        </Link>
      </nav>
    </main>
  );
}
