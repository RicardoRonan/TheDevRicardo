<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="hero-title">Blog & Articles</h1>
            <p class="hero-subtitle">
              Insights, tutorials, and stories from a developer's journey. Stay curious. Stay inspired.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Content -->
    <section class="blog-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading blog posts...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-container">
          <div class="error-icon">
            <i class="fa-solid fa-exclamation-triangle"></i>
          </div>
          <h2 class="error-title">Unable to load blog posts</h2>
          <p class="error-message">{{ error }}</p>
          <button @click="retryLoad" class="btn btn-primary">
            <i class="fa-solid fa-refresh"></i> Try Again
          </button>
        </div>

        <!-- Blog List -->
        <div v-else class="blog-list-grid">
          <div v-for="blog in blogs" :key="blog.id" class="blog-card" tabindex="0">
            <!-- Featured Image -->
            <div class="card-image-container" v-if="blog.featured_media_url">
              <img 
                :src="blog.featured_media_url" 
                :alt="blog.title.rendered"
                class="card-image"
                loading="lazy"
              />
            </div>
            
            <div class="card-content">
              <div class="card-header">
                <h3 class="card-title" v-html="blog.title.rendered"></h3>
                <div class="card-meta">
                  <span class="meta-item">
                    <i class="fa-regular fa-calendar"></i>
                    {{ formatDate(blog.date) }}
                  </span>
                  <span class="meta-item">
                    <i class="fa-regular fa-clock"></i>
                    {{ readingTime(blog.content) }} min read
                  </span>
                </div>
              </div>
              
              <div class="card-body">
                <p class="card-excerpt" v-html="truncateExcerpt(blog.excerpt)"></p>
              </div>
              
              <!-- Tags Section -->
              <div class="card-tags" v-if="blog.tags && blog.tags.length">
                <div class="tags-container">
                  <span 
                    v-for="tag in blog.tags.slice(0, 3)" 
                    :key="tag" 
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="blog.tags.length > 3" class="tag-more">
                    +{{ blog.tags.length - 3 }} more
                  </span>
                </div>
              </div>
              
              <router-link :to="`/blog/${getBlogSlug(blog)}`" class="btn btn-primary btn-md card-btn" :aria-label="`Read more about ${blog.title.rendered}`">
                Read <i class="fa-solid fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Blog',
  setup() {
    const blogs = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchBlogs = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await axios.get(
          'https://dev-thedevricardo.pantheonsite.io/wp-json/wp/v2/posts?per_page=10&_embed'
        );
        blogs.value = response.data;
      } catch (err) {
        error.value = 'Please check your connection or try again later.';
      } finally {
        loading.value = false;
      }
    };

    const retryLoad = () => {
      fetchBlogs();
    };

    const formatDate = (isoDate) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(isoDate).toLocaleDateString(undefined, options);
    };

    const readingTime = (content) => {
      if (!content) return 0;
      const html = typeof content === 'string' ? content : content.rendered;
      const wordsPerMinute = 200;
      const wordCount = html.replace(/<[^>]*>/g, '').split(/\s+/).length;
      return Math.ceil(wordCount / wordsPerMinute);
    };

    const truncateExcerpt = (excerpt) => {
      const html = typeof excerpt === 'string' ? excerpt : excerpt?.rendered || '';
      const text = html.replace(/<[^>]*>/g, '');
      return text.length > 180 ? text.slice(0, 180) + '...' : text;
    };

    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
    };

    const getBlogSlug = (blog) => blog.slug;

    onMounted(() => {
      fetchBlogs();
    });

    return { blogs, loading, error, retryLoad, formatDate, readingTime, truncateExcerpt, getBlogSlug };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

.blog-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  --readable-font: 'Lato', sans-serif;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0 2rem 0;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(245, 245, 220, 0.1));
  border-bottom: 0.125rem solid var(--primary-color);
}

