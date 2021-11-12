<template>
  <main class="text-center">
      <h1>404</h1>
      <h2>Page Not Found</h2>
  </main>
</template>

<script>


export default {
  beforeUpdate() {
    this.$store.commit('setSlate', 'ERROR')
  },
  onActivated() {
    this.$store.commit('setSlate', 'ALERTS')
  },
  onErrorCaptured() {
    this.$store.commit('setSlate', 'ALERTS')
  }
}
</script>

<style>
main {
  position: relative;
  top: 70px;
}
</style>