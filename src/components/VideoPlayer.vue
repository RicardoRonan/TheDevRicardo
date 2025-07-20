<template>
  <div 
    ref="playerContainer"
    class="video-player-container relative w-full bg-black overflow-hidden"
    :class="{ 'cursor-none': !showControls && isPlaying }"
    @mousemove="handleMouseMove"
    @mouseleave="hideControlsDelayed"
    @click="togglePlay"
    @keydown="handleKeyDown"
    tabindex="0"
  >
    <!-- Video Element -->
    <video
      ref="videoElement"
      class="w-full h-full object-contain"
      :src="streamUrl"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @play="onPlay"
      @pause="onPause"
      @seeked="onSeeked"
      @ended="onEnded"
      @volumechange="onVolumeChange"
      @loadstart="onLoadStart"
      @canplay="onCanPlay"
      @error="onError"
      preload="metadata"
      playsinline
    />

    <!-- Loading Overlay -->
    <div 
      v-if="playerState.isLoading"
      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
    >
      <div class="text-center text-white">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4 mx-auto"></div>
        <p class="text-lg">Preparing video stream...</p>
        <p class="text-sm text-gray-300">4K Quality</p>
      </div>
    </div>

    <!-- Controls Overlay -->
    <div 
      v-show="showControls || !isPlaying"
      class="video-player-controls absolute inset-0 z-10"
      :class="{ 'hidden': !showControls && isPlaying }"
    >
      <!-- Center Play Button -->
      <div 
        v-if="!isPlaying"
        class="absolute inset-0 flex items-center justify-center"
        @click.stop="play"
      >
        <button class="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-6 transition-all duration-200">
          <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
          </svg>
        </button>
      </div>

      <!-- Top Controls -->
      <div class="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black to-transparent">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button
              @click="$emit('back')"
              class="text-white hover:text-gray-300 transition-colors"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div class="text-white">
              <h3 class="text-lg font-semibold">{{ mediaTitle }}</h3>
              <p v-if="episodeInfo" class="text-sm text-gray-300">{{ episodeInfo }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-white text-sm bg-green-600 px-2 py-1 rounded">4K</span>
            <button
              @click.stop="toggleSubtitles"
              class="text-white hover:text-gray-300 transition-colors"
              :class="{ 'text-yellow-400': subtitlesEnabled }"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3zM6 6v8h8V6H6zm2 2h4v1H8V8zm0 2h4v1H8v-1z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Controls -->
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <!-- Progress Bar -->
        <div class="mb-4">
          <div 
            ref="progressBar"
            class="relative h-2 bg-gray-600 rounded-full cursor-pointer hover:h-3 transition-all duration-200"
            @click="seekToPosition"
            @mousedown="startDragging"
          >
            <!-- Buffered Progress -->
            <div 
              class="absolute top-0 left-0 h-full bg-gray-400 rounded-full"
              :style="{ width: `${bufferedProgress}%` }"
            />
            <!-- Watched Progress -->
            <div 
              class="absolute top-0 left-0 h-full bg-red-600 rounded-full"
              :style="{ width: `${progress}%` }"
            />
            <!-- Scrubber -->
            <div 
              class="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full border-2 border-white"
              :style="{ left: `calc(${progress}% - 8px)` }"
            />
          </div>
          <div class="flex justify-between text-xs text-gray-300 mt-1">
            <span>{{ formattedCurrentTime }}</span>
            <span>{{ formattedDuration }}</span>
          </div>
        </div>

        <!-- Control Buttons -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Play/Pause -->
            <button
              @click.stop="togglePlay"
              class="text-white hover:text-gray-300 transition-colors"
            >
              <svg v-if="!isPlaying" class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
              <svg v-else class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 3.5A1.5 1.5 0 017 2h1.5a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 16.5v-13zM12.5 3.5A1.5 1.5 0 0114 2h1.5a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5H14a1.5 1.5 0 01-1.5-1.5v-13z"/>
              </svg>
            </button>

            <!-- Skip Buttons -->
            <button
              @click.stop="skipBackward"
              class="text-white hover:text-gray-300 transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
              </svg>
            </button>

            <button
              @click.stop="skipForward"
              class="text-white hover:text-gray-300 transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z"/>
              </svg>
            </button>

            <!-- Volume Controls -->
            <div class="flex items-center space-x-2">
              <button
                @click.stop="toggleMute"
                class="text-white hover:text-gray-300 transition-colors"
              >
                <svg v-if="isMuted || volume === 0" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776l-4.146-3.32A.5.5 0 014 13.25v-6.5a.5.5 0 01.237-.424l4.146-3.32zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"/>
                </svg>
                <svg v-else-if="volume < 0.5" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776l-4.146-3.32A.5.5 0 014 13.25v-6.5a.5.5 0 01.237-.424l4.146-3.32zM14.657 8.929a1 1 0 011.414 0 3 3 0 010 4.242 1 1 0 01-1.414-1.414 1 1 0 000-1.414 1 1 0 010-1.414z"/>
                </svg>
                <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776l-4.146-3.32A.5.5 0 014 13.25v-6.5a.5.5 0 01.237-.424l4.146-3.32zM14.657 8.929a1 1 0 011.414 0 3 3 0 010 4.242 1 1 0 01-1.414-1.414 1 1 0 000-1.414 1 1 0 010-1.414zM17.071 6.515a1 1 0 011.414 0 7 7 0 010 9.9 1 1 0 11-1.414-1.414 5 5 0 000-7.072 1 1 0 010-1.414z"/>
                </svg>
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                :value="volume"
                @input="setVolume"
                class="w-20 accent-red-600"
              />
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Playback Speed -->
            <select
              v-model="playbackRate"
              @change="setPlaybackRate"
              class="bg-transparent text-white border border-gray-600 rounded px-2 py-1 text-sm"
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>

            <!-- Skip Intro/Outro -->
            <button
              v-if="showSkipIntro"
              @click.stop="skipIntro"
              class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm transition-all"
            >
              Skip Intro
            </button>

            <!-- Fullscreen -->
            <button
              @click.stop="toggleFullscreen"
              class="text-white hover:text-gray-300 transition-colors"
            >
              <svg v-if="!isFullscreen" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zM16 4a1 1 0 00-1-1h-4a1 1 0 000 2h1.586l-2.293 2.293a1 1 0 001.414 1.414L13 6.414V8a1 1 0 002 0V4zM3 16a1 1 0 001 1h4a1 1 0 000-2H6.414l2.293-2.293a1 1 0 00-1.414-1.414L5 13.586V12a1 1 0 00-2 0v4zM16 16a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L13 13.586V12a1 1 0 012 0v4z"/>
              </svg>
              <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 4a1 1 0 00-1 1v2a1 1 0 002 0V6.414l1.293 1.293a1 1 0 001.414-1.414L9.414 4H11a1 1 0 000-2H7a1 1 0 00-1 1zM4 12a1 1 0 001-1v-2a1 1 0 00-2 0v1.586l-1.293-1.293a1 1 0 00-1.414 1.414L2.586 12H1a1 1 0 000 2h4a1 1 0 001-1zM12 8a1 1 0 001 1h2a1 1 0 000-2h-1.586l1.293-1.293a1 1 0 00-1.414-1.414L11.586 6H13a1 1 0 000-2H9a1 1 0 00-1 1v4a1 1 0 001 1zM16 12a1 1 0 00-1-1h-2a1 1 0 000 2h1.586l-1.293 1.293a1 1 0 001.414 1.414L16.414 14H15a1 1 0 000 2h4a1 1 0 00-1-1v-4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Next Episode Button -->
    <div 
      v-if="showNextEpisodeButton"
      class="absolute bottom-20 right-4 z-20"
    >
      <div class="bg-black bg-opacity-80 rounded-lg p-4 text-white">
        <p class="text-sm mb-2">Next episode in {{ nextEpisodeCountdown }}s</p>
        <div class="flex space-x-2">
          <button
            @click="playNextEpisode"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Play Now
          </button>
          <button
            @click="cancelAutoNext"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useUserStore } from '@/stores/user'
