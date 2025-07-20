import type { Media, Movie, TVShow, ApiResponse, SearchFilters, Genre, Episode, Season } from '@/types'

// Mock data that simulates realistic movie and TV show data
const mockMovies: Movie[] = [
  {
    id: 1,
    tmdbId: 550,
    title: "Fight Club",
    overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
    posterPath: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdropPath: "https://image.tmdb.org/t/p/w1280/52AfXWuXCHn3UjD17rBruA9f5qb.jpg",
    releaseDate: "1999-10-15",
    voteAverage: 8.4,
    voteCount: 26280,
    popularity: 71.404,
    adult: false,
    video: false,
    originalLanguage: "en",
    originalTitle: "Fight Club",
    genreIds: [18, 53],
    mediaType: 'movie',
    runtime: 139,
    budget: 63000000,
    revenue: 100853753,
    tagline: "Mischief. Mayhem. Soap.",
    status: "Released"
  },
  {
    id: 2,
    tmdbId: 13,
    title: "Forrest Gump",
    overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.",
    posterPath: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdropPath: "https://image.tmdb.org/t/p/w1280/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    releaseDate: "1994-06-23",
    voteAverage: 8.5,
    voteCount: 25562,
    popularity: 65.321,
    adult: false,
    video: false,
    originalLanguage: "en",
    originalTitle: "Forrest Gump",
    genreIds: [35, 18, 10749],
    mediaType: 'movie',
    runtime: 142,
    budget: 55000000,
    revenue: 677387716,
    tagline: "Life is like a box of chocolates... you never know what you're gonna get.",
    status: "Released"
  },
  {
    id: 3,
    tmdbId: 278,
    title: "The Shawshank Redemption",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
    posterPath: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdropPath: "https://image.tmdb.org/t/p/w1280/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    releaseDate: "1994-09-23",
    voteAverage: 8.7,
    voteCount: 24916,
    popularity: 89.471,
    adult: false,
    video: false,
    originalLanguage: "en",
    originalTitle: "The Shawshank Redemption",
    genreIds: [18, 80],
    mediaType: 'movie',
    runtime: 142,
    budget: 25000000,
    revenue: 16000000,
    tagline: "Fear can hold you prisoner. Hope can set you free.",
    status: "Released"
  },
  {
    id: 4,
    tmdbId: 238,
    title: "The Godfather",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
    posterPath: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdropPath: "https://image.tmdb.org/t/p/w1280/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    releaseDate: "1972-03-14",
    voteAverage: 8.7,
    voteCount: 18935,
    popularity: 138.412,
    adult: false,
    video: false,
    originalLanguage: "en",
    originalTitle: "The Godfather",
    genreIds: [18, 80],
    mediaType: 'movie',
    runtime: 175,
    budget: 6000000,
    revenue: 245066411,
    tagline: "An offer you can't refuse.",
    status: "Released"
  },
  {
    id: 5,
    tmdbId: 680,
    title: "Pulp Fiction",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
    posterPath: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdropPath: "https://image.tmdb.org/t/p/w1280/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    releaseDate: "1994-09-10",
    voteAverage: 8.5,
    voteCount: 26312,
    popularity: 78.652,
    adult: false,
    video: false,
    originalLanguage: "en",
    originalTitle: "Pulp Fiction",
    genreIds: [53, 80],
    mediaType: 'movie',
    runtime: 154,
    budget: 8000000,
    revenue: 214179088,
    tagline: "Just because you are a character doesn't mean you have character.",
    status: "Released"
  }
]

