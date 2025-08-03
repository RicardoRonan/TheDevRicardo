<template>
  <section id="home" class="min-vh-100 d-flex flex-column justify-content-center">
    <div class="container-fluid">
      <!-- Hero Section -->
      <div class="row g-4 align-items-center">
        <!-- Text Content -->
        <div class="col-lg-6 col-md-12 order-2 order-lg-1">
          <div class="text-content">
            <h1 id="title" class="text-light mb-3">Welcome, I'm Ricardo Moses</h1>
            <h2 id="sub-title" class="text-light mb-4">Full-Stack Developer & Automation Specialist</h2>
            <p class="lead text-light mb-4">
              Welcome to my digital space where I showcase my work, share insights through blogs, and provide valuable resources and tools for the developer community.
            </p>
            <div class="cta-buttons">
              <router-link to="/projects" class="btn btn-primary btn-lg me-3 mb-2">
                View My Work
              </router-link>
              <router-link to="/blog" class="btn btn-outline-light btn-lg me-3 mb-2">
                Read Blog
              </router-link>
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
      <div class="row mt-5">
        <div class="col-12">
          <div class="platform-overview">
            <h3 class="text-light text-center mb-5">Explore My Platform</h3>
            <div class="row g-4">
              <!-- Portfolio Section -->
              <div class="col-lg-3 col-md-6">
                <div class="platform-card" @click="$router.push('/projects')">
                  <div class="card-icon">💼</div>
                  <h4>Portfolio</h4>
                  <p>Discover my latest projects, case studies, and technical achievements</p>
                  <div class="card-arrow">→</div>
                </div>
              </div>
              
              <!-- Blog Section -->
              <div class="col-lg-3 col-md-6">
                <div class="platform-card" @click="$router.push('/blog')">
                  <div class="card-icon">📝</div>
                  <h4>Blog</h4>
                  <p>Insights, tutorials, and thoughts on technology, development, and innovation</p>
                  <div class="card-arrow">→</div>
                </div>
              </div>
              
              <!-- Resources Section -->
              <div class="col-lg-3 col-md-6">
                <div class="platform-card" @click="$router.push('/resources')">
                  <div class="card-icon">📚</div>
                  <h4>Resources</h4>
                  <p>Curated tools, libraries, and resources I've found valuable in my journey</p>
                  <div class="card-arrow">→</div>
                </div>
              </div>
              
              <!-- Tools Section -->
              <div class="col-lg-3 col-md-6">
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
      <div class="row mt-5">
        <div class="col-12">
          <div class="stats-section">
            <div class="row g-4 text-center">
              <div class="col-lg-3 col-md-6">
                <div class="stat-item">
                  <div class="stat-number">10+</div>
                  <div class="stat-label">Projects Completed</div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <div class="stat-item">
                  <div class="stat-number">2+</div>
                  <div class="stat-label">Blog Posts</div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <div class="stat-item">
                  <div class="stat-number">2+</div>
                  <div class="stat-label">Years Experience</div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
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

<style scoped>
/* Home Section */
#home {
  position: relative;
  overflow: hidden;
  animation: fadeIn var(--animation-duration-subtle) ease-in-out;
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
  padding: 2rem 0;
  z-index: 2;
  position: relative;
}

#title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-family: var(--font-family-pixel);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  line-height: 1.2;
  animation: slideInLeft var(--animation-duration-subtle) ease-out var(--animation-delay-small) both;
}

#sub-title {
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-family: var(--font-family-pixel);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  color: var(--primary-color);
  line-height: 1.3;
  animation: slideInLeft var(--animation-duration-subtle) ease-out var(--animation-delay-medium) both;
}

.lead {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  opacity: 0.9;
  animation: slideInLeft var(--animation-duration-subtle) ease-out var(--animation-delay-medium) both;
}

/* CTA Buttons */
.cta-buttons {
  animation: slideInLeft var(--animation-duration-subtle) ease-out var(--animation-delay-medium) both;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  padding: 0.75rem 2rem;
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
}

.btn-outline-light {
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  padding: 0.75rem 2rem;
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
}

/* Character Image */
#me-cont {
  padding: 2rem 0;
  animation: slideInRight var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-medium) both;
}

#me {
  max-width: 100%;
  height: auto;
  width: clamp(18rem, 30vw, 22rem);
  filter: drop-shadow(0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5));
  transition: transform var(--transition-duration) ease;
  border: 1rem var(--primary-color) ridge;
}

#me:hover {
  transform: scale(1.05);
}

/* Platform Overview Section */
.platform-overview {
  animation: slideInUp var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-medium) both;
}

.platform-overview h3 {
  font-family: var(--font-family-pixel);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  color: var(--secondary-color);
}

.platform-card {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 2rem 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(0.5rem);
  animation: fadeIn var(--animation-duration-slow) var(--animation-ease) var(--animation-delay-slower) both;
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
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.platform-card p {
  color: var(--secondary-color);
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
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
.stats-section {
  animation: slideInUp var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-small) both;
}

.stat-item {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 2rem 1rem;
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
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: bold;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--secondary-color);
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  opacity: 0.9;
}

/* Floating Animation */
@keyframes floating {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1rem);
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-3rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(3rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .text-content {
    text-align: center;
    padding: 1rem 0;
  }
  
  #title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  #sub-title {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  .lead {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .btn-lg {
    font-size: 0.8rem;
    padding: 0.6rem 1.5rem;
  }
  
  .cta-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .btn {
    width: 100%;
    max-width: 15rem;
  }
  
  #me {
    width: 18rem;
    margin-bottom: 2rem;
  }
  
  /* Platform Cards Mobile */
  .platform-card {
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;
  }
  
  .platform-card h4 {
    font-size: 1rem;
  }
  
  .platform-card p {
    font-size: 0.8rem;
  }
  
  .card-icon {
    font-size: 2rem;
  }
  
  /* Stats Mobile */
  .stat-item {
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  #title {
    font-size: 1.8rem;
  }
  
  #sub-title {
    font-size: 1rem;
  }
  
  .lead {
    display: none;
  }
  
  #me {
    width: 16rem;
  }
  
  .btn-lg {
    font-size: 0.7rem;
    padding: 0.5rem 1.2rem;
  }
  
  /* Platform Overview Mobile */
  .platform-overview h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .platform-card {
    padding: 1rem 0.5rem;
  }
  
  .platform-card h4 {
    font-size: 0.9rem;
  }
  
  .platform-card p {
    font-size: 0.75rem;
  }
  
  .card-icon {
    font-size: 1.8rem;
  }
  
  /* Stats Mobile */
  .stat-item {
    padding: 1rem 0.5rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.7rem;
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
</style>
