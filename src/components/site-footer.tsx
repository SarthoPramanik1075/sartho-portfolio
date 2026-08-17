import { ExternalLink, Mail } from 'lucide-react'
import Link from 'next/link'

import { getAbout, getSiteSettings } from '@/sanity/lib/queries'

export async function SiteFooter() {
  const [settings, about] = await Promise.all([getSiteSettings(), getAbout()])
  const year = new Date().getFullYear()
  const footerText = settings?.footerText || `© ${year} ${settings?.siteTitle || 'Sartho Pramanik'}`

  return (
    <footer className="border-t border-border/60 print:hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted-foreground">{footerText}</p>
        <div className="flex flex-wrap gap-2.5">
          {settings?.contactEmail ? (
            <Link
              href={`mailto:${settings.contactEmail}`}
              className="flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Mail className="size-3.5" />
              Email
            </Link>
          ) : null}
          {about?.socialLinks?.map((link) => (
            <Link
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ExternalLink className="size-3.5" />
              {link.platform}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
