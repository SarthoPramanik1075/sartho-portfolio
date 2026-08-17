import type { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { personJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import { getSiteUrl } from "@/lib/site-config";
import { urlFor } from "@/sanity/lib/image";
import { getAbout, getSiteSettings } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  return pageMetadata({ title: "About", description: about?.shortBio });
}

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSiteSettings()]);

  if (!about) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-sm text-muted-foreground">
          Content coming soon.
        </p>
      </div>
    );
  }

  const photoUrl = about.profilePhoto
    ? urlFor(about.profilePhoto).width(480).height(600).fit("crop").url()
    : null;
  const person = personJsonLd(about, getSiteUrl());

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-14 px-6 py-20">
      {person ? <JsonLd data={person} /> : null}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight">About Me</h1>
        <span className="h-1 w-16 rounded-full bg-primary" />
        <p className="text-muted-foreground">Get to know me better</p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
        <div className="order-2 flex flex-col gap-6 sm:order-1">
          <div className="flex flex-col gap-1.5">
            <p className="font-heading text-lg font-semibold tracking-tight">{about.headline}</p>
            {about.location ? (
              <p className="font-mono text-xs text-muted-foreground uppercase">{about.location}</p>
            ) : null}
          </div>

          {about.bio?.length ? <RichText value={about.bio} /> : null}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {about.resumeFile?.asset?.url ? (
              <Button
                nativeButton={false}
                render={
                  <a href={about.resumeFile.asset.url} target="_blank" rel="noopener noreferrer" />
                }
              >
                Download Resume
              </Button>
            ) : null}
            {about.socialLinks?.map((link) => (
              <Button
                key={link.platform}
                variant="outline"
                nativeButton={false}
                render={<a href={link.url} target="_blank" rel="noopener noreferrer" />}
              >
                {link.platform}
              </Button>
            ))}
          </div>
        </div>

        {photoUrl ? (
          <div className="relative order-1 sm:order-2">
            <Image
              src={photoUrl}
              alt={`Photo of ${settings?.siteTitle || "Sartho Pramanik"}`}
              width={480}
              height={600}
              className="aspect-4/5 w-full rounded-2xl object-cover"
              priority
            />
            <span className="absolute top-1/2 -left-2 size-3 rounded-full bg-primary" />
            <span className="absolute top-1/2 -left-6 size-1.5 rounded-full bg-primary/50" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
