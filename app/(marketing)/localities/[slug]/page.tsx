import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PropertyCard } from '@/components/marketing/PropertyCard'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CTABlock } from '@/components/marketing/CTABlock'
import { getBySlug } from '@/lib/repositories/localities'
import { listByLocality } from '@/lib/repositories/properties'
import { formatRent } from '@/lib/format'
import { whatsappLink } from '@/lib/whatsapp'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locality = await getBySlug(params.slug)
  if (!locality) return {}

  return {
    title: `Managed Rental Homes in ${locality.name}, Hyderabad`,
    description: `Browse Nivaas-managed furnished flats in ${locality.name}. No brokerage. Rents from ${formatRent(locality.avg_rent_min)}/mo. ${locality.tagline}.`,
    openGraph: {
      title: `${locality.name}, Hyderabad — Managed Rental Homes`,
      description: locality.tagline,
    },
  }
}

export default async function LocalityPage({ params }: Props) {
  const locality = await getBySlug(params.slug)
  if (!locality) notFound()

  const properties = await listByLocality(params.slug)

  const waLink = whatsappLink({
    message: `Hi, I'm looking for a rental home in ${locality.name}. Can you help?`,
  })

  return (
    <>
      <Section className="pt-14 pb-10 bg-accent">
        <Container>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl mb-3">
            {locality.name}
          </h1>
          <p className="text-white/80 text-xl mb-8">{locality.tagline}</p>
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <span>
              Avg. rent: {formatRent(locality.avg_rent_min)} – {formatRent(locality.avg_rent_max)}
              /mo
            </span>
            <span>·</span>
            <span>{properties.length} homes available now</span>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading font-medium text-ink text-2xl mb-6">
                About {locality.name}
              </h2>
              <div className="text-ink-muted leading-relaxed space-y-4">
                {locality.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="rounded-2xl border border-border bg-surface p-6 sticky top-24">
                <h3 className="font-medium text-ink mb-4">Key facts</h3>
                <dl className="flex flex-col gap-4">
                  <div>
                    <dt className="text-xs text-ink-muted uppercase tracking-wide mb-1">
                      Average rent range
                    </dt>
                    <dd className="text-ink font-medium">
                      {formatRent(locality.avg_rent_min)} – {formatRent(locality.avg_rent_max)}/mo
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted uppercase tracking-wide mb-1">
                      IT parks nearby
                    </dt>
                    <dd>
                      <ul className="text-sm text-ink space-y-1">
                        {locality.it_parks.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted uppercase tracking-wide mb-1">
                      Landmarks
                    </dt>
                    <dd>
                      <ul className="text-sm text-ink space-y-1">
                        {locality.landmarks.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  {locality.transit.length > 0 && (
                    <div>
                      <dt className="text-xs text-ink-muted uppercase tracking-wide mb-1">
                        Getting around
                      </dt>
                      <dd>
                        <ul className="text-sm text-ink space-y-1">
                          {locality.transit.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {properties.length > 0 && (
        <Section className="bg-bg pt-0">
          <Container>
            <h2 className="font-heading font-medium text-ink text-2xl mb-8">
              Available homes in {locality.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <section className="py-14 bg-surface border-t border-border">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-heading font-medium text-ink text-xl mb-1">
                Looking for something specific in {locality.name}?
              </h2>
              <p className="text-ink-muted">
                New homes are added every week. Tell us your requirements and we'll follow up.
              </p>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#20BA5A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 whitespace-nowrap"
            >
              WhatsApp us
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
