<template>
  <AlertsSubMenu></AlertsSubMenu>
</template>

<script>
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'
export default {
  mounted() {
    this.$store.commit('setSlate', 'ALERTS')
    this.$store.commit('setPageSelected', 'AlertsWatch')
    this.$store.commit('setPageSelected', 'AlertsWatch')
  },   
  components: {
      AlertsSubMenu,
  }
}
</script>

<style>

</style>