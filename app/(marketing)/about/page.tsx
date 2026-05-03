import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CTABlock } from '@/components/marketing/CTABlock'

export const metadata: Metadata = {
  title: 'About Nivaas — Managed Rentals in Hyderabad',
  description:
    'Nivaas is a Hyderabad-based property management company. Founded to give tenants and owners a better rental experience in the IT corridor.',
}

export default function AboutPage() {
  return (
    <>
      <Section className="pt-14 pb-10">
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-heading font-semibold text-ink text-4xl md:text-5xl mb-6 leading-tight">
              About Nivaas
            </h1>
            <p className="text-xl text-ink-muted leading-relaxed">
              We set out to fix what was broken about renting in Hyderabad.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 max-w-4xl">
            <div className="prose-sm text-ink-muted leading-relaxed flex flex-col gap-5">
              <p>
                Nivaas started from a frustration that anyone who has rented in Hyderabad's IT
                corridor will recognise. Brokers who charge one month's rent for 20 minutes of
                work. Landlords who are unreachable the moment something breaks. Photos that look
                nothing like the actual flat. Agreements written to protect everyone except the
                tenant.
              </p>
              <p>
                We built Nivaas to be the property manager we wished had existed. We master-lease
                properties directly from owners, furnish them to a consistent standard, and rent
                them out with transparent pricing and no brokerage. When something breaks, we fix
                it — not the landlord, not a random contractor, but our own operations team.
              </p>
              <p>
                For owners, we solve a different set of problems. Managing a tenant from overseas
                or while running a business is genuinely difficult. Guaranteed monthly payouts,
                professional tenant screening, and a team that handles everything from maintenance
                to move-out is not a luxury — it is what professional property management should
                look like.
              </p>
              <p>
                Nivaas Property Management Pvt. Ltd. is incorporated in Hyderabad, Telangana. Our
                team lives and works in the same neighbourhoods we manage.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-border bg-bg p-6">
                <h2 className="font-heading font-medium text-ink text-xl mb-4">Our founders</h2>
                <p className="text-ink-muted text-sm leading-relaxed">
                  [Founder bios to be added. Please provide names, photos, and a 2–3 sentence
                  background for each founder.]
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-bg p-6">
                <h2 className="font-heading font-medium text-ink text-xl mb-4">Contact details</h2>
                <dl className="flex flex-col gap-3 text-sm">
                  <div>
                    <dt className="text-ink-muted text-xs uppercase tracking-wide mb-0.5">
                      Registered name
                    </dt>
                    <dd className="text-ink">Nivaas Property Management Pvt. Ltd.</dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted text-xs uppercase tracking-wide mb-0.5">
                      Address
                    </dt>
                    <dd className="text-ink">Hyderabad, Telangana 500032</dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted text-xs uppercase tracking-wide mb-0.5">
                      Email
                    </dt>
                    <dd>
                      <a
                        href="mailto:hello@nivaas.in"
                        className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                      >
                        hello@nivaas.in
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CTABlock
        heading="Ready to Work With Us?"
        body="Whether you're looking for a home or want to register your property, we're easy to reach."
        primaryCta={{ label: 'Browse Homes', href: '/homes' }}
        secondaryCta={{ label: 'List Your Property', href: '/owners' }}
        variant="light"
      />
    </>
  )
}
