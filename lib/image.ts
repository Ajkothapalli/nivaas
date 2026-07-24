/**
 * Requests a right-sized variant of a remote image for the context it's
 * rendered in (card thumbnail vs. full-bleed hero vs. gallery), instead of
 * always fetching whatever resolution is stored in the data file. Unsplash
 * source URLs already carry `w`/`q` params sized for their largest use
 * (e.g. a lightbox); card grids only need enough pixels for ~2x retina at
 * their actual rendered width, and requesting less cuts the origin fetch
 * Next's image optimizer has to wait on before it can even start resizing.
 */
export function resizeImage(src: string, width: number, quality = 70): string {
  try {
    const url = new URL(src)
    if (url.hostname === 'images.unsplash.com') {
      url.searchParams.set('w', String(width))
      url.searchParams.set('q', String(quality))
      return url.toString()
    }
  } catch {
    // Not an absolute URL (e.g. a local /public path) — return unchanged.
  }
  return src
}
