<template>
  <section id="About" class="about-section">
    <div class="container-fluid">
      <!-- About Header -->
      <div class="about-header text-center">
        <h1 class="about-title text-light mb-3">A little About Me</h1>
        <div class="header-divider"></div>
      </div>

      <!-- About Content -->
      <div class="about-content">
        <div class="row g-4">
          <!-- Character Image -->
          <div class="col-lg-5 col-md-12">
            <div class="character-container">
              <div class="character-frame">
                <img
                  src="https://i.postimg.cc/TPLJ7xX4/about-ricardo-removebg-preview.png"
                  alt="Ricardo Moses character illustration"
                  class="character-image responsive-img"
                />
              </div>
              <!-- Floating Stats -->
              <div class="floating-stats">
                <div class="stat-item">
                  <i class="fa-solid fa-code"></i>
                  <span>2+ Years</span>
                </div>
                <div class="stat-item">
                  <i class="fa-solid fa-project-diagram"></i>
                  <span>15+ Projects</span>
                </div>
                <div class="stat-item">
                  <i class="fa-solid fa-coffee"></i>
                  <span>∞ Coffee</span>
                </div>
              </div>
            </div>
          </div>

          <!-- About Text Content -->
          <div class="col-lg-7 col-md-12">
            <div class="about-text-container">
              <!-- Main Description -->
              <div class="about-description">
                <p class="about-text">
                  Creative <span class="highlight">Full-Stack Developer</span> with a passion for 
                  <span class="highlight">visual design</span>, <span class="highlight">illustration</span>, 
                  and bringing ideas to life through code and creativity.
                </p>
                <p class="about-text">
                  When I'm not coding, you'll find me sketching pixel art, creating digital illustrations, 
                  and exploring graphic design. I believe the best digital experiences come from the 
                  perfect blend of technical skill and artistic vision.
                </p>
                <p class="about-text">
                  With hands-on experience in <span class="highlight">fintech systems</span>, 
                  <span class="highlight">automation</span>, and scalable web applications, I bring 
                  both creative flair and technical precision to every project.
                </p>
                <p class="about-text">
                  Passionate about <span class="highlight">digital transformation</span>, 
                  <span class="highlight">user experience design</span>, and creating solutions that 
                  are both beautiful and functional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

         <!-- Skills Grid -->
         <div class="skills-preview">
  <h3 class="skills-title">Core Skills</h3>
  <div class="skills-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
    <div class="skill-item col">
      <i class="fa-brands fa-js skill-icon"></i>
      <span class="skill-name">JavaScript</span>
    </div>
    <div class="skill-item col">
      <i class="fa-brands fa-vuejs skill-icon"></i>
      <span class="skill-name">Vue.js</span>
    </div>
    <div class="skill-item col">
      <i class="fa-solid fa-palette skill-icon"></i>
      <span class="skill-name">Design</span>
    </div>
    <div class="skill-item col">
      <i class="fa-solid fa-draw-polygon skill-icon"></i>
      <span class="skill-name">Illustration</span>
    </div>
    <div class="skill-item col">
      <i class="fa-solid fa-cogs skill-icon"></i>
      <span class="skill-name">Automation</span>
    </div>
    <div class="skill-item col">
      <i class="fa-solid fa-credit-card skill-icon"></i>
      <span class="skill-name">Fintech</span>
    </div>
  </div>
</div>


   
      <!-- Fun Facts Section -->
      <div class="fun-facts-section">
        <h3 class="fun-facts-title">Fun Facts About Me</h3>
        <div class="fun-facts-grid">
          <div class="fun-fact-item">
            <i class="fa-solid fa-palette"></i>
            <div class="fact-content">
              <h4>Creative Designer</h4>
              <p>Love creating art, digital illustrations, and graphic designs</p>
            </div>
          </div>
          <div class="fun-fact-item">
            <i class="fa-solid fa-gamepad"></i>
            <div class="fact-content">
              <h4>Pixel Art Enthusiast</h4>
              <p>Passionate about retro-style designs and 8-bit aesthetics</p>
            </div>
          </div>
          <div class="fun-fact-item">
            <i class="fa-solid fa-robot"></i>
            <div class="fact-content">
              <h4>Automation Geek</h4>
              <p>Always looking for ways to automate repetitive tasks</p>
            </div>
          </div>
          <div class="fun-fact-item">
            <i class="fa-solid fa-lightbulb"></i>
            <div class="fact-content">
              <h4>Problem Solver</h4>
              <p>Enjoy tackling complex challenges with creative solutions</p>
            </div>
          </div>
        </div>
      </div>
      <div id="my-top-tracks">
                <h3 class="top-tracks-title">Check out my top tracks on Spotify</h3>
        <iframe
  title="Spotify Embed: Recommendation Playlist"
  src="https://open.spotify.com/embed/playlist/59KzNyk7n95pNxM9IHpBBB?utm_source=generator&theme=0"
  width="100%"
  height="360"
  style="min-height: 360px;"
  frameborder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
