import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { mdxComponents } from "@/components/mdx-components";
import { PROJECTS } from "@/data/projects";
import { SITE_URL } from "@/data/profile";
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

export default async function NotesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects } = await getPortfolio();
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();
  const entry = await loadMdx("work", slug);

  return (
    <main>

      <header className="mb-8">
        <h1 className="text-[26px] font-semibold tracking-tight">{project.name}</h1>
        <p className="mt-1 text-[var(--color-soft)]">{project.summary}</p>
        <dl className="mt-5 grid grid-cols-[6rem_1fr] gap-x-4 gap-y-1 text-[15px]">
          <dt className="meta pt-[2px]">Context</dt>
          <dd>
            {project.context}, {project.year}
          </dd>
          {project.role ? (
            <>
              <dt className="meta pt-[2px]">My part</dt>
              <dd>{project.role}</dd>
            </>
          ) : null}
          <dt className="meta pt-[2px]">Stack</dt>
          <dd>{project.stack.join(", ")}</dd>
          <dt className="meta pt-[2px]">Links</dt>
          <dd className="flex flex-wrap gap-x-4">
            <a href={`https://github.com/${project.repo}`} className="link">
              code
            </a>
            {project.liveUrl ? (
              <a href={project.liveUrl} className="link">
                demo
              </a>
            ) : null}
            {project.onchain ? (
              <a href={project.onchain.href} className="link">
                {project.onchain.label.toLowerCase()}
              </a>
            ) : null}
          </dd>
        </dl>
      </header>

      {project.image ? (
        <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-md border border-[var(--color-rule)]">
          <Image src={project.image} alt={`${project.name} screenshot`} fill sizes="640px" className="object-cover object-top" />
        </div>
      ) : null}

      <article>
        {entry ? (
          <MDXRemote
            source={entry.source}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />
        ) : (
          <p className="text-[var(--color-soft)]">
            Notes for this one aren&rsquo;t written yet. The{" "}
            <a href={`https://github.com/${project.repo}`} className="link">
              README
            </a>{" "}
            has the details.
          </p>
        )}
      </article>
    </main>
  );
}
