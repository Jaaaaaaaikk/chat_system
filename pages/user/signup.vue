<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <h2 class="text-2xl font-semibold text-center text-gray-800">Create Your Account</h2>

      <form @submit.prevent="signup" class="space-y-4">
        <input v-model="username" type="text" placeholder="Username" required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input v-model="firstName" type="text" placeholder="First Name" required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input v-model="middleName" type="text" placeholder="Middle Name (Optional)"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input v-model="lastName" type="text" placeholder="Last Name" required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input v-model="password" type="password" placeholder="Password" required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit"
          class="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200">
          Sign Up
        </button>
      </form>

      <p class="text-center text-sm text-gray-600">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-600 hover:underline">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const username = ref('')
const firstName = ref('')
const lastName = ref('')
const middleName = ref('')
const confirmPassword = ref('')
const password = ref('')
const router = useRouter()

// Regex for letters only (allow spaces and hyphens if you want: /^[A-Za-z\s-]+$/)
const nameRegex = /^[A-Za-z]+$/

const signup = async () => {
  // Trim and validate required fields
  if (
    !username.value.trim() ||
    !firstName.value.trim() ||
    !lastName.value.trim() ||
    !password.value.trim() ||
    !confirmPassword.value.trim()
  ) {
    toast.warning('Please fill in all required fields.')
    return
  }
  // Validate names for letters only
  if (!nameRegex.test(firstName.value.trim())) {
    toast.warning('First name should only contain letters.')
    return
  }
  if (middleName.value.trim() && !nameRegex.test(middleName.value.trim())) {
    toast.warning('Middle name should only contain letters (or leave it blank).')
    return
  }
  if (!nameRegex.test(lastName.value.trim())) {
    toast.warning('Last name should only contain letters.')
    return
  }
  if (password.value !== confirmPassword.value) {
    toast.warning('Password do not match!') 
    return
  }
  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: {
        username: username.value.trim(),
        firstName: firstName.value.trim(),
        middleName: middleName.value.trim(),
        lastName: lastName.value.trim(),
        password: password.value
      }
    })
    toast.success('Signup successful! Please login.')
    router.push('/user/login')
  } catch (e) {
    if (e.statusCode === 409) {
      toast.warning('Username already exists')
    } else {
      toast.error('Signup failed')
    }
  }
}
</script>
