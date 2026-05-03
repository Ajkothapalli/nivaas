# Nivaas — Product Roadmap

Each milestone is a focused 2–6 week project. The database schema and routing structure already support all of them.

| Milestone | What ships | Architecture unlock |
|---|---|---|
| M0 (now) | Marketing site, JSON data, Web3Forms lead capture | Repositories, Zod schemas, route groups, Supabase schema applied |
| M2–3 | Properties and localities move to Supabase | Flip `NEXT_PUBLIC_USE_DB=true`, swap repository bodies — zero callers change |
| M4–5 | Internal admin console at `/admin` | First `(app)` routes, RLS policies live, service role used in admin |
| M6 | Tenant accounts, saved interests, inquiry history | Supabase Auth enabled, `profiles` + `tenants` tables populated |
| M9 | Visit booking, tenant onboarding flow | `visits` table populated, scheduling UI in `(app)` |
| M12 | Online rent payments | Razorpay live, `payments` table populated, webhook at `app/api/webhooks/razorpay` |
| M18 | Owner dashboard, P&L per unit | `master_leases` + `payouts` populated, owner portal in `(app)` |

## Constraints per milestone

### M2–3: Supabase swap
- Repository function signatures must not change
- Zod schemas are the contract between JSON and Supabase — reconcile any type drift in one PR
- Run `pnpm db:types` and compare against `lib/validation/` schemas before merging

### M4–5: Admin console
- Lives at `/admin` — separate from `(marketing)` and `(app)` route groups
- Auth: service role or Supabase admin user. Not public.
- No new UI framework — plain Tailwind + Radix primitives

### M6: Auth
- Supabase Auth with phone OTP (Indian market) + Google OAuth
- `profiles` table is the single source of truth for user identity
- Tenant and owner roles enforced via RLS, not application-level checks

### M12: Payments
- Razorpay for Indian UPI + card payments
- Webhook at `app/api/webhooks/razorpay/route.ts` — idempotent, verifies signature
- Never store full card details — Razorpay handles PCI compliance

## What NOT to build early
- Co-living / shared beds: schema supports it via `units` table but do not surface until M9+
- Multiple currencies: ₹ INR only
- Mobile app: web-first, PWA-ready at M6
