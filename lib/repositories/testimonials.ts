import { z } from 'zod'
import testimonialsJson from '@/data/testimonials.json'

const TestimonialSchema = z.object({
  id: z.number(),
  type: z.enum(['tenant', 'owner']),
  name: z.string(),
  role: z.string(),
  locality: z.string(),
  quote: z.string(),
  avatar: z.string(),
})

export type Testimonial = z.infer<typeof TestimonialSchema>

const testimonials = z.array(TestimonialSchema).parse(testimonialsJson)

export async function listAll(): Promise<Testimonial[]> {
  return testimonials
}

export async function listByType(type: 'tenant' | 'owner'): Promise<Testimonial[]> {
  return testimonials.filter((t) => t.type === type)
}
