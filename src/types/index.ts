export interface Media {
  id: number;
  tmdbId: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  originalLanguage: string;
  originalTitle: string;
  genreIds: number[];
  mediaType: 'movie' | 'tv';
  runtime?: number;
  status?: string;
  tagline?: string;
  budget?: number;
  revenue?: number;
  homepage?: string;
  imdbId?: string;
  productionCompanies?: ProductionCompany[];
  productionCountries?: ProductionCountry[];
  spokenLanguages?: SpokenLanguage[];
  genres?: Genre[];
}

export interface TVShow extends Media {
  mediaType: 'tv';
  name: string;
  originalName: string;
  firstAirDate: string;
  lastAirDate?: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  episodeRunTime: number[];
  seasons: Season[];
  networks: Network[];
  createdBy: Person[];
  inProduction: boolean;
  type: string;
  status: string;
}

export interface Movie extends Media {
  mediaType: 'movie';
  runtime: number;
  budget: number;
  revenue: number;
}

export interface Season {
  id: number;
  airDate: string;
  episodeCount: number;
  name: string;
  overview: string;
  posterPath: string;
  seasonNumber: number;
  episodes?: Episode[];
}

export interface Episode {
  id: number;
  airDate: string;
  episodeNumber: number;
  name: string;
  overview: string;
  stillPath: string;
  voteAverage: number;
  voteCount: number;
  runtime: number;
  seasonNumber: number;
  showId: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logoPath: string;
  name: string;
  originCountry: string;
}

export interface ProductionCountry {
  iso31661: string;
  name: string;
}

export interface SpokenLanguage {
  englishName: string;
  iso6391: string;
  name: string;
}

export interface Network {
  id: number;
  logoPath: string;
  name: string;
  originCountry: string;
}

export interface Person {
  id: number;
  creditId: string;
  name: string;
  gender: number;
  profilePath: string;
}

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isLoading: boolean;
  showControls: boolean;
  playbackRate: number;
  buffered: TimeRanges | null;
}

export interface WatchProgress {
  mediaId: number;
  mediaType: 'movie' | 'tv';
  currentTime: number;
  duration: number;
  watchedAt: string;
  completed: boolean;
  seasonNumber?: number;
  episodeNumber?: number;
}

export interface UserPreferences {
  theme: 'green' | 'blue' | 'purple' | 'default';
  autoplay: boolean;
  volume: number;
  subtitles: boolean;
  language: string;
  quality: '720p' | '1080p' | '4K';
}

export interface SearchFilters {
  query: string;
  mediaType: 'all' | 'movie' | 'tv';
  year?: number;
  genre?: number;
  sortBy: 'popularity' | 'release_date' | 'vote_average' | 'title';
  sortOrder: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}

export interface PlayerEvent {
  type: 'play' | 'pause' | 'seeked' | 'timeupdate' | 'ended' | 'volumechange' | 'fullscreenchange';
  currentTime: number;
  duration: number;
  mediaId: number;
  mediaType: 'movie' | 'tv';
  timestamp: string;
  seasonNumber?: number;
  episodeNumber?: number;
}