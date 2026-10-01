import Image from "next/image";
import Link from "next/link";
import ProjectCover from "@/components/ProjectCover";
import type { ResolvedProject } from "@/lib/portfolio";

function Media({ project, sizes }: { project: ResolvedProject; sizes: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)]">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} interface`}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
        />
      ) : (
        <ProjectCover project={project} live={Boolean(project.liveUrl)} />
      )}
    </div>
  );
}

function Links({ project }: { project: ResolvedProject }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
      <Link href={`/work/${project.id}`} className="link">
        Read the deep dive
      </Link>
      {project.liveUrl ? (
        <a href={project.liveUrl} className="link">
          Open live app
        </a>
      ) : null}
      <a href={`https://github.com/${project.repo}`} className="link">
        Source
      </a>
    </div>
  );
}

export function FeaturedProject({ project }: { project: ResolvedProject }) {
  return (
    <article className="group flex flex-col gap-5">
      <Link href={`/work/${project.id}`} aria-label={`${project.name} deep dive`}>
        <Media project={project} sizes="(min-width: 1024px) 560px, 100vw" />
      </Link>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-[22px] font-semibold tracking-tight">{project.name}</h3>
          <p className="text-[13px] text-[var(--color-faint)]">{project.context}</p>
        </div>
        <p className="max-w-[60ch] text-[15px] leading-relaxed text-[var(--color-dim)]">{project.summary}</p>
        <p className="font-mono text-[12px] text-[var(--color-faint)]">{project.stack.join(" / ")}</p>
        <Links project={project} />
      </div>
    </article>
  );
}

export function BuildRow({ project }: { project: ResolvedProject }) {
  return (
    <article className="group grid gap-5 border-t border-[var(--color-line)] py-6 sm:grid-cols-[13rem_1fr]">
      <Link href={`/work/${project.id}`} aria-label={`${project.name} deep dive`} className="max-w-xs">
        <Media project={project} sizes="208px" />
      </Link>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="text-[18px] font-semibold tracking-tight">{project.name}</h3>
          <p className="text-[13px] text-[var(--color-faint)]">{project.context}</p>
        </div>
        <p className="max-w-[64ch] text-[15px] leading-relaxed text-[var(--color-dim)]">{project.summary}</p>
        <Links project={project} />
      </div>
    </article>
  );
}
