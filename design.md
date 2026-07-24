# Design — Estate360

A locked design system for this app, produced by `hallmark redesign`. Every
page redesign reads this file before emitting code. Extend or amend it when
the system needs to grow — don't regenerate per page.

## Genre

editorial — warm, plain-English, confident-never-salesy (per CLAUDE.md brand voice)

## Macrostructure family

Four page-type families, not one. Estate360 is a mix of narrative marketing
pages, a process page, a reference page, and utility listing pages — forcing
one shape across all of them would itself be a slop tell.

- **Story/Conversion** (`/`, `/owners`, `/tenants`, `/services`, `/about`):
  **Split Studio** — diptych sections that alternate side down the page
  (text/proof, proof/text, text/proof…) instead of a stacked column of
  same-width centered sections. A diptych half MAY contain a grid (property
  cards, benefit tiles) as its "proof" side.
- **Process** (`/how-it-works`): **Narrative Workflow** — numbered phases as
  a timeline (1.0 → 4.0). The content was already numbered 01/02/03; this
  gives it a real structural home instead of a 3-column card row.
- **Reference** (`/faq`): **Conversational FAQ** — bold question, brief
  answer, accordion. No card chrome around each Q&A.
- **Content/listing** (`/homes`, `/homes/[slug]`, `/localities/[slug]`):
  typography + grid only. No macrostructure enrichment — these are utility
  pages a tenant scans quickly, not narrative ones.

## Theme

Custom — anchored on the existing brand accent (`#2D4A3E`), not a catalog
theme. The brand already exists; the fix is structural, not chromatic.

- `--color-paper` oklch(98.43% 0.004 106.47) /_ bg #FAFAF7 _/
- `--color-paper-2` oklch(100% 0 89.88) /_ surface #FFFFFF _/
- `--color-ink` oklch(21.78% 0 89.88) /_ ink #1A1A1A _/
- `--color-ink-2` oklch(47.48% 0 89.88) /_ ink-muted #5C5C5C _/
- `--color-rule` oklch(92.45% 0.0096 93.57) /_ border #E8E6DF _/
- `--color-accent` oklch(38.21% 0.0407 166.3) /_ accent #2D4A3E _/
- `--color-accent-hover` oklch(33.29% 0.035 166.2) /_ #243C32 _/
- `--color-focus` oklch(38.21% 0.0407 166.3) /_ = accent _/
- `--color-error` oklch(52.27% 0.156 24.29) /_ #B23A3A _/

Diversification axes: paper band = light · display style = rounded-sans
· accent hue = cool-neutral green (166°). Locked — pages do not vary theme.

## Typography

Went through several rounds before landing here: Fraunces (serif — rejected,
user wants sans-only) → Manrope (rejected) → Sora (rejected) → Inter Tight /
Linear single-family discipline (rejected — user wanted visibly rounded
letterforms, not a tight grotesk cut) → **Plus Jakarta Sans** (confirmed,
picked directly from a 12-candidate visual comparison). Do not reintroduce
any of the rejected faces.

- Display: **Plus Jakarta Sans**, weight 700/800, normal style (roman only —
  no italic headers), tracking `-0.01em` (applied globally via `.font-heading`
  in `globals.css`, not per-component — much lighter than the Inter Tight
  pairing's `-0.025em`; Jakarta's rounded warmth doesn't want aggressive
  negative tracking). Wired via `app/layout.tsx`, `tailwind.config.ts`
  `fontFamily.heading`.
- Body: **Inter**, weight 400/500, default tracking. Real pairing again (two
  distinct families), not single-family discipline.
- Type scale anchor: `--text-display` = `clamp(2.5rem, 1.9rem + 3vw, 4rem)`.

## Spacing

4-point scale, named tokens in `tokens.css` (`--space-3xs` … `--space-3xl`).
Existing Tailwind `py-20 md:py-28` section rhythm stays; diptych halves use
`gap-12`–`gap-16`.

## Motion

- Easings: `--ease-out` (0.16, 1, 0.3, 1) for entrances, `--ease-in-out`
  (0.87, 0, 0.13, 1) for state changes. Never bare `ease`.
- Reveal pattern: fade + 24px slide-up on scroll (existing `Reveal`
  component), staggered per grid item.
- Reduced-motion fallback: opacity-only, ≤150ms (already enforced globally
  in `globals.css`).

## Microinteractions stance

- Silent success (no celebratory toasts) — already the pattern in
  `OwnerLeadForm`.
- Hover reveal on cards (lift + shadow), no hover-delay tooltips in current
  scope.
- Button press feedback: `active:scale-[0.97]` (already shipped).

## CTA voice

- Primary: filled accent pill (`rounded-full`), white text — established,
  unchanged.
- Secondary: outline pill, accent border/text — established, unchanged.
- Not a slop tell on its own; the redesign targets macrostructure and
  section rhythm, not button geometry.

## Per-page allowances

- Story/Conversion pages MAY use hero enrichment (photography already in
  use; Tier-A CSS art permitted for the About page).
- Content/listing pages MUST NOT use enrichment — the property/locality
  data carries the page.
- Process and Reference pages: typography + numbering only.

## What pages MUST share

- Wordmark (Estate360 logo, unchanged).
- Accent colour and its placement (≤5% of any viewport — used for CTAs,
  numerals, active states, never as a background wash beyond the hero).
- Fraunces/Inter type pairing.
- CTA voice (pill shape, padding rhythm).
- Section-heading rhythm: no numbered eyebrow tags except on Process pages
  (where the numbering is real, i.e. step order) — banned elsewhere per
  Hallmark's tag-left/heading-right prohibition.

## What pages MAY differ on

- Macrostructure within their family (e.g. Home can lean Bento for its
  listing grids inside a Split Studio rhythm; Owners stays a cleaner
  diptych).
- Hero enrichment tier.
- Nav is shared (existing sticky header) — no per-page nav archetype
  variation; this is a single small marketing site, not a multi-product app.

## Exports

### tokens.css

See [`tokens.css`](tokens.css) at project root — mirrors this file exactly.

### Tailwind v3 (this project's actual config)

```ts
colors: {
  bg: '#FAFAF7', surface: '#FFFFFF', ink: '#1A1A1A', 'ink-muted': '#5C5C5C',
  accent: '#2D4A3E', 'accent-hover': '#243C32', border: '#E8E6DF', error: '#B23A3A',
},
fontFamily: {
  heading: ['var(--font-fraunces)', 'Georgia', 'serif'],
  body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
},
```
