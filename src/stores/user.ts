import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { WatchProgress, UserPreferences, Media } from '@/types'

export const useUserStore = defineStore('user', () => {
  // State
  const watchHistory = ref<WatchProgress[]>([])
  const watchLater = ref<Media[]>([])
  const favorites = ref<Media[]>([])
  const preferences = ref<UserPreferences>({
    theme: 'default',
    autoplay: true,
    volume: 1,
    subtitles: true,
    language: 'en',
    quality: '1080p'
  })

  // Load data from localStorage on initialization
  const loadFromStorage = () => {
    try {
      const storedHistory = localStorage.getItem('mapple-watch-history')
      if (storedHistory) {
        watchHistory.value = JSON.parse(storedHistory)
      }

      const storedWatchLater = localStorage.getItem('mapple-watch-later')
      if (storedWatchLater) {
        watchLater.value = JSON.parse(storedWatchLater)
      }

      const storedFavorites = localStorage.getItem('mapple-favorites')
      if (storedFavorites) {
        favorites.value = JSON.parse(storedFavorites)
      }

      const storedPreferences = localStorage.getItem('mapple-preferences')
      if (storedPreferences) {
        preferences.value = { ...preferences.value, ...JSON.parse(storedPreferences) }
      }
    } catch (error) {
      console.error('Error loading user data from localStorage:', error)
    }
  }

  // Getters
  const recentlyWatched = computed(() => {
    return watchHistory.value
      .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime())
      .slice(0, 10)
  })

  const continueWatching = computed(() => {
    return watchHistory.value
      .filter(item => !item.completed && item.currentTime > 0)
      .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime())
      .slice(0, 6)
  })

  const getWatchProgress = computed(() => {
    return (mediaId: number, mediaType: 'movie' | 'tv', seasonNumber?: number, episodeNumber?: number) => {
      return watchHistory.value.find(item => 
        item.mediaId === mediaId && 
        item.mediaType === mediaType &&
        (mediaType === 'movie' || 
          (item.seasonNumber === seasonNumber && item.episodeNumber === episodeNumber))
      )
    }
  })

  const isFavorite = computed(() => {
    return (mediaId: number) => {
      return favorites.value.some(item => item.id === mediaId)
    }
  })

  const isInWatchLater = computed(() => {
    return (mediaId: number) => {
      return watchLater.value.some(item => item.id === mediaId)
    }
  })

  const watchTimeByMedia = computed(() => {
    const timeMap = new Map<string, number>()
    
    watchHistory.value.forEach(item => {
      const key = `${item.mediaType}-${item.mediaId}`
      const currentTime = timeMap.get(key) || 0
      timeMap.set(key, Math.max(currentTime, item.currentTime))
    })
    
    return timeMap
  })

  const totalWatchTime = computed(() => {
    return Array.from(watchTimeByMedia.value.values())
      .reduce((total, time) => total + time, 0)
  })

  const watchStats = computed(() => {
    const movies = watchHistory.value.filter(item => item.mediaType === 'movie')
    const tvShows = watchHistory.value.filter(item => item.mediaType === 'tv')
    
    return {
      totalItems: watchHistory.value.length,
      movies: movies.length,
      tvShows: tvShows.length,
      completedMovies: movies.filter(item => item.completed).length,
      completedEpisodes: tvShows.filter(item => item.completed).length,
      totalWatchTime: totalWatchTime.value,
      averageWatchTime: watchHistory.value.length > 0 ? totalWatchTime.value / watchHistory.value.length : 0
    }
  })

  // Actions
  function updateWatchProgress(progress: Omit<WatchProgress, 'watchedAt'>) {
    const existingIndex = watchHistory.value.findIndex(item =>
      item.mediaId === progress.mediaId &&
      item.mediaType === progress.mediaType &&
      (progress.mediaType === 'movie' || 
        (item.seasonNumber === progress.seasonNumber && item.episodeNumber === progress.episodeNumber))
    )

    const watchProgressItem: WatchProgress = {
      ...progress,
      watchedAt: new Date().toISOString()
    }

    if (existingIndex >= 0) {
      watchHistory.value[existingIndex] = watchProgressItem
    } else {
      watchHistory.value.push(watchProgressItem)
    }

    // Keep only last 1000 items
    if (watchHistory.value.length > 1000) {
      watchHistory.value = watchHistory.value.slice(-1000)
    }

    saveToStorage('mapple-watch-history', watchHistory.value)
  }

  function addToWatchLater(media: Media) {
    if (!isInWatchLater.value(media.id)) {
      watchLater.value.push(media)
      saveToStorage('mapple-watch-later', watchLater.value)
    }
  }

  function removeFromWatchLater(mediaId: number) {
    const index = watchLater.value.findIndex(item => item.id === mediaId)
    if (index >= 0) {
      watchLater.value.splice(index, 1)
      saveToStorage('mapple-watch-later', watchLater.value)
    }
  }

  function toggleWatchLater(media: Media) {
    if (isInWatchLater.value(media.id)) {
      removeFromWatchLater(media.id)
    } else {
      addToWatchLater(media)
    }
  }

  function addToFavorites(media: Media) {
    if (!isFavorite.value(media.id)) {
      favorites.value.push(media)
      saveToStorage('mapple-favorites', favorites.value)
    }
  }

  function removeFromFavorites(mediaId: number) {
    const index = favorites.value.findIndex(item => item.id === mediaId)
    if (index >= 0) {
      favorites.value.splice(index, 1)
      saveToStorage('mapple-favorites', favorites.value)
    }
  }

  function toggleFavorite(media: Media) {
    if (isFavorite.value(media.id)) {
      removeFromFavorites(media.id)
    } else {
      addToFavorites(media)
    }
  }

  function updatePreferences(newPreferences: Partial<UserPreferences>) {
    preferences.value = { ...preferences.value, ...newPreferences }
    saveToStorage('mapple-preferences', preferences.value)
  }

  function setTheme(theme: UserPreferences['theme']) {
    updatePreferences({ theme })
    
    // Apply theme to document
    const root = document.documentElement
    root.className = root.className.replace(/theme-\w+/g, '')
    if (theme !== 'default') {
      root.classList.add(`theme-${theme}`)
    }
  }

  function clearWatchHistory() {
    watchHistory.value = []
    localStorage.removeItem('mapple-watch-history')
  }

  function clearWatchLater() {
    watchLater.value = []
    localStorage.removeItem('mapple-watch-later')
  }

  function clearFavorites() {
    favorites.value = []
    localStorage.removeItem('mapple-favorites')
  }

  function resetPreferences() {
    preferences.value = {
      theme: 'default',
      autoplay: true,
      volume: 1,
      subtitles: true,
      language: 'en',
      quality: '1080p'
    }
    saveToStorage('mapple-preferences', preferences.value)
  }

  function exportUserData() {
    return {
      watchHistory: watchHistory.value,
      watchLater: watchLater.value,
      favorites: favorites.value,
      preferences: preferences.value,
      stats: watchStats.value,
      exportedAt: new Date().toISOString()
    }
  }

  function importUserData(data: any) {
    try {
      if (data.watchHistory) {
        watchHistory.value = data.watchHistory
        saveToStorage('mapple-watch-history', watchHistory.value)
      }
      
      if (data.watchLater) {
        watchLater.value = data.watchLater
        saveToStorage('mapple-watch-later', watchLater.value)
      }
      
      if (data.favorites) {
        favorites.value = data.favorites
        saveToStorage('mapple-favorites', favorites.value)
      }
      
      if (data.preferences) {
        updatePreferences(data.preferences)
      }
      
      return true
    } catch (error) {
      console.error('Error importing user data:', error)
      return false
    }
  }

  function saveToStorage(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  // Initialize data on store creation
  loadFromStorage()

  return {
    // State
    watchHistory,
    watchLater,
    favorites,
    preferences,

    // Getters
    recentlyWatched,
    continueWatching,
    getWatchProgress,
    isFavorite,
    isInWatchLater,
    watchTimeByMedia,
    totalWatchTime,
    watchStats,

    // Actions
    updateWatchProgress,
    addToWatchLater,
    removeFromWatchLater,
    toggleWatchLater,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    updatePreferences,
    setTheme,
    clearWatchHistory,
    clearWatchLater,
    clearFavorites,
    resetPreferences,
    exportUserData,
    importUserData,
    loadFromStorage
  }
})