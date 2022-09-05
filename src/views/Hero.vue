<template>
  <main>
    <header id="Hero">
      <nav class="hero-nav">
        <div class="logo">
          <h1>{{logoTitle}}<span :style="'background-image: url('+crushpixel+');'">river</span>traffic</h1>
          <img id="logo-img" :src="logo" title="The logo image shows a tow boat pushing 9 barges.">
        </div>
        <ul class="navigation">
          <li><a @click="leaveHero('/about')" class="nav-link" :href="'/about'">ABOUT</a></li>
          <li><a @click="leaveHero('/alerts')" :href="'/alerts'" class="nav-link">ALERTS</a></li>
          <li><a @click="leaveHero('/comments')" :href="'/comments'" class="nav-link">COMMENTS</a></li>
          <li><a @click="leaveHero('/gallery')" :href="'/gallery'" class="nav-link">GALLERY</a></li>
          <li><a @click="leaveHero('/live')" :href="'/live'" class="nav-link">LIVE</a></li>
          <li><a @click="leaveHero('/logs')" :href="'/logs'"  class="nav-link">LOGS</a></li>
        </ul>
      </nav>
    </header>
   
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
        // urlLive: process.env.VUE_APP_BASE_URL+'/livescan/live',
        router: useRouter(),
        logo: process.env.VUE_APP_IMG_URL+'/images/logo-towboat2.png',
        logoTitle: process.env.VUE_APP_LOGO_TITLE,
        crushpixel: process.env.VUE_APP_IMG_URL+'/images/crushpixel-1625816-ID1625816-640x427.jpg',
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

<style scoped>
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
  height: 115px;
  width: 1500px;
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
  0% {transform: translateY(145px);  opacity: 1; background-color: #FFFF00; }
  5%  {transform: translateY(145px); opacity: 1; background-color: #FFFF00;}
  10% {transform: translateY(0px);  opacity: 1; background-color: #FFFF00;}
  50% {transform: translateY(0px); opacity: 1; background-color: #FFFF00; }
  55% {transform: translateY(-135px); opacity: 1; background-color: #FFFF00;}
  95% {transform: translateY(-135px);opacity: 1; background-color: #FFFF00; }
  100% { transform: translateY(-290px); opacity: 0; background-color: transparent;}
} 

/* Position the Logo */
header {
  position: fixed;
  top: 50vh;
  left: 25%;
  margin-right: auto;
  z-index: 97;
  width: 50%;
  transition: 0.5x ease all;
  color: #fff;
  background-color: transparent;
  height: 6rem;
}

nav.hero-nav {
  position: relative;
  top: 4.5rem;
  padding: 12px 0;
  transition: 0.5 ease all;
  width: 45rem;
  height: 3rem;
  margin: 0 auto; 
}

div.logo {  
  position: fixed;
  top: 47vh;
  height: 100px;
  bottom: 250px;
  background-color: transparent;
}

#logo-img {   
  position: absolute;
  left: 0px;
  z-index: 2;
  width: 200px;
  height: 95px;
  top: 10px;
}

.logo h1 {     
  position: relative;
  top: 25px;
  right: 0px;
  left: 50px;
  color: #000;
  font-size: 3rem;
  font-family: 'Merriweather Sans', sans-serif;
  /* text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.50); */
  background-color: rgba(240, 240, 240, 0.137);
  z-index: 100;
  
}

.logo h1 span {
  color: blue;
  -webkit-background-clip: text;  
  background-clip: text;
 -webkit-text-fill-color: transparent;
}

/* Style the menu bar */
.navigation {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: 0.5x ease all; 
}

ul {
  list-style: none;
  padding: .5rem;
  background-color: rgba(49, 54, 62, 0.4);  
}

li {
  padding: .5rem;
  
}

.navigation li {
  text-align: center; 
  line-height: 1.3; 
}

li a, li router-link {
  padding: 0 .5rem .5rem .5rem;
}

#hero > .nav-link, 
#hero > .nav-link:visited {
    font-weight: 500;
    list-style: none;
    color: #fff;
    text-decoration: none;
    border-radius: 8px;
}

.navigation .nav-link:hover {
  color: #00afea;
  border-color: #00afea;
  
}

.navigation li:hover {
  background-color: rgba(49, 54, 62, 0.4);
}

.navigation .nav-link {
    font-size: 1.2em;
    padding-bottom: 4px;
    text-transform: uppercase;
}

@media (max-width: 980px) {
  /* Change logo size & position*/
  header {
    left: 15%;
  }
  div.logo {
    top: 53vh;
  }
  #logo-img {
    top: 1px;
    width: 130px;
    height: 62px;
  }
  .logo h1 {
    font-size: 1.6rem;
    left: 30px;
    top: 10px;
  }
  /* Change menu  */
  nav.hero-nav{
    width: 15rem;
  }
  .navigation {
    background-color: rgba(49, 54, 62, 0.4);
    flex-direction: column;
  }

  /* Change Intro Size */
  .huge {    
      font-size: 2rem;
  }
  .huge h1 { 
    max-width: 100vw;
  }
  .huge div {
    height: 80px;
    width: 100vw;
  }
  #videoBG {   
    position: absolute;
    top: -0px;
    left: -350px;
    height: 100vh;
    width: auto;
    overflow: hidden;
    /*
    transform:translateX(-15%);
    z-index: -2;
    background-color: white; */
  }

}
</style>