import { ImageResponse } from "next/og";

import { loadOgFonts } from "@/lib/og-fonts";
import { OG_SIZE, OgCard } from "@/lib/og-template";
import { getResearchBySlug } from "@/sanity/lib/queries";

export const alt = "Research";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getResearchBySlug(slug);
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <OgCard
        eyebrow={entry?.status || "Research"}
        title={entry?.title || "Research"}
        description={entry?.abstract}
      />
    ),
    { ...size, fonts }
  );
}
