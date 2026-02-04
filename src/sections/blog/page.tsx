import Link from 'next/link'
import { siteConfig } from '@/data'
import { BlogCard } from '@/components/blog/BlogCard'
import { getPostsSorted } from '@/data/blog'

const BlogSection = () => {
  const section = siteConfig.sections.blog
  const posts = getPostsSorted().slice(0, 4) // Show max 4 posts

  if (posts.length === 0) return null

  return (
    <section id={section.id} className="w-full flex justify-center items-center pb-20 px-4 lg:px-0">
      <div className="max-w-4xl w-full flex flex-col h-full">

        {/* HEADER */}
        <div className="flex justify-start items-start pt-16 pb-5 border-b border-border-accent space-y-2 mb-12">
          <span className="text-start text-text-secondary text-xl font-mono leading-tight">
            {section.number}
          </span>
          <h1 className="text-4xl font-semibold text-text-primary text-start">{section.title}.</h1>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 flex items-center justify-center">
          <Link
            href="/blog"
            className="text-text-secondary rounded-3xl border border-border-secondary hover:bg-hover-tint hover:border-border-accent px-6 py-2.5 transition-all duration-200"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
