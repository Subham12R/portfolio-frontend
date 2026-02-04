'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ScrollRevealText } from '@/components/ui/ScrollRevealText'
import { BlogCard } from './BlogCard'
import type { BlogPost } from '@/data/blog'

interface BlogPageContentProps {
  posts: BlogPost[]
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
        <header className="mb-12">
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
            className="text-lg text-text-tertiary max-w-4xl leading-relaxed"
            start="top 85%"
            end="top 55%"
          >
            Thoughts on software development, design patterns, and the craft of building things that work well.
          </ScrollRevealText>
        </header>

        {/* Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
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
