import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/marketing/Hero'
import { HeroSearch } from '@/components/marketing/HeroSearch'
import { StatsStrip } from '@/components/marketing/StatsStrip'
import { PropertyCard } from '@/components/marketing/PropertyCard'
import { LocalityCard } from '@/components/marketing/LocalityCard'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { TrustSignals } from '@/components/marketing/TrustSignals'
import { CTABlock } from '@/components/marketing/CTABlock'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { listFeatured } from '@/lib/repositories/properties'
import { listAll as listLocalities } from '@/lib/repositories/localities'
import { organizationJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Managed Rental Homes in Hyderabad — No Brokerage',
  description:
    'Estate360 manages fully furnished homes in Gachibowli, Madhapur, HITEC City, and Kondapur. No brokerage, single point of contact, move in within a week.',
  openGraph: {
    title: "Estate360 — Fully Managed Homes in Hyderabad's IT Corridor",
    description:
      'Browse verified, managed rental properties. No brokerage, no middlemen. One number for everything.',
  },
}

export default async function HomePage() {
  const [featuredProperties, localities] = await Promise.all([listFeatured(6), listLocalities()])

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
        imageSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&fit=crop"
        imageAlt="Well-furnished living room in a Hyderabad apartment managed by Estate360"
        videoSrc="/Images/download.mp4"
        tags={[
          { label: '1 BHK', href: '/homes?bhk=1' },
          { label: '2 BHK', href: '/homes?bhk=2' },
          { label: '3 BHK', href: '/homes?bhk=3' },
        ]}
        search={<HeroSearch />}
      />

      <StatsStrip />

      <HowItWorks />

      <Section className="bg-bg pt-10 md:pt-14 pb-10 md:pb-14">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">
            <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-4 leading-tight">
                Available Homes
              </h2>
              <p className="text-ink-muted mb-6">
                Ready to move in, fully managed. Every listing you see here is inspected and priced
                by us, not a third party.
              </p>
              <Link
                href="/homes"
                className="inline-flex text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                View all homes →
              </Link>
            </Reveal>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {featuredProperties.map((property, i) => (
                <Reveal key={property.id} delay={(i % 4) * 80}>
                  <PropertyCard property={property} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface pt-10 md:pt-14 pb-10 md:pb-14">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5 order-2 lg:order-1">
              {localities.map((locality, i) => (
                <Reveal key={locality.slug} delay={(i % 4) * 80}>
                  <LocalityCard locality={locality} />
                </Reveal>
              ))}
            </div>

            <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start order-1 lg:order-2">
              <h2 className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-4 leading-tight">
                Neighbourhoods We Manage
              </h2>
              <p className="text-ink-muted">
                Seven localities across Hyderabad's western IT corridor, each with its own character
                — and its own reason a tenant picks it over the rest.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <TrustSignals />

      <Reveal>
        <CTABlock
          heading="Own a Property in Hyderabad?"
          body="Register it with Estate360 and receive a guaranteed monthly payout. We handle tenants, maintenance, and paperwork."
          primaryCta={{ label: 'Register Your Property', href: '/owners' }}
          secondaryCta={{ label: 'Learn how it works', href: '/how-it-works' }}
        />
      </Reveal>
    </>
  )
}
