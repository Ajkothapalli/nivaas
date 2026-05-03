import { NextRequest, NextResponse } from 'next/server'
import { InquirySchema } from '@/lib/validation/inquiry'
import { ZodError } from 'zod'

// Simple in-memory rate limiter: max 5 requests per IP per 10 minutes
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
    data = InquirySchema.parse(body)
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 422 })
    }
    throw err
  }

  // Honeypot
  if (data.honeypot) {
    return NextResponse.json({ success: true })
  }

  // Write to Supabase when NEXT_PUBLIC_USE_DB=true
  if (process.env.NEXT_PUBLIC_USE_DB === 'true') {
    const { createServiceClient } = await import('@/lib/db/supabase')
    const supabase = createServiceClient()
    const { error } = await supabase.from('inquiries').insert({
      name: data.name,
      phone: data.phone,
      move_in_date: data.move_in_date ?? null,
      message: data.message ?? null,
      source_page: data.source_page ?? null,
      unit_id: data.unit_id ?? null,
    })
    if (error) {
      console.error('Supabase insert error:', error)
    }
  }

  // Forward to Web3Forms
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY
  if (web3Key) {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: web3Key,
        subject: `New tenant inquiry from ${data.name}`,
        name: data.name,
        phone: data.phone,
        message: data.message ?? '',
        move_in_date: data.move_in_date ?? '',
        source_page: data.source_page ?? '',
        unit_id: data.unit_id ?? '',
      }),
    }).catch((err) => console.error('Web3Forms error:', err))
  }

  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
