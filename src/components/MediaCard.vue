<template>
  <div 
    class="media-card group relative bg-gray-900 rounded-lg overflow-hidden media-card-hover"
    @click="handleCardClick"
  >
    <!-- Poster Image -->
    <div class="relative aspect-[2/3] overflow-hidden">
      <img
        :src="posterUrl"
        :alt="media.title || media.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
        @error="handleImageError"
      />
      
      <!-- Overlay gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <!-- 4K Badge -->
      <div 
        v-if="is4K"
        class="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded font-medium"
      >
        4K
      </div>

      <!-- Watch Progress -->
      <div 
        v-if="watchProgress && watchProgress.currentTime > 0"
        class="absolute bottom-0 left-0 right-0 h-1 bg-gray-600"
      >
        <div 
          class="h-full bg-red-600 transition-all duration-300"
          :style="{ width: `${progressPercentage}%` }"
        />
      </div>

      <!-- Hover Controls -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="flex space-x-3">
          <!-- Play Button -->
          <button
            @click.stop="handlePlay"
            class="bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full p-3 transition-all duration-200 transform hover:scale-110"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
          </button>

          <!-- Add to List Button -->
          <button
            @click.stop="toggleWatchLater"
            class="bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-3 transition-all duration-200 transform hover:scale-110"
            :class="{ 'text-yellow-400': isInWatchLater }"
          >
            <svg v-if="!isInWatchLater" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
          </button>

          <!-- Favorite Button -->
          <button
            @click.stop="toggleFavorite"
            class="bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-3 transition-all duration-200 transform hover:scale-110"
            :class="{ 'text-red-500': isFavorite }"
          >
            <svg v-if="!isFavorite" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Media Info -->
    <div class="p-4">
      <h3 class="text-white font-semibold text-sm mb-1 line-clamp-2">
        {{ media.title || media.name }}
      </h3>
      
      <div class="flex items-center justify-between text-xs text-gray-400 mb-2">
        <span>{{ releaseYear }}</span>
        <div class="flex items-center space-x-1">
          <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span>{{ rating }}</span>
        </div>
      </div>

      <!-- Media Type Badge -->
      <div class="flex items-center justify-between">
        <span 
          class="text-xs px-2 py-1 rounded-full"
          :class="mediaTypeBadgeClass"
        >
          {{ mediaTypeLabel }}
        </span>

        <!-- Episode Count for TV Shows -->
        <span 
          v-if="media.mediaType === 'tv' && tvShow"
          class="text-xs text-gray-400"
        >
          {{ tvShow.numberOfSeasons }} {{ tvShow.numberOfSeasons === 1 ? 'Season' : 'Seasons' }}
        </span>
      </div>

      <!-- Description -->
      <p class="text-gray-400 text-xs mt-2 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {{ media.overview }}
      </p>
    </div>

    <!-- Loading State -->
    <div 
      v-if="isLoading"
      class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { Media, TVShow } from '@/types'

interface Props {
  media: Media
  is4K?: boolean
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  is4K: false,
  size: 'medium'
})

const router = useRouter()
const userStore = useUserStore()

// Local state
const isLoading = ref(false)
const imageError = ref(false)

// Computed properties
const posterUrl = computed(() => {
  if (imageError.value) {
    return `https://via.placeholder.com/300x450/374151/9CA3AF?text=${encodeURIComponent(props.media.title || props.media.name || 'No Image')}`
  }
  return props.media.posterPath || `https://via.placeholder.com/300x450/374151/9CA3AF?text=${encodeURIComponent(props.media.title || props.media.name || 'No Image')}`
})

const releaseYear = computed(() => {
  const date = props.media.releaseDate || (props.media as TVShow).firstAirDate
  return date ? new Date(date).getFullYear() : 'N/A'
})

const rating = computed(() => {
  return props.media.voteAverage?.toFixed(1) || 'N/A'
})

const mediaTypeLabel = computed(() => {
  return props.media.mediaType === 'movie' ? 'Movie' : 'TV Show'
})

const mediaTypeBadgeClass = computed(() => {
  return props.media.mediaType === 'movie' 
    ? 'bg-blue-600 text-white' 
    : 'bg-purple-600 text-white'
})

const tvShow = computed(() => {
  return props.media.mediaType === 'tv' ? props.media as TVShow : null
})

const watchProgress = computed(() => {
  return userStore.getWatchProgress(props.media.id, props.media.mediaType)
})

const progressPercentage = computed(() => {
  if (!watchProgress.value) return 0
  return (watchProgress.value.currentTime / watchProgress.value.duration) * 100
})

const isFavorite = computed(() => {
  return userStore.isFavorite(props.media.id)
})

const isInWatchLater = computed(() => {
  return userStore.isInWatchLater(props.media.id)
})

// Methods
const handleCardClick = () => {
  // Navigate to detail view or player based on media type and availability
  if (props.media.mediaType === 'movie') {
    handlePlay()
  } else {
    // For TV shows, you might want to show episode selection
    handlePlay()
  }
}

const handlePlay = async () => {
  isLoading.value = true
  
  try {
    if (props.media.mediaType === 'movie') {
      await router.push({
        name: 'watch-movie',
        params: { id: props.media.id.toString() }
      })
    } else {
      // For TV shows, start with S1E1 or continue from last watched
      const progress = watchProgress.value
      const season = progress?.seasonNumber || 1
      const episode = progress?.episodeNumber || 1
      
      await router.push({
        name: 'watch-tv',
        params: { 
          id: props.media.id.toString(),
          season: season.toString(),
          episode: episode.toString()
        }
      })
    }
  } catch (error) {
    console.error('Navigation error:', error)
  } finally {
    isLoading.value = false
  }
}

const toggleFavorite = () => {
  userStore.toggleFavorite(props.media)
}

const toggleWatchLater = () => {
  userStore.toggleWatchLater(props.media)
}

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.media-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.media-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* Size variants */
.media-card.small {
  max-width: 150px;
}

.media-card.medium {
  max-width: 200px;
}

.media-card.large {
  max-width: 250px;
}
</style>