import { ImageResponse } from "next/og";

import { loadOgFonts } from "@/lib/og-fonts";
import { OG_SIZE, OgCard } from "@/lib/og-template";
import { getProjectBySlug } from "@/sanity/lib/queries";

export const alt = "Project";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <OgCard
        eyebrow={project?.category?.[0]}
        title={project?.title || "Project"}
        description={project?.summary}
      />
    ),
    { ...size, fonts }
  );
}
