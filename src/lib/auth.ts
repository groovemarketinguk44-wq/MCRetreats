import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'mc_admin_session'
const SESSION_DURATION = 60 * 60 * 24 // 24 hours

function getSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) throw new Error('ADMIN_JWT_SECRET not set')
  return secret
}

function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw) throw new Error('ADMIN_PASSWORD not set')
  return pw
}

// Simple HMAC-like token using Web Crypto
async function generateToken(password: string): Promise<string> {
  const secret = getSecret()
  const data = `${password}:${secret}:admin`
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return Buffer.from(signature).toString('hex')
}

export async function verifyPassword(password: string): Promise<string | null> {
  try {
    const adminPw = getAdminPassword()
    if (password !== adminPw) return null
    return await generateToken(password)
  } catch {
    return null
  }
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const adminPw = getAdminPassword()
    const expected = await generateToken(adminPw)
    return token === expected
  } catch {
    return false
  }
}

export async function isAdminAuthenticated(req: NextRequest): Promise<boolean> {
  // Check Authorization header
  const auth = req.headers.get('Authorization')
  if (auth?.startsWith('Bearer ')) {
    const token = auth.slice(7)
    return await verifyToken(token)
  }
  // Check cookie
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get(COOKIE_NAME)
  if (sessionCookie) {
    return await verifyToken(sessionCookie.value)
  }
  return false
}

export { COOKIE_NAME, SESSION_DURATION }
