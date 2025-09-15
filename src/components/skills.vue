<template>
  <section id="skills" class="m-4 p-3">
    <h2 id="skills-heading" class="text-light">Skills</h2>
    <div class="container-fluid p-3 m-3" id="skills-cont">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-brands fa-html5" id="html5"></i>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-brands fa-js" id="javascript"></i>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-brands fa-css3-alt" id="css3"></i>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-brands fa-vuejs" id="vue3"></i>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-solid fa-database" id="sql"></i>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-brands fa-bootstrap" id="bootstrap"></i>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-brands fa-github" id="github"></i>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-brands fa-node" id="node"></i>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-brands fa-microsoft" id="csharp"></i>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-solid fa-cogs" id="automation"></i>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-solid fa-credit-card" id="fintech"></i>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card" id="skill-card">
            <i class="fa-solid fa-chart-line" id="seo"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  mounted() {
    const root = document.getElementById('skills')
    if (root) { 
      void root.offsetWidth
      root.classList.add('entered') 
    }
  }
};
</script>
<style>
#html5 {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#node {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: transparent !important;
  background-clip: border-box;
  border: none;
  border-radius: 0;
  transition: all var(--transition-duration) var(--transition-ease);
}

.card:hover {
  transform: translateY(-0.25rem) scale(1.02);
  box-shadow: var(--box-shadow-medium);
}
#vue3 {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#sql {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#bootstrap {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#github {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#css3 {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#javascript {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#skill-card {
  height: 15rem;
  background-position: center;
  background-size: cover;
  background-image: url(https://i.postimg.cc/cLBKJhVk/tinywow-remove-bg-3566840.png);
}
#skills-cont {
  background-image: url(https://i.postimg.cc/5N5yPj7h/background-brick.png);
  height: fit-content;
  width: auto;
  background-attachment: fixed;
  background-position: center;
  background-repeat: none;
  background-size: cover;
}
#csharp {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#automation {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#fintech {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#seo {
  padding: 5rem;
  color: var(--text-color);
  font-size: 4rem;
}
#skills-heading {
  font-family: var(--font-family-pixel);
  opacity: 0;
  transform: translateY(-1rem);
  transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease);
}

#skill-card {
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity var(--transition-duration) var(--transition-ease), transform var(--transition-duration) var(--transition-ease);
}

/* Enter reveal */
#skills.entered #skills-heading,
#skills.entered #skill-card {
  opacity: 1;
  transform: translateY(0);
}

#skill-card:nth-child(1) { transition-delay: 0.1s; }
#skill-card:nth-child(2) { transition-delay: 0.15s; }
#skill-card:nth-child(3) { transition-delay: 0.2s; }
#skill-card:nth-child(4) { transition-delay: 0.25s; }
#skill-card:nth-child(5) { transition-delay: 0.3s; }
#skill-card:nth-child(6) { transition-delay: 0.35s; }
#skill-card:nth-child(7) { transition-delay: 0.4s; }
#skill-card:nth-child(8) { transition-delay: 0.45s; }
#skill-card:nth-child(9) { transition-delay: 0.5s; }
#skill-card:nth-child(10) { transition-delay: 0.55s; }
#skill-card:nth-child(11) { transition-delay: 0.6s; }
#skill-card:nth-child(12) { transition-delay: 0.65s; }

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .card:hover {
    transform: none;
  }
}
</style>
