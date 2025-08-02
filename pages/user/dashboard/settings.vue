<template> 
  <div class="space-y-8">
    <!-- Profile Settings -->
    <section class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-semibold mb-4">👤 Profile Settings</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="profile.name"
        />
        <input
          type="email"
          placeholder="Email Address"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="profile.email"
        />
        <!-- Department Dropdown -->
        <select
          v-model="profile.department"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">Select Department</option>
          <option>HR</option>
          <option>IT</option>
          <option>Finance</option>
          <option>Marketing</option>
          <option>Operations</option>
        </select>
        <!-- Position Dropdown -->
        <select
          v-model="profile.position"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">Select Position</option>
          <option>Manager</option>
          <option>Supervisor</option>
          <option>Staff</option>
          <option>Intern</option>
          <option>Director</option>
        </select>
        <!-- Phone Number (PH format) -->
        <input
          type="tel"
          placeholder="Phone Number (e.g. 09XXXXXXXXX)"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="profile.phone"
          pattern="^09\d{9}$"
          maxlength="11"
        />
      </div>
      <button
        class="mt-4 bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        @click="updateProfile"
      >
        Save Changes
      </button>
    </section>

    <!-- Privacy -->
    <section class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-semibold mb-4">🔐 Privacy</h2>
      <label class="flex items-center space-x-3">
        <input type="checkbox" v-model="privacy.showStatus" />
        <span>Show my online status to others</span>
      </label>
    </section>

    <!-- Notifications -->
    <section class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-semibold mb-4">🔔 Notifications</h2>
      <label class="flex items-center space-x-3">
        <input type="checkbox" v-model="notifications.newMessage" />
        <span>Notify me for new messages</span>
      </label>
      <label class="flex items-center space-x-3 mt-2">
        <input type="checkbox" v-model="notifications.groupMentions" />
        <span>Notify me when I'm mentioned in a group</span>
      </label>
    </section>

    <!-- Appearance -->
    <section class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-semibold mb-4">🎨 Appearance</h2>
      <select
        v-model="theme"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
      </select>
    </section>

    <!-- Account -->
    <section class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-semibold mb-4">⚠️ Account</h2>
      <button
        class="bg-red-100 text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-200 transition"
      >
        Delete Account
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const profile = ref({
  name: 'John Doe',
  email: 'john@example.com',
  department: '',
  position: '',
  phone: '',
})

const privacy = ref({
  showStatus: true,
})

const notifications = ref({
  newMessage: true,
  groupMentions: false,
})

const theme = ref('light')

const updateProfile = () => {
  // Validate phone number (PH format) only if not empty
  if (profile.value.phone && !/^09\d{9}$/.test(profile.value.phone)) {
    toast.error('Please enter a valid PH phone number (e.g. 09XXXXXXXXX)')
    return
  }
  // Normally you'd make an API request here
  toast.success('Profile updated successfully!')
}
</script>
