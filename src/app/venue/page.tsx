import type { Metadata } from 'next'
import Image from 'next/image'
import { getPageSEO, getContent } from '@/lib/content'
import CTASection from '@/components/CTASection'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const seo = getPageSEO('venue')
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: { title: seo.ogTitle, description: seo.ogDescription, url: seo.canonicalUrl },
    alternates: { canonical: seo.canonicalUrl },
  }
}

export default function VenuePage() {
  const content = getContent()
  const venue = content.pages.venue
  const imgs = content.images ?? {}
  const alts = content.imageAlts ?? {}
  const titles = content.imageTitles ?? {}

  const img = (key: string, fallback: string) => (imgs[key] as string) || fallback
  const alt = (key: string, fallback: string) => (alts[key] as string) || fallback
  const title = (key: string, fallback: string) => (titles[key] as string) || fallback

  const facilities = [
    { key: 'venue_pool', fallback: '/images/venue/8_pool.jpg', title: 'Indoor Pool' },
    { key: 'venue_sauna', fallback: '/images/venue/4_sauna.jpg', title: 'Sauna' },
    { key: 'venue_kitchen', fallback: '/images/venue/6_kitchen.jpg', title: 'Kitchen / Dining' },
    { key: 'venue_outdoor_dining', fallback: '/images/venue/19_outdoor_dining.jpg', title: 'Outdoor Dining / Lawn' },
    { key: 'venue_firepit', fallback: '/images/venue/1_firepit.jpg', title: 'Fire Pit' },
    { key: 'venue_games_room', fallback: '/images/venue/9_games_room.jpg', title: 'Games Room' },
  ]

  const rooms = [
    { key: 'venue_bunk_room', fallback: '/images/venue/10_bunk_room.jpg', label: 'Bunk Room' },
    { key: 'venue_floral_room', fallback: '/images/venue/11_floral_room.jpg', label: 'Floral Bedroom' },
    { key: 'venue_botanical_room', fallback: '/images/venue/12_botanical_room.jpg', label: 'Green Botanical Bedroom' },
    { key: 'venue_orange_room', fallback: '/images/venue/13_orange_room.jpg', label: 'Orange Bedroom' },
    { key: 'venue_green_floral', fallback: '/images/venue/14_green_floral.jpg', label: 'Green Floral Bedroom' },
  ]

  const outdoor = [
    { key: 'venue_garden', fallback: '/images/venue/18_garden.jpg', label: 'Garden Steps and Lavender' },
    { key: 'venue_pool_dusk', fallback: '/images/venue/3_pool_exterior_dusk.jpg', label: 'Pool Building Exterior at Dusk' },
    { key: 'venue_sunset', fallback: '/images/venue/7_venue_sunset.jpg', label: 'Venue at Sunset' },
  ]

  const extras = [
    { key: 'venue_decking', fallback: '/images/venue/2_decking_views.jpg', label: 'Decking with Views' },
    { key: 'venue_pool_table', fallback: '/images/venue/15_pool_table.jpg', label: 'Pool Table / Spiral Staircase' },
    { key: 'venue_chess', fallback: '/images/venue/16_chess.jpg', label: 'Giant Chess Board' },
    { key: 'venue_bathroom', fallback: '/images/venue/5_bathroom.jpg', label: 'Ensuite Bathroom' },
    { key: 'venue_exterior', fallback: '/images/venue/17_exterior_day.jpg', label: 'Main Building Exterior Day' },
  ]

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[65vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="img-placeholder w-full h-full" />
          <Image
            src={img('venue_full', '/images/venue/20_full_venue.jpg')}
            alt={alt('venue_full', 'The Corn Crib estate, Wiltshire')}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,6,4,0.3) 0%, rgba(8,6,4,0.8) 80%, rgba(8,6,4,1) 100%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-16 pt-40">
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-3">The Venue</p>
          <h1
            className="font-bold text-[#F2EDE4] leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.025em' }}
          >
            {venue.h1 as string}
          </h1>
          <p className="text-[#9A9080] text-lg max-w-2xl">{venue.venueIntro as string}</p>
        </div>
      </section>

      {/* ─── Intro ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-[#9A9080] text-lg leading-relaxed mb-6">
                {venue.venueDescription as string}
              </p>
              <p className="text-[#706050] leading-relaxed">
                With 10 rooms across multiple character-filled spaces, every man has a private environment to sleep, recover, and reflect. The Corn Crib isn't just beautiful — it's functional. Every facility is available exclusively for the group for the full four days.
              </p>
            </div>
            <div className="space-y-4">
              {[
                'Indoor Heated Pool',
                'Sauna',
                'Professional Kitchen',
                '10 Bedrooms — Exclusive Use',
                'Games Room',
                'Outdoor Dining',
                'Private Gardens',
                'Fire Pit',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[#9A9080] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="divider-gold opacity-20" />

      {/* ─── Facilities ─── */}
      <section className="section-py bg-[#0C0A08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">Inside The Corn Crib</p>
            <h2 className="font-bold text-3xl text-[#F2EDE4]">The Facilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {facilities.map((f) => (
              <div key={f.key} className="card-dark overflow-hidden group">
                <div className="relative h-52 img-placeholder overflow-hidden">
                  <Image
                    src={img(f.key, f.fallback)}
                    alt={alt(f.key, f.title)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16130E] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-[#F2EDE4]">{title(f.key, f.title)}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* ─── Rooms ─── */}
          <div className="text-center mb-10">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">Accommodation</p>
            <h2 className="font-bold text-3xl text-[#F2EDE4] mb-3">10 Rooms. Exclusively Yours.</h2>
            <p className="text-[#706050] max-w-xl mx-auto text-sm">
              Each bedroom is individually designed and fully private. Every space, every facility, exclusively yours for four days.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {rooms.map((r) => (
              <div key={r.key} className="group overflow-hidden relative">
                <div className="img-placeholder aspect-square overflow-hidden relative">
                  <Image
                    src={img(r.key, r.fallback)}
                    alt={alt(r.key, r.label)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-[#F2EDE4] text-xs font-medium">{title(r.key, r.label)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Outdoor Spaces ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">Grounds</p>
            <h2 className="font-bold text-3xl text-[#F2EDE4]">The Outdoor Spaces</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {outdoor.map((o) => (
              <div key={o.key} className="relative aspect-[4/3] img-placeholder overflow-hidden group">
                <Image
                  src={img(o.key, o.fallback)}
                  alt={alt(o.key, o.label)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[#F2EDE4] text-sm font-medium mb-1">{title(o.key, o.label)}</p>
                  <p className="text-[#9A9080] text-xs leading-relaxed line-clamp-2">{alt(o.key, '')}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Extra images row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
            {extras.map((e) => (
              <div key={e.key} className="group overflow-hidden relative">
                <div className="img-placeholder aspect-square overflow-hidden relative">
                  <Image
                    src={img(e.key, e.fallback)}
                    alt={alt(e.key, e.label)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-[#F2EDE4] text-xs font-medium">{title(e.key, e.label)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Experience It Yourself?"
        sub="The Corn Crib is exclusively yours for 4 days"
      />
    </>
  )
}
