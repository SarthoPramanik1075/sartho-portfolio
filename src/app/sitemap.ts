import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-config";
import { getProjectSlugs, getResearchSlugs } from "@/sanity/lib/queries";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
  { path: "/experience", changeFrequency: "monthly", priority: 0.6 },
  { path: "/research", changeFrequency: "monthly", priority: 0.6 },
  { path: "/achievements", changeFrequency: "monthly", priority: 0.5 },
  { path: "/certifications", changeFrequency: "monthly", priority: 0.5 },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.5 },
  { path: "/resume", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [projectSlugs, researchSlugs] = await Promise.all([
    getProjectSlugs(),
    getResearchSlugs(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const researchEntries: MetadataRoute.Sitemap = researchSlugs.map((slug) => ({
    url: `${siteUrl}/research/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...projectEntries, ...researchEntries];
}
