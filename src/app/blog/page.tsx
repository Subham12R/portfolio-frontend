import { getPostsSorted, siteConfig } from '@/data'
import { BlogPageContent } from '@/components/blog/BlogPageContent'

export const metadata = {
  title: `Blog | ${siteConfig.title}`,
  description: 'Thoughts on software development, design, and building things.',
}

export default function BlogPage() {
  const posts = getPostsSorted()

  return <BlogPageContent posts={posts} />
}
