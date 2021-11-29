<template>
  <GallerySubMenu></GallerySubMenu>
  <h1>Image</h1>
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