import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Nivaas privacy policy — how we collect, use, and protect your personal data.',
}

export default function PrivacyPage() {
  return (
    <Section className="pt-14">
      <Container>
        <article className="max-w-2xl prose-sm text-ink-muted leading-relaxed">
          <h1 className="font-heading font-semibold text-ink text-4xl mb-3 not-prose">
            Privacy Policy
          </h1>
          <p className="text-ink-muted mb-8 not-prose">Last updated: [date to be confirmed]</p>

          <div className="flex flex-col gap-8">
            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">1. Who we are</h2>
              <p>
                Nivaas Property Management Pvt. Ltd. (&ldquo;Nivaas&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;) operates this website. Our registered address is in Hyderabad,
                Telangana, India.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">2. What we collect</h2>
              <p>
                When you submit an inquiry or contact form, we collect your name, phone number, and
                any message you choose to include. We also collect standard web analytics data
                (pages visited, time on site, device type) via PostHog.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">
                3. How we use your data
              </h2>
              <p>
                We use the information you provide to respond to your inquiry, schedule property
                visits, and — if you become a tenant or registered owner — to administer your
                relationship with Nivaas. We do not sell or share your personal data with third
                parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">4. Data retention</h2>
              <p>
                Inquiry data is retained for 12 months from the date of submission. If a tenancy or
                owner agreement is entered into, relevant data is retained for the duration of the
                agreement plus 3 years as required by applicable Indian law.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">5. Your rights</h2>
              <p>
                You may request access to, correction of, or deletion of any personal data we hold
                about you. To exercise these rights, email us at{' '}
                <a
                  href="mailto:privacy@nivaas.in"
                  className="text-accent hover:underline"
                >
                  privacy@nivaas.in
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">6. Cookies</h2>
              <p>
                We use PostHog analytics, which sets cookies to track aggregate usage patterns. No
                advertising or tracking cookies from third-party ad networks are used.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">
                7. Changes to this policy
              </h2>
              <p>
                We may update this policy. The date at the top of the page reflects the most recent
                revision. Continued use of the site after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-medium text-ink text-xl mb-3">8. Contact</h2>
              <p>
                For privacy queries, email{' '}
                <a href="mailto:privacy@nivaas.in" className="text-accent hover:underline">
                  privacy@nivaas.in
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
