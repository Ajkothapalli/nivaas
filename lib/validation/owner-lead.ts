import { z } from 'zod'
import { FurnishingEnum, LocalityEnum } from './property'

export const OwnerLeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  locality: LocalityEnum.optional(),
  num_properties: z.number().int().min(1).max(50).optional(),
  property_type: z.string().max(80).optional(),
  expected_rent: z.number().int().positive().optional(),
  furnishing_type: FurnishingEnum.optional(),
  message: z.string().max(500).optional(),
  honeypot: z.string().max(0).optional(),
})

export type OwnerLeadInput = z.infer<typeof OwnerLeadSchema>
