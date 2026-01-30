'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { ScrollRevealText } from '@/components/ui/ScrollRevealText'
import type { BlogPost } from '@/data/blog'

interface BlogPageContentProps {
  posts: BlogPost[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogPageContent({ posts }: BlogPageContentProps) {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 lg:px-0 py-16">

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200 mb-12"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back to home</span>
        </Link>

        {/* Header */}
        <header className="mb-16">
          <ScrollRevealText
            as="h1"
            className="text-4xl md:text-5xl font-semibold text-text-primary mb-4"
            start="top 90%"
            end="top 60%"
          >
            My Learnings and Writings
          </ScrollRevealText>
          <ScrollRevealText
            as="p"
            className="text-lg text-text-tertiary max-w-2xl leading-relaxed"
            start="top 85%"
            end="top 55%"
          >
            Thoughts on software development, design patterns, and the craft of building things that work well.
          </ScrollRevealText>
        </header>

        {/* Posts List */}
        <section className="space-y-1">
          {posts.map((post) => (
            <article key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-6 -mx-4 px-4 rounded-xl hover:bg-hover-tint transition-colors duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-text-primary group-hover:text-text-secondary transition-colors duration-200 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-text-tertiary leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-text-muted shrink-0 md:text-right">
                    <span>{post.readingTime}</span>
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-bg-badge text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </section>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted">No posts yet. Check back soon.</p>
          </div>
        )}

      </div>
    </main>
  )
}
