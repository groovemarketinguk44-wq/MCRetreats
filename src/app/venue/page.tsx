import type { Metadata } from 'next'
import Image from 'next/image'
import { getPageSEO, getContent } from '@/lib/content'
import CTASection from '@/components/CTASection'

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

const images = [
  { src: '/images/venue/1_firepit.jpg', alt: 'Outdoor firepit area — gather under the stars after training', caption: 'Evening Firepit', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/2_decking_views.jpg', alt: 'Elevated decking with panoramic Wiltshire countryside views', caption: 'Decking & Views', span: 'col-span-1 row-span-2' },
  { src: '/images/venue/3_pool_exterior_dusk.jpg', alt: 'Heated outdoor pool at dusk — the centrepiece of The Corn Crib', caption: 'Pool at Dusk', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/4_sauna.jpg', alt: 'Finnish sauna for recovery sessions', caption: 'Finnish Sauna', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/5_bathroom.jpg', alt: 'Premium bathroom facilities', caption: 'Bathrooms', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/6_kitchen.jpg', alt: 'Professional fully-equipped kitchen for performance nutrition', caption: 'Professional Kitchen', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/7_venue_sunset.jpg', alt: 'The Corn Crib at golden hour, Wiltshire', caption: 'Golden Hour', span: 'col-span-2 row-span-1' },
  { src: '/images/venue/8_pool.jpg', alt: 'Heated outdoor swimming pool — recovery and relaxation', caption: 'Outdoor Pool', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/9_games_room.jpg', alt: 'Games room for evening relaxation', caption: 'Games Room', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/10_bunk_room.jpg', alt: 'Bunk room accommodation', caption: 'Bunk Room', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/11_floral_room.jpg', alt: 'Floral bedroom suite', caption: 'Floral Room', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/12_botanical_room.jpg', alt: 'Botanical bedroom with premium furnishings', caption: 'Botanical Room', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/13_orange_room.jpg', alt: 'Orange bedroom suite', caption: 'Orange Room', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/14_green_floral.jpg', alt: 'Green floral bedroom', caption: 'Green Floral Room', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/15_pool_table.jpg', alt: 'Pool table in the games area', caption: 'Pool Table', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/16_chess.jpg', alt: 'Giant outdoor chess — strategy in fresh air', caption: 'Outdoor Chess', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/17_exterior_day.jpg', alt: 'The Corn Crib main exterior in daylight', caption: 'The Exterior', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/18_garden.jpg', alt: 'Manicured private gardens', caption: 'Private Gardens', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/19_outdoor_dining.jpg', alt: 'Al fresco dining area for performance meals', caption: 'Outdoor Dining', span: 'col-span-1 row-span-1' },
  { src: '/images/venue/20_full_venue.jpg', alt: 'Full aerial or panoramic view of The Corn Crib estate', caption: 'The Full Estate', span: 'col-span-2 row-span-1' },
]

export default function VenuePage() {
  const content = getContent()
  const venue = content.pages.venue

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="img-placeholder w-full h-full" />
          <Image
            src="/images/venue/20_full_venue.jpg"
            alt="The Corn Crib estate, Wiltshire — exclusive retreat venue"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,6,4,0.3) 0%, rgba(8,6,4,0.8) 80%, rgba(8,6,4,1) 100%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-16 pt-40">
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-3">The Venue</p>
          <h1
            className="font-serif font-bold text-[#F2EDE4] leading-tight mb-4"
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
                { icon: '⊙', label: 'Heated Outdoor Pool' },
                { icon: '⊙', label: 'Finnish Sauna' },
                { icon: '⊙', label: 'Professional Kitchen' },
                { icon: '⊙', label: '10 Bedroom Rooms' },
                { icon: '⊙', label: 'Games Room' },
                { icon: '⊙', label: 'Outdoor Dining' },
                { icon: '⊙', label: 'Private Gardens' },
                { icon: '⊙', label: 'Firepit Area' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4963A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[#9A9080] text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="divider-gold opacity-20" />

      {/* ─── Featured Images ─── */}
      <section className="section-py bg-[#0C0A08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">Inside The Corn Crib</p>
            <h2 className="font-serif text-3xl font-bold text-[#F2EDE4]">The Facilities</h2>
          </div>

          {/* Key facility cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                src: '/images/venue/8_pool.jpg',
                alt: 'Heated outdoor pool at The Corn Crib',
                title: 'Heated Outdoor Pool',
                desc: 'The social heart of the estate. Used for active recovery, contrast therapy, and relaxation between sessions.',
              },
              {
                src: '/images/venue/4_sauna.jpg',
                alt: 'Finnish sauna at The Corn Crib for recovery',
                title: 'Finnish Sauna',
                desc: 'Full-size sauna, used in structured contrast therapy protocols alongside cold plunge for maximal recovery.',
              },
              {
                src: '/images/venue/6_kitchen.jpg',
                alt: 'Professional kitchen for nutrition at MC Retreats',
                title: 'Professional Kitchen',
                desc: 'Chef-grade kitchen where all performance meals are prepared. Nutrition education happens here too.',
              },
              {
                src: '/images/venue/19_outdoor_dining.jpg',
                alt: 'Outdoor dining area at The Corn Crib',
                title: 'Outdoor Dining',
                desc: 'Meals taken al fresco when weather allows. The group dynamic starts over good food in a great setting.',
              },
              {
                src: '/images/venue/1_firepit.jpg',
                alt: 'Firepit at The Corn Crib Wiltshire',
                title: 'Evening Firepit',
                desc: 'Each evening ends here. Debrief, connect, reflect. Some of the most valuable conversations happen around a fire.',
              },
              {
                src: '/images/venue/9_games_room.jpg',
                alt: 'Games room at The Corn Crib',
                title: 'Games Room',
                desc: 'Downtime is part of recovery. A full games room for evenings when the body needs rest and the mind needs play.',
              },
            ].map((item) => (
              <div key={item.title} className="card-dark overflow-hidden group">
                <div className="relative h-52 img-placeholder overflow-hidden">
                  <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16130E] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-[#F2EDE4] mb-2">{item.title}</h3>
                  <p className="text-[#706050] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Rooms */}
          <div className="text-center mb-10">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">Accommodation</p>
            <h2 className="font-serif text-3xl font-bold text-[#F2EDE4] mb-3">10 Rooms. Exclusively Yours.</h2>
            <p className="text-[#706050] max-w-xl mx-auto text-sm">
              Each bedroom is individually designed and fully private. The Corn Crib has been booked exclusively for the group — every space, every facility, for four days.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { src: '/images/venue/10_bunk_room.jpg', alt: 'Bunk room', label: 'Bunk Room' },
              { src: '/images/venue/11_floral_room.jpg', alt: 'Floral bedroom', label: 'Floral Room' },
              { src: '/images/venue/12_botanical_room.jpg', alt: 'Botanical bedroom', label: 'Botanical Room' },
              { src: '/images/venue/13_orange_room.jpg', alt: 'Orange bedroom suite', label: 'Orange Room' },
              { src: '/images/venue/14_green_floral.jpg', alt: 'Green floral bedroom', label: 'Green Floral' },
            ].map((room) => (
              <div key={room.label} className="group overflow-hidden relative">
                <div className="img-placeholder aspect-square overflow-hidden relative">
                  <Image src={room.src} alt={room.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-[#F2EDE4] text-xs font-medium">{room.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Outdoor ─── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">Grounds</p>
            <h2 className="font-serif text-3xl font-bold text-[#F2EDE4]">The Outdoor Spaces</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { src: '/images/venue/18_garden.jpg', alt: 'Private gardens at The Corn Crib', caption: 'Private Gardens' },
              { src: '/images/venue/3_pool_exterior_dusk.jpg', alt: 'Pool exterior at dusk', caption: 'Pool at Dusk' },
              { src: '/images/venue/7_venue_sunset.jpg', alt: 'Venue at golden hour', caption: 'Golden Hour' },
            ].map((img) => (
              <div key={img.caption} className="relative aspect-[4/3] img-placeholder overflow-hidden group cursor-pointer">
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[#F2EDE4] text-sm font-medium">{img.caption}</p>
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
