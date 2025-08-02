<template>
  <div class="flex h-screen bg-gray-100">

    <!-- Center Chat Box -->
    <main class="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto">
      <div class="text-xl font-semibold">Your Chats</div>

      <div class="flex flex-col h-full border rounded-xl bg-white shadow-md p-4">
        <!-- Messages Container -->
        <div class="flex-1 overflow-y-auto space-y-4 p-2">
          <div class="self-start bg-gray-200 px-4 py-2 rounded-lg max-w-xs">
            Hello, how are you?
          </div>
          <div class="self-end bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
            I'm good! How about you?
          </div>
        </div>

        <!-- Input Box -->
        <div class="mt-4 flex items-center border-t pt-4">
          <input
            type="text"
            placeholder="Type a message..."
            class="flex-1 border rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            class="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow">
            Send
          </button>
        </div>
      </div>
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
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: #f3f4f6;
}

.router-link-active {
  background-color: #e0f2fe;
  color: #0284c7;
}
</style>
