<template>
  <main>
    <div id="wrapper">

      <div id="logo-container">
        <h1>clinton<span>river</span>traffic</h1>

        <img id="logo-img" :src="logoImgUrl" title="The logo image shows a tow boat pushing 9 barges." >

        <ul id="menu" class="nav">
          <li><a @click="leaveHero('/about')" class="nav-link" :href="'/about'">ABOUT</a></li>
          <li><a @click="leaveHero('/alerts')" :href="'/alerts'" class="nav-link">ALERTS</a></li>
          <li><a @click="leaveHero('/gallery')" :href="'/gallery'" class="nav-link">GALLERY</a></li>
          <li><a class="nav-link" :href="urlLive">LIVE</a></li>
          <li><a @click="leaveHero('/logs')" :href="'/logs'"  class="nav-link" >LOGS</a></li>
        </ul>
      </div>
    </div>
   
    <video id="videoBG" autoplay muted loop>
      <source :src="bgVidUrl" type="video/mp4">
    </video>
    
    <h1 class="huge">
      <div>
        <ul>
          <li>Riverboat Viewing...</li>
          <li>...Begins With Tracking</li>
        </ul>
      </div>
     </h1>
  
 
  </main>  
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  mounted() {
      this.$store.commit('setIsHero', true)
  },
  unmounted() {
      this.$store.commit('setIsHero', false)
  },
  data: function() {
      return {
        logoImgUrl: process.env.VUE_APP_IMG_URL+'/images/logo-towboat2.png',
        bgVidUrl: process.env.VUE_APP_IMG_URL+'/images/crt-background-vid.mp4',
        urlLive: process.env.VUE_APP_BASE_URL+'/livescan/live',
        router: useRouter()
    } 
  },
  name: 'Hero',
  methods: {
    leaveHero(path) {
      this.$store.commit('setIsHero', false)
      this.router.push(path)
    }
  }
}
</script>

<style>
 /* Animate huge Intro*/
.huge {
    font-family: 'Rubik', sans-serif;
    font-size: 6rem;
    position: absolute;
    top: 5%;
    left: 1%;
    border: 0px solid #000000;
    text-align: center;
    z-index: 7;
}

.huge h1 { 
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
}

.huge div {
  margin: 0;
  position: relative;
  height: 18vh;
  width: 100vw;
  overflow: hidden;
}

.huge div ul {
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: #FFFF00;
  animation: intro 10s linear forwards;
}

.huge  li {
  list-style: none;
  height: 125px;
}
@keyframes intro {
  0% {transform: translateY(12vh);  opacity: 1; background-color: #FFFF00; }
  5%  {transform: translateY(12vh); opacity: 1; background-color: #FFFF00;}
  10% {transform: translateY(0px);  opacity: 1; background-color: #FFFF00;}
  50% {transform: translateY(0px); opacity: 1; background-color: #FFFF00; }
  55% {transform: translateY(-12vh); opacity: 1; background-color: #FFFF00;}
  95% {transform: translateY(-12vh);opacity: 1; background-color: #FFFF00; }
  100% { transform: translateY(-24vh); opacity: 0; background-color: transparent;}
} 



</style>