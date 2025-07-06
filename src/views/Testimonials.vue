<template>
  <div class="testimonials-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="hero-title">What People Say</h1>
            <p class="hero-subtitle">
              Click the pixel avatars to see the real person
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Content -->
    <section class="testimonials-content">
      <div class="container-fluid">
        <!-- Testimonials Grid -->
        <div class="testimonials-grid">
          <div 
            v-for="testimonial in testimonials" 
            :key="testimonial.id"
            class="testimonial-card pixel-border neon-glow retro-bg scanline-bg"
          >
            <div class="testimonial-content">
              <!-- Avatar Section -->
              <div class="avatar-container" @click="showModal(testimonial.id)">
                <div class="avatar-frame pixel-border neon-glow retro-bg scanline-bg">
                  <img
                    :src="testimonial.pixelImg"
                    :alt="testimonial.name + ' pixel avatar'"
                    class="pixel-avatar"
                  />
                </div>
                <div class="click-hint">
                  <span>Click to reveal</span>
                </div>
              </div>

              <!-- Name and Role -->
              <div class="testimonial-header">
                <div class="name-badge">
                  <div class="star-icon">★</div>
                  <h3 class="testimonial-name">{{ testimonial.name }}</h3>
                </div>
                <p class="testimonial-role">{{ testimonial.role }}</p>
              </div>

              <!-- Testimonial Text -->
              <div class="testimonial-text">
                <div class="quote-mark">"</div>
                <p class="testimonial-content-text">{{ testimonial.testimonial }}</p>
                <div class="quote-mark quote-end">"</div>
              </div>
            </div>

            <!-- Modal -->
            <dialog
              class="testimonial-modal pixel-border neon-glow retro-bg scanline-bg"
              :id="'dialog-' + testimonial.id"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title">{{ testimonial.name }}</h3>
                  <button class="modal-close" @click="closeModal(testimonial.id)">×</button>
                </div>
                <div class="modal-body">
                  <img
                    :src="testimonial.img"
                    :alt="testimonial.name"
                    class="real-photo"
                  />
                </div>
                <div class="modal-footer">
                  <button class="btn btn-primary" @click="closeModal(testimonial.id)">
                    Close
                  </button>
                </div>
              </div>
            </dialog>
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
      testimonials: [
        {
          id: 1,
          name: "Fatima Galant",
          pixelImg: "https://i.postimg.cc/F155LSvx/1658336859156.png",
          img: "https://i.postimg.cc/CMG5NXwh/Fatima-1-1.jpg",
          testimonial:
            " Ricardo is a hard-working, talented and authentic individual who always goes above and beyond to achieve the best results possible. His good vibes and positivity is contagious.",
          role: "Colleague",
        },
        {
          id: 2,
          name: "Ashton Abrahams",
          pixelImg: "https://i.postimg.cc/T1gtLGbW/1658339507305-1.png",
          img: "https://i.postimg.cc/yd8rWw6V/Ashton-4.jpg",
          testimonial:
            "Ricardo is a dedicated individual who never stops improving, he is a team player and a valuable asset to any team",
          role: "Colleague",
        },
        {
          id: 3,
          name: "Natheerah Abrahams",
          pixelImg: "https://i.postimg.cc/bw0SK1wc/1658338391828.png",
          img: "https://i.postimg.cc/FFkPYbgX/Natheerah-3-1.jpg",
          testimonial:
            "Ricardo Moses has a winning attitude and is always willin  g to learns new things. He is always willing to extend a helping hand to assist others.",
          role: "Colleague",
        },
        {
          id: 4,
          name: "Carla Amy Lawrence",
          pixelImg: "https://i.postimg.cc/d0H2xG5Q/1658339669009.png",
          img: "https://i.postimg.cc/q7SjMgFG/Carla.png",
          testimonial:
            " It has been a pleasure to have Ricardo Ronan Moses as my colleague. He is an outstanding web developer.His professionalism and effort can be seen in all projects he has worked on.I would highly recommend Ricardo as an addition to any team or company.",
          role: "Colleague",
        },
        {
          id: 5,
          name: "Jason Wandrag",
          pixelImg: "https://i.postimg.cc/Mp4R0zHX/1658339743203.png",
          img: "https://i.postimg.cc/5NbpthsD/Jason.jpg",
          testimonial:
            "Out of all the people I have engaged with, Ricardo is one of the most creative I have come across. He is very skilled in creating visual pieces, which will definitely push him to be a great frontend developer. ",
          role: "Lecturer",
        },
        {
          id: 6,
          name: "Najmah Japtha",
          pixelImg: "https://i.postimg.cc/W4Fzsr21/1658342993413.png",
          img: "https://i.postimg.cc/Y9G3ZgpH/IMG-20220720-WA0022.jpg",
          testimonial:
            " RICARDO is a well-adjusted young man with a positive attitude who always tried hard to do his best at his schoolwork. A glance through his high school record will reveal a learner who applied himself in an attempt to gain success in his studies. ",
          role: "Former Teacher",
        },
        {
          id: 7,
          name: "Aaliyah Jardien",
          pixelImg: "https://i.postimg.cc/m2nhJ8s5/1658343772237.png",
          img: "https://i.postimg.cc/HnMpPScC/IMG-20220720-WA0026.jpg",
          testimonial:
            "Ricardo thrives in creative environments & works well with others. He would be a great asset to any team.",
          role: "Junior Developer",
        },
        {
          id: 8,
          name: "Uzair Damonse",
          pixelImg: "https://i.postimg.cc/KvGswDNB/1658344828431.png",
          img: "https://i.postimg.cc/nh4XLLLt/IMG-20220720-211835.jpg",
          testimonial:
            "Ricardo is a person that improves the environment around him with his positivity and pure presence. His ability in both styling his application and the functionality is astronomically good and in my opinion, is one of the best when comes to mobile responsiveness. With all of this in mind, I truly believe he is an excellent candidate for a software development role.",
          role: "Colleague",
        },
      ],
    };
  },
  methods: {
    showModal(id) {
      const modal = document.getElementById("dialog-" + id);
      if (modal) {
        modal.showModal();
        document.body.style.overflow = 'hidden'; // Prevent background scroll
      }
    },
    closeModal(id) {
      const modal = document.getElementById("dialog-" + id);
      if (modal) {
        modal.close();
        document.body.style.overflow = 'auto'; // Restore scroll
      }
    },
  },
};
</script>
<style scoped>
/* Testimonials Page */
.testimonials-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  position: relative;
  overflow: hidden;
}