.hero-title {
  font-family: var(--font-family-pixel);
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--primary-color);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
  animation: slideInDown var(--animation-duration-subtle) ease-out;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--secondary-color);
  max-width: 600px;
  margin: 0 auto;
  animation: slideInUp var(--animation-duration-subtle) ease-out var(--animation-delay-small) both;
}

/* Blog Content */
.blog-content {
  padding: 3rem 0;
}

.container {
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 0.25rem solid rgba(220, 20, 60, 0.3);
  border-top: 0.25rem solid var(--primary-color);
  border-radius: 50%;
  animation: spin var(--animation-duration-subtle) linear infinite;
  margin-bottom: 1rem;
}

.loading-text {
  font-family: var(--font-family-pixel);
  color: var(--text-color);
  font-size: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Animations */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
  padding: 2rem;
}
.error-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}
.error-title {
  font-family: var(--font-family-pixel);
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.error-message {
  font-family: var(--readable-font);
  color: var(--secondary-color);
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 30rem;
}

/* Blog List Grid */
.blog-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Blog Card */
.blog-card {
  background: rgba(255, 255, 255, 0.02);
  border: var(--pixel-border);
  border-radius: 0;
  overflow: hidden;
  transition: all var(--transition-duration) ease;
  backdrop-filter: blur(0.25rem);
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: var(--neon-glow);
  border-color: var(--secondary-color);
}

.blog-card:focus {
  outline: 0.125rem solid var(--primary-color);
  outline-offset: 0.25rem;
}

/* Card Image */
.card-image-container {
  position: relative;
  width: 100%;
  height: 12rem;
  overflow: hidden;
  background: linear-gradient(45deg, rgba(220, 20, 60, 0.1), rgba(245, 245, 220, 0.1));
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-duration) ease;
}

.blog-card:hover .card-image {
  transform: scale(1.05);
}

/* Card Content */
.card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
}

/* Card Header */
.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-family: var(--font-family-pixel);
  font-size: 1.1rem;
  color: var(--text-color);
  margin-bottom: 0.75rem;
  line-height: 1.3;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--secondary-color);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-family-pixel);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.meta-item i {
  font-size: 0.7rem;
}

/* Card Body */
.card-body {
  margin-bottom: 1rem;
  flex: 1;
}

.card-excerpt {
  font-family: var(--readable-font);
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-color);
  opacity: 0.9;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tags Section */
.card-tags {
  margin-bottom: 1.5rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.tag {
  background: rgba(220, 20, 60, 0.2);
  color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  font-family: var(--font-family-pixel);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border: 0.0625rem solid var(--primary-color);
  border-radius: 0;
  white-space: nowrap;
  max-width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-more {
  background: rgba(245, 245, 220, 0.2);
  color: var(--secondary-color);
  padding: 0.25rem 0.5rem;
  font-family: var(--font-family-pixel);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border: 0.0625rem solid var(--secondary-color);
  border-radius: 0;
  white-space: nowrap;
}

/* Card Button */
.card-btn {
  margin-top: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-list-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .card-image-container {
    height: 10rem;
  }
  
  .card-title {
    font-size: 1rem;
  }
  
  .card-meta {
    gap: 0.75rem;
  }
  
  .meta-item {
    font-size: 0.7rem;
  }
  
  .card-excerpt {
    font-size: 0.85rem;
  }
  
  .tag {
    font-size: 0.55rem;
    max-width: 5rem;
  }
}

@media (max-width: 576px) {
  .blog-list-grid {
    gap: 1rem;
  }
  
  .card-image-container {
    height: 8rem;
  }
  
  .card-content {
    padding: 0.75rem;
  }
  
  .card-title {
    font-size: 0.9rem;
  }
  
  .card-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .meta-item {
    font-size: 0.65rem;
  }
  
  .card-excerpt {
    font-size: 0.8rem;
  }
  
  .card-btn {
    font-size: 0.75rem;
    padding: 0.6rem 1.2rem;
  }
  
  .tag {
    font-size: 0.5rem;
    max-width: 4rem;
  }
}
</style>
