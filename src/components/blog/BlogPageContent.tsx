"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { AnimatedBlogGrid } from "./AnimatedBlogGrid";
import { MediumBlogCard } from "./MediumBlogCard";
import type { BlogPost, MediumPost } from "@/data/blog";

interface BlogPageContentProps {
  posts: BlogPost[];
  mediumPosts?: MediumPost[];
}

export function BlogPageContent({ posts, mediumPosts }: BlogPageContentProps) {
  const [hoveredMediumId, setHoveredMediumId] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-2xl mx-auto px-4 lg:px-0 py-16">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200 mb-12"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back to home</span>
        </Link>

        {/* Header */}
        <header id="blog-intro" className="mb-12 scroll-mt-24">
          <ScrollRevealText
            as="h1"
            className="text-4xl font-light text-text-primary mb-4 font-instrumentserif"
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
            Thoughts on software development, design patterns, and the craft of
            building things that work well.
          </ScrollRevealText>
        </header>

        {/* Posts Grid */}
        {posts.length > 0 && (
          <div id="blog-posts" className="scroll-mt-24">
            <AnimatedBlogGrid posts={posts} />
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted">No posts yet. Check back soon.</p>
          </div>
        )}

        {/* Featured on Medium */}
        {mediumPosts && mediumPosts.length > 0 && (
          <div id="blog-medium" className="mt-16 scroll-mt-24">
            <h2 className="text-lg font-medium text-text-secondary mb-4">
              Featured on Medium
            </h2>
            <div className="flex flex-col gap-3">
              {mediumPosts.map((post) => (
                <MediumBlogCard
                  key={post.id}
                  post={post}
                  isBlurred={hoveredMediumId !== null && hoveredMediumId !== post.id}
                  onHoverChange={(h) => setHoveredMediumId(h ? post.id : null)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
