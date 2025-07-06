<template>
  <div class="projects-page">
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
        <!-- Projects Grid -->
        <div class="projects-grid">
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="project-card"
          >
            <div class="project-content">
              <!-- Project Image -->
              <div class="project-image-container">
                <img
                  :src="project.img"
                  :alt="project.title"
                  class="project-image"
                />
                <div class="project-overlay">
                  <div class="project-links">
                    <a :href="project.liveLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm live-link">
                      <i class="fa-solid fa-external-link-alt"></i>
                      Live
                    </a>
                    <a :href="project.githubLink" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm github-link">
                      <i class="fa-brands fa-github"></i>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              <!-- Project Info -->
              <div class="project-info">
                <h3 class="project-title">{{ project.title }}</h3>
                <div class="project-tech">
                  <div class="tech-label">Built with:</div>
                  <div class="tech-stack">{{ project.language }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      projects: [
        {
          id: 1,
          title: "Vue.js Portfolio",
          liveLink: "https://vue-portfolio-c077e.web.app/",
          githubLink: "https://github.com/RicardoRonan/vue-portfolio",
          img: "https://i.postimg.cc/J4svKSky/BMI-calc.png",
          language: "Vue.js, CSS3, JavaScript, Firebase",
        },
        {
          id: 2,
          title: "BMI Calculator",
          liveLink: "https://check-your-bmi.netlify.app/",
          githubLink: "https://github.com/RicardoRonan/BMI-calculator",
          img: "https://i.postimg.cc/J4svKSky/BMI-calc.png",
          language: "HTML5, CSS3, JavaScript, Bootstrap",
        },
        {
          id: 3,
          title: "Task Management App",
          liveLink: "https://app-of-the-to-do.netlify.app/",
          githubLink: "https://github.com/RicardoRonan/todo-app",
          img: "https://i.postimg.cc/0N0BbsL4/todo-list.png",
          language: "HTML5, CSS3, JavaScript, Bootstrap",
        },
        {
          id: 4,
          title: "Temperature Converter",
          liveLink: "https://converter-of-temp.netlify.app/",
          githubLink: "https://github.com/RicardoRonan/Temperature-converter",
          img: "https://i.postimg.cc/7ZDcDhRz/temp-converter.png",
          language: "HTML5, CSS3, JavaScript, Bootstrap",
        },
        {
          id: 5,
          title: "Property Listing Platform",
          liveLink: "https://listing-of-property.netlify.app/",
          githubLink: "https://github.com/RicardoRonan/Property-listing",
          img: "https://i.postimg.cc/Gp6xLSpf/Fye-prooperties.png",
          language: "HTML5, CSS3, JavaScript, Bootstrap",
        },
        {
          id: 6,
          title: "Digital Art Gallery",
          liveLink: "https://leschevresdigitalartgallery.netlify.app/",
          githubLink: "https://github.com/fatimagalant/Vue-Portfolio",
          img: "https://i.postimg.cc/BvP2VcCB/les-chevres.png",
          language: "Vue.js, CSS3, JavaScript, Bootstrap",
        },
      ],
    };
  },
};
</script>
<style scoped>
/* Projects Page */
.projects-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  position: relative;
  overflow: hidden;
}

.projects-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="50" cy="10" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="10" cy="90" r="1" fill="%23ffffff" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0 2rem 0;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(245, 245, 220, 0.1));
  border-bottom: 0.125rem solid var(--primary-color);
  position: relative;
  z-index: 2;
}

.hero-title {
  font-family: var(--font-family-pixel);
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--primary-color);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
  animation: slideInDown var(--animation-duration-subtle) ease-out;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--secondary-color);
  max-width: 600px;
  margin: 0 auto;
  animation: slideInUp var(--animation-duration-subtle) ease-out var(--animation-delay-small) both;
}

/* Projects Content */
.projects-content {
  padding: 3rem 0;
  position: relative;
  z-index: 2;
}

/* Projects Grid */
.projects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem 1rem;
  justify-content: center;
  animation: slideInUp var(--animation-duration-subtle) ease-out both;
}

/* Project Card */
.project-card {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  overflow: hidden;
  transition: all var(--transition-duration) ease;
  backdrop-filter: blur(0.5rem);
  position: relative;
  animation: slideInUp var(--animation-duration-subtle) ease-out both;
  flex: 1 1 20rem;
  max-width: 30rem;
  min-width: 20rem;
}

.project-card:nth-child(1) { animation-delay: var(--animation-delay-small); }
.project-card:nth-child(2) { animation-delay: var(--animation-delay-medium); }
.project-card:nth-child(3) { animation-delay: var(--animation-delay-medium); }
.project-card:nth-child(4) { animation-delay: var(--animation-delay-large); }
.project-card:nth-child(5) { animation-delay: var(--animation-delay-large); }
.project-card:nth-child(6) { animation-delay: var(--animation-delay-larger); }

