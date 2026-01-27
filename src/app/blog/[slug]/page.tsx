import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getPostBySlug, blogPosts, siteConfig } from '@/data'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | ${siteConfig.title}`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <article className="max-w-3xl mx-auto px-4 lg:px-0 py-16">

        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200 mb-12"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back to blog</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span>{post.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-text-tertiary leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full border border-border-primary text-text-tertiary"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content Placeholder */}
        <div className="prose prose-invert prose-zinc max-w-none">
          <div className="py-20 text-center border border-dashed border-border-secondary rounded-2xl">
            <p className="text-text-muted mb-4">
              Full blog content would go here.
            </p>
            <p className="text-sm text-text-muted">
              This is a placeholder. Integrate MDX or a CMS for full content.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border-primary">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">All posts</span>
            </Link>

            <a
              href={siteConfig.socials.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              <span className="text-sm font-medium">Share on X</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </footer>

      </article>
    </main>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