.testimonials-page::before {
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

/* Testimonials Content */
.testimonials-content {
  padding: 3rem 0;
  position: relative;
  z-index: 2;
}

/* Testimonials Grid */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: slideInUp var(--animation-duration-subtle) ease-out both;
}

/* Testimonial Card */
.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 2rem;
  transition: all var(--transition-duration) ease;
  backdrop-filter: blur(0.5rem);
  position: relative;
  overflow: hidden;
  animation: slideInUp var(--animation-duration-subtle) ease-out both;
  flex: 1 1 22rem;
  max-width: 30rem;
  min-width: 22rem;
}

.testimonial-card:nth-child(1) { animation-delay: var(--animation-delay-small); }
.testimonial-card:nth-child(2) { animation-delay: var(--animation-delay-medium); }
.testimonial-card:nth-child(3) { animation-delay: var(--animation-delay-medium); }
.testimonial-card:nth-child(4) { animation-delay: var(--animation-delay-large); }
.testimonial-card:nth-child(5) { animation-delay: var(--animation-delay-large); }
.testimonial-card:nth-child(6) { animation-delay: var(--animation-delay-larger); }
.testimonial-card:nth-child(7) { animation-delay: var(--animation-delay-larger); }
.testimonial-card:nth-child(8) { animation-delay: var(--animation-delay-largest); }

.testimonial-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 1rem 2rem rgba(220, 20, 60, 0.3);
  border-color: var(--secondary-color);
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(220, 20, 60, 0.1), transparent);
  opacity: 0;
  transition: opacity var(--transition-duration) ease;
}

.testimonial-card:hover::before {
  opacity: 1;
}

/* Avatar Section */
.avatar-container {
  text-align: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
  position: relative;
}

.avatar-frame {
  width: 8rem;
  height: 8rem;
  margin: 0 auto 1rem;
  border: 0.25rem solid var(--primary-color);
  border-radius: 0;
  overflow: hidden;
  position: relative;
  transition: all var(--transition-duration) ease;
  background: rgba(0, 0, 0, 0.3);
}

