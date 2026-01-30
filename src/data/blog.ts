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
    id: "internship-debugging-lessons",
    slug: "internship-debugging-lessons",
    title: "What My Internship Taught Me About Understanding and Debugging a Codebase Before Touching It",
    excerpt:
      "In a real-world codebase, understanding and debugging matter far more than writing new code. This internship completely changed how I approach existing systems.",
    publishedAt: "2026-01-30",
    readingTime: "7 min read",
    tags: ["Internship", "Debugging", "Career", "Best Practices"],
    featured: true,
    content: `When I started my internship, I thought the fastest way to prove my value was to start fixing and refactoring code immediately. I knew the tech stack, I could spot patterns that looked inefficient, and I was eager to improve things.

What I didn't realize back then was this:

**In a real-world codebase, understanding and debugging matter far more than writing new code.**

This internship completely changed how I approach existing systems — especially how I read, trace, and debug code before making changes.

## The First Big Reality Check: Don't Refactor What You Don't Understand

An existing codebase is not just code — it's history.

- Business requirements
- Time constraints
- Past bugs and fixes
- Trade-offs made under pressure

Early on, I learned that refactoring without context is risky. What looks unnecessary or poorly written might be solving an edge case you haven't discovered yet.

That's when I learned to pause — and observe.

## Step 1: Read the Codebase Like a Map, Not a File List

Instead of jumping straight into components or functions, I started by understanding:

- The overall folder structure
- Entry points of the application
- How configuration, services, and utilities are organized

I treated the codebase like a map:

- Where does the app start?
- Where does data come from?
- Where does it end up?

This gave me orientation before depth.

## Step 2: Follow the Flow, Not Just the Syntax

One of the most important shifts was learning to trace execution flow instead of reading files in isolation.

I focused on flows like:

- User action → event handler → state update → API call → response
- Page load → data fetching → rendering → side effects

Once I understood the journey of data, the code stopped feeling random. Every function had a reason to exist.

## Step 3: Debugging Taught Me How the System Really Works

Debugging was where real learning happened.

Instead of seeing bugs as blockers, I started seeing them as entry points into the system.

Through debugging, I learned to:

- Reproduce issues consistently before touching the code
- Add logs and breakpoints to observe behavior
- Narrow down problems instead of guessing causes
- Understand how different parts of the app interact under real conditions

Debugging forced me to understand what the code is actually doing, not what I think it's doing.

## Step 4: Stop Guessing — Observe First

One of the biggest mistakes I used to make was assuming I knew the bug by just reading the code.

During my internship, I learned to:

- Let the app run
- Watch values change
- Inspect network requests
- Trace state updates step by step

This habit reduced trial-and-error coding and made my fixes far more accurate.

## Step 5: Refactor Only After You Can Debug It Confidently

A key lesson I picked up was this:

**If you can't debug a piece of code, you're not ready to refactor it.**

Once I could confidently:

- Explain the flow
- Predict side effects
- Debug failures

Only then did refactoring make sense.

My refactors became:

- Smaller
- Safer
- More intentional

Instead of rewriting large sections, I focused on incremental improvements with zero behavior change.

## Step 6: Ask Questions, Not Assumptions

Another underrated skill I developed was learning when to ask instead of assume.

Rather than saying:

*"This looks wrong"*

I learned to ask:

*"Is this handling a specific case I'm missing?"*

Most of the time, the answer taught me something new about the system.

## What This Internship Changed About My Approach

After this experience, my workflow with any new codebase looks very different:

- I read before I write
- I trace flows before changing logic
- I debug before refactoring
- I prioritize correctness and safety over speed

Most importantly, I realized that debugging is not a weakness — it's a core engineering skill.

## Final Thought

This internship taught me that real development isn't about writing the cleanest code on day one.

It's about:

- Understanding deeply
- Debugging patiently
- Changing carefully

Knowing how to understand and debug a codebase before touching it is what turns a developer into someone a team can rely on.`,
  }
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
