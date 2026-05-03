import { z } from 'zod'

export const FurnishingEnum = z.enum(['fully_furnished', 'semi_furnished', 'unfurnished'])

export const PropertyStatusEnum = z.enum(['available', 'reserved', 'rented', 'draft'])

export const PropertyTypeEnum = z.enum(['residential', 'commercial'])

export const ListingTypeEnum = z.enum(['rent', 'lease', 'sale'])

export const LocalityEnum = z.enum([
  'gachibowli',
  'madhapur',
  'kondapur',
  'hitec-city',
  'financial-district',
  'kokapet',
  'narsingi',
])

export const PropertySchema = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(10).max(120),
  locality: LocalityEnum,
  address_line: z.string(),
  lat: z.number(),
  lng: z.number(),
  bhk: z.number().int().min(1).max(6),
  area_sqft: z.number().int().positive(),
  rent_monthly: z.number().int().positive(),
  deposit: z.number().int().nonnegative(),
  furnishing: FurnishingEnum,
  available_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  amenities: z.array(z.string()).min(1),
  description: z.string().min(80).max(800),
  images: z.array(z.string()).min(4).max(10),
  status: PropertyStatusEnum,
  property_type: PropertyTypeEnum,
  listing_type: ListingTypeEnum,
})

export type Property = z.infer<typeof PropertySchema>
export type Furnishing = z.infer<typeof FurnishingEnum>
export type PropertyStatus = z.infer<typeof PropertyStatusEnum>
export type Locality = z.infer<typeof LocalityEnum>
export type PropertyType = z.infer<typeof PropertyTypeEnum>
export type ListingType = z.infer<typeof ListingTypeEnum>
