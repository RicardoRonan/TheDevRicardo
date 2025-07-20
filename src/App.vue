<template>
  <div id="app" class="min-h-screen bg-gray-900 text-white">
    <!-- Header -->
    <AppHeader v-if="!isPlayerRoute" />
    
    <!-- Main Content -->
    <main :class="{ 'pt-0': isPlayerRoute }">
      <router-view />
    </main>
    
    <!-- Global Loading Indicator -->
    <div 
      v-if="globalLoading"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="text-center text-white">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p class="text-lg">Loading...</p>
      </div>
    </div>

    <!-- Error Toast -->
    <div
      v-if="errorMessage"
      class="fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300"
    >
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <span>{{ errorMessage }}</span>
        <button @click="clearError" class="ml-2 hover:text-gray-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const mediaStore = useMediaStore()
const userStore = useUserStore()

// Local state
const globalLoading = ref(false)
const errorMessage = ref('')

// Computed properties
const isPlayerRoute = computed(() => {
  return route.meta?.fullscreen === true
})

// Methods
const clearError = () => {
  errorMessage.value = ''
  mediaStore.clearError()
}

// Watch for store errors
watch(() => mediaStore.error, (newError) => {
  if (newError) {
    errorMessage.value = newError
    // Auto-clear error after 5 seconds
    setTimeout(() => {
      if (errorMessage.value === newError) {
        clearError()
      }
    }, 5000)
  }
})

// Initialize app
onMounted(async () => {
  try {
    globalLoading.value = true
    
    // Load initial data
    await Promise.all([
      mediaStore.fetchGenres(),
      mediaStore.fetchFeaturedMedia(),
      mediaStore.fetchTrendingMovies(),
      mediaStore.fetchTrendingTVShows()
    ])
  } catch (error) {
    console.error('Failed to initialize app:', error)
  } finally {
    globalLoading.value = false
  }
})
</script>

<style>
/* Global styles */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #111827;
  color: #ffffff;
  overflow-x: hidden;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Firefox scrollbar */
html {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

/* Transitions */
.router-link-active {
  color: #ef4444 !important;
}

/* Loading animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

.slide-up {
  animation: slideUp 0.3s ease-out;
}

/* Theme transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Fullscreen player styles */
.fullscreen-route {
  overflow: hidden;
}

/* Container styles */
.container {
  max-width: 1400px;
}

/* Focus styles */
button:focus,
input:focus,
select:focus {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bg-gray-800 {
    background-color: #000000 !important;
  }
  
  .bg-gray-900 {
    background-color: #000000 !important;
  }
  
  .text-gray-400 {
    color: #ffffff !important;
  }
}
</style>
