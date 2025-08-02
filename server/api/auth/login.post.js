import { getPool } from '../../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  const pool = getPool()
  // Find user by username
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
  if (!rows.length) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }
  const user = rows[0]
  // Compare password with hash
  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  // Generate access token
  const accessToken = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' })

  // Set access token as HTTP-only cookie
  setCookie(event, 'access_token', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  })

  // Optionally, you can return user info (but not the token)
  return { user }
})