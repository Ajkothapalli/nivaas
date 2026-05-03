import Image from 'next/image'
import Link from 'next/link'
import { type LocalityData } from '@/lib/validation/locality'
import { formatRent } from '@/lib/format'

interface LocalityCardProps {
  locality: LocalityData
}

export function LocalityCard({ locality }: LocalityCardProps) {
  return (
    <Link
      href={`/localities/${locality.slug}`}
      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden aspect-[3/2] shadow-sm hover:shadow-md transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Image
        src={locality.image}
        alt={`${locality.name} neighbourhood in Hyderabad`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

      <div className="relative z-10 p-5">
        <h3 className="font-heading font-medium text-white text-xl mb-1">{locality.name}</h3>
        <p className="text-sm text-white/80">
          {formatRent(locality.avg_rent_min)} – {formatRent(locality.avg_rent_max)} /mo
        </p>
      </div>
    </Link>
  )
}
