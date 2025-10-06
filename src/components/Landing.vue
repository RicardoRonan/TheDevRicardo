<template>
  <section id="home" class="min-vh-100 d-flex flex-column justify-content-center">
    <div class="container-fluid">
      <!-- Hero Section -->
      <div class="row g-4 align-items-center">
        <!-- Text Content -->
        <div class="col-lg-6 col-md-12 order-2 order-lg-1">
          <div class="text-content">
            <h1 id="title" class="text-light mb-3">Welcome, I'm</h1>
            <h1 id="title-name" class="mb-3">Ricardo Moses</h1>
            <h2 id="sub-title" class="text-light mb-4">Full-Stack Developer & Automation Specialist</h2>
            <p class="lead text-light mb-4">
              Welcome to my digital space where I showcase my work, share insights through blogs, and provide valuable resources and tools for the developer community.
            </p>
            <div class="cta-buttons">
              <router-link to="/projects" class="btn btn-primary btn-lg me-3 mb-2">
                View My Work
              </router-link>
              <!-- <router-link to="/blog" class="btn btn-outline-light btn-lg me-3 mb-2">
                Read Blog
              </router-link> -->
              <router-link to="/contact" class="btn btn-outline-light btn-lg  me-3 mb-2">
                Get In Touch
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- Image Content -->
        <div class="col-lg-6 col-md-12 order-1 order-lg-2">
          <div id="me-cont" class="d-flex justify-content-center">
            <img
              id="me"
              class="img-fluid responsive-img"
              src="https://i.postimg.cc/MH421x0m/pixel-ricardo.png"
              alt="Ricardo Moses pixel avatar"
            />
          </div>
        </div>
      </div>
      
      <!-- Platform Overview Section -->
      <div class="row mt-3">
        <div class="col-12">
          <div class="platform-overview">
            <h3 class="text-light text-center mb-3">Explore My Platform</h3>
            <div class="row g-4">
              <!-- Portfolio Section -->
              <div class="col-lg-4 col-md-6">
                <div class="platform-card" @click="$router.push('/projects')">
                  <div class="card-icon">💼</div>
                  <h4>Portfolio</h4>
                  <p>Discover my latest projects, case studies, and technical achievements</p>
                  <div class="card-arrow">→</div>
                </div>
              </div>
              
              <!-- Blog Section -->
              <!-- <div class="col-lg-3 col-md-6">
                <div class="platform-card" @click="$router.push('/blog')">
                  <div class="card-icon">📝</div>
                  <h4>Blog</h4>
                  <p>Insights, tutorials, and thoughts on technology, development, and innovation</p>
                  <div class="card-arrow">→</div>
                </div>
              </div> -->
              
              <!-- Resources Section -->
              <div class="col-lg-4 col-md-6">
                <div class="platform-card" @click="$router.push('/resources')">
                  <div class="card-icon">📚</div>
                  <h4>Resources</h4>
                  <p>Curated tools, libraries, and resources I've found valuable in my journey</p>
                  <div class="card-arrow">→</div>
                </div>
              </div>
              
              <!-- Tools Section -->
              <div class="col-lg-4 col-md-6">
                <div class="platform-card" @click="$router.push('/contact')">
                  <div class="card-icon">🛠️</div>
                  <h4>Tools</h4>
                  <p>Custom tools and utilities I've built to streamline development workflows</p>
                  <div class="card-arrow">→</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Stats Section -->
      <div class="row mt-3">
        <div class="col-12">
          <div class="stats-section">
            <div class="row g-4 text-center">
              <div class="col-lg-4 col-md-6">
                <div class="stat-item">
                  <div class="stat-number">10+</div>
                  <div class="stat-label">Projects Completed</div>
                </div>
              </div>
              <!-- <div class="col-lg-3 col-md-6">
                <div class="stat-item">
                  <div class="stat-number">2+</div>
                  <div class="stat-label">Blog Posts</div>
                </div>
              </div> -->
              <div class="col-lg-4 col-md-6">
                <div class="stat-item">
                  <div class="stat-number">2+</div>
                  <div class="stat-label">Years Experience</div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="stat-item">
                  <div class="stat-number">5+</div>
                  <div class="stat-label">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const home = document.getElementById('home')
  if (home) {
    // Force reflow to ensure transitions run after initial styles apply
    void home.offsetWidth
    home.classList.add('entered')
  }
})
</script>