></iframe>
      </div>
    </div>
  </section>
</template>
<script>
export default {};
const playlistId = '59KzNyk7n95pNxM9IHpBBB';
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBpaK0n4Jy20K2V1IhSF9qsjtGQBJpLAnBRvfBuzWR1npw6DShaTnaqHER0aT98gQ08_TmirtqSGbYdo755vV3BSZVkxpLysTkaVb15wvR4oixKyQIHF6DJrNLPe2T5Xy6hRnMdf88jkhGmzH-PHlWUNw-F45tG2yjAORUTnk8C01dj2tCjxRm__R1EboiTrGvhCbGS-VvEbYR_i9yEe9Xh8gOdZQOIslG6MTTNW5-NoD3hMEE9AjHQEot1HMEgFnkvlyggxId-IiiLFEvlDHfQgX0f_LoTQdFylCKbNhRFAMjb2Mp8Yp5cW3OWz7s4';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);
</script>
<style scoped>
/* About Section */
.about-section {
  position: relative;
  overflow: hidden;
  padding: 4rem 0;
  animation: fadeIn var(--animation-duration-subtle) ease-in-out;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="50" cy="10" r="1" fill="%23ffffff" opacity="0.02"/><circle cx="10" cy="90" r="1" fill="%23ffffff" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

/* About Header */
.about-header {
  position: relative;
  z-index: 2;
  animation: slideInUp var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-small) both;
}

.about-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-family: var(--font-family-pixel);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  color: var(--secondary-color);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.header-divider {
  width: 6rem;
  height: 0.25rem;
  background: linear-gradient(90deg, var(--primary-color), #ff6b9d);
  margin: 2rem auto;
  position: relative;
}

.header-divider::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer var(--animation-duration-infinite) infinite;
}

/* About Content */
.about-content {
  position: relative;
  z-index: 2;
  padding: 2rem 1rem;
  animation: slideInUp var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-medium) both;
}

/* Character Container */
.character-container {
  position: relative;
  text-align: center;
  animation: slideInLeft var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-medium) both;
}

.character-frame {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.character-image {
  width: clamp(12rem, 25vw, 18rem);
  height: auto;
  filter: drop-shadow(0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5));
  transition: transform var(--transition-duration) ease;
}

.character-image:hover {
  transform: scale(1.05);
}

/* Floating Stats */
.floating-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  backdrop-filter: blur(0.5rem);
  transition: all var(--transition-duration) ease;
  min-width: 5rem;
}

.stat-item:hover {
  background: rgba(220, 20, 60, 0.2);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.3);
}

.stat-item i {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.stat-item span {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

/* About Text Container */
.about-text-container {
  animation: slideInRight var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-medium) both;
}

.about-description {
  margin-bottom: 2rem;
}

.about-text {
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  color: var(--text-color);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-align: left;
}

.highlight {
  color: var(--primary-color);
  font-weight: bold;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
}

/* Skills Preview */
.skills-preview {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid rgba(245, 245, 220, 0.2);
  border-radius: 0;
  backdrop-filter: blur(0.25rem);
}

.skills-title {
  font-family: var(--font-family-pixel);
  font-size: 1.2rem;
  color: var(--secondary-color);
  margin: 0 0 1.5rem 0;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  animation: slideInUp var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-large) both;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 0.0625rem solid var(--secondary-color);
  border-radius: 0;
  transition: all var(--transition-duration) ease;
  flex: 1 1 8rem;
  max-width: 10rem;
  min-width: 8rem;
  animation: shimmer var(--animation-duration-infinite) infinite;
}

.skill-item:hover {
  background: var(--secondary-color);
  color: var(--background-color);
  transform: translateY(-0.125rem);
}

