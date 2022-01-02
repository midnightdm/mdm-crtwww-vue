<template>
  <header>
    <nav class="nav-comp">
      <div class="logo">
        <h1>clinton<span :style="'background-image: url('+crushpixel+');'">river</span>traffic</h1>
        <img id="logo-img" :src="logo" title="The logo image shows a tow boat pushing 9 barges.">
      </div>

      <div class="icon">  
          <font-awesome-icon icon="bars" @click="toggleMobileNav" v-show="mobile" class="fa-solid fa-bars" :class="{'icon-active': mobileNav}" />
      </div>

      <ul v-show="!mobile" class="navigation">
        <li><a @click="goRoute('/about')" class="nav-link" :href="'/about'" :class="{selected: this.$store.state.a.pageSelected=='About'}">ABOUT</a></li>
        <li><a  @click="goRoute('/alerts')" :href="'/alerts'" class="nav-link" :class="{ 'selected': this.$store.state.a.alertsLinkActive  }" exact>ALERTS</a></li>
        <li><a @click="goRoute('/gallery/video')" :href="'/gallery/video'" class="nav-link" :class="{'selected': this.$store.state.a.galleryLinkActive}" >GALLERY</a></li>
        <li><a @click="goRoute('/live/mobile')" class="nav-link" :class="{selected: this.$store.state.a.pageSelected=='LiveMobile'}" :href="'/live'" >LIVE</a></li>
        <li><a @click="goRoute('/logs')" :href="'/logs'" class="nav-link" :class="{ 'selected': this.$store.state.a.logsLinkActive }">LOGS</a></li>
      </ul>

      <AlertsSubMenu v-show="this.$store.state.a.alertsLinkActive && !mobile"></AlertsSubMenu>
      <!--
      <GallerySubMenu v-show="this.$store.state.a.galleryLinkActive && !mobile"></GallerySubMenu>
      -->
      <LogsSubMenu v-show="this.$store.state.a.logsLinkActive && !mobile"></LogsSubMenu>
      
      <div id="title_slate">{{ slate }}</div>
      
      <transition name="mobile-navi">
        <div v-show="mobileNav" class="mobile-side-menu">  
          <ul class="dropdown-nav">
            <li>
              <router-link class="nav-link" :to="{name: 'About'}" :class="{selected: this.$store.state.a.pageSelected=='About'}">ABOUT</router-link>
            </li>
            <li>
              <span @click="makeActive('setAlertsLinkActive')" class="nav-link" :class="{ 'selected': this.$store.state.a.alertsLinkActive }" exact>ALERTS</span>
              >
               <transition name="logs-submenu">   
                  <AlertsSubMenu v-show="this.$store.state.a.alertsLinkActive && mobileNav" :class="{'navigation2': mobileNav}"></AlertsSubMenu>                
              </transition>
            </li>
            <li>
              <router-link @click="makeActive('setGalleryLinkActive')" class="nav-link" :class="{'selected': this.$store.state.a.galleryLinkActive}" :to="{name: 'Video'}">GALLERY</router-link>
            </li>
            <li><router-link class="nav-link" :to="{name: 'LiveMobile'}" :class="{selected: this.$store.state.a.pageSelected=='Live'}">LIVE</router-link>
            </li>
            <li>
              <router-link @click="makeActive('setLogsLinkActive')" class="nav-link" :class="{ 'selected': this.$store.state.a.logsLinkActive}" :to="{name: 'Logs'}">LOGS</router-link>
                <transition name="logs-submenu">              
                  <LogsSubMenu v-show="this.$store.state.a.logsLinkActive  && mobileNav" :class="{'navigation2': mobileNav}"></LogsSubMenu>
                </transition>
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
            router: useRouter(),
            galleryTipOn: false,
            alertsTipOn: false,
            logsTipOn: false

        }
    },
    computed: {
      slate() {
        return this.$store.state.a.slate
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
        },
        makeActive(page) {
          this.$store.commit(page, true)
        }
    },
    created() {
        window.addEventListener('resize', this.checkScreen)
        this.checkScreen()
    }
}
</script>

<style>