.project-card:hover {
  transform: translateY(-0.5rem) scale(1.02);
  box-shadow: 0 1rem 2rem rgba(220, 20, 60, 0.3);
  border-color: var(--secondary-color);
  background: rgba(255, 255, 255, 0.08);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(220, 20, 60, 0.1), transparent);
  opacity: 0;
  transition: opacity var(--transition-duration) ease;
  z-index: 1;
}

.project-card:hover::before {
  opacity: 1;
}

/* Project Image Container */
.project-image-container {
  position: relative;
  overflow: hidden;
  height: 12rem;
  background: rgba(0, 0, 0, 0.3);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--animation-duration-subtle) ease, filter var(--animation-duration-subtle) ease;
  filter: drop-shadow(0 0.25rem 0.5rem rgba(0, 0, 0, 0.5));
}

.project-card:hover .project-image {
  transform: scale(1.05);
  filter: drop-shadow(0 0.5rem 1rem rgba(0, 0, 0, 0.7));
}

/* Project Overlay */
.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--animation-duration-subtle) ease, transform var(--animation-duration-subtle) ease;
  z-index: 2;
}

.project-card:hover .project-overlay {
  opacity: 1;
  transform: translateY(0);
}

.project-links {
  display: flex;
  gap: 1rem;
  transition: opacity var(--animation-duration-subtle) ease;
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity var(--animation-duration-subtle) ease, transform var(--animation-duration-subtle) ease;
}

.project-card:hover .project-links {
  opacity: 1;
  transform: translateY(0);
}

.project-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 0.125rem solid transparent;
  border-radius: 0;
  text-decoration: none;
  transition: all var(--transition-duration) ease;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(0.25rem);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.project-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--animation-duration-subtle) ease;
}

.project-link:hover::before {
  left: 100%;
}

.project-link i {
  font-size: 1.5rem;
}

.project-link span {
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.live-link {
  color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.live-link:hover {
  background: var(--secondary-color);
  color: var(--background-color);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1rem rgba(245, 245, 220, 0.3), 0 0 1rem rgba(245, 245, 220, 0.5);
}

.github-link {
  color: var(--text-color);
  border-color: var(--text-color);
}

.github-link:hover {
  background: var(--text-color);
  color: var(--background-color);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1rem rgba(255, 255, 255, 0.3), 0 0 1rem rgba(255, 255, 255, 0.5);
}

/* Project Info */
.project-info {
  padding: 1.5rem;
  position: relative;
  z-index: 2;
}

.project-title {
  font-family: var(--font-family-pixel);
  font-size: 1.1rem;
  color: var(--secondary-color);
  margin: 0 0 1rem 0;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  line-height: 1.3;
}

.project-tech {
  border-top: 0.0625rem solid rgba(245, 245, 220, 0.2);
  padding-top: 1rem;
}

.tech-label {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  margin-bottom: 0.5rem;
}

.tech-stack {
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  color: var(--text-color);
  line-height: 1.4;
  opacity: 0.9;
}

/* Animations */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
  .projects-grid {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    align-items: center;
  }
  
  .project-card {
    max-width: 100%;
    min-width: auto;
  }
  
  .projects-title {
    font-size: 2rem;
  }
  
  .projects-subtitle {
    font-size: 1rem;
  }
  
  .project-image-container {
    height: 10rem;
  }
  
  .project-info {
    padding: 1rem;
  }
  
  .project-title {
    font-size: 1rem;
  }
  
  .project-links {
    gap: 0.5rem;
  }
  
  .project-link {
    padding: 0.75rem;
  }
  
  .project-link i {
    font-size: 1.2rem;
  }
  
  .project-link span {
    font-size: 0.7rem;
  }
}

@media (max-width: 576px) {
  .projects-title {
    font-size: 1.8rem;
  }
  
  .projects-subtitle {
    font-size: 0.9rem;
  }
  
  .project-image-container {
    height: 8rem;
  }
  
  .project-title {
    font-size: 0.9rem;
  }
  
  .tech-stack {
    font-size: 0.7rem;
  }
  
  .project-link {
    padding: 0.5rem;
  }
  
  .project-link i {
    font-size: 1rem;
  }
  
  .project-link span {
    font-size: 0.6rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .project-card {
    animation: none;
  }
  
  .project-card:hover {
    transform: none;
  }
  
  .project-image {
    transform: none !important;
  }
  
  .project-overlay {
    transition: opacity 0.01ms ease !important;
  }
  
  .project-links {
    transition: opacity 0.01ms ease !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .project-card {
    border-color: #ffffff;
    background: #000000;
  }
  
  .project-overlay {
    background: rgba(0, 0, 0, 0.9);
  }
  
  .project-link {
    border-color: #ffffff;
    background: #000000;
  }
}
</style>
