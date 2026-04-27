import { NextRequest, NextResponse } from 'next/server'
import { getContent, saveContent } from '@/lib/content'
import { verifyToken } from '@/lib/auth'

async function authenticate(req: NextRequest): Promise<boolean> {
  const auth = req.headers.get('Authorization')
  if (auth?.startsWith('Bearer ')) {
    return await verifyToken(auth.slice(7))
  }
  return false
}

export async function GET(req: NextRequest) {
  const ok = await authenticate(req)
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const content = getContent()
    return NextResponse.json(content)
  } catch {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const ok = await authenticate(req)
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()

    // Basic structure validation
    if (!body || typeof body !== 'object' || !body.pages || !body.settings) {
      return NextResponse.json({ error: 'Invalid content structure' }, { status: 400 })
    }

    // Handle keywords: if stored as comma-separated string, convert back to array
    const pages = body.pages as Record<string, Record<string, unknown>>
    for (const pageKey of Object.keys(pages)) {
      const page = pages[pageKey]
      if (typeof page.keywords === 'string') {
        page.keywords = (page.keywords as string)
          .split(',')
          .map((k: string) => k.trim())
          .filter(Boolean)
      }
    }

    saveContent(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Save error:', err)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}
