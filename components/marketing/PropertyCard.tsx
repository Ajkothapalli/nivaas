import Image from 'next/image'
import Link from 'next/link'
import { type Property } from '@/lib/validation/property'
import { formatRent, formatArea, formatBHK } from '@/lib/format'
import { FURNISHING_LABELS, LISTING_TYPE_LABELS, PROPERTY_TYPE_LABELS } from '@/lib/constants'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/homes/${property.slug}`}
      className="group flex flex-col bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={`${property.title} — living area`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-accent text-white text-xs font-medium px-2.5 py-1 rounded-lg">
            {LISTING_TYPE_LABELS[property.listing_type]}
          </span>
          <span className="bg-ink/70 text-white text-xs font-medium px-2.5 py-1 rounded-lg">
            {PROPERTY_TYPE_LABELS[property.property_type]}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-xs text-ink-muted font-medium capitalize mb-1">
            {property.locality.replace(/-/g, ' ')}
          </p>
          <h3 className="font-heading font-medium text-ink text-lg leading-snug line-clamp-2">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-sm text-ink-muted">
          <span>{formatBHK(property.bhk)}</span>
          <span aria-hidden="true">·</span>
          <span>{formatArea(property.area_sqft)}</span>
          <span aria-hidden="true">·</span>
          <span>{FURNISHING_LABELS[property.furnishing]}</span>
        </div>

        <div className="mt-auto pt-3 border-t border-border flex items-end justify-between">
          <div>
            <p className="text-xs text-ink-muted">Monthly rent</p>
            <p className="text-xl font-heading font-semibold text-ink">
              {formatRent(property.rent_monthly)}
            </p>
          </div>
          <span className="text-sm font-medium text-accent group-hover:underline">
            View details
          </span>
        </div>
      </div>
    </Link>
  )
}
