import type { Metadata } from 'next'
import Link from 'next/link'
import { getSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Booking Confirmed | MC Retreats',
  description: 'Your place at MC Retreats has been secured.',
  robots: { index: false, follow: false },
}

export default function SuccessPage() {
  const settings = getSettings()

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(196,150,58,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-xl mx-auto px-6 py-24 text-center">
        {/* Check icon */}
        <div
          className="w-20 h-20 rounded-full border border-[rgba(196,150,58,0.3)] flex items-center justify-center mx-auto mb-8"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C4963A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
          Booking Confirmed
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#F2EDE4] mb-5 leading-tight">
          You're In.
        </h1>
        <p className="text-[#9A9080] text-lg leading-relaxed mb-8">
          {settings.successMessage as string}
        </p>

        <div className="card-dark p-6 text-left mb-8">
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.2em] uppercase mb-4">What Happens Next</p>
          <div className="space-y-4">
            {[
              { num: '01', text: 'Confirmation email sent to your inbox within 5 minutes.' },
              { num: '02', text: 'We\'ll reach out within 24 hours with your pre-retreat welcome pack.' },
              { num: '03', text: 'Full kit list, programme overview, and venue details to follow.' },
              { num: '04', text: 'If you chose a payment plan, we\'ll be in touch to confirm the schedule.' },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-4">
                <span className="text-[#C4963A] font-mono text-sm flex-shrink-0">{step.num}</span>
                <p className="text-[#9A9080] text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-dark p-5 text-center mb-8 border border-[rgba(196,150,58,0.1)]">
          <p className="text-[#F2EDE4] font-medium mb-1">{settings.retreatDates as string}</p>
          <p className="text-[#706050] text-sm">{settings.retreatLocation as string}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-ghost">
            Back to Home
          </Link>
          <a href="mailto:info@mcretreats.com" className="btn-ghost">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
