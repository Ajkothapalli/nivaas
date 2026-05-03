import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

interface CTABlockProps {
  heading: string
  body: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  variant?: 'dark' | 'light'
}

export function CTABlock({
  heading,
  body,
  primaryCta,
  secondaryCta,
  variant = 'dark',
}: CTABlockProps) {
  const isDark = variant === 'dark'

  return (
    <section
      className={`py-20 md:py-28 ${isDark ? 'bg-accent' : 'bg-bg border-y border-border'}`}
    >
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className={`font-heading font-semibold text-3xl md:text-4xl mb-4 ${
              isDark ? 'text-white' : 'text-ink'
            }`}
          >
            {heading}
          </h2>
          <p className={`text-lg mb-10 ${isDark ? 'text-white/80' : 'text-ink-muted'}`}>{body}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={primaryCta.href}>
              <Button
                size="lg"
                className={isDark ? 'bg-white text-accent hover:bg-white/90' : ''}
              >
                {primaryCta.label}
              </Button>
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button
                  variant="secondary"
                  size="lg"
                  className={
                    isDark
                      ? 'border-white/40 text-white hover:bg-white/10 hover:border-white hover:text-white'
                      : ''
                  }
                >
                  {secondaryCta.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
