import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

interface HeroProps {
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  imageSrc: string
  imageAlt: string
}

export function Hero({
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
}: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-bg">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/50" />
      </div>

      <Container className="relative z-10 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            {heading}
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-xl">
            {subheading}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={primaryCta.href}>
              <Button size="lg" className="shadow-lg">
                {primaryCta.label}
              </Button>
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button variant="secondary" size="lg" className="bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white hover:text-white">
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
