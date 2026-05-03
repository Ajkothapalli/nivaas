import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'

const FOOTER_LINKS = {
  Homes: [
    { href: '/homes', label: 'Browse all homes' },
    { href: '/localities/gachibowli', label: 'Gachibowli' },
    { href: '/localities/madhapur', label: 'Madhapur' },
    { href: '/localities/hitec-city', label: 'HITEC City' },
    { href: '/localities/financial-district', label: 'Financial District' },
  ],
  Company: [
    { href: '/about', label: 'About Nivaas' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact us' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy policy' },
    { href: '/terms', label: 'Terms of service' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container>
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/brand/logo-white.svg"
              alt="Nivaas"
              width={100}
              height={28}
              className="mb-4"
            />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Fully managed rental homes in Hyderabad's IT corridor. One point of contact, no
              brokerage.
            </p>
            <p className="mt-4 text-xs text-white/40">
              Nivaas Property Management Pvt. Ltd.
              <br />
              Hyderabad, Telangana 500032
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                {title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Nivaas Property Management Pvt. Ltd. All rights
            reserved.
          </p>
          <p className="text-xs text-white/40">Made with care in Hyderabad</p>
        </div>
      </Container>
    </footer>
  )
}
