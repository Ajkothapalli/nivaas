import { z } from 'zod'

export const LocalitySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(2).max(80),
  tagline: z.string().min(10).max(200),
  description: z.string().min(200).max(1500),
  avg_rent_min: z.number().int().positive(),
  avg_rent_max: z.number().int().positive(),
  it_parks: z.array(z.string()).min(1),
  landmarks: z.array(z.string()).min(1),
  transit: z.array(z.string()),
  image: z.string(),
})

export type LocalityData = z.infer<typeof LocalitySchema>
