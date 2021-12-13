<template>
  
  <main>
    <h1>Comments</h1>
    

  
  </main>
  
</template>

<script>
import GallerySubMenu from '@/components/GallerySubMenu.vue'

export default {
  created: function () {
    //this.$store.dispatch("fetchAllAlerts")
  },
  mounted() {
    this.$store.commit('setSlate', 'GALLERY')
    this.$store.commit('setGalleryLinkActive', true)
    this.$store.commit('setPageSelected', 'Comments')
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

</style>