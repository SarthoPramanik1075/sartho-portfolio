import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SanityLive } from "@/sanity/lib/live";
import { getSiteUrl } from "@/lib/site-config";
import { getSiteSettings } from "@/sanity/lib/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const DEFAULT_TITLE = "Sartho Pramanik";
const DEFAULT_DESCRIPTION =
  "Portfolio of Sartho Pramanik — software engineer, researcher, and builder.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.siteTitle || DEFAULT_TITLE;
  const description = settings?.defaultSeoDescription || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      title,
      description,
      siteName: title,
      type: "website",
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(settings?.googleSiteVerification
      ? { verification: { google: settings.googleSiteVerification } }
      : {}),
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SanityLive />
      </body>
    </html>
  );
}
