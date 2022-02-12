<template>
  <main id="Msg404">
      <h1>404</h1>
      <h2>Page Not Found</h2>
  </main>
</template>

<script>


export default {
  beforeUpdate() {
    this.$store.commit('setSlate', 'ERROR')
  },
  mounted() {
    this.$store.commit('setSlate', 'ERROR')
  },
  onErrorCaptured() {
    this.$store.commit('setSlate', 'ERROR')
  }
}
</script>

<style>
#Msg404 {
  padding-top: 200px;
  
}

#Msg404 h1 {
  font-size:50pt;
}

#Msg404 h2 {
  font-size:40pt;
}

@media (max-width: 750px) {
  #Msg404{
    padding-top: 140px;
    
  }
}
</style>