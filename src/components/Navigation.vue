<template>
  <header>
    <nav class="nav-comp">
      <div class="logo">
        <h1>{{logoTitle}}<span :style="'background-image: url('+crushpixel+');'">river</span>traffic</h1>
        <img id="logo-img" :src="logo" title="The logo image shows a tow boat pushing 9 barges.">
  
      </div>
      <div class="icon">  
          <font-awesome-icon icon="bars" @click="toggleMobileNav" v-show="mobile" class="fa-solid fa-bars" :class="{'icon-active': mobileNav}" />
      </div>

      <div class="loggedBtn" :class="{'user-img': $store.state.c.loggeduserPhotoUrl}" v-show="$store.state.c.loggeduserSignedIn">
        <w-button
          class="px4 btnGrpA"
          @click="logOut"
          bg-color="primary"
          dark>
              LOG OUT
        </w-button>
        <div class="label-holder-i" v-if="$store.state.c.loggeduserPhotoUrl !==''">
          <img :src="$store.state.c.loggeduserPhotoUrl" class="user-photo"/>
        </div>
        <div class="label-holder-l" v-else>
          <span class="user-label" :class="genColorClass()">{{$store.state.c.loggeduserName[0]}}</span>
        </div>
      </div>

        <w-button
        v-show="$store.state.a.pageSelected=='Comments' &&
        !$store.state.c.loggeduserSignedIn"
        class="px4 btnGrpA loggedBtn"
        @click="logIn"
        bg-color="primary"
        dark>
            LOG IN
      </w-button> 

      <ul v-show="!mobile" class="navigation">
        <li><a @click="goRoute('/about')" class="nav-link" :href="'/about'" :class="{selected: this.$store.state.a.pageSelected=='About'}">ABOUT</a></li>
        <li><a  @click="goRoute('/alerts')" :href="'/alerts'" class="nav-link" :class="{ 'selected': this.$store.state.a.alertsLinkActive  }" exact>ALERTS</a></li>
        <li><a @click="goRoute('/comments')" :href="'/comments'" class="nav-link" :class="{'selected': this.$store.state.a.commentsLinkActive}" >COMMENTS</a></li>
        <li><a @click="goRoute('/gallery/video')" :href="'/gallery/video'" class="nav-link" :class="{'selected': this.$store.state.a.galleryLinkActive}" >GALLERY</a></li>
        <li><a @click="goRoute('/live/')" class="nav-link" :class="{selected: this.$store.state.a.pageSelected=='Live'}" :href="'/live/'" >LIVE</a></li>
        <li><a @click="goRoute('/logs')" :href="'/logs'" class="nav-link" :class="{ 'selected': this.$store.state.a.logsLinkActive }">LOGS</a></li>
      </ul>

      <AlertsSubMenuWide v-show="this.$store.state.a.alertsLinkActive && !mobile"></AlertsSubMenuWide>
      <!--
      <GallerySubMenu v-show="this.$store.state.a.galleryLinkActive && !mobile"></GallerySubMenu>
      -->
      <LogsSubMenu v-show="this.$store.state.a.logsLinkActive && !mobile"></LogsSubMenu>
      
      <div id="title_slate"><span v-if="slate=='LIVE'">{{this.$store.state.a.liveScans.length}}</span> {{ slate }}</div>
      
      <transition name="mobile-navi">
        <div v-show="mobileNav" class="mobile-side-menu">  
          <ul class="dropdown-nav">
            <li>
              <router-link @click="toggleMobileNav" class="nav-link" :to="{name: 'About'}" :class="{selected: this.$store.state.a.pageSelected=='About'}">ABOUT</router-link>
            </li>
            <li>
              <span @click="toggleAlertsActive" class="nav-link" :class="{ 'selected': this.$store.state.a.alertsLinkActive }" exact>ALERTS</span>
              >
               <transition name="logs-submenu">   
                  <AlertsSubMenu v-show="this.$store.state.a.alertsLinkActive && mobileNav" :class="{'navigation2': mobileNav}" @click="toggleMobileNav"></AlertsSubMenu>                
              </transition>
            </li>

            <li>
              <router-link @click="toggleMobileNav" class="nav-link" :class="{'selected': this.$store.state.a.commentsLinkActive}" :to="{name: 'Comments'}">COMMENTS</router-link>
            </li>     
            <li>
              <router-link @click="toggleMobileNav" class="nav-link" :class="{'selected': this.$store.state.a.galleryLinkActive}" :to="{name: 'Video'}">GALLERY</router-link>
            </li>
            <li><router-link @click="toggleMobileNav" class="nav-link" :to="{name: 'LiveMobile'}" :class="{selected: this.$store.state.a.pageSelected=='Live'}">LIVE</router-link>
            </li>
            <li>
              <router-link @click="toggleLogsActive" class="nav-link" :class="{ 'selected': this.$store.state.a.logsLinkActive}" :to="{name: 'Logs'}">LOGS</router-link>
                <transition name="logs-submenu">              
                  <LogsSubMenu v-show="this.$store.state.a.logsLinkActive  && mobileNav" :class="{'navigation2': mobileNav}" @click="toggleMobileNav"></LogsSubMenu>
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
//import {userAuthState} from '@/store/firebaseApp.js'


