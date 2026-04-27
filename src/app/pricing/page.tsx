import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageSEO, getContent } from '@/lib/content'
import FAQAccordion from '@/components/FAQAccordion'
import CTASection from '@/components/CTASection'

export async function generateMetadata(): Promise<Metadata> {
  const seo = getPageSEO('pricing')
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: { title: seo.ogTitle, description: seo.ogDescription, url: seo.canonicalUrl },
    alternates: { canonical: seo.canonicalUrl },
  }
}

export default function PricingPage() {
  const content = getContent()
  const pricing = content.pages.pricing
  const settings = content.settings

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,150,58,0.07) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative text-center max-w-3xl mx-auto">
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
            Investment
          </p>
          <h1
            className="font-serif font-bold text-[#F2EDE4] mb-6 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.025em' }}
          >
            {pricing.h1 as string}
          </h1>
          <p className="text-[#9A9080] text-lg leading-relaxed">
            {pricing.pricingIntro as string}
          </p>
        </div>
      </section>

      <hr className="divider-gold opacity-20" />

      {/* ─── Pricing Cards ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">

            {/* Per Person */}
            <div className="card-dark p-8 lg:p-10">
              <p className="text-[#706050] text-xs font-medium tracking-[0.2em] uppercase mb-2">Option 01</p>
              <h2 className="font-serif text-2xl font-bold text-[#F2EDE4] mb-1">Per Person</h2>
              <p className="text-[#5A5048] text-sm mb-6">Shared accommodation. Full retreat access.</p>
              <div className="mb-6">
                <p className="font-serif text-5xl font-bold text-[#C4963A]">£{settings.fullPricePP.toLocaleString()}</p>
                <p className="text-[#5A5048] text-sm mt-1">all inclusive</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'All meals & nutrition',
                  'All coaching sessions',
                  'Training programme',
                  'Recovery facilities',
                  'Full venue access',
                  'Post-retreat resources',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#9A9080]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/apply?option=pp" className="btn-ghost w-full text-center block" style={{ padding: '0.875rem' }}>
                Apply — Per Person
              </Link>
            </div>

            {/* Per Room */}
            <div
              className="card-dark p-8 lg:p-10 relative"
              style={{ border: '1px solid rgba(196,150,58,0.3)' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C4963A] px-4 py-1">
                <p className="text-[#080604] text-xs font-bold tracking-[0.15em] uppercase">Best Value</p>
              </div>
              <p className="text-[#C4963A] text-xs font-medium tracking-[0.2em] uppercase mb-2">Option 02</p>
              <h2 className="font-serif text-2xl font-bold text-[#F2EDE4] mb-1">Per Room</h2>
              <p className="text-[#5A5048] text-sm mb-6">Private room for two. Ideal for training partners.</p>
              <div className="mb-6">
                <p className="font-serif text-5xl font-bold text-[#C4963A]">£{settings.fullPriceRoom.toLocaleString()}</p>
                <p className="text-[#5A5048] text-sm mt-1">for two people · £{Math.round(settings.fullPriceRoom / 2).toLocaleString()} each</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Per Person',
                  'Private room for two',
                  'Best value per head',
                  'Ideal for training partners',
                  'Full venue exclusivity',
                  'Priority room selection',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#9A9080]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/apply?option=room" className="btn-gold w-full text-center block" style={{ padding: '0.875rem' }}>
                <span>Apply — Per Room</span>
              </Link>
            </div>
          </div>

          {/* What's included callout */}
          <div className="max-w-4xl mx-auto">
            <div className="card-dark p-8 text-center">
              <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                Everything Included
              </p>
              <p className="text-[#9A9080] mb-6">
                Both options include full board and lodging, all coaching, all training, all recovery facilities, and all meals for the entire 4-day retreat.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['Training', 'Recovery', 'Nutrition', 'Mindset'].map((item) => (
                  <div key={item} className="text-center">
                    <div className="w-8 h-px bg-[#C4963A] mx-auto mb-2" />
                    <p className="text-[#706050] text-xs tracking-widest uppercase">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Payment Options ─── */}
      <section className="section-py bg-[#0C0A08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Flexible Payments
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4] mb-4">
              Pay How It Works For You
            </h2>
            <p className="text-[#706050]">
              We want the investment to be accessible. Three options to make it work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'Pay In Full',
                desc: 'Simplest option. One payment, fully secured. No further action needed until September.',
                highlight: false,
              },
              {
                title: 'Deposit',
                price: `£${settings.depositAmount}`,
                desc: `Secure your place with a £${settings.depositAmount} deposit. Balance due 30 days before the retreat.`,
                highlight: true,
              },
              {
                title: 'Payment Plan',
                desc: 'Spread your payments monthly until August 2025. Start with the deposit and we\'ll agree a schedule.',
                highlight: false,
              },
            ].map((opt) => (
              <div
                key={opt.title}
                className={`card-dark p-7 text-center ${opt.highlight ? 'border border-[rgba(196,150,58,0.25)]' : ''}`}
              >
                {opt.price && (
                  <p className="font-serif text-4xl font-bold text-[#C4963A] mb-2">{opt.price}</p>
                )}
                <h3 className="font-serif text-xl font-semibold text-[#F2EDE4] mb-3">{opt.title}</h3>
                <p className="text-[#706050] text-sm leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[#5A5048] text-xs mt-6">{settings.pricingNote as string}</p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-py">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">FAQ</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4]">
              Questions Answered
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <CTASection />
    </>
  )
}
