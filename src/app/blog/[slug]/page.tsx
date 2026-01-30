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
      <article className="max-w-4xl mx-auto px-4 lg:px-0 py-16">

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

        {/* Content */}
        {post.content ? (
          <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-li:text-text-secondary prose-em:text-text-tertiary">
            {post.content.split('\n\n').map((block, index) => {
              if (block.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-semibold mt-10 mb-4">{block.replace('## ', '')}</h2>
              }
              if (block.startsWith('**') && block.endsWith('**')) {
                return <p key={index} className="font-semibold text-text-primary">{block.replace(/\*\*/g, '')}</p>
              }
              if (block.startsWith('- ')) {
                const items = block.split('\n').filter(line => line.startsWith('- '))
                return (
                  <ul key={index} className="list-disc pl-6 space-y-1 my-4">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                )
              }
              if (block.startsWith('*') && block.endsWith('*') && !block.startsWith('**')) {
                return <p key={index} className="italic text-text-tertiary">{block.replace(/^\*|\*$/g, '')}</p>
              }
              return <p key={index} className="my-4 leading-relaxed">{block}</p>
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-border-secondary rounded-2xl">
            <p className="text-text-muted">Content coming soon.</p>
          </div>
        )}

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

            <span className="text-sm text-text-muted">© {new Date().getFullYear()} {siteConfig.name}</span>
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
