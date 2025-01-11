import jwt from 'jsonwebtoken'
import { readFileSync } from 'node:fs'

export function safeVerify(token) {
  try {
    return jwt.verify(
      token,
      readFileSync('./public.key'),
      { algorithms: ['RS256'] }
    )
  } catch {
    return false
  }
}