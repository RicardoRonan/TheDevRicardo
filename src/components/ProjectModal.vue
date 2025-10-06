<template>
  <div 
    v-if="isVisible" 
    class="modal-overlay"
    @click="closeModal"
    @keydown.escape="closeModal"
    tabindex="0"
  >
    <div 
      class="modal-content nes-container is-rounded"
      @click.stop
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 id="modal-title" class="modal-title">
          {{ projectData.title }}
        </h2>
        <button 
          class="close-btn nes-btn is-error"
          @click="closeModal"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <!-- Project Info -->
        <div class="project-info">
          <div class="info-row">
            <span class="info-label">Company:</span>
            <span class="info-value">{{ projectData.company }}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Category:</span>
            <span class="info-value">{{ projectData.category === 'client' ? 'Client Work' : 'Personal Project' }}</span>
          </div>
          
          <div class="description-row">
            <span class="info-label">Description:</span>
            <p class="info-description">{{ projectData.description }}</p>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="tech-section">
          <h3 class="section-title">Tech Stack</h3>
          <div class="tech-tags">
            <span 
              v-for="tech in projectData.tech" 
              :key="tech"
              class="tech-tag nes-badge"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Project Images -->
        <div class="images-section">
          <h3 class="section-title">Project Preview</h3>
          
          <!-- Landing Page Image -->
          <div v-if="projectData.landingImage" class="image-container">
            <h4 class="image-title">Landing Page</h4>
            <img 
              :src="projectData.landingImage" 
              :alt="`${projectData.title} landing page`"
              class="project-image nes-container is-rounded"
              loading="lazy"
            />
          </div>

          <!-- Full Site Image -->
          <div v-if="projectData.fullImage" class="image-container">
            <h4 class="image-title">Full Site</h4>
            <img 
              :src="projectData.fullImage" 
              :alt="`${projectData.title} full site`"
              class="project-image nes-container is-rounded"
              loading="lazy"
            />
          </div>

          <!-- Fallback to original image if no specific images -->
          <div v-if="!projectData.landingImage && !projectData.fullImage && projectData.img" class="image-container">
            <h4 class="image-title">Project Screenshot</h4>
            <img 
              :src="projectData.img" 
              :alt="`${projectData.title} screenshot`"
              class="project-image nes-container is-rounded"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="modal-actions">
          <a 
            :href="projectData.liveLink" 
            target="_blank" 
            rel="noopener noreferrer"
            class="nes-btn is-primary"
          >
            <i class="nes-icon star"></i>
            Visit Live Site
          </a>
          
          <a 
            v-if="projectData.githubLink && projectData.githubLink !== 'N/A'"
            :href="projectData.githubLink" 
            target="_blank" 
            rel="noopener noreferrer"
            class="nes-btn is-success"
          >
            <i class="nes-icon github"></i>
            View Code
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    projectData: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        // Focus the modal when it opens
        this.$nextTick(() => {
          const modal = this.$el.querySelector('.modal-content');
          if (modal) {
            modal.focus();
          }
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
      } else {
        // Restore body scroll
        document.body.style.overflow = '';
      }
    }
  },
  beforeUnmount() {
    // Ensure body scroll is restored
    document.body.style.overflow = '';
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: var(--background-color);
  border: 4px solid var(--primary-color);
  border-radius: 0;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
  position: relative;
}

@keyframes slideIn {
  from { 
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 2px solid var(--primary-color);
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(245, 245, 220, 0.05));
}

.modal-title {
  font-family: var(--font-family-pixel);
  font-size: 1.2rem;
  margin: 0;
  color: var(--primary-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  line-height: 1.3;
}

.close-btn {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.modal-body {
  padding: 1.5rem;
}

.project-info {
  margin-bottom: 2rem;
}

.info-row {
  display: flex;
  margin-bottom: 1rem;
  align-items: flex-start;
}

.info-label {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  min-width: 120px;
  margin-right: 1rem;
  color: var(--primary-color);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.info-value {
  font-family: var(--font-family-pixel);
  font-size: 0.6rem;
  color: var(--text-color);
  flex: 1;
  line-height: 1.4;
}

.description-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.info-description {
  font-family: var(--font-family-pixel);
  font-size: 0.6rem;
  color: var(--text-color);
  line-height: 1.4;
  margin: 0.5rem 0 0 0;
  padding: 1rem;
  background: rgba(220, 20, 60, 0.1);
  border: 2px solid var(--primary-color);
  border-radius: 0;
}

.tech-section {
  margin-bottom: 2rem;
}

.section-title {
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  font-family: var(--font-family-pixel);
  font-size: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: var(--text-color);
  border: 2px solid var(--primary-color);
  border-radius: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.nes-badge {
  width: auto;
  height: 3.875em;
}

.images-section {
  margin-bottom: 2rem;
}

.image-container {
  margin-bottom: 1.5rem;
}

.image-title {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.project-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  border: 3px solid var(--primary-color);
  border-radius: 0;
  background: var(--text-color);
  padding: 0.5rem;
  box-shadow: 0 4px 8px rgba(220, 20, 60, 0.3);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 2px solid var(--primary-color);
}

.modal-actions .nes-btn {
  font-family: var(--font-family-pixel);
  font-size: 0.6rem;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease-out;
}

.modal-actions .nes-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Retro scanlines effect */
.modal-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.02) 2px,
    rgba(0, 0, 0, 0.02) 4px
  );
  pointer-events: none;
  z-index: 1;
}

/* Responsive design */
@media (max-width: 768px) {
  .modal-content {
    margin: 0.5rem;
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .modal-title {
    font-size: 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .info-label {
    font-size: 0.6rem;
    min-width: 100px;
  }
  
  .info-value,
  .info-description {
    font-size: 0.5rem;
  }
  
  .section-title {
    font-size: 0.7rem;
  }
  
  .image-title {
    font-size: 0.6rem;
  }
  
  .modal-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .modal-actions .nes-btn {
    font-size: 0.5rem;
    padding: 0.6rem 1rem;
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 576px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-title {
    font-size: 0.8rem;
  }
  
  .info-row {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .info-label {
    min-width: auto;
    margin-right: 0;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .modal-content {
    border-color: var(--text-color);
    background: var(--background-color);
  }
  
  .modal-header {
    border-bottom-color: var(--text-color);
  }
  
  .info-description {
    border-color: var(--text-color);
    background: var(--background-color);
  }
  
  .project-image {
    border-color: var(--text-color);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .modal-overlay {
    animation: none;
  }
  
  .modal-content {
    animation: none;
  }
  
  .modal-actions .nes-btn:hover {
    transform: none;
  }
}
</style>
