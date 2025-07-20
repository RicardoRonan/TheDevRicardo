<template>
  <div class="favorites-view container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-4">My Favorites</h1>
      <p class="text-gray-400 text-lg">Your personally curated collection</p>
    </div>

    <MediaGrid
      :items="userStore.favorites"
      :loading="false"
      :is4K="true"
      :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
      empty-message="No favorites yet. Start adding movies and TV shows you love!"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import MediaGrid from '@/components/MediaGrid.vue'

const userStore = useUserStore()
</script>