import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { getAbout, getFeaturedProjects } from "@/sanity/lib/queries";

export default async function Home() {
  const [about, featuredProjects] = await Promise.all([
    getAbout(),
    getFeaturedProjects(),
  ]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-24 px-6 py-20">
      <section className="flex flex-col gap-6">
        {about?.availabilityStatus ? (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {about.availabilityStatus}
          </span>
        ) : null}
        <h1 className="max-w-2xl font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          {about?.headline || "Content coming soon — add your headline in Sanity Studio."}
        </h1>
        {about?.shortBio ? (
          <p className="max-w-xl text-lg text-muted-foreground">{about.shortBio}</p>
        ) : null}
        <div className="flex flex-wrap gap-3 pt-2">
          {about?.resumeFile?.asset?.url ? (
            <Button
              nativeButton={false}
              render={
                <a href={about.resumeFile.asset.url} target="_blank" rel="noopener noreferrer" />
              }
            >
              Download Resume
            </Button>
          ) : null}
          <Button nativeButton={false} render={<Link href="/contact" />} variant="outline">
            Get in touch
          </Button>
        </div>
      </section>

      {about?.personaHighlights?.length ? (
        <section className="grid gap-4 sm:grid-cols-3">
          {about.personaHighlights.map((highlight) => (
            <div
              key={highlight.audience}
              className="rounded-xl border border-border/60 p-5"
            >
              <h2 className="font-heading text-sm font-medium tracking-tight text-muted-foreground">
                {highlight.audience}
              </h2>
              <p className="mt-2 text-sm">{highlight.blurb}</p>
            </div>
          ))}
        </section>
      ) : null}

      <section className="flex flex-col gap-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-heading text-2xl font-medium tracking-tight">
            Featured work
          </h2>
        </div>
        {featuredProjects.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No featured projects yet — mark a project as &ldquo;Featured&rdquo; in
            Sanity Studio to have it show up here.
          </p>
        )}
      </section>
    </div>
  );
}
