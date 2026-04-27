'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CTASectionProps {
  headline?: string
  sub?: string
  ctaText?: string
  ctaHref?: string
  note?: string
  dark?: boolean
}

export default function CTASection({
  headline = 'Only 10 Rooms Available',
  sub = '7–11 September 2025 · The Corn Crib, Wiltshire',
  ctaText = 'Apply For Your Place',
  ctaHref = '/apply',
  note = 'Secure with a £500 deposit',
  dark = false,
}: CTASectionProps) {
  return (
    <section
      className={`relative py-20 lg:py-28 overflow-hidden ${
        dark ? 'bg-[#0C0A08]' : 'bg-[#080604]'
      }`}
    >
      {/* Gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196, 150, 58, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            {sub}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#F2EDE4] mb-8 leading-tight">
            {headline}
          </h2>

          {/* Scarcity dots */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i < 3
                    ? 'w-3 h-3 bg-[#C4963A]'
                    : 'w-3 h-3 border border-[rgba(196,150,58,0.3)] bg-transparent'
                }`}
              />
            ))}
            <span className="ml-3 text-[#706050] text-xs tracking-wide">3 of 10 taken</span>
          </div>

          <Link href={ctaHref} className="btn-gold inline-flex text-base" style={{ padding: '1rem 2.75rem' }}>
            <span>{ctaText}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {note && (
            <p className="mt-4 text-[#5A5048] text-sm">{note}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
