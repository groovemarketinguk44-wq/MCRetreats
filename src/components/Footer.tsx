import Link from 'next/link'

const links = {
  site: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/experience', label: 'Experience' },
    { href: '/venue', label: 'Venue' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/apply', label: 'Apply' },
    { href: '/contact', label: 'Contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0C0A08] border-t border-[rgba(196,150,58,0.1)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5 cursor-pointer">
              <span className="font-serif font-bold text-2xl" style={{ color: '#C4963A' }}>MC</span>
              <span className="text-[#F2EDE4] font-sans font-light text-sm tracking-[0.25em] uppercase">RETREATS</span>
            </Link>
            <p className="text-[#706050] text-sm leading-relaxed mb-6 max-w-xs">
              rebuild. reset. rise.
            </p>
            <p className="text-[#5A5048] text-xs tracking-wide">
              7–11 September 2025<br />
              The Corn Crib, Wiltshire, UK
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[#C4963A] text-xs font-medium tracking-[0.2em] uppercase mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {links.site.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#706050] hover:text-[#F2EDE4] text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-[#C4963A] text-xs font-medium tracking-[0.2em] uppercase mb-5">
              Secure Your Place
            </h3>
            <p className="text-[#706050] text-sm leading-relaxed mb-6">
              10 rooms. Limited availability. September 2025.
            </p>
            <Link href="/apply" className="btn-gold text-sm" style={{ padding: '0.75rem 1.75rem' }}>
              <span>Apply Now</span>
            </Link>
            <div className="mt-6">
              <p className="text-[#5A5048] text-xs">Questions?</p>
              <a
                href="mailto:info@mcretreats.com"
                className="text-[#A09080] hover:text-[#C4963A] text-sm transition-colors duration-200 cursor-pointer"
              >
                info@mcretreats.com
              </a>
            </div>
          </div>
        </div>

        <hr className="divider-gold my-10 opacity-30" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#5A5048] text-xs">
            © {new Date().getFullYear()} MC Retreats. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="text-[#5A5048] hover:text-[#A09080] text-xs transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-[#5A5048] hover:text-[#A09080] text-xs transition-colors cursor-pointer">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
