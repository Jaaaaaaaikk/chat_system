<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg flex flex-col p-6">
      <div class="text-2xl font-bold text-blue-600 mb-4">Chat Dashboard</div>
      <nav class="flex-1 space-y-2">
        <NuxtLink to="/user/dashboard/chats" class="nav-link" exact>📨 Chats</NuxtLink>
        <NuxtLink to="/user/dashboard/groups" class="nav-link">👥 Groups</NuxtLink>
        <NuxtLink to="/user/dashboard/contacts" class="nav-link">📇 Contacts</NuxtLink>
        <NuxtLink to="/user/dashboard/settings" class="nav-link">⚙️ Settings</NuxtLink>
      </nav>
      <button @click="logout"
        class="bg-red-100 text-red-600 font-medium py-2 rounded-lg hover:bg-red-200 transition cursor-pointer">
        🔓 Logout
      </button>
    </aside>
    <!-- Main content area -->
    <main class="flex-1 p-8 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const router = useRouter()

const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    toast.success('You have been logged out.')
    router.push('/user/login')
}
</script>

<style scoped>
.nav-link {
    display: block;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    color: #374151;
    /* text-gray-700 */
    font-weight: 500;
    transition: all 0.2s;
}

.nav-link:hover {
    background-color: #f3f4f6;
    /* bg-gray-100 */
}

.router-link-active {
    background-color: #e0f2fe;
    /* bg-blue-100 */
    color: #0284c7;
    /* text-blue-600 */
}
</style>
