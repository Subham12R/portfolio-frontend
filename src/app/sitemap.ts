import type { MetadataRoute } from "next"
import { blogPosts, siteConfig } from "@/data"
import { fetchProjects } from "@/lib/api/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/photography`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/hackathons`, changeFrequency: "monthly", priority: 0.6 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const projects = await fetchProjects()
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.id}`,
    ...(project.completedDate ? { lastModified: new Date(project.completedDate) } : {}),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
