<template>
  <div class="flex min-h-screen bg-gray-100">

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <div>
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'user-sidebar'
})

import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const router = useRouter()

</script>

<style scoped>
.nav-link {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #374151; /* text-gray-700 */
  font-weight: 500;
  transition: all 0.2s;
}
.nav-link:hover {
  background-color: #f3f4f6; /* bg-gray-100 */
}
.router-link-active {
  background-color: #e0f2fe; /* bg-blue-100 */
  color: #0284c7; /* text-blue-600 */
}
</style>
