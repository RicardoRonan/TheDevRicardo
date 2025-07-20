import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Media, Movie, TVShow, SearchFilters, ApiResponse, Genre } from '@/types'
import { apiService } from '@/services/api'

export const useMediaStore = defineStore('media', () => {
  // State
  const featuredMedia = ref<Media[]>([])
  const trendingMovies = ref<Movie[]>([])
  const trendingTVShows = ref<TVShow[]>([])
  const searchResults = ref<Media[]>([])
  const genres = ref<Genre[]>([])
  const currentMedia = ref<Media | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // Search and filter state
  const searchFilters = ref<SearchFilters>({
    query: '',
    mediaType: 'all',
    sortBy: 'popularity',
    sortOrder: 'desc'
  })
  
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalResults = ref(0)

  // Getters
  const getFeaturedMovie = computed(() => {
    return featuredMedia.value.find(media => media.mediaType === 'movie')
  })

  const getMoviesByGenre = computed(() => {
    return (genreId: number) => {
      return trendingMovies.value.filter(movie => 
        movie.genreIds.includes(genreId)
      )
    }
  })

  const getTVShowsByGenre = computed(() => {
    return (genreId: number) => {
      return trendingTVShows.value.filter(show => 
        show.genreIds.includes(genreId)
      )
    }
  })

  // Actions
  async function fetchFeaturedMedia() {
    try {
      isLoading.value = true
      error.value = null
      const response = await apiService.getFeaturedMedia()
      featuredMedia.value = response.results
    } catch (err) {
      error.value = 'Failed to fetch featured media'
      console.error('Error fetching featured media:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTrendingMovies() {
    try {
      isLoading.value = true
      error.value = null
      const response = await apiService.getTrendingMovies()
      trendingMovies.value = response.results
    } catch (err) {
      error.value = 'Failed to fetch trending movies'
      console.error('Error fetching trending movies:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTrendingTVShows() {
    try {
      isLoading.value = true
      error.value = null
      const response = await apiService.getTrendingTVShows()
      trendingTVShows.value = response.results
    } catch (err) {
      error.value = 'Failed to fetch trending TV shows'
      console.error('Error fetching trending TV shows:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function searchMedia(filters: Partial<SearchFilters> = {}) {
    try {
      isLoading.value = true
      error.value = null
      
      // Update filters
      Object.assign(searchFilters.value, filters)
      
      const response = await apiService.searchMedia({
        ...searchFilters.value,
        page: currentPage.value
      })
      
      searchResults.value = response.results
      totalPages.value = response.totalPages
      totalResults.value = response.totalResults
    } catch (err) {
      error.value = 'Failed to search media'
      console.error('Error searching media:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchMediaDetails(id: number, mediaType: 'movie' | 'tv') {
    try {
      isLoading.value = true
      error.value = null
      const response = await apiService.getMediaDetails(id, mediaType)
      currentMedia.value = response
      return response
    } catch (err) {
      error.value = 'Failed to fetch media details'
      console.error('Error fetching media details:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchGenres() {
    try {
      const response = await apiService.getGenres()
      genres.value = response
    } catch (err) {
      console.error('Error fetching genres:', err)
    }
  }

  function clearSearch() {
    searchResults.value = []
    searchFilters.value = {
      query: '',
      mediaType: 'all',
      sortBy: 'popularity',
      sortOrder: 'desc'
    }
    currentPage.value = 1
    totalPages.value = 1
    totalResults.value = 0
  }

  function setCurrentPage(page: number) {
    currentPage.value = page
    if (searchFilters.value.query) {
      searchMedia()
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    featuredMedia,
    trendingMovies,
    trendingTVShows,
    searchResults,
    genres,
    currentMedia,
    isLoading,
    error,
    searchFilters,
    currentPage,
    totalPages,
    totalResults,
    
    // Getters
    getFeaturedMovie,
    getMoviesByGenre,
    getTVShowsByGenre,
    
    // Actions
    fetchFeaturedMedia,
    fetchTrendingMovies,
    fetchTrendingTVShows,
    searchMedia,
    fetchMediaDetails,
    fetchGenres,
    clearSearch,
    setCurrentPage,
    clearError
  }
})