import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Select } from '@/components/ui/Select'
import { LOCALITIES, BUDGET_RANGES, PROPERTY_TYPES } from '@/lib/constants'

export function HeroSearch() {
  return (
    <Container>
      <form
        method="GET"
        action="/homes"
        className="bg-surface rounded-2xl border border-border shadow-lg p-4 md:p-6 grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end"
      >
        <Select id="hero-property-type" name="property_type" label="Looking for" defaultValue="">
          <option value="">Any type</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>

        <Select id="hero-locality" name="locality" label="Location" defaultValue="">
          <option value="">All localities</option>
          {LOCALITIES.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </Select>

        <Select id="hero-bhk" name="bhk" label="Bedrooms" defaultValue="">
          <option value="">Any BHK</option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} BHK
            </option>
          ))}
        </Select>

        <Select id="hero-budget" name="budget" label="Budget" defaultValue="">
          <option value="">Any budget</option>
          {BUDGET_RANGES.map((r) => (
            <option key={r.label} value={r.label}>
              {r.label}
            </option>
          ))}
        </Select>

        <Button
          type="submit"
          size="lg"
          className="col-span-2 lg:col-span-1 w-full lg:w-auto whitespace-nowrap"
        >
          Search Properties
        </Button>
      </form>
    </Container>
  )
}
