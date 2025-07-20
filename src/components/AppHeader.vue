<template>
  <header class="bg-black bg-opacity-90 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Logo -->
          <router-link 
            to="/" 
            class="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <div class="bg-red-600 p-2 rounded-lg">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
              </svg>
            </div>
            <span class="text-xl font-bold">Mapple TV</span>
          </router-link>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-6">
            <router-link
              to="/"
              class="text-white hover:text-gray-300 transition-colors"
              :class="{ 'text-red-400': $route.name === 'home' }"
            >
              Home
            </router-link>
            <router-link
              to="/movies"
              class="text-white hover:text-gray-300 transition-colors"
              :class="{ 'text-red-400': $route.name === 'movies' }"
            >
              Movies
            </router-link>
            <router-link
              to="/tv-shows"
              class="text-white hover:text-gray-300 transition-colors"
              :class="{ 'text-red-400': $route.name === 'tv-shows' }"
            >
              TV Shows
            </router-link>
            <router-link
              to="/favorites"
              class="text-white hover:text-gray-300 transition-colors"
              :class="{ 'text-red-400': $route.name === 'favorites' }"
            >
              Favorites
            </router-link>
            <router-link
              to="/watch-later"
              class="text-white hover:text-gray-300 transition-colors"
              :class="{ 'text-red-400': $route.name === 'watch-later' }"
            >
              Watch Later
            </router-link>
          </nav>
        </div>

        <!-- Search and User Controls -->
        <div class="flex items-center space-x-4">
          <!-- Search Bar -->
          <div class="relative hidden sm:block">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              @focus="showSearchResults = true"
              @blur="hideSearchResults"
              type="text"
              placeholder="Search movies & TV shows..."
              class="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-gray-700 transition-all"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>

            <!-- Search Results Dropdown -->
            <div 
              v-if="showSearchResults && (searchResults.length > 0 || searchQuery.length > 0)"
              class="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-xl border border-gray-700 max-h-96 overflow-y-auto z-50"
            >
              <!-- Loading -->
              <div v-if="searchLoading" class="p-4 text-center">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
                <p class="text-gray-400 text-sm mt-2">Searching...</p>
              </div>

              <!-- No Results -->
              <div v-else-if="searchQuery.length > 0 && searchResults.length === 0" class="p-4 text-center">
                <p class="text-gray-400">No results found for "{{ searchQuery }}"</p>
              </div>

              <!-- Search Results -->
              <div v-else-if="searchResults.length > 0">
                <div 
                  v-for="item in searchResults.slice(0, 6)" 
                  :key="`${item.mediaType}-${item.id}`"
                  @mousedown="handleResultClick(item)"
                  class="flex items-center p-3 hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <img
                    :src="item.posterPath || placeholderImage"
                    :alt="item.title || item.name"
                    class="w-12 h-16 object-cover rounded mr-3"
                    @error="handleImageError"
                  />
                  <div class="flex-1">
                    <h4 class="text-white font-medium text-sm">{{ item.title || item.name }}</h4>
                    <p class="text-gray-400 text-xs">{{ item.mediaType === 'movie' ? 'Movie' : 'TV Show' }} • {{ getYear(item) }}</p>
                  </div>
                </div>
                <div 
                  v-if="searchResults.length > 6"
                  @mousedown="viewAllResults"
                  class="p-3 text-center border-t border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <span class="text-red-400 text-sm">View all {{ searchResults.length }} results →</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Search Button -->
          <button
            @click="toggleMobileSearch"
            class="sm:hidden text-white hover:text-gray-300 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>

          <!-- Theme Selector -->
          <div class="relative">
            <button
              @click="showThemeMenu = !showThemeMenu"
              class="text-white hover:text-gray-300 transition-colors p-2"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
              </svg>
            </button>

            <!-- Theme Menu -->
            <div 
              v-if="showThemeMenu"
              v-click-outside="() => showThemeMenu = false"
              class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50"
            >
              <button
                v-for="theme in themes"
                :key="theme.value"
                @click="selectTheme(theme.value)"
                class="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-2"
                :class="{ 'bg-gray-700': currentTheme === theme.value }"
              >
                <div 
                  class="w-4 h-4 rounded-full"
                  :style="{ backgroundColor: theme.color }"
                ></div>
                <span>{{ theme.name }}</span>
              </button>
            </div>
          </div>

          <!-- User Menu -->
          <div class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="text-white hover:text-gray-300 transition-colors"
            >
              <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium">U</span>
              </div>
            </button>

            <!-- User Menu Dropdown -->
            <div 
              v-if="showUserMenu"
              v-click-outside="() => showUserMenu = false"
              class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50"
            >
              <div class="px-4 py-2 border-b border-gray-700">
                <p class="text-white font-medium">User</p>
                <p class="text-gray-400 text-sm">{{ watchStats.totalItems }} items watched</p>
              </div>
              <router-link
                to="/favorites"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-white hover:bg-gray-700 transition-colors"
              >
                My Favorites
              </router-link>
              <router-link
                to="/watch-later"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-white hover:bg-gray-700 transition-colors"
              >
                Watch Later
              </router-link>
              <button
                @click="exportUserData"
                class="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
              >
                Export Data
              </button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden text-white hover:text-gray-300 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <div 
        v-if="showMobileSearch"
        class="sm:hidden py-4 border-t border-gray-800"
      >
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search movies & TV shows..."
            class="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-gray-700 transition-all"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="showMobileMenu"
        class="md:hidden py-4 border-t border-gray-800"
      >
        <nav class="flex flex-col space-y-2">
          <router-link
            to="/"
            @click="showMobileMenu = false"
            class="text-white hover:text-gray-300 transition-colors py-2"
            :class="{ 'text-red-400': $route.name === 'home' }"
          >
            Home
          </router-link>
          <router-link
            to="/movies"
            @click="showMobileMenu = false"
            class="text-white hover:text-gray-300 transition-colors py-2"
            :class="{ 'text-red-400': $route.name === 'movies' }"
          >
            Movies
          </router-link>
          <router-link
            to="/tv-shows"
            @click="showMobileMenu = false"
            class="text-white hover:text-gray-300 transition-colors py-2"
            :class="{ 'text-red-400': $route.name === 'tv-shows' }"
          >
            TV Shows
          </router-link>
          <router-link
            to="/favorites"
            @click="showMobileMenu = false"
            class="text-white hover:text-gray-300 transition-colors py-2"
            :class="{ 'text-red-400': $route.name === 'favorites' }"
          >
            Favorites
          </router-link>
          <router-link
            to="/watch-later"
            @click="showMobileMenu = false"
            class="text-white hover:text-gray-300 transition-colors py-2"
            :class="{ 'text-red-400': $route.name === 'watch-later' }"
          >
            Watch Later
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'
import type { Media, TVShow } from '@/types'

