import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPageSEO, getSettings, getContent } from '@/lib/content'
import CTASection from '@/components/CTASection'
import ScarcityBar from '@/components/ScarcityBar'
import HomeClient from './HomeClient'

export async function generateMetadata(): Promise<Metadata> {
  const seo = getPageSEO('home')
  const settings = getSettings()
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: seo.canonicalUrl,
      type: 'website',
    },
    alternates: { canonical: seo.canonicalUrl },
  }
}

export default function HomePage() {
  const content = getContent()
  const { pages, settings } = content
  const home = pages.home

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'MC Retreats — Elite Fitness Retreat',
    description: home.metaDescription,
    startDate: '2025-09-07',
    endDate: '2025-09-11',
    location: {
      '@type': 'Place',
      name: 'The Corn Crib',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Wiltshire',
        addressCountry: 'GB',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'MC Retreats',
      url: settings.siteUrl,
    },
    offers: {
      '@type': 'Offer',
      price: '1495',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/LimitedAvailability',
      url: `${settings.siteUrl}/apply`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <div className="img-placeholder w-full h-full" />
          <Image
            src="/images/venue/7_venue_sunset.jpg"
            alt="The Corn Crib venue at sunset, Wiltshire"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,6,4,0.55) 0%, rgba(8,6,4,0.4) 40%, rgba(8,6,4,0.75) 80%, rgba(8,6,4,0.95) 100%)',
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-24">
          <HomeClient home={home} settings={settings} />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[#F2EDE4] text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#C4963A] to-transparent" />
        </div>
      </section>

      <ScarcityBar />

      {/* ─── Stats Bar ─── */}
      <section className="py-14 border-b border-[rgba(196,150,58,0.08)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '4', label: 'Days' },
              { num: '10', label: 'Rooms Only' },
              { num: '2', label: 'Elite Coaches' },
              { num: '£1,495', label: 'Per Person' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="font-serif text-4xl md:text-5xl font-bold mb-1"
                  style={{ color: '#C4963A' }}
                >
                  {stat.num}
                </p>
                <p className="text-[#706050] text-xs tracking-[0.2em] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What This Is ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                The Retreat
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2EDE4] leading-tight mb-6">
                {home.h1 as string}
              </h2>
              <p className="text-[#9A9080] text-lg leading-relaxed mb-6">
                {home.subheadline as string}
              </p>
              <p className="text-[#706050] leading-relaxed mb-8">
                {home.whoDescription as string}
              </p>
              <Link href="/experience" className="btn-ghost inline-flex">
                See the Experience
              </Link>
            </div>
            <div className="relative">
              <div
                className="img-placeholder rounded-none aspect-[4/5] overflow-hidden"
                style={{ border: '1px solid rgba(196,150,58,0.12)' }}
              >
                <Image
                  src="/images/venue/17_exterior_day.jpg"
                  alt="The Corn Crib exterior, Wiltshire fitness retreat venue"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="absolute -bottom-4 -right-4 bg-[#C4963A] px-6 py-4"
                style={{ zIndex: 10 }}
              >
                <p className="text-[#080604] font-bold text-sm tracking-wide uppercase">Sept 7–11</p>
                <p className="text-[#080604] text-xs">Wiltshire, UK</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Who It's For ─── */}
      <section className="section-py bg-[#0C0A08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Is This For You?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4] leading-tight">
              Built For High-Performing Men
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "You've lost your edge",
                desc: 'Training has become inconsistent. Results have stalled. The drive that used to be automatic has faded.',
              },
              {
                title: 'You need accountability',
                desc: "You know what to do. The environment around you just doesn't demand it.",
              },
              {
                title: "You're ready to invest",
                desc: 'In time, in money, in discomfort. You understand that the best returns come from serious commitment.',
              },
              {
                title: 'You want real results',
                desc: 'Not just for 4 days. You want a physical and mental reset that sticks when you return home.',
              },
              {
                title: 'You thrive around like-minded men',
                desc: 'Small group. Shared standards. The kind of people who push you without needing to compete.',
              },
              {
                title: 'You want the full picture',
                desc: "Training alone isn't enough. You want the nutrition, recovery, mindset piece, all working together.",
              },
            ].map((item) => (
              <div key={item.title} className="card-dark p-6">
                <div className="w-6 h-px bg-[#C4963A] mb-4" />
                <h3 className="font-serif text-xl font-semibold text-[#F2EDE4] mb-3">{item.title}</h3>
                <p className="text-[#706050] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Experience Preview ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Four Pillars
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4] leading-tight mb-4">
              What Awaits You
            </h2>
            <p className="text-[#706050]">{home.experienceIntro as string}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2v6m0 0C6 11 8 14 12 14s6-3 6-6M6 8H2m4 0h12m4 0h-4M18 2v6M6 14v8m12-8v8" />
                  </svg>
                ),
                label: 'Training',
                title: 'Structured Performance',
                desc: 'Morning conditioning, strength work, metabolic sessions. Pushed with purpose.',
                img: '/images/general/1_firepit.jpg',
                imgAlt: 'Training session at MC Retreats',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                label: 'Recovery',
                title: 'Active Restoration',
                desc: 'Cold plunge, sauna, breathwork. Recovery as a performance tool.',
                img: '/images/venue/4_sauna.jpg',
                imgAlt: 'Sauna recovery facility at The Corn Crib',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
                  </svg>
                ),
                label: 'Nutrition',
                title: 'Performance Fuelling',
                desc: 'Every meal planned. High protein, whole foods. You learn the method.',
                img: '/images/venue/6_kitchen.jpg',
                imgAlt: 'Professional kitchen for nutrition at MC Retreats',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                ),
                label: 'Mindset',
                title: 'Psychology of Performance',
                desc: 'Group sessions on what holds you back. Leave with a framework for life.',
                img: '/images/venue/2_decking_views.jpg',
                imgAlt: 'Outdoor space for mindset sessions at MC Retreats',
              },
            ].map((item) => (
              <div key={item.label} className="card-dark group overflow-hidden">
                <div className="relative h-56 img-placeholder overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.imgAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16130E] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon}
                    <span className="text-[#C4963A] text-xs font-medium tracking-[0.2em] uppercase">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#F2EDE4] mb-2">{item.title}</h3>
                  <p className="text-[#706050] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/experience" className="btn-ghost inline-flex">
              Full Programme Details
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Venue Preview ─── */}
      <section className="section-py bg-[#0C0A08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: '/images/venue/8_pool.jpg', alt: 'Heated outdoor pool', aspect: 'aspect-square' },
                  { src: '/images/venue/3_pool_exterior_dusk.jpg', alt: 'Pool at dusk', aspect: 'aspect-square' },
                  { src: '/images/venue/18_garden.jpg', alt: 'Private gardens', aspect: 'aspect-square' },
                  { src: '/images/venue/19_outdoor_dining.jpg', alt: 'Outdoor dining area', aspect: 'aspect-square' },
                ].map((img) => (
                  <div key={img.src} className={`img-placeholder ${img.aspect} overflow-hidden relative`}>
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                The Venue
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4] leading-tight mb-6">
                The Corn Crib, Wiltshire
              </h2>
              <p className="text-[#9A9080] leading-relaxed mb-4">
                A private estate taken exclusively for 10 men. No distractions. No other guests. Just the environment you need to perform.
              </p>
              <p className="text-[#706050] leading-relaxed mb-8">
                Heated outdoor pool, Finnish sauna, professional kitchen, games room, and stunning Wiltshire countryside on all sides.
              </p>
              <Link href="/venue" className="btn-ghost inline-flex">
                Explore The Venue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Coaches Preview ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Your Coaches
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4]">
              Experience You Can Trust
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Steven Machin',
                role: 'Strength & Conditioning',
                img: '/images/people/steven.jpg',
                quote: 'I don\'t work with excuses. I work with results.',
              },
              {
                name: 'Gaz Crosby',
                role: 'Performance & Lifestyle',
                img: '/images/people/gaz.jpg',
                quote: 'Most men know what to do. They just need the right environment to do it.',
              },
            ].map((coach) => (
              <div key={coach.name} className="card-dark p-8 flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 rounded-full img-placeholder mb-5 relative overflow-hidden border-2"
                  style={{ borderColor: 'rgba(196,150,58,0.3)' }}
                >
                  <Image src={coach.img} alt={`${coach.name}, fitness coach`} fill className="object-cover" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#F2EDE4] mb-1">{coach.name}</h3>
                <p className="text-[#C4963A] text-xs tracking-[0.15em] uppercase mb-5">{coach.role}</p>
                <p className="text-[#9A9080] text-sm italic leading-relaxed">"{coach.quote}"</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/about" className="btn-ghost inline-flex">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Pricing Preview ─── */}
      <section className="section-py bg-[#0C0A08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Investment
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4] mb-4">
              Clear, Straightforward Pricing
            </h2>
            <p className="text-[#706050]">
              Everything included. No hidden costs. Flexible payment options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                title: 'Per Person',
                price: '£1,495',
                desc: 'Shared room. All inclusive.',
                featured: false,
              },
              {
                title: 'Per Room',
                price: '£2,200',
                desc: 'Private room for two. All inclusive.',
                featured: true,
              },
            ].map((plan) => (
              <div
                key={plan.title}
                className={`card-dark p-8 text-center ${
                  plan.featured
                    ? 'border border-[rgba(196,150,58,0.3)]'
                    : ''
                }`}
              >
                {plan.featured && (
                  <p className="text-[#C4963A] text-xs font-medium tracking-[0.2em] uppercase mb-4">
                    Best Value
                  </p>
                )}
                <h3 className="font-serif text-xl font-semibold text-[#F2EDE4] mb-3">{plan.title}</h3>
                <p className="text-5xl font-serif font-bold text-[#C4963A] mb-3">{plan.price}</p>
                <p className="text-[#706050] text-sm mb-6">{plan.desc}</p>
                <p className="text-[#5A5048] text-xs">or secure with £500 deposit</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/pricing" className="btn-ghost inline-flex mr-4">
              View Full Pricing
            </Link>
            <Link href="/apply" className="btn-gold inline-flex">
              <span>Apply Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials Placeholder ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              What Men Say
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2EDE4]">
              Real Experiences
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Four days that changed how I approach training, food, and myself. The level of coaching is something I've never experienced before.",
                name: 'J.M.',
                role: 'Business Owner',
              },
              {
                quote: "I'd been in a rut for two years. This reset everything. The venue, the coaches, the group — exactly what I needed.",
                name: 'R.T.',
                role: 'Financial Director',
              },
              {
                quote: 'Not a spa break. Not a bootcamp. Something in between and better than both. Came home a different person.',
                name: 'D.H.',
                role: 'Entrepreneur',
              },
            ].map((t) => (
              <div key={t.name} className="card-dark p-7">
                <p className="text-[#C4963A] text-2xl font-serif mb-4">"</p>
                <p className="text-[#9A9080] text-sm leading-relaxed mb-6 italic">{t.quote}</p>
                <div className="border-t border-[rgba(196,150,58,0.1)] pt-5">
                  <p className="text-[#F2EDE4] font-medium text-sm">{t.name}</p>
                  <p className="text-[#5A5048] text-xs mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Only 10 Rooms. One Chance."
        sub="7–11 September 2025 · The Corn Crib, Wiltshire"
        ctaText="Apply For Your Place"
        ctaHref="/apply"
        note="Secure your place with a £500 deposit"
      />
    </>
  )
}
