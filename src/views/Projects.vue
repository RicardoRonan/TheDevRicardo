<template>
  <div class="projects-page" id="projects">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="hero-title">My Projects</h1>
            <p class="hero-subtitle">
              Showcasing my development journey through code and creativity
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Content -->
    <section class="projects-content">
      <div class="container-fluid">
        <!-- Category Filter -->
        <div class="category-filter">
          <div class="filter-buttons">
            <button 
              @click="setCategory('all')" 
              :class="['filter-btn', { 'active': selectedCategory === 'all' }]"
            >
              All Projects
            </button>
            <button 
              @click="setCategory('client')" 
              :class="['filter-btn', { 'active': selectedCategory === 'client' }]"
            >
              Client Work
            </button>
            <button 
              @click="setCategory('personal')" 
              :class="['filter-btn', { 'active': selectedCategory === 'personal' }]"
            >
              Personal Projects
            </button>
          </div>
        </div>

        <!-- Section Header -->
        <div class="section-header">
          <p class="instruction-text">
            Double-click on a folder to open project details
          </p>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          <FolderCard
            v-for="project in filteredProjects" 
            :key="project.id"
            :project-title="project.title"
            :project-data="project"
            @open-project="openProjectModal"
          />
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <ProjectModal
      :is-visible="isModalVisible"
      :project-data="selectedProject"
      @close="closeProjectModal"
    />
  </div>
</template>
<script>
import FolderCard from '@/components/FolderCard.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import { projects } from '@/data/projects.js'

export default {
  name: 'Projects',
  components: {
    FolderCard,
    ProjectModal
  },
  mounted() {
    const root = document.getElementById('projects')
    if (root) { 
      void root.offsetWidth
      root.classList.add('entered') 
    }
  },
  data() {
    return {
      selectedCategory: 'all', // 'all', 'client', 'personal'
      projects: projects,
      isModalVisible: false,
      selectedProject: null
    };
  },
  computed: {
    filteredProjects() {
      if (this.selectedCategory === 'all') {
        return this.projects;
      }
      return this.projects.filter(project => project.category === this.selectedCategory);
    }
  },
  methods: {
    setCategory(category) {
      this.selectedCategory = category;
    },
    openProjectModal(project) {
      this.selectedProject = project;
      this.isModalVisible = true;
    },
    closeProjectModal() {
      this.isModalVisible = false;
      this.selectedProject = null;
    }
  },
};
</script>
<style scoped>
/* Custom styles for Projects page */

/* Projects Page */
.projects-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  position: relative;
  overflow: hidden;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0 2rem 0;
  border-bottom: 0.125rem solid var(--primary-color);
  position: relative;
  z-index: 2;
}

.hero-title {
  font-family: var(--font-family-pixel);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  color: var(--primary-color);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(-2rem);
  transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease);
}

.hero-subtitle {
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: var(--secondary-color);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease);
  transition-delay: 0.1s;
}

/* Projects Content */
.projects-content {
  padding: 3rem 0;
  position: relative;
  z-index: 2;
}

/* Category Filter */
.category-filter {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease);
  transition-delay: 0.1s;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  background: rgba(220, 20, 60, 0.1);
  backdrop-filter: blur(0.5rem);
  border: 2px solid var(--primary-color);
  border-radius: 0;
}

.filter-btn {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  padding: 0.6rem 1rem;
  background: transparent;
  color: var(--secondary-color);
  border: 2px solid var(--primary-color);
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s ease-out;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 20, 60, 0.3);
  background: rgba(220, 20, 60, 0.1);
  color: var(--text-color);
}

.filter-btn.active {
  background: var(--primary-color);
  color: var(--background-color);
  box-shadow: 0 2px 4px rgba(220, 20, 60, 0.4);
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease);
  transition-delay: 0.15s;
}

.section-title {
  font-family: var(--font-family-pixel);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: var(--primary-color);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: var(--secondary-color);
  max-width: 600px;
  margin: 0 auto 1rem auto;
  opacity: 0.9;
}

.instruction-text {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--secondary-color);
  opacity: 0.8;
  margin: 0;
}

/* Projects Grid */
.projects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem 1rem;
  justify-content: center;
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease);
}

/* Folder Card Styling - handled by FolderCard component */

/* Enter reveal */
.projects-page.entered .hero-title,
.projects-page.entered .hero-subtitle,
.projects-page.entered .category-filter,
.projects-page.entered .section-header,
.projects-page.entered .projects-grid {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .category-filter {
    margin-bottom: 2rem;
  }
  
  .filter-buttons {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 300px;
  }
  
  .filter-btn {
    font-size: 0.6rem;
    padding: 0.5rem 0.8rem;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
  }
  
  .instruction-text {
    font-size: 0.6rem;
  }
  
  .projects-grid {
    gap: 1.5rem;
    padding: 1rem;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
  }
  
  .section-title {
    font-size: 1.3rem;
  }
  
  .section-subtitle {
    font-size: 0.8rem;
  }
  
  .instruction-text {
    font-size: 0.5rem;
  }
  
  .projects-grid {
    gap: 1rem;
    padding: 0.5rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .filter-buttons {
    border-color: var(--text-color);
    background: var(--background-color);
  }
}
</style>
