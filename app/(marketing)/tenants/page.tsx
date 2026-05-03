import type { Metadata } from 'next'
import Link from 'next/link'
import { PropertyCard } from '@/components/marketing/PropertyCard'
import { LocalityCard } from '@/components/marketing/LocalityCard'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CTABlock } from '@/components/marketing/CTABlock'
import { listFeatured } from '@/lib/repositories/properties'
import { listAll as listLocalities } from '@/lib/repositories/localities'

export const metadata: Metadata = {
  title: 'Renting in Hyderabad — No Brokerage, Fully Managed',
  description:
    'Find a Nivaas-managed home in Hyderabad with no brokerage, verified photos, and a single point of contact for all maintenance.',
}

const WHATS_INCLUDED = [
  {
    title: 'Fully furnished',
    description:
      'Beds, sofa, kitchen appliances, WiFi setup, and white goods — ready to move in without buying a thing.',
  },
  {
    title: 'No brokerage',
    description:
      'You pay only the security deposit and first month's rent. No broker fee, no finder's fee.',
  },
  {
    title: 'Verified properties',
    description:
      'Every home is inspected by Nivaas before listing. The photos are real, the description is accurate.',
  },
  {
    title: 'One number for everything',
    description:
      'Broken geyser, WiFi issue, maintenance request — WhatsApp or call Nivaas. We resolve it.',
  },
]

export default async function TenantsPage() {
  const [featuredProperties, localities] = await Promise.all([listFeatured(3), listLocalities()])

  return (
    <>
      <Section className="bg-accent pt-20 pb-16">
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl mb-6 leading-tight">
              Rent Without the Bother
            </h1>
            <p className="text-white/80 text-xl leading-relaxed">
              Fully furnished homes in Hyderabad's IT corridor. No broker, no hunt for spare
              keys, no chasing landlords for repairs.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-12 text-center">
            What's Included
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHATS_INCLUDED.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border border-border bg-bg flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-medium text-ink">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-bg">
        <Container>
          <h2 className="font-heading font-semibold text-ink text-3xl mb-12 text-center">
            How It Works for Tenants
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                n: '01',
                title: 'Browse and choose',
                desc: 'Search homes by locality and budget. Every listing has real photos and accurate details.',
              },
              {
                n: '02',
                title: 'Visit and decide',
                desc: 'Schedule a visit at your convenience. A Nivaas team member accompanies you and answers all questions.',
              },
              {
                n: '03',
                title: 'Move in smoothly',
                desc: 'Digital agreement, deposit via bank transfer, keys on move-in day. WiFi active, all appliances tested.',
              },
            ].map((step) => (
              <div key={step.n} className="flex flex-col gap-4">
                <span className="font-heading font-semibold text-5xl text-accent/20 leading-none">
                  {step.n}
                </span>
                <h3 className="font-medium text-ink text-lg">{step.title}</h3>
                <p className="text-ink-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-heading font-semibold text-ink text-3xl">
              Homes Available Now
            </h2>
            <Link
              href="/homes"
              className="hidden sm:inline-flex text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              Browse all
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-bg">
        <Container>
          <h2 className="font-heading font-semibold text-ink text-3xl mb-10">
            Localities We Manage
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {localities.map((l) => (
              <LocalityCard key={l.slug} locality={l} />
            ))}
          </div>
        </Container>
      </Section>

      <CTABlock
        heading="Ready to Find Your Home?"
        body="Browse available homes or WhatsApp us your requirements. We'll match you within 24 hours."
        primaryCta={{ label: 'Browse Homes', href: '/homes' }}
        secondaryCta={{ label: 'Talk to Us', href: '/contact' }}
      />
    </>
  )
}
