import type { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { RichText } from "@/components/rich-text";
import { urlFor } from "@/sanity/lib/image";
import { getAbout } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const about = await getAbout();

  if (!about) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-sm text-muted-foreground">
          No About content yet — fill in the About document in Sanity Studio.
        </p>
      </div>
    );
  }

  const photoUrl = about.profilePhoto
    ? urlFor(about.profilePhoto).width(480).height(480).fit("crop").url()
    : null;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={about.headline}
            width={128}
            height={128}
            className="size-32 shrink-0 rounded-full object-cover"
          />
        ) : null}
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl font-medium tracking-tight">
            {about.headline}
          </h1>
          {about.location ? (
            <p className="text-sm text-muted-foreground">{about.location}</p>
          ) : null}
        </div>
      </div>

      {about.bio?.length ? <RichText value={about.bio} /> : null}

      <div className="flex flex-wrap items-center gap-3">
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
  );
}
