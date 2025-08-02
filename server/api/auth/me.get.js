import { getCookie } from 'h3'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token')
  if (!token) {
    return { authenticated: false }
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    return { authenticated: true, user: payload }
  } catch (e) {
    return { authenticated: false }
  }
})