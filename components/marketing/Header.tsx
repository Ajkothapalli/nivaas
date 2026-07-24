'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/homes', label: 'Homes' },
  { href: '/services', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/owners', label: 'For Owners' },
  { href: '/tenants', label: 'For Tenants' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b transition-shadow duration-300',
        scrolled ? 'border-border shadow-sm' : 'border-transparent'
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <Image src="/brand/logo.svg" alt="Estate360" width={150} height={32} priority />
          </Link>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-1 after:h-0.5 after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact">
              <Button variant="ghost" size="sm">
                Contact
              </Button>
            </Link>
            <Link href="/homes">
              <Button size="sm">Browse Homes</Button>
            </Link>
          </div>

          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border bg-surface animate-fade-slide-down"
        >
          <Container>
            <nav aria-label="Mobile navigation" className="py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-ink-muted hover:text-ink hover:bg-bg rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Contact
                  </Button>
                </Link>
                <Link href="/homes" onClick={() => setMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Browse Homes
                  </Button>
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
