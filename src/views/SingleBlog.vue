<template>
       <div class="back-navigation">
          <router-link to="/blog" class="btn btn-tertiary btn-sm back-link">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Blog</span>
          </router-link>
        </div>
  <section id="single-blog-page" class="blog-page">
    <div class="container">
 
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading blog post...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">
          <i class="fa-solid fa-exclamation-triangle"></i>
        </div>
        <h2 class="error-title">Oops! Something went wrong</h2>
        <p class="error-message">{{ error }}</p>
        <button @click="retryLoad" class="btn btn-primary btn-md">
          <i class="fa-solid fa-refresh"></i> Try Again
        </button>
      </div>
    
      <!-- Blog Content -->
      <div v-else-if="blog" class="blog-content-wrapper">
        <!-- Back Navigation -->
     

        <!-- Blog Header -->
        <article class="blog-article">
          <header class="blog-header">
            <h1 class="blog-title" v-html="blog.title"></h1>
            
            <div class="blog-meta">
              <div class="meta-item">
                <i class="fa-regular fa-calendar"></i>
                <span>{{ formatDate(blog.date) }}</span>
              </div>
              <div class="meta-item">
                <i class="fa-regular fa-clock"></i>
                <span>{{ readingTime }} min read</span>
              </div>
              <div class="meta-item">
                <i class="fa-regular fa-user"></i>
                <span>Ricardo Moses</span>
              </div>
            </div>

            <!-- Social Sharing -->
            <div class="social-sharing">
              <h4 class="share-title">Share this post:</h4>
              <div class="share-buttons">
                <button @click="shareOnTwitter" class="share-btn x" title="Share on X">
                  <i class="fa-brands fa-x-twitter"></i>
                </button>
                <button @click="shareOnLinkedIn" class="share-btn linkedin" title="Share on LinkedIn">
                  <i class="fa-brands fa-linkedin"></i>
                </button>
                <button @click="shareOnFacebook" class="share-btn facebook" title="Share on Facebook">
                  <i class="fa-brands fa-facebook"></i>
                </button>
                <button @click="copyLink" class="share-btn copy" title="Copy link">
                  <i class="fa-solid fa-link"></i>
                </button>
              </div>
            </div>
          </header>

          <!-- Blog Content -->
          <div class="blog-body">
            <div class="content-wrapper" v-html="blog.content"></div>
          </div>

          <!-- Blog Footer -->
          <footer class="blog-footer">
            <div class="tags-section" v-if="blog.tags && blog.tags.length">
              <h4 class="tags-title">Tags:</h4>
              <div class="tags-list">
                <span v-for="tag in blog.tags" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="author-section">
              <div class="author-info">
                <div class="author-avatar">
                  <i class="fa-solid fa-user"></i>
                </div>
                <div class="author-details">
                  <h4 class="author-name">Ricardo Moses</h4>
                  <p class="author-bio">Full-Stack Developer & Automation Specialist passionate about creating efficient solutions and sharing knowledge.</p>
                </div>
              </div>
            </div>
          </footer>
        </article>

        <!-- Related Posts -->
        <section class="related-posts" v-if="relatedPosts.length">
          <h3 class="related-title">Related Posts</h3>
          <div class="related-grid">
            <div v-for="post in relatedPosts" :key="post.id" class="related-card">
              <h4 class="related-post-title" v-html="post.title"></h4>
              <p class="related-post-excerpt" v-html="post.excerpt"></p>
              <router-link :to="`/blog/${getBlogSlug(post)}`" class="btn btn-secondary btn-sm read-more-link">
                Read <i class="fa-solid fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'SingleBlog',
  setup() {
    const blog = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const relatedPosts = ref([]);
    const route = useRoute();

    const loadBlogPost = async () => {
      loading.value = true;
      error.value = null;
      try {
        // Fetch by slug from new WP REST API
        const response = await axios.get(
          `https://dev-thedevricardo.pantheonsite.io/wp-json/wp/v2/posts?slug=${route.params.id}&_embed`
        );
        const post = response.data[0];
        if (!post) throw new Error('Post not found');
        blog.value = {
          title: post.title.rendered,
          content: post.content.rendered,
          date: post.date,
          tags: post.tags || [],
          excerpt: post.excerpt.rendered,
          slug: post.slug,
          id: post.id
        };
        await loadRelatedPosts(post.id);
      } catch (err) {
        console.error('Error fetching post:', err);
        error.value = 'Failed to load blog post. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    const loadRelatedPosts = async (excludeId) => {
      try {
        const response = await axios.get(
          'https://dev-thedevricardo.pantheonsite.io/wp-json/wp/v2/posts?per_page=3&_embed'
        );
        relatedPosts.value = response.data.filter(post => post.id !== excludeId).map(post => ({
          title: post.title.rendered,
          excerpt: post.excerpt.rendered,
          slug: post.slug,
          id: post.id
        }));
      } catch (err) {
        console.error('Error fetching related posts:', err);
      }
    };

    const retryLoad = () => {
      loadBlogPost();
    };

    const formatDate = (isoDate) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(isoDate).toLocaleDateString(undefined, options);
    };

    const readingTime = computed(() => {
      if (!blog.value?.content) return 0;
      const html = typeof blog.value.content === 'string' ? blog.value.content : blog.value.content?.rendered || '';
      const wordsPerMinute = 200;
      const wordCount = html.replace(/<[^>]*>/g, '').split(/\s+/).length;
      return Math.ceil(wordCount / wordsPerMinute);
    });

    const shareOnTwitter = () => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(blog.value.title);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    const shareOnLinkedIn = () => {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(blog.value.title);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    };

    const shareOnFacebook = () => {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
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
      loadBlogPost();
      sessionStorage.removeItem('newsletterModalShown');
    });

    return {
      blog,
      loading,
      error,
      relatedPosts,
      formatDate,
      readingTime,
      retryLoad,
      shareOnTwitter,
      shareOnLinkedIn,
      shareOnFacebook,
      copyLink,
      getBlogSlug
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
/* Blog Page Container */
.blog-page {
  min-height: 100vh;
  padding: 2rem 0;
  background: var(--background-color);
  --readable-font: 'Lato', sans-serif;
}

.container {
  max-width: 65ch;
  line-height: 1.5;
  margin: 0 auto;
  padding: 0 1rem;
  
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
}
.wp-image-11 {
width: 100%;
object-fit: cover;
height: auto;
}
.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 0.25rem solid var(--secondary-color);
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

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
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

/* Back Navigation */
.back-navigation {
  margin-bottom: 2rem;
  display: flex;
}

.back-link {
  /* Additional styling if needed */
}

/* Blog Article */
.blog-article {
  background: rgba(255, 255, 255, 0.02);
  border: var(--pixel-border);
  border-radius: 0;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: var(--neon-glow);
  backdrop-filter: blur(0.25rem);
}

/* Blog Header */
.blog-header {
  margin-bottom: 2rem;
}

.blog-title {
  font-family: var(--font-family-pixel);
  color: var(--text-color);
  font-size: 2rem;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
}

/* Blog Meta */
.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.1);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--readable-font);
  color: var(--secondary-color);
  font-size: 0.8rem;
}

