import { NextRequest, NextResponse } from 'next/server'
import { OwnerLeadSchema } from '@/lib/validation/owner-lead'
import { ZodError } from 'zod'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000
  const limit = 5

  const entry = rateLimitMap.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  let data
  try {
    data = OwnerLeadSchema.parse(body)
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 422 })
    }
    throw err
  }

  if (data.honeypot) {
    return NextResponse.json({ success: true })
  }

  if (process.env.NEXT_PUBLIC_USE_DB === 'true') {
    const { createServiceClient } = await import('@/lib/db/supabase')
    const supabase = createServiceClient()
    const { error } = await supabase.from('owner_leads').insert({
      name: data.name,
      phone: data.phone,
      locality: data.locality ?? null,
      community_name: data.community_name ?? null,
      flat_number: data.flat_number ?? null,
      bhk: data.bhk ?? null,
      area_sqft: data.area_sqft ?? null,
      floor_number: data.floor_number ?? null,
      total_floors: data.total_floors ?? null,
      furnishing_type: data.furnishing_type ?? null,
      parking: data.parking ?? null,
      current_status: data.current_status ?? null,
      available_from: data.available_from ?? null,
      num_properties: data.num_properties ?? null,
      expected_rent: data.expected_rent ?? null,
      security_deposit: data.security_deposit ?? null,
      message: data.message ?? null,
    })
    if (error) {
      console.error('Supabase insert error:', error)
    }
  }

  const web3Key = process.env.WEB3FORMS_ACCESS_KEY
  if (web3Key) {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: web3Key,
        subject:
          `New owner lead — ${data.name} | ${data.locality ?? ''} ${data.community_name ?? ''}`.trim(),
        name: data.name,
        phone: data.phone,
        locality: data.locality ?? '',
        community_name: data.community_name ?? '',
        flat_number: data.flat_number ?? '',
        bhk: data.bhk ?? '',
        area_sqft: data.area_sqft ? `${data.area_sqft} sq ft` : '',
        floor:
          data.floor_number != null ? `${data.floor_number} of ${data.total_floors ?? '?'}` : '',
        furnishing_type: data.furnishing_type ?? '',
        parking: data.parking ?? '',
        current_status: data.current_status ?? '',
        available_from: data.available_from ?? '',
        num_properties: data.num_properties ?? '',
        expected_rent: data.expected_rent ? `₹${data.expected_rent}` : '',
        security_deposit: data.security_deposit ? `₹${data.security_deposit}` : '',
        message: data.message ?? '',
      }),
    }).catch((err) => console.error('Web3Forms error:', err))
  }

  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
