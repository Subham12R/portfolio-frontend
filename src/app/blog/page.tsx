import { getPostsSorted, getMediumPostsSorted, siteConfig } from '@/data'
import { BlogPageContent } from '@/components/blog/BlogPageContent'

export const metadata = {
  title: `Blog | ${siteConfig.title}`,
  description: 'Thoughts on software development, design, and building things.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: 'Thoughts on software development, design, and building things.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
    images: ['/icon.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${siteConfig.name}`,
    description: 'Thoughts on software development, design, and building things.',
    images: ['/icon.png'],
  },
}

export default function BlogPage() {
  const posts = getPostsSorted()
  const mediumPosts = getMediumPostsSorted() // Show all Medium posts

  return <BlogPageContent posts={posts} mediumPosts={mediumPosts} />
}
