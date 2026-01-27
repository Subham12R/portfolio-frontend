# Subham Karmakar — Portfolio

A modern, animated portfolio website built with **Next.js 16**, **React 19**, and **TypeScript**. Features smooth scroll-driven animations, dark/light theming, and a clean component architecture.

## Overview

This is a personal portfolio showcasing my work, skills, and experience as a full-stack developer. It includes dedicated sections for projects, work experience, certifications, a blog, and a contact page with calendar scheduling.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP + ScrollTrigger, Framer Motion
- **Smooth Scroll:** Lenis
- **Theming:** next-themes (light/dark)
- **UI:** shadcn/ui, Radix UI, Lucide icons
- **Analytics:** Vercel Analytics

## Sections

| Section        | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| Hero           | Profile intro with rotating titles, socials, GitHub calendar |
| Experience     | Work history with roles, responsibilities, and tech badges   |
| Projects       | Featured project cards with expand animations and mockups    |
| Skills         | Bento grid of tech across Frontend, Backend, DevOps & more   |
| About          | Bio and external links                                       |
| Certificates   | Certifications with issuer, dates, and credential links      |
| Contact        | CTA with Cal.com scheduling integration                      |
| Blog           | Static blog with slug-based routing and tags                 |

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Build for production
npm run build
```

The app runs at `http://localhost:3000` by default.

## Project Structure

```
src/
├── app/            # Next.js routes (home, blog, projects)
├── components/     # Reusable UI, layout, and animation components
├── sections/       # Page sections (hero, projects, skills, etc.)
├── data/           # Static content & site configuration
├── lib/            # API clients, utilities, helpers
└── hooks/          # Custom React hooks
```

## License

This project is for personal use.
