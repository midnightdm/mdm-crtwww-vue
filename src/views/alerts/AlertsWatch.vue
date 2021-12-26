<template>
  <main id="AlertsWatch">
    <section>
      <h1>Watch List</h1>
    </section>
  
  </main>
</template>

<script>
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'
export default {
  mounted() {
    this.$store.commit('setSlate', 'ALERTS')
    this.$store.commit('setAlertsLinkActive', true)
    this.$store.commit('setPageSelected', 'AlertsWatch')
  },   
  components: {
      AlertsSubMenu,
  }
}
</script>

<style>
#AlertsWatch section {
  padding-top: 130px;
}

@media (max-width: 750px) {
  #AlertsWatch section {
    padding-top: 80px;
  }
}

section {
  margin: 1rem;
}
</style>