.avatar-frame:hover {
  border-color: var(--secondary-color);
  transform: scale(1.05);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.4);
}

.pixel-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-duration) ease;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.avatar-frame:hover .pixel-avatar {
  transform: scale(1.1);
}

.click-hint {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--primary-color);
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

/* Testimonial Header */
.testimonial-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.name-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.star-icon {
  color: var(--primary-color);
  font-size: 1.2rem;
  animation: pulse var(--animation-duration-infinite) infinite;
}

.testimonial-name {
  font-family: var(--font-family-pixel);
  font-size: 1.1rem;
  color: var(--secondary-color);
  margin: 0;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
}

.testimonial-role {
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  color: var(--primary-color);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

/* Testimonial Text */
.testimonial-text {
  position: relative;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 0.0625rem solid rgba(245, 245, 220, 0.2);
}

.quote-mark {
  font-size: 2rem;
  color: var(--primary-color);
  font-family: serif;
  position: absolute;
  opacity: 0.6;
}

.quote-mark:first-child {
  top: -0.5rem;
  left: 0.5rem;
}

.quote-end {
  bottom: -1rem;
  right: 0.5rem;
  transform: rotate(180deg);
}

.testimonial-content-text {
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--text-color);
  margin: 0;
  padding: 0.5rem;
  text-align: left;
}

/* Modal Styles */
.testimonial-modal {
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  background: var(--background-color);
  color: var(--text-color);
  padding: 0;
  max-width: 90vw;
  max-height: 90vh;
  backdrop-filter: blur(0.5rem);
}

.testimonial-modal::backdrop {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(0.25rem);
}

.modal-content {
  padding: 0;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 0.125rem solid var(--primary-color);
  background: rgba(220, 20, 60, 0.1);
}

.modal-title {
  font-family: var(--font-family-pixel);
  font-size: 1.2rem;
  color: var(--secondary-color);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-duration) ease;
}

.modal-close:hover {
  color: var(--secondary-color);
  transform: scale(1.2);
}

.modal-body {
  padding: 1.5rem;
  text-align: center;
}

.real-photo {
  max-width: 100%;
  max-height: 20rem;
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 0.125rem solid var(--primary-color);
  text-align: center;
  background: rgba(220, 20, 60, 0.1);
}

.btn {
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  padding: 0.75rem 2rem;
  border-radius: 0;
  border-width: 0.125rem;
  transition: all var(--transition-duration) ease;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--text-color);
}

.btn-primary:hover {
  background-color: transparent;
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-0.125rem);
  box-shadow: 0 0.25rem 0.5rem rgba(220, 20, 60, 0.3);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

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

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .testimonials-grid {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    align-items: center;
  }
  
  .testimonial-card {
    padding: 1.5rem;
    max-width: 100%;
    min-width: auto;
  }
  
  .testimonials-title {
    font-size: 2rem;
  }
  
  .testimonials-subtitle {
    font-size: 1rem;
  }
  
  .avatar-frame {
    width: 6rem;
    height: 6rem;
  }
  
  .testimonial-name {
    font-size: 1rem;
  }
  
  .testimonial-content-text {
    font-size: 0.75rem;
  }
  
  .testimonial-modal {
    max-width: 95vw;
  }
  
  .real-photo {
    max-height: 15rem;
  }
}

@media (max-width: 576px) {
  .testimonials-title {
    font-size: 1.8rem;
  }
  
  .testimonials-subtitle {
    font-size: 0.9rem;
  }
  
  .testimonial-card {
    padding: 1rem;
  }
  
  .avatar-frame {
    width: 5rem;
    height: 5rem;
  }
  
  .testimonial-name {
    font-size: 0.9rem;
  }
  
  .testimonial-role {
    font-size: 0.7rem;
  }
  
  .testimonial-content-text {
    font-size: 0.7rem;
  }
  
  .btn {
    font-size: 0.8rem;
    padding: 0.6rem 1.5rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .testimonial-card {
    animation: none;
  }
  
  .star-icon {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .testimonial-card {
    border-color: #ffffff;
    background: #000000;
  }
  
  .avatar-frame {
    border-color: #ffffff;
  }
  
  .testimonial-modal {
    border-color: #ffffff;
    background: #000000;
  }
}
</style>
