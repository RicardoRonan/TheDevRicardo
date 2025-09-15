<template>
  <!-- Menu Toggle Button -->
  <button id="menu-btn" class="menu-toggle pixel-border neon-glow retro-bg scanline-bg" type="button" @click="toggleNav()">
    <div class="menu-icon">
      <span class="menu-line"></span>
      <span class="menu-line"></span>
      <span class="menu-line"></span>
    </div>
  </button>

  <!-- Navigation Overlay -->
  <nav class="nav-overlay retro-bg scanline-bg" :class="{ active: isNavOpen }">
    <div class="nav-background retro-bg scanline-bg"></div>
    
    <!-- Close Button -->
    <button id="close-btn" class="nav-close pixel-border neon-glow retro-bg scanline-bg" type="button" @click="toggleNav()">
      <i class="fa-solid fa-times"></i>
    </button>

    <!-- Navigation Content -->
    <div class="nav-content pixel-border neon-glow retro-bg scanline-bg">
      <!-- Logo/Avatar -->
      <div class="nav-logo pixel-border neon-glow retro-bg scanline-bg">
        <router-link @click="toggleNav()" to="/" class="logo-link">
          <img
            src="https://i.postimg.cc/MH421x0m/pixel-ricardo.png"
            alt="Portfolio Logo"
            class="logo-image pixel-border neon-glow retro-bg scanline-bg"
          />
          <div class="logo-text">Ricardo Moses</div>
        </router-link>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links">
        <router-link 
          class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
          @click="toggleNav()" 
          to="/"
          exact-active-class="active"
        >
          <i class="fa-solid fa-home nav-icon"></i>
          <span class="nav-text">Home</span>
        </router-link>


        <router-link 
          class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
          @click="toggleNav()" 
          to="/projects"
          active-class="active"
        >
          <i class="fa-solid fa-code nav-icon"></i>
          <span class="nav-text">Projects</span>
        </router-link>

        <!-- <router-link 
          class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
          @click="toggleNav()" 
          to="/blog"
          active-class="active"
        >
          <i class="fa-solid fa-blog nav-icon"></i>
          <span class="nav-text">Blog</span>
        </router-link> -->

        <router-link 
          class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
          @click="toggleNav()" 
          to="/resources"
          active-class="active"
        >
          <i class="fa-solid fa-tools nav-icon"></i>
          <span class="nav-text">Resources</span>
        </router-link>

        <router-link 
          class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
          @click="toggleNav()" 
          to="/testimonials"
          active-class="active"
        >
          <i class="fa-solid fa-comments nav-icon"></i>
          <span class="nav-text">Testimonials</span>
        </router-link>

        <router-link 
          class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
          @click="toggleNav()" 
          to="/experience"
          active-class="active"
        >
          <i class="fa-solid fa-briefcase nav-icon"></i>
          <span class="nav-text">Experience</span>
        </router-link>

        <router-link 
          class="nav-item pixel-border neon-glow retro-bg scanline-bg" 
          @click="toggleNav()" 
          to="/contact"
          active-class="active"
        >
          <i class="fa-solid fa-envelope nav-icon"></i>
          <span class="nav-text">Contact</span>
        </router-link>
      </div>

      <!-- Social Links -->
      <div class="nav-social">
        <a href="https://github.com/RicardoRonan" target="_blank" class="social-link pixel-border neon-glow retro-bg scanline-bg">
          <i class="fa-brands fa-github"></i>
        </a>
        <a href="https://linkedin.com/in/ricardo-moses" target="_blank" class="social-link pixel-border neon-glow retro-bg scanline-bg">
          <i class="fa-brands fa-linkedin"></i>
        </a>
        <a href="mailto:ricardo@example.com" class="social-link pixel-border neon-glow retro-bg scanline-bg">
          <i class="fa-solid fa-envelope"></i>
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isNavOpen: false
    };
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
      // Prevent body scroll when nav is open
      if (this.isNavOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    scrollToAbout() {
      this.toggleNav(); // Close the nav menu
      // Navigate to home page first if not already there
      if (this.$route.path !== '/') {
        this.$router.push('/').then(() => {
          // Wait a bit for the page to load, then scroll
          setTimeout(() => {
            const aboutSection = document.getElementById('About');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        });
      } else {
        // Already on home page, just scroll
        const aboutSection = document.getElementById('About');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
  },
  beforeUnmount() {
    // Ensure body scroll is restored when component is destroyed
    document.body.style.overflow = 'auto';
  }
};
</script>
<style scoped>
/* Menu Toggle Button */
.menu-toggle {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.1);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  backdrop-filter: blur(0.5rem);
}

.menu-toggle:hover {
  background: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.3);
}

.menu-icon {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 1.5rem;
  height: 1.125rem;
}

.menu-line {
  width: 100%;
  height: 0.125rem;
  background: var(--secondary-color);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.menu-toggle:hover .menu-line {
  background: var(--text-color);
}

/* Navigation Overlay */
.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

.nav-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
    background: linear-gradient(135deg, var(--background-color) 0%, #1a1a1a 100%);
}


/* Close Button */
.nav-close {
  position: absolute;
  top: 6rem;
width: 2.5rem;
height: 2.5rem;
display: flex;
justify-content: center;
align-items: center;
  right: 2rem;
  z-index: 1001;
  background: transparent;
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 0.75rem;
  color: var(--secondary-color);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.nav-close:hover {
  background: var(--primary-color);
  color: var(--text-color);
  transform: scale(1.1);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.3);
}

/* Navigation Content */
.nav-content {
  position: relative;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
  padding-top: 13rem;
  overflow-y: auto;
}

/* Logo Section */
.nav-logo {
  margin-bottom: 3rem;
  animation: slideInUp var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-small) both;
}

.logo-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-image {
  width: 6rem;
  height: 6rem;
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  margin-bottom: 1rem;
  filter: drop-shadow(0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.5));
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.logo-link:hover .logo-image {
  border-color: var(--secondary-color);
  transform: scale(1.1);
}

.logo-text {
  font-family: var(--font-family-pixel);
  font-size: 1.2rem;
  color: var(--secondary-color);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
}

/* Navigation Links */
.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: slideInUp var(--animation-duration-subtle) var(--animation-ease) both;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  font-family: var(--font-family-pixel);
  font-size: 1.2rem;
  color: var(--text-color);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid transparent;
  border-radius: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  min-width: 12rem;
  backdrop-filter: blur(0.25rem);
  animation: slideInLeft var(--animation-duration-subtle) var(--animation-ease) both;
}

