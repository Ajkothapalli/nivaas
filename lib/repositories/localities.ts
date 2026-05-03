import { z } from 'zod'
import { LocalitySchema, type LocalityData } from '@/lib/validation/locality'
import localitiesJson from '@/data/localities.json'

const localities = z.array(LocalitySchema).parse(localitiesJson)

export async function listAll(): Promise<LocalityData[]> {
  return localities
}

export async function getBySlug(slug: string): Promise<LocalityData | null> {
  return localities.find((l) => l.slug === slug) ?? null
}
