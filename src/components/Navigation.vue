<template>
  <header>
    <nav>
      <div class="logo">
        <h1>clinton<span :style="'background-image: url('+crushpixel+');'">river</span>traffic</h1>
        <img id="logo-img" :src="logo" title="The logo image shows a tow boat pushing 9 barges.">
      </div>

      <div class="icon">  
          <font-awesome-icon icon="bars" @click="toggleMobileNav" v-show="mobile" class="fa-solid fa-bars" :class="{'icon-active': mobileNav}" />
      </div>

      <ul v-show="!mobile" class="navigation">
        <li><a @click="goRoute('/about')" class="nav-link" :href="'/about'" :class="{selected: this.$store.state.a.pageSelected=='About'}">ABOUT</a></li>
        <li><a id="alerts-link" @click="goRoute('/alerts')" :href="'/alerts'" class="nav-link" :class="{ 'selected': alertsLinkActive }" exact>ALERTS</a></li>
        <li><a @click="goRoute('/gallery')" :href="'/gallery'" class="nav-link" :class="{'selected': galleryLinkActive}" >GALLERY</a></li>
        <li><a @click="goRoute('/live/mobile')" class="nav-link" :class="{selected: this.$store.state.a.pageSelected=='LiveMobile'}" :href="'/live/mobile'" >LIVE</a></li>
        <li><a @click="goRoute('/logs')" :href="'/logs'" class="nav-link" :class="{ 'selected': logsLinkActive}">LOGS</a></li>
      </ul>

      <AlertsSubMenu v-show="alertsLinkActive && !mobile"></AlertsSubMenu>
      <GallerySubMenu v-show="galleryLinkActive && !mobile"></GallerySubMenu>
      <LogsSubMenu v-show="logsLinkActive && !mobile"></LogsSubMenu>
      
      <div id="title_slate">{{ slate }}</div>
      
      <transition name="mobile-navi">
        <div v-show="mobileNav" class="mobile-side-menu">  
          <ul class="dropdown-nav">
            <li><a @click="goRoute('/about')" class="nav-link" :class="{selected: this.$store.state.a.pageSelected=='About'}" :href="'/about'" >ABOUT</a></li>
            <li>
              <a id="alerts-link" @click="goRoute('/alerts')" :href="'/alerts'" class="nav-link" :class="{ 'selected': alertsLinkActive }" exact>ALERTS</a>
              <AlertsSubMenu v-show="alertsLinkActive && mobileNav" :class="{'navigation2': mobileNav}"></AlertsSubMenu>
            </li>
            <li>
              <a @click="goRoute('/gallery')" :href="'/gallery'" class="nav-link" :class="{'selected': galleryLinkActive}" >GALLERY</a>
              <GallerySubMenu v-show="galleryLinkActive && mobileNav" :class="{'navigation2': mobileNav}"></GallerySubMenu>
            </li>
            <li><a @click="goRoute('/live/mobile')" class="nav-link" :class="{selected: this.$store.state.a.pageSelected=='LiveMobile'}" :href="'/live/mobile'" >LIVE</a>
            </li>
            <li>
              <a @click="goRoute('/logs')" :href="'/logs'" class="nav-link" :class="{ 'selected': logsLinkActive}">LOGS</a>
              <LogsSubMenu v-show="logsLinkActive  && mobileNav" :class="{'navigation2': mobileNav}"></LogsSubMenu>
            </li>
          </ul> 
        </div>
      </transition>

    </nav>
  </header>    
</template>

<script>

import { useRouter } from 'vue-router'

