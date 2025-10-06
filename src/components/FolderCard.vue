<template>
  <div 
    class="folder-card nes-container"
    @dblclick="openProject"
    @click="handleClick"
    :class="{ 'is-shaking': isShaking }"
    tabindex="0"
    @keydown.enter="openProject"
    @keydown.space.prevent="openProject"
  >
    <div class="folder-icon">
      <svg width="64" height="64" viewBox="0 0 64 64" class="pixel-folder">
        <!-- Folder body -->
        <rect x="8" y="20" width="48" height="36" fill="#f5f5dc" stroke="#dc143c" stroke-width="2"/>
        <!-- Folder tab -->
        <rect x="8" y="20" width="24" height="8" fill="#dc143c" stroke="#dc143c" stroke-width="2"/>
        <!-- Folder highlight -->
        <rect x="10" y="22" width="20" height="4" fill="#ffffff" opacity="0.7"/>
        <!-- Folder shadow -->
        <rect x="10" y="22" width="44" height="32" fill="#000" opacity="0.2"/>
        <!-- Folder lines -->
        <line x1="12" y1="30" x2="52" y2="30" stroke="#dc143c" stroke-width="1"/>
        <line x1="12" y1="35" x2="48" y2="35" stroke="#dc143c" stroke-width="1"/>
        <line x1="12" y1="40" x2="50" y2="40" stroke="#dc143c" stroke-width="1"/>
        <line x1="12" y1="45" x2="46" y2="45" stroke="#dc143c" stroke-width="1"/>
      </svg>
    </div>
    <div class="folder-title">
      {{ projectTitle }}
    </div>
    <div class="folder-category">
      {{ projectData.category === 'client' ? 'Client Work' : 'Personal' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FolderCard',
  props: {
    projectTitle: {
      type: String,
      required: true
    },
    projectData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isShaking: false,
      clickTimeout: null
    }
  },
  methods: {
    handleClick() {
      // Clear any existing timeout
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout);
      }
      
      // Set a timeout to detect double click
      this.clickTimeout = setTimeout(() => {
        // Single click - just add a subtle effect
        this.isShaking = true;
        setTimeout(() => {
          this.isShaking = false;
        }, 200);
      }, 300);
    },
    
    openProject() {
      // Clear the timeout since this is a double click
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout);
      }
      
      // Add shake effect
      this.isShaking = true;
      setTimeout(() => {
        this.isShaking = false;
      }, 200);
      
      // Emit the open event
      this.$emit('open-project', this.projectData);
    }
  },
  
  beforeUnmount() {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }
  }
}
</script>

<style scoped>
.folder-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  margin: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 3px solid var(--primary-color);
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s ease-out;
  min-width: 140px;
  max-width: 160px;
  position: relative;
  backdrop-filter: blur(5px);
}

.folder-card:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 16px rgba(220, 20, 60, 0.3);
  border-color: var(--secondary-color);
  background: rgba(245, 245, 220, 0.1);
}

.folder-card:focus {
  outline: 3px solid var(--secondary-color);
  outline-offset: 2px;
}

.folder-card.is-shaking {
  animation: shake 0.2s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.folder-icon {
  margin-bottom: 0.75rem;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
}

.pixel-folder {
  transition: transform 0.2s ease-out;
}

.folder-card:hover .pixel-folder {
  transform: scale(1.1);
}

.folder-title {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--secondary-color);
  text-align: center;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  word-wrap: break-word;
  max-width: 100%;
}

.folder-category {
  font-family: var(--font-family-pixel);
  font-size: 0.5rem;
  color: var(--primary-color);
  text-align: center;
  opacity: 0.8;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* Retro scanlines effect */
.folder-card::before {
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
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease-out;
}

.folder-card:hover::before {
  opacity: 1;
}

/* Responsive design */
@media (max-width: 768px) {
  .folder-card {
    min-width: 120px;
    max-width: 140px;
    padding: 1rem 0.75rem;
  }
  
  .folder-title {
    font-size: 0.6rem;
  }
  
  .folder-category {
    font-size: 0.45rem;
  }
  
  .pixel-folder {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 576px) {
  .folder-card {
    min-width: 100px;
    max-width: 120px;
    padding: 0.75rem 0.5rem;
  }
  
  .folder-title {
    font-size: 0.5rem;
  }
  
  .folder-category {
    font-size: 0.4rem;
  }
  
  .pixel-folder {
    width: 40px;
    height: 40px;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .folder-card {
    border-color: var(--text-color);
    background: var(--background-color);
  }
  
  .folder-title {
    color: var(--text-color);
  }
  
  .folder-category {
    color: var(--primary-color);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .folder-card {
    transition: none;
  }
  
  .folder-card:hover {
    transform: none;
  }
  
  .folder-card.is-shaking {
    animation: none;
  }
  
  .pixel-folder {
    transition: none;
  }
}
</style>
