import type { MetadataRoute } from "next"
import { blogPosts, siteConfig } from "@/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/photography`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/hackathons`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
