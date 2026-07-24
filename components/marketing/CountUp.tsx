'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: string
}

export function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(() => {
    const match = value.match(/^(\d+)(.*)$/)
    return match ? `0${match[2]}` : value
  })

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/)
    const node = ref.current
    if (!match || !node) {
      setDisplay(value)
      return
    }

    const target = parseInt(match[1], 10)
    const suffix = match[2]

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    let started = false
    const duration = 1000

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(`${Math.round(target * eased)}${suffix}`)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{display}</span>
}
