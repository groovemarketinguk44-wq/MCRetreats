'use client'

import { useState, useEffect, useCallback } from 'react'

type PageKey = 'home' | 'about' | 'experience' | 'venue' | 'pricing' | 'apply'
type TabKey = 'seo' | 'content' | 'settings'

const PAGE_KEYS: PageKey[] = ['home', 'about', 'experience', 'venue', 'pricing', 'apply']
const PAGE_LABELS: Record<PageKey, string> = {
  home: 'Homepage',
  about: 'About',
  experience: 'Experience',
  venue: 'Venue',
  pricing: 'Pricing',
  apply: 'Apply',
}

const CONTENT_FIELDS: Partial<Record<PageKey, { id: string; label: string; multiline?: boolean }[]>> = {
  home: [
    { id: 'headline', label: 'Hero Headline' },
    { id: 'subheadline', label: 'Hero Subheadline', multiline: true },
    { id: 'whoDescription', label: '"Who It\'s For" Description', multiline: true },
    { id: 'experienceIntro', label: 'Experience Intro', multiline: true },
  ],
  about: [
    { id: 'stevenBio', label: 'Steven Machin Bio', multiline: true },
    { id: 'gazBio', label: 'Gaz Crosby Bio', multiline: true },
  ],
  experience: [
    { id: 'trainingDesc', label: 'Training Description', multiline: true },
    { id: 'recoveryDesc', label: 'Recovery Description', multiline: true },
    { id: 'nutritionDesc', label: 'Nutrition Description', multiline: true },
    { id: 'mindsetDesc', label: 'Mindset Description', multiline: true },
  ],
  venue: [
    { id: 'venueIntro', label: 'Venue Intro', multiline: true },
    { id: 'venueDescription', label: 'Venue Description', multiline: true },
  ],
  pricing: [
    { id: 'pricingIntro', label: 'Pricing Intro', multiline: true },
  ],
  apply: [
    { id: 'formIntro', label: 'Application Form Intro', multiline: true },
  ],
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [content, setContent] = useState<Record<string, unknown> | null>(null)
  const [activePage, setActivePage] = useState<PageKey>('home')
  const [activeTab, setActiveTab] = useState<TabKey>('seo')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [hasChanges, setHasChanges] = useState(false)

  const getToken = () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('mc_admin_token')
  }

  const checkAuth = useCallback(async () => {
    const token = getToken()
    if (!token) { setCheckingAuth(false); return }
    try {
      const res = await fetch('/api/admin/content', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setContent(data)
        setAuthed(true)
      } else {
        localStorage.removeItem('mc_admin_token')
      }
    } catch {
      // ignore
    }
    setCheckingAuth(false)
  }, [])

  useEffect(() => { checkAuth() }, [checkAuth])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem('mc_admin_token', data.token)
        const contentRes = await fetch('/api/admin/content', {
          headers: { Authorization: `Bearer ${data.token}` },
        })
        if (contentRes.ok) {
          setContent(await contentRes.json())
          setAuthed(true)
        }
      } else {
        setLoginError('Incorrect password')
      }
    } catch {
      setLoginError('Connection error. Try again.')
    }
    setLoginLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('mc_admin_token')
    setAuthed(false)
    setContent(null)
  }

  const updateField = (path: string[], value: string) => {
    setContent((prev) => {
      if (!prev) return prev
      const updated = JSON.parse(JSON.stringify(prev))
      let obj = updated
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]] as Record<string, unknown>
      }
      obj[path[path.length - 1]] = value
      return updated
    })
    setHasChanges(true)
    setSaveStatus('idle')
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = getToken()
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      })
      if (res.ok) {
        setSaveStatus('saved')
        setHasChanges(false)
        setTimeout(() => setSaveStatus('idle'), 3000)
      } else {
        setSaveStatus('error')
      }
    } catch {
      setSaveStatus('error')
    }
    setSaving(false)
  }

  const getPageData = () => {
    if (!content) return {}
    return ((content as Record<string, unknown>).pages as Record<string, unknown>)?.[activePage] as Record<string, unknown> || {}
  }

  const getSettings = () => {
    if (!content) return {}
    return (content as Record<string, unknown>).settings as Record<string, unknown> || {}
  }

  // ── Loading ──
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border border-[#C4963A] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // ── Login ──
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="font-serif font-bold text-2xl" style={{ color: '#C4963A' }}>MC</p>
            <p className="text-[#F2EDE4] text-sm tracking-[0.2em] uppercase mt-1">Admin Panel</p>
          </div>
          <div className="card-dark p-8">
            <h1 className="font-serif text-xl font-bold text-[#F2EDE4] mb-6">Sign In</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  autoFocus
                  className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] placeholder-[#3A3028] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                />
              </div>
              {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
              <button
                type="submit"
                disabled={loginLoading}
                className="btn-gold w-full"
                style={{ padding: '0.875rem', opacity: loginLoading ? 0.7 : 1 }}
              >
                <span>{loginLoading ? 'Signing in...' : 'Sign In'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const pageData = getPageData()
  const settingsData = getSettings()
  const contentFields = CONTENT_FIELDS[activePage] || []

  // ── Admin UI ──
  return (
    <div className="min-h-screen flex" style={{ paddingTop: '72px' }}>
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-[#0C0A08] border-r border-[rgba(196,150,58,0.1)] flex flex-col">
        <div className="p-5 border-b border-[rgba(196,150,58,0.1)]">
          <p className="text-[#C4963A] text-xs font-medium tracking-[0.2em] uppercase">Admin</p>
          <p className="text-[#5A5048] text-xs mt-1">Content Manager</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {PAGE_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => { setActivePage(key); setActiveTab('seo') }}
              className={`w-full text-left px-3 py-2.5 text-sm rounded transition-colors cursor-pointer ${
                activePage === key
                  ? 'bg-[rgba(196,150,58,0.1)] text-[#C4963A]'
                  : 'text-[#706050] hover:text-[#F2EDE4] hover:bg-[rgba(255,255,255,0.03)]'
              }`}
            >
              {PAGE_LABELS[key]}
            </button>
          ))}
          <div className="h-px bg-[rgba(196,150,58,0.1)] my-2" />
          <button
            onClick={() => { setActivePage('home'); setActiveTab('settings') }}
            className={`w-full text-left px-3 py-2.5 text-sm rounded transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[rgba(196,150,58,0.1)] text-[#C4963A]'
                : 'text-[#706050] hover:text-[#F2EDE4] hover:bg-[rgba(255,255,255,0.03)]'
            }`}
          >
            Site Settings
          </button>
        </nav>

        <div className="p-3 border-t border-[rgba(196,150,58,0.1)]">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-xs text-[#5A5048] hover:text-[#A09080] transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-[#0C0A08] border-b border-[rgba(196,150,58,0.1)] px-6 py-4 flex items-center justify-between gap-4 sticky top-[72px] z-10">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-lg font-semibold text-[#F2EDE4]">
              {activeTab === 'settings' ? 'Site Settings' : PAGE_LABELS[activePage]}
            </h2>
            {hasChanges && (
              <span className="text-xs px-2 py-0.5 bg-[rgba(196,150,58,0.15)] text-[#C4963A]">
                Unsaved changes
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="btn-gold text-sm"
            style={{
              padding: '0.625rem 1.5rem',
              opacity: saving || !hasChanges ? 0.5 : 1,
              cursor: saving || !hasChanges ? 'not-allowed' : 'pointer',
            }}
          >
            <span>
              {saving ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
            </span>
          </button>
        </div>

        {saveStatus === 'error' && (
          <div className="bg-red-900/20 border-b border-red-800/30 px-6 py-3 text-red-400 text-sm">
            Save failed. Please try again.
          </div>
        )}

        <div className="flex-1 overflow-auto p-6 lg:p-8">

          {/* Settings tab */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <p className="text-[#706050] text-sm mb-6">Global settings that affect the entire site.</p>
              {[
                { id: 'siteName', label: 'Site Name' },
                { id: 'siteUrl', label: 'Site URL' },
                { id: 'retreatDates', label: 'Retreat Dates (display text)' },
                { id: 'retreatLocation', label: 'Retreat Location' },
                { id: 'ctaText', label: 'Primary CTA Button Text' },
                { id: 'pricingNote', label: 'Pricing Note (small text)' },
                { id: 'successMessage', label: 'Booking Success Message' },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={(settingsData[field.id] as string) || ''}
                    onChange={(e) => updateField(['settings', field.id], e.target.value)}
                    className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                  />
                </div>
              ))}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'depositAmount', label: 'Deposit Amount (£)' },
                  { id: 'fullPricePP', label: 'Per Person Price (£)' },
                  { id: 'fullPriceRoom', label: 'Per Room Price (£)' },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={(settingsData[field.id] as number) || 0}
                      onChange={(e) => updateField(['settings', field.id], e.target.value)}
                      className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Page tabs */}
          {activeTab !== 'settings' && (
            <>
              {/* Tab switcher */}
              <div className="flex gap-1 mb-8 border-b border-[rgba(196,150,58,0.1)]">
                {([['seo', 'SEO & Meta'], ['content', 'Content']] as [TabKey, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-5 py-3 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-px ${
                      activeTab === key
                        ? 'text-[#C4963A] border-[#C4963A]'
                        : 'text-[#706050] border-transparent hover:text-[#F2EDE4]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="max-w-2xl space-y-6">
                {/* SEO Tab */}
                {activeTab === 'seo' && (
                  <>
                    {[
                      { id: 'metaTitle', label: 'Meta Title', hint: 'Recommended: 50–60 characters' },
                      { id: 'metaDescription', label: 'Meta Description', hint: 'Recommended: 150–160 characters', multiline: true },
                      { id: 'h1', label: 'Page H1 Heading' },
                      { id: 'ogTitle', label: 'OG Title (Social Share)' },
                      { id: 'ogDescription', label: 'OG Description (Social Share)', multiline: true },
                      { id: 'canonicalUrl', label: 'Canonical URL' },
                    ].map((field) => (
                      <div key={field.id}>
                        <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-1">
                          {field.label}
                        </label>
                        {field.hint && (
                          <p className="text-[#5A5048] text-xs mb-2">{field.hint}</p>
                        )}
                        {field.multiline ? (
                          <textarea
                            value={(pageData[field.id] as string) || ''}
                            onChange={(e) => updateField(['pages', activePage, field.id], e.target.value)}
                            rows={3}
                            className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors resize-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={(pageData[field.id] as string) || ''}
                            onChange={(e) => updateField(['pages', activePage, field.id], e.target.value)}
                            className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                          />
                        )}
                        {(field.id === 'metaTitle' || field.id === 'metaDescription') && (
                          <p className={`text-xs mt-1 ${
                            (pageData[field.id] as string || '').length > (field.id === 'metaTitle' ? 60 : 160)
                              ? 'text-red-400'
                              : 'text-[#5A5048]'
                          }`}>
                            {(pageData[field.id] as string || '').length} chars
                          </p>
                        )}
                      </div>
                    ))}

                    <div>
                      <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">
                        Keywords (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={Array.isArray(pageData.keywords) ? (pageData.keywords as string[]).join(', ') : ''}
                        onChange={(e) =>
                          updateField(
                            ['pages', activePage, 'keywords'],
                            e.target.value
                          )
                        }
                        placeholder="keyword one, keyword two, keyword three"
                        className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] placeholder-[#3A3028] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                      />
                    </div>
                  </>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <>
                    {contentFields.length === 0 ? (
                      <p className="text-[#5A5048] text-sm">No editable content fields for this page.</p>
                    ) : (
                      contentFields.map((field) => (
                        <div key={field.id}>
                          <label className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">
                            {field.label}
                          </label>
                          {field.multiline ? (
                            <textarea
                              value={(pageData[field.id] as string) || ''}
                              onChange={(e) => updateField(['pages', activePage, field.id], e.target.value)}
                              rows={4}
                              className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors resize-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={(pageData[field.id] as string) || ''}
                              onChange={(e) => updateField(['pages', activePage, field.id], e.target.value)}
                              className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                            />
                          )}
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
