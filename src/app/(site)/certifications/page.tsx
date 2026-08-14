import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "@/lib/page-metadata";
import { formatMonthYear } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { getCertifications } from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Certifications",
  description: "Professional certifications and credentials.",
});

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">Certifications</h1>

      {certifications.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Certifications will be added here soon.
        </p>
      ) : (
        <div className="flex flex-col">
          {certifications.map((cert) => {
            const logoUrl = cert.logo
              ? urlFor(cert.logo).width(64).height(64).fit("crop").url()
              : null;
            const inner = (
              <div className="flex items-center gap-4 border-t border-border/60 py-5 first:border-t-0 first:pt-0">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={cert.issuingOrganization}
                    width={36}
                    height={36}
                    className="size-9 shrink-0 rounded-sm object-cover"
                  />
                ) : (
                  <span className="w-20 shrink-0 font-mono text-xs text-primary">
                    {cert.issueDate ? formatMonthYear(cert.issueDate) : "—"}
                  </span>
                )}
                <div className="flex flex-col gap-0.5">
                  <h2 className="font-heading text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {cert.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{cert.issuingOrganization}</p>
                  {logoUrl && cert.issueDate ? (
                    <p className="font-mono text-[11px] text-muted-foreground">
                      issued {formatMonthYear(cert.issueDate)}
                      {cert.expiryDate ? ` · expires ${formatMonthYear(cert.expiryDate)}` : ""}
                    </p>
                  ) : null}
                </div>
              </div>
            );

            return cert.credentialUrl ? (
              <Link key={cert._id} href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="group">
                {inner}
              </Link>
            ) : (
              <div key={cert._id}>{inner}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
