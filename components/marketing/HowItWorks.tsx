'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

const TENANT_STEPS = [
  {
    number: '01',
    title: 'Browse and choose',
    description:
      'Browse verified, managed properties across 7 localities. Every listing shows accurate rent, deposit, and photos. No surprises.',
  },
  {
    number: '02',
    title: 'Visit and confirm',
    description:
      'Schedule a visit at a time that works for you. A Nivaas team member accompanies you, answers every question, and helps you compare options.',
  },
  {
    number: '03',
    title: 'Move in, then relax',
    description:
      'Sign digitally, pay the deposit, collect the keys. WiFi is set up, every appliance is tested. We handle all maintenance from day one.',
  },
]

const OWNER_STEPS = [
  {
    number: '01',
    title: 'Register your property',
    description:
      'Share your property details with us. We visit, assess, and give you a fair monthly payout figure — usually within 48 hours.',
  },
  {
    number: '02',
    title: 'Sign the master lease',
    description:
      'We enter a 12-month master lease. You receive a guaranteed monthly payout on the 5th of every month, whether the property is occupied or not.',
  },
  {
    number: '03',
    title: 'We handle everything',
    description:
      'Tenant sourcing, agreement, maintenance, renewals — all managed by Nivaas. You get monthly statements and a call before any significant repair.',
  },
]

export function HowItWorks() {
  const [tab, setTab] = useState<'tenants' | 'owners'>('tenants')
  const steps = tab === 'tenants' ? TENANT_STEPS : OWNER_STEPS

  return (
    <Section className="bg-bg" id="how-it-works">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-ink-muted max-w-md mx-auto mb-8">
            Straightforward from first enquiry to move-in, or first conversation to first payout.
          </p>

          <div
            className="inline-flex rounded-xl border border-border bg-surface p-1"
            role="tablist"
            aria-label="How it works for tenants or owners"
          >
            <button
              role="tab"
              aria-selected={tab === 'tenants'}
              id="tab-tenants"
              aria-controls="panel-tenants"
              onClick={() => setTab('tenants')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                tab === 'tenants'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              For tenants
            </button>
            <button
              role="tab"
              aria-selected={tab === 'owners'}
              id="tab-owners"
              aria-controls="panel-owners"
              onClick={() => setTab('owners')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                tab === 'owners'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              For owners
            </button>
          </div>
        </div>

        <div
          id={`panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              <span className="font-heading font-semibold text-5xl text-accent/20 leading-none">
                {step.number}
              </span>
              <div>
                <h3 className="font-medium text-ink text-lg mb-2">{step.title}</h3>
                <p className="text-ink-muted leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
