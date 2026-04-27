import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'content.json')
const DATA_DEFAULTS_FILE = path.join(process.cwd(), 'data-defaults', 'content.json')
const TMP_FILE = '/tmp/mc-retreats-content.json'

export type PageKey = 'home' | 'about' | 'experience' | 'venue' | 'pricing' | 'apply'

export interface PageSEO {
  metaTitle: string
  metaDescription: string
  h1: string
  ogTitle: string
  ogDescription: string
  canonicalUrl: string
  keywords: string[]
  [key: string]: unknown
}

export interface ContentData {
  pages: Record<PageKey, PageSEO & Record<string, unknown>>
  settings: {
    depositAmount: number
    fullPricePP: number
    fullPriceRoom: number
    ctaText: string
    siteName: string
    siteUrl: string
    retreatDates: string
    retreatLocation: string
    capacity: number
    pricingNote: string
    successMessage: string
    [key: string]: unknown
  }
  images?: Record<string, string>
}

function readDefaultContent(): ContentData {
  // Primary: persistent volume (Fly.io) or local dev
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as ContentData
    }
  } catch {}
  // Fallback: bundled defaults baked into Docker image (volume empty on first boot)
  return JSON.parse(fs.readFileSync(DATA_DEFAULTS_FILE, 'utf-8')) as ContentData
}

export function getContent(): ContentData {
  // Check /tmp override first (Vercel ephemeral writes)
  try {
    if (fs.existsSync(TMP_FILE)) {
      const tmpRaw = fs.readFileSync(TMP_FILE, 'utf-8')
      return JSON.parse(tmpRaw) as ContentData
    }
  } catch {
    // Fall through to default
  }
  return readDefaultContent()
}

export function saveContent(data: ContentData): void {
  const json = JSON.stringify(data, null, 2)

  // Try writing to the actual data file first (works locally)
  try {
    fs.writeFileSync(DATA_FILE, json, 'utf-8')
    return
  } catch {
    // On Vercel, filesystem is read-only — fall back to /tmp
  }

  // Fallback: write to /tmp (ephemeral — resets on redeploy)
  fs.writeFileSync(TMP_FILE, json, 'utf-8')
}

export function getPageSEO(pageKey: PageKey): PageSEO {
  const content = getContent()
  return content.pages[pageKey]
}

export function getSettings() {
  const content = getContent()
  return content.settings
}