export default {
  name: 'Navigation',
  data() {
      return {
          mobile: false,
          mobileNav : false,
          windowWidth: null,
          urlLive: process.env.VUE_APP_BASE_URL+'/livescan/live',
          logo: process.env.VUE_APP_IMG_URL+'/images/logo-towboat2.png',
          logoTitle: process.env.VUE_APP_LOGO_TITLE,
          crushpixel: process.env.VUE_APP_IMG_URL+'/images/crushpixel-1625816-ID1625816-640x427.jpg',
          router: useRouter(),
          galleryTipOn: false,
          alertsTipOn: false,
          logsTipOn: false,
          touchstartX: 0,
          touchstartY: 0,
          touchendX: 0,
          touchendY: 0,
          userLtr: ''

      }
  },
  computed: {
    slate() {
      return this.$store.state.a.slate
    }
  },
  methods: {
      toggleMobileNav() {
        this.mobileNav = !this.mobileNav; 
      }, 
      closeMobileMenu() {
        //close menu on left swipe
        if(this.mobileNav && (this.touchendX < this.touchstartX)) {
          this.mobileNav = false
          console.log("closeMobileMenu()")
        } 
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
      },
      toggleAlertsActive() {
        if(this.$store.state.a.alertsLinkActive) {
          this.$store.commit('setAlertsLinkActive', false)
        } else {
          this.$store.commit('setAlertsLinkActive', true)
        }
      },
      toggleLogsActive() {
        if(this.$store.state.a.logsLinkActive) {
          this.$store.commit('setLogsLinkActive', false)
        } else {
          this.$store.commit('setLogsLinkActive', true)
        }
      },
      toggleGalleryActive() {
        if(this.$store.state.a.galleryLinkActive) {
          this.$store.commit('setGalleryLinkActive', false)
        } else {
          this.$store.commit('setGalleryLinkActive', true)
        }
      },
      logOut() {
        this.$store.dispatch('logOut')
        if(this.$store.state.a.slate.includes('ADMIN')) {
          this.$router.push('/admin/login')
        }
      },
      logIn() {
        this.$store.dispatch('logIn')
        this.usrLtr = this.$store.state.c.loggeduserName[1]
      },
      genColorClass() { //Input a letter
        let lc = this.$store.state.c.loggeduserName.toLowerCase()
        let ascii = lc.charCodeAt(1)
        if(ascii <  97 || ascii > 122) return 'v0';
        if(ascii >  96 && ascii < 101) return 'v1';
        if(ascii > 100 && ascii < 106) return 'v2';
        if(ascii > 105 && ascii < 110) return 'v3';
        if(ascii > 109 && ascii < 114) return 'v4';
        if(ascii > 113 && ascii < 119) return 'v5';
        if(ascii > 118 && ascii < 123) return 'v6';
      }

    },
    created() {
        window.addEventListener('resize', this.checkScreen)
        window.addEventListener('touchstart', (event) => {
          this.touchstartX = event.changedTouches[0].screenX;
          this.touchstartY = event.changedTouches[0].screenY;
        })

        window.addEventListener('touchend', (event) => {
          this.touchendX = event.changedTouches[0].screenX;
          this.touchendY = event.changedTouches[0].screenY;
          this.closeMobileMenu();
        })
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

.loggedBtn {
  position: absolute !important;
  right: 1rem;
  top: -60px;
}


.user-photo {
  width: 50px;
  height: 50px;
  border-radius: 60%;
  padding: 5px;
}

.label-holder-i > img {
  display: inline;
  transform: translate(75px,-38px);
 
}

.label-holder-l {
  display: inline;
  transform: translateY(20px);
}

.loggedBtn.user-img {
  top: -60px;
  right: 50px;
}

.user-label {
  text-transform: uppercase;
  color: white;
  padding: 2px 6px 2px 6px;
  border-radius: 60%;
  font-size: 18px; 
  margin: 3px; 
}

.user-label.v0 {
  background-color: black;
}

.user-label.v1 {
  background-color: navy;
}

.user-label.v2 {
  background-color: maroon;
}

.user-label.v3 {
  background-color: rgba(255, 255, 0, 0.603);
}

.user-label.v4 {
  background-color: green;
}

.user-label.v5 {
  background-color: salmon;
}

.user-label.v6 {
  background-color: orangered;
}

.icon .fa-bars {
  cursor: pointer;
  font-size: 2.5rem;
  z-index: 100;
  transition: 0.3s ease all;    
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
  text-align: left;
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

.dropdown-nav li span.nav-link {
  cursor: pointer;
}

.dropdown-nav li span.nav-link.selected:hover:before {
  content: "";
}

.dropdown-nav li span.nav-link.selected:hover:after {
  margin-left: 10px;
  background: #444;
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  padding: 13px;
  
  content: "Choose from Sub-Menu";
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
  nav.nav-comp {
    top: 3rem;
  }
  #logo-img {
    top: 10px;
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
  .loggedBtn {
    top: -35px;
    right: 1rem;
  }

  .loggedBtn.user-img {
    top: -35px;
    right: 50px;
  }
  /*
  .px4.loggedBtn {
  top: -35px;
  }*/
}

</style>