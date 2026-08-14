import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { pageMetadata } from "@/lib/page-metadata";
import { cn } from "@/lib/utils";
import { PROJECT_CATEGORIES } from "@/lib/project-constants";
import { getAllProjects } from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Software projects across hackathons, research, client work, and open source.",
});

export default async function ProjectsPage(props: PageProps<"/projects">) {
  const { category } = await props.searchParams;
  const activeCategory = typeof category === "string" ? category : undefined;

  const projects = await getAllProjects();
  const filteredProjects = activeCategory
    ? projects.filter((project) => project.category?.includes(activeCategory))
    : projects;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-20">
      <h1 className="font-heading text-3xl font-medium tracking-tight">Projects</h1>

      <div className="flex flex-wrap gap-2 font-mono text-xs">
        <Link
          href="/projects"
          className={cn(
            "rounded-sm border px-3 py-1 transition-colors",
            !activeCategory
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
          )}
        >
          all
        </Link>
        {PROJECT_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/projects?category=${encodeURIComponent(cat)}`}
            className={cn(
              "rounded-sm border px-3 py-1 transition-colors",
              activeCategory === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            {cat.toLowerCase()}
          </Link>
        ))}
      </div>

      {filteredProjects.length ? (
        <div className="flex flex-col">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          {projects.length === 0
            ? "Projects will be added here soon."
            : "No projects in this category yet."}
        </p>
      )}
    </div>
  );
}
