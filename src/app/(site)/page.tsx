import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { personJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site-config";
import { urlFor } from "@/sanity/lib/image";
import { getAbout, getFeaturedProjects, getSiteSettings } from "@/sanity/lib/queries";

export default async function Home() {
  const [about, settings, featuredProjects] = await Promise.all([
    getAbout(),
    getSiteSettings(),
    getFeaturedProjects(),
  ]);

  const person = personJsonLd(about, getSiteUrl());
  const photoUrl = about?.profilePhoto
    ? urlFor(about.profilePhoto).width(320).height(320).fit("crop").url()
    : null;
  const siteTitle = settings?.siteTitle || "Sartho Pramanik";
  const headlineParts = (about?.headline || "").split(" · ");
  const roleEyebrow = headlineParts[0];
  const tagline = "💻 Software developer  |  🤖 ML enthusiast  |  🐍 Python, NumPy & Pandas  |  🎓 CSE student";
  const statusLine = [about?.availabilityStatus, about?.location].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-20">
      {person ? <JsonLd data={person} /> : null}
      <section className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 right-4 hidden rotate-2 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/60 select-none sm:block"
        >
          {"</>"}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute right-10 bottom-2 hidden -rotate-1 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/60 select-none lg:block"
        >
          def build():
        </span>

        {photoUrl ? (
          <div className="relative shrink-0">
            <Image
              src={photoUrl}
              alt={siteTitle}
              width={160}
              height={160}
              priority
              className="size-32 rounded-2xl object-cover sm:size-40"
            />
            <span className="absolute -top-2 -left-2 size-3 rounded-full bg-primary" />
          </div>
        ) : null}
        <div className="flex flex-col gap-4">
          {roleEyebrow ? (
            <p className="font-mono text-sm font-medium text-primary">{roleEyebrow}</p>
          ) : null}
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {siteTitle}
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">{tagline}</p>
          {about?.shortBio ? (
            <p className="max-w-xl text-muted-foreground">{about.shortBio}</p>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button nativeButton={false} render={<Link href="/projects" />}>
              View My Work
            </Button>
            <Button nativeButton={false} render={<Link href="/contact" />} variant="outline">
              Get In Touch
            </Button>
          </div>
          {statusLine ? (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {statusLine}
            </p>
          ) : null}
        </div>
      </section>

      {about?.personaHighlights?.length ? (
        <section className="flex flex-col">
          <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            who this is for
          </p>
          {about.personaHighlights.map((highlight) => (
            <div
              key={highlight.audience}
              className="flex flex-col gap-1 border-t border-border/60 py-5 first:border-t-0 sm:flex-row sm:gap-6"
            >
              <h2 className="shrink-0 font-mono text-xs text-primary sm:w-28">
                {highlight.audience.toLowerCase()}
              </h2>
              <p className="text-sm text-muted-foreground">{highlight.blurb}</p>
            </div>
          ))}
        </section>
      ) : null}

      <section className="flex flex-col gap-2">
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          index — projects
        </p>
        {featuredProjects.length ? (
          <div className="flex flex-col">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="py-6 text-sm text-muted-foreground">
            Featured projects will appear here soon.
          </p>
        )}
      </section>
    </div>
  );
}
