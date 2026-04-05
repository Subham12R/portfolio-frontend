// Blog posts data

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
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
    coverImage: "/images/blog/blog1.jpg",
    publishedAt: "2026-01-30",
    readingTime: "7 min read",
    tags: ["Internship", "Debugging", "Career", "Best Practices"],
    featured: true,
    content: `My first week at the internship, I opened the codebase and immediately found a function that looked... wrong. There was this huge nested conditional that seemed like it could be flattened to three lines. I was excited. I thought: *this is how I'll show I'm useful.*

I refactored it. Clean, readable, elegant. Pushed it to a branch and shared it with my mentor.

He looked at it, was quiet for a moment, then said — *"That conditional was handling a timezone edge case that only shows up in certain regions. We spent two days tracking that bug down six months ago."*

I had no idea. The code looked ugly, but it was carrying a scar.

That was the moment I understood something I hadn't been taught in any course: **a real codebase isn't just code. It's accumulated decisions, past failures, and constraints you weren't there to witness.**

---

## Reading Code Like an Archaeologist

After that, I completely changed how I approached the codebase. I stopped trying to fix things and started trying to *understand* things first.

I'd open a file and instead of asking "can this be improved?" I'd ask "why does this exist?" I started tracing where data came from, where it ended up, what triggered what. The folder structure, the entry points, how services talked to each other — I treated all of it like a map I was trying to learn before going anywhere.

It sounds slow. But it actually made everything faster. Because once you understand the territory, you stop making wrong turns.

---

## Debugging Changed How I Think

The real shift came when I stopped seeing bugs as interruptions and started seeing them as *invitations*.

Every bug I was given was basically the codebase saying: here's something you don't understand yet. And debugging it properly — actually reproducing it, watching values change, following the network calls, tracing state step by step — taught me more about the system than reading docs ever could.

There's a huge difference between reading code and watching code run. I used to think I understood a function because I could read it. Then I'd set a breakpoint and realize the values flowing through it were nothing like what I expected.

Debugging killed my assumptions. And that was exactly what I needed.

---

## The Rule I Now Live By

Somewhere around week four, my mentor told me something I've repeated to myself ever since:

*"If you can't debug it, you're not ready to refactor it."*

It sounds simple. But it's a high bar. It means you need to be able to explain the flow, predict how changes will ripple through the system, and know what failure looks like. Until you can do that — you're just guessing.

Once I hit that threshold on a part of the codebase, my changes got smaller and safer. I stopped rewriting things and started making one careful change at a time, watching what happened, then moving on.

---

## Asking Instead of Assuming

The other thing the internship taught me: ask more questions.

Not "I think this is wrong" — but "is there a reason this works this way?" Most of the time the answer was yes, and the reason taught me something. Even when the answer was "no, that's actually a bug" — asking first meant I went in with context.

Junior developers tend to assume they see the full picture. The internship cured me of that fast.

---

I came in thinking I'd prove myself by writing impressive new code. I ended up learning that the most valuable thing I could do was deeply understand what already existed — read it carefully, debug it patiently, change it only when I was confident.

That's the thing nobody tells you about working in a real codebase: understanding it *is* the work.`,
  },
  {
    id: "are-you-out-of-ideas",
    slug: "are-you-out-of-ideas",
    title: "Are You Out of Ideas?",
    excerpt:
      "Running out of ideas isn't a creativity problem — it's usually a consumption problem. Here's how to refill your creative well and build a system that keeps ideas flowing.",
    coverImage: "/images/blog/blog2.jpg",
    publishedAt: "2026-02-01",
    readingTime: "6 min read",
    tags: ["Creativity", "Productivity", "Mindset"],
    featured: false,
    content: `There was a stretch of about three weeks where I sat down every evening to work on something — a side project, a blog post, anything — and just... stared. Nothing came. Every idea I had felt either too basic or too similar to something that already existed.

I started wondering if I'd peaked creatively. Which, looking back, is a bit dramatic. But at the time it felt real.

What eventually snapped me out of it wasn't some productivity trick or a motivation video. It was a random conversation with a friend who doesn't write code at all. She was describing a problem she had at work — something about how their team tracked client feedback — and halfway through listening, my brain just lit up. I had three ideas in the span of twenty minutes.

That's when I realized: **I hadn't run out of ideas. I'd run out of new inputs.**

---

## The Reservoir Problem

Here's how I think about it now. Creativity isn't a muscle you exercise in isolation. It's more like a reservoir — it fills up from what you take in, and empties out as you create. If you only drain it without refilling it, of course it runs dry.

And the tricky part is that *how* you refill it matters. Scrolling Twitter for two hours doesn't do it. Neither does watching YouTube videos in your field, ironically. Those things feel like input, but they're mostly noise — fast, shallow, forgettable.

What actually refills it? Conversations with people who think differently than you. Reading things outside your domain. Sitting with a problem long enough to actually get frustrated by it. Walking somewhere without your phone.

The ideas that have actually gone somewhere for me came from being bored, being confused, or being genuinely annoyed by something.

---

## The Myth of the Perfect Idea

I think part of why I got stuck was that I was waiting for a good idea before starting. As if there's a filter somewhere that only lets the worthy ones through.

But ideas don't arrive fully formed. They start as rough, half-baked hunches. The "good idea" is usually what the bad idea becomes after you actually build it, talk about it, and figure out what it's really about.

I have a note on my phone called "bad ideas" that I've been adding to for over a year. Most of them are genuinely bad. But every few weeks, I'll look at two of them together and suddenly they combine into something worth exploring.

The bar for capturing an idea should be basically zero. You're not committing to it. You're just catching it.

---

## What to Do When You're Still Stuck

If you've changed your inputs and you're still coming up empty — that's usually a sign to stop trying to create for a bit.

Not forever. Just for a day or two. Do something completely unrelated. Read a book that has nothing to do with your work. Go somewhere you've never been. Help someone with a problem that's nothing like yours.

The ideas that come after a genuine rest often surprise you. Your brain was working on things without telling you.

---

There's no permanent cure for creative blocks — they come back, and that's fine. But I've stopped seeing them as a sign that something's wrong with me. They're usually just a message: you've been outputting more than you've been taking in. Time to refill.

Start paying attention to what genuinely interests you when nothing's at stake. That's usually where the next idea is hiding.`,
  },
  {
    id: "how-to-grind-hard-in-specific-domain",
    slug: "how-to-grind-hard-in-specific-domain",
    title: "How to Grind Hard in a Specific Domain",
    excerpt:
      "Becoming great at something requires focused, intentional practice over time. Here's how to pick your domain, avoid distractions, and build real expertise.",
    coverImage: "/images/blog/blog3.jpg",
    publishedAt: "2026-02-02",
    readingTime: "7 min read",
    tags: ["Learning", "Career", "Productivity", "Growth"],
    featured: false,
    content: `I spent a solid year trying to learn everything at once.

Frontend, backend, DevOps, machine learning, mobile — I was bouncing between all of it. I had seventeen browser tabs open at any given time, each one a different tutorial for a different thing. I was always learning but never actually getting good at anything.

The turning point was embarrassing. A friend asked me to help them fix a bug in a React project and I fumbled it. Not because it was hard — it was a fairly standard state issue — but because I'd spread my attention so thin that I hadn't built the kind of pattern recognition you only get from going deep. I knew React *conceptually*. I didn't really *know* React.

That's when I made a decision that felt uncomfortable at the time: I was going to stop chasing everything and pick one thing to actually master.

---

## The Uncomfortable Part of Choosing

Picking a domain is harder than it sounds because choosing something means not choosing everything else. And when you're early in your career, that feels like closing doors.

But here's what I've come to believe: going deep in one area doesn't make you narrow. It gives you a home base. You still pick up other things — you just have somewhere to return to, a core that keeps getting stronger while everything else becomes supplementary.

For me, the choice came down to something simple: what did I actually enjoy doing when no one was watching? Not what looked impressive, not what was trending — what did I find myself doing at midnight because I genuinely wanted to?

Backend systems. The way data flows, gets stored, gets served. How things behave under load. How you design something that doesn't break when reality hits it. That was the thing.

---

## What Grinding Actually Looks Like

I want to be honest about this because I think the word "grind" gets romanticized in a way that doesn't help anyone.

It's not exciting. Most days are just showing up and doing something you're not great at yet. You build a project, it doesn't work right, you debug it, you look at how someone else solved the same problem, you rebuild it. Then you do that again with a harder problem.

The tutorial loop — where you follow along with something step by step and feel like you're learning — is comfortable but shallow. Real progress happens when you close the tutorial and try to build something on your own, and then get stuck, and then figure your way out. That friction is where the learning actually lives.

The other thing that helped me more than I expected: reading other people's code. Not following it as a guide, but actually trying to understand *why* someone made the choices they made. You start noticing patterns. You start developing opinions. Those opinions are evidence that you're actually getting somewhere.

---

## The Shiny Object Problem

I'll be honest — I still struggle with this. There's always a new framework, a new tool, a new thing everyone's suddenly talking about. And the anxiety is real: what if this is the thing that matters and I'm missing it?

But I've noticed something. Every time I've gone down one of those rabbit holes, I come back to my core work and it's exactly where I left it. The fundamentals didn't change. Whatever the new thing was, it either builds on what I already know or it turns out to be less revolutionary than the hype suggested.

New things are worth being aware of. They're not worth derailing your focus over.

---

## How You Know It's Working

The moment I knew the depth was paying off: I was looking at a tricky database query issue at my internship, and instead of having to look anything up, I just... knew what was happening. Not because I'd memorized it, but because I'd seen enough patterns in that domain to immediately recognize what was wrong.

That recognition — that's what deep work builds. You can't fake it, you can't shortcut it, and nobody can take it from you once you have it.

Pick your thing. Actually commit to it. Let the rest wait.`,
  },
  {
    id: "backend-to-production-concepts",
    slug: "backend-to-production-concepts",
    title: "Important Concepts to Remember When Setting Up a Backend to Production",
    excerpt:
      "Moving from development to production is where things get real. Here's a practical checklist of concepts every developer should consider before deploying their backend.",
    coverImage: "/images/blog/blog4.jpg",
    publishedAt: "2026-02-03",
    readingTime: "8 min read",
    tags: ["Backend", "DevOps", "Best Practices", "Production"],
    featured: true,
    content: `The first time I deployed a backend to production, it worked. For about four hours.

Then something broke. I didn't know what. I had no logs worth reading, no monitoring in place, and no idea where to even start. I ended up SSH-ing into the server and grepping through raw output trying to figure out what had gone wrong.

It was a database connection issue — something that would have taken five minutes to diagnose if I'd had proper logging. Instead it took most of the night.

That experience taught me more about production readiness than any course ever did. Not because the problem was complicated, but because I was completely unprepared to operate the thing I'd built. There's a huge gap between code that works on your machine and a system that's safe to run in the real world — and I want to write about what fills that gap.

---

## Secrets Don't Belong in Your Code

This sounds obvious until you see how easy it is to slip up. Database URLs, API keys, JWT secrets — if they're hardcoded or sitting in a .env file you forgot to add to .gitignore, you have a problem waiting to happen.

The rule I follow: anything sensitive lives in environment variables at minimum, a proper secrets manager for anything critical. Different values per environment — what works in dev should never be the same credential that runs in production. And secrets get rotated, not kept forever because it's convenient.

I learned this one before anything went wrong, thankfully. But I've seen repos with credentials in commit history and it's a bad situation to clean up.

---

## You Can't Debug What You Can't See

After my first deployment disaster, logging became something I took seriously. Not \`console.log("here")\` scattered around — structured logs with context. What request triggered it, what user, what time, what the state of things was when it failed.

In development you can stare at your screen and watch things happen. In production you're not there. The logs are your eyes. If they're empty or unstructured, you're blind.

Beyond logging: monitoring. I want to know when error rates spike, when response times climb, when memory starts climbing toward a ceiling — before a user tells me something's wrong. Setting up alerts isn't glamorous work, but the first time one wakes you up before a small problem becomes a big one, you understand why it matters.

---

## Errors Should Be Boring on the Outside

When something breaks in production, your users should see a clean, generic error message. "Something went wrong. Please try again." That's it.

The full stack trace, the internal state, the database error — that all goes to your logs. Never to the response. Leaking error details is both a security risk and a trust problem. Users don't need to know which ORM you're using or what query failed.

At the same time, global error handlers matter. Unhandled exceptions that silently crash your server and leave no trace are the worst kind of production failure to deal with.

---

## Your Database Has More Opinions Than You Think

Locally, you probably have one connection to the database and row counts in the hundreds. Production is different.

Opening a new database connection on every request is a classic mistake — connection pooling exists for a reason. Queries that run in milliseconds against test data can crawl when tables have millions of rows; adding indexes to frequently queried columns isn't optional, it's just delayed pain. Migrations need to be tested on a staging environment that mirrors production before they go anywhere near real data. And backups need to actually be tested — a backup you've never restored from is a backup you don't really have.

---

## Security is a Default, Not a Feature

I don't think about security as a thing you bolt on at the end. HTTPS everywhere, input validation on every endpoint, parameterized queries so SQL injection isn't a possibility, proper auth using established libraries rather than something I rolled myself — these are just how the backend gets built.

The things that catch people are usually the ones that feel small: missing rate limiting (so someone can hammer your auth endpoint indefinitely), missing security headers, trusting user input somewhere deep in the stack because it was validated somewhere else and someone assumed.

A simple mental model I use: treat every piece of input as hostile until proven otherwise.

---

## Your Infrastructure Needs to Know When You're Healthy

If you're running behind a load balancer or in a container orchestration setup, the infrastructure needs a way to check whether your app is actually ready to serve traffic — not just "is the process running" but "can it connect to the database, can it reach its dependencies?"

Health check endpoints are small to implement and they make a real difference. They let the platform route traffic correctly, restart unhealthy instances, and handle deploys without dropping requests.

---

## Deploying Without Drama

The goal is zero-downtime deployments with a clear rollback path. Whether you're doing blue-green, canary, or rolling — the thing that matters is that you can get back to a working state quickly if the new version has a problem.

Deploying manually by SSHing into a server and running commands is how you introduce human error at 2am. Automating your deployment pipeline isn't about being fancy, it's about making the scary part routine and repeatable.

---

The checklist version of this exists everywhere. What I actually want you to take away is this: production is a different discipline than development. The code is the easy part. What keeps a backend running reliably — observable, secure, recoverable — is a separate set of concerns that you have to think about intentionally.

Build it like someone else is going to be on call for it at 3am. Someday that person might be you.`,
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