import type { Media, Episode } from '@/types'

interface Props {
  streamUrl: string
  media: Media
  episode?: Episode
}

const props = defineProps<Props>()

const emit = defineEmits<{
  back: []
}>()

const playerStore = usePlayerStore()
const userStore = useUserStore()

// Refs
const playerContainer = ref<HTMLElement>()
const videoElement = ref<HTMLVideoElement>()
const progressBar = ref<HTMLElement>()

// Local state
const showControls = ref(true)
const subtitlesEnabled = ref(false)
const showSkipIntro = ref(false)
const isDragging = ref(false)
let controlsTimeout: number | null = null

// Computed properties
const playerState = computed(() => playerStore.playerState)
const isPlaying = computed(() => playerState.value.isPlaying)
const progress = computed(() => playerStore.progress)
const bufferedProgress = computed(() => playerStore.bufferedProgress)
const formattedCurrentTime = computed(() => playerStore.formattedCurrentTime)
const formattedDuration = computed(() => playerStore.formattedDuration)
const isFullscreen = computed(() => playerState.value.isFullscreen)
const volume = computed(() => playerState.value.volume)
const isMuted = computed(() => playerState.value.isMuted)
const playbackRate = computed({
  get: () => playerState.value.playbackRate,
  set: (value) => playerStore.setPlaybackRate(Number(value))
})
const showNextEpisodeButton = computed(() => playerStore.showNextEpisodeButton)
const nextEpisodeCountdown = computed(() => playerStore.nextEpisodeCountdown)

const mediaTitle = computed(() => {
  return props.media.title || props.media.name || 'Unknown Title'
})

const episodeInfo = computed(() => {
  if (props.episode) {
    return `S${props.episode.seasonNumber}:E${props.episode.episodeNumber} - ${props.episode.name}`
  }
  return null
})

// Methods
const handleMouseMove = () => {
  showControls.value = true
  resetControlsTimeout()
}

