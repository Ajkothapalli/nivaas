import { MetadataRoute } from 'next'
import { listAvailable } from '@/lib/repositories/properties'
import { listAll as listLocalities } from '@/lib/repositories/localities'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nivaas.in'

const STATIC_PAGES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/homes', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/owners', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/tenants', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/how-it-works', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, localities] = await Promise.all([listAvailable(), listLocalities()])

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  const propertyEntries: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${SITE_URL}/homes/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const localityEntries: MetadataRoute.Sitemap = localities.map((l) => ({
    url: `${SITE_URL}/localities/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  return [...staticEntries, ...propertyEntries, ...localityEntries]
}
