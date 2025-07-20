<template>
  <div class="not-found-view h-screen flex items-center justify-center bg-gray-900">
    <div class="text-center max-w-md mx-auto px-4">
      <div class="mb-8">
        <div class="text-8xl font-bold text-red-600 mb-4">404</div>
        <h1 class="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p class="text-gray-400 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div class="space-y-4">
        <router-link
          to="/"
          class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors inline-block"
        >
          Go Home
        </router-link>
        
        <div class="text-gray-500">
          <button
            @click="goBack"
            class="hover:text-white transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>