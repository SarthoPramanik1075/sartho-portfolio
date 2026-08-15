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
    ? urlFor(about.profilePhoto).width(160).height(160).fit("crop").url()
    : null;
  const siteTitle = settings?.siteTitle || "Sartho Pramanik";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-20">
      {person ? <JsonLd data={person} /> : null}
      <section className="flex flex-col gap-10">
        <div className="flex items-center gap-5">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={siteTitle}
              width={88}
              height={88}
              priority
              className="size-22 shrink-0 rounded-full object-cover"
            />
          ) : null}
          <div className="flex flex-col gap-2">
            <p className="font-heading text-lg font-semibold tracking-tight">{siteTitle}</p>
            <p className="font-mono text-xs tracking-wide text-primary uppercase">
              {[about?.availabilityStatus, about?.location ? `location · ${about.location}` : null]
                .filter(Boolean)
                .join(' — ')}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="max-w-2xl font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {about?.headline || "Content coming soon."}
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
