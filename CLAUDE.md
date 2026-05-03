# Nivaas — Claude Code Context

## What this is

Nivaas is a managed rental property platform for Hyderabad, India. M0 (now) ships as a marketing website backed by JSON data. The same codebase grows into a full app over 18 months: tenant accounts (M6), online rent payments (M12), owner dashboard (M18).

The repo is designed for that trajectory. Architecture decisions made today must not block future milestones.

---

## Stack (non-negotiable)

- **Framework:** Next.js 14+, App Router, TypeScript strict mode
- **Styling:** Tailwind CSS only. No CSS modules, styled-components, or inline styles
- **Package manager:** pnpm
- **Validation:** Zod everywhere. TypeScript types are always `z.infer<typeof Schema>`
- **Forms:** Web3Forms for lead capture
- **DB:** Supabase (Postgres + Auth + Storage) — configured but not used at M0
- **Analytics:** PostHog
- **Hosting:** Vercel

**Do not introduce:** tRPC, GraphQL, Redux, Zustand, React Query, shadcn, Storybook, Turborepo.

---

## Brand voice

Warm, plain English. Confident, never salesy. Indian English spellings (organisation, colour).

**Banned words:** unlock, leverage, seamless, revolutionary, hassle-free, best-in-class, cutting-edge, world-class, guaranteed returns

**Banned punctuation:** exclamation marks (allowed only inside CTA buttons, max one per page)

**Numbers:** always figures with ₹ symbol (₹25,000 not "twenty-five thousand")

**Case:** Title case for H1/H2. Sentence case for H3 and below.

**Emoji:** Never in body copy. Only in WhatsApp prefilled messages.

---

## Design tokens (Tailwind)

| Token | Value |
|---|---|
| `bg` | `#FAFAF7` — page background |
| `surface` | `#FFFFFF` — card backgrounds |
| `ink` | `#1A1A1A` — primary text |
| `ink-muted` | `#5C5C5C` — secondary text |
| `accent` | `#2D4A3E` — brand green |
| `accent-hover` | `#243C32` |
| `border` | `#E8E6DF` |
| `error` | `#B23A3A` |

**Fonts:** Fraunces (headings, `--font-fraunces`), Inter (body, `--font-inter`)

**Radius:** Cards → `rounded-2xl`, Buttons → `rounded-xl`, Inputs → `rounded-lg`

**Section spacing:** `py-20 md:py-28`. Container: `max-w-7xl`

Never hardcode hex values. Always use Tailwind tokens.

---

## Data shapes (Zod schemas)

### Property
```typescript
PropertySchema = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(10).max(120),
  locality: z.enum(['gachibowli', 'madhapur', 'kondapur', 'hitec-city',
                    'financial-district', 'kokapet', 'narsingi']),
  address_line: z.string(),
  lat: z.number(),
  lng: z.number(),
  bhk: z.number().int().min(1).max(6),
  area_sqft: z.number().int().positive(),
  rent_monthly: z.number().int().positive(),
  deposit: z.number().int().nonnegative(),
  furnishing: z.enum(['fully_furnished', 'semi_furnished', 'unfurnished']),
  available_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  amenities: z.array(z.string()).min(1),
  description: z.string().min(80).max(800),
  images: z.array(z.string()).min(4).max(10),
  status: z.enum(['available', 'reserved', 'rented', 'draft']),
})
```

Full schemas in `lib/validation/`.

---

## Architecture — the swap point

Pages and components **never** read JSON files or query Supabase. They call repository functions in `lib/repositories/`.

Today: repositories read validated JSON. At M2-3: same function signatures, body switches to Supabase. Zero callers change.

```
page.tsx → lib/repositories/properties.ts → data/properties.json (today)
                                           → Supabase (M2-3)
```

When `NEXT_PUBLIC_USE_DB=true`, repositories should switch to Supabase. Build the flag scaffold now.

---

## Page inventory

| Route | File |
|---|---|
| `/` | `app/(marketing)/page.tsx` |
| `/homes` | `app/(marketing)/homes/page.tsx` |
| `/homes/[slug]` | `app/(marketing)/homes/[slug]/page.tsx` |
| `/localities/[slug]` | `app/(marketing)/localities/[slug]/page.tsx` |
| `/owners` | `app/(marketing)/owners/page.tsx` |
| `/tenants` | `app/(marketing)/tenants/page.tsx` |
| `/how-it-works` | `app/(marketing)/how-it-works/page.tsx` |
| `/about` | `app/(marketing)/about/page.tsx` |
| `/faq` | `app/(marketing)/faq/page.tsx` |
| `/contact` | `app/(marketing)/contact/page.tsx` |
| `/privacy` | `app/(marketing)/privacy/page.tsx` |
| `/terms` | `app/(marketing)/terms/page.tsx` |

`app/(app)/` is empty — do not build it.

---

## Conventions

- Server components by default. `'use client'` only where required (forms, interactive UI)
- All images via `next/image` with descriptive alt text. No decorative images without `role="presentation"`
- Every page must export `metadata` with `title` and `description`
- Canonical URL on every page
- JSON-LD on `/` (Organization) and `/homes/[slug]` (RealEstateListing)
- No `any` types. No `@ts-ignore`.
- Comments only when the WHY is non-obvious
- pnpm for all package operations

---

## Non-negotiables

**Performance:**
- LCP < 2.0s (simulated 4G)
- CLS < 0.05
- Initial JS < 100KB gzipped
- Images < 200KB, served as WebP
- Hero images with `priority` prop

**Accessibility (WCAG 2.1 AA):**
- Alt text on every image (real descriptive text)
- Form labels tied to inputs
- Error messages via `aria-describedby`
- Focus rings preserved
- `prefers-reduced-motion` respected

**SEO:**
- Unique title + description per page
- OpenGraph + Twitter card on every page
- Sitemap at `/sitemap.xml`
- Robots: allow all in prod, disallow all in preview/dev
- All URLs lowercase, kebab-case, no trailing slash

---

## Adding a new property

See `.claude/skills/property-page/SKILL.md` for the complete workflow.

Short version:
1. Add entry to `data/properties.json` following the PropertySchema
2. Place images in `/public/properties/[slug]/` (min 4, max 10, < 200KB each)
3. Run `pnpm validate-data` — must pass
4. Run `pnpm build` — must pass

---

## Roadmap summary

| Milestone | Key deliverable |
|---|---|
| M0 (now) | Marketing site, JSON data, Web3Forms |
| M2-3 | Move properties to Supabase |
| M4-5 | Internal admin at `/admin` |
| M6 | Tenant accounts + auth |
| M9 | Visit booking |
| M12 | Online rent payments (Razorpay) |
| M18 | Owner dashboard |

Full roadmap: `docs/ROADMAP.md`
