import type { About, ProjectDetail, ResearchDetail } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export function personJsonLd(about: About | null, siteUrl: string) {
  if (!about) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sartho Pramanik",
    jobTitle: about.headline,
    description: about.shortBio,
    url: siteUrl,
    ...(about.profilePhoto
      ? { image: urlFor(about.profilePhoto).width(800).height(800).url() }
      : {}),
    ...(about.socialLinks?.length
      ? { sameAs: about.socialLinks.map((link) => link.url) }
      : {}),
  };
}

export function creativeWorkJsonLd(project: ProjectDetail, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/projects/${project.slug.current}`,
    ...(project.coverImage
      ? { image: urlFor(project.coverImage).width(1200).height(630).url() }
      : {}),
    ...(project.startDate ? { dateCreated: project.startDate } : {}),
    ...(project.endDate ? { dateModified: project.endDate } : {}),
    ...(project.links?.repo ? { codeRepository: project.links.repo } : {}),
    ...(project.techStack?.length
      ? { keywords: project.techStack.map((tech) => tech.name).join(", ") }
      : {}),
    author: {
      "@type": "Person",
      name: "Sartho Pramanik",
    },
  };
}

export function scholarlyArticleJsonLd(research: ResearchDetail, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: research.title,
    description: research.abstract,
    url: `${siteUrl}/research/${research.slug.current}`,
    ...(research.date ? { datePublished: research.date } : {}),
    ...(research.publicationVenue ? { isPartOf: research.publicationVenue } : {}),
    ...(research.doiOrLink ? { sameAs: research.doiOrLink } : {}),
    author: research.authors?.length
      ? research.authors.map((name) => ({ "@type": "Person", name }))
      : { "@type": "Person", name: "Sartho Pramanik" },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
