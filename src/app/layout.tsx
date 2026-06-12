import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/footer"
import { siteConfig } from "@/data"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SmoothScroll } from "@/components/providers/SmoothScroll"
import { Neko } from "@/components/ui/Neko"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import { JsonLd } from "@/components/ui/JsonLd"
import { PageTransition } from "@/components/ui/PageTransition"

const helvetica = localFont({
  src: "../../public/fonts/Helvetica.ttf",
  variable: "--font-helvetica",
  display: "swap",
})

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
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: `${siteConfig.name} portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    creator: `@${siteConfig.socials.twitter.username}`,
    images: ["/icon.png"],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${helvetica.variable} antialiased min-h-screen bg-bg-primary text-text-primary transition-colors duration-300`}
      >
        <JsonLd />
        <ThemeProvider>
          <PageTransition />
          <SmoothScroll>
            <Navigation />
            <main>{children}</main>
            <Footer />
            <div
              className="fixed bottom-0 inset-x-0 h-28 pointer-events-none z-40 bg-linear-to-t from-bg-primary via-bg-primary/50 to-transparent"
              aria-hidden="true"
            />
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
        <Neko />
        <ScrollToTop />
      </body>
    </html>
  )
}
