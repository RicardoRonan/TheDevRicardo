<template>
  <div id="home-page" class="retro-bg scanline-bg">
    <Landing />
    
    <!-- Content Sections -->
    <div class="content-sections pixel-border neon-glow retro-bg scanline-bg">
      <Aboutcard />
    </div>
  </div>
</template>

<script>
import Landing from "../components/Landing.vue";
import Aboutcard from "../components/Aboutcard.vue";

export default {
  name: 'Home',
  components: {
    Landing,
    Aboutcard,
  },
  mounted() {
    // Smooth scroll behavior for the page
    document.documentElement.style.scrollBehavior = 'smooth';
  }
};
</script>

<style scoped>
#home-page {
  width: 100%;
  overflow-x: hidden;
}

.content-sections {
  position: relative;
  z-index: 1;
}

/* Ensure smooth transitions between sections */
.content-sections > * {
  scroll-margin-top: var(--space-8);
}

/* Add subtle fade-in animation for content sections */
.content-sections > *:nth-child(1) {
  animation: fadeInUp var(--duration-slow) var(--ease-standard) var(--animation-delay-small) both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .content-sections > * {
    scroll-margin-top: var(--space-4);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .content-sections > * {
    animation: none !important;
  }
  
  #home-page {
    scroll-behavior: auto;
  }
}
</style>
