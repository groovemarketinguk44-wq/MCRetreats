import { NextRequest, NextResponse } from 'next/server'
import { getContent, saveContent } from '@/lib/content'
import { verifyToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

function authenticate(req: NextRequest): boolean {
  const auth = req.headers.get('Authorization')
  if (auth?.startsWith('Bearer ')) {
    return verifyToken(auth.slice(7))
  }
  return false
}

export async function GET(req: NextRequest) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    return NextResponse.json(getContent())
  } catch (err) {
    console.error('Content read error:', err)
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    if (!body?.pages || !body?.settings) {
      return NextResponse.json({ error: 'Invalid structure' }, { status: 400 })
    }
    // Normalise comma-separated keyword strings back to arrays
    for (const pageKey of Object.keys(body.pages)) {
      const page = body.pages[pageKey]
      if (typeof page.keywords === 'string') {
        page.keywords = (page.keywords as string).split(',').map((k: string) => k.trim()).filter(Boolean)
      }
    }
    saveContent(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Content save error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
