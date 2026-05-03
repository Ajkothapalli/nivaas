# Nivaas — Architecture

This document is the authoritative architectural reference. All PRs should be reviewed against it.

The full project brief is in `CLAUDE.md`. This document focuses on structural decisions and their rationale.

## Route structure

```
app/
├── (marketing)/   — Public site. No auth. Server components by default.
├── (app)/         — Empty shell. Future: authenticated tenant/owner portal.
├── api/           — API routes. POST only for forms.
└── layout.tsx     — Root layout with fonts and analytics.
```

Route groups (`(marketing)`, `(app)`) share nothing by default. Each has its own `layout.tsx`. This allows the app portal to add auth middleware without touching the marketing site.

## Data layer

```
components / pages
       ↓
lib/repositories/    ← only place that knows where data comes from
       ↓
data/*.json (M0)  OR  Supabase (M2+)
```

Repository functions are `async` even when reading JSON. This means the swap to Supabase is a body change only — callers are untouched.

Zod schemas in `lib/validation/` are the single source of truth. TypeScript types are always `z.infer<typeof Schema>`. The build fails if JSON data violates a schema.

## Feature flag: NEXT_PUBLIC_USE_DB

When `false` (default): repositories read from `data/*.json`.
When `true`: repositories use Supabase queries via `lib/db/supabase.ts`.

The flag scaffold exists now. The Supabase query paths are stubs — implement them at M2-3.

## API routes

`/api/inquiries` and `/api/owner-leads` are the only two active routes at M0.

Both:
- Accept POST only
- Validate with Zod
- Include a honeypot field for bot protection
- Apply a simple in-memory IP-based rate limiter (5 req / 10 min)
- Write to Supabase when `NEXT_PUBLIC_USE_DB=true`
- Forward to Web3Forms regardless of DB flag

Future webhook routes live under `app/api/webhooks/`.

## SEO strategy

- `app/sitemap.ts` generates dynamically from properties + localities + static pages
- `app/robots.ts` allows crawling only in production (`VERCEL_ENV=production`)
- Every page exports `metadata` with title + description + canonical URL
- JSON-LD on `/` (Organization) and `/homes/[slug]` (RealEstateListing)
- OpenGraph image generated via `app/opengraph-image.tsx` using `@vercel/og`

## Supabase schema decisions

The full target schema is applied at M0 (see `supabase/migrations/0001_initial_schema.sql`). Tables for M6+ (`subleases`, `payments`, etc.) exist as empty scaffolding. This avoids a painful migration cascade later.

RLS is enabled on all tables from day one. The marketing site writes to `inquiries` and `owner_leads` via service role key in API routes. Public read policies exist on `properties` and `units` for the eventual DB swap.

## Performance constraints

- Server components by default. Client components only for interactive UI.
- `next/image` for all images with `sizes` prop
- Hero images: `priority` prop
- Fonts via `next/font/google` with `display: swap`
- Target: LCP < 2.0s, CLS < 0.05, JS bundle < 100KB gzipped
