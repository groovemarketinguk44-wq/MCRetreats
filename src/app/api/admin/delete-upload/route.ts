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

  const { filePath } = await req.json()

  // Only allow deleting files from our uploads folder
  if (typeof filePath === 'string' && filePath.startsWith('/api/uploads/')) {
    const filename = path.basename(filePath)
    const fullPath = path.join(UPLOAD_DIR, filename)
    try {
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath)
    } catch {
      // File may already be gone — not an error
    }
  }

  return NextResponse.json({ success: true })
}
