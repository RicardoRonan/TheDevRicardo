<template>
  <div class="movies-view container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-4">Movies</h1>
      <p class="text-gray-400 text-lg">Discover your next favorite movie in stunning 4K quality</p>
    </div>

    <MediaGrid
      :items="mediaStore.trendingMovies"
      :loading="mediaStore.isLoading"
      :show-pagination="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :is4K="true"
      :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
      empty-message="No movies found"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMediaStore } from '@/stores/media'
import MediaGrid from '@/components/MediaGrid.vue'

const mediaStore = useMediaStore()
const currentPage = ref(1)
const totalPages = ref(1)

const handlePageChange = (page: number) => {
  currentPage.value = page
  // Load more movies if needed
}

onMounted(() => {
  if (mediaStore.trendingMovies.length === 0) {
    mediaStore.fetchTrendingMovies()
  }
})
</script>