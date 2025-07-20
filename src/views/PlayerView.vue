<template>
  <div class="player-view h-screen bg-black overflow-hidden">
    <!-- Video Player -->
    <VideoPlayer
      v-if="streamUrl && currentMedia"
      :stream-url="streamUrl"
      :media="currentMedia"
      :episode="currentEpisode"
      @back="handleBack"
    />

    <!-- Loading State -->
    <div 
      v-else-if="isLoading"
      class="h-full flex items-center justify-center"
    >
      <div class="text-center text-white">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p class="text-lg mb-2">{{ loadingMessage }}</p>
        <p class="text-sm text-gray-400">4K Quality Stream</p>
      </div>
    </div>

    <!-- Error State -->
    <div 
      v-else-if="error"
      class="h-full flex items-center justify-center"
    >
      <div class="text-center text-white max-w-md mx-auto px-4">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <h2 class="text-2xl font-bold mb-2">Playback Error</h2>
        <p class="text-gray-400 mb-6">{{ error }}</p>
        <div class="space-y-3">
          <button
            @click="retry"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            @click="handleBack"
            class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors ml-3"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div 
      v-else-if="!currentMedia && !isLoading"
      class="h-full flex items-center justify-center"
    >
      <div class="text-center text-white max-w-md mx-auto px-4">
        <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
        </svg>
        <h2 class="text-2xl font-bold mb-2">Content Not Found</h2>
        <p class="text-gray-400 mb-6">
          The {{ mediaType === 'movie' ? 'movie' : 'episode' }} you're looking for could not be found.
        </p>
        <button
          @click="handleBack"
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>

    <!-- Episode Selection Overlay (for TV shows) -->
    <div 
      v-if="showEpisodeSelector && currentMedia?.mediaType === 'tv'"
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
    >
      <div class="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white">
            {{ currentMedia.title || currentMedia.name }} - Episodes
          </h3>
          <button
            @click="showEpisodeSelector = false"
            class="text-gray-400 hover:text-white transition-colors"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <!-- Season Selector -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-300 mb-2">Season</label>
          <select
            v-model="selectedSeason"
            @change="loadEpisodes"
            class="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-full"
          >
            <option 
              v-for="season in availableSeasons" 
              :key="season"
              :value="season"
            >
              Season {{ season }}
            </option>
          </select>
        </div>

        <!-- Episodes List -->
        <div v-if="episodes.length > 0" class="space-y-2">
          <div
            v-for="episode in episodes"
            :key="episode.id"
            @click="selectEpisode(episode)"
            class="flex items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors"
          >
            <img
              :src="episode.stillPath || placeholderImage"
              :alt="episode.name"
              class="w-16 h-9 object-cover rounded mr-3"
              @error="handleImageError"
            />
            <div class="flex-1">
              <h4 class="text-white font-medium">
                {{ episode.episodeNumber }}. {{ episode.name }}
              </h4>
              <p class="text-gray-400 text-sm line-clamp-2">{{ episode.overview }}</p>
              <div class="flex items-center space-x-2 mt-1">
                <span class="text-xs text-gray-500">{{ episode.runtime }}min</span>
                <span class="text-xs text-gray-500">•</span>
                <span class="text-xs text-gray-500">{{ formatDate(episode.airDate) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Episodes -->
        <div v-else-if="loadingEpisodes" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
          <p class="text-gray-400">Loading episodes...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'
import { apiService } from '@/services/api'
import VideoPlayer from '@/components/VideoPlayer.vue'
import type { Media, Episode, Season } from '@/types'

interface Props {
  mediaId: number
  mediaType: 'movie' | 'tv'
  seasonNumber?: number
  episodeNumber?: number
}

const props = defineProps<Props>()

const router = useRouter()
const route = useRoute()
const mediaStore = useMediaStore()
const userStore = useUserStore()

// Local state
const currentMedia = ref<Media | null>(null)
const currentEpisode = ref<Episode | null>(null)
const streamUrl = ref('')
const isLoading = ref(true)
const error = ref('')
const loadingMessage = ref('Loading content...')

// Episode selection
const showEpisodeSelector = ref(false)
const selectedSeason = ref(1)
const episodes = ref<Episode[]>([])
const availableSeasons = ref<number[]>([1, 2, 3]) // This would come from API
const loadingEpisodes = ref(false)

const placeholderImage = 'https://via.placeholder.com/300x169/374151/9CA3AF?text=No+Image'

// Computed properties
const loadingSteps = [
  'Loading content details...',
  'Preparing video stream...',
  'Optimizing 4K quality...',
  'Almost ready...'
]

// Methods
const loadContent = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    // Step 1: Load media details
    loadingMessage.value = loadingSteps[0]
    const media = await mediaStore.fetchMediaDetails(props.mediaId, props.mediaType)
    
    if (!media) {
      error.value = 'Content not found'
      return
    }
    
    currentMedia.value = media
    
    // Step 2: For TV shows, load episode details
    if (props.mediaType === 'tv' && props.seasonNumber && props.episodeNumber) {
      loadingMessage.value = 'Loading episode details...'
      const episodeData = await apiService.getTVEpisodes(media.tmdbId, props.seasonNumber)
      const episode = episodeData.find(ep => ep.episodeNumber === props.episodeNumber)
      
      if (episode) {
        currentEpisode.value = episode
        selectedSeason.value = props.seasonNumber
      }
    }
    
    // Step 3: Get stream URL
    loadingMessage.value = loadingSteps[1]
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
    
    let streamData
    if (props.mediaType === 'movie') {
      streamData = await apiService.getMovieStream(media.tmdbId)
    } else {
      streamData = await apiService.getTVStream(
        media.tmdbId, 
        props.seasonNumber || 1, 
        props.episodeNumber || 1
      )
    }
    
    // Step 4: Finalize loading
    loadingMessage.value = loadingSteps[2]
    await new Promise(resolve => setTimeout(resolve, 500))
    
    loadingMessage.value = loadingSteps[3]
    await new Promise(resolve => setTimeout(resolve, 300))
    
    streamUrl.value = streamData.streamUrl
    
  } catch (err) {
    console.error('Error loading content:', err)
    error.value = 'Failed to load content. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const loadEpisodes = async () => {
  if (!currentMedia.value || currentMedia.value.mediaType !== 'tv') return
  
  try {
    loadingEpisodes.value = true
    const episodeData = await apiService.getTVEpisodes(
      currentMedia.value.tmdbId, 
      selectedSeason.value
    )
    episodes.value = episodeData
  } catch (err) {
    console.error('Error loading episodes:', err)
  } finally {
    loadingEpisodes.value = false
  }
}

const selectEpisode = (episode: Episode) => {
  showEpisodeSelector.value = false
  
  // Navigate to the selected episode
  router.push({
    name: 'watch-tv',
    params: {
      id: props.mediaId.toString(),
      season: episode.seasonNumber.toString(),
      episode: episode.episodeNumber.toString()
    }
  })
}

const handleBack = () => {
  // Go back to the previous page or home
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const retry = () => {
  loadContent()
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = placeholderImage
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}

// Watch for route changes
watch(() => [props.mediaId, props.seasonNumber, props.episodeNumber], () => {
  loadContent()
}, { immediate: false })

// Keyboard shortcuts
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    if (showEpisodeSelector.value) {
      showEpisodeSelector.value = false
    } else {
      handleBack()
    }
  }
  
  if (event.key === 'e' && currentMedia.value?.mediaType === 'tv') {
    showEpisodeSelector.value = !showEpisodeSelector.value
    if (showEpisodeSelector.value) {
      loadEpisodes()
    }
  }
}

