'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { LOCALITIES } from '@/lib/constants'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const ICONS = {
  user: <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />,
  pin: (
    <>
      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1118 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18M6 21V6a1 1 0 011-1h6a1 1 0 011 1v15M14 21v-9a1 1 0 011-1h4a1 1 0 011 1v9" />
      <path d="M9 8h.01M9 12h.01M9 16h.01" />
    </>
  ),
  rupee: <path d="M6 4h12M6 9h12M6 4c3.5 0 6 1.5 6 5s-2.5 5-6 5h-1l7 6" />,
  note: <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />,
  check: <path d="M20 6L9 17l-5-5" />,
}

function StepIcon({ path }: { path: React.ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}

const STEPS = [
  { label: 'Your Details', icon: ICONS.user },
  { label: 'Location', icon: ICONS.pin },
  { label: 'Property', icon: ICONS.building },
  { label: 'Pricing', icon: ICONS.rupee },
  { label: 'Final Details', icon: ICONS.note },
]

interface Values {
  name: string
  phone: string
  locality: string
  community_name: string
  flat_number: string
  bhk: string
  area_sqft: string
  furnishing_type: string
  floor_number: string
  total_floors: string
  parking: string
  current_status: string
  available_from: string
  num_properties: string
  expected_rent: string
  security_deposit: string
  message: string
}

const INITIAL_VALUES: Values = {
  name: '',
  phone: '',
  locality: '',
  community_name: '',
  flat_number: '',
  bhk: '',
  area_sqft: '',
  furnishing_type: '',
  floor_number: '',
  total_floors: '',
  parking: '',
  current_status: '',
  available_from: '',
  num_properties: '',
  expected_rent: '',
  security_deposit: '',
  message: '',
}

export function OwnerLeadForm() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Values>(INITIAL_VALUES)
  const [showErrors, setShowErrors] = useState(false)
  const [state, setState] = useState<FormState>('idle')
  const honeypotRef = useRef<HTMLInputElement>(null)

  const set =
    (key: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }))

  const nameError =
    showErrors && values.name.trim().length < 2 ? 'Please enter your name' : undefined
  const phoneError =
    showErrors && !/^[6-9]\d{9}$/.test(values.phone)
      ? 'Please enter a valid 10-digit mobile number'
      : undefined
  const step0Valid = values.name.trim().length >= 2 && /^[6-9]\d{9}$/.test(values.phone)

  function goNext() {
    if (step === 0 && !step0Valid) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function goBack() {
    setShowErrors(false)
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!step0Valid) {
      setStep(0)
      setShowErrors(true)
      return
    }

    setState('submitting')

    if (honeypotRef.current?.value) {
      setState('success')
      return
    }

    const num = (v: string) => (v ? Number(v) : undefined)

    const payload = {
      name: values.name,
      phone: values.phone,
      locality: values.locality || undefined,
      community_name: values.community_name || undefined,
      flat_number: values.flat_number || undefined,
      bhk: num(values.bhk),
      area_sqft: num(values.area_sqft),
      floor_number: num(values.floor_number),
      total_floors: num(values.total_floors),
      furnishing_type: values.furnishing_type || undefined,
      parking: values.parking || undefined,
      current_status: values.current_status || undefined,
      available_from: values.available_from || undefined,
      num_properties: num(values.num_properties),
      expected_rent: num(values.expected_rent),
      security_deposit: num(values.security_deposit),
      message: values.message || undefined,
    }

    try {
      const res = await fetch('/api/owner-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setState('success')
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
        className="rounded-2xl border border-accent/20 bg-accent/5 p-10 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-accent">
            <StepIcon path={ICONS.check} />
          </span>
        </div>
        <p className="font-heading font-medium text-ink text-xl mb-2">We'll be in touch shortly.</p>
        <p className="text-ink-muted">
          One of our property managers will call you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this blank</label>
        <input
          ref={honeypotRef}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Step indicator */}
      <div className="flex items-center">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-start flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors duration-300 flex-shrink-0',
                  i < step
                    ? 'bg-accent border-accent text-white'
                    : i === step
                      ? 'border-accent text-accent bg-accent/10'
                      : 'border-border text-ink-muted'
                )}
              >
                <StepIcon path={i < step ? ICONS.check : s.icon} />
              </div>
              <span
                className={cn(
                  'text-xs hidden sm:block whitespace-nowrap',
                  i === step ? 'text-ink font-medium' : 'text-ink-muted'
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2 mt-[17px] transition-colors duration-300',
                  i < step ? 'bg-accent' : 'bg-border'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div key={step} className="flex flex-col gap-5 animate-fade-in">
        {step === 0 && (
          <>
            <div>
              <h3 className="font-heading font-medium text-ink text-lg mb-1">
                Let's start with you
              </h3>
              <p className="text-sm text-ink-muted">
                Just your name and number — we'll call to get the rest.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                id="name"
                label="Your name"
                placeholder="Suresh Reddy"
                value={values.name}
                onChange={set('name')}
                error={nameError}
              />
              <Input
                id="phone"
                type="tel"
                label="Mobile number"
                placeholder="98765 43210"
                value={values.phone}
                onChange={set('phone')}
                error={phoneError}
              />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <h3 className="font-heading font-medium text-ink text-lg mb-1">
                Where is the property?
              </h3>
              <p className="text-sm text-ink-muted">
                Optional — skip anything you don't have handy.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Select
                id="locality"
                label="Locality"
                value={values.locality}
                onChange={set('locality')}
              >
                <option value="">Select a locality</option>
                {LOCALITIES.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {l.name}
                  </option>
                ))}
              </Select>
              <Input
                id="community_name"
                label="Society / Community name"
                placeholder="e.g. Prestige High Fields"
                value={values.community_name}
                onChange={set('community_name')}
              />
            </div>
            <Input
              id="flat_number"
              label="Flat / unit number"
              placeholder="e.g. B-704"
              value={values.flat_number}
              onChange={set('flat_number')}
            />
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <h3 className="font-heading font-medium text-ink text-lg mb-1">
                Tell us about the property
              </h3>
              <p className="text-sm text-ink-muted">
                Rough numbers are fine — we'll confirm on the visit.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <Select id="bhk" label="BHK" value={values.bhk} onChange={set('bhk')}>
                <option value="">Select BHK</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} BHK
                  </option>
                ))}
              </Select>
              <Input
                id="area_sqft"
                type="number"
                label="Area (sq ft)"
                placeholder="1200"
                min={100}
                value={values.area_sqft}
                onChange={set('area_sqft')}
              />
              <Select
                id="furnishing_type"
                label="Furnishing"
                value={values.furnishing_type}
                onChange={set('furnishing_type')}
              >
                <option value="">Select furnishing</option>
                <option value="fully_furnished">Fully Furnished</option>
                <option value="semi_furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </Select>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <Input
                id="floor_number"
                type="number"
                label="Floor number"
                placeholder="7"
                min={0}
                value={values.floor_number}
                onChange={set('floor_number')}
              />
              <Input
                id="total_floors"
                type="number"
                label="Total floors"
                placeholder="14"
                min={1}
                value={values.total_floors}
                onChange={set('total_floors')}
              />
              <Select id="parking" label="Parking" value={values.parking} onChange={set('parking')}>
                <option value="">Select parking</option>
                <option value="covered">Covered</option>
                <option value="open">Open</option>
                <option value="none">None</option>
              </Select>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <h3 className="font-heading font-medium text-ink text-lg mb-1">
                Availability and pricing
              </h3>
              <p className="text-sm text-ink-muted">
                Give us a starting figure — we'll assess and confirm.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Select
                id="current_status"
                label="Current status"
                value={values.current_status}
                onChange={set('current_status')}
              >
                <option value="">Select status</option>
                <option value="vacant">Vacant</option>
                <option value="occupied">Occupied (tenant moving out)</option>
              </Select>
              <Input
                id="available_from"
                type="date"
                label="Available from"
                value={values.available_from}
                onChange={set('available_from')}
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <Input
                id="num_properties"
                type="number"
                label="No. of properties"
                placeholder="1"
                min={1}
                value={values.num_properties}
                onChange={set('num_properties')}
              />
              <Input
                id="expected_rent"
                type="number"
                label="Expected rent (₹)"
                placeholder="30000"
                value={values.expected_rent}
                onChange={set('expected_rent')}
              />
              <Input
                id="security_deposit"
                type="number"
                label="Deposit expected (₹)"
                placeholder="60000"
                value={values.security_deposit}
                onChange={set('security_deposit')}
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div>
              <h3 className="font-heading font-medium text-ink text-lg mb-1">Anything else?</h3>
              <p className="text-sm text-ink-muted">
                Recent renovations, special requirements — totally optional.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-ink">
                Additional notes
              </label>
              <textarea
                id="message"
                rows={4}
                value={values.message}
                onChange={set('message')}
                className="block w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
                placeholder="Current condition, recent renovations, special requirements..."
              />
            </div>
          </>
        )}
      </div>

      {state === 'error' && (
        <p role="alert" className="text-sm text-error">
          Something went wrong. Please try again or contact us directly.
        </p>
      )}

      <div className="flex items-center justify-between pt-2">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={goBack}>
            Back
          </Button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <Button key="continue" type="button" onClick={goNext}>
            Continue
          </Button>
        ) : (
          <Button key="submit" type="submit" disabled={state === 'submitting'} size="lg">
            {state === 'submitting' ? 'Submitting...' : 'Post your property'}
          </Button>
        )}
      </div>
    </form>
  )
}
