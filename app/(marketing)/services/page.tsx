import type { Metadata } from 'next'
import { Services } from '@/components/marketing/Services'
import { CTABlock } from '@/components/marketing/CTABlock'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Maintenance Services — Painting, Plumbing, Electrical, Seepage',
  description:
    'Book painting, plumbing, electrical, and seepage treatment in Hyderabad. The same maintenance team Estate360 uses to manage its homes, available for one-off jobs.',
}

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-14 pb-0 md:pb-0">
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-heading font-semibold text-ink text-4xl md:text-5xl mb-6 leading-tight">
              Maintenance Services
            </h1>
            <p className="text-xl text-ink-muted leading-relaxed">
              Painting, plumbing, electrical work, and seepage treatment — carried out by the same
              vetted team that maintains every Estate360 home. You do not need to be a tenant or an
              owner with us to book a job.
            </p>
          </div>
        </Container>
      </Section>

      <Services />

      <Reveal>
        <CTABlock
          heading="Need a Service Done?"
          body="Share the address and the issue on WhatsApp. We will send a quote before any work begins."
          primaryCta={{ label: 'Contact Us', href: '/contact' }}
          secondaryCta={{ label: 'Learn how it works', href: '/how-it-works' }}
          variant="light"
        />
      </Reveal>
    </>
  )
}
