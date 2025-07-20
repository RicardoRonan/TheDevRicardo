<template>
  <div class="media-grid">
    <!-- Section Header -->
    <div v-if="title" class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-white">{{ title }}</h2>
      <button 
        v-if="showViewAll && items.length > 0"
        @click="$emit('view-all')"
        class="text-gray-400 hover:text-white transition-colors text-sm"
      >
        View All →
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <div 
        v-for="n in 6" 
        :key="n"
        class="animate-pulse"
      >
        <div class="bg-gray-700 aspect-[2/3] rounded-lg mb-3"></div>
        <div class="bg-gray-700 h-4 rounded mb-2"></div>
        <div class="bg-gray-700 h-3 rounded w-3/4"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div 
      v-else-if="items.length === 0"
      class="text-center py-12"
    >
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
        </svg>
        <p class="text-lg">{{ emptyMessage || 'No content available' }}</p>
      </div>
    </div>

    <!-- Media Grid -->
    <div 
      v-else
      class="grid gap-4"
      :class="gridClass"
    >
      <MediaCard
        v-for="item in displayItems"
        :key="`${item.mediaType}-${item.id}`"
        :media="item"
        :is4K="is4K"
        :size="cardSize"
      />
    </div>

    <!-- Load More Button -->
    <div 
      v-if="showLoadMore && hasMore"
      class="text-center mt-8"
    >
      <button
        @click="$emit('load-more')"
        :disabled="loadingMore"
        class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loadingMore" class="flex items-center">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </span>
        <span v-else>Load More</span>
      </button>
    </div>

    <!-- Pagination -->
    <div 
      v-if="showPagination && totalPages > 1"
      class="flex items-center justify-center space-x-2 mt-8"
    >
      <button
        @click="$emit('page-change', currentPage - 1)"
        :disabled="currentPage <= 1"
        class="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      <div class="flex space-x-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="$emit('page-change', page)"
          :class="[
            'px-3 py-2 rounded text-sm',
            page === currentPage 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-800 hover:bg-gray-700 text-white'
          ]"
        >
          {{ page }}
        </button>
      </div>
      
      <button
        @click="$emit('page-change', currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MediaCard from './MediaCard.vue'
import type { Media } from '@/types'

interface Props {
  title?: string
  items: Media[]
  loading?: boolean
  loadingMore?: boolean
  cardSize?: 'small' | 'medium' | 'large'
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
    large?: number
  }
  maxItems?: number
  showViewAll?: boolean
  showLoadMore?: boolean
  showPagination?: boolean
  hasMore?: boolean
  currentPage?: number
  totalPages?: number
  is4K?: boolean
  emptyMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  loadingMore: false,
  cardSize: 'medium',
  columns: () => ({
    mobile: 2,
    tablet: 3,
    desktop: 4,
    large: 6
  }),
  showViewAll: false,
  showLoadMore: false,
  showPagination: false,
  hasMore: false,
  currentPage: 1,
  totalPages: 1,
  is4K: false
})

defineEmits<{
  'view-all': []
  'load-more': []
  'page-change': [page: number]
}>()

// Computed properties
const displayItems = computed(() => {
  if (props.maxItems) {
    return props.items.slice(0, props.maxItems)
  }
  return props.items
})

const gridClass = computed(() => {
  const cols = props.columns
  return [
    `grid-cols-${cols.mobile || 2}`,
    `sm:grid-cols-${cols.tablet || 3}`,
    `md:grid-cols-${cols.desktop || 4}`,
    `lg:grid-cols-${Math.min(cols.large || 6, 6)}`,
    `xl:grid-cols-${Math.min(cols.large || 6, 8)}`
  ].join(' ')
})

const visiblePages = computed(() => {
  const current = props.currentPage
  const total = props.totalPages
  const delta = 2 // Show 2 pages on each side of current page
  
  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)
  
  // Adjust if we're near the beginning or end
  if (current <= delta) {
    end = Math.min(total, 2 * delta + 1)
  }
  if (current + delta >= total) {
    start = Math.max(1, total - 2 * delta)
  }
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})
</script>

<style scoped>
/* Responsive grid classes for Tailwind */
@media (min-width: 640px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .grid-cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
  .grid-cols-8 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
}
</style>