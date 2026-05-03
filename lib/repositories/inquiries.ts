import { type InquiryInput } from '@/lib/validation/inquiry'

export async function createInquiry(data: InquiryInput): Promise<{ id: string }> {
  // Swap point: when NEXT_PUBLIC_USE_DB=true, replace body with Supabase insert
  // For now, always returns a synthetic ID — the API route handles actual persistence
  return { id: crypto.randomUUID() }
}
