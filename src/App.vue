<template>
  <w-app>
    <div class="topDiv" v-if="this.$store.state.a.isHero">
      <Hero></Hero>
    </div>
    <div class="topDiv" v-else> 
      <Navigation></Navigation>
      <router-view/>
    </div>
  </w-app>
</template>
<script>

export default {
  computed: {
    isHero() {
      return this.$store.state.a.isHero
    },
    isTest() {
      return this.$store.state.a.isTest
    }
  }  
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  line-height: normal;
  background-color: white;
}

:root {
  --menu-pad-mobile: 110px;
  --menu-pad-wide-a: 250px;
  --menu-pad-wide-b: 175px;
}

</style>
