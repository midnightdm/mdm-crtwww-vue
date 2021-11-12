<template>
  <AlertsSubMenu></AlertsSubMenu>
</template>

<script>
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'
export default {
    beforeUpdate() {
      this.$store.commit('setSlate', 'ALERTS')
    },
  components: {
      AlertsSubMenu,
  }
}
</script>

<style>

</style>