.meta-item i {
  color: var(--primary-color);
  font-size: 1rem;
}

/* Social Sharing */
.social-sharing {
  margin-bottom: 2rem;
}

.share-title {
  font-family: var(--font-family-pixel);
  color: var(--text-color);
  font-size: 1rem;
  margin-bottom: 1rem;
}

/* Share Buttons */
.share-buttons {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 0.125rem solid;
  border-radius: 0;
  background: transparent;
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-duration) ease;
}

.share-btn.x {
  border-color: #000;
  color: #000;
}

.share-btn.x:hover {
  background: #000;
  color: var(--text-color);
  transform: translateY(-0.125rem);
}

.share-btn.linkedin {
  border-color: #0077b5;
  color: #0077b5;
}

.share-btn.linkedin:hover {
  background: #0077b5;
  color: var(--text-color);
  transform: translateY(-0.125rem);
}

.share-btn.facebook {
  border-color: #4267b2;
  color: #4267b2;
}

.share-btn.facebook:hover {
  background: #4267b2;
  color: var(--text-color);
  transform: translateY(-0.125rem);
}

.share-btn.copy {
  border-color: var(--secondary-color);
  color: var(--secondary-color);
}

.share-btn.copy:hover {
  background: var(--secondary-color);
  color: var(--background-color);
  transform: translateY(-0.125rem);
}

/* Blog Body */
.blog-body {
  margin-bottom: 2rem;
  display: flex;
justify-content: center;
align-items: center;
text-align: left;
}

.content-wrapper {
  font-family: var(--readable-font);
  color: var(--text-color);
  line-height: 1.8;
  font-size: 1rem;
  max-width: 65ch;
  margin: 0 auto;
  padding: 1.5rem 0;
}

.content-wrapper :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.content-wrapper :deep(ul),
.content-wrapper :deep(ol) {
  margin: 1.5rem 0 1.5rem 2rem;
  padding-left: 1.5rem;
  line-height: 1.8;
}

.content-wrapper :deep(li) {
  margin-bottom: 0.7rem;
  line-height: 1.7;
}

.content-wrapper :deep(h1),
.content-wrapper :deep(h2),
.content-wrapper :deep(h3),
.content-wrapper :deep(h4),
.content-wrapper :deep(h5),
.content-wrapper :deep(h6) {
  margin: 2.5rem 0 1.2rem 0;
  line-height: 1.3;
}

.content-wrapper :deep(blockquote) {
  border-left: 0.25rem solid var(--primary-color);
  padding-left: 1.2rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--secondary-color);
  background: rgba(220, 20, 60, 0.05);
}

