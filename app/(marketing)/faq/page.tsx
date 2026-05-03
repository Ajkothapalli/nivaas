import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import faqs from '@/data/faqs.json'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions from tenants and property owners about renting and listing with Nivaas in Hyderabad.',
}

type Category = 'tenants' | 'owners' | 'general'
const CATEGORY_LABELS: Record<Category, string> = {
  tenants: 'For Tenants',
  owners: 'For Owners',
  general: 'General',
}

const CATEGORIES: Category[] = ['tenants', 'owners', 'general']

export default function FAQPage() {
  return (
    <>
      <Section className="pb-10 pt-14">
        <Container>
          <h1 className="font-heading font-semibold text-ink text-4xl mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-ink-muted text-lg max-w-xl">
            If your question is not here, WhatsApp or call us.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="max-w-3xl flex flex-col gap-14">
            {CATEGORIES.map((category) => {
              const items = faqs.filter((f) => f.category === category)
              if (!items.length) return null
              return (
                <div key={category}>
                  <h2 className="font-heading font-medium text-ink text-2xl mb-6">
                    {CATEGORY_LABELS[category]}
                  </h2>
                  <dl className="flex flex-col gap-6">
                    {items.map((faq) => (
                      <div key={faq.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <dt className="font-medium text-ink mb-2">{faq.question}</dt>
                        <dd className="text-ink-muted leading-relaxed">{faq.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>
    </>
  )
}
