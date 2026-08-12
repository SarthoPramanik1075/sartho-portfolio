import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatMonthYear } from "@/lib/utils";
import { getAchievements } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Achievements",
};

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
      <h1 className="font-heading text-3xl font-medium tracking-tight">Achievements</h1>

      {achievements.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No achievements yet — add one in Sanity Studio.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement._id}
              className="flex flex-col gap-2 rounded-xl border border-border/60 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {achievement.placement ? (
                    <Badge variant="secondary">{achievement.placement}</Badge>
                  ) : null}
                  <span className="text-sm text-muted-foreground">{achievement.issuer}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatMonthYear(achievement.date)}
                </span>
              </div>
              <h2 className="font-heading text-lg font-medium tracking-tight">
                {achievement.title}
              </h2>
              {achievement.description ? (
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              ) : null}
              {achievement.teamSize ? (
                <p className="text-sm text-muted-foreground">
                  Team of {achievement.teamSize}
                </p>
              ) : null}
              {achievement.eventUrl ? (
                <Link
                  href={achievement.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline underline-offset-4"
                >
                  Event details
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
