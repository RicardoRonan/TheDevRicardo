import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MoviesView from '@/views/MoviesView.vue'
import TVShowsView from '@/views/TVShowsView.vue'
import PlayerView from '@/views/PlayerView.vue'
import SearchView from '@/views/SearchView.vue'
import WatchLaterView from '@/views/WatchLaterView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Mapple TV - Stream Movies & TV Shows'
      }
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView,
      meta: {
        title: 'Movies - Mapple TV'
      }
    },
    {
      path: '/tv-shows',
      name: 'tv-shows',
      component: TVShowsView,
      meta: {
        title: 'TV Shows - Mapple TV'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: {
        title: 'Search - Mapple TV'
      }
    },
    {
      path: '/watch-later',
      name: 'watch-later',
      component: WatchLaterView,
      meta: {
        title: 'Watch Later - Mapple TV'
      }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
      meta: {
        title: 'Favorites - Mapple TV'
      }
    },
    {
      path: '/watch/movie/:id',
      name: 'watch-movie',
      component: PlayerView,
      props: route => ({
        mediaId: parseInt(route.params.id as string),
        mediaType: 'movie'
      }),
      meta: {
        title: 'Watch Movie - Mapple TV',
        fullscreen: true
      }
    },
    {
      path: '/watch/tv/:id/:season/:episode',
      name: 'watch-tv',
      component: PlayerView,
      props: route => ({
        mediaId: parseInt(route.params.id as string),
        mediaType: 'tv',
        seasonNumber: parseInt(route.params.season as string),
        episodeNumber: parseInt(route.params.episode as string)
      }),
      meta: {
        title: 'Watch TV Show - Mapple TV',
        fullscreen: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: 'Page Not Found - Mapple TV'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Update document title
  const defaultTitle = 'Mapple TV - Stream Movies & TV Shows'
  document.title = to.meta.title as string || defaultTitle
  
  // Handle fullscreen routes
  if (to.meta.fullscreen) {
    document.body.classList.add('fullscreen-route')
  } else {
    document.body.classList.remove('fullscreen-route')
  }
  
  next()
})

export default router