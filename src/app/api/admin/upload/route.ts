import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const UPLOAD_DIR =
  process.env.NODE_ENV === 'production'
    ? '/app/data/uploads'
    : path.join(process.cwd(), 'public', 'uploads')

export async function POST(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (!auth?.startsWith('Bearer ') || !verifyToken(auth.slice(7))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  fs.mkdirSync(UPLOAD_DIR, { recursive: true })

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const filepath = path.join(UPLOAD_DIR, filename)

  const bytes = await file.arrayBuffer()
  fs.writeFileSync(filepath, Buffer.from(bytes))

  return NextResponse.json({ path: `/api/uploads/${filename}` })
}
