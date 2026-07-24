import { z } from 'zod'
import { FurnishingEnum, LocalityEnum } from './property'

export const OwnerLeadSchema = z.object({
  // Owner contact
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),

  // Property location
  locality: LocalityEnum.optional(),
  community_name: z.string().max(100).optional(),
  flat_number: z.string().max(20).optional(),

  // Property details
  bhk: z.number().int().min(1).max(6).optional(),
  area_sqft: z.number().int().positive().max(20000).optional(),
  floor_number: z.number().int().min(0).max(100).optional(),
  total_floors: z.number().int().min(1).max(100).optional(),
  furnishing_type: FurnishingEnum.optional(),
  parking: z.enum(['covered', 'open', 'none']).optional(),

  // Status & availability
  current_status: z.enum(['vacant', 'occupied']).optional(),
  available_from: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),

  // Financials
  num_properties: z.number().int().min(1).max(50).optional(),
  expected_rent: z.number().int().positive().optional(),
  security_deposit: z.number().int().nonnegative().optional(),

  message: z.string().max(500).optional(),
  honeypot: z.string().max(0).optional(),
})

export type OwnerLeadInput = z.infer<typeof OwnerLeadSchema>
