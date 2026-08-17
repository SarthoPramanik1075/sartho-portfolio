import Link from "next/link";

import { pageMetadata } from "@/lib/page-metadata";
import { formatMonthYear } from "@/lib/utils";
import { getAchievements } from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Achievements",
  description: "Hackathon wins, awards, and other achievements.",
});

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">Achievements</h1>

      {achievements.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Achievements will be added here soon.
        </p>
      ) : (
        <div className="flex flex-col">
          {achievements.map((achievement) => (
            <div
              key={achievement._id}
              className="flex flex-col gap-2 border-t border-border/60 py-6 first:border-t-0 first:pt-0 sm:flex-row sm:gap-6"
            >
              <div className="shrink-0 font-mono text-xs text-primary sm:w-28">
                {formatMonthYear(achievement.date)}
                {achievement.placement ? (
                  <div className="mt-1 text-muted-foreground">{achievement.placement}</div>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="font-heading text-base font-semibold tracking-tight">
                    {achievement.title}
                  </h2>
                  <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                    {achievement.issuer}
                  </span>
                </div>
                {achievement.description ? (
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                ) : null}
                {achievement.teamSize ? (
                  <p className="font-mono text-xs text-muted-foreground">
                    team of {achievement.teamSize}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