const mockTVShows: TVShow[] = [
  {
    id: 6,
    tmdbId: 1399,
    title: "Game of Thrones",
    name: "Game of Thrones",
    overview: "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war.",
    posterPath: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    backdropPath: "https://image.tmdb.org/t/p/w1280/mUkuc2wyV9dHLG0D0Loaw5pO2s8.jpg",
    releaseDate: "2011-04-17",
    firstAirDate: "2011-04-17",
    lastAirDate: "2019-05-19",
    voteAverage: 8.4,
    voteCount: 21980,
    popularity: 369.594,
    adult: false,
    video: false,
    originalLanguage: "en",
    originalTitle: "Game of Thrones",
    originalName: "Game of Thrones",
    genreIds: [10765, 18, 10759],
    mediaType: 'tv',
    numberOfEpisodes: 73,
    numberOfSeasons: 8,
    episodeRunTime: [60],
    seasons: [],
    networks: [],
    createdBy: [],
    inProduction: false,
    type: "Scripted",
    status: "Ended"
  },
  {
    id: 7,
    tmdbId: 94605,
    title: "Arcane",
    name: "Arcane",
    overview: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
    posterPath: "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    backdropPath: "https://image.tmdb.org/t/p/w1280/aBgtOIKE2nLXlXtpI5zKnFfVUf9.jpg",
    releaseDate: "2021-11-06",
    firstAirDate: "2021-11-06",
    lastAirDate: "2021-11-20",
    voteAverage: 8.7,
    voteCount: 4590,
    popularity: 89.471,
    adult: false,
    video: false,
    originalLanguage: "en",
    originalTitle: "Arcane",
    originalName: "Arcane",
    genreIds: [16, 10765, 10759],
    mediaType: 'tv',
    numberOfEpisodes: 9,
    numberOfSeasons: 1,
    episodeRunTime: [40],
    seasons: [],
    networks: [],
    createdBy: [],
    inProduction: true,
    type: "Scripted",
    status: "Returning Series"
  },
  {
    id: 8,
    tmdbId: 1396,
    title: "Breaking Bad",
    name: "Breaking Bad",
    overview: "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live, he becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost.",
    posterPath: "https://image.tmdb.org/t/p/w500/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg",
    backdropPath: "https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    releaseDate: "2008-01-20",
    firstAirDate: "2008-01-20",
    lastAirDate: "2013-09-29",
    voteAverage: 8.9,
    voteCount: 12023,
    popularity: 356.952,
    adult: false,
    video: false,
    originalLanguage: "en",
    originalTitle: "Breaking Bad",
    originalName: "Breaking Bad",
    genreIds: [18, 80],
    mediaType: 'tv',
    numberOfEpisodes: 62,
    numberOfSeasons: 5,
    episodeRunTime: [45],
    seasons: [],
    networks: [],
    createdBy: [],
    inProduction: false,
    type: "Scripted",
    status: "Ended"
  }
]

