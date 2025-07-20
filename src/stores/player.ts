import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { VideoPlayerState, PlayerEvent, Media, Episode } from '@/types'

export const usePlayerStore = defineStore('player', () => {
  // State
  const playerState = ref<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    isLoading: false,
    showControls: true,
    playbackRate: 1,
    buffered: null
  })

  const currentMedia = ref<Media | null>(null)
  const currentEpisode = ref<Episode | null>(null)
  const autoNext = ref(true)
  const showNextEpisodeButton = ref(false)
  const nextEpisodeCountdown = ref(0)
  const events = ref<PlayerEvent[]>([])

  // Video element reference
  const videoElement = ref<HTMLVideoElement | null>(null)

  // Getters
  const progress = computed(() => {
    if (playerState.value.duration === 0) return 0
    return (playerState.value.currentTime / playerState.value.duration) * 100
  })

  const isNearEnd = computed(() => {
    if (playerState.value.duration === 0) return false
    return progress.value >= 90
  })

  const formattedCurrentTime = computed(() => {
    return formatTime(playerState.value.currentTime)
  })

  const formattedDuration = computed(() => {
    return formatTime(playerState.value.duration)
  })

  const bufferedProgress = computed(() => {
    if (!playerState.value.buffered || playerState.value.duration === 0) return 0
    const buffered = playerState.value.buffered
    if (buffered.length > 0) {
      const bufferedEnd = buffered.end(buffered.length - 1)
      return (bufferedEnd / playerState.value.duration) * 100
    }
    return 0
  })

  // Actions
  function setVideoElement(element: HTMLVideoElement) {
    videoElement.value = element
    setupEventListeners()
  }

  function setupEventListeners() {
    if (!videoElement.value) return

    const video = videoElement.value

    video.addEventListener('loadedmetadata', () => {
      playerState.value.duration = video.duration
      playerState.value.isLoading = false
    })

    video.addEventListener('timeupdate', () => {
      playerState.value.currentTime = video.currentTime
      playerState.value.buffered = video.buffered
      
      // Emit timeupdate event
      emitPlayerEvent('timeupdate')
      
      // Check if near end for auto-next
      if (isNearEnd.value && currentEpisode.value && autoNext.value) {
        showNextEpisodeButton.value = true
        startNextEpisodeCountdown()
      }
    })

    video.addEventListener('play', () => {
      playerState.value.isPlaying = true
      emitPlayerEvent('play')
    })

    video.addEventListener('pause', () => {
      playerState.value.isPlaying = false
      emitPlayerEvent('pause')
    })

    video.addEventListener('seeked', () => {
      emitPlayerEvent('seeked')
    })

    video.addEventListener('ended', () => {
      playerState.value.isPlaying = false
      emitPlayerEvent('ended')
      
      if (autoNext.value && currentEpisode.value) {
        playNextEpisode()
      }
    })

    video.addEventListener('volumechange', () => {
      playerState.value.volume = video.volume
      playerState.value.isMuted = video.muted
      emitPlayerEvent('volumechange')
    })

    video.addEventListener('loadstart', () => {
      playerState.value.isLoading = true
    })

    video.addEventListener('canplay', () => {
      playerState.value.isLoading = false
    })

    // Fullscreen events
    document.addEventListener('fullscreenchange', () => {
      playerState.value.isFullscreen = !!document.fullscreenElement
      emitPlayerEvent('fullscreenchange')
    })
  }

  function play() {
    if (videoElement.value) {
      videoElement.value.play()
    }
  }

  function pause() {
    if (videoElement.value) {
      videoElement.value.pause()
    }
  }

  function togglePlay() {
    if (playerState.value.isPlaying) {
      pause()
    } else {
      play()
    }
  }

  function seek(time: number) {
    if (videoElement.value) {
      videoElement.value.currentTime = time
      playerState.value.currentTime = time
    }
  }

  function seekByPercentage(percentage: number) {
    const time = (percentage / 100) * playerState.value.duration
    seek(time)
  }

  function setVolume(volume: number) {
    if (videoElement.value) {
      videoElement.value.volume = Math.max(0, Math.min(1, volume))
      playerState.value.volume = videoElement.value.volume
    }
  }

  function toggleMute() {
    if (videoElement.value) {
      videoElement.value.muted = !videoElement.value.muted
      playerState.value.isMuted = videoElement.value.muted
    }
  }

  function setPlaybackRate(rate: number) {
    if (videoElement.value) {
      videoElement.value.playbackRate = rate
      playerState.value.playbackRate = rate
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (videoElement.value?.requestFullscreen) {
        videoElement.value.requestFullscreen()
      }
    } else {
      document.exitFullscreen()
    }
  }

  function showControls() {
    playerState.value.showControls = true
  }

  function hideControls() {
    playerState.value.showControls = false
  }

  function setCurrentMedia(media: Media, episode?: Episode) {
    currentMedia.value = media
    currentEpisode.value = episode || null
    showNextEpisodeButton.value = false
    nextEpisodeCountdown.value = 0
  }

  function emitPlayerEvent(type: PlayerEvent['type']) {
    if (!currentMedia.value) return

    const event: PlayerEvent = {
      type,
      currentTime: playerState.value.currentTime,
      duration: playerState.value.duration,
      mediaId: currentMedia.value.id,
      mediaType: currentMedia.value.mediaType,
      timestamp: new Date().toISOString(),
      seasonNumber: currentEpisode.value?.seasonNumber,
      episodeNumber: currentEpisode.value?.episodeNumber
    }

    events.value.push(event)
    
    // Keep only last 100 events
    if (events.value.length > 100) {
      events.value = events.value.slice(-100)
    }
  }

  function startNextEpisodeCountdown() {
    if (nextEpisodeCountdown.value > 0) return
    
    nextEpisodeCountdown.value = 10
    const countdown = setInterval(() => {
      nextEpisodeCountdown.value--
      if (nextEpisodeCountdown.value <= 0) {
        clearInterval(countdown)
        if (autoNext.value) {
          playNextEpisode()
        }
      }
    }, 1000)
  }

  function playNextEpisode() {
    // This would be implemented based on the current episode and season data
    // For now, just hide the next episode button
    showNextEpisodeButton.value = false
    nextEpisodeCountdown.value = 0
  }

  function cancelAutoNext() {
    nextEpisodeCountdown.value = 0
    showNextEpisodeButton.value = false
  }

  function skipIntro() {
    // Skip 90 seconds (typical intro length)
    seek(playerState.value.currentTime + 90)
  }

  function skipOutro() {
    // Skip to next episode or end
    if (currentEpisode.value && autoNext.value) {
      playNextEpisode()
    } else {
      seek(playerState.value.duration)
    }
  }

  function reset() {
    playerState.value = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
      isMuted: false,
      isFullscreen: false,
      isLoading: false,
      showControls: true,
      playbackRate: 1,
      buffered: null
    }
    currentMedia.value = null
    currentEpisode.value = null
    showNextEpisodeButton.value = false
    nextEpisodeCountdown.value = 0
    videoElement.value = null
  }

  function getEventsByType(type: PlayerEvent['type']) {
    return events.value.filter(event => event.type === type)
  }

  function exportEvents() {
    return {
      events: events.value,
      summary: {
        totalEvents: events.value.length,
        playEvents: getEventsByType('play').length,
        pauseEvents: getEventsByType('pause').length,
        seekEvents: getEventsByType('seeked').length,
        totalWatchTime: events.value
          .filter(e => e.type === 'timeupdate')
          .reduce((acc, e) => Math.max(acc, e.currentTime), 0)
      }
    }
  }

  return {
    // State
    playerState,
    currentMedia,
    currentEpisode,
    autoNext,
    showNextEpisodeButton,
    nextEpisodeCountdown,
    events,
    videoElement,

    // Getters
    progress,
    isNearEnd,
    formattedCurrentTime,
    formattedDuration,
    bufferedProgress,

    // Actions
    setVideoElement,
    setupEventListeners,
    play,
    pause,
    togglePlay,
    seek,
    seekByPercentage,
    setVolume,
    toggleMute,
    setPlaybackRate,
    toggleFullscreen,
    showControls,
    hideControls,
    setCurrentMedia,
    emitPlayerEvent,
    startNextEpisodeCountdown,
    playNextEpisode,
    cancelAutoNext,
    skipIntro,
    skipOutro,
    reset,
    getEventsByType,
    exportEvents
  }
})

// Helper function
function formatTime(timeInSeconds: number): string {
  const hours = Math.floor(timeInSeconds / 3600)
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
  const seconds = Math.floor(timeInSeconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}