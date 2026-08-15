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
  const [firstName, ...restName] = siteTitle.split(" ");
  const lastName = restName.join(" ");
  const headlineParts = (about?.headline || "").split(" · ");
  const statusLine = [about?.availabilityStatus, about?.location].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-20">
      {person ? <JsonLd data={person} /> : null}
      <section className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={siteTitle}
            width={160}
            height={160}
            priority
            className="size-32 shrink-0 rounded-full object-cover sm:size-40"
          />
        ) : null}
        <div className="flex flex-col gap-5">
          {statusLine ? (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {statusLine}
            </span>
          ) : null}
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {firstName} <span className="text-primary">{lastName}</span>
          </h1>
          {headlineParts.length ? (
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold tracking-tight">{headlineParts[0]}</p>
              {headlineParts[1] ? (
                <p className="text-muted-foreground">{headlineParts[1]}</p>
              ) : null}
            </div>
          ) : null}
          {about?.shortBio ? (
            <p className="max-w-xl text-muted-foreground">{about.shortBio}</p>
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
