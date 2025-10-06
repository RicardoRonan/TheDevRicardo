<template>
  <div>
    <div v-if="showLoader" class="global-loader-overlay">
      <img src="./assets/loading-animation.gif" alt="Loading..." class="global-loader-gif" />
    </div>
    <router-view v-else />
    <navBar />
    <Footer v-if="!showLoader" />
  </div>
</template>

<script>
import navBar from "./components/navBar.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    navBar,
    Footer,
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showLoader: this.loading,
    };
  },
  watch: {
    loading(val) {
      this.showLoader = val;
    }
  },
  mounted() {
    // Hides loader immediately after mount (fix)
    this.showLoader = false;

    // Expose a method for global loader control
    if (this.$root) {
      this.$root.setLoader = (val) => {
        this.showLoader = val;
      };
    }
  },
};
</script>
<style>
/* CSS Custom Properties for consistent theming */
:root {
  --primary-color: #dc143c;
  --secondary-color: #f5f5dc;
  --background-color: #000000;
  --text-color: #ffffff;
  --shadow-color: rgba(0, 0, 0, 0.5);
  --border-radius: 0;
  --font-family-pixel: pixel;

  /* Animation Durations */
  --transition-duration: 0.4s; /* 400ms, smooth */
  --animation-duration-subtle: 0.4s; /* 400ms */
  --animation-duration-slow: 0.5s; /* 500ms */
  --animation-duration-floating: 2s; /* 500ms for floating effects */

  /* Animation Delays */
  --animation-delay-small: 0.08s; /* 80ms for subtle stagger */
  --animation-delay-medium: 0.16s; /* 160ms for staggered sequencing */
  --animation-delay-large: 0.24s;
  --animation-delay-larger: 0.32s;
  --animation-delay-largest: 0.4s;

  /* Animation Easing */
  --animation-ease: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* Box Shadows */
  --box-shadow-light: 0.125rem 0.125rem 0.25rem var(--shadow-color);
  --box-shadow-medium: 0.25rem 0.25rem 0.375rem var(--shadow-color);
  --box-shadow-heavy: 0.3125rem 0.3125rem 0.625rem var(--shadow-color);
}

/* Hide scrollbar for cleaner look */
::-webkit-scrollbar {
  display: none;
}

/* Font face declaration */
@font-face {
  font-family: pixel;
  src: url(./assets/PressStart2P-Regular.ttf);
  font-display: swap;
}

/* Global app styles */
#app {
  scroll-behavior: smooth;
  font-family: var(--font-family-pixel);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-x: hidden;
  background-color: var(--background-color);
  line-height: 1.6; 
  padding: 2rem;
}

@media (max-width: 768px) {
  #app {
    padding: 0.5rem;
  }
}

/* Utility classes for consistent spacing */
.section-padding {
  padding: 2rem 1rem;
}

.container-spacing {
  margin: 1rem;
  padding: 1rem;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.global-loader-overlay {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--background-color, #000); /* Removed gradient */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.global-loader-gif {
  width: 220px; /* Increased size */
  height: 220px; /* Increased size */
  object-fit: contain;
  image-rendering: pixelated;
  animation: loader-bounce 1.2s infinite cubic-bezier(0.25, 0.1, 0.25, 1);
}
@keyframes loader-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1.5rem); }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --primary-color: #ff0000;
    --secondary-color: #ffffff;
    --background-color: #000000;
    --text-color: #ffffff;
    --box-shadow-light: 0.125rem 0.125rem 0.25rem rgba(255, 255, 255, 0.8);
    --box-shadow-medium: 0.25rem 0.25rem 0.375rem rgba(255, 255, 255, 0.8);
    --box-shadow-heavy: 0.3125rem 0.3125rem 0.625rem rgba(255, 255, 255, 0.8);
  }
}
</style>
