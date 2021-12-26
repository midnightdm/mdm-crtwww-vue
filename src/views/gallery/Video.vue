<template> 
  <main id="Video">
    <section>
      <div class="col1">
        <h2>Video Gallery</h2>
        <p>Watch this spot as our video collection of vessels passing through Clinton grows. Use the CRT notification service to receive alerts when vessels are nearing to view them IRL.</p> 
      </div>
      <div class="col2">
        <ul class="video-wrapper">
          <li class="video-list"  v-for="video in this.$store.state.a.galleryVideo" :key="video.id">
            <h1>{{video.vessel}}</h1>
            <div v-if="video.videoType=='mp4'">
              <video v-if="video.poster" controls="controls" width="400" 
                :poster="video.posterUrl">
                <source :src="video.videoUrl" type="video/mp4">
                Your browser does not support the HTML5 Video element.
              </video>
              <video v-else controls="controls" width="400">
                <source :src="video.videoUrl" type="video/mp4">
                Your browser does not support the HTML5 Video element.
              </video>
            </div>
            <div v-if="video.videoType=='stream'">
              <iframe width="400" height="225" :src="video.videoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
            </div>    
            <p><span class="pillLabel">{{video.label}}</span></p>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
import GallerySubMenu from '@/components/GallerySubMenu.vue'

export default {
  created: function () {
    this.$store.dispatch("fetchGalleryVideo")
  },
  mounted() {
    this.$store.commit('setSlate', 'GALLERY')
    this.$store.commit('setGalleryLinkActive', true)
    this.$store.commit('setPageSelected', 'Video')
  },
  unmounted() {
    this.$store.commit('setGalleryLinkActive', false)
  },
  components: {
    GallerySubMenu
  }
}
</script>

<style>

#Video section { 
  padding-top: 130px;
  display: grid;
  grid-template-columns: 20rem 3fr;
}

@media (max-width: 700px) {
  #Video section {
    padding-top: 70px;
    display: block;
  }
}

ul.video-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit,27rem)
}

li.video-list {
  list-style: none;
}
.pillLabel {
    background-color: #ddd;
    border: none;
    color: black;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    border-radius: 16px;
  }

.col1 {
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  background-color: rgb(104, 10, 10);
}
.col1 h2 {
  
  color: #94c094;
}
.col1 p {
  color: rgb(160, 250, 16);
}
</style>