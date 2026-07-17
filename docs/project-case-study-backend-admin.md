# Project Case Study Backend and Admin Requirements

This document describes the backend and admin work needed to replace the current static fallback case-study content with managed project data.

The frontend already supports:

- `GET /api/projects` as the public project source.
- Project detail routes at `/projects/[id]`.
- Optional `Project.caseStudySections` data.
- Fallback content when case-study sections are missing.
- Scroll navigation generated from the sections rendered on the page.

## 1. Backend data model

Extend the existing `projects` record with a one-to-one `project_case_studies` record, or store the equivalent JSON object on the project record if the backend already uses JSON columns.

Recommended relational shape:

### `projects`

Keep the existing fields and ensure the public API exposes:

```text
id              string, stable identifier/slug
title           string, required
shortDescription string, required
longDescription  string|null
repoUrl          string|null
liveUrl          string|null
npmUrl           string|null
docsUrl          string|null
youtubeUrl       string|null
videoUrl         string|null
thumbnailUrl     string|null
techStack        string[]
featured         boolean
isPublished      boolean
orderIndex       integer
completedDate    date|null
status           completed | in-progress | maintained
createdAt        timestamp
updatedAt        timestamp
```

The existing frontend transformer currently defaults API project status to `completed`; add `status` to the backend response so the admin value is preserved.

### `project_case_studies`

```text
id              string/uuid, primary key
projectId       string, unique foreign key to projects.id
overview        text|null
problem         text|null
architectureSummary text|null
architectureMermaid text|null
createdAt       timestamp
updatedAt       timestamp
```

### `project_case_study_challenges`

```text
id              string/uuid, primary key
caseStudyId     string, foreign key
title           string, required
description     text, required
orderIndex      integer, required
```

### `project_case_study_learnings`

```text
id              string/uuid, primary key
caseStudyId     string, foreign key
content         text, required
orderIndex      integer, required
```

### `project_case_study_next_steps`

```text
id              string/uuid, primary key
caseStudyId     string, foreign key
content         text, required
orderIndex      integer, required
```

### `project_case_study_metrics`

```text
id              string/uuid, primary key
caseStudyId     string, foreign key
label           string, required
value           string, required
orderIndex      integer, required
```

### `project_case_study_images`

```text
id              string/uuid, primary key
caseStudyId     string, foreign key
src             string, required
alt             string, required
caption         text|null
orderIndex      integer, required
```

Use cascading deletes from the case study to its child rows. Preserve `orderIndex` on every repeatable section so the admin order is reflected on the public page.

## 2. Public API contract

### `GET /api/projects`

Return only published projects, ordered by `orderIndex ASC`, then `updatedAt DESC`.

The response should include the project’s case-study data in the same payload to avoid one request per project card or detail page:

```json
[
  {
    "id": "react-wheel-picker",
    "title": "React Wheel Picker",
    "shortDescription": "iOS-like wheel picker for React...",
    "longDescription": "Natural touch scrolling...",
    "repoUrl": "https://github.com/...",
    "liveUrl": "https://...",
    "npmUrl": "https://npmjs.com/package/...",
    "docsUrl": null,
    "youtubeUrl": null,
    "videoUrl": null,
    "thumbnailUrl": "/images/projects/wheel-picker.png",
    "techStack": ["React", "TypeScript"],
    "featured": true,
    "isPublished": true,
    "orderIndex": 1,
    "completedDate": null,
    "status": "maintained",
    "caseStudySections": {
      "overview": "...",
      "problem": "...",
      "architecture": {
        "summary": "...",
        "mermaid": "flowchart LR..."
      },
      "challenges": [
        { "title": "...", "description": "..." }
      ],
      "learnings": ["..."],
      "nextSteps": ["..."],
      "metrics": [
        { "label": "Downloads", "value": "..." }
      ],
      "images": [
        { "src": "...", "alt": "...", "caption": "..." }
      ]
    },
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z"
  }
]
```

### Optional `GET /api/projects/:id`

Add a detail endpoint if the backend wants to avoid returning full case-study content in the listing response. It should return the same project shape, including `caseStudySections`, and return `404` for missing or unpublished projects.

