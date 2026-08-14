import Link from 'next/link'

import type { ProjectCard as ProjectCardData } from '@/sanity/lib/queries'

export function ProjectCard({
  project,
  headingLevel: Heading = 'h3',
}: {
  project: ProjectCardData
  headingLevel?: 'h2' | 'h3'
}) {
  const year = project.startDate ? new Date(project.startDate).getFullYear() : null
  const meta = [year, project.category?.[0]].filter(Boolean).join(' · ')

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group flex flex-col gap-2 border-t border-border/60 py-6 transition-colors first:border-t-0 first:pt-0 sm:flex-row sm:gap-6"
    >
      <div className="shrink-0 font-mono text-xs text-primary sm:w-28">{meta || '—'}</div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Heading className="font-heading text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
            {project.title}
          </Heading>
          {project.status ? (
            <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
              {project.status}
            </span>
          ) : null}
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{project.summary}</p>
        {project.techStack?.length ? (
          <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px] text-muted-foreground">
            {project.techStack.map((tech) => (
              <span key={tech.name} className="rounded-sm border border-border/60 px-1.5 py-0.5">
                {tech.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  )
}