export default {
    name: 'Navigation',
    data() {
        return {
            mobile: false,
            mobileNav : false,
            windowWidth: null,
            urlLive: process.env.VUE_APP_BASE_URL+'/livescan/live',
            logo: process.env.VUE_APP_IMG_URL+'/images/logo-towboat2.png',
            crushpixel: process.env.VUE_APP_IMG_URL+'/images/crushpixel-1625816-ID1625816-640x427.jpg',
            router: useRouter()
        }
    },
    
    computed: {
        slate () {
          return this.$store.state.a.slate
        },
        alertsLinkActive() {
          return this.$store.state.a.alertsLinkActive
        },
        logsLinkActive() {
          return this.$store.state.a.logsLinkActive
        },
        galleryLinkActive() {
          return this.$store.state.a.galleryLinkActive
        },
        pageSelected() {
          return this.$store.state.a.pageSelected
        } 
    },
    methods: {
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav
        },
        checkScreen() {
            this.windowWidth = window.innerWidth
            if(this.windowWidth <= 750) {
                this.mobile = true
                return
            }
            this.mobile = false
            this.mobileNav = false
        },   
        goRoute(path) {
            this.router.push(path)
        }
    },
    created() {
        window.addEventListener('resize', this.checkScreen)
        this.checkScreen()
    }
}
</script>

<style>

header {
  position: fixed;
  z-index: 97;
  width: 100%;
  transition: 0.5x ease all;
  color: #fff;
}

nav {
  position: relative;
  top: 5rem;
  background-color: #31363e;
  padding: 12px 0;
  transition: 0.5 ease all;
  width: 100%;
  height: 4rem;
  margin: 0 auto;
  @media(min-width: 1140px) {
      max-width: 1140px;
  }
}

.logo {  
  position: fixed;
  top: 0px;
  height: 100px;
  bottom: 250px;
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
  position: fixed;
  top: -40px;
  left: 50px;
  color: #000;
  font-size: 3rem;
  font-family: 'Merriweather Sans', sans-serif;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.50);
  z-index: 100;
}

.logo h1 span {
  color: blue;
  -webkit-background-clip: text;  
  background-clip: text;
 -webkit-text-fill-color: transparent;
  
}


ul {
  list-style: none;
  padding: .5rem;  
}

li {
  padding: .5rem;
  
}

li a, li router-link {
  padding: .5rem 1rem 1rem 1rem;
}

.nav-link {
    font-weight: 500;
    list-style: none;
    color: #fff;
    text-decoration: none;
}

.navigation .nav-link {
    font-size: 1.2em;
    padding-bottom: 4px;
    text-transform: uppercase;
}

.navigation a.selected,
.navigation router-link.selected {
  background: white;
  color: red;
}

.navigation .nav-link:hover,
.dropdown-nav .nav-link:hover {
  color: #00afea;
  border-color: #00afea;
}

.navigation {
  background-color: #31363e;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: 0.5x ease all;
}

.navigation2 {
  flex-direction: column;
  margin-left: 2rem;
}

.icon {
  display: flex;
  position: absolute;
  align-items: center;
  top: -9px;
  left: 15rem;
  height: 100%;   
}

.icon .fa-bars {
  cursor: pointer;
  font-size: 3rem;
  z-index: 100;
  transition: 0.8s ease all; 
        
}

.icon-active {
  color: #31363e;
}

.mobile-side-menu {
  top: 0;
  left: -10px;
  height: 100vh;
  width: 60vw;
  background-color: #fff;
  z-index: 100;
  border-right: red solid .5rem
}

.dropdown-nav ul {
  margin: 1.5rem .1rem .1rem .1rem;
}

.dropdown-nav li {
  margin-left: 0;
}


.dropdown-nav .nav-link {
  background-color: #fff;
  color: #000;
  font-size: 2rem;
  margin: .5rem;
  padding: .5rem;
}

.dropdown-nav li a.nav-link.selected, 
.dropdown-nav li router-link.nav-link.selected {
  background-color: #FFFF00;
  color: red;
}


.mobile-navi-enter-active,
.mobile-navi-leave-active {
    transition: 1s ease all;
}

.mobile-navi-enter-from,
.mobile-navi-leave-to {
    transform: translateX(-550px);
}

.mobile-navi-enter-to {
    transform: translateX(0px);
}

#title_slate {
  font-family: 'Rubik', sans-serif;
  font-size: 2em;
  color: black;
  position: absolute;
  right: 0px;
  top: -50px;
  background-color: #FFFF00;
  border: 0px solid #000000;
  text-align: center;
  z-index: 4;
}

</style>