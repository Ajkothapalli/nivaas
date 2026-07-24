import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { CountUp } from '@/components/marketing/CountUp'

const STATS = [
  { value: '7', label: 'Localities Covered' },
  { value: '0%', label: 'Brokerage Fee' },
  { value: '24 Hr', label: 'Maintenance Response' },
  { value: '100%', label: 'Verified, Managed Listings' },
]

export function StatsStrip() {
  return (
    <div className="bg-surface border-b border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 md:divide-x divide-border">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100} className="text-center px-4 py-8">
              <p className="font-heading font-semibold text-ink text-3xl md:text-4xl mb-1 tabular-nums">
                <CountUp value={stat.value} />
              </p>
              <p className="text-sm text-ink-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  )
}