const mockGenres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  { id: 10759, name: "Action & Adventure" },
  { id: 10765, name: "Sci-Fi & Fantasy" }
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const apiService = {
  async getFeaturedMedia(): Promise<ApiResponse<Media>> {
    await delay(500)
    const allMedia = [...mockMovies, ...mockTVShows] as Media[]
    return {
      page: 1,
      results: allMedia.slice(0, 6),
      totalPages: 1,
      totalResults: 6
    }
  },

  async getTrendingMovies(): Promise<ApiResponse<Movie>> {
    await delay(300)
    return {
      page: 1,
      results: mockMovies,
      totalPages: 1,
      totalResults: mockMovies.length
    }
  },

  async getTrendingTVShows(): Promise<ApiResponse<TVShow>> {
    await delay(300)
    return {
      page: 1,
      results: mockTVShows,
      totalPages: 1,
      totalResults: mockTVShows.length
    }
  },

  async searchMedia(filters: SearchFilters & { page?: number }): Promise<ApiResponse<Media>> {
    await delay(400)
    const allMedia = [...mockMovies, ...mockTVShows] as Media[]
    
    let filteredMedia = allMedia.filter(item => {
      // Filter by media type
      if (filters.mediaType !== 'all' && item.mediaType !== filters.mediaType) {
        return false
      }
      
      // Filter by search query
      if (filters.query) {
        const query = filters.query.toLowerCase()
        return item.title.toLowerCase().includes(query) || 
               item.overview.toLowerCase().includes(query)
      }
      
      return true
    })

    // Sort results
    filteredMedia.sort((a, b) => {
      switch (filters.sortBy) {
        case 'release_date':
          const dateA = new Date(a.releaseDate).getTime()
          const dateB = new Date(b.releaseDate).getTime()
          return filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        case 'vote_average':
          return filters.sortOrder === 'asc' ? 
            a.voteAverage - b.voteAverage : 
            b.voteAverage - a.voteAverage
        case 'title':
          return filters.sortOrder === 'asc' ? 
            a.title.localeCompare(b.title) : 
            b.title.localeCompare(a.title)
        case 'popularity':
        default:
          return filters.sortOrder === 'asc' ? 
            a.popularity - b.popularity : 
            b.popularity - a.popularity
      }
    })

    const page = filters.page || 1
    const perPage = 20
    const start = (page - 1) * perPage
    const end = start + perPage

    return {
      page,
      results: filteredMedia.slice(start, end),
      totalPages: Math.ceil(filteredMedia.length / perPage),
      totalResults: filteredMedia.length
    }
  },

  async getMediaDetails(id: number, mediaType: 'movie' | 'tv'): Promise<Media | null> {
    await delay(300)
    const allMedia = [...mockMovies, ...mockTVShows] as Media[]
    return allMedia.find(item => item.id === id && item.mediaType === mediaType) || null
  },

  async getGenres(): Promise<Genre[]> {
    await delay(200)
    return mockGenres
  },

  async getMovieStream(tmdbId: number): Promise<{ streamUrl: string; quality: string }> {
    await delay(800)
    // Return mock stream data
    return {
      streamUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
      quality: '4K'
    }
  },

  async getTVStream(tmdbId: number, season: number, episode: number): Promise<{ streamUrl: string; quality: string }> {
    await delay(800)
    // Return mock stream data
    return {
      streamUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4`,
      quality: '4K'
    }
  },

  async getTVSeasons(tmdbId: number): Promise<Season[]> {
    await delay(400)
    // Return mock seasons data
    const mockSeasons: Season[] = [
      {
        id: 1,
        airDate: "2011-04-17",
        episodeCount: 10,
        name: "Season 1",
        overview: "Lord Stark is torn between his family and an old friend when asked to serve at the side of King Robert Baratheon.",
        posterPath: "https://image.tmdb.org/t/p/w500/zwaj4egrhnXOBIit1tyb4Sbt3KP.jpg",
        seasonNumber: 1
      }
    ]
    return mockSeasons
  },

  async getTVEpisodes(tmdbId: number, seasonNumber: number): Promise<Episode[]> {
    await delay(400)
    // Return mock episodes data
    const mockEpisodes: Episode[] = [
      {
        id: 1,
        airDate: "2011-04-17",
        episodeNumber: 1,
        name: "Winter Is Coming",
        overview: "Eddard Stark is torn between his family and an old friend when asked to serve at the side of King Robert Baratheon; Viserys plans to win back the throne.",
        stillPath: "https://image.tmdb.org/t/p/w500/wrGWeW4WKxnaeA8sxJb2T9O6ryo.jpg",
        voteAverage: 8.1,
        voteCount: 111,
        runtime: 62,
        seasonNumber: seasonNumber,
        showId: tmdbId
      }
    ]
    return mockEpisodes
  },

  // Simulate 4K media endpoint like Mapple TV
  async get4KMedia(page: number = 1, perPage: number = 20): Promise<ApiResponse<Media>> {
    await delay(600)
    const allMedia = [...mockMovies, ...mockTVShows] as Media[]
    
    // Add 4K quality indicator to all media
    const mediaWith4K = allMedia.map(item => ({
      ...item,
      quality: '4K',
      is4K: true
    }))

    const start = (page - 1) * perPage
    const end = start + perPage

    return {
      page,
      results: mediaWith4K.slice(start, end),
      totalPages: Math.ceil(mediaWith4K.length / perPage),
      totalResults: mediaWith4K.length
    }
  }
}