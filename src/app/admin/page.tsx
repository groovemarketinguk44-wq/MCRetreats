'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Types ──────────────────────────────────────────────────────────────
type PageKey = 'home' | 'about' | 'experience' | 'venue' | 'pricing' | 'apply'
type Section = 'seo' | 'content' | 'images' | 'settings'

interface Field {
  id: string
  label: string
  multiline?: boolean
  hint?: string
}

// ── Field definitions per page ────────────────────────────────────────
const SEO_FIELDS: Field[] = [
  { id: 'metaTitle', label: 'Meta Title', hint: 'Max 60 chars' },
  { id: 'metaDescription', label: 'Meta Description', multiline: true, hint: 'Max 160 chars' },
  { id: 'h1', label: 'Page Heading (H1)' },
  { id: 'ogTitle', label: 'Social Share Title' },
  { id: 'ogDescription', label: 'Social Share Description', multiline: true },
  { id: 'canonicalUrl', label: 'Canonical URL' },
  { id: 'keywords', label: 'Keywords (comma-separated)' },
]

const CONTENT_FIELDS: Record<PageKey, Field[]> = {
  home: [
    { id: 'heroHeadline', label: 'Hero Headline' },
    { id: 'heroSubheadline', label: 'Hero Subheadline', multiline: true },
    { id: 'heroBadge', label: 'Hero Badge Text (dates/location)' },
    { id: 'heroCtaText', label: 'Hero CTA Button Text' },
    { id: 'heroNote', label: 'Hero Small Note (below CTA)' },
    { id: 'whoTitle', label: '"Who It\'s For" Section Title' },
    { id: 'whoCard1Title', label: 'Card 1 Title' },
    { id: 'whoCard1Desc', label: 'Card 1 Description', multiline: true },
    { id: 'whoCard2Title', label: 'Card 2 Title' },
    { id: 'whoCard2Desc', label: 'Card 2 Description', multiline: true },
    { id: 'whoCard3Title', label: 'Card 3 Title' },
    { id: 'whoCard3Desc', label: 'Card 3 Description', multiline: true },
    { id: 'whoCard4Title', label: 'Card 4 Title' },
    { id: 'whoCard4Desc', label: 'Card 4 Description', multiline: true },
    { id: 'whoCard5Title', label: 'Card 5 Title' },
    { id: 'whoCard5Desc', label: 'Card 5 Description', multiline: true },
    { id: 'whoCard6Title', label: 'Card 6 Title' },
    { id: 'whoCard6Desc', label: 'Card 6 Description', multiline: true },
    { id: 'experienceIntro', label: 'Experience Section Intro', multiline: true },
    { id: 'venuePreviewTitle', label: 'Venue Preview Title' },
    { id: 'venuePreviewText', label: 'Venue Preview Text', multiline: true },
    { id: 'venuePreviewText2', label: 'Venue Preview Text (2nd paragraph)', multiline: true },
    { id: 'coachesTitle', label: 'Coaches Section Title' },
    { id: 'coach1Name', label: 'Coach 1 Name' },
    { id: 'coach1Role', label: 'Coach 1 Role' },
    { id: 'coach1Quote', label: 'Coach 1 Quote' },
    { id: 'coach2Name', label: 'Coach 2 Name' },
    { id: 'coach2Role', label: 'Coach 2 Role' },
    { id: 'coach2Quote', label: 'Coach 2 Quote' },
    { id: 'testimonial1Quote', label: 'Testimonial 1 Quote', multiline: true },
    { id: 'testimonial1Name', label: 'Testimonial 1 Name' },
    { id: 'testimonial1Role', label: 'Testimonial 1 Role' },
    { id: 'testimonial2Quote', label: 'Testimonial 2 Quote', multiline: true },
    { id: 'testimonial2Name', label: 'Testimonial 2 Name' },
    { id: 'testimonial2Role', label: 'Testimonial 2 Role' },
    { id: 'testimonial3Quote', label: 'Testimonial 3 Quote', multiline: true },
    { id: 'testimonial3Name', label: 'Testimonial 3 Name' },
    { id: 'testimonial3Role', label: 'Testimonial 3 Role' },
    { id: 'ctaHeadline', label: 'Bottom CTA Headline' },
    { id: 'ctaNote', label: 'Bottom CTA Note' },
  ],
  about: [
    { id: 'heroSubtitle', label: 'Page Subtitle', multiline: true },
    { id: 'missionQuote', label: 'Mission Quote', multiline: true },
    { id: 'stevenName', label: 'Steven — Name' },
    { id: 'stevenRole', label: 'Steven — Role / Specialisms' },
    { id: 'stevenBio', label: 'Steven — Full Bio', multiline: true },
    { id: 'gazName', label: 'Gaz — Name' },
    { id: 'gazRole', label: 'Gaz — Role / Specialisms' },
    { id: 'gazBio', label: 'Gaz — Full Bio', multiline: true },
    { id: 'philosophy1Title', label: 'Philosophy Card 1 Title' },
    { id: 'philosophy1Desc', label: 'Philosophy Card 1 Description', multiline: true },
    { id: 'philosophy2Title', label: 'Philosophy Card 2 Title' },
    { id: 'philosophy2Desc', label: 'Philosophy Card 2 Description', multiline: true },
    { id: 'philosophy3Title', label: 'Philosophy Card 3 Title' },
    { id: 'philosophy3Desc', label: 'Philosophy Card 3 Description', multiline: true },
  ],
  experience: [
    { id: 'trainingTitle', label: 'Training — Section Title' },
    { id: 'trainingDesc', label: 'Training — Description', multiline: true },
    { id: 'recoveryTitle', label: 'Recovery — Section Title' },
    { id: 'recoveryDesc', label: 'Recovery — Description', multiline: true },
    { id: 'nutritionTitle', label: 'Nutrition — Section Title' },
    { id: 'nutritionDesc', label: 'Nutrition — Description', multiline: true },
    { id: 'mindsetTitle', label: 'Mindset — Section Title' },
    { id: 'mindsetDesc', label: 'Mindset — Description', multiline: true },
  ],
  venue: [
    { id: 'venueIntro', label: 'Venue Intro Paragraph', multiline: true },
    { id: 'venueDescription', label: 'Venue Main Description', multiline: true },
    { id: 'poolDesc', label: 'Pool — Description', multiline: true },
    { id: 'saunaDesc', label: 'Sauna — Description', multiline: true },
    { id: 'kitchenDesc', label: 'Kitchen — Description', multiline: true },
    { id: 'outdoorDiningDesc', label: 'Outdoor Dining — Description', multiline: true },
    { id: 'firepitDesc', label: 'Firepit — Description', multiline: true },
    { id: 'gamesRoomDesc', label: 'Games Room — Description', multiline: true },
  ],
  pricing: [
    { id: 'pricingIntro', label: 'Pricing Intro', multiline: true },
    { id: 'perPersonLabel', label: 'Per Person Option Label' },
    { id: 'perPersonDesc', label: 'Per Person Option Description' },
    { id: 'perRoomLabel', label: 'Per Room Option Label' },
    { id: 'perRoomDesc', label: 'Per Room Option Description' },
    { id: 'payFullLabel', label: 'Pay In Full — Label' },
    { id: 'payFullDesc', label: 'Pay In Full — Description', multiline: true },
    { id: 'payDepositLabel', label: 'Deposit — Label' },
    { id: 'payDepositDesc', label: 'Deposit — Description', multiline: true },
    { id: 'payPlanLabel', label: 'Payment Plan — Label' },
    { id: 'payPlanDesc', label: 'Payment Plan — Description', multiline: true },
  ],
  apply: [
    { id: 'formIntro', label: 'Application Form Intro', multiline: true },
  ],
}

