import crypto from 'crypto'

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'changeme'
}

function getSecret(): string {
  return process.env.ADMIN_JWT_SECRET || 'fallback_dev_secret'
}

function makeToken(password: string): string {
  return crypto
    .createHmac('sha256', getSecret())
    .update(`${password}:admin`)
    .digest('hex')
}

export function verifyPassword(password: string): string | null {
  const adminPw = getAdminPassword()
  if (password !== adminPw) return null
  return makeToken(password)
}

export function verifyToken(token: string): boolean {
  const expected = makeToken(getAdminPassword())
  // constant-time compare
  try {
    return crypto.timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}
