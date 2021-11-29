<template>
  <GallerySubMenu></GallerySubMenu>
  <main>
    <h1>Comments</h1>
    <!--
    <comment-grid
      baseURL="https://mdm-qcrt-demo-1-default-rtdb.firebaseio.com"
      apiKey="AIzaSyA6KlSt8IQBSm7TiDszs29bhKaVev-e1Tw"
      nodeName="crt">
    </comment-grid>
    -->
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