import type { Metadata } from 'next'
import { getPageSEO, getContent } from '@/lib/content'
import ApplyForm from './ApplyForm'

export async function generateMetadata(): Promise<Metadata> {
  const seo = getPageSEO('apply')
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: { title: seo.ogTitle, description: seo.ogDescription, url: seo.canonicalUrl },
    alternates: { canonical: seo.canonicalUrl },
  }
}

export default function ApplyPage() {
  const content = getContent()
  const apply = content.pages.apply
  const settings = content.settings

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,150,58,0.07) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative text-center">
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.3em] uppercase mb-4">
            {settings.retreatDates as string} · {settings.retreatLocation as string}
          </p>
          <h1
            className="font-serif font-bold text-[#F2EDE4] mb-5 leading-tight"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            {apply.h1 as string}
          </h1>
          <p className="text-[#9A9080] text-lg leading-relaxed">
            {apply.formIntro as string}
          </p>
        </div>
      </section>

      <ApplyForm settings={settings} />
    </>
  )
}
