import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

interface HeroProps {
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  imageSrc: string
  imageAlt: string
  videoSrc?: string
  tags?: { label: string; href: string }[]
  search?: React.ReactNode
}

export function Hero({
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  videoSrc,
  tags,
  search,
}: HeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] flex overflow-hidden bg-bg',
        search ? 'items-start md:items-center' : 'items-center'
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {videoSrc && (
          <video
            className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
            src={videoSrc}
            poster={imageSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className={cn('object-cover', videoSrc && 'hidden motion-reduce:block')}
        />
        {/* Transparent dark layer so white heading/body text stays readable over the video/image */}
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <Container className="relative z-10 py-20 md:py-24">
        <div className="max-w-2xl">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <Link
                  key={tag.href}
                  href={tag.href}
                  className="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium hover:bg-white/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          )}
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            {heading}
          </h1>
          <p
            className={cn(
              'text-lg md:text-xl text-white/85 leading-relaxed mb-6 md:mb-10 max-w-xl',
              search && 'hidden md:block'
            )}
          >
            {subheading}
          </p>
          <div className={cn('flex flex-wrap gap-4', search && 'hidden md:flex')}>
            <Link href={primaryCta.href}>
              <Button size="lg" className="shadow-lg">
                {primaryCta.label}
              </Button>
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white hover:text-white"
                >
                  {secondaryCta.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>

      {search && <div className="absolute inset-x-0 bottom-6 md:bottom-10 z-20">{search}</div>}
    </section>
  )
}
