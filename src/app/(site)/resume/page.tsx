import { PrintButton } from "@/components/print-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/page-metadata";
import { formatMonthYear } from "@/lib/utils";
import {
  getAbout,
  getAllSkills,
  getCertifications,
  getExperienceList,
  getSiteSettings,
} from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Resume",
  description: "Downloadable resume and CV.",
});

export default async function ResumePage() {
  const [about, experience, skills, certifications, settings] = await Promise.all([
    getAbout(),
    getExperienceList(),
    getAllSkills(),
    getCertifications(),
    getSiteSettings(),
  ]);

  const skillsByCategory = skills.reduce<Record<string, string[]>>((groups, skill) => {
    const category = skill.category || "Other";
    groups[category] = [...(groups[category] || []), skill.name];
    return groups;
  }, {});

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20 print:py-8">
      <div className="flex flex-col gap-4 print:hidden">
        <div className="flex flex-wrap gap-3">
          {about?.resumeFile?.asset?.url ? (
            <Button
              nativeButton={false}
              render={
                <a href={about.resumeFile.asset.url} target="_blank" rel="noopener noreferrer" />
              }
            >
              Download PDF
            </Button>
          ) : null}
          <PrintButton />
        </div>
        {!about?.resumeFile?.asset?.url ? (
          <p className="text-sm text-muted-foreground">
            No PDF uploaded yet — add one to the Resume File field on the About document in
            Sanity Studio to enable a direct download.
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-medium tracking-tight">
          {settings?.siteTitle || "Sartho Pramanik"}
        </h1>
        {about?.headline ? <p className="text-muted-foreground">{about.headline}</p> : null}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {settings?.contactEmail ? <span>{settings.contactEmail}</span> : null}
          {about?.location ? <span>{about.location}</span> : null}
          {about?.socialLinks?.map((link) => <span key={link.platform}>{link.url}</span>)}
        </div>
      </div>

      {about?.shortBio ? <p className="text-muted-foreground">{about.shortBio}</p> : null}

      {experience.length ? (
        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-lg font-medium tracking-tight">Experience</h2>
          <div className="flex flex-col gap-5">
            {experience.map((role) => (
              <div key={role._id} className="flex flex-col gap-1">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="font-medium">
                    {role.role} · {role.organization}
                  </p>
                  <p className="shrink-0 text-sm text-muted-foreground">
                    {formatMonthYear(role.startDate)} —{" "}
                    {role.endDate ? formatMonthYear(role.endDate) : "Present"}
                  </p>
                </div>
                {role.highlights?.length ? (
                  <ul className="list-disc space-y-0.5 pl-5 text-sm text-muted-foreground">
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {Object.keys(skillsByCategory).length ? (
        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-lg font-medium tracking-tight">Skills</h2>
          <div className="flex flex-col gap-3">
            {Object.entries(skillsByCategory).map(([category, names]) => (
              <div key={category} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <p className="w-32 shrink-0 text-sm text-muted-foreground">{category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {names.map((name) => (
                    <Badge key={name} variant="secondary">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {certifications.length ? (
        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-lg font-medium tracking-tight">Certifications</h2>
          <ul className="flex flex-col gap-1 text-sm">
            {certifications.map((cert) => (
              <li key={cert._id} className="flex flex-wrap justify-between gap-x-3">
                <span>
                  {cert.title} — {cert.issuingOrganization}
                </span>
                {cert.issueDate ? (
                  <span className="text-muted-foreground">
                    {formatMonthYear(cert.issueDate)}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {!experience.length && !skills.length && !certifications.length ? (
        <p className="text-sm text-muted-foreground">
          No resume content yet — add Experience, Skills, and Certifications in Sanity Studio.
        </p>
      ) : null}
    </div>
  );
}
