<template>
  <button 
    v-if="isVisible"
    @click="scrollToTop"
    class="scroll-to-top-btn pixel-border neon-glow retro-bg scanline-bg"
    title="Back to top"
    aria-label="Scroll to top"
  >
    <i class="fa-solid fa-arrow-up"></i>
  </button>
</template>

<script>
export default {
  name: 'ScrollToTop',
  props: {
    isNavHidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isVisible() {
      return this.isNavHidden;
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style scoped>
.scroll-to-top-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(1rem);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  color: var(--primary-color);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.6);
  animation: slideInUp 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.scroll-to-top-btn:hover {
  background: var(--primary-color);
  color: var(--text-color);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.75rem 2.5rem rgba(220, 20, 60, 0.4);
}

.scroll-to-top-btn:active {
  transform: translateY(0);
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

/* Responsive Design */
@media (max-width: 768px) {
  .scroll-to-top-btn {
    bottom: 0.75rem;
    right: 0.75rem;
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .scroll-to-top-btn {
    bottom: 0.5rem;
    right: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 0.9rem;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .scroll-to-top-btn {
    border-color: #ffffff;
    background: #000000;
    color: #ffffff;
  }
  
  .scroll-to-top-btn:hover {
    background: #ffffff;
    color: #000000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .scroll-to-top-btn {
    transition: none;
    animation: none;
  }
  
  .scroll-to-top-btn:hover {
    transform: none;
  }
}
</style>
