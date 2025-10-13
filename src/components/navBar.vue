<template>
  <!-- Floating Bottom Navigation Bar -->
  <nav class="bottom-nav pixel-border neon-glow retro-bg scanline-bg" :class="{ 'nav-hidden': isNavHidden }">
    <div class="nav-container">
      <!-- Navigation Links -->
      <router-link 
        class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
        to="/"
        exact-active-class="active"
        title="Home"
      >
        <i class="fa-solid fa-home nav-icon"></i>
      </router-link>

      <router-link 
        class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
        to="/projects"
        active-class="active"
        title="Projects"
      >
        <i class="fa-solid fa-code nav-icon"></i>
      </router-link>

      <router-link 
        class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
        to="/resources"
        active-class="active"
        title="Resources"
      >
        <i class="fa-solid fa-tools nav-icon"></i>
      </router-link>

      <router-link 
        class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
        to="/testimonials"
        active-class="active"
        title="Testimonials"
      >
        <i class="fa-solid fa-comments nav-icon"></i>
      </router-link>

      <router-link 
        class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
        to="/experience"
        active-class="active"
        title="Experience"
      >
        <i class="fa-solid fa-briefcase nav-icon"></i>
      </router-link>

      <router-link 
        class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
        to="/contact"
        active-class="active"
        title="Contact"
      >
        <i class="fa-solid fa-envelope nav-icon"></i>
      </router-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isNavHidden: false,
      lastScrollY: 0,
      scrollThreshold: 10, // Minimum scroll distance to trigger hide/show
      hideDelay: 100 // Delay before hiding navbar (ms)
    }
  },
  mounted() {
    this.addScrollListener();
  },
  beforeUnmount() {
    this.removeScrollListener();
  },
  methods: {
    addScrollListener() {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    },
    removeScrollListener() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll() {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - this.lastScrollY);
      
      // Only trigger if scroll difference is significant
      if (scrollDifference < this.scrollThreshold) {
        return;
      }
      
      // Clear any existing timeout
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }
      
      if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        this.hideTimeout = setTimeout(() => {
          this.isNavHidden = true;
          this.$emit('nav-hidden', true);
        }, this.hideDelay);
      } else if (currentScrollY < this.lastScrollY) {
        // Scrolling up - show navbar immediately
        this.isNavHidden = false;
        this.$emit('nav-hidden', false);
      }
      
      this.lastScrollY = currentScrollY;
    }
  }
};
</script>
<style scoped>
/* Floating Bottom Navigation Bar */
.bottom-nav {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(1rem);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: var(--space-3) var(--space-4);
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.6);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  max-width: calc(100vw - 2rem);
  min-width: fit-content;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Hidden state */
.bottom-nav.nav-hidden {
  transform: translateX(-50%) translateY(calc(100% + 2rem));
  opacity: 0;
  pointer-events: none;
}

.nav-container {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
}

/* Navigation Items */
.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid transparent;
  border-radius: 0;
  color: var(--secondary-color);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  backdrop-filter: blur(0.25rem);
  position: relative;
  flex-shrink: 0;
  min-width: 3.5rem;
}

.nav-item:hover {
  background: rgba(220, 20, 60, 0.2);
  border-color: var(--primary-color);
  color: var(--secondary-color);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.3);
}

.nav-item.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--text-color);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.4);
}

.nav-icon {
  font-size: 1.4rem;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.nav-item:hover .nav-icon {
  transform: scale(1.1);
}

.nav-item.active .nav-icon {
  transform: scale(1.1);
}

/* Tooltip on hover */
.nav-item::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: var(--text-color);
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  font-family: var(--font-family-pixel);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  white-space: nowrap;
  z-index: 1001;
  margin-bottom: 0.75rem;
  pointer-events: none;
}

.nav-item:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(-0.25rem);
}

