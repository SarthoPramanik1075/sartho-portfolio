import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import { getSiteUrl } from "@/lib/site-config";
import { formatMonthYear } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) return {};

  return pageMetadata({ title: project.title, description: project.summary });
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const coverUrl = project.coverImage
    ? urlFor(project.coverImage).width(1200).height(675).fit("crop").url()
    : null;

  const siteUrl = getSiteUrl();
  const creativeWork = creativeWorkJsonLd(project, siteUrl);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "Projects", url: `${siteUrl}/projects` },
    { name: project.title, url: `${siteUrl}/projects/${project.slug.current}` },
  ]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
      <JsonLd data={creativeWork} />
      <JsonLd data={breadcrumb} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {project.category?.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
          {project.status ? <Badge variant="outline">{project.status}</Badge> : null}
        </div>
        <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground">{project.summary}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {project.role ? <span>{project.role}</span> : null}
          {project.startDate ? (
            <span>
              {formatMonthYear(project.startDate)} —{" "}
              {project.endDate ? formatMonthYear(project.endDate) : "Present"}
            </span>
          ) : null}
        </div>
      </div>

      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={project.title}
          width={1200}
          height={675}
          className="w-full rounded-xl object-cover"
          priority
        />
      ) : null}

      <div className="flex flex-wrap gap-3">
        {project.links?.live ? (
          <Button
            nativeButton={false}
            render={<a href={project.links.live} target="_blank" rel="noopener noreferrer" />}
          >
            Live site
          </Button>
        ) : null}
        {project.links?.repo ? (
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={project.links.repo} target="_blank" rel="noopener noreferrer" />}
          >
            Repository
          </Button>
        ) : null}
        {project.links?.demo ? (
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={project.links.demo} target="_blank" rel="noopener noreferrer" />}
          >
            Demo
          </Button>
        ) : null}
        {project.links?.press ? (
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={project.links.press} target="_blank" rel="noopener noreferrer" />}
          >
            Press
          </Button>
        ) : null}
      </div>

      {project.description?.length ? <RichText value={project.description} /> : null}

      {project.outcomes?.length ? (
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-lg font-medium tracking-tight">Outcomes</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.gallery?.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {project.gallery.map((image, index) => (
            <Image
              key={index}
              src={urlFor(image).width(640).height(400).fit("crop").url()}
              alt={`${project.title} screenshot ${index + 1}`}
              width={640}
              height={400}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      ) : null}

      {project.techStack?.length ? (
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-lg font-medium tracking-tight">Tech stack</h2>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech.name} variant="secondary">
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}

      {project.relatedExperience || project.relatedResearch ? (
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {project.relatedExperience ? (
            <p>
              Related to my role as {project.relatedExperience.role} at{" "}
              {project.relatedExperience.organization}
            </p>
          ) : null}
          {project.relatedResearch ? (
            <p>
              Related research:{" "}
              <Link
                href={`/research/${project.relatedResearch.slug.current}`}
                className="text-foreground underline underline-offset-4"
              >
                {project.relatedResearch.title}
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
