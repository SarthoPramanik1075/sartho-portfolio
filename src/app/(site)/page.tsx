import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { NeuralNetBackdrop } from "@/components/neural-net-backdrop";
import { ProjectCard } from "@/components/project-card";
import { RichText } from "@/components/rich-text";
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
  const heroImageSource = about?.heroPhoto || about?.profilePhoto;
  const photoUrl = heroImageSource
    ? urlFor(heroImageSource).width(320).height(320).fit("crop").url()
    : null;
  const siteTitle = settings?.siteTitle || "Sartho Pramanik";
  const tagline = "Software developer  |  ML enthusiast  |  Python, NumPy & Pandas  |  CSE student";
  const statusLine = [about?.availabilityStatus, about?.location].filter(Boolean).join(" · ");
  const aboutPhotoUrl = about?.profilePhoto
    ? urlFor(about.profilePhoto).width(480).height(600).fit("crop").url()
    : null;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-20">
      {person ? <JsonLd data={person} /> : null}
      <section className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-center sm:gap-12">
        <NeuralNetBackdrop />
        <span
          aria-hidden
          className="animate-float-y pointer-events-none absolute top-2 right-6 hidden rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/70 select-none sm:block"
        >
          model.fit(X, y)
        </span>
        <span
          aria-hidden
          style={{ animationDelay: "1.3s" }}
          className="animate-float-y pointer-events-none absolute right-16 bottom-6 hidden rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/70 select-none lg:block"
        >
          accuracy: 96%
        </span>

        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={siteTitle}
            width={160}
            height={160}
            priority
            className="size-32 shrink-0 rounded-2xl object-cover sm:size-40"
          />
        ) : null}
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl">
            {siteTitle}
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">{tagline}</p>
          {about?.shortBio ? (
            <p className="max-w-xl text-lg text-muted-foreground">{about.shortBio}</p>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button nativeButton={false} render={<Link href="/contact" />}>
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

      {about?.bio?.length ? (
        <section className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight">About Me</h2>
            <span className="h-1 w-16 rounded-full bg-primary" />
            <p className="text-muted-foreground">Get to know me better</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
            <div className="order-2 flex flex-col gap-4 sm:order-1">
              <RichText value={about.bio} />
              <Link
                href="/about"
                className="w-fit text-sm text-primary underline underline-offset-4"
              >
                More about me →
              </Link>
            </div>

            {aboutPhotoUrl ? (
              <div className="relative order-1 sm:order-2">
                <Image
                  src={aboutPhotoUrl}
                  alt={siteTitle}
                  width={480}
                  height={600}
                  className="aspect-4/5 w-full rounded-2xl object-cover"
                />
                <span className="absolute top-1/2 -left-2 size-3 rounded-full bg-primary" />
                <span className="absolute top-1/2 -left-6 size-1.5 rounded-full bg-primary/50" />
              </div>
            ) : null}
          </div>
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
