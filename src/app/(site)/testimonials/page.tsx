import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "@/lib/page-metadata";
import { urlFor } from "@/sanity/lib/image";
import { getTestimonials } from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Testimonials",
  description: "What colleagues, collaborators, and clients have to say.",
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-20">
      <h1 className="font-heading text-3xl font-medium tracking-tight">Testimonials</h1>

      {testimonials.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Testimonials from collaborators and mentors will be added here soon.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial) => {
            const photoUrl = testimonial.authorPhoto
              ? urlFor(testimonial.authorPhoto).width(96).height(96).fit("crop").url()
              : null;
            const role = [testimonial.authorRole, testimonial.authorOrg]
              .filter(Boolean)
              .join(" · ");

            return (
              <figure
                key={testimonial._id}
                className="flex flex-col gap-4 rounded-xl border border-border/60 p-6"
              >
                <blockquote className="font-heading text-lg leading-snug tracking-tight">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={testimonial.authorName}
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-full object-cover"
                    />
                  ) : null}
                  <div className="flex flex-col text-sm">
                    {testimonial.linkedInUrl ? (
                      <Link
                        href={testimonial.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                      >
                        {testimonial.authorName}
                      </Link>
                    ) : (
                      <span className="font-medium">{testimonial.authorName}</span>
                    )}
                    {role ? <span className="text-muted-foreground">{role}</span> : null}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}
    </div>
  );
}
