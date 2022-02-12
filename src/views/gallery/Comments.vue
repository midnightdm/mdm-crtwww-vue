<template>
  <main id="Comments">
    <section>
      <h1>Comments</h1>
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
    this.$store.commit('setPageSelected', 'Comments')
  },
  unmounted() {
    this.$store.commit('setGalleryLinkActive', false)
  }
}
</script>

<style>
#Comments section { 
  padding-top: var(--menu-pad-wide-a);

}

@media (max-width: 750px) {
  #Comments section {
    padding-top: var(--menu-pad-mobile);
    
  }
}
</style>