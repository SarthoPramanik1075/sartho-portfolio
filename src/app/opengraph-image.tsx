import { ImageResponse } from "next/og";

import { loadOgFonts } from "@/lib/og-fonts";
import { OG_SIZE, OgCard } from "@/lib/og-template";
import { getAbout, getSiteSettings } from "@/sanity/lib/queries";

export const alt = "Sartho Pramanik";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const [settings, about] = await Promise.all([getSiteSettings(), getAbout()]);
  const siteName = settings?.siteTitle || "Sartho Pramanik";
  const title = about?.headline || siteName;
  const description = settings?.defaultSeoDescription || about?.shortBio;

  const fonts = await loadOgFonts();

  return new ImageResponse(
    <OgCard title={title} description={description} siteName={siteName} />,
    { ...size, fonts }
  );
}
