import { getPostsSorted, getMediumPostsSorted, siteConfig } from '@/data'
import { BlogPageContent } from '@/components/blog/BlogPageContent'

export const metadata = {
  title: `Blog | ${siteConfig.title}`,
  description: 'Thoughts on software development, design, and building things.',
  alternates: {
    canonical: '/blog',
  },
  keywords: [
    "Subham Karmakar Blog",
    "Subham12r Blog",
    "Software Development Blog",
    "Web Development Articles",
    "Programming Blog",
    "Next.js tutorials",
    "GoLang articles",
    "Tech Insights",
  ],
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: 'Thoughts on software development, design, and building things.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
    images: [{ url: '/blog/opengraph-image', width: 1200, height: 630, alt: 'Writing by Subham Karmakar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${siteConfig.name}`,
    description: 'Thoughts on software development, design, and building things.',
    images: ['/blog/opengraph-image'],
  },
}

export default function BlogPage() {
  const posts = getPostsSorted()
  const mediumPosts = getMediumPostsSorted() // Show all Medium posts

  return <BlogPageContent posts={posts} mediumPosts={mediumPosts} />
}