// Lifecycle
onMounted(() => {
  loadContent()
  
  // Add keyboard event listeners
  document.addEventListener('keydown', handleKeyDown)
  
  // Set page title
  document.title = 'Watch - Mapple TV'
})

// Cleanup
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

// Auto-save watch progress
let progressInterval: number | null = null

const startProgressTracking = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
  
  progressInterval = window.setInterval(() => {
    if (currentMedia.value && streamUrl.value) {
      // Progress tracking is handled in the VideoPlayer component
      // This is just a backup or for additional analytics
    }
  }, 10000) // Save progress every 10 seconds
}

const stopProgressTracking = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

// Start/stop progress tracking based on loading state
watch(() => isLoading.value, (loading) => {
  if (!loading && streamUrl.value) {
    startProgressTracking()
  } else {
    stopProgressTracking()
  }
})

// Cleanup on unmount
onUnmounted(() => {
  stopProgressTracking()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Fullscreen optimizations */
.player-view {
  position: relative;
  width: 100vw;
  height: 100vh;
}

/* Loading animation improvements */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Episode selector styling */
.episode-selector {
  backdrop-filter: blur(8px);
}

/* Scrollbar for episode list */
.episode-selector .overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.episode-selector .overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
}

.episode-selector .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 3px;
}

.episode-selector .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Error state improvements */
.error-state {
  background: radial-gradient(ellipse at center, rgba(239, 68, 68, 0.1) 0%, transparent 50%);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .episode-selector .max-w-2xl {
    max-width: 95vw;
    margin: 0 2.5vw;
  }
  
  .episode-selector .max-h-\[80vh\] {
    max-height: 85vh;
  }
}
</style>