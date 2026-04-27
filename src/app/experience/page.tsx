import type { Metadata } from 'next'
import Image from 'next/image'
import { getPageSEO, getContent } from '@/lib/content'
import CTASection from '@/components/CTASection'

export async function generateMetadata(): Promise<Metadata> {
  const seo = getPageSEO('experience')
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: { title: seo.ogTitle, description: seo.ogDescription, url: seo.canonicalUrl },
    alternates: { canonical: seo.canonicalUrl },
  }
}

export default function ExperiencePage() {
  const content = getContent()
  const exp = content.pages.experience

  const pillars = [
    {
      num: '01',
      label: 'Training',
      title: 'Structured Performance Work',
      desc: exp.trainingDesc as string,
      img: '/images/general/1_firepit.jpg',
      imgAlt: 'Outdoor training area at MC Retreats, The Corn Crib',
      items: [
        'Morning conditioning & mobility',
        'Strength training sessions',
        'Metabolic performance work',
        'Movement quality coaching',
        'Personalised load management',
      ],
    },
    {
      num: '02',
      label: 'Recovery',
      title: 'Active Restoration Protocols',
      desc: exp.recoveryDesc as string,
      img: '/images/venue/4_sauna.jpg',
      imgAlt: 'Sauna at The Corn Crib — recovery facility for MC Retreats',
      items: [
        'Cold plunge sessions (progressive)',
        'Finnish sauna access',
        'Guided breathwork',
        'Contrast therapy protocols',
        'Sleep optimisation coaching',
      ],
    },
    {
      num: '03',
      label: 'Nutrition',
      title: 'Performance Fuelling System',
      desc: exp.nutritionDesc as string,
      img: '/images/venue/6_kitchen.jpg',
      imgAlt: 'Professional kitchen for prepared meals at MC Retreats',
      items: [
        'All meals planned and prepared',
        'High-protein, whole-food approach',
        'Meal timing around training',
        'Nutrition education sessions',
        'Practical strategies to take home',
      ],
    },
    {
      num: '04',
      label: 'Mindset',
      title: 'Psychology of High Performance',
      desc: exp.mindsetDesc as string,
      img: '/images/venue/2_decking_views.jpg',
      imgAlt: 'Outdoor space for mindset coaching at MC Retreats Wiltshire',
      items: [
        'Group performance psychology sessions',
        'Identity and behaviour change',
        'Pattern recognition and interruption',
        'Goal architecture and accountability',
        'Long-term performance framework',
      ],
    },
  ]

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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
            The Experience
          </p>
          <h1
            className="font-serif font-bold text-[#F2EDE4] mb-6 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.025em' }}
          >
            {exp.h1 as string}
          </h1>
          <p className="text-[#9A9080] text-xl max-w-2xl leading-relaxed">
            Four pillars. Every day. Every session built with intention. This is what four transformational days looks like.
          </p>
        </div>
      </section>

      <hr className="divider-gold opacity-20" />

      {/* ─── Four Pillars ─── */}
      {pillars.map((pillar, i) => (
        <section key={pillar.num} className={`section-py ${i % 2 === 1 ? 'bg-[#0C0A08]' : ''}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={i % 2 === 1 ? 'order-2 lg:order-1' : ''}>
                <p className="text-[#5A5048] font-mono text-sm mb-2">{pillar.num}</p>
                <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-3">
                  {pillar.label}
                </p>
                <h2
                  className="font-serif font-bold text-[#F2EDE4] mb-5 leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em' }}
                >
                  {pillar.title}
                </h2>
                <p className="text-[#9A9080] leading-relaxed mb-8">{pillar.desc}</p>
                <ul className="space-y-3">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[#706050] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative ${i % 2 === 1 ? 'order-1 lg:order-2' : ''}`}>
                <div
                  className="img-placeholder aspect-[4/3] overflow-hidden relative"
                  style={{ border: '1px solid rgba(196,150,58,0.12)' }}
                >
                  <Image
                    src={pillar.img}
                    alt={pillar.imgAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  className="absolute top-4 left-4 font-mono text-8xl font-bold leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(196,150,58,0.08)' }}
                >
                  {pillar.num}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── Sample Day ─── */}
      <section className="section-py bg-[#0C0A08]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              A Day In The Life
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4]">
              Sample Day Schedule
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { time: '06:30', title: 'Cold Plunge & Morning Activation', type: 'Recovery' },
              { time: '07:30', title: 'Performance Breakfast', type: 'Nutrition' },
              { time: '08:30', title: 'Strength & Conditioning Session', type: 'Training' },
              { time: '10:30', title: 'Recovery — Sauna + Stretch', type: 'Recovery' },
              { time: '12:30', title: 'Nutrition Session + Lunch', type: 'Nutrition' },
              { time: '14:00', title: 'Mindset Group Session', type: 'Mindset' },
              { time: '16:00', title: 'Metabolic Session', type: 'Training' },
              { time: '18:00', title: 'Pool Recovery + Free Time', type: 'Recovery' },
              { time: '19:30', title: 'Performance Dinner', type: 'Nutrition' },
              { time: '21:00', title: 'Evening Debrief + Reflection', type: 'Mindset' },
            ].map((item) => (
              <div key={item.time} className="card-dark flex items-center gap-5 px-6 py-4">
                <span className="text-[#C4963A] font-mono text-sm w-14 flex-shrink-0">{item.time}</span>
                <div className="h-4 w-px bg-[rgba(196,150,58,0.2)] flex-shrink-0" />
                <span className="text-[#F2EDE4] text-sm flex-1">{item.title}</span>
                <span
                  className="hidden sm:inline text-xs px-2.5 py-1 border flex-shrink-0"
                  style={{
                    color: 'rgba(196,150,58,0.7)',
                    borderColor: 'rgba(196,150,58,0.2)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.type}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[#5A5048] text-xs text-center mt-6">
            * Schedule indicative. Final programme confirmed pre-retreat.
          </p>
        </div>
      </section>

      {/* ─── What You Leave With ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              The Output
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4]">
              What You Leave With
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Physical Reset', desc: 'A leaner, stronger body with the foundation laid for continued progress.' },
              { title: 'Training System', desc: 'A structured programme you can take home and execute.' },
              { title: 'Nutrition Blueprint', desc: 'A simple, effective approach to eating for performance.' },
              { title: 'Mental Framework', desc: 'Tools for accountability, discipline, and long-term performance.' },
            ].map((item) => (
              <div key={item.title} className="card-dark p-6">
                <div className="w-5 h-5 border border-[#C4963A] flex items-center justify-center mb-4">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#F2EDE4] mb-2">{item.title}</h3>
                <p className="text-[#706050] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