/* Large screens (Desktop) */
@media (min-width: 1200px) {
  .bottom-nav {
    bottom: 1.5rem;
    padding: 1rem 1.5rem;
  }
  
  .bottom-nav.nav-hidden {
    transform: translateX(-50%) translateY(calc(100% + 3rem));
  }
  
  .nav-container {
    gap: 1rem;
  }
  
  .nav-item {
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
  }
  
  .nav-icon {
    font-size: 1.6rem;
  }
  
  .nav-item::after {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
}

/* Large tablets and small desktops */
@media (max-width: 1199px) and (min-width: 992px) {
  .bottom-nav {
    bottom: 1.25rem;
    padding: 0.875rem 1.25rem;
  }
  
  .nav-container {
    gap: 0.875rem;
  }
  
  .nav-item {
    width: 3.75rem;
    height: 3.75rem;
    min-width: 3.75rem;
  }
  
  .nav-icon {
    font-size: 1.5rem;
  }
}

/* Tablets */
@media (max-width: 991px) and (min-width: 769px) {
  .bottom-nav {
    bottom: 1rem;
    padding: 0.75rem 1rem;
  }
  
  .nav-container {
    gap: var(--space-3);
  }
  
  .nav-item {
    width: 3.5rem;
    height: 3.5rem;
    min-width: 3.5rem;
  }
  
  .nav-icon {
    font-size: 1.4rem;
  }
}

/* Small tablets and large phones */
@media (max-width: 768px) and (min-width: 577px) {
  .bottom-nav {
    bottom: 0.875rem;
    padding: 0.625rem 0.875rem;
  }
  
  .nav-container {
    gap: 0.625rem;
  }
  
  .nav-item {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
  }
  
  .nav-icon {
    font-size: 1.2rem;
  }
  
  .nav-item::after {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
}

/* Mobile phones */
@media (max-width: 576px) and (min-width: 481px) {
  .bottom-nav {
    bottom: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
  
  .nav-container {
    gap: 0.5rem;
  }
  
  .nav-item {
    width: 2.75rem;
    height: 2.75rem;
    min-width: 2.75rem;
  }
  
  .nav-icon {
    font-size: 1.1rem;
  }
  
  .nav-item::after {
    font-size: 0.7rem;
    padding: 0.3rem 0.5rem;
  }
}

/* Small mobile phones */
@media (max-width: 480px) and (min-width: 361px) {
  .bottom-nav {
    bottom: 0.625rem;
    padding: 0.4rem 0.6rem;
  }
  
  .nav-container {
    gap: 0.4rem;
  }
  
  .nav-item {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
  }
  
  .nav-icon {
    font-size: 1rem;
  }
  
  .nav-item::after {
    font-size: 0.65rem;
    padding: 0.25rem 0.4rem;
  }
}

/* Very small mobile phones */
@media (max-width: 360px) {
  .bottom-nav {
    bottom: 0.5rem;
    padding: 0.3rem 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    transform: none;
    max-width: none;
  }
  
  .nav-container {
    gap: 0.3rem;
    justify-content: space-between;
  }
  
  .nav-item {
    width: 2.25rem;
    height: 2.25rem;
    min-width: 2.25rem;
    flex: 1;
    max-width: 2.5rem;
  }
  
  .nav-icon {
    font-size: 0.9rem;
  }
  
  .nav-item::after {
    font-size: 0.6rem;
    padding: 0.2rem 0.3rem;
  }
}

/* Ultra-wide screens */
@media (min-width: 1920px) {
  .bottom-nav {
    bottom: 2rem;
    padding: 1.25rem 2rem;
  }
  
  .bottom-nav.nav-hidden {
    transform: translateX(-50%) translateY(calc(100% + 4rem));
  }
  
  .nav-container {
    gap: 1.25rem;
  }
  
  .nav-item {
    width: 4.5rem;
    height: 4.5rem;
    min-width: 4.5rem;
  }
  
  .nav-icon {
    font-size: 1.8rem;
  }
  
  .nav-item::after {
    font-size: 1rem;
    padding: 0.75rem 1.25rem;
  }
}

/* Landscape orientation adjustments */
@media (orientation: landscape) and (max-height: 600px) {
  .bottom-nav {
    bottom: 0.5rem;
    padding: 0.4rem 0.6rem;
  }
  
  .nav-item {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
  }
  
  .nav-icon {
    font-size: 1rem;
  }
  
  .nav-container {
    gap: 0.4rem;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .nav-item {
    min-width: 3rem;
    min-height: 3rem;
  }
  
  .nav-item::after {
    display: none; /* Hide tooltips on touch devices */
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .bottom-nav {
    transition: none;
  }
  
  .bottom-nav.nav-hidden {
    transform: translateX(-50%) translateY(calc(100% + 2rem));
    opacity: 0;
    pointer-events: none;
  }
  
  .nav-item {
    transition: none;
  }
  
  .nav-item:hover {
    transform: none;
  }
  
  .nav-item.active {
    transform: none;
  }
  
  .nav-icon {
    transition: none;
  }
  
  .nav-item::after {
    transition: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bottom-nav {
    background: #000000;
    border-color: #ffffff;
  }
  
  .nav-item {
    background: #000000;
    border-color: #ffffff;
    color: #ffffff;
  }
  
  .nav-item:hover {
    background: #ffffff;
    color: #000000;
  }
  
  .nav-item.active {
    background: #ffffff;
    color: #000000;
  }
  
  .nav-item::after {
    background: #000000;
    color: #ffffff;
    border-color: #ffffff;
  }
}

/* Safe area support for mobile devices */
@supports (padding: max(0px)) {
  .bottom-nav {
    bottom: max(1rem, env(safe-area-inset-bottom));
  }
  
  @media (max-width: 1199px) and (min-width: 992px) {
    .bottom-nav {
      bottom: max(1.25rem, env(safe-area-inset-bottom));
    }
  }
  
  @media (max-width: 991px) and (min-width: 769px) {
    .bottom-nav {
      bottom: max(1rem, env(safe-area-inset-bottom));
    }
  }
  
  @media (max-width: 768px) and (min-width: 577px) {
    .bottom-nav {
      bottom: max(0.875rem, env(safe-area-inset-bottom));
    }
  }
  
  @media (max-width: 576px) and (min-width: 481px) {
    .bottom-nav {
      bottom: max(0.75rem, env(safe-area-inset-bottom));
    }
  }
  
  @media (max-width: 480px) and (min-width: 361px) {
    .bottom-nav {
      bottom: max(0.625rem, env(safe-area-inset-bottom));
    }
  }
  
  @media (max-width: 360px) {
    .bottom-nav {
      bottom: max(0.5rem, env(safe-area-inset-bottom));
    }
  }
}

/* Ensure navbar is always visible */
.bottom-nav {
  position: fixed !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}

/* Override any potential hiding styles */
.bottom-nav * {
  pointer-events: auto !important;
}

/* Print styles */
@media print {
  .bottom-nav {
    display: none;
  }
}
</style>
