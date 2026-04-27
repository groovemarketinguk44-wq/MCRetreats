'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface HomeClientProps {
  home: Record<string, unknown>
  settings: Record<string, unknown>
}

export default function HomeClient({ home, settings }: HomeClientProps) {
  const headline = (home.heroHeadline as string) || 'Rebuild. Reset. Rise.'
  const subheadline = (home.heroSubheadline as string) || ''
  const badge = (home.heroBadge as string) || `${settings.retreatDates} · ${settings.retreatLocation}`
  const ctaText = (home.heroCtaText as string) || 'Apply For Your Place'
  const note = (home.heroNote as string) || 'Secure your place with a £500 deposit · Only 10 rooms'

  const headlineParts = headline.split('.')

  return (
    <div className="max-w-4xl">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[#C4963A] text-xs font-medium tracking-[0.4em] uppercase mb-6"
      >
        {badge}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-bold text-[#F2EDE4] mb-6"
        style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', letterSpacing: '-0.03em', lineHeight: '0.95' }}
      >
        {headlineParts.map((part, i) => (
          <span key={i}>
            {part.trim()}
            {i < headlineParts.length - 1 && (
              <span style={{ color: '#C4963A' }}>.</span>
            )}
            {i < headlineParts.length - 2 ? ' ' : ''}
          </span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="text-[#C0B0A0] text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl font-light"
      >
        {subheadline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 items-start"
      >
        <Link href="/apply" className="btn-gold text-base" style={{ padding: '1.125rem 3rem' }}>
          <span>{ctaText}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <Link href="/experience" className="btn-ghost text-base">
          See The Experience
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="mt-6 text-[#5A5048] text-sm"
      >
        {note}
      </motion.p>
    </div>
  )
}
