import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import { PHProvider } from '@/components/providers/PostHogProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Managed Rental Homes in Hyderabad`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nivaas.in'),
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  robots: {
    index: process.env.VERCEL_ENV === 'production',
    follow: process.env.VERCEL_ENV === 'production',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-ink font-body antialiased">
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  )
}
