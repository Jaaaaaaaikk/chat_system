export default defineNuxtRouteMiddleware(async (to, from) => {
  const publicPages = ['/user/login', '/user/signup']

  // Only check on client (for SSR, you can use the cookie check as before)
  if (process.client) {
    const { authenticated } = await $fetch('/api/auth/me')
    if (!authenticated && !publicPages.includes(to.path)) {
      return navigateTo('/user/login')
    }
    if (authenticated && publicPages.includes(to.path)) {
      return navigateTo('/user/dashboard')
    }
  } else {
    // SSR fallback: check cookie presence
    const cookieStr = useRequestHeaders(['cookie']).cookie || ''
    const hasToken = cookieStr.includes('access_token=')
    if (!hasToken && !publicPages.includes(to.path)) {
      return navigateTo('/user/login')
    }
    if (hasToken && publicPages.includes(to.path)) {
      return navigateTo('/user/dashboard')
    }
  }
})
