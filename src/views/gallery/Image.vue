<template>
  <main id="Image">
    <section>
      <h1>Image</h1>
    </section>
  </main>
  
</template>

<script>
export default {
  created: function () {
    //this.$store.dispatch("fetchAllAlerts")
  },
  mounted() {
    this.$store.commit('setSlate', 'GALLERY')
    this.$store.commit('setGalleryLinkActive', true)
    this.$store.commit('setPageSelected', 'Image')
  },
  unmounted() {
    this.$store.commit('setGalleryLinkActive', false)
  }
}
</script>

<style>
#Image section { 
  padding-top: 145px;

}

@media (max-width: 750px) {
  #Image section {
    padding-top: 40px;
    
  }
}
</style>