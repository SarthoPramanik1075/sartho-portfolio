import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { getSiteSettings } from '@/sanity/lib/queries'

const FALLBACK_NAV_LINKS = [
  { label: 'Experience', href: '/experience' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export async function SiteHeader() {
  const settings = await getSiteSettings()
  const navLinks = settings?.navLinks?.length ? settings.navLinks : FALLBACK_NAV_LINKS
  const siteTitle = settings?.siteTitle || 'Sartho Pramanik'

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-heading text-lg font-medium tracking-tight">
          {siteTitle}
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
