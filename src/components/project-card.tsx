import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { urlFor } from '@/sanity/lib/image'
import type { ProjectCard as ProjectCardData } from '@/sanity/lib/queries'

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(640).height(400).fit('crop').url()
    : null

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-border"
    >
      <div className="relative aspect-[8/5] w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            {project.title}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {project.category?.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
          {project.status ? <Badge variant="outline">{project.status}</Badge> : null}
        </div>
        <h3 className="font-heading text-lg font-medium tracking-tight">{project.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{project.summary}</p>
        {project.techStack?.length ? (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2 text-xs text-muted-foreground">
            {project.techStack.map((tech) => (
              <span key={tech.name}>{tech.name}</span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  )
}
