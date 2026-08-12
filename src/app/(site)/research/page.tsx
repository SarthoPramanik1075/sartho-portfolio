import Link from "next/link";

import { Badge } from "@/components/ui/badge";
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
      <h1 className="font-heading text-3xl font-medium tracking-tight">Research</h1>

      {research.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No research entries yet — add one in Sanity Studio.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {research.map((entry) => (
            <Link
              key={entry._id}
              href={`/research/${entry.slug.current}`}
              className="group flex flex-col gap-2 rounded-xl border border-border/60 p-5 transition-colors hover:border-border"
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="secondary">{entry.status}</Badge>
                {entry.publicationVenue ? (
                  <span className="text-sm text-muted-foreground">{entry.publicationVenue}</span>
                ) : null}
              </div>
              <h2 className="font-heading text-lg font-medium tracking-tight group-hover:underline">
                {entry.title}
              </h2>
              {entry.authors?.length ? (
                <p className="text-sm text-muted-foreground">{entry.authors.join(", ")}</p>
              ) : null}
              {entry.abstract ? (
                <p className="line-clamp-2 text-sm text-muted-foreground">{entry.abstract}</p>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
