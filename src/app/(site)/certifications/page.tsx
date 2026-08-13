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
      <h1 className="font-heading text-3xl font-medium tracking-tight">Certifications</h1>

      {certifications.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Certifications will be added here soon.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert) => {
            const logoUrl = cert.logo
              ? urlFor(cert.logo).width(96).height(96).fit("crop").url()
              : null;
            const inner = (
              <div className="flex items-center gap-4 rounded-xl border border-border/60 p-5 transition-colors hover:border-border">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={cert.issuingOrganization}
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-lg object-cover"
                  />
                ) : null}
                <div className="flex flex-col gap-1">
                  <h2 className="font-heading text-base font-medium tracking-tight">
                    {cert.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{cert.issuingOrganization}</p>
                  {cert.issueDate ? (
                    <p className="text-xs text-muted-foreground">
                      Issued {formatMonthYear(cert.issueDate)}
                      {cert.expiryDate ? ` · Expires ${formatMonthYear(cert.expiryDate)}` : ""}
                    </p>
                  ) : null}
                </div>
              </div>
            );

            return cert.credentialUrl ? (
              <Link
                key={cert._id}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
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
