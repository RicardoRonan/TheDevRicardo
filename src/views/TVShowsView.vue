<template>
  <div class="tv-shows-view container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-4">TV Shows</h1>
      <p class="text-gray-400 text-lg">Binge-watch your favorite series in crystal clear 4K</p>
    </div>

    <MediaGrid
      :items="mediaStore.trendingTVShows"
      :loading="mediaStore.isLoading"
      :show-pagination="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :is4K="true"
      :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
      empty-message="No TV shows found"
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
  // Load more TV shows if needed
}

onMounted(() => {
  if (mediaStore.trendingTVShows.length === 0) {
    mediaStore.fetchTrendingTVShows()
  }
})
</script>