If this endpoint is added, the Next.js server data layer should use it for `/projects/[id]` while continuing to use `GET /api/projects` for the index.

## 3. Validation and security

Backend validation should enforce:

- `id` is URL-safe and immutable after publication, or provide a redirect strategy when changed.
- `title`, `shortDescription`, and `techStack` are present for published projects.
- `orderIndex` is a non-negative integer.
- `status` is one of `completed`, `in-progress`, or `maintained`.
- Image `src` and external URLs use an approved scheme (`https`, or approved local asset paths).
- Mermaid content is size-limited and sanitized/validated before storage.
- Published project reads never expose draft records.
- Admin mutations require authentication and an admin/editor role.
- Admin write endpoints validate ownership/permissions and record `updatedAt`.

## 4. Admin page requirements

Add a project editor at a route such as `/admin/projects` with:

### Project basics

- Create, edit, duplicate, publish, unpublish, and delete projects.
- Edit title, slug/id, descriptions, dates, status, featured flag, order, tags, thumbnail, video, repository, live, npm, and docs links.
- Preview the public `/projects/[id]` page before publishing.
- Warn before changing an existing published id/slug.

### Case-study sections

Use a form with independent optional sections:

- Overview: multiline rich text or Markdown.
- Problem: multiline rich text or Markdown.
- Architecture: summary plus Mermaid source with a preview and syntax error state.
- Challenges: repeatable title/description rows with drag-and-drop or up/down ordering.
- Learnings: repeatable ordered text rows.
- Next Steps: repeatable ordered text rows.
- Metrics: repeatable label/value rows.
- Gallery: image upload or URL, required alt text, optional caption, and ordering.

The editor must allow a section to be empty. Empty values are intentional and should cause the frontend fallback to remain active until content is published.

### Publishing behavior

- Save draft without changing the public page.
- Publish all validated project and case-study fields atomically.
- Unpublish removes the project from public list and detail responses.
- Show last updated timestamp and editor identity.
- Provide a revision or audit trail if the backend already supports content history.

## 5. Backend admin endpoints

Recommended endpoints:

```text
GET    /api/admin/projects
POST   /api/admin/projects
GET    /api/admin/projects/:id
PATCH  /api/admin/projects/:id
DELETE /api/admin/projects/:id
POST   /api/admin/projects/:id/publish
POST   /api/admin/projects/:id/unpublish
PATCH  /api/admin/projects/:id/case-study
```

For repeatable child content, either accept the complete ordered `caseStudySections` object in one transaction or expose nested endpoints. The complete-object approach is simpler for the admin form and avoids partially reordered content.

Admin mutation responses should return the fully normalized project object so the admin preview can update without a second fetch.

## 6. Frontend follow-up after backend availability

Update these frontend areas when the backend contract is ready:

1. Add the new fields to `src/lib/api/types.ts`.
2. Update `transformProject` in `src/lib/api/transformers.ts` to map API `caseStudySections`, links, status, and images into `Project`.
3. If using `GET /api/projects/:id`, add a client method and server helper, then use it in `src/app/projects/[id]/page.tsx`.
4. Keep `src/data/project-case-study.ts` as the fallback adapter for missing fields, unless the backend guarantees complete published case studies.
5. Remove or reduce static fallback text only after the admin workflow can create and publish equivalent content.
6. Add cache invalidation/revalidation after publish and unpublish so the public case-study page updates promptly.

## 7. Acceptance checklist

- A published project appears on `/projects` in admin-defined order.
- Clicking a project opens `/projects/[id]`; no expanded drawer is required.
- An unpublished project is absent from the public index and returns `404` at its detail route.
- A project with no case-study content still renders readable fallback sections.
- Admin-created overview, architecture, challenges, learnings, next steps, metrics, and gallery content appears in the matching section.
- Reordering repeatable content in admin changes its public order.
- Invalid Mermaid, missing alt text, invalid URLs, and unauthorized mutations are rejected.
- Publishing and unpublishing invalidate the public project cache.
