import { siteConfig } from "@/data"

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    alternateName: siteConfig.title,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    sameAs: [
      siteConfig.socials.github.url,
      siteConfig.socials.linkedin.url,
      siteConfig.socials.twitter.url,
      siteConfig.socials.youtube.url,
    ],
    image: `${siteConfig.url}/icon.png`,
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: `${siteConfig.name} | ${siteConfig.role}`,
    url: siteConfig.url,
    description: siteConfig.description,
    author: { "@id": `${siteConfig.url}/#person` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}
