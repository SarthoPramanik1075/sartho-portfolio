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
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">Testimonials</h1>

      {testimonials.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Testimonials from collaborators and mentors will be added here soon.
        </p>
      ) : (
        <div className="flex flex-col">
          {testimonials.map((testimonial) => {
            const photoUrl = testimonial.authorPhoto
              ? urlFor(testimonial.authorPhoto).width(80).height(80).fit("crop").url()
              : null;
            const role = [testimonial.authorRole, testimonial.authorOrg]
              .filter(Boolean)
              .join(" · ");

            return (
              <figure
                key={testimonial._id}
                className="flex flex-col gap-4 border-t border-border/60 py-8 first:border-t-0 first:pt-0 sm:flex-row sm:gap-8"
              >
                <figcaption className="flex shrink-0 items-center gap-3 sm:w-44 sm:flex-col sm:items-start">
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
                        className="font-medium hover:text-primary"
                      >
                        {testimonial.authorName}
                      </Link>
                    ) : (
                      <span className="font-medium">{testimonial.authorName}</span>
                    )}
                    {role ? (
                      <span className="font-mono text-[11px] text-muted-foreground">{role}</span>
                    ) : null}
                  </div>
                </figcaption>
                <blockquote className="font-heading text-base leading-relaxed tracking-tight">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </figure>
            );
          })}
        </div>
      )}
    </div>
  );
}
