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
      num_properties: data.num_properties ?? null,
      property_type: data.property_type ?? null,
      expected_rent: data.expected_rent ?? null,
      furnishing_type: data.furnishing_type ?? null,
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
        subject: `New owner lead from ${data.name}`,
        name: data.name,
        phone: data.phone,
        locality: data.locality ?? '',
        num_properties: data.num_properties ?? '',
        expected_rent: data.expected_rent ?? '',
        furnishing_type: data.furnishing_type ?? '',
        message: data.message ?? '',
      }),
    }).catch((err) => console.error('Web3Forms error:', err))
  }

  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
