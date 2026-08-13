import { Button } from "@/components/ui/button";
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
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-medium tracking-tight">
          Get in touch
        </h1>
        <p className="text-muted-foreground">
          {about?.availabilityStatus ||
            "Reach out directly by email or connect on social media."}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {email ? (
          <Button nativeButton={false} render={<a href={`mailto:${email}`} />}>
            {email}
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            An email address will be added here soon.
          </p>
        )}
        {about?.socialLinks?.map((link) => (
          <Button
            key={link.platform}
            variant="outline"
            nativeButton={false}
            render={<a href={link.url} target="_blank" rel="noopener noreferrer" />}
          >
            {link.platform}
          </Button>
        ))}
      </div>
    </div>
  );
}
