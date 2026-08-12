import Link from 'next/link'

import { getAbout, getSiteSettings } from '@/sanity/lib/queries'

export async function SiteFooter() {
  const [settings, about] = await Promise.all([getSiteSettings(), getAbout()])
  const year = new Date().getFullYear()
  const footerText = settings?.footerText || `© ${year} ${settings?.siteTitle || 'Sartho Pramanik'}`

  return (
    <footer className="border-t border-border/60 print:hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>{footerText}</p>
        {about?.socialLinks?.length ? (
          <div className="flex gap-6">
            {about.socialLinks.map((link) => (
              <Link
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {link.platform}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  )
}
