import type { Metadata } from 'next'
import { PropertyCard } from '@/components/marketing/PropertyCard'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CTABlock } from '@/components/marketing/CTABlock'
import { listAvailable } from '@/lib/repositories/properties'
import { LOCALITIES, BUDGET_RANGES, FURNISHING_LABELS } from '@/lib/constants'
import { type Property } from '@/lib/validation/property'
import { whatsappLink } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Browse Managed Rental Homes in Hyderabad',
  description:
    'Find fully managed, no-brokerage rental homes across Gachibowli, Madhapur, HITEC City, and Kondapur. Browse 2 BHK and 3 BHK options.',
}

interface SearchParams {
  locality?: string
  bhk?: string
  budget?: string
}

function filterProperties(properties: Property[], params: SearchParams): Property[] {
  return properties.filter((p) => {
    if (params.locality && p.locality !== params.locality) return false
    if (params.bhk && p.bhk !== Number(params.bhk)) return false
    if (params.budget) {
      const range = BUDGET_RANGES.find((r) => r.label === params.budget)
      if (range && (p.rent_monthly < range.min || p.rent_monthly > range.max)) return false
    }
    return true
  })
}

export default async function HomesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const allProperties = await listAvailable()
  const filtered = filterProperties(allProperties, searchParams)

  return (
    <>
      <Section className="pb-0 pt-14">
        <Container>
          <h1 className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-2">
            Homes Available Now
          </h1>
          <p className="text-ink-muted mb-8">
            {filtered.length} managed propert{filtered.length !== 1 ? 'ies' : 'y'} available
          </p>

          {/* Filter strip */}
          <form method="GET" className="flex flex-wrap gap-3 pb-8 border-b border-border">
            <div className="flex flex-col gap-1">
              <label htmlFor="filter-locality" className="text-xs font-medium text-ink-muted sr-only">
                Locality
              </label>
              <select
                id="filter-locality"
                name="locality"
                defaultValue={searchParams.locality ?? ''}
                className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">All localities</option>
                {LOCALITIES.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="filter-bhk" className="text-xs font-medium text-ink-muted sr-only">
                BHK
              </label>
              <select
                id="filter-bhk"
                name="bhk"
                defaultValue={searchParams.bhk ?? ''}
                className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">Any BHK</option>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} BHK
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="filter-budget" className="text-xs font-medium text-ink-muted sr-only">
                Budget
              </label>
              <select
                id="filter-budget"
                name="budget"
                defaultValue={searchParams.budget ?? ''}
                className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">Any budget</option>
                {BUDGET_RANGES.map((r) => (
                  <option key={r.label} value={r.label}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Filter
            </button>

            {(searchParams.locality || searchParams.bhk || searchParams.budget) && (
              <a
                href="/homes"
                className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Clear filters
              </a>
            )}
          </form>
        </Container>
      </Section>

      <Section className="pt-10">
        <Container>
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-ink-muted text-lg mb-4">
                No properties match your current filters.
              </p>
              <a href="/homes" className="text-accent hover:underline font-medium">
                Clear filters and see all homes
              </a>
            </div>
          )}
        </Container>
      </Section>

      <section className="py-14 bg-surface border-t border-border">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-heading font-medium text-ink text-xl mb-1">
                Don't see what you're looking for?
              </h2>
              <p className="text-ink-muted">
                New properties are added every week. Tell us what you need and we'll keep you
                posted.
              </p>
            </div>
            <a
              href={whatsappLink({
                message:
                  "Hi, I'm looking for a rental home and couldn't find the right match on the website. Can you help?",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#20BA5A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 whitespace-nowrap"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp us
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
