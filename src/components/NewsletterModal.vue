<template>
  <div v-if="showModal" class="newsletter-modal-overlay" @click.self="closeModal">
    <div class="newsletter-modal">
      <button class="modal-close" @click="closeModal" aria-label="Close newsletter modal">×</button>
      <div class="modal-avatar">
        <img src="https://i.postimg.cc/MH421x0m/pixel-ricardo.png" alt="Ricardo Moses avatar" />
      </div>
      <div class="modal-content">
        <div class="modal-eyebrow">★ HEY, I'M RICARDO ★</div>
        <h2 class="modal-title">Weekly Essentials<br>for Creative Minds</h2>
        <p class="modal-desc">
          I share actionable insights on digital design, automation, and developer vitality—<br>
          so you can create, think, and perform at your best.
        </p>
        <form class="newsletter-form" @submit.prevent="submitForm">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="newsletter-input"
            aria-label="Your email address"
          />
          <button type="submit" class="newsletter-submit">Subscribe</button>
        </form>
        <div class="modal-footer">
          <span class="modal-note">One inbox at a time.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsletterModal',
  data() {
    return {
      showModal: false,
      email: '',
    };
  },
  mounted() {
    // Show only once per session
    if (!sessionStorage.getItem('newsletterModalShown')) {
      setTimeout(() => {
        this.showModal = true;
        sessionStorage.setItem('newsletterModalShown', 'true');
      }, 1200); // 1.2s delay for better UX
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    submitForm() {
      // Newsletter subscription functionality will be implemented here
      alert('Thank you for subscribing!');
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.newsletter-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn var(--animation-duration-subtle);
}

.newsletter-modal {
  position: relative;
  background: #fff;
  border-radius: 1rem;
  max-width: 420px;
  width: 95vw;
  padding: 2.5rem 2rem 2rem 2rem;
  box-shadow: 0 2rem 4rem rgba(0,0,0,0.25);
  text-align: center;
  animation: popIn var(--animation-duration-subtle) cubic-bezier(.5,1.8,.5,1) both;
}

.modal-close {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #222;
  cursor: pointer;
  transition: color var(--animation-duration-subtle);
  z-index: 10;
}
.modal-close:hover {
  color: #dc143c;
}

.modal-avatar {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0.25rem solid #dc143c;
}
.modal-avatar img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
}

.modal-content {
  margin-top: 2.5rem;
  animation: popIn var(--animation-duration-subtle) cubic-bezier(.5,1.8,.5,1) both;
}
.modal-eyebrow {
  font-size: 0.9rem;
  color: #dc143c;
  font-family: var(--font-family-pixel, 'Press Start 2P', monospace);
  margin-bottom: 0.7rem;
  letter-spacing: 0.03em;
}
.modal-title {
  font-size: 2rem;
  font-family: var(--font-family-pixel, 'Press Start 2P', monospace);
  margin-bottom: 1rem;
  color: #222;
  line-height: 1.2;
}
.modal-desc {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}
.newsletter-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  justify-content: center;
}
.newsletter-input {
  flex: 1 1 0;
  padding: 0.75rem 1rem;
  border: 1.5px solid #ccc;
  border-radius: 0.4rem;
  font-size: 1rem;
  outline: none;
  transition: border var(--animation-duration-subtle);
}
.newsletter-input:focus {
  border-color: #dc143c;
}
.newsletter-submit {
  background: #222;
  color: #fff;
  border: none;
  border-radius: 0.4rem;
  padding: 0 1.3rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background var(--animation-duration-subtle);
}
.newsletter-submit:hover {
  background: #dc143c;
}
.modal-footer {
  margin-top: 0.5rem;
  color: #888;
  font-size: 0.95rem;
}
.modal-note {
  font-style: italic;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@media (max-width: 480px) {
  .newsletter-modal {
    padding: 1.2rem 0.5rem 1.5rem 0.5rem;
  }
  .modal-title {
    font-size: 1.2rem;
  }
  .modal-desc {
    font-size: 0.95rem;
  }
  .modal-avatar {
    width: 4.2rem;
    height: 4.2rem;
  }
  .modal-avatar img {
    width: 3.7rem;
    height: 3.7rem;
  }
}
</style> 