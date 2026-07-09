import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/footer"
import { siteConfig } from "@/data"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SmoothScroll } from "@/components/providers/SmoothScrollWrapper"
import { Neko } from "@/components/ui/Neko"
import { WaveBackground } from "@/components/layout/WaveBackground"
import { JsonLd } from "@/components/ui/JsonLd"
import { PageTransition } from "@/components/ui/PageTransition"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import Script from "next/script"

const helvetica = localFont({
  src: "../../public/fonts/Helvetica.ttf",
  variable: "--font-helvetica",
  display: "swap",
})

const playfair = localFont({
  src: "../../public/fonts/PlayfairDisplay.ttf",
  variable: "--font-playfair",
  display: "swap",
})

const sans = localFont({
  src: "../../public/fonts/InstrumentSans.ttf",
  variable: "--font-instrumentsans",
  display: "swap",
})

const serif = localFont({
  src: "../../public/fonts/InstrumentSerif.ttf",
  variable: "--font-instrumentserif",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Subham Karmakar",
    "Subham12r",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "GoLang",
    "Golang Developer",
    "FastAPI",
    "Python Developer",
    "Backend Developer",
    "System Design",
    "Docker",
    "Nginx",
    "Moodle LMS",
    "WebSockets",
    "Local AI",
    "RAG",
    "Portfolio",
    "Kolkata Developer",
    "Web Developer",
    "Software Engineer",
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio banner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    creator: `@${siteConfig.socials.twitter.username}`,
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${helvetica.variable} ${playfair.variable} ${sans.variable} ${serif.variable} antialiased min-h-screen bg-bg-primary text-text-primary transition-colors duration-300`}
      >
        <JsonLd />
        <ThemeProvider>
          <SmoothScroll>
            <Navigation />
            <div className="relative isolate">
              <PageTransition>
                <main>{children}</main>
              </PageTransition>
              <Footer />
              <WaveBackground />
            </div>
            <div
              className="fixed bottom-0 inset-x-0 h-28 pointer-events-none z-40 bg-linear-to-t from-white via-white/50 to-transparent dark:opacity-0 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div
              className="fixed bottom-0 inset-x-0 h-28 pointer-events-none z-40 bg-linear-to-t from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent opacity-0 dark:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="a1621718-9590-4553-9bb6-ea78ab9970b0"
          strategy="afterInteractive"
        />
        <Neko />
        <ScrollToTop />
      </body>
    </html>
  )
}
