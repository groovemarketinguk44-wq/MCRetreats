import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const UPLOAD_DIR =
  process.env.NODE_ENV === 'production'
    ? '/app/data/uploads'
    : path.join(process.cwd(), 'public', 'uploads')

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  // Prevent path traversal — only allow single flat filename
  const filename = path.basename(params.slug.join('/'))
  const filepath = path.join(UPLOAD_DIR, filename)

  if (!fs.existsSync(filepath)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const ext = filename.split('.').pop()?.toLowerCase() || ''
  const contentType = MIME[ext] || 'application/octet-stream'
  const data = fs.readFileSync(filepath)

  return new NextResponse(data, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
