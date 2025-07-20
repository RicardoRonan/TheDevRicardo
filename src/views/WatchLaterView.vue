<template>
  <div class="watch-later-view container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-4">Watch Later</h1>
      <p class="text-gray-400 text-lg">Save movies and shows to watch when you have time</p>
    </div>

    <MediaGrid
      :items="userStore.watchLater"
      :loading="false"
      :is4K="true"
      :columns="{ mobile: 2, tablet: 3, desktop: 4, large: 6 }"
      empty-message="Your watch later list is empty. Add some content to watch later!"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import MediaGrid from '@/components/MediaGrid.vue'

const userStore = useUserStore()
</script>