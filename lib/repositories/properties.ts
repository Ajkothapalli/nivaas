import { z } from 'zod'
import { PropertySchema, type Property } from '@/lib/validation/property'
import propertiesJson from '@/data/properties.json'

const properties = z.array(PropertySchema).parse(propertiesJson)

export async function listAvailable(): Promise<Property[]> {
  return properties.filter((p) => p.status === 'available')
}

export async function getBySlug(slug: string): Promise<Property | null> {
  return properties.find((p) => p.slug === slug) ?? null
}

export async function listByLocality(locality: string): Promise<Property[]> {
  return properties.filter((p) => p.locality === locality && p.status === 'available')
}

export async function listFeatured(limit = 6): Promise<Property[]> {
  return properties.filter((p) => p.status === 'available').slice(0, limit)
}