.content-wrapper :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 0.0625rem solid var(--primary-color);
  transition: all var(--transition-duration) ease;
}

.content-wrapper :deep(a:hover) {
  color: var(--secondary-color);
  border-bottom-color: var(--secondary-color);
}

.content-wrapper :deep(code) {
  background: rgba(220, 20, 60, 0.2);
  color: var(--primary-color);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
}

.content-wrapper :deep(pre) {
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 0.0625rem solid var(--primary-color);
}

.content-wrapper :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.5rem auto;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);
}

.content-wrapper :deep(.wp-image-12),
.content-wrapper :deep(.wp-image-13),
.content-wrapper :deep(.wp-image-14),
.content-wrapper :deep(.wp-image-15),
.content-wrapper :deep(.wp-image-16),
.content-wrapper :deep(.wp-image-17),
.content-wrapper :deep(.wp-image-18),
.content-wrapper :deep(.wp-image-19),
.content-wrapper :deep(.wp-image-20) {
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  margin: 1.5rem auto;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);
}

/* WordPress alignment classes */
.content-wrapper :deep(.alignleft) {
  float: left;
  margin: 0 1.5rem 1.5rem 0;
  max-width: 50%;
}

.content-wrapper :deep(.alignright) {
  float: right;
  margin: 0 0 1.5rem 1.5rem;
  max-width: 50%;
}

.content-wrapper :deep(.aligncenter) {
  display: block;
  margin: 1.5rem auto;
  text-align: center;
}

/* Responsive image handling */
@media (max-width: 768px) {
  .content-wrapper :deep(.alignleft),
  .content-wrapper :deep(.alignright) {
    float: none;
    margin: 1.5rem auto;
    max-width: 100%;
  }
}

@media (max-width: 900px) {
  .content-wrapper {
    padding: 1rem 0.5rem;
    font-size: 0.97rem;
  }
}

@media (max-width: 600px) {
  .content-wrapper {
    padding: 0.5rem 0.2rem;
    font-size: 0.93rem;
  }
}

/* Blog Footer */
.blog-footer {
  border-top: 0.0625rem solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
}

.tags-section {
  margin-bottom: 2rem;
}

.tags-title {
  font-family: var(--font-family-pixel);
  color: var(--text-color);
  font-size: 1rem;
  margin-bottom: 1rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(220, 20, 60, 0.2);
  color: var(--primary-color);
  padding: 0.25rem 0.75rem;
  border: 0.0625rem solid var(--primary-color);
  border-radius: 0;
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
}

/* Author Section */
.author-section {
  background: rgba(255, 255, 255, 0.02);
  border: 0.0625rem solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  padding: 1.5rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 3rem;
  height: 3rem;
  background: var(--primary-color);
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.author-details {
  flex: 1;
}

.author-name {
  font-family: var(--font-family-pixel);
  color: var(--text-color);
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
}

.author-bio {
  font-family: var(--readable-font);
  color: var(--secondary-color);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

/* Related Posts */
.related-posts {
  margin-top: 3rem;
}

.related-title {
  font-family: var(--font-family-pixel);
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.related-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.related-card {
  background: rgba(255, 255, 255, 0.02);
  border: 0.0625rem solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  padding: 1.5rem;
  transition: all var(--transition-duration) ease;
  flex: 1 1 15rem;
  max-width: 20rem;
  min-width: 15rem;
}

.related-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-0.25rem);
  box-shadow: var(--neon-glow);
}

.related-post-title {
  font-family: var(--font-family-pixel);
  color: var(--text-color);
  font-size: 1rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.related-post-excerpt {
  font-family: var(--readable-font);
  color: var(--secondary-color);
  font-size: 0.8rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

/* Read More Link */
.read-more-link {
  margin-top: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .blog-article {
    padding: 1.5rem;
  }
  
  .blog-title {
    font-size: 1.5rem;
  }
  
  .blog-meta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .share-buttons {
    justify-content: center;
  }
  
  .author-info {
    flex-direction: column;
    text-align: center;
  }
  
  .related-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .related-card {
    max-width: 100%;
    min-width: auto;
  }
}

@media (max-width: 576px) {
  .blog-page {
    padding: 1rem 0;
  }
  
  .blog-article {
    padding: 1rem;
  }
  
  .blog-title {
    font-size: 1.25rem;
  }
  
  .content-wrapper {
    font-size: 0.9rem;
  }
  
  .content-wrapper :deep(h1) { font-size: 1.5rem; }
  .content-wrapper :deep(h2) { font-size: 1.25rem; }
  .content-wrapper :deep(h3) { font-size: 1.1rem; }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation: none;
  }
  
  .back-link:hover,
  .share-btn:hover,
  .related-card:hover,
  .read-more-link:hover {
    transform: none;
  }
}
</style>
