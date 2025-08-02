<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <h2 class="text-2xl font-semibold text-center text-gray-800">Login to Chat</h2>

      <form @submit.prevent="login" class="space-y-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          autocomplete="username"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="current-password"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          Login
        </button>
      </form>

      <p class="text-center text-sm text-gray-600">
        Don’t have an account?
        <NuxtLink to="/user/signup" class="text-blue-600 hover:underline">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const username = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
      // No need for credentials: 'include' unless your API is on a different domain
    })
    toast.success('Logged in successfully!')
    router.push('/user/dashboard')
  } catch (e) {
    toast.error('Login failed. Please try again.')
  }
}
</script>

