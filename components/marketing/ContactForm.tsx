'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot check
    if (data.get('website')) {
      setState('success')
      return
    }

    const payload = {
      name: data.get('name') as string,
      phone: data.get('phone') as string,
      message: data.get('message') as string,
      source_page: '/contact',
    }

    try {
      const res = await fetch('/api/inquiries', {
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
      <div
        role="status"
        className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center"
      >
        <p className="font-heading font-medium text-ink text-lg mb-2">
          We received your message.
        </p>
        <p className="text-ink-muted">
          A member of our team will be in touch within one business day.
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

      <Input id="name" name="name" label="Your name" placeholder="Ravi Kumar" required />
      <Input
        id="phone"
        name="phone"
        type="tel"
        label="Mobile number"
        placeholder="98765 43210"
        required
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us what you're looking for..."
          className="block w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200 resize-none"
        />
      </div>

      {state === 'error' && (
        <p role="alert" className="text-sm text-error">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      <Button type="submit" disabled={state === 'submitting'} className="self-start">
        {state === 'submitting' ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}
