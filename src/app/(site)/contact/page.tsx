import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/page-metadata";
import { getAbout, getSiteSettings } from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch by email or social media.",
});

export default async function ContactPage() {
  const [settings, about] = await Promise.all([getSiteSettings(), getAbout()]);
  const email = settings?.contactEmail;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-14 px-6 py-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Contact Me</h1>
        <span className="h-1 w-16 rounded-full bg-primary" />
        <p className="text-muted-foreground">
          {about?.availabilityStatus || "Let's connect and discuss opportunities"}
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
        <div className="flex flex-col gap-6">
          {email ? (
            <div className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Mail className="size-5" />
              </span>
              <div className="flex flex-col">
                <span className="font-medium">Email</span>
                <a href={`mailto:${email}`} className="text-primary hover:underline">
                  {email}
                </a>
              </div>
            </div>
          ) : null}

          {about?.location ? (
            <div className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <MapPin className="size-5" />
              </span>
              <div className="flex flex-col">
                <span className="font-medium">Location</span>
                <span className="text-muted-foreground">{about.location}</span>
              </div>
            </div>
          ) : null}

          {settings?.contactPhone ? (
            <div className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Phone className="size-5" />
              </span>
              <div className="flex flex-col">
                <span className="font-medium">Phone</span>
                <a href={`tel:${settings.contactPhone}`} className="text-primary hover:underline">
                  {settings.contactPhone}
                </a>
              </div>
            </div>
          ) : null}

          {!email && !about?.location && !settings?.contactPhone ? (
            <p className="text-sm text-muted-foreground">
              An email address will be added here soon.
            </p>
          ) : null}

          {about?.socialLinks?.length ? (
            <div className="flex flex-wrap gap-3 pt-2">
              {about.socialLinks.map((link) => (
                <Link
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <ExternalLink className="size-4" />
                  {link.platform}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {email ? <ContactForm email={email} /> : null}
      </div>
    </div>
  );
}
