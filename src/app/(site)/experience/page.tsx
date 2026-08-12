import type { Metadata } from "next";
import Image from "next/image";

import { RichText } from "@/components/rich-text";
import { Badge } from "@/components/ui/badge";
import { formatMonthYear } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { getExperienceList } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Experience",
};

export default async function ExperiencePage() {
  const experience = await getExperienceList();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-20">
      <h1 className="font-heading text-3xl font-medium tracking-tight">Experience</h1>

      {experience.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No experience entries yet — add one in Sanity Studio.
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {experience.map((role) => {
            const logoUrl = role.logo
              ? urlFor(role.logo).width(96).height(96).fit("crop").url()
              : null;

            return (
              <div key={role._id} className="flex gap-4">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={role.organization}
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-lg object-cover"
                  />
                ) : null}
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h2 className="font-heading text-lg font-medium tracking-tight">
                      {role.role} · {role.organization}
                    </h2>
                    <p className="shrink-0 text-sm text-muted-foreground">
                      {formatMonthYear(role.startDate)} —{" "}
                      {role.endDate ? formatMonthYear(role.endDate) : "Present"}
                    </p>
                  </div>
                  {role.location || role.employmentType ? (
                    <p className="text-sm text-muted-foreground">
                      {[role.location, role.employmentType].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                  {role.summary?.length ? <RichText value={role.summary} /> : null}
                  {role.highlights?.length ? (
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {role.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  ) : null}
                  {role.skillsUsed?.length ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {role.skillsUsed.map((skill) => (
                        <Badge key={skill.name} variant="secondary">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