.skill-icon {
  font-size: 2rem;
  color: var(--primary-color);
  transition: color var(--transition-duration) ease;
}

.skill-item:hover .skill-icon {
  color: var(--background-color);
}

.skill-name {
  font-family: var(--font-family-pixel);
  font-size: 0.5rem;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  transition: color var(--transition-duration) ease;
}

.skill-item:hover .skill-name {
  color: var(--background-color);
}

/* Call to Action */
.about-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  border-radius: 0;
  border-width: 0.125rem;
  transition: all var(--transition-duration) ease;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  text-decoration: none;
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
  text-decoration: none;
}

.btn-outline-light {
  background-color: transparent;
  border-color: var(--secondary-color);
  color: var(--secondary-color);
}

.btn-outline-light:hover {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: var(--background-color);
  transform: translateY(-0.125rem);
  box-shadow: 0 0.25rem 0.5rem rgba(245, 245, 220, 0.3);
    text-decoration: none;
}

/* Fun Facts Section */
.fun-facts-section {
  position: relative;
  z-index: 2;
  padding: 3rem 1rem 0;
  animation: slideInUp var(--animation-duration-subtle) var(--animation-ease) var(--animation-delay-medium) both;
}

.fun-facts-title ,.top-tracks-title{
  font-family: var(--font-family-pixel);
  font-size: 1.5rem;
  color: var(--secondary-color);
  text-align: center;
  margin: 0 0 2rem 0;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.fun-facts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.fun-fact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  backdrop-filter: blur(0.5rem);
  transition: all var(--transition-duration) ease;
  flex: 1 1 15rem;
  max-width: 25rem;
  min-width: 15rem;
}

.fun-fact-item:hover {
  background: rgba(220, 20, 60, 0.1);
  border-color: var(--secondary-color);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1rem rgba(220, 20, 60, 0.3);
}

.fun-fact-item i {
  color: var(--primary-color);
  font-size: 2rem;
  min-width: 3rem;
  text-align: center;
}

.fact-content h4 {
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  color: var(--secondary-color);
  margin: 0 0 0.5rem 0;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
}

.fact-content p {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--text-color);
  margin: 0;
  line-height: 1.4;
}
#my-top-tracks {
padding: 3rem 1rem 0;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1rem); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-content {
    padding: 1rem;
  }
  
  .about-title {
    font-size: 2rem;
  }
  
  .about-text {
    font-size: 0.8rem;
    text-align: center;
  }
  
  .skills-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .skill-item {
    padding: 0.75rem;
    max-width: 100%;
    min-width: auto;
    display: flex;
    justify-content: center;
  }
  
  .skill-icon {
    font-size: 1.5rem;
  }
  
  .skill-name {
    font-size: 0.6rem;
  }
  
  .about-cta {
    justify-content: center;
  }
  
  .cta-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.8rem;
  }
  
  .fun-facts-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .fun-fact-item {
    padding: 1rem;
    max-width: 100%;
    min-width: auto;
  }
  
  .fun-fact-item i {
    font-size: 1.5rem;
    min-width: 2rem;
  }
  
  .floating-stats {
    gap: 0.5rem;
  }
  
  .stat-item {
    padding: 0.75rem;
    min-width: 4rem;
  }
  
  .stat-item i {
    font-size: 1.2rem;
  }
  
  .stat-item span {
    font-size: 0.6rem;
  }
}

@media (max-width: 576px) {
  .about-title {
    font-size: 1.8rem;
  }
  
  .about-text {
    font-size: 0.7rem;
  }
  
  .skills-title {
    font-size: 1rem;
  }
  
  .fun-facts-title {
    font-size: 1.2rem;
  }
  
  .fact-content h4 {
    font-size: 0.8rem;
  }
  
  .fact-content p {
    font-size: 0.6rem;
  }
  
  .cta-btn {
    padding: 0.7rem 1.2rem;
    font-size: 0.7rem;
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
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .stat-item {
    border-color: #ffffff;
    background: #000000;
  }
  
  .skills-preview {
    border-color: #ffffff;
    background: #000000;
  }
  
  .skill-item {
    border-color: #ffffff;
    background: #000000;
  }
  
  .fun-fact-item {
    border-color: #ffffff;
    background: #000000;
  }
}

.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
