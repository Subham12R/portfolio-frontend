# Missing Tech Logos

## Still missing (need logo files)

| Tech Name (from API) | Suggested filename | Notes |
|---|---|---|
| Mermaid JS | `mermaidjs.png` | Diagram/charting library |
| Tip Tap | `tiptap.png` | Rich text editor |

## Recently added and registered

These logos have been added to `public/icons/` and registered in `src/data/tech-icons.ts`:

| Tech Name | Icon file |
|---|---|
| Better-Auth | `better-auth.png` |
| PostgreSQL | `postgresql.png` |
| React Router | `reactrouter.svg` |
| Redux | `redux.png` |
| Vite | `vite.svg` |
| Zod | `zod.png` |

## Auto-matched (no action needed)

These come from the API in non-standard casing but are resolved by normalized fallback matching:

| API value | Matches to |
|---|---|
| `Javascript` | JavaScript (`/icons/js.png`) |
| `NodeJS` | Node.js (`/icons/nodejs.png`) |
| `NextJS` | Next.js (`/icons/nextjs.jpeg`) |
| `TailwindCSS` | Tailwind CSS (`/icons/tailwindcss.jpeg`) |
| `Tailwindcss` | Tailwind CSS (`/icons/tailwindcss.jpeg`) |

## How to add a new logo

1. Place the icon file in `public/icons/` (recommended: square, ~200x200px)
2. Add an entry in `src/data/tech-icons.ts` under `techIcons`:
   ```ts
   "Mermaid JS": "/icons/mermaidjs.png",
   ```
   The normalized fallback will automatically handle casing variants like `"mermaidjs"`, `"MermaidJS"`, etc.