<style scoped>
/* Home Section */
#home {
  position: relative;
  overflow: hidden;
}

#home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="50" cy="10" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="10" cy="90" r="1" fill="%23ffffff" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); */
  pointer-events: none;
}

.min-vh-75 {
  min-height: 75vh;
}

/* Text Content */
.text-content {
  padding: 1rem 0;
  z-index: 2;
  position: relative;

}

#title {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-family: var(--font-family-pixel);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  line-height: 1.1;
  opacity: 0;
  transform: translateX(-2rem);
  text-align: left;
  transition: opacity var(--transition-duration) ease-out, transform var(--transition-duration) ease-out;
  margin-bottom: 0.5rem;
}

#title-name {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-family: var(--font-family-pixel);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  line-height: 1.1;
  opacity: 0;
  color: var(--primary-color);
  transform: translateX(-2rem);
  text-align: left;
  transition: opacity var(--transition-duration) ease-out, transform var(--transition-duration) ease-out;
  transition-delay: 0.1s;
  margin-bottom: 0.5rem;
}

#sub-title {
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-family: var(--font-family-pixel);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  color: var(--primary-color);
  line-height: 1.2;
  opacity: 0;
  transform: translateX(-2rem);
  transition: opacity var(--transition-duration) ease-out, transform var(--transition-duration) ease-out;
  transition-delay: 0.1s;
  margin-bottom: 0.75rem;
}

.lead {
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  line-height: 1.4;
  opacity: 0.9;
  opacity: 0;
  transform: translateX(-2rem);
  transition: opacity var(--transition-duration) ease-out, transform var(--transition-duration) ease-out;
  transition-delay: 0.2s;
  margin-bottom: 1rem;
}

/* CTA Buttons */
.cta-buttons { opacity: 0; transform: translateX(-2rem); transition: opacity var(--transition-duration) ease-out, transform var(--transition-duration) ease-out; transition-delay: 0.3s;display: flex;justify-content: start; }

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0;
  border-width: 0.125rem;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.btn-primary:hover {
  background-color: transparent;
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-0.125rem);
  box-shadow: 0 0.25rem 0.5rem rgba(220, 20, 60, 0.3);
    text-decoration: none;
}

.btn-outline-light {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0;
  border-width: 0.125rem;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.btn-outline-light:hover {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: var(--background-color);
  transform: translateY(-0.125rem);
  box-shadow: 0 0.25rem 0.5rem rgba(245, 245, 220, 0.3);
  text-decoration: none;
}

/* Character Image */
#me-cont { padding: 1rem 0; opacity: 0; transform: translateX(2rem); transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease); transition-delay: 0.2s; }

#me {
  max-width: 100%;
  height: auto;
  width: clamp(12rem, 20vw, 16rem);
  filter: drop-shadow(0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5));
  transition: transform var(--transition-duration) ease;
  border: 0.5rem var(--primary-color) ridge;
}

#me:hover {
  transform: scale(1.05);
}

/* Platform Overview Section */
.platform-overview { opacity: 0; transform: translateY(2rem); transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease); transition-delay: 0.2s; }

.platform-overview .row {
  display: flex;
  align-items: stretch;
}

.platform-overview h3 {
  font-family: var(--font-family-pixel);
  font-size: clamp(1rem, 2vw, 1.5rem);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.platform-card {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 1rem 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(0.5rem);
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.platform-card:hover {
  transform: translateY(-0.5rem);
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--secondary-color);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.3);
}

.platform-card h4 {
  color: var(--primary-color);
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  margin: 0.5rem 0 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.platform-card p {
  color: var(--secondary-color);
  font-size: 0.7rem;
  line-height: 1.3;
  margin-bottom: 0.5rem;
  opacity: 0.9;
  flex-grow: 1;
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.5));
}

