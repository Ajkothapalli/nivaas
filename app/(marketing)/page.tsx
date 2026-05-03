import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/marketing/Hero'
import { PropertyCard } from '@/components/marketing/PropertyCard'
import { LocalityCard } from '@/components/marketing/LocalityCard'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { TrustSignals } from '@/components/marketing/TrustSignals'
import { CTABlock } from '@/components/marketing/CTABlock'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { listFeatured } from '@/lib/repositories/properties'
import { listAll as listLocalities } from '@/lib/repositories/localities'
import { organizationJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Managed Rental Homes in Hyderabad — No Brokerage',
  description:
    'Nivaas manages fully furnished homes in Gachibowli, Madhapur, HITEC City, and Kondapur. No brokerage, single point of contact, move in within a week.',
  openGraph: {
    title: "Nivaas — Fully Managed Homes in Hyderabad's IT Corridor",
    description:
      'Browse verified, managed rental properties. No brokerage, no middlemen. One number for everything.',
  },
}

export default async function HomePage() {
  const [featuredProperties, localities] = await Promise.all([
    listFeatured(6),
    listLocalities(),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />

      <Hero
        heading="Fully Managed Homes in Hyderabad's IT Corridor"
        subheading="Browse verified, furnished rentals in Gachibowli, Madhapur, HITEC City, and more. No brokerage. One number for everything."
        primaryCta={{ label: 'Browse Homes', href: '/homes' }}
        secondaryCta={{ label: 'List Your Property', href: '/owners' }}
        imageSrc="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
        imageAlt="Well-furnished living room in a Hyderabad apartment managed by Nivaas"
      />

      <HowItWorks />

      <Section className="bg-bg">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-2">
                Available Homes
              </h2>
              <p className="text-ink-muted">Ready to move in, fully managed.</p>
            </div>
            <Link
              href="/homes"
              className="hidden sm:inline-flex text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              View all homes
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/homes"
              className="text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              View all homes
            </Link>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="mb-10">
            <h2 className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-2">
              Neighbourhoods We Manage
            </h2>
            <p className="text-ink-muted max-w-xl">
              Seven localities across Hyderabad's western IT corridor, each with its own
              character.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {localities.map((locality) => (
              <LocalityCard key={locality.slug} locality={locality} />
            ))}
          </div>
        </Container>
      </Section>

      <TrustSignals />

      <CTABlock
        heading="Own a Property in Hyderabad?"
        body="Register it with Nivaas and receive a guaranteed monthly payout. We handle tenants, maintenance, and paperwork."
        primaryCta={{ label: 'Register Your Property', href: '/owners' }}
        secondaryCta={{ label: 'Learn how it works', href: '/how-it-works' }}
      />
    </>
  )
}
