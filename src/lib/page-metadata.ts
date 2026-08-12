import type { Metadata } from "next";

/**
 * Root layout sets a site-wide default `openGraph`/`twitter` block, which
 * Next.js metadata merging inherits wholesale on any page that doesn't set
 * its own — a plain page-level `title`/`description` alone does NOT flow
 * into `openGraph`/`twitter`. This keeps social previews page-accurate.
 */
export function pageMetadata({
  title,
  description,
}: {
  title: string;
  description?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}
