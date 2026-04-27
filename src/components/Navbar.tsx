'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/venue', label: 'Venue' },
  { href: '/pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0C0A08]/95 backdrop-blur-xl border-b border-[rgba(196,150,58,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-18 flex items-center justify-between" style={{ height: '72px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="flex items-center gap-1">
              <span
                className="font-serif font-bold text-2xl tracking-tight"
                style={{ color: '#C4963A', letterSpacing: '-0.02em' }}
              >
                MC
              </span>
              <span className="text-[#F2EDE4] font-sans font-light text-sm tracking-[0.25em] uppercase mt-0.5">
                RETREATS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 cursor-pointer ${
                  pathname === link.href
                    ? 'text-[#C4963A]'
                    : 'text-[#A09080] hover:text-[#F2EDE4]'
                }`}
                style={{ letterSpacing: '0.1em' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/apply" className="btn-gold text-sm" style={{ padding: '0.625rem 1.5rem' }}>
              <span>Apply Now</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block h-px bg-[#F2EDE4] transition-all duration-300 ${
                mobileOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'
              }`}
            />
            <span
              className={`block h-px bg-[#F2EDE4] transition-all duration-300 ${
                mobileOpen ? 'opacity-0 w-0' : 'w-4'
              }`}
            />
            <span
              className={`block h-px bg-[#F2EDE4] transition-all duration-300 ${
                mobileOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: '#080604', paddingTop: '72px' }}
          >
            <div className="flex flex-col gap-1 px-6 pt-8 pb-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block py-4 text-2xl font-serif font-medium text-[#F2EDE4] border-b border-[rgba(255,255,255,0.06)] cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-8"
              >
                <Link href="/apply" className="btn-gold w-full text-center">
                  <span>Apply For Your Place</span>
                </Link>
              </motion.div>
            </div>

            <div className="px-6 pb-8">
              <p className="text-[#5A5048] text-xs text-center tracking-widest uppercase">
                7–11 Sept · The Corn Crib, Wiltshire
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
