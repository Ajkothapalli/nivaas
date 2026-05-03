import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CTABlock } from '@/components/marketing/CTABlock'

export const metadata: Metadata = {
  title: 'How Nivaas Works — For Tenants and Property Owners',
  description:
    'Learn how Nivaas manages rental homes in Hyderabad. Straightforward process for tenants and property owners.',
}

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pt-14">
        <Container>
          <div className="max-w-2xl mb-16">
            <h1 className="font-heading font-semibold text-ink text-4xl md:text-5xl mb-6 leading-tight">
              How Nivaas Works
            </h1>
            <p className="text-xl text-ink-muted leading-relaxed">
              A straightforward process for tenants looking for a managed home, and for owners who
              want professional property management without the effort.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading font-semibold text-ink text-2xl mb-8 pb-4 border-b border-border">
                For Tenants
              </h2>
              <ol className="flex flex-col gap-8">
                {[
                  {
                    n: '01',
                    title: 'Browse verified listings',
                    desc: 'Every home on Nivaas is managed by us — not by a third-party landlord acting through us. The photos are real, the descriptions are accurate, and the rent you see is the rent you pay.',
                  },
                  {
                    n: '02',
                    title: 'Schedule a visit',
                    desc: 'Pick a time that works for you. A Nivaas team member accompanies you, shows you the flat properly, and answers every question honestly — including ones about the building and neighbourhood.',
                  },
                  {
                    n: '03',
                    title: 'Sign and move in',
                    desc: 'Once you confirm, we prepare a stamped rental agreement. You pay the security deposit and the first month's rent via bank transfer. Keys are handed over on move-in day with everything tested and WiFi active.',
                  },
                  {
                    n: '04',
                    title: 'One number for the entire tenure',
                    desc: 'For anything during your stay — a broken appliance, a maintenance request, a question about your agreement — you call or WhatsApp Nivaas. We respond within 24 hours.',
                  },
                ].map((step) => (
                  <li key={step.n} className="flex gap-6">
                    <span className="font-heading font-semibold text-3xl text-accent/30 leading-none w-12 flex-shrink-0">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-medium text-ink mb-2">{step.title}</h3>
                      <p className="text-ink-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-ink text-2xl mb-8 pb-4 border-b border-border">
                For Property Owners
              </h2>
              <ol className="flex flex-col gap-8">
                {[
                  {
                    n: '01',
                    title: 'Register your property',
                    desc: 'Share the basic details — location, type, current condition. A Nivaas property manager visits, assesses, and provides a fair monthly payout figure. We aim to get back to you within 48 hours.',
                  },
                  {
                    n: '02',
                    title: 'Sign a master lease',
                    desc: 'We enter into a master lease with you for 12 months, renewable. The monthly payout is fixed in the agreement. You receive it on the 5th of every month, regardless of whether the property is occupied.',
                  },
                  {
                    n: '03',
                    title: 'We manage everything',
                    desc: 'Nivaas handles tenant sourcing, background checks, sublease agreements, maintenance, renewals, and move-out. You are notified before any repair above ₹2,000 and receive monthly statements.',
                  },
                  {
                    n: '04',
                    title: 'Renew or exit cleanly',
                    desc: 'At the end of 12 months, you choose to renew or take the property back. If you exit, we ensure a clean handover with full documentation of the property's condition.',
                  },
                ].map((step) => (
                  <li key={step.n} className="flex gap-6">
                    <span className="font-heading font-semibold text-3xl text-accent/30 leading-none w-12 flex-shrink-0">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-medium text-ink mb-2">{step.title}</h3>
                      <p className="text-ink-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <CTABlock
        heading="Ready to Get Started?"
        body="Whether you're a tenant looking for a home or an owner wanting reliable management, the first step is a conversation."
        primaryCta={{ label: 'Browse Homes', href: '/homes' }}
        secondaryCta={{ label: 'Register Your Property', href: '/owners' }}
        variant="light"
      />
    </>
  )
}
