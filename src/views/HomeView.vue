<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="relative h-screen">
      <div v-if="featuredMovie" class="relative h-full">
        <!-- Background Image -->
        <div 
          class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${featuredMovie.backdropPath})` }"
        >
          <div class="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative h-full flex items-center">
          <div class="container mx-auto px-4">
            <div class="max-w-2xl">
              <h1 class="text-5xl md:text-7xl font-bold mb-6 text-shadow">
                {{ featuredMovie.title || featuredMovie.name }}
              </h1>
              
              <div class="flex items-center space-x-4 mb-6">
                <div class="flex items-center space-x-1">
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-lg font-semibold">{{ featuredMovie.voteAverage.toFixed(1) }}</span>
                </div>
                <span class="text-lg">{{ getYear(featuredMovie) }}</span>
                <span class="bg-green-600 text-white text-sm px-2 py-1 rounded">4K</span>
                <span class="bg-gray-600 text-white text-sm px-2 py-1 rounded">
                  {{ featuredMovie.mediaType === 'movie' ? 'Movie' : 'TV Show' }}
                </span>
              </div>
              
              <p class="text-lg md:text-xl mb-8 text-gray-200 line-clamp-3">
                {{ featuredMovie.overview }}
              </p>
              
              <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  @click="playFeatured"
                  class="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                  <span>{{ getContinueText(featuredMovie) }}</span>
                </button>
                
                <button
                  @click="toggleWatchLater(featuredMovie)"
                  class="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                  :class="{ 'bg-yellow-600 hover:bg-yellow-700': isInWatchLater(featuredMovie.id) }"
                >
                  <svg v-if="!isInWatchLater(featuredMovie.id)" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  <span>{{ isInWatchLater(featuredMovie.id) ? 'Added to List' : 'Add to List' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>

      <!-- Loading state for hero -->
      <div v-else class="h-full flex items-center justify-center bg-gray-900">
        <div class="text-center">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p class="text-lg text-gray-400">Loading featured content...</p>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <div class="container mx-auto px-4 py-12 space-y-12">
      <!-- Continue Watching -->
      <section v-if="continueWatching.length > 0">
        <MediaGrid
          title="Continue Watching"
          :items="continueWatching"
          :loading="mediaStore.isLoading"
          :max-items="6"
          :show-view-all="continueWatching.length > 6"
          :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
          @view-all="viewAllContinueWatching"
        />
      </section>

      <!-- Trending Movies -->
      <section>
        <MediaGrid
          title="Trending Movies"
          :items="mediaStore.trendingMovies"
          :loading="mediaStore.isLoading"
          :max-items="12"
          :show-view-all="true"
          :is4K="true"
          :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
          @view-all="() => $router.push('/movies')"
        />
      </section>

      <!-- Trending TV Shows -->
      <section>
        <MediaGrid
          title="Popular TV Shows"
          :items="mediaStore.trendingTVShows"
          :loading="mediaStore.isLoading"
          :max-items="12"
          :show-view-all="true"
          :is4K="true"
          :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
          @view-all="() => $router.push('/tv-shows')"
        />
      </section>

      <!-- Recently Added -->
      <section>
        <MediaGrid
          title="Recently Added"
          :items="recentlyAdded"
          :loading="mediaStore.isLoading"
          :max-items="8"
          :show-view-all="true"
          :is4K="true"
          :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
          @view-all="viewAllRecent"
        />
      </section>

      <!-- My Favorites (if any) -->
      <section v-if="userStore.favorites.length > 0">
        <MediaGrid
          title="My Favorites"
          :items="userStore.favorites"
          :max-items="6"
          :show-view-all="userStore.favorites.length > 6"
          :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
          @view-all="() => $router.push('/favorites')"
        />
      </section>

      <!-- Action & Adventure Movies -->
      <section>
        <MediaGrid
          title="Action & Adventure"
          :items="actionMovies"
          :loading="mediaStore.isLoading"
          :max-items="8"
          :show-view-all="true"
          :is4K="true"
          :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
          @view-all="() => navigateToGenre(28)"
        />
      </section>

      <!-- Drama Series -->
      <section>
        <MediaGrid
          title="Drama Series"
          :items="dramaShows"
          :loading="mediaStore.isLoading"
          :max-items="8"
          :show-view-all="true"
          :is4K="true"
          :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
          @view-all="() => navigateToGenre(18, 'tv')"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'
import MediaGrid from '@/components/MediaGrid.vue'
import type { Media, TVShow } from '@/types'

const router = useRouter()
const mediaStore = useMediaStore()
const userStore = useUserStore()

// Computed properties
const featuredMovie = computed(() => {
  return mediaStore.getFeaturedMovie || mediaStore.featuredMedia[0] || null
})

const continueWatching = computed(() => {
  return userStore.continueWatching.map(progress => {
    // Find the actual media from the store
    const allMedia = [...mediaStore.trendingMovies, ...mediaStore.trendingTVShows]
    return allMedia.find(media => media.id === progress.mediaId) || null
  }).filter(Boolean) as Media[]
})

const recentlyAdded = computed(() => {
  const allMedia = [...mediaStore.trendingMovies, ...mediaStore.trendingTVShows]
  return allMedia
    .sort((a, b) => new Date(b.releaseDate || (b as TVShow).firstAirDate || '').getTime() - 
                     new Date(a.releaseDate || (a as TVShow).firstAirDate || '').getTime())
    .slice(0, 8)
})

const actionMovies = computed(() => {
  return mediaStore.trendingMovies.filter(movie => 
    movie.genreIds.includes(28) // Action genre ID
  ).slice(0, 8)
})

const dramaShows = computed(() => {
  return mediaStore.trendingTVShows.filter(show => 
    show.genreIds.includes(18) // Drama genre ID
  ).slice(0, 8)
})

// Methods
const getYear = (media: Media) => {
  const date = media.releaseDate || (media as TVShow).firstAirDate
  return date ? new Date(date).getFullYear() : 'N/A'
}

const getContinueText = (media: Media) => {
  const progress = userStore.getWatchProgress(media.id, media.mediaType)
  if (progress && progress.currentTime > 0) {
    return 'Continue Watching'
  }
  return 'Play'
}

const isInWatchLater = (mediaId: number) => {
  return userStore.isInWatchLater(mediaId)
}

const toggleWatchLater = (media: Media) => {
  userStore.toggleWatchLater(media)
}

const playFeatured = () => {
  if (!featuredMovie.value) return
  
  const media = featuredMovie.value
  if (media.mediaType === 'movie') {
    router.push(`/watch/movie/${media.id}`)
  } else {
    // For TV shows, check if there's existing progress
    const progress = userStore.getWatchProgress(media.id, media.mediaType)
    const season = progress?.seasonNumber || 1
    const episode = progress?.episodeNumber || 1
    router.push(`/watch/tv/${media.id}/${season}/${episode}`)
  }
}

const viewAllContinueWatching = () => {
  // Navigate to a continue watching page or show all in current view
  router.push('/watch-later')
}

const viewAllRecent = () => {
  router.push({
    name: 'search',
    query: { sort: 'release_date', order: 'desc' }
  })
}

const navigateToGenre = (genreId: number, mediaType: 'movie' | 'tv' = 'movie') => {
  router.push({
    name: 'search',
    query: { genre: genreId.toString(), type: mediaType }
  })
}

// Lifecycle
onMounted(() => {
  // Data is already loaded in App.vue, but we can refresh if needed
  if (mediaStore.featuredMedia.length === 0) {
    mediaStore.fetchFeaturedMedia()
  }
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

/* Hero section responsive adjustments */
@media (max-width: 768px) {
  .home-view section:first-child h1 {
    font-size: 2.5rem;
  }
  
  .home-view section:first-child .max-w-2xl {
    max-width: 100%;
  }
}

/* Smooth scroll for anchor links */
html {
  scroll-behavior: smooth;
}

/* Background image optimization */
.bg-cover {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

@media (max-width: 768px) {
  .bg-cover {
    background-attachment: scroll;
  }
}

/* Animation improvements */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(-50%, 0, 0);
  }
  40%, 43% {
    transform: translate3d(-50%, -10px, 0);
  }
  70% {
    transform: translate3d(-50%, -5px, 0);
  }
  90% {
    transform: translate3d(-50%, -2px, 0);
  }
}
</style>