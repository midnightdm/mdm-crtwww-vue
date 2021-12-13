<template>
  <main>
  <h1>Watch List</h1>
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
h1{
  transform: translateY(60px);
}
</style>