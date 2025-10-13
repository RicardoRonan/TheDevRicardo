<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="hero-title">Get In Touch</h1>
            <p class="hero-subtitle">
              Let's collaborate and bring your ideas to life
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="container-fluid">
        <div class="row g-4 align-items-center">
          <!-- Contact Form -->
          <div class="col-lg-6 col-md-12">
            <div class="retro-card contact-form-container">
              <form action="https://formspree.io/f/mnqwedov" method="POST" class="contact-form">
                <div class="form-header">
                  <h3 class="form-title">Send Message</h3>
                  <div class="form-subtitle">Fill out the form below and I'll get back to you soon!</div>
                </div>

                <div class="form-body">
                  <div class="form-row">
                    <div class="form-group">
                      <label for="firstname_field" class="form-label">First Name</label>
                      <input
                        type="text"
                        id="firstname_field"
                        class="retro-input form-input"
                        placeholder="Enter your first name"
                        required
                        name="Firstname"
                      />
                    </div>
                    <div class="form-group">
                      <label for="surname_field" class="form-label">Last Name</label>
                      <input
                        type="text"
                        id="surname_field"
                        class="retro-input form-input"
                        placeholder="Enter your last name"
                        required
                        name="Surname"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="email_field" class="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email_field"
                      class="retro-input form-input"
                      placeholder="Enter your email address"
                      required
                      name="Email"
                    />
                  </div>

                  <div class="form-group">
                    <label for="textarea_field" class="form-label">Message</label>
                    <textarea
                      id="textarea_field"
                      class="retro-textarea form-textarea"
                      placeholder="Tell me about your project or just say hello!"
                      required
                      name="Message"
                      rows="5"
                    ></textarea>
                  </div>

                  <div class="form-submit">
                    <button type="submit" class="retro-btn btn-submit">
                      <i class="fa-solid fa-paper-plane"></i>
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Character Section -->
          <div class="col-lg-6 col-md-12">
            <div class="character-section">
              <div class="character-container">
                <img
                  src="https://i.postimg.cc/FRBkcq7p/princess-peach-removebg-preview.png"
                  alt="Contact Character"
                  class="character-image"
                />
                <div class="speech-bubble">
                  <div class="bubble-content">
                    <p class="bubble-text">Ready to work together?</p>
                  </div>
                  <div class="bubble-tail"></div>
                </div>
              </div>
              
              <!-- Contact Info -->
              <div class="contact-info">
                <div class="info-item">
                  <i class="fa-solid fa-envelope"></i>
                  <span>Available for freelance work</span>
                </div>
                <div class="info-item">
                  <i class="fa-solid fa-clock"></i>
                  <span>Usually responds within 24 hours</span>
                </div>
                <div class="info-item">
                  <i class="fa-solid fa-handshake"></i>
                  <span>Open to collaboration</span>
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
export default {};
</script>
<style scoped>
/* Contact Page */
.contact-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  position: relative;
  overflow: hidden;
}


/* Hero Section */
.hero-section {
  padding: 4rem 0 2rem 0;
  border-bottom: 0.125rem solid var(--primary-color);
  position: relative;
  z-index: 2;
}

.hero-title {
  font-family: var(--font-family-pixel);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  color: var(--primary-color);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
  animation: slideInDown var(--animation-duration-subtle) ease-out;
}

.hero-subtitle {
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: var(--secondary-color);
  max-width: 600px;
  margin: 0 auto;
  animation: slideInUp var(--animation-duration-subtle) ease-out var(--animation-delay-small) both;
}

/* Contact Content */
.contact-content {
  padding: 3rem 0;
  position: relative;
  z-index: 2;
}

/* Contact Form Container */
.contact-form-container {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 2rem;
  backdrop-filter: blur(0.5rem);
  position: relative;
  overflow: hidden;
  animation: slideInRight var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-small) both;
}


/* Form Header */
.form-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.form-title {
  font-family: var(--font-family-pixel);
  font-size: 1.1rem;
  color: var(--secondary-color);
  margin: 0 0 0.5rem 0;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
}

.form-subtitle {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--text-color);
  opacity: 0.8;
}

/* Form Body */
.form-body {
  position: relative;
  z-index: 2;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  flex: 1 1 calc(50% - 0.5rem);
  min-width: 15rem;
}

.form-label {
  display: block;
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.3);
  border: 0.125rem solid rgba(245, 245, 220, 0.3);
  border-radius: 0;
  color: var(--text-color);
  transition: all var(--transition-duration) ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.125rem rgba(220, 20, 60, 0.3);
  background: rgba(0, 0, 0, 0.5);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-family-pixel);
  font-size: 0.6rem;
}

.form-textarea {
  resize: vertical;
  min-height: 8rem;
}

/* Form Submit */
.form-submit {
  text-align: center;
  margin-top: 2rem;
}

