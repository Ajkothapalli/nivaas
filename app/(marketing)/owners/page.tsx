import type { Metadata } from 'next'
import { OwnerLeadForm } from '@/components/marketing/OwnerLeadForm'
import { EarningsCalculator } from '@/components/marketing/EarningsCalculator'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { listByType } from '@/lib/repositories/testimonials'

export const metadata: Metadata = {
  title: 'List Your Property With Nivaas — Professional Property Management',
  description:
    'Register your Hyderabad property with Nivaas. Receive a fixed monthly payout, professional tenant management, and zero maintenance effort.',
}

const BENEFITS = [
  {
    title: 'Guaranteed monthly payout',
    description:
      'Receive your payout on the 5th of every month — regardless of vacancy. We absorb the gap between tenants.',
  },
  {
    title: 'Professional tenant screening',
    description:
      'Every tenant goes through Aadhaar, PAN, and employment verification. No more chasing rent or dealing with defaulters.',
  },
  {
    title: 'Single-call maintenance',
    description:
      'Tenants call us, not you. Our operations team handles all repairs and maintenance. We notify you before any significant work.',
  },
  {
    title: 'Stamped, registered agreements',
    description:
      'All agreements are legally compliant under Telangana Rent Control Act. No paperwork for you to manage.',
  },
  {
    title: 'Regular property updates',
    description:
      'Monthly statements, maintenance logs, and a direct number to your dedicated property manager.',
  },
  {
    title: 'Better quality tenants',
    description:
      "We attract working professionals from Hyderabad's IT sector who pay on time and treat the property with care.",
  },
]

export default async function OwnersPage() {
  const ownerTestimonials = await listByType('owner')
  return (
    <>
      <Section className="bg-accent pt-20 pb-16">
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl mb-6 leading-tight">
              Your Property. Our Responsibility.
            </h1>
            <p className="text-white/80 text-xl leading-relaxed">
              Register your Hyderabad flat with Nivaas and receive a guaranteed monthly payout while
              we handle every aspect of tenancy management.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-12 text-center">
            Why Owners Choose Nivaas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
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
                <h3 className="font-medium text-ink">{benefit.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-bg">
        <Container>
          <h2 className="font-heading font-semibold text-ink text-3xl mb-12 text-center">
            How It Works for Owners
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                n: '01',
                title: 'Register your property',
                desc: 'Share basic details. We visit, assess, and provide a fair monthly payout figure within 48 hours.',
              },
              {
                n: '02',
                title: 'Sign the master lease',
                desc: 'A 12-month master lease guarantees your monthly payout whether the property is occupied or not.',
              },
              {
                n: '03',
                title: 'Collect, do nothing else',
                desc: 'We source tenants, sign subleases, handle maintenance. You receive monthly statements and payments.',
              },
            ].map((step) => (
              <div key={step.n} className="flex flex-col gap-4">
                <span className="font-heading font-bold text-4xl text-accent/25 leading-none tabular-nums">
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
          <EarningsCalculator />
        </Container>
      </Section>

      {ownerTestimonials.length > 0 && (
        <Section className="bg-surface">
          <Container>
            <h2 className="font-heading font-semibold text-ink text-3xl mb-10 text-center">
              Owners Who Work With Us
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {ownerTestimonials.map((t) => (
                <blockquote
                  key={t.id}
                  className="bg-bg rounded-2xl p-6 border border-border flex flex-col gap-4"
                >
                  <p className="text-ink-muted leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <footer>
                    <p className="font-medium text-ink text-sm">{t.name}</p>
                    <p className="text-xs text-ink-muted">{t.role}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section id="register" className="bg-bg">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading font-semibold text-ink text-3xl mb-2">
              Register Your Property
            </h2>
            <p className="text-ink-muted mb-8">
              Fill in the form below and a property manager will call you within one business day.
            </p>
            <OwnerLeadForm />
          </div>
        </Container>
      </Section>
    </>
  )
}
