<template>
  <div class="search-view container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-4">Search</h1>
      <p class="text-gray-400 text-lg">Find your favorite movies and TV shows</p>
    </div>

    <!-- Search and Filters -->
    <div class="bg-gray-800 rounded-lg p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search Input -->
        <div class="flex-1">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search movies & TV shows..."
            class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        
        <!-- Filters -->
        <div class="flex gap-4">
          <select
            v-model="filters.mediaType"
            @change="handleFilterChange"
            class="bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
          
          <select
            v-model="filters.sortBy"
            @change="handleFilterChange"
            class="bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="popularity">Popularity</option>
            <option value="release_date">Release Date</option>
            <option value="vote_average">Rating</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="searchQuery">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-white">
          Search Results
          <span v-if="mediaStore.totalResults > 0" class="text-gray-400 text-lg font-normal">
            ({{ mediaStore.totalResults }} results)
          </span>
        </h2>
      </div>

      <MediaGrid
        :items="mediaStore.searchResults"
        :loading="mediaStore.isLoading"
        :show-pagination="true"
        :current-page="mediaStore.currentPage"
        :total-pages="mediaStore.totalPages"
        :is4K="true"
        :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
        empty-message="No results found. Try different search terms."
        @page-change="handlePageChange"
      />
    </div>

    <!-- Default State -->
    <div v-else class="text-center py-16">
      <svg class="w-20 h-20 text-gray-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
      </svg>
      <h3 class="text-2xl font-bold text-white mb-2">Search for Movies & TV Shows</h3>
      <p class="text-gray-400">Enter a title, actor, or keyword to get started</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMediaStore } from '@/stores/media'
import MediaGrid from '@/components/MediaGrid.vue'
import type { SearchFilters } from '@/types'

const route = useRoute()
const router = useRouter()
const mediaStore = useMediaStore()

const searchQuery = ref('')
const filters = ref<SearchFilters>({
  query: '',
  mediaType: 'all',
  sortBy: 'popularity',
  sortOrder: 'desc'
})

let searchTimeout: number | null = null

const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = window.setTimeout(() => {
    filters.value.query = searchQuery.value
    performSearch()
  }, 500)
}

const handleFilterChange = () => {
  performSearch()
}

const performSearch = async () => {
  if (searchQuery.value.trim()) {
    await mediaStore.searchMedia(filters.value)
    
    // Update URL
    router.replace({
      query: {
        q: searchQuery.value,
        type: filters.value.mediaType,
        sort: filters.value.sortBy
      }
    })
  } else {
    mediaStore.clearSearch()
  }
}

const handlePageChange = (page: number) => {
  mediaStore.setCurrentPage(page)
}

// Initialize from URL params
onMounted(() => {
  const query = route.query.q as string
  const type = route.query.type as string
  const sort = route.query.sort as string

  if (query) {
    searchQuery.value = query
    filters.value.query = query
  }
  
  if (type) {
    filters.value.mediaType = type as any
  }
  
  if (sort) {
    filters.value.sortBy = sort as any
  }

  if (query) {
    performSearch()
  }
})
</script>