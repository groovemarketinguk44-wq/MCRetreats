import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact MC Retreats | Get In Touch',
  description: 'Questions about MC Retreats? Get in touch with us. We\'ll respond within 24 hours.',
}

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,150,58,0.06) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative text-center">
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">Contact</p>
          <h1 className="font-serif font-bold text-[#F2EDE4] mb-5 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.025em' }}>
            Get In Touch
          </h1>
          <p className="text-[#9A9080] text-lg">
            Questions about the retreat? We'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              {
                title: 'Email',
                value: 'info@mcretreats.com',
                href: 'mailto:info@mcretreats.com',
              },
              {
                title: 'Dates',
                value: '7–11 September 2025',
                href: null,
              },
              {
                title: 'Location',
                value: 'The Corn Crib, Wiltshire',
                href: null,
              },
            ].map((item) => (
              <div key={item.title} className="card-dark p-6 text-center">
                <p className="text-[#C4963A] text-xs font-medium tracking-[0.2em] uppercase mb-3">{item.title}</p>
                {item.href ? (
                  <a href={item.href} className="text-[#F2EDE4] text-sm hover:text-[#C4963A] transition-colors cursor-pointer">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[#9A9080] text-sm">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="card-dark p-8">
            <h2 className="font-serif text-xl font-bold text-[#F2EDE4] mb-6">Send a Message</h2>
            <form
              action="mailto:info@mcretreats.com"
              method="get"
              encType="text/plain"
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                {['Name', 'Email'].map((f) => (
                  <div key={f}>
                    <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">{f}</label>
                    <input
                      type={f === 'Email' ? 'email' : 'text'}
                      name={f.toLowerCase()}
                      placeholder={f === 'Name' ? 'Your Name' : 'your@email.com'}
                      className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] placeholder-[#3A3028] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">Message</label>
                <textarea
                  name="body"
                  placeholder="Your question or message..."
                  rows={5}
                  className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] placeholder-[#3A3028] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors resize-none"
                />
              </div>
              <button type="submit" className="btn-gold w-full" style={{ padding: '1rem' }}>
                <span>Send Message</span>
              </button>
            </form>
          </div>

          <div className="mt-10 text-center">
            <p className="text-[#5A5048] text-sm mb-4">Ready to secure your place?</p>
            <Link href="/apply" className="btn-ghost inline-flex">
              Apply For Your Place
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