const router = useRouter()
const mediaStore = useMediaStore()
const userStore = useUserStore()

// Local state
const searchQuery = ref('')
const searchResults = ref<Media[]>([])
const searchLoading = ref(false)
const showSearchResults = ref(false)
const showMobileSearch = ref(false)
const showMobileMenu = ref(false)
const showUserMenu = ref(false)
const showThemeMenu = ref(false)
let searchTimeout: number | null = null

// Computed properties
const currentTheme = computed(() => userStore.preferences.theme)
const watchStats = computed(() => userStore.watchStats)

const themes = [
  { name: 'Default', value: 'default', color: '#3b82f6' },
  { name: 'Green', value: 'green', color: '#16A085' },
  { name: 'Blue', value: 'blue', color: '#2980B9' },
  { name: 'Purple', value: 'purple', color: '#9B59B6' }
]

const placeholderImage = 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image'

// Methods
const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = window.setTimeout(async () => {
    if (searchQuery.value.trim().length > 0) {
      searchLoading.value = true
      try {
        await mediaStore.searchMedia({ query: searchQuery.value.trim() })
        searchResults.value = mediaStore.searchResults
      } catch (error) {
        console.error('Search error:', error)
        searchResults.value = []
      } finally {
        searchLoading.value = false
      }
    } else {
      searchResults.value = []
    }
  }, 300)
}

const hideSearchResults = () => {
  setTimeout(() => {
    showSearchResults.value = false
  }, 200)
}

const handleResultClick = (item: Media) => {
  showSearchResults.value = false
  searchQuery.value = ''
  
  if (item.mediaType === 'movie') {
    router.push(`/watch/movie/${item.id}`)
  } else {
    router.push(`/watch/tv/${item.id}/1/1`)
  }
}

const viewAllResults = () => {
  showSearchResults.value = false
  router.push({
    name: 'search',
    query: { q: searchQuery.value }
  })
}

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
  if (!showMobileSearch.value) {
    searchQuery.value = ''
    searchResults.value = []
  }
}

const selectTheme = (theme: string) => {
  userStore.setTheme(theme as any)
  showThemeMenu.value = false
}

const exportUserData = () => {
  const data = userStore.exportUserData()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `mapple-tv-data-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  showUserMenu.value = false
}

const getYear = (item: Media) => {
  const date = item.releaseDate || (item as TVShow).firstAirDate
  return date ? new Date(date).getFullYear() : 'N/A'
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = placeholderImage
}

// Custom directive for click outside
const vClickOutside = {
  beforeMount(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

// Watch for route changes to close menus
watch(() => router.currentRoute.value, () => {
  showMobileMenu.value = false
  showUserMenu.value = false
  showThemeMenu.value = false
})

onMounted(() => {
  // Apply current theme
  const theme = userStore.preferences.theme
  if (theme !== 'default') {
    document.documentElement.classList.add(`theme-${theme}`)
  }
})
</script>

<style scoped>
/* Theme-specific styles */
:global(.theme-green) .bg-red-600 {
  background-color: #16A085 !important;
}

:global(.theme-blue) .bg-red-600 {
  background-color: #2980B9 !important;
}

:global(.theme-purple) .bg-red-600 {
  background-color: #9B59B6 !important;
}

:global(.theme-green) .text-red-400 {
  color: #16A085 !important;
}

:global(.theme-blue) .text-red-400 {
  color: #2980B9 !important;
}

:global(.theme-purple) .text-red-400 {
  color: #9B59B6 !important;
}

:global(.theme-green) .focus\:ring-red-600:focus {
  --tw-ring-color: #16A085 !important;
}

:global(.theme-blue) .focus\:ring-red-600:focus {
  --tw-ring-color: #2980B9 !important;
}

:global(.theme-purple) .focus\:ring-red-600:focus {
  --tw-ring-color: #9B59B6 !important;
}
</style>