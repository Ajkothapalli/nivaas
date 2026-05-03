'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  function openLightbox(index: number) {
    setActiveIndex(index)
    setLightboxOpen(true)
  }

  function closeLightbox() {
    setLightboxOpen(false)
  }

  function prevImage() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length)
  }

  function nextImage() {
    setActiveIndex((i) => (i + 1) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden">
        <button
          onClick={() => openLightbox(0)}
          className="col-span-4 md:col-span-2 row-span-2 relative aspect-[4/3] md:aspect-auto overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`View ${title} gallery image 1`}
        >
          <Image
            src={images[0]}
            alt={`${title} — main photo`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </button>

        {images.slice(1, 5).map((src, i) => (
          <button
            key={src}
            onClick={() => openLightbox(i + 1)}
            className="hidden md:block relative aspect-square overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`View ${title} gallery image ${i + 2}`}
          >
            <Image
              src={src}
              alt={`${title} — photo ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
                <span className="text-white font-medium">+{images.length - 5} more</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full aspect-[16/9]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} — photo ${activeIndex + 1} of ${images.length}`}
              fill
              sizes="90vw"
              className="object-contain"
            />

            <button
              onClick={prevImage}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <button
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
