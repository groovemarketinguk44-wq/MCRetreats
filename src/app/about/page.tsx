import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPageSEO, getContent } from '@/lib/content'
import CTASection from '@/components/CTASection'

export async function generateMetadata(): Promise<Metadata> {
  const seo = getPageSEO('about')
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: seo.canonicalUrl,
    },
    alternates: { canonical: seo.canonicalUrl },
  }
}

export default function AboutPage() {
  const content = getContent()
  const about = content.pages.about

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,150,58,0.07) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
            About
          </p>
          <h1 className="font-serif font-bold text-[#F2EDE4] mb-6 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.025em' }}>
            {about.h1 as string}
          </h1>
          <p className="text-[#9A9080] text-xl max-w-2xl leading-relaxed">
            Two coaches. One shared mission. Decades of combined experience distilled into four days that change men.
          </p>
        </div>
      </section>

      <hr className="divider-gold opacity-20" />

      {/* ─── Mission ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-6">
              Why We Built This
            </p>
            <p className="font-serif text-2xl md:text-3xl text-[#F2EDE4] leading-relaxed font-medium">
              "We've worked with hundreds of high-performing men. The pattern is always the same: they know what to do. They just need the right environment to finally do it."
            </p>
            <p className="text-[#C4963A] text-sm mt-6">— Steven Machin & Gaz Crosby</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '200+', label: 'Men Coached' },
              { num: '10+', label: 'Years Combined' },
              { num: '4', label: 'Days. Maximum Impact.' },
            ].map((s) => (
              <div key={s.label} className="card-dark p-8 text-center">
                <p className="font-serif text-4xl font-bold text-[#C4963A] mb-2">{s.num}</p>
                <p className="text-[#706050] text-sm tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Steven ─── */}
      <section className="section-py bg-[#0C0A08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="img-placeholder aspect-[3/4] overflow-hidden relative" style={{ border: '1px solid rgba(196,150,58,0.12)' }}>
                <Image
                  src="/images/people/steven.jpg"
                  alt="Steven Machin — Strength and Conditioning Coach"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#C4963A] px-5 py-3">
                <p className="text-[#080604] font-bold text-sm tracking-wide">MC Retreats</p>
                <p className="text-[#080604] text-xs">Co-Founder</p>
              </div>
            </div>
            <div>
              <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                Coach
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4] mb-2 leading-tight">
                Steven Machin
              </h2>
              <p className="text-[#706050] text-sm tracking-[0.1em] uppercase mb-8">
                Strength · Conditioning · Performance Mindset
              </p>
              <p className="text-[#9A9080] leading-relaxed mb-5">
                {about.stevenBio as string}
              </p>
              <div className="space-y-3 mt-8">
                {[
                  'Strength & conditioning specialist',
                  'Performance mindset coaching',
                  'Bespoke training programme design',
                  'Accountability-led coaching methodology',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-[#C4963A] mt-2 flex-shrink-0" />
                    <p className="text-[#706050] text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gaz ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                Coach
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4] mb-2 leading-tight">
                Gaz Crosby
              </h2>
              <p className="text-[#706050] text-sm tracking-[0.1em] uppercase mb-8">
                Performance · Lifestyle · Accountability
              </p>
              <p className="text-[#9A9080] leading-relaxed mb-5">
                {about.gazBio as string}
              </p>
              <div className="space-y-3 mt-8">
                {[
                  'Functional strength and metabolic performance',
                  'Lifestyle and habit transformation',
                  'Group coaching facilitation',
                  'Nutrition and recovery protocols',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-[#C4963A] mt-2 flex-shrink-0" />
                    <p className="text-[#706050] text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="img-placeholder aspect-[3/4] overflow-hidden relative" style={{ border: '1px solid rgba(196,150,58,0.12)' }}>
                <Image
                  src="/images/people/gaz.jpg"
                  alt="Gaz Crosby — Performance and Lifestyle Coach"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#C4963A] px-5 py-3">
                <p className="text-[#080604] font-bold text-sm tracking-wide">MC Retreats</p>
                <p className="text-[#080604] text-xs">Co-Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Philosophy ─── */}
      <section className="section-py bg-[#0C0A08]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Our Philosophy
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4] mb-10 leading-tight">
            Results Over Comfort. Standards Over Excuses.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Direct',
                desc: 'We tell you exactly what you need to hear. Not what you want to hear. The men we work with respect that.',
              },
              {
                title: 'Evidence-Based',
                desc: 'Every session, every meal, every protocol is grounded in what actually works. No trends. No guesswork.',
              },
              {
                title: 'Long-Term',
                desc: 'Four days is the catalyst. The tools, habits, and mindset you leave with are for life.',
              },
            ].map((p) => (
              <div key={p.title} className="card-dark p-7 text-left">
                <div className="w-6 h-px bg-[#C4963A] mb-5" />
                <h3 className="font-serif text-xl font-semibold text-[#F2EDE4] mb-3">{p.title}</h3>
                <p className="text-[#706050] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
