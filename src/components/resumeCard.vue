<template>
  <div class="nes-container is-dark with-title m-4 p-3" id="resume-cont">
    <h1>Resume</h1>
    <div class="row g-4">
      <div class="col-lg-6 col-md-12">
        <div id="mush-cont" class="d-flex justify-content-center">
          <img
            id="mush-img"
            class="img-fluid responsive-img"
            src="https://i.postimg.cc/G28Tbjhf/tinywow-remove-bg-3559006.png"
            alt="Mushroom pixel art for resume section"
          />
        </div>
      </div>
      <div class="col-lg-6 col-md-12 p-3">
        <div class="row g-3">
          <div class="col-xl-6 col-lg-12 col-md-6">
            <div class="card">
              <i class="nes-icon is-large star"></i>
              <h3 class="text-muted fs-5 text-center">Info</h3>
              <p>
                <span class="text-muted">Profile:</span>Full-Stack Developer & Automation Specialist
              </p>
              <p>
                <span class="text-muted">Email:</span>ricardoronanm@gmail.com
              </p>
            </div>
          </div>

          <div class="col-xl-6 col-lg-12 col-md-6">
            <div class="card h-100">
              <i class="nes-icon trophy is-large"></i>
              <h3 class="text-muted fs-3 text-center">Matric</h3>
              <p class="fs-5 text-center">2017-2021</p>
              <p class="text-muted">Matriculated at AZ Berman Highschool.</p>
            </div>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-xl-6 col-lg-12 col-md-6">
            <div class="card h-100">
              <i class="nes-icon coin is-large"></i>
              <h3 class="text-muted fs-3 text-center">Life-Choices</h3>
              <p class="fs-5 text-center">Apr 2022 - Sep 2022</p>
              <p class="text-muted text-center">
                Web Development Bootcamp at Life Choices Academy.
              </p>
            </div>
          </div>
          <div class="col-xl-6 col-lg-12 col-md-6">
            <div class="card h-100 d-flex justify-content-center align-items-center">
              <img
                id="heart"
                class="img-fluid responsive-img"
                src="https://i.postimg.cc/N0H8xXB2/heart.png"
                alt="Heart pixel art for resume section"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
#heart {
  width: 15rem;
  height: 15rem;
  display: flex;
  align-content: center;
  justify-content: center;
  filter: drop-shadow(0.125rem 0.125rem 0.1875rem black);
}
#mush-img {
  padding-left: 1rem;
  filter: drop-shadow(0.25rem 0.25rem 0.375rem black);
}
#resume-cont {
  min-height: 80vh;
}
.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
