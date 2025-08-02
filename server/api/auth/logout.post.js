import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  // Clear the access_token cookie by setting it to expire immediately
  setCookie(event, 'access_token', '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0, // Expire immediately
  })
  return { success: true }
})