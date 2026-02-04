'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/data/blog'

interface BlogCardProps {
  post: BlogPost
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogCard({ post }: BlogCardProps) {
  const maxVisibleTags = 3
  const visibleTags = post.tags.slice(0, maxVisibleTags)
  const remainingCount = post.tags.length - maxVisibleTags

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full rounded-2xl border border-border-primary bg-bg-elevated/50 overflow-hidden hover:border-border-secondary transition-colors duration-200">
        {/* Cover Image */}
        <div className="relative aspect-[16/10] bg-bg-card overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              <span className="text-4xl font-bold opacity-20">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-xl font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-text-secondary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border border-border-primary text-text-secondary"
              >
                {tag}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="text-xs px-3 py-1.5 rounded-full border border-border-primary text-text-muted">
                +{remainingCount} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border-primary">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Calendar size={14} />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <span className="flex items-center gap-2 text-text-secondary text-sm font-medium group-hover:text-text-primary transition-colors">
              Read More
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