.btn-submit {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  background-color: var(--primary-color);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.btn-submit:hover {
  background-color: transparent;
  color: var(--primary-color);
  transform: translateY(-0.125rem);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.3);
}

.btn-submit i {
  font-size: 0.7rem;
}

/* Character Section */
.character-section {
  text-align: center;
  animation: slideInRight 0.5s var(--animation-ease) 0.32s both;
}

.character-container {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.character-image {
  width: 12rem;
  height: 12rem;
  object-fit: contain;
  filter: drop-shadow(0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5));
  animation: floating var(--animation-duration-floating) ease-in-out infinite;
}

/* Speech Bubble */
.speech-bubble {
  position: absolute;
  top: -4rem;
  right: -2rem;
  background: var(--secondary-color);
  color: var(--background-color);
  padding: 0.75rem 1rem;
  border-radius: 0;
  border: 0.125rem solid var(--primary-color);
  min-width: 8rem;
  animation: pulse var(--animation-duration-infinite) infinite;
}

.bubble-content {
  position: relative;
}

.bubble-text {
  font-family: var(--font-family-pixel);
  font-size: 0.6rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.bubble-tail {
  position: absolute;
  bottom: -0.5rem;
  left: 2rem;
  width: 0;
  height: 0;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-top: 0.5rem solid var(--secondary-color);
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 20rem;
  margin: 0 auto;
  animation: slideInRight var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-small) both;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.0625rem solid rgba(245, 245, 220, 0.2);
  border-radius: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  animation: slideInRight var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-small) both;
}

.info-item:hover {
  background: rgba(220, 20, 60, 0.1);
  border-color: var(--primary-color);
  transform: translateX(0.5rem);
}

.info-item i {
  color: var(--primary-color);
  font-size: 1.2rem;
  min-width: 1.5rem;
}

.info-item span {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--text-color);
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

@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1rem); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-content {
    padding: 1rem;
  }
  
  .contact-form-container {
    padding: 1.5rem;
  }
  
  .contact-title {
    font-size: 2rem;
  }
  
  .contact-subtitle {
    font-size: 1rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-group {
    flex: 1 1 100%;
    min-width: auto;
  }
  
  .form-title {
    font-size: 1.2rem;
  }
  
  .character-section {
    margin-top: 2rem;
  }
  
  .character-image {
    width: 10rem;
    height: 10rem;
  }
  
  .speech-bubble {
    top: -3rem;
    right: -1.5rem;
    min-width: 7rem;
    padding: 0.6rem 0.8rem;
  }
  
  .bubble-text {
    font-size: 0.65rem;
  }
  
  .bubble-tail {
    left: 1.5rem;
  }
  
  .contact-info {
    max-width: 100%;
    margin-top: 1rem;
  }
  
  .info-item {
    padding: 0.75rem;
  }
  
  .info-item span {
    font-size: 0.7rem;
  }
}

@media (max-width: 576px) {
  .contact-title {
    font-size: 1.8rem;
  }
  
  .contact-subtitle {
    font-size: 0.9rem;
  }
  
  .contact-form-container {
    padding: 1rem;
  }
  
  .form-title {
    font-size: 1rem;
  }
  
  .form-subtitle {
    font-size: 0.7rem;
  }
  
  .form-input,
  .form-textarea {
    padding: 0.6rem;
    font-size: 0.7rem;
  }
  
  .btn-submit {
    padding: 0.8rem 1.5rem;
    font-size: 0.8rem;
  }
  
  .character-section {
    margin-top: 5.5rem;
  }
  
  .character-image {
    width: 8rem;
    height: 8rem;
  }
  
  .speech-bubble {
    top: -5.5rem;
    right: -1rem;
    min-width: 6rem;
    padding: 0.5rem 0.7rem;
  }
  
  .bubble-text {
    font-size: 0.6rem;
  }
  
  .bubble-tail {
    left: 1.2rem;
  }
  
  .contact-info {
    margin-top: 0.5rem;
  }
}

@media (max-width: 400px) {
  .character-image {
    width: 7rem;
    height: 7rem;
  }
  
  .speech-bubble {
    top: -2rem;
    right: -0.8rem;
    min-width: 5.5rem;
    padding: 0.4rem 0.6rem;
  }
  
  .bubble-text {
    font-size: 0.55rem;
  }
  
  .bubble-tail {
    left: 1rem;
  }
  
  .contact-info {
    gap: 0.8rem;
  }
  
  .info-item {
    padding: 0.6rem;
  }
  
  .info-item span {
    font-size: 0.65rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .character-image {
    animation: none;
  }
  
  .speech-bubble {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .contact-form-container {
    border-color: #ffffff;
    background: #000000;
  }
  
  .form-input,
  .form-textarea {
    border-color: #ffffff;
    background: #000000;
  }
  
  .speech-bubble {
    background: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }
  
  .info-item {
    border-color: #ffffff;
    background: #000000;
  }
}
</style>