.topDiv {
  background: white;
  z-index: 98;
}

header {
  position: fixed;
  z-index: 97;
  width: 100%;
  transition: 0.5x ease all;
  color: #fff;
  background-color: white;
  height: 6rem;
}

nav.nav-comp {
  position: relative;
  top: 4.5rem;
  background-color: #31363e;
  padding: 12px 0;
  transition: 0.5 ease all;
  width: 100%;
  height: 3rem;
  margin: 0 auto; 
}

div.logo {  
  position: fixed;
  top: 0px;
  height: 100px;
  bottom: 250px;
  background-color: white;
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
  top: 21px;
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

.navigation li {
  text-align: center; 
  line-height: 1.3; 
}

li a, li router-link {
  padding: .5rem .5rem .5rem .5rem;
}

.nav-link, .nav-link:visited {
    font-weight: 500;
    list-style: none;
    color: #fff;
    text-decoration: none;
    border-radius: 8px;
}

.navigation .nav-link {
    font-size: 1.2em;
    padding-bottom: 4px;
    text-transform: uppercase;
}

.dropdown-nav .nav-link,
.navigation2 a.nav-link,
.dropdown-nav .nav-link:visited,
.navigation2 a.nav-link:visited {
  background-color: #fff;
  color: #000;
  font-size: 2rem;
  margin: .5rem;
  padding: .5rem;
}

.navigation2 li {
  text-align: left;
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

ul.navigation2 {
  background-color: white; 
}

.icon {
  display: flex;
  position: absolute;
  align-items: center;
  top: 0px;
  left: 10rem;
  height: 100%;   
}

.icon .fa-bars {
  cursor: pointer;
  font-size: 2.5rem;
  z-index: 100;
  transition: 0.8s ease all; 
        
}

.icon-active {
  color: #31363e;
  transform: translate(20px, 15px);
}

.mobile-side-menu {
  top: 0px;
  left: -10px;
  height: 100vh;
  width: 80vw;
  background-color: #fff;
  z-index: 99;
  border-right: red solid .5rem
}

.dropdown-nav ul {
  margin: 1.5rem .1rem .1rem .1rem;
}

.dropdown-nav li {
  margin-left: 0;
}


.navigation a.selected,
.navigation router-link.selected {
  background: white;
  color: red;
}

.dropdown-nav li span.nav-link.selected, 
.dropdown-nav li a.nav-link.selected, 
.dropdown-nav li router-link.nav-link.selected {
  background-color: #FFFF00;
  color: red;
}

.alerts-submenu-enter-active,
.logs-submenu-enter-active,
.gallery-submenu-enter-active,
.mobile-navi-enter-active,
.mobile-navi-leave-active {
    transition: 0.5s ease all;
}

.alerts-submenu-leave-active,
.logs-submenu-leave-active,
.gallery-submenu-leave-active {
  transition: none;
}

.mobile-navi-enter-from,
.mobile-navi-leave-to {
    transform: translateX(-550px);
}

.mobile-navi-enter-to {
    transform: translateX(0px);
}

.alerts-submenu-enter-from,
.alerts-submenu-leave-to,
.logs-submenu-enter-from,
.logs-submenu-leave-to,
.gallery-submenu-enter-from,
.gallery-submenu-leave-to {
    opacity: 0;
}

.alerts-submenu-enter-to,
.logs-submenu-enter-to,
.gallery-submenu-enter-to {
  opacity: 1;
}

#title_slate {
  font-family: 'Rubik', sans-serif;
  font-size: 1.3em;
  padding: .3rem;
  margin: .3rem 1rem;
  color: black;
  position: absolute;
  right: 2rem;  
  top: -30px; 
  background-color: #FFFF00;
  border: 0px solid #000000;
  text-align: center;
  z-index: 4;
}

main #local {
  top: 15rem;
}

@media (max-width: 750px) {
  nav {
    top: 3rem;
  }
  #logo-img {
    top: 1px;
    width: 130px;
    height: 62px;
  }
  .logo h1 {
    font-size: 2.2rem;
    left: 30px;
    top: 10px;
    
  }
  #title_slate {
    top: .2rem;
  }
}

</style>