const IMAGE_FIELDS: Field[] = [
  { id: 'hero', label: 'Site Hero — Background Image' },
  { id: 'stevenPhoto', label: 'Steven Machin — Photo' },
  { id: 'gazPhoto', label: 'Gaz Crosby — Photo' },
  { id: 'venue_firepit', label: 'Image 1 — Fire Pit' },
  { id: 'venue_decking', label: 'Image 2 — Decking with Views' },
  { id: 'venue_pool_dusk', label: 'Image 3 — Pool Building Exterior at Dusk' },
  { id: 'venue_sauna', label: 'Image 4 — Sauna' },
  { id: 'venue_bathroom', label: 'Image 5 — Ensuite Bathroom' },
  { id: 'venue_kitchen', label: 'Image 6 — Kitchen / Dining' },
  { id: 'venue_sunset', label: 'Image 7 — Venue at Sunset' },
  { id: 'venue_pool', label: 'Image 8 — Indoor Pool' },
  { id: 'venue_games_room', label: 'Image 9 — Games Room' },
  { id: 'venue_bunk_room', label: 'Image 10 — Bunk Room' },
  { id: 'venue_floral_room', label: 'Image 11 — Floral Bedroom' },
  { id: 'venue_botanical_room', label: 'Image 12 — Green Botanical Bedroom' },
  { id: 'venue_orange_room', label: 'Image 13 — Orange Bedroom' },
  { id: 'venue_green_floral', label: 'Image 14 — Green Floral Bedroom' },
  { id: 'venue_pool_table', label: 'Image 15 — Pool Table / Spiral Staircase' },
  { id: 'venue_chess', label: 'Image 16 — Giant Chess Board' },
  { id: 'venue_exterior', label: 'Image 17 — Main Building Exterior Day' },
  { id: 'venue_garden', label: 'Image 18 — Garden Steps and Lavender' },
  { id: 'venue_outdoor_dining', label: 'Image 19 — Outdoor Dining / Lawn' },
  { id: 'venue_full', label: 'Image 20 — Full Venue Overview' },
]

