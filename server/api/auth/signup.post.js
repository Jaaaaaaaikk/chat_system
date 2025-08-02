import { getPool } from '../../db.js'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, firstName, middleName, lastName, password } = body

  if (!username || !firstName || !lastName || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const pool = getPool()
  // Check if username already exists
  const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
  if (existing.length) {
    throw createError({ statusCode: 409, statusMessage: 'Username already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await pool.query(
    'INSERT INTO users (username, password_hash, first_name, middle_name, last_name ) VALUES (?, ?, ?, ?, ?)',
    [username, hashedPassword, firstName, middleName, lastName ]
  )

  return { success: true }
})