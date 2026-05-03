import { z } from 'zod'
import { PropertySchema } from '../lib/validation/property'
import { LocalitySchema } from '../lib/validation/locality'
import propertiesJson from '../data/properties.json'
import localitiesJson from '../data/localities.json'
import faqsJson from '../data/faqs.json'
import testimonialsJson from '../data/testimonials.json'

let hasErrors = false

function validate(name: string, schema: z.ZodSchema, data: unknown) {
  const result = schema.safeParse(data)
  if (result.success) {
    console.log(`✓ ${name}`)
  } else {
    console.error(`✗ ${name}`)
    result.error.errors.forEach((e) => {
      console.error(`  [${e.path.join('.')}] ${e.message}`)
    })
    hasErrors = true
  }
}

const FaqSchema = z.object({
  id: z.number(),
  category: z.string(),
  question: z.string().min(10),
  answer: z.string().min(20),
})

const TestimonialSchema = z.object({
  id: z.number(),
  type: z.enum(['tenant', 'owner']),
  name: z.string(),
  role: z.string(),
  locality: z.string(),
  quote: z.string().min(20),
  avatar: z.string(),
})

validate('properties.json', z.array(PropertySchema), propertiesJson)
validate('localities.json', z.array(LocalitySchema), localitiesJson)
validate('faqs.json', z.array(FaqSchema), faqsJson)
validate('testimonials.json', z.array(TestimonialSchema), testimonialsJson)

if (hasErrors) {
  console.error('\nData validation failed. Fix the errors above before continuing.')
  process.exit(1)
} else {
  console.log('\nAll data files are valid.')
}