.nav-item:nth-child(1) { animation-delay: var(--animation-delay-medium); }
.nav-item:nth-child(2) { animation-delay: var(--animation-delay-large); }
.nav-item:nth-child(3) { animation-delay: var(--animation-delay-large); }
.nav-item:nth-child(4) { animation-delay: var(--animation-delay-larger); }
.nav-item:nth-child(5) { animation-delay: var(--animation-delay-larger); }
.nav-item:nth-child(6) { animation-delay: var(--animation-delay-largest); }

.nav-item:hover {
  background: rgba(220, 20, 60, 0.2);
  border-color: var(--primary-color);
  color: var(--secondary-color);
  transform: translateX(0.5rem);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.3);
}

.nav-item.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--text-color);
}

.nav-icon {
  font-size: 1.5rem;
  min-width: 2rem;
  text-align: center;
}

.nav-text {
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

/* Social Links */
.nav-social {
  display: flex;
  gap: 1.5rem;
  animation: slideInUp var(--animation-duration-subtle) var(--animation-ease) 0.36s both;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--secondary-color);
  border-radius: 0;
  color: var(--secondary-color);
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  backdrop-filter: blur(0.25rem);
}

.social-link:hover {
  background: var(--secondary-color);
  color: var(--background-color);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1rem rgba(245, 245, 220, 0.3);
}

/* Animations */
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

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-toggle {
    top: 1.5rem;
    right: 1.5rem;
    padding: 0.6rem;
  }
  
  .nav-close {
    top: 1.5rem;
    right: 1.5rem;
    padding: 0.6rem;
    font-size: 1.2rem;
  }
  
  .nav-content {
    padding: 1rem;
  }
  
  .logo-image {
    width: 4rem;
    height: 4rem;
  }
  
  .logo-text {
    font-size: 1rem;
  }
  
  .nav-item {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    min-width: 10rem;
  }
  
  .nav-icon {
    font-size: 1.2rem;
  }
  
  .social-link {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .nav-links {
    gap: 1rem;
  }
  
  .nav-item {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
    min-width: 8rem;
  }
  
  .nav-icon {
    font-size: 1rem;
  }
  
  .logo-text {
    font-size: 0.9rem;
  }
  
  .social-link {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .nav-item {
    animation: none;
  }
  
  .nav-logo {
    animation: none;
  }
  
  .nav-social {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .menu-toggle {
    border-color: #ffffff;
    background: #000000;
  }
  
  .nav-close {
    border-color: #ffffff;
    background: #000000;
  }
  
  .nav-item {
    border-color: #ffffff;
    background: #000000;
  }
  
  .social-link {
    border-color: #ffffff;
    background: #000000;
  }
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  padding: 0.5rem 1rem;
  border: 0.125rem solid transparent;
  border-radius: 0;
  cursor: pointer;
}
</style>
