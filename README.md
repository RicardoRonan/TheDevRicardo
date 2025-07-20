# Mapple TV - Vue.js Streaming Application

A complete Vue.js streaming platform inspired by Mapple TV, built with modern web technologies and featuring a Netflix-like interface for movies and TV shows.

## 🎬 Features

### Core Functionality
- **🎥 Video Player**: Custom HTML5 video player with full controls
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🔍 Search & Discovery**: Real-time search with filtering options
- **📺 Media Library**: Browse movies and TV shows with pagination
- **⭐ User Collections**: Favorites and Watch Later lists
- **📊 Watch Progress**: Automatic progress tracking and resume functionality
- **🎨 Theme Support**: Multiple color themes (Default, Green, Blue, Purple)

### Video Player Features
- ▶️ Play/Pause with spacebar support
- 🔊 Volume control with mute option
- ⏭️ Seek functionality with click and drag
- 📱 Fullscreen support
- ⌨️ Keyboard shortcuts (F for fullscreen, M for mute, arrows for seeking)
- 🎬 Skip intro/outro buttons
- 📹 Auto-next episode for TV shows
- 📊 Buffer progress visualization
- 🎛️ Playback speed control
- 📑 Subtitle support (UI ready)

### TV Show Features
- 📋 Episode selection interface
- 🔄 Auto-next episode with countdown
- 📈 Progress tracking per episode
- 🎯 Season and episode navigation

### User Experience
- 💾 LocalStorage persistence for user data
- 📊 Watch statistics and analytics
- 🎨 Theme customization
- 📱 Touch-friendly mobile interface
- ♿ Accessibility support (ARIA labels, keyboard navigation)
- 🌐 SEO optimized

## 🛠️ Technology Stack

- **Frontend**: Vue 3 with Composition API
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom components
- **State Management**: Pinia stores
- **Routing**: Vue Router with navigation guards
- **Build Tool**: Vite for fast development
- **Icons**: Heroicons via SVG

## 📁 Project Structure

```
src/
├── components/           # Reusable Vue components
│   ├── VideoPlayer.vue  # Main video player component
│   ├── MediaCard.vue    # Movie/TV show cards
│   ├── MediaGrid.vue    # Grid layout for media items
│   └── AppHeader.vue    # Navigation header
├── views/               # Page components
│   ├── HomeView.vue     # Homepage with featured content
│   ├── PlayerView.vue   # Video player page
│   ├── MoviesView.vue   # Movies library
│   ├── TVShowsView.vue  # TV shows library
│   ├── SearchView.vue   # Search and filter interface
│   ├── FavoritesView.vue     # User favorites
│   ├── WatchLaterView.vue    # Watch later list
│   └── NotFoundView.vue      # 404 page
├── stores/              # Pinia state management
│   ├── media.ts         # Media data and API calls
│   ├── player.ts        # Video player state
│   └── user.ts          # User preferences and history
├── services/            # API services
│   └── api.ts           # Mock API with TMDB-style data
├── types/               # TypeScript definitions
│   └── index.ts         # Interface definitions
└── router/              # Vue Router configuration
    └── index.ts         # Route definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mapple-tv-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # TypeScript type checking
```

## 🎮 Usage

### Navigation
- **Home**: Featured content and trending media
- **Movies**: Browse movie collection
- **TV Shows**: Browse TV series
- **Search**: Find specific content with filters
- **Favorites**: Your starred content
- **Watch Later**: Saved items for later viewing

### Video Player Controls
- **Space**: Play/Pause
- **F**: Toggle fullscreen
- **M**: Mute/Unmute
- **↑/↓**: Volume control
- **←/→**: Seek backward/forward
- **Esc**: Exit fullscreen or close dialogs

### Theme Switching
1. Click the theme icon in the header
2. Select from Default, Green, Blue, or Purple themes
3. Theme preference is automatically saved

## 🎨 Customization

### Adding New Themes
1. Update the theme configuration in `src/components/AppHeader.vue`
2. Add corresponding CSS variables in `tailwind.config.js`
3. Include theme styles in component CSS

### Mock Data
The application uses mock data that simulates the Mapple TV API structure. Real data can be integrated by updating the `src/services/api.ts` file.

### Video Sources
Current implementation uses sample videos from Google's test video collection. Replace with your video sources in the API service.

## 📊 State Management

### Media Store (`stores/media.ts`)
- Trending movies and TV shows
- Featured content
- Search results and filters
- Genre information

### Player Store (`stores/player.ts`)
- Video player state and controls
- Progress tracking
- Event logging
- Auto-next functionality

### User Store (`stores/user.ts`)
- Watch history and progress
- Favorites and watch later lists
- User preferences and settings
- Data export/import functionality

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=https://your-api-endpoint.com
VITE_TMDB_API_KEY=your-tmdb-api-key
VITE_APP_NAME=Mapple TV
```

### Tailwind Configuration
Customize colors, animations, and responsive breakpoints in `tailwind.config.js`.

## 📱 Progressive Web App (PWA)

The application is PWA-ready with:
- Service worker support (can be added)
- Manifest file configuration
- Offline functionality (can be implemented)
- App installation capability

## ♿ Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Reduced motion preferences
- Focus management

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📈 Performance

- Lazy loading for images and components
- Virtual scrolling for large lists
- Code splitting by routes
- Optimized bundle size with Vite
- Responsive image loading

## 🐛 Known Issues

- TypeScript strict mode may show warnings in development
- Some mock API responses are simplified
- Video player controls may need fine-tuning on mobile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Mapple TV](https://mappletv.uk)
- Icons by [Heroicons](https://heroicons.com)
- Fonts by [Google Fonts](https://fonts.google.com)
- Sample videos by [Google](https://commondatastorage.googleapis.com/gtv-videos-bucket/)

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using Vue.js and modern web technologies**
