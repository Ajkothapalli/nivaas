import type { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from './constants'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nivaas.in'

export function buildMetadata(opts: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  const url = `${SITE_URL}${opts.path}`
  const image = opts.image ?? `${SITE_URL}/brand/og-default.png`

  return {
    title: `${opts.title} | ${SITE_NAME}`,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  }
}

export function propertyJsonLd(property: {
  title: string
  description: string
  address_line: string
  rent_monthly: number
  locality: string
  slug: string
  images: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${SITE_URL}/homes/${property.slug}`,
    image: property.images.map((img) => `${SITE_URL}${img}`),
    offers: {
      '@type': 'Offer',
      price: property.rent_monthly,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address_line,
      addressLocality: property.locality,
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.svg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Telugu', 'Hindi'],
    },
  }
}
