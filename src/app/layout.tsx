import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mc-retreats.fly.dev'),
  title: {
    default: 'MC Retreats | Elite Fitness Retreat — Wiltshire, September 2025',
    template: '%s | MC Retreats',
  },
  description:
    'A 4-day elite performance retreat for 10 men at The Corn Crib, Wiltshire. 7–11 September 2025.',
  openGraph: { type: 'website', siteName: 'MC Retreats', locale: 'en_GB' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#080604] text-[#F2EDE4] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
