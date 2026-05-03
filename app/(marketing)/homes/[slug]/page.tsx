import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PropertyGallery } from '@/components/marketing/PropertyGallery'
import { PropertyCard } from '@/components/marketing/PropertyCard'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { getBySlug, listByLocality } from '@/lib/repositories/properties'
import { formatRent, formatArea, formatBHK, formatDate } from '@/lib/format'
import { FURNISHING_LABELS } from '@/lib/constants'
import { propertyJsonLd } from '@/lib/seo'
import { whatsappLink, propertyWhatsappMessage } from '@/lib/whatsapp'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getBySlug(params.slug)
  if (!property) return {}

  return {
    title: property.title,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images.slice(0, 1).map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: property.title,
      })),
    },
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await getBySlug(params.slug)
  if (!property) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nivaas.in'
  const propertyUrl = `${siteUrl}/homes/${property.slug}`

  const [relatedRaw] = await Promise.all([listByLocality(property.locality)])
  const related = relatedRaw.filter((p) => p.slug !== property.slug).slice(0, 3)

  const waLink = whatsappLink({
    message: propertyWhatsappMessage({ title: property.title, url: propertyUrl }),
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(propertyJsonLd(property)),
        }}
      />

      <Section className="pt-10 pb-0">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-ink-muted">
              <li>
                <Link href="/" className="hover:text-ink transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/homes" className="hover:text-ink transition-colors">
                  Homes
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink truncate max-w-xs">
                {property.title}
              </li>
            </ol>
          </nav>

          <PropertyGallery images={property.images} title={property.title} />
        </Container>
      </Section>

      <Section className="pt-10">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              <p className="text-sm font-medium text-ink-muted capitalize mb-2">
                {property.locality.replace(/-/g, ' ')}
              </p>
              <h1 className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-4 leading-tight">
                {property.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-ink-muted mb-8">
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  {formatBHK(property.bhk)}
                </span>
                <span aria-hidden="true">·</span>
                <span>{formatArea(property.area_sqft)}</span>
                <span aria-hidden="true">·</span>
                <span>{FURNISHING_LABELS[property.furnishing]}</span>
                <span aria-hidden="true">·</span>
                <span>Available from {formatDate(property.available_from)}</span>
              </div>

              <div className="prose prose-sm max-w-none text-ink-muted leading-relaxed mb-10">
                {property.description.split('\n').map((para, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mb-10">
                <h2 className="font-heading font-medium text-ink text-xl mb-4">Amenities</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-2 text-sm text-ink-muted">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent flex-shrink-0" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="font-heading font-medium text-ink text-xl mb-4">Location</h2>
                <p className="text-ink-muted mb-4">{property.address_line}</p>
                <div className="rounded-2xl overflow-hidden border border-border aspect-video bg-bg flex items-center justify-center">
                  <iframe
                    title={`Map showing location of ${property.title}`}
                    src={`https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-4">
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <p className="text-sm text-ink-muted mb-1">Monthly rent</p>
                  <p className="font-heading font-semibold text-ink text-4xl mb-1">
                    {formatRent(property.rent_monthly)}
                  </p>
                  <p className="text-sm text-ink-muted">
                    Deposit: {formatRent(property.deposit)} (refundable)
                  </p>

                  <div className="mt-6 flex flex-col gap-3">
                    <a href={waLink} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="w-full">
                        WhatsApp About This Home
                      </Button>
                    </a>
                    <RequestCallbackButton propertySlug={property.slug} />
                  </div>

                  <p className="mt-4 text-xs text-ink-muted text-center">
                    No brokerage. No hidden charges.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-sm font-medium text-ink mb-3">About this locality</p>
                  <Link
                    href={`/localities/${property.locality}`}
                    className="text-sm text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    Read about {property.locality.replace(/-/g, ' ')} →
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <h2 className="font-heading font-medium text-ink text-2xl mb-8">
                Similar homes in {property.locality.replace(/-/g, ' ')}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

function RequestCallbackButton({ propertySlug }: { propertySlug: string }) {
  return (
    <Link href={`/contact?property=${propertySlug}`}>
      <Button variant="secondary" size="lg" className="w-full">
        Request a Callback
      </Button>
    </Link>
  )
}
