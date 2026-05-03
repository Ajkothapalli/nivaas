# Supabase Setup

## Apply migration

```bash
pnpm supabase login
pnpm supabase link --project-ref YOUR_PROJECT_REF
pnpm supabase db push
```

## Run seed

```bash
pnpm supabase db reset  # dev only — resets and applies migrations + seed
# or manually:
psql $DATABASE_URL < supabase/seed.sql
```

## Generate TypeScript types

```bash
pnpm db:types
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase project settings
- `SUPABASE_SERVICE_ROLE_KEY` — from Supabase project settings (keep secret)

## Enabling the DB

Once Supabase is configured and data is seeded, set:

```
NEXT_PUBLIC_USE_DB=true
```

The repository layer will automatically switch from JSON reads to Supabase queries.
This requires updating `lib/repositories/properties.ts` and `lib/repositories/localities.ts`
to use the Supabase client — same function signatures, same return types.
