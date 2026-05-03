export const SITE_NAME = 'Nivaas'
export const SITE_DESCRIPTION =
  'Fully managed rental homes in Hyderabad. No brokerage. Single point of contact. Move in without the hassle.'

export const LOCALITIES = [
  { slug: 'gachibowli', name: 'Gachibowli' },
  { slug: 'madhapur', name: 'Madhapur' },
  { slug: 'kondapur', name: 'Kondapur' },
  { slug: 'hitec-city', name: 'HITEC City' },
  { slug: 'financial-district', name: 'Financial District' },
  { slug: 'kokapet', name: 'Kokapet' },
  { slug: 'narsingi', name: 'Narsingi' },
] as const

export const BHK_OPTIONS = [1, 2, 3, 4] as const

export const BUDGET_RANGES = [
  { label: 'Under ₹25,000', min: 0, max: 25000 },
  { label: '₹25,000 – ₹35,000', min: 25000, max: 35000 },
  { label: '₹35,000 – ₹50,000', min: 35000, max: 50000 },
  { label: 'Above ₹50,000', min: 50000, max: Infinity },
] as const

export const FURNISHING_LABELS: Record<string, string> = {
  fully_furnished: 'Fully Furnished',
  semi_furnished: 'Semi-Furnished',
  unfurnished: 'Unfurnished',
}

export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
}

export const LISTING_TYPE_LABELS: Record<string, string> = {
  rent: 'Rent',
  lease: 'Lease',
  sale: 'Sale',
}

export const PROPERTY_TYPES = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
] as const

export const LISTING_TYPES = [
  { value: 'rent', label: 'Rent' },
  { value: 'lease', label: 'Lease' },
  { value: 'sale', label: 'Sale' },
] as const
