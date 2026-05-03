import { type OwnerLeadInput } from '@/lib/validation/owner-lead'

export async function createOwnerLead(data: OwnerLeadInput): Promise<{ id: string }> {
  // Swap point: when NEXT_PUBLIC_USE_DB=true, replace body with Supabase insert
  return { id: crypto.randomUUID() }
}