const SETTINGS_FIELDS: Field[] = [
  { id: 'siteName', label: 'Site Name' },
  { id: 'siteUrl', label: 'Site URL' },
  { id: 'contactEmail', label: 'Contact Email' },
  { id: 'retreatDates', label: 'Retreat Dates (display text)' },
  { id: 'retreatLocation', label: 'Retreat Location' },
  { id: 'ctaText', label: 'Default CTA Button Text' },
  { id: 'pricingNote', label: 'Pricing Small Note' },
  { id: 'successMessage', label: 'Booking Success Message', multiline: true },
]

const SETTINGS_NUMBER_FIELDS: Field[] = [
  { id: 'depositAmount', label: 'Deposit Amount (£)' },
  { id: 'fullPricePP', label: 'Full Price Per Person (£)' },
  { id: 'fullPriceRoom', label: 'Full Price Per Room (£)' },
  { id: 'capacity', label: 'Capacity (rooms)' },
]

const PAGE_LABELS: Record<PageKey, string> = {
  home: 'Homepage',
  about: 'About',
  experience: 'Experience',
  venue: 'Venue',
  pricing: 'Pricing',
  apply: 'Apply',
}

// ── Component ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [content, setContent] = useState<Record<string, unknown> | null>(null)
  const [activePage, setActivePage] = useState<PageKey>('home')
  const [activeSection, setActiveSection] = useState<Section>('content')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [dirty, setDirty] = useState(false)
  const [uploading, setUploading] = useState<Record<string, boolean>>({})

  const token = () =>
    typeof window !== 'undefined' ? localStorage.getItem('mc_admin_token') : null

  const doFetchContent = useCallback(async (t: string) => {
    const r = await fetch('/api/admin/content', {
      headers: { Authorization: `Bearer ${t}` },
    })
    if (!r.ok) throw new Error('auth')
    return r.json()
  }, [])

  useEffect(() => {
    const t = token()
    if (!t) { setChecking(false); return }
    doFetchContent(t)
      .then((data) => { setContent(data); setAuthed(true) })
      .catch(() => { localStorage.removeItem('mc_admin_token') })
      .finally(() => setChecking(false))
  }, [doFetchContent])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return
    setLoginLoading(true)
    setLoginError('')
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await r.json()
      if (r.ok && data.token) {
        localStorage.setItem('mc_admin_token', data.token)
        const contentData = await doFetchContent(data.token)
        setContent(contentData)
        setAuthed(true)
      } else {
        setLoginError(data.error || 'Incorrect password')
      }
    } catch {
      setLoginError('Could not connect to server. Try again.')
    }
    setLoginLoading(false)
  }

  const setField = (path: string[], value: string) => {
    setContent((prev) => {
      if (!prev) return prev
      const next = JSON.parse(JSON.stringify(prev))
      let obj = next as Record<string, unknown>
      for (let i = 0; i < path.length - 1; i++) {
        if (obj[path[i]] == null || typeof obj[path[i]] !== 'object') {
          obj[path[i]] = {}
        }
        obj = obj[path[i]] as Record<string, unknown>
      }
      obj[path[path.length - 1]] = value
      return next
    })
    setDirty(true)
    setSaveStatus('idle')
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const r = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify(content),
      })
      if (r.ok) { setSaveStatus('saved'); setDirty(false); setTimeout(() => setSaveStatus('idle'), 3000) }
      else { setSaveStatus('error') }
    } catch { setSaveStatus('error') }
    setSaving(false)
  }

  const pageData = () => {
    if (!content) return {}
    return ((content as Record<string, unknown>).pages as Record<string, unknown>)?.[activePage] as Record<string, unknown> ?? {}
  }

  const imagesData = () => {
    if (!content) return {}
    return (content as Record<string, unknown>).images as Record<string, unknown> ?? {}
  }

  const imageAltsData = () => {
    if (!content) return {}
    return (content as Record<string, unknown>).imageAlts as Record<string, unknown> ?? {}
  }

  const handleUpload = async (fieldId: string, file: File) => {
    setUploading((prev) => ({ ...prev, [fieldId]: true }))
    try {
      const fd = new FormData()
      fd.append('file', file)
      const r = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token()}` },
        body: fd,
      })
      const data = await r.json()
      if (data.path) {
        setField(['images', fieldId], data.path)
        setDirty(true)
      }
    } catch {
      // upload failed silently — user can retry
    }
    setUploading((prev) => ({ ...prev, [fieldId]: false }))
  }

  const settingsData = () => {
    if (!content) return {}
    return (content as Record<string, unknown>).settings as Record<string, unknown> ?? {}
  }

  // ── Loading ──
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border border-[#C4963A] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // ── Login ──
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '72px' }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="font-bold text-xl" style={{ color: '#C4963A' }}>MC</span>
              <span className="text-[#F2EDE4] text-sm tracking-widest uppercase font-light">RETREATS</span>
            </div>
            <p className="text-[#5A5048] text-sm mt-1">Admin Panel</p>
          </div>

          <div className="card-dark p-8">
            <h1 className="text-lg font-semibold text-[#F2EDE4] mb-6">Sign In</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="pw" className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">
                  Password
                </label>
                <input
                  id="pw"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError('') }}
                  placeholder="Enter admin password"
                  autoFocus
                  autoComplete="current-password"
                  className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.2)] text-[#F2EDE4] placeholder-[#3A3028] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                />
              </div>

              {loginError && (
                <div className="bg-red-900/20 border border-red-700/30 px-4 py-3 rounded">
                  <p className="text-red-400 text-sm">{loginError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading || !password}
                className="btn-gold w-full"
                style={{
                  padding: '0.875rem',
                  opacity: loginLoading || !password ? 0.6 : 1,
                  cursor: loginLoading ? 'wait' : 'pointer',
                }}
              >
                <span>{loginLoading ? 'Signing in…' : 'Sign In'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const pd = pageData()
  const imgs = imagesData()
  const alts = imageAltsData()
  const settings = settingsData()

  // ── Admin UI ──
  return (
    <div className="flex min-h-screen" style={{ paddingTop: '72px' }}>

      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 bg-[#0C0A08] border-r border-[rgba(196,150,58,0.1)] flex flex-col">
        <div className="px-4 py-4 border-b border-[rgba(196,150,58,0.1)]">
          <p className="text-[#C4963A] text-xs font-semibold tracking-widest uppercase">Admin</p>
        </div>

        <div className="flex-1 p-2 overflow-y-auto">
          <p className="text-[#3A3028] text-xs font-medium tracking-widest uppercase px-2 py-2">Pages</p>
          {(Object.keys(PAGE_LABELS) as PageKey[]).map((key) => (
            <button
              key={key}
              onClick={() => { setActivePage(key); setActiveSection('content') }}
              className={`w-full text-left px-3 py-2 text-sm rounded transition-colors cursor-pointer mb-0.5 ${
                activePage === key && activeSection !== 'images' && activeSection !== 'settings'
                  ? 'bg-[rgba(196,150,58,0.12)] text-[#C4963A]'
                  : 'text-[#706050] hover:text-[#F2EDE4] hover:bg-[rgba(255,255,255,0.03)]'
              }`}
            >
              {PAGE_LABELS[key]}
            </button>
          ))}

          <div className="h-px bg-[rgba(196,150,58,0.08)] my-3" />
          <p className="text-[#3A3028] text-xs font-medium tracking-widest uppercase px-2 py-2">Global</p>

          <button
            onClick={() => setActiveSection('images')}
            className={`w-full text-left px-3 py-2 text-sm rounded transition-colors cursor-pointer mb-0.5 ${
              activeSection === 'images'
                ? 'bg-[rgba(196,150,58,0.12)] text-[#C4963A]'
                : 'text-[#706050] hover:text-[#F2EDE4] hover:bg-[rgba(255,255,255,0.03)]'
            }`}
          >
            Images
          </button>

          <button
            onClick={() => setActiveSection('settings')}
            className={`w-full text-left px-3 py-2 text-sm rounded transition-colors cursor-pointer ${
              activeSection === 'settings'
                ? 'bg-[rgba(196,150,58,0.12)] text-[#C4963A]'
                : 'text-[#706050] hover:text-[#F2EDE4] hover:bg-[rgba(255,255,255,0.03)]'
            }`}
          >
            Site Settings
          </button>
        </div>

        <div className="p-3 border-t border-[rgba(196,150,58,0.08)]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-3 py-2 text-xs text-[#5A5048] hover:text-[#A09080] transition-colors cursor-pointer"
          >
            View Site ↗
          </a>
          <button
            onClick={() => { localStorage.removeItem('mc_admin_token'); setAuthed(false) }}
            className="w-full text-left px-3 py-2 text-xs text-[#5A5048] hover:text-[#A09080] transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="sticky top-[72px] z-10 bg-[#0C0A08] border-b border-[rgba(196,150,58,0.1)] px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-[#F2EDE4] text-base">
              {activeSection === 'images' ? 'Images'
                : activeSection === 'settings' ? 'Site Settings'
                : PAGE_LABELS[activePage]}
            </h2>
            {dirty && (
              <span className="text-xs px-2 py-0.5 bg-[rgba(196,150,58,0.12)] text-[#C4963A] rounded">
                Unsaved
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {saveStatus === 'saved' && (
              <span className="text-green-400 text-sm flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Saved
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-red-400 text-sm">Save failed</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !dirty}
              className="btn-gold text-xs"
              style={{
                padding: '0.5rem 1.25rem',
                opacity: saving || !dirty ? 0.45 : 1,
                cursor: saving || !dirty ? 'not-allowed' : 'pointer',
              }}
            >
              <span>{saving ? 'Saving…' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-8">

          {/* ── Images section ── */}
          {activeSection === 'images' && (
            <div className="max-w-2xl">
              <p className="text-[#706050] text-sm mb-6 leading-relaxed">
                Upload images from your device. Each image can have alt text for accessibility and SEO.
              </p>
              <div className="space-y-8">
                {IMAGE_FIELDS.map((field) => {
                  const src = (imgs[field.id] as string) || ''
                  const isUploading = uploading[field.id]
                  return (
                    <div key={field.id} className="border border-[rgba(196,150,58,0.1)] p-4 space-y-3">
                      <p className="text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase">
                        {field.label}
                      </p>

                      {/* Preview */}
                      {src && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={src}
                          alt=""
                          className="w-full max-h-40 object-cover border border-[rgba(196,150,58,0.15)]"
                        />
                      )}

                      {/* Upload button */}
                      <label
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase cursor-pointer transition-colors"
                        style={{
                          background: isUploading ? 'rgba(196,150,58,0.1)' : 'rgba(196,150,58,0.15)',
                          border: '1px solid rgba(196,150,58,0.3)',
                          color: '#C4963A',
                          opacity: isUploading ? 0.6 : 1,
                        }}
                      >
                        {isUploading ? (
                          <>
                            <span className="w-3 h-3 border border-[#C4963A] border-t-transparent rounded-full animate-spin" />
                            Uploading…
                          </>
                        ) : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                            {src ? 'Replace image' : 'Upload image'}
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={isUploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleUpload(field.id, file)
                            e.target.value = ''
                          }}
                        />
                      </label>

                      {/* Alt text */}
                      <div>
                        <label className="block text-[#5A5048] text-xs mb-1">
                          Alt text / description
                        </label>
                        <input
                          type="text"
                          value={(alts[field.id] as string) || ''}
                          onChange={(e) => {
                            setField(['imageAlts', field.id], e.target.value)
                            setDirty(true)
                          }}
                          placeholder={`Describe this image for accessibility…`}
                          className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] placeholder-[#3A3028] px-3 py-2 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Settings section ── */}
          {activeSection === 'settings' && (
            <div className="max-w-2xl space-y-5">
              {SETTINGS_FIELDS.map((field) => (
                <div key={field.id}>
                  <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-1.5">
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      value={(settings[field.id] as string) || ''}
                      onChange={(e) => setField(['settings', field.id], e.target.value)}
                      rows={3}
                      className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C4963A] transition-colors resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={(settings[field.id] as string) || ''}
                      onChange={(e) => setField(['settings', field.id], e.target.value)}
                      className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                    />
                  )}
                </div>
              ))}
              <div className="h-px bg-[rgba(196,150,58,0.1)]" />
              <p className="text-[#C4963A] text-xs font-medium tracking-widest uppercase">Pricing</p>
              <div className="grid grid-cols-2 gap-4">
                {SETTINGS_NUMBER_FIELDS.map((field) => (
                  <div key={field.id}>
                    <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={(settings[field.id] as number) || 0}
                      onChange={(e) => setField(['settings', field.id], e.target.value)}
                      className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Page sections ── */}
          {activeSection !== 'images' && activeSection !== 'settings' && (
            <>
              {/* Sub-tabs */}
              <div className="flex gap-0 mb-8 border-b border-[rgba(196,150,58,0.1)]">
                {([['content', 'Content'], ['seo', 'SEO & Meta']] as [Section, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`px-5 py-3 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-px ${
                      activeSection === key
                        ? 'text-[#C4963A] border-[#C4963A]'
                        : 'text-[#706050] border-transparent hover:text-[#F2EDE4]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="max-w-2xl space-y-5">
                {activeSection === 'content' && CONTENT_FIELDS[activePage].map((field) => (
                  <FieldInput
                    key={field.id}
                    field={field}
                    value={(pd[field.id] as string) || ''}
                    onChange={(v) => setField(['pages', activePage, field.id], v)}
                  />
                ))}

                {activeSection === 'seo' && SEO_FIELDS.map((field) => (
                  <FieldInput
                    key={field.id}
                    field={field}
                    value={
                      field.id === 'keywords'
                        ? (Array.isArray(pd[field.id]) ? (pd[field.id] as string[]).join(', ') : (pd[field.id] as string) || '')
                        : (pd[field.id] as string) || ''
                    }
                    onChange={(v) => setField(['pages', activePage, field.id], v)}
                    charLimit={field.id === 'metaTitle' ? 60 : field.id === 'metaDescription' ? 160 : undefined}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Reusable field component ──────────────────────────────────────────
function FieldInput({
  field,
  value,
  onChange,
  charLimit,
}: {
  field: Field
  value: string
  onChange: (v: string) => void
  charLimit?: number
}) {
  return (
    <div>
      <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-1">
        {field.label}
      </label>
      {field.hint && <p className="text-[#5A5048] text-xs mb-1.5">{field.hint}</p>}
      {field.multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C4963A] transition-colors resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
        />
      )}
      {charLimit && (
        <p className={`text-xs mt-1 ${value.length > charLimit ? 'text-red-400' : 'text-[#5A5048]'}`}>
          {value.length} / {charLimit}
        </p>
      )}
    </div>
  )
}
