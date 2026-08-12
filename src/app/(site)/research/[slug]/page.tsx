import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, scholarlyArticleJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import { getSiteUrl } from "@/lib/site-config";
import { formatMonthYear } from "@/lib/utils";
import { getResearchBySlug, getResearchSlugs } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const slugs = await getResearchSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/research/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = await getResearchBySlug(slug);

  if (!entry) return {};

  return pageMetadata({ title: entry.title, description: entry.abstract });
}

export default async function ResearchDetailPage(props: PageProps<"/research/[slug]">) {
  const { slug } = await props.params;
  const entry = await getResearchBySlug(slug);

  if (!entry) notFound();

  const siteUrl = getSiteUrl();
  const scholarlyArticle = scholarlyArticleJsonLd(entry, siteUrl);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "Research", url: `${siteUrl}/research` },
    { name: entry.title, url: `${siteUrl}/research/${entry.slug.current}` },
  ]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20">
      <JsonLd data={scholarlyArticle} />
      <JsonLd data={breadcrumb} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary">{entry.status}</Badge>
          {entry.publicationVenue ? (
            <span className="text-sm text-muted-foreground">{entry.publicationVenue}</span>
          ) : null}
          {entry.date ? (
            <span className="text-sm text-muted-foreground">{formatMonthYear(entry.date)}</span>
          ) : null}
        </div>
        <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
          {entry.title}
        </h1>
        {entry.authors?.length ? (
          <p className="text-sm text-muted-foreground">{entry.authors.join(", ")}</p>
        ) : null}
      </div>

      {entry.abstract ? <p className="text-muted-foreground">{entry.abstract}</p> : null}

      <div className="flex flex-wrap gap-3">
        {entry.doiOrLink ? (
          <Button
            nativeButton={false}
            render={<a href={entry.doiOrLink} target="_blank" rel="noopener noreferrer" />}
          >
            View publication
          </Button>
        ) : null}
        {entry.pdf?.asset?.url ? (
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={entry.pdf.asset.url} target="_blank" rel="noopener noreferrer" />}
          >
            Download PDF
          </Button>
        ) : null}
      </div>

      {entry.researchInterests?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {entry.researchInterests.map((interest) => (
            <Badge key={interest} variant="outline">
              {interest}
            </Badge>
          ))}
        </div>
      ) : null}

      {entry.relatedProject ? (
        <p className="text-sm text-muted-foreground">
          Related project:{" "}
          <Link
            href={`/projects/${entry.relatedProject.slug.current}`}
            className="text-foreground underline underline-offset-4"
          >
            {entry.relatedProject.title}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