.card-arrow {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.platform-card:hover .card-arrow {
  transform: translateX(0.5rem);
}

/* Stats Section */
.stats-section { opacity: 0; transform: translateY(2rem); transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease); transition-delay: 0.1s; }

/* Entered state to reveal elements */
#home.entered #title,
#home.entered #title-name,
#home.entered #sub-title,
#home.entered .lead,
#home.entered .cta-buttons,
#home.entered #me-cont,
#home.entered .platform-overview,
#home.entered .platform-card,
#home.entered .stats-section {
  opacity: 1;
  transform: translateX(0) translateY(0);
}

.stat-item {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 1rem 0.5rem;
  backdrop-filter: blur(0.5rem);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--secondary-color);
  transform: translateY(-0.25rem);
}

.stat-number {
  color: var(--primary-color);
  font-family: var(--font-family-pixel);
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: bold;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  margin-bottom: 0.25rem;
}

.stat-label {
  color: var(--secondary-color);
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  opacity: 0.9;
}

/* Removed keyframe animations in favor of transitions */

/* Responsive Design */
@media (max-width: 768px) {
  .text-content {
    text-align: center;
    padding: 0.5rem 0;
  }
  
  #title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  #title-name {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  #sub-title {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
  
  .lead {
    font-size: 0.7rem;
    margin-bottom: 1rem;
  }
  
  .btn-lg {
    font-size: 0.6rem;
    padding: 0.4rem 1rem;
  }
  
  .cta-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .btn {
    width: 100%;
    max-width: 12rem;
  }
  
  #me {
    width: 10rem;
    margin-bottom: 1rem;
  }
  
  /* Platform Cards Mobile */
  .platform-card {
    padding: 0.75rem 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .platform-card h4 {
    font-size: 0.8rem;
  }
  
  .platform-card p {
    font-size: 0.6rem;
  }
  
  .card-icon {
    font-size: 1.2rem;
  }
  
  /* Stats Mobile */
  .stat-item {
    padding: 0.75rem 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .stat-number {
    font-size: 1.2rem;
  }
  
  .stat-label {
    font-size: 0.6rem;
  }
}

@media (max-width: 576px) {
  #title {
    font-size: 1rem;
  }
  
  #title-name {
    font-size: 1rem;
  }
  
  #sub-title {
    font-size: 0.7rem;
  }
  
  .lead {
    font-size: 0.6rem;
  }
  
  #me {
    width: 8rem;
  }
  
  .btn-lg {
    font-size: 0.5rem;
    padding: 0.3rem 0.8rem;
  }
  
  /* Platform Overview Mobile */
  .platform-overview h3 {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
  
  .platform-card {
    padding: 0.5rem 0.25rem;
  }
  
  .platform-card h4 {
    font-size: 0.7rem;
  }
  
  .platform-card p {
    font-size: 0.5rem;
  }
  
  .card-icon {
    font-size: 1rem;
  }
  
  /* Stats Mobile */
  .stat-item {
    padding: 0.5rem 0.25rem;
  }
  
  .stat-number {
    font-size: 1rem;
  }
  
  .stat-label {
    font-size: 0.5rem;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  #home {
    background: #000000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  #me {
    animation: none;
  }
}

.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

/* Custom styles for landing page elements */
#sub-title {
  text-align: left;
}

.lead {
  text-align: left;
}

.cta-buttons {
  justify-content: start;
  display: contents;
}

#title {
  font-size: clamp(1.5rem, 3vw, 4rem);
}

/* Prevent cursor changes on hover */
a, button, .btn, .platform-card, .stat-item, .nav-item, .footer-link, 
router-link, [role="button"], .clickable, .cursor-pointer {
  cursor: default !important;
}

a:hover, button:hover, .btn:hover, .platform-card:hover, .stat-item:hover, 
.nav-item:hover, .footer-link:hover, router-link:hover, [role="button"]:hover, 
.clickable:hover, .cursor-pointer:hover {
  cursor: default !important;
}
</style>
