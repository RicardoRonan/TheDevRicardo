<template>
  <div class="resources-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="hero-title">Resources & Tools</h1>
            <p class="hero-subtitle">
              Curated collection of tools, libraries, and resources that have been invaluable in my development journey
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources Content -->
    <section class="resources-content">
      <div class="container">
        <!-- Filter and Search Section -->
        <div class="filter-section">
          <div class="row">
            <div class="col-12">
              <div class="filter-container">
                <!-- Search Bar -->
                <div class="search-container">
                  <div class="search-input-wrapper">
                    <i class="fa-solid fa-search search-icon"></i>
                    <input 
                      type="text" 
                      v-model="searchQuery" 
                      placeholder="Search for tools, frameworks, or resources..."
                      class="search-input"
                    />
                    <button 
                      v-if="searchQuery" 
                      @click="clearSearch" 
                      class="clear-search-btn"
                    >
                      <i class="fa-solid fa-times"></i>
                    </button>
                  </div>
                </div>

                <!-- Results Counter -->
                <div class="results-counter">
                  <span class="counter-text">
                    Showing {{ filteredResources.length }} of {{ totalResources }} resources
                  </span>
                </div>

                <!-- Category Picker -->
                <div class="category-picker">
                  <button
                    :class="['btn', 'btn-secondary', 'btn-sm', { active: selectedCategory === 'all' }]"
                    @click="selectedCategory = 'all'"
                  >
                    All
                  </button>
                  <button
                    v-for="category in categories"
                    :key="category.id"
                    :class="['btn', 'btn-secondary', 'btn-sm', { active: selectedCategory === category.id }]"
                    @click="selectedCategory = category.id"
                  >
                    {{ category.icon }} {{ category.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="loading-content">
            <i class="fa-solid fa-spinner fa-spin loading-icon"></i>
            <p>Loading resources...</p>
          </div>
        </div>

        <!-- Alphabetical Navigation Timeline -->
        <div v-if="!loading" class="alphabetical-navigation">
          <div class="timeline-container">
            <div class="timeline">
              <div 
                v-for="letter in alphabet" 
                :key="letter"
                @click="scrollToLetter(letter)"
                :class="['timeline-letter', { active: activeLetter === letter, available: hasResourcesForLetter(letter) }]"
              >
                {{ letter }}
              </div>
            </div>
          </div>
        </div>

        <!-- Resources by Letter -->
        <div v-if="!loading" class="resources-by-letter">
          <div 
            v-for="letter in alphabet" 
            :key="letter"
            :id="`letter-${letter}`"
            class="letter-section"
            v-show="hasResourcesForLetter(letter)"
          >
            <h2 class="letter-title">{{ letter }}</h2>
            <div class="row g-4">
              <div 
                class="col-lg-4 col-md-6" 
                v-for="resource in getResourcesForLetter(letter)" 
                :key="resource.id"
              >
                <div class="resource-card">
                  <div class="resource-header">
                    <div class="resource-icon">{{ resource.icon }}</div>
                    <div class="resource-info">
                      <h3 class="resource-name">{{ resource.name }}</h3>
                      <p class="resource-description">{{ resource.description }}</p>
                    </div>
                  </div>
                  <div class="resource-category">
                    <span class="category-badge">{{ getCategoryName(resource.category) }}</span>
                  </div>
                  <div class="resource-tags">
                    <span class="tag" v-for="tag in resource.tags" :key="tag">{{ tag }}</span>
                  </div>
                  <div class="resource-links">
                    <a :href="resource.url" target="_blank" class="btn btn-primary btn-sm">
                      Visit Resource
                    </a>
                    <button v-if="resource.tutorial" class="btn btn-outline-light btn-sm">
                      Tutorial
                    </button>
                    <button v-if="resource.examples" class="btn btn-outline-light btn-sm">
                      Examples
                    </button>
                    <span v-if="resource.free" class="badge bg-success">Free</span>
                    <span v-if="resource.pricing" class="badge bg-info">{{ resource.pricing }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results Message -->
          <div v-if="filteredResources.length === 0 && !loading" class="no-results">
            <div class="no-results-content">
              <i class="fa-solid fa-search no-results-icon"></i>
              <h3>No resources found</h3>
              <p>Try adjusting your search terms</p>
              <button @click="clearSearch" class="btn btn-primary">
                Clear Search
              </button>
            </div>
          </div>
        </div>

        <!-- Featured Resource Section -->
        <div class="featured-resource-section">
          <div class="row">
            <div class="col-12">
              <div class="featured-resource-card">
                <div class="featured-header">
                  <div class="featured-icon">🎮</div>
                  <div class="featured-content">
                    <h3 class="featured-title">NES.css</h3>
                    <p class="featured-description">
                      NES-style (8bit-like) CSS Framework - The tool I used to build this website!
                    </p>
                    <div class="featured-tags">
                      <span class="tag featured-tag">CSS</span>
                      <span class="tag featured-tag">Framework</span>
                      <span class="tag featured-tag">Retro</span>
                      <span class="tag featured-tag">Free</span>
                      <span class="tag featured-tag">Featured</span>
                    </div>
                    <div class="featured-badge">
                      <i class="fa-solid fa-star"></i>
                      Used for this website
                    </div>
                  </div>
                </div>
                <div class="featured-actions">
                  <a href="https://nostalgic-css.github.io/NES.css/" target="_blank" class="btn btn-primary btn-lg">
                    <i class="fa-solid fa-external-link-alt"></i>
                    Visit NES.css
                  </a>
                  <a href="https://github.com/nostalgic-css/NES.css" target="_blank" class="btn btn-outline-light btn-lg">
                    <i class="fa-brands fa-github"></i>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Resource Section -->
        <div class="add-resource-section">
          <div class="row">
            <div class="col-12 text-center">
              <h3 class="add-resource-title">Have a Great Resource to Share?</h3>
              <p class="add-resource-text">
                I'm always looking for new tools and resources to add to this collection. 
                Feel free to suggest something that has helped you in your development journey!
              </p>
              <router-link to="/contact" class="btn btn-outline-light btn-lg">
                Suggest a Resource
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { resourcesService } from '../services/resourcesService.js';

export default {
  name: 'Resources',
  data() {
    return {
      loading: true,
      searchQuery: '',
      categories: [],
      resources: [],
      error: null,
      activeLetter: 'A',
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      selectedCategory: 'all',
    }
  },
  computed: {
    filteredResources() {
      let resources = this.resources;

      // Filter by category
      if (this.selectedCategory !== 'all') {
        resources = resources.filter(r => r.category === this.selectedCategory);
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        resources = resources.filter(resource => 
          resource.name.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      // Sort alphabetically by name
      resources.sort((a, b) => a.name.localeCompare(b.name));

      // Deduplicate by name
      const unique = {};
      resources.forEach(r => {
        if (!unique[r.name]) unique[r.name] = r;
      });
      return Object.values(unique);
    },
    totalResources() {
      // Count unique resources by name
      const unique = {};
      this.resources.forEach(r => {
        if (!unique[r.name]) unique[r.name] = r;
      });
      return Object.keys(unique).length;
    }
  },
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      this.error = 'Failed to load resources. Please try again later.';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async loadData() {
      // Load categories and resources in parallel
      const [categoriesData, resourcesData] = await Promise.all([
        resourcesService.getCategories(),
        resourcesService.getAllResources()
      ]);

      // Deduplicate categories by id
      const uniqueCategories = {};
      categoriesData.forEach(category => {
        if (!uniqueCategories[category.id]) uniqueCategories[category.id] = category;
      });
      this.categories = Object.values(uniqueCategories);

      // Deduplicate resources by name
      const uniqueResources = {};
      resourcesData.forEach(resource => {
        if (!uniqueResources[resource.name]) uniqueResources[resource.name] = resource;
      });
      this.resources = Object.values(uniqueResources);
    },
    clearSearch() {
      this.searchQuery = '';
    },
    hasResourcesForLetter(letter) {
      return this.filteredResources.some(resource => 
        resource.name.toUpperCase().startsWith(letter)
      );
    },
    getResourcesForLetter(letter) {
      return this.filteredResources.filter(resource => 
        resource.name.toUpperCase().startsWith(letter)
      );
    },
    scrollToLetter(letter) {
      if (!this.hasResourcesForLetter(letter)) return;
      
      this.activeLetter = letter;
      const element = document.getElementById(`letter-${letter}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Other';
    },
    selectCategory(catId) {
      this.selectedCategory = catId;
      this.activeLetter = 'A';
    },
  }
}
</script>

<style scoped>
.resources-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
}

/* Hero Section */
.hero-section {
  padding: 4rem 0 2rem 0;
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

/* Resources Content */
.resources-content {
  padding: 3rem 0;
}

/* Alphabetical Navigation Timeline */
.alphabetical-navigation {
  margin-bottom: 3rem;
  animation: slideInUp var(--animation-duration-subtle) ease-out 0.7s both;
}

.timeline-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.timeline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  backdrop-filter: blur(0.5rem);
}

.timeline-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  color: var(--secondary-color);
  font-family: var(--font-family-pixel);
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all var(--transition-duration) ease;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.timeline-letter:hover {
  background: rgba(220, 20, 60, 0.2);
  border-color: var(--secondary-color);
  color: var(--text-color);
  transform: translateY(-0.125rem);
  box-shadow: 0 0.25rem 0.5rem rgba(220, 20, 60, 0.3);
}

.timeline-letter.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--text-color);
  box-shadow: 0 0 0.5rem rgba(220, 20, 60, 0.5);
}

.timeline-letter.available {
  border-color: var(--secondary-color);
  background: rgba(245, 245, 220, 0.1);
}

.timeline-letter:not(.available) {
  opacity: 0.3;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.timeline-letter:not(.available):hover {
  transform: none;
  box-shadow: none;
}

/* Letter Sections */
.letter-section {
  margin-bottom: 3rem;
  animation: fadeIn var(--animation-duration-subtle) var(--animation-ease);
}

.letter-title {
  font-family: var(--font-family-pixel);
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  border-bottom: 0.125rem solid var(--primary-color);
  padding-bottom: 0.5rem;
  position: relative;
}

.letter-title::after {
  content: '';
  position: absolute;
  bottom: -0.125rem;
  left: 0;
  width: 3rem;
  height: 0.125rem;
  background: var(--secondary-color);
  animation: shimmer var(--animation-duration-infinite) infinite;
}

/* Resource Cards */
.resource-card {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 1.5rem;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  backdrop-filter: blur(0.5rem);
  position: relative;
  overflow: hidden;
  animation: fadeIn var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-small) both;
}

.resource-card:hover {
  transform: translateY(-0.5rem);
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--secondary-color);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.3);
}

.resource-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.resource-icon {
  font-size: 2rem;
  filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.5));
  flex-shrink: 0;
}

.resource-info {
  flex: 1;
}

.resource-name {
  font-family: var(--font-family-pixel);
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.resource-description {
  font-size: 0.9rem;
  color: var(--secondary-color);
  line-height: 1.4;
  opacity: 0.9;
}

/* Category Badge */
.resource-category {
  margin-bottom: 1rem;
}

.category-badge {
  background: rgba(245, 245, 220, 0.2);
  color: var(--secondary-color);
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  font-family: var(--font-family-pixel);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border: 0.0625rem solid var(--secondary-color);
  border-radius: 0;
}

/* Tags */
.resource-tags {
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(220, 20, 60, 0.2);
  color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  font-family: var(--font-family-pixel);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border: 0.0625rem solid var(--primary-color);
}

/* Links */
.resource-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.btn-sm {
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0;
  border-width: 0.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.badge {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

/* Filter Section */
.filter-section {
  margin-bottom: 3rem;
  animation: slideInUp var(--animation-duration-subtle) ease-out 0.5s both;
}

.filter-container {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 2rem;
  backdrop-filter: blur(0.5rem);
}

/* Search Container */
.search-container {
  margin-bottom: 1.5rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--secondary-color);
  font-size: 1.1rem;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  color: var(--text-color);
  font-family: var(--font-family-pixel);
  font-size: 1rem;
  transition: all var(--transition-duration) ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--secondary-color);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0.5rem rgba(245, 245, 220, 0.3);
}

.search-input::placeholder {
  color: var(--secondary-color);
  opacity: 0.7;
}

.clear-search-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--secondary-color);
  cursor: pointer;
  padding: 0.25rem;
  transition: all var(--transition-duration) ease;
}

.clear-search-btn:hover {
  color: var(--primary-color);
  transform: scale(1.1);
}

/* Results Counter */
.results-counter {
  text-align: center;
}

.counter-text {
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  color: var(--secondary-color);
  opacity: 0.8;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  animation: fadeIn var(--animation-duration-subtle) ease-out;
}

.no-results-content {
  max-width: 400px;
  margin: 0 auto;
}

.no-results-icon {
  font-size: 3rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results h3 {
  font-family: var(--font-family-pixel);
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.no-results p {
  color: var(--secondary-color);
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  animation: fadeIn var(--animation-duration-subtle) ease-out;
}

.loading-content {
  max-width: 400px;
  margin: 0 auto;
}

.loading-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
}

.loading-content p {
  font-family: var(--font-family-pixel);
  font-size: 1rem;
  color: var(--secondary-color);
}

/* Featured Resource Section */
.featured-resource-section {
  margin-top: 4rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(245, 245, 220, 0.1));
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  position: relative;
  overflow: hidden;
}

.featured-resource-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="50" cy="10" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="10" cy="90" r="1" fill="%23ffffff" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.featured-resource-card {
  border-radius: 0;
  padding: 2rem;
  text-align: center;
  transition: all var(--transition-duration) ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(0.5rem);
  animation: fadeIn var(--animation-duration-subtle) ease-out 1.5s both;
}

.featured-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: left;
}

.featured-icon {
  font-size: 3rem;
  filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.5));
  flex-shrink: 0;
  animation: pulse var(--animation-duration-infinite) infinite;
}

.featured-content {
  flex: 1;
}

.featured-title {
  font-family: var(--font-family-pixel);
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
}

.featured-description {
  font-size: 1.1rem;
  color: var(--secondary-color);
  line-height: 1.4;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.featured-tags {
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.featured-tag {
  background: rgba(220, 20, 60, 0.2);
  color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  font-family: var(--font-family-pixel);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border: 0.0625rem solid var(--primary-color);
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: var(--text-color);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 0.5rem 1rem;
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  box-shadow: 0 0 0.5rem rgba(220, 20, 60, 0.3);
}

.featured-badge i {
  color: var(--secondary-color);
  animation: spin 2s linear infinite;
}

.featured-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.featured-actions .btn-lg {
  font-family: var(--font-family-pixel);
  font-size: 1rem;
  padding: 1rem 2rem;
  border-radius: 0;
  border-width: 0.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.featured-actions .btn-lg:hover {
  transform: translateY(-0.125rem);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.3);
}

/* Add Resource Section */
.add-resource-section {
  margin-top: 4rem;
  padding: 3rem 0;
  background: rgba(255, 255, 255, 0.02);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
}

.add-resource-title {
  font-family: var(--font-family-pixel);
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
}

.add-resource-text {
  font-size: 1rem;
  color: var(--secondary-color);
  max-width: 600px;
  margin: 0 auto 2rem auto;
  line-height: 1.6;
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0 1rem 0;
  }
  
  .resources-content {
    padding: 2rem 0;
  }
  
  .letter-section {
    margin-bottom: 2rem;
  }
  
  .letter-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .resource-card {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .resource-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .resource-icon {
    font-size: 1.5rem;
  }
  
  .resource-name {
    font-size: 1rem;
  }
  
  .resource-description {
    font-size: 0.8rem;
  }
  
  .add-resource-section {
    margin-top: 3rem;
    padding: 2rem 0;
  }
  
  /* Timeline Mobile */
  .timeline {
    gap: 0.3rem;
    padding: 0.8rem;
  }
  
  .timeline-letter {
    width: 2rem;
    height: 2rem;
    font-size: 0.8rem;
  }
  
  /* Filter Mobile */
  .filter-container {
    padding: 1.5rem;
  }
  
  .search-input {
    font-size: 0.9rem;
    padding: 0.8rem 0.8rem 0.8rem 2.5rem;
  }
  
  .search-icon {
    font-size: 1rem;
    left: 0.8rem;
  }
  
  .counter-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
  }
  
  .letter-title {
    font-size: 1.2rem;
  }
  
  .resource-card {
    padding: 0.8rem;
  }
  
  .resource-name {
    font-size: 0.9rem;
  }
  
  .resource-description {
    font-size: 0.75rem;
  }
  
  .tag {
    font-size: 0.6rem;
    padding: 0.2rem 0.4rem;
  }
  
  .btn-sm {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }
  
  /* Timeline Mobile Small */
  .timeline {
    gap: 0.2rem;
    padding: 0.6rem;
  }
  
  .timeline-letter {
    width: 1.8rem;
    height: 1.8rem;
    font-size: 0.7rem;
  }
  
  /* Filter Mobile Small */
  .filter-container {
    padding: 1rem;
  }
  
  .search-input {
    font-size: 0.8rem;
    padding: 0.7rem 0.7rem 0.7rem 2.2rem;
  }
  
  .search-icon {
    font-size: 0.9rem;
    left: 0.7rem;
  }
  
  .counter-text {
    font-size: 0.7rem;
  }
  
  .no-results {
    padding: 2rem 1rem;
  }
  
  .no-results-icon {
    font-size: 2rem;
  }
  
  .no-results h3 {
    font-size: 1.2rem;
  }
  
  .no-results p {
    font-size: 0.9rem;
  }
  
  /* Featured Resource Mobile */
  .featured-resource-section {
    margin-top: 3rem;
    padding: 2rem 0;
  }
  
  .featured-resource-card {
    padding: 1.5rem;
  }
  
  .featured-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .featured-icon {
    font-size: 2.5rem;
  }
  
  .featured-title {
    font-size: 1.5rem;
  }
  
  .featured-description {
    font-size: 1rem;
  }
  
  .featured-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .featured-actions .btn-lg {
    width: 100%;
    max-width: 15rem;
    justify-content: center;
  }
}

.category-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 2rem 0 2.5rem 0;
}
.category-btn {
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  padding: 0.6rem 1.2rem;
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  background: rgba(255,255,255,0.07);
  color: var(--secondary-color);
  cursor: pointer;
  transition: all var(--transition-duration) ease;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  outline: none;
}
.category-btn.active,
.category-btn:hover {
  background: var(--primary-color);
  color: var(--text-color);
  border-color: var(--primary-color);
  box-shadow: 0 0.25rem 0.5rem rgba(220, 20, 60, 0.2);
}
.category-icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}
@media (max-width: 768px) {
  .category-picker {
    gap: 0.3rem;
    margin: 1.2rem 0 1.5rem 0;
  }
  .category-btn {
    font-size: 0.8rem;
    padding: 0.5rem 0.8rem;
  }
}

.resource-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid rgba(245, 245, 220, 0.2);
  border-radius: 0;
  text-decoration: none;
  color: var(--text-color);
  transition: all var(--transition-duration) ease;
  backdrop-filter: blur(0.25rem);
  cursor: pointer;
}

.category-btn {
  background: transparent;
  border: 0.125rem solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.75rem 1.5rem;
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  transition: all var(--transition-duration) ease;
  cursor: pointer;
  border-radius: 0;
}
</style> 