import type { Metadata } from 'next'
import Image from 'next/image'
import { OwnerLeadForm } from '@/components/marketing/OwnerLeadForm'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { listByType } from '@/lib/repositories/testimonials'

export const metadata: Metadata = {
  title: 'List Your Property With Estate360 — Professional Property Management',
  description:
    'Register your Hyderabad property with Estate360. Receive a fixed monthly payout, professional tenant management, and zero maintenance effort.',
}

function BenefitIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const BENEFITS = [
  {
    title: 'Guaranteed monthly payout',
    description:
      'Receive your payout on the 5th of every month — regardless of vacancy. We absorb the gap between tenants.',
    icon: <path d="M6 4h12M6 9h12M6 4c3.5 0 6 1.5 6 5s-2.5 5-6 5h-1l7 6" />,
  },
  {
    title: 'Professional tenant screening',
    description:
      'Every tenant goes through Aadhaar, PAN, and employment verification. No more chasing rent or dealing with defaulters.',
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Single-call maintenance',
    description:
      'Tenants call us, not you. Our operations team handles all repairs and maintenance. We notify you before any significant work.',
    icon: (
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    ),
  },
  {
    title: 'Stamped, registered agreements',
    description:
      'All agreements are legally compliant under Telangana Rent Control Act. No paperwork for you to manage.',
    icon: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M9 15l2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Regular property updates',
    description:
      'Monthly statements, maintenance logs, and a direct number to your dedicated property manager.',
    icon: (
      <>
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </>
    ),
  },
  {
    title: 'Better quality tenants',
    description:
      "We attract working professionals from Hyderabad's IT sector who pay on time and treat the property with care.",
    icon: <path d="M12 2l2.9 6.3 6.9.9-5 4.9 1.2 6.9L12 17.8l-6 3.2 1.2-6.9-5-4.9 6.9-.9L12 2z" />,
  },
]

const WHAT_HAPPENS_NEXT = [
  'We call you within one business day',
  'A manager visits and confirms a fair payout',
  'You sign the master lease and start earning',
]

export default async function OwnersPage() {
  const ownerTestimonials = await listByType('owner')
  return (
    <>
      <Section id="register" className="relative overflow-hidden pt-14 pb-16 md:pt-16 md:pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80&fit=crop"
            alt="Modern managed property with a private pool and garden"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-accent/85" />
        </div>
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="lg:pt-8">
              <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl mb-5 leading-tight">
                Your Property. Our Responsibility.
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Register your Hyderabad flat below and receive a guaranteed monthly payout while we
                handle everything else.
              </p>
              <ul className="flex flex-col gap-4">
                {WHAT_HAPPENS_NEXT.map((item, i) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-white/15 text-white flex items-center justify-center font-heading font-semibold text-xs flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-white/90 text-sm">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface rounded-2xl shadow-2xl p-6 md:p-8">
              <OwnerLeadForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-10 md:pb-14">
        <Container>
          <Reveal>
            <h2 className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-12 text-center">
              Why Owners Choose Estate360
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={(i % 3) * 100}>
                <div className="p-6 rounded-2xl border border-border bg-bg flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BenefitIcon>{benefit.icon}</BenefitIcon>
                  </div>
                  <h3 className="font-medium text-ink">{benefit.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-bg pt-10 md:pt-14">
        <Container>
          <Reveal>
            <h2 className="font-heading font-semibold text-ink text-3xl mb-12 text-center">
              How It Works for Owners
            </h2>
          </Reveal>
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
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <div className="flex flex-col gap-4">
                  <span className="font-heading font-bold text-4xl text-accent/25 leading-none tabular-nums">
                    {step.n}
                  </span>
                  <h3 className="font-medium text-ink text-lg">{step.title}</h3>
                  <p className="text-ink-muted">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {ownerTestimonials.length > 0 && (
        <Section className="bg-surface">
          <Container>
            <Reveal>
              <h2 className="font-heading font-semibold text-ink text-3xl mb-10 text-center">
                Owners Who Work With Us
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {ownerTestimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 100}>
                  <blockquote className="bg-bg rounded-2xl p-6 border border-border flex flex-col gap-4">
                    <p className="text-ink-muted leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <footer className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center font-medium text-sm flex-shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-ink text-sm">{t.name}</p>
                        <p className="text-xs text-ink-muted">{t.role}</p>
                      </div>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