const hideControlsDelayed = () => {
  if (isPlaying.value) {
    controlsTimeout = window.setTimeout(() => {
      showControls.value = false
    }, 3000)
  }
}

const resetControlsTimeout = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
    controlsTimeout = null
  }
  hideControlsDelayed()
}

const play = () => {
  playerStore.play()
}

const pause = () => {
  playerStore.pause()
}

const togglePlay = () => {
  playerStore.togglePlay()
}

const skipBackward = () => {
  const newTime = Math.max(0, playerState.value.currentTime - 10)
  playerStore.seek(newTime)
}

const skipForward = () => {
  const newTime = Math.min(playerState.value.duration, playerState.value.currentTime + 10)
  playerStore.seek(newTime)
}

const toggleMute = () => {
  playerStore.toggleMute()
}

const setVolume = (event: Event) => {
  const target = event.target as HTMLInputElement
  playerStore.setVolume(Number(target.value))
}

const setPlaybackRate = () => {
  playerStore.setPlaybackRate(playbackRate.value)
}

const toggleFullscreen = () => {
  playerStore.toggleFullscreen()
}

const toggleSubtitles = () => {
  subtitlesEnabled.value = !subtitlesEnabled.value
}

const skipIntro = () => {
  playerStore.skipIntro()
}

const playNextEpisode = () => {
  playerStore.playNextEpisode()
}

const cancelAutoNext = () => {
  playerStore.cancelAutoNext()
}

const seekToPosition = (event: MouseEvent) => {
  if (!progressBar.value) return
  
  const rect = progressBar.value.getBoundingClientRect()
  const percentage = (event.clientX - rect.left) / rect.width
  playerStore.seekByPercentage(percentage * 100)
}

const startDragging = (event: MouseEvent) => {
  isDragging.value = true
  seekToPosition(event)
  
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.value) {
      seekToPosition(e)
    }
  }
  
  const handleMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.code) {
    case 'Space':
      event.preventDefault()
      togglePlay()
      break
    case 'ArrowLeft':
      event.preventDefault()
      skipBackward()
      break
    case 'ArrowRight':
      event.preventDefault()
      skipForward()
      break
    case 'ArrowUp':
      event.preventDefault()
      playerStore.setVolume(Math.min(1, volume.value + 0.1))
      break
    case 'ArrowDown':
      event.preventDefault()
      playerStore.setVolume(Math.max(0, volume.value - 0.1))
      break
    case 'KeyF':
      event.preventDefault()
      toggleFullscreen()
      break
    case 'KeyM':
      event.preventDefault()
      toggleMute()
      break
    case 'Escape':
      if (isFullscreen.value) {
        toggleFullscreen()
      }
      break
  }
}

// Video event handlers
const onLoadedMetadata = () => {
  if (videoElement.value) {
    playerStore.setVideoElement(videoElement.value)
  }
}

const onTimeUpdate = () => {
  // Update watch progress
  if (props.media) {
    userStore.updateWatchProgress({
      mediaId: props.media.id,
      mediaType: props.media.mediaType,
      currentTime: playerState.value.currentTime,
      duration: playerState.value.duration,
      completed: playerState.value.currentTime >= playerState.value.duration * 0.9,
      seasonNumber: props.episode?.seasonNumber,
      episodeNumber: props.episode?.episodeNumber
    })
  }
  
  // Show skip intro button during intro period (0-90 seconds)
  showSkipIntro.value = playerState.value.currentTime < 90 && playerState.value.currentTime > 5
}

const onPlay = () => {
  resetControlsTimeout()
}

const onPause = () => {
  showControls.value = true
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
    controlsTimeout = null
  }
}

const onSeeked = () => {
  // Event handled by player store
}

const onEnded = () => {
  showControls.value = true
}

const onVolumeChange = () => {
  // Event handled by player store
}

const onLoadStart = () => {
  // Event handled by player store
}

const onCanPlay = () => {
  // Event handled by player store
}

const onError = (event: Event) => {
  console.error('Video playback error:', event)
}

// Lifecycle
onMounted(() => {
  if (videoElement.value) {
    playerStore.setVideoElement(videoElement.value)
    playerStore.setCurrentMedia(props.media, props.episode)
  }
  
  // Focus the container for keyboard controls
  if (playerContainer.value) {
    playerContainer.value.focus()
  }
  
  // Start with controls visible
  resetControlsTimeout()
})

onUnmounted(() => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
  }
  playerStore.reset()
})

// Watch for stream URL changes
watch(() => props.streamUrl, (newUrl) => {
  if (videoElement.value && newUrl) {
    videoElement.value.src = newUrl
  }
})
</script>

<style scoped>
.video-player-container {
  aspect-ratio: 16 / 9;
}

.video-player-controls {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  transition: opacity 0.3s ease;
}

.video-player-controls.hidden {
  opacity: 0;
  pointer-events: none;
}

/* Custom range input styling */
input[type="range"] {
  appearance: none;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  background: #dc2626;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #dc2626;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* Fullscreen styles */
:global(.fullscreen-route) .video-player-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}
</style>