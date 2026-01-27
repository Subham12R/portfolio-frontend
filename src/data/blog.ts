// Blog posts data

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "developing-taste",
    slug: "developing-taste",
    title: "Developing Taste as a Developer",
    excerpt:
      "Taste in software engineering is the ability to recognize quality—in code, design, and user experience. Here's how I've been developing mine.",
    publishedAt: "2026-01-15",
    readingTime: "5 min read",
    tags: ["Design", "Career", "Thoughts"],
    featured: true,
  },
  {
    id: "building-wheel-picker",
    slug: "building-wheel-picker",
    title: "Building a Wheel Picker Component",
    excerpt:
      "A deep dive into creating an iOS-style wheel picker for React with smooth inertia scrolling and infinite loop support.",
    publishedAt: "2025-12-20",
    readingTime: "8 min read",
    tags: ["React", "TypeScript", "Open Source"],
    featured: true,
  },
  {
    id: "clean-architecture-frontend",
    slug: "clean-architecture-frontend",
    title: "Clean Architecture in Frontend Applications",
    excerpt:
      "How to structure your React applications for maintainability, testability, and scalability using clean architecture principles.",
    publishedAt: "2025-11-10",
    readingTime: "10 min read",
    tags: ["Architecture", "React", "Best Practices"],
    featured: false,
  },
  {
    id: "typescript-patterns",
    slug: "typescript-patterns",
    title: "TypeScript Patterns I Use Every Day",
    excerpt:
      "A collection of TypeScript patterns and utilities that have become essential in my daily development workflow.",
    publishedAt: "2025-10-05",
    readingTime: "6 min read",
    tags: ["TypeScript", "Patterns", "Tips"],
    featured: false,
  },
];

// Helper to get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

// Helper to get posts sorted by date
export function getPostsSorted(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// Helper to get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper to get all unique tags
export function getAllBlogTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
