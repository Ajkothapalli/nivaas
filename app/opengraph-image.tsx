import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Nivaas — Managed Rental Homes in Hyderabad'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2D4A3E',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-1px',
          }}
        >
          Nivaas
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.4,
            maxWidth: 700,
          }}
        >
          Managed rental homes in Hyderabad. No brokerage. One number for everything.
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          nivaas.in
        </div>
      </div>
    ),
    { ...size }
  )
}
