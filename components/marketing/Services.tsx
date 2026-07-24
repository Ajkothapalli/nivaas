import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { whatsappLink } from '@/lib/whatsapp'
import { resizeImage } from '@/lib/image'

const SERVICES = [
  {
    slug: 'painting',
    title: 'Painting',
    photo: '/Images/Painting.avif',
    icon: '/Images/icons/paintbrush-3d.png',
    alt: 'Painter finishing an interior wall in a Hyderabad flat',
    iconAlt: '3D icon of a paintbrush',
    description:
      'Interior and exterior painting by vetted contractors, from a single wall touch-up to a full repaint before a new tenant moves in.',
  },
  {
    slug: 'plumbing',
    title: 'Plumbing',
    photo: '/Images/Plumbing.avif',
    icon: '/Images/icons/wrench-3d.png',
    alt: 'Plumber repairing a tap and pipe fitting',
    iconAlt: '3D icon of a hammer and wrench',
    description:
      'Leaking taps, blocked drains, geyser faults, and pipe fittings — resolved by our maintenance team, usually within 24 hours.',
  },
  {
    slug: 'electrical',
    title: 'Electrical',
    photo: resizeImage(
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?fit=crop',
      900
    ),
    icon: '/Images/icons/electrical-3d.png',
    alt: 'Electrician in a hard hat working on a wall-mounted electrical panel',
    iconAlt: '3D icon of an electric plug',
    description:
      'Wiring, switchboards, fittings, and appliance connections, handled safely by licensed electricians.',
  },
  {
    slug: 'seepage',
    title: 'Seepage Treatment',
    icon: '/Images/icons/seepage-3d.png',
    alt: '3D icon of a water droplet',
    iconAlt: '3D icon of a water droplet',
    description:
      'Damp walls and ceiling seepage diagnosed at the source and waterproofed, not just painted over.',
  },
]

export function Services() {
  return (
    <Section className="bg-bg" id="services">
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => {
            const link = whatsappLink({
              message: `Hi, I'd like to book ${service.title.toLowerCase()} service with Estate360.`,
            })

            return (
              <Reveal key={service.slug} delay={i * 100}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {service.photo ? (
                      <Image
                        src={service.photo}
                        alt={service.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg to-border/50">
                        <div className="relative w-24 h-24 group-hover:scale-110 transition-transform duration-500">
                          <Image
                            src={service.icon}
                            alt={service.alt}
                            fill
                            sizes="96px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-5 gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <Image
                          src={service.icon}
                          alt={service.iconAlt}
                          fill
                          sizes="24px"
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-heading font-medium text-ink text-lg">{service.title}</h3>
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <span className="mt-2 text-sm font-medium text-accent group-hover:underline">
                      Book on WhatsApp
                    </span>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
