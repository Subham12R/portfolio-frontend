# API Integration

This module provides utilities for fetching data from the Portfolio Backend API.

## Setup

1. Create `.env.local` with your backend URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

2. For production, use the deployed backend URL:
   ```env
   NEXT_PUBLIC_API_URL=https://portfolio-backend-zg4a.onrender.com
   ```

## Usage

### Server Components (Recommended)

Use the server-side fetch functions in Server Components for optimal performance:

```tsx
// app/page.tsx (Server Component)
import { fetchProjects, fetchWorkExperiences } from "@/lib/api";

export default async function HomePage() {
  const [projects, experiences] = await Promise.all([
    fetchProjects(),
    fetchWorkExperiences(),
  ]);

  return (
    <main>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </main>
  );
}
```

### Client Components

Use hooks for client-side data fetching when needed:

```tsx
"use client";

import { useProjects, transformProjects } from "@/lib/api";

export function ProjectList() {
  const { data: apiProjects, isLoading, error } = useProjects();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  const projects = transformProjects(apiProjects);

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.title}</li>
      ))}
    </ul>
  );
}
```

## API Endpoints

The backend provides these public endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/projects` | GET | Get all published projects |
| `/api/work-experiences` | GET | Get all published work experiences |
| `/api/certificates` | GET | Get all published certificates |
| `/api/skills` | GET | Get all skills |
| `/api/highlights` | GET | Get all published highlights |

## Data Flow

```
Backend API → API Types → Transformers → Frontend Types → Components
```

1. **API Types** (`types.ts`): Match the backend database schema
2. **Transformers** (`transformers.ts`): Convert API responses to frontend data types
3. **Frontend Types** (`@/data/*`): Types used by components

## Fallback Behavior

Server-side fetch functions automatically fall back to static data (`@/data/*`) if the API is unavailable. This ensures the site works even when the backend is down.

## Files

| File | Purpose |
|------|---------|
| `types.ts` | API response type definitions |
| `client.ts` | Core fetch functions |
| `hooks.ts` | React hooks for client components |
| `transformers.ts` | Convert API data to frontend types |
| `server.ts` | Server-side fetch utilities |
| `index.ts` | Module exports |
