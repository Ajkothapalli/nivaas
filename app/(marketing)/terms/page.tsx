import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms and conditions for using the Nivaas website and managed rental services in Hyderabad.',
}

export default function TermsPage() {
  return (
    <Section className="pt-14">
      <Container>
        <article className="max-w-2xl text-ink-muted leading-relaxed">
          <h1 className="font-heading font-semibold text-ink text-4xl mb-3 not-prose">
            Terms of Service
          </h1>
          <p className="text-ink-muted mb-8">Last updated: [date to be confirmed]</p>

          <div className="flex flex-col gap-8">
            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">
                1. Agreement to terms
              </h2>
              <p>
                By accessing this website or using Nivaas services, you agree to be bound by these
                terms. If you do not agree, please do not use the site.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">
                2. Website use
              </h2>
              <p>
                This website is for informational purposes and to facilitate enquiries about managed
                rental properties. You may browse and submit enquiries. You may not scrape, copy, or
                reuse any listing content or data without written permission from Nivaas.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">
                3. Accuracy of information
              </h2>
              <p>
                We make reasonable efforts to keep property listings accurate and up to date.
                However, property availability, pricing, and details may change. Nothing on this
                website constitutes a binding offer or contract. Formal agreements are established
                through separate signed documentation.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">
                4. Service terms
              </h2>
              <p>
                Specific terms for tenant subleases and owner master leases are contained in those
                separate agreements. In the event of conflict between these website terms and a
                signed agreement, the signed agreement prevails.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">
                5. Limitation of liability
              </h2>
              <p>
                Nivaas Property Management Pvt. Ltd. is not liable for any indirect, incidental, or
                consequential damages arising from use of this website. Our liability in any
                circumstance is limited to the amount paid by you for the specific service giving
                rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">
                6. Governing law
              </h2>
              <p>
                These terms are governed by the laws of India. Any disputes shall be subject to the
                jurisdiction of courts in Hyderabad, Telangana.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">7. Contact</h2>
              <p>
                For questions about these terms, email{' '}
                <a href="mailto:legal@nivaas.in" className="text-accent hover:underline">
                  legal@nivaas.in
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </Container>
    </Section>
  )
}
