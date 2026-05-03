import { z } from 'zod'

export const InquirySchema = z.object({
  unit_id: z.string().uuid().optional(),
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  move_in_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  message: z.string().max(500).optional(),
  source_page: z.string().optional(),
  honeypot: z.string().max(0).optional(),
})

export type InquiryInput = z.infer<typeof InquirySchema>
