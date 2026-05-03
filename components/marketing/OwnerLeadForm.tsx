'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { LOCALITIES } from '@/lib/constants'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function OwnerLeadForm() {
  const [state, setState] = useState<FormState>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    if (data.get('website')) {
      setState('success')
      return
    }

    const payload = {
      name: data.get('name') as string,
      phone: data.get('phone') as string,
      locality: data.get('locality') as string,
      num_properties: data.get('num_properties') ? Number(data.get('num_properties')) : undefined,
      property_type: data.get('property_type') as string,
      expected_rent: data.get('expected_rent') ? Number(data.get('expected_rent')) : undefined,
      furnishing_type: data.get('furnishing_type') as string,
      message: data.get('message') as string,
    }

    try {
      const res = await fetch('/api/owner-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setState('success')
        form.reset()
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center">
        <p className="font-heading font-medium text-ink text-lg mb-2">
          We'll be in touch shortly.
        </p>
        <p className="text-ink-muted">
          One of our property managers will call you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this blank</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input id="name" name="name" label="Your name" placeholder="Suresh Reddy" required />
        <Input id="phone" name="phone" type="tel" label="Mobile number" placeholder="98765 43210" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="locality" className="text-sm font-medium text-ink">
          Locality
        </label>
        <select
          id="locality"
          name="locality"
          className="block w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
        >
          <option value="">Select a locality</option>
          {LOCALITIES.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          id="num_properties"
          name="num_properties"
          type="number"
          label="Number of properties"
          placeholder="1"
          min={1}
        />
        <Input
          id="expected_rent"
          name="expected_rent"
          type="number"
          label="Expected monthly rent (₹)"
          placeholder="30000"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="furnishing_type" className="text-sm font-medium text-ink">
          Furnishing
        </label>
        <select
          id="furnishing_type"
          name="furnishing_type"
          className="block w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
        >
          <option value="">Select furnishing</option>
          <option value="fully_furnished">Fully Furnished</option>
          <option value="semi_furnished">Semi-Furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="block w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
          placeholder="Property type, current situation, specific questions..."
        />
      </div>

      {state === 'error' && (
        <p role="alert" className="text-sm text-error">
          Something went wrong. Please try again or contact us directly.
        </p>
      )}

      <Button type="submit" disabled={state === 'submitting'} size="lg" className="self-start">
        {state === 'submitting' ? 'Submitting...' : 'Register your property'}
      </Button>
    </form>
  )
}
