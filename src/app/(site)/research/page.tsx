import Link from "next/link";

import { pageMetadata } from "@/lib/page-metadata";
import { getResearchList } from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Research",
  description: "Publications, preprints, and ongoing research work.",
});

export default async function ResearchPage() {
  const research = await getResearchList();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">Research</h1>

      {research.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Research publications will be added here soon.
        </p>
      ) : (
        <div className="flex flex-col">
          {research.map((entry) => (
            <Link
              key={entry._id}
              href={`/research/${entry.slug.current}`}
              className="group flex flex-col gap-2 border-t border-border/60 py-6 first:border-t-0 first:pt-0 sm:flex-row sm:gap-6"
            >
              <div className="shrink-0 font-mono text-xs tracking-wide text-primary uppercase sm:w-28">
                {entry.status}
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="font-heading text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {entry.title}
                  </h2>
                  {entry.publicationVenue ? (
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {entry.publicationVenue}
                    </span>
                  ) : null}
                </div>
                {entry.authors?.length ? (
                  <p className="text-sm text-muted-foreground">{entry.authors.join(", ")}</p>
                ) : null}
                {entry.abstract ? (
                  <p className="line-clamp-2 text-sm text-muted-foreground">{entry.abstract}</p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
