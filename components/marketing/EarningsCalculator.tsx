'use client'

import { useState } from 'react'
import { formatRent } from '@/lib/format'

const LOCALITY_RANGES: Record<string, { min: number; max: number }> = {
  'hitec-city': { min: 25000, max: 60000 },
  gachibowli: { min: 28000, max: 55000 },
  madhapur: { min: 22000, max: 40000 },
  kondapur: { min: 20000, max: 38000 },
  'financial-district': { min: 28000, max: 50000 },
  kokapet: { min: 18000, max: 38000 },
  narsingi: { min: 15000, max: 32000 },
}

const MANAGEMENT_FEE = 0.1

export function EarningsCalculator() {
  const [locality, setLocality] = useState('')
  const [bhk, setBhk] = useState('')
  const [expectedRent, setExpectedRent] = useState('')

  const rent = Number(expectedRent)
  const netPayout = rent > 0 ? Math.round(rent * (1 - MANAGEMENT_FEE)) : 0
  const annualPayout = netPayout * 12

  const range = locality ? LOCALITY_RANGES[locality] : null

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <h2 className="font-heading font-semibold text-ink text-2xl mb-2">
        Estimate Your Monthly Payout
      </h2>
      <p className="text-ink-muted text-sm mb-6">
        Enter your property details to see a rough estimate. Actual payouts are agreed in writing
        after a free property visit.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="calc-locality" className="text-sm font-medium text-ink">
            Locality
          </label>
          <select
            id="calc-locality"
            value={locality}
            onChange={(e) => {
              setLocality(e.target.value)
              setExpectedRent('')
            }}
            className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">Select locality</option>
            {Object.entries(LOCALITY_RANGES).map(([slug, r]) => (
              <option key={slug} value={slug}>
                {slug
                  .split('-')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')}{' '}
                (₹{(r.min / 1000).toFixed(0)}k–₹{(r.max / 1000).toFixed(0)}k)
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="calc-bhk" className="text-sm font-medium text-ink">
            Property size
          </label>
          <select
            id="calc-bhk"
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">Select BHK</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} BHK
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="calc-rent" className="text-sm font-medium text-ink">
            Expected market rent (₹)
          </label>
          <input
            id="calc-rent"
            type="number"
            min={0}
            step={1000}
            placeholder={range ? `${range.min}–${range.max}` : 'e.g. 30000'}
            value={expectedRent}
            onChange={(e) => setExpectedRent(e.target.value)}
            className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          {range && (
            <p className="text-xs text-ink-muted">
              Typical range: ₹{range.min.toLocaleString('en-IN')}–₹
              {range.max.toLocaleString('en-IN')}
            </p>
          )}
        </div>
      </div>

      {netPayout > 0 && (
        <div className="rounded-xl bg-accent/5 border border-accent/20 p-5 flex flex-col sm:flex-row gap-6">
          <div>
            <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1">
              Monthly payout
            </p>
            <p className="font-heading font-semibold text-ink text-3xl">{formatRent(netPayout)}</p>
            <p className="text-xs text-ink-muted mt-1">After 10% management fee</p>
          </div>
          <div className="sm:border-l sm:border-border sm:pl-6">
            <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1">
              Annual payout
            </p>
            <p className="font-heading font-semibold text-ink text-3xl">
              {formatRent(annualPayout)}
            </p>
            <p className="text-xs text-ink-muted mt-1">Paid to you on the 5th of every month</p>
          </div>
        </div>
      )}

      {!netPayout && (
        <div className="rounded-xl bg-bg border border-border p-4 text-sm text-ink-muted text-center">
          Enter an expected rent above to see your estimated monthly payout.
        </div>
      )}

      <p className="text-xs text-ink-muted mt-4">
        This is a rough estimate for illustration only. The actual payout is agreed after a free
        property visit and assessment. Fill in the form below to get started.
      </p>
    </div>
  )
}
