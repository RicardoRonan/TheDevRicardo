<template>
  <section id="experience" class="m-4 p-3">
    <div class="nes-container is-dark with-title">
      <h1 id="experience-title" class="text-light">Professional Experience</h1>
      
      <!-- Current Position -->
      <div class="experience-item mb-4">
        <div class="row g-3">
          <div class="col-lg-8 col-md-7">
            <h3 class="job-title">Automation Specialist</h3>
            <h4 class="company-name">B2b-ai, Cape Town</h4>
            <p class="job-duration">📅 May 2025 – Present</p>
          </div>
          <div class="col-lg-4 col-md-5 d-flex justify-content-center align-items-center">
            <i class="fa-solid fa-cogs experience-icon"></i>
          </div>
        </div>
        <ul class="job-responsibilities">
          <li>Develop and implement automation workflows to streamline internal processes and SEO-related tasks</li>
          <li>Integrate APIs with various tools and platforms to optimize efficiency</li>
          <li>Utilize n8n and other automation tools to automate data processing, reporting, and operational tasks</li>
          <li>Work with the SEO team to automate keyword research, reporting, and competitor analysis</li>
          <li>Maintain and optimize existing automations for reliability and scalability</li>
          <li>Identify opportunities to enhance productivity through automation and recommend improvements</li>
          <li>Troubleshoot and resolve automation-related issues</li>
          <li>Stay up to date with the latest automation technologies and best practices</li>
        </ul>
      </div>

      <div class="divider"></div>

      <!-- Previous Position -->
      <div class="experience-item mb-4">
        <div class="row g-3">
          <div class="col-lg-8 col-md-7">
            <h3 class="job-title">Software Developer</h3>
            <h4 class="company-name">Payment24, Cape Town</h4>
            <p class="job-duration">📅 Mar 2023 – May 2025</p>
          </div>
          <div class="col-lg-4 col-md-5 d-flex justify-content-center align-items-center">
            <i class="fa-solid fa-code experience-icon"></i>
          </div>
        </div>
        <ul class="job-responsibilities">
          <li>Designed and deployed web modules using <strong>C#</strong>, <strong>.NET</strong>, and <strong>MS SQL</strong> in high-availability systems</li>
          <li>Collaborated in Agile team environments to deliver secure <strong>fintech integration</strong> features</li>
          <li>Worked on redesign of a big project, contributing to improved system architecture and performance</li>
          <li>Developed secure payment processing solutions for financial technology applications</li>
        </ul>
      </div>

      <div class="divider"></div>

      <!-- Internship -->
      <div class="experience-item">
        <div class="row g-3">
          <div class="col-lg-8 col-md-7">
            <h3 class="job-title">SEO Intern</h3>
            <h4 class="company-name">Grizzly New Marketing, Cape Town</h4>
            <p class="job-duration">📅 Sep 2022 – Dec 2022</p>
          </div>
          <div class="col-lg-4 col-md-5 d-flex justify-content-center align-items-center">
            <i class="fa-solid fa-chart-line experience-icon"></i>
          </div>
        </div>
        <ul class="job-responsibilities">
          <li>Optimized on-page SEO for over <strong>10+ client websites</strong></li>
          <li>Conducted keyword audits and performance reports using Google Search Console & SEMrush</li>
          <li>Supported technical SEO implementation in CMS platforms</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Experience'
};
</script>

<style scoped>
#experience {
  background-color: var(--background-color);
  min-height: 100vh;
}

#experience-title {
  font-family: var(--font-family-pixel);
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--secondary-color);
}

.experience-item {
  background-color: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: transform var(--transition-duration) ease;
}

.experience-item:hover {
  transform: translateY(-0.25rem);
  box-shadow: var(--box-shadow-medium);
}

.job-title {
  font-family: var(--font-family-pixel);
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.company-name {
  font-family: var(--font-family-pixel);
  font-size: 1.2rem;
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
  font-style: italic;
}

.job-duration {
  color: var(--text-color);
  font-size: 1rem;
  margin-bottom: 1rem;
}

.experience-icon {
  font-size: 4rem;
  color: var(--primary-color);
  opacity: 0.7;
}

.job-responsibilities {
  list-style: none;
  padding-left: 0;
  color: var(--secondary-color);
}

.job-responsibilities li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.job-responsibilities li::before {
  content: "▶";
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-size: 0.8rem;
}

.job-responsibilities strong {
  color: var(--primary-color);
  font-weight: bold;
}

.divider {
  height: 0.125rem;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  margin: 2rem 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  #experience-title {
    font-size: 2rem;
  }
  
  .job-title {
    font-size: 1.2rem;
  }
  
  .company-name {
    font-size: 1rem;
  }
  
  .experience-item {
    padding: 1rem;
  }
  
  .experience-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  #experience-title {
    font-size: 1.5rem;
  }
  
  .job-title {
    font-size: 1rem;
  }
  
  .company-name {
    font-size: 0.9rem;
  }
  
  .job-responsibilities li {
    font-size: 0.9rem;
  }
}
</style>