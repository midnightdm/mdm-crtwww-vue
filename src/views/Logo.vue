<template>
  <main>
    <header id="Hero">
      <nav class="hero-nav">

        
      </nav>

              <div class="logo">
          <h1>{{logoTitle}}<span :style="'background-image: url('+crushpixel+');'">river</span>traffic</h1>
          <img id="logo-img" :src="logo" title="The logo image shows a tow boat pushing 9 barges.">
        </div>
        
    </header>
    
 <h1>Hey!</h1>
  </main>  
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  mounted() {
      this.$store.commit('setIsLogo', true)
  },
  unmounted() {
      this.$store.commit('setIsLogo', false)
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
  name: 'Logo',
  methods: {
    leaveLogo(path) {
      this.$store.commit('setIsLogo', false)
      this.router.push(path)
    }
  }
}
</script>

<style scoped>


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