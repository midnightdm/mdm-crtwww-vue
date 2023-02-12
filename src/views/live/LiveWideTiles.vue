<template>
  <div id="page-container">
    <div id="idiv">
      <iframe id="imap" class="widemap column" :src="iframemapUrl" scrolling="no" frameborder="0" seamless></iframe>
    </div>
    <div id="content-wrap">
      
      <!--button @click="toggleLabels">Mile Labels <span class='led' :class="{'on':  store.state.a.infoOn }"></span></-button-->&nbsp;&nbsp;
      <button class="ann" @click="toggleLiveVoice">Announcements <span class='led' :class="{'on':  store.state.a.liveVoiceOn }"></span></button>
      <section class="data column">
        <div class="dataColumn">
          <ul v-if="store.state.a.liveScans.length" class="cardWrapper">
            <li  class="listMode" v-for="(live, idxa) in store.state.a.liveScans" :key="live.id">
              <div class="slideData">
              <div class="list-wrap">
                <h4 class="map-label">{{live.mapLabel}}</h4>
                <h4 class="tile-title">{{live.name}}</h4> 
                <div class="dir-container">
                  <img class="dir-img" :src="live.dirImg"/>
                  <span class="speed">{{live.spd}}</span> 
                </div>               
              </div>
              <div class="data-cont grid2-container">
                <div id="data-table">
                  <ul id="selected-vessel">
                    <li class="dataPoint"><span class="th">TYPE:</span> <span class="td">{{live.type}}</span></li>
                    <li class="dataPoint"><span class="th">MMSI #:</span> <span class="td">{{live.id}}</span></li>
                    <li class="dataPoint"><span class="th">COURSE:</span> <span class="td">{{live.course}}°</span></li>
                    <li class=dataPoint><span class=th>SPEED:</span> <span class=td>{{live.speed}} Knots</span></li>
                    <li class="dataPoint"><span class="th">DIRECTION:</span> <span class="td dir">{{live.dir}}</span>  </li>
                    <li class="dataPoint"><span class="th">COORDINATES:</span></li>
                    <li class="dataPoint"><span class="th"></span> <span class="td dir">{{live.rndLat}}, {{live.rndLng}}</span>  
                    </li>
                  </ul>
                </div>
                <div id="img-frame">
                  <a href="javascript:void(0)" @click="setSelectedA(idxa)">
                  <img class="data-image" :class="{bigger:selectedA==idxa}" :src="live.imageUrl">
                  </a>
                  <div class="btnWrapper">
                    <button class="pill" @click="route('/logs/history/'+ live.id )" >History</button>
                  </div>
                  <div class="spader"></div>                   
                </div>
              </div>
              
              <h5>{{live.liveLocation}}</h5>
                       
            </div>
          </li>
          </ul>
          <h1 v-else class="noslide" >No vessel transponders are in range currently.</h1>
        </div>
     </section>

    </div>
   
  </div>
</template>

<script>
import { onMounted, onUnmounted, watchEffect, ref } from 'vue'
import { useStore } from 'vuex'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      iframemapUrl: process.env.VUE_APP_IFRAMEMAP_URL,
      currentSlide: 0,
      delayDisplay: 7,
      selectedA: undefined    
    }
  },
  methods: {
    updateDelay(e) {
      this.delayDisplay = e.target.value
      this.$store.commit('toggleLiveAuto', {
        on: true,
        delay: this.delayDisplay 
      })
    },
    setSelectedA(t) {
      if(t==this.selectedA) {
        this.selectedA=undefined
      } else {
        this.selectedA = t
        setTimeout(this.restoreSelectedA, 10000)  
      }
    },
    restoreSelectedA() {
      this.selectedA=undefined
    },
  },
  setup() {
    const store = useStore()
    const inputDelay = ref(null)
    const router = useRouter()

    const stopVoiceWatch = watchEffect( () => {
      if(store.state.a.liveVoiceOn && store.state.a.playApub) {
        playWaypoint()
      }
      if(store.state.a.liveVoiceOn && store.state.a.playVpub) {
        playAnnouncement()
      } 
    })
    
 


    function route(path) {
      router.push(path)
    }
    
    function checkScreen() {
      let windowWidth = window.innerWidth
      if(windowWidth <= 750) {
        router.push('/live/mobile')
      } else {
        router.push('/live/wide/tiles')
      }
      //console.log("checkScreen()")
    }

    function focusMap(key) {
      store.dispatch('focusMap', key)
    }

    function toggleLabels() {
      if(store.state.a.infoOn) {
        store.commit("setInfoOn", false)
      } else {
        store.commit("setInfoOn", true)
      }
    }

    function toggleLiveVoice() {
      if(store.state.a.liveVoiceOn==true) {
        store.dispatch("toggleLiveVoice", false)
      } else if(store.state.a.liveVoiceOn==false) {
        store.dispatch("toggleLiveVoice", true)
        playActivated()
      }
    }

    function toggleAuto() {
      if(store.state.a.liveAutoOn === true) {
        store.commit('toggleLiveAuto', {
          on: false,
          delay: 500,
          last: store.state.a.liveAutoDelay
        })
      }
      else if(store.state.a.liveAutoOn === false) {
        store.commit('toggleLiveAuto', {
          on: true,
          delay: store.state.a.liveAutoLast
        })
      }
    }

    function playAnnouncement(wasBtn=false) {
      let audio = new Audio(store.state.a.liveScanModel.announcement.vpubVoiceUrl);
      audio.loop = false;
      audio.play(); 
      if(!wasBtn) { 
        store.dispatch('togglePlayVpub', false)
      }
    }

    function playWaypoint(wasBtn=false) {
      let audio = new Audio(store.state.a.liveScanModel.waypoint.apubVoiceUrl);
      audio.loop = false;
      audio.play();
      if(!wasBtn) { 
        store.dispatch('togglePlayApub', false)
      } 
    }

    function playActivated() {
      let audio = new Audio(store.state.a.liveScanModel.voiceActivatedUrl);
      audio.loop = false;
      audio.play().then(() => alert("Enable browser's audio play permission if you don't hear an activation announcement."))     
    }

    

    onUnmounted(() => {
      store.commit('setLogsLinkActive', false)
      window.removeEventListener('resize', checkScreen)
      stopVoiceWatch()
    })

    let keysPressed = {}

    onMounted(async () => {
      window.addEventListener('resize', checkScreen)
      //Keypress event listeners
      document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
        if (keysPressed['Control'] && keysPressed['Shift'] && event.code == "Digit1") {
          console.log("keypress playWaypoint", event.code)
          playWaypoint(true);
        }
        if (keysPressed['Control'] && keysPressed['Shift'] && event.code == 'Digit2') {
          console.log("keypress playAnnouncement", event.code)
          playAnnouncement(true);
        }
      });
      document.addEventListener('keyup', (event) => {
        keysPressed[event.key] = false;
      });
      
      checkScreen()
      store.commit("initLiveScan", store)
      store.commit('setPageSelected', 'Live')
      store.commit('toggleLiveList', {
        on: false, 
        vh: 90, 
        vw: 30,
        zoom: 12, 
        center: store.state.a.liveScanModel.mapCenter
      })
      console.log("liveScans.length", store.state.a.liveScans.length)
      if(store.state.a.liveScans != undefined && store.state.a.liveScans.length) {
            onMounted(async () => {
      window.addEventListener('resize', checkScreen)
      //Keypress event listeners
      document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
        if (keysPressed['Control'] && keysPressed['Shift'] && event.code == "Digit1") {
          console.log("keypress playWaypoint", event.code)
          playWaypoint(true);
        }
        if (keysPressed['Control'] && keysPressed['Shift'] && event.code == 'Digit2') {
          console.log("keypress playAnnouncement", event.code)
          playAnnouncement(true);
        }
      });
      document.addEventListener('keyup', (event) => {
        keysPressed[event.key] = false;
      });
      
      checkScreen()
      store.commit("initLiveScan", store)
      store.commit('setPageSelected', 'Live')
      store.commit('toggleLiveList', {
        on: false, 
        vh: 90, 
        vw: 30,
        zoom: 12, 
        center: store.state.a.liveScanModel.mapCenter
      })
      console.log("liveScans.length", store.state.a.liveScans.length)
      if(store.state.a.liveScans != undefined && store.state.a.liveScans.length) {
        store.commit('setSlate', store.state.a.liveScans.length+' LIVE')
        store.dispatch("fetchVoiceNotices")
        //store.commit('focusMap', 0)

      }
      else {
        setTimeout( () => {
          if(store.state.a.liveScans != undefined && store.state.a.liveScans.length) {
            store.commit('setSlate', store.state.a.liveScans.length+' LIVE');
            store.dispatch("fetchVoiceNotices");
          }
        }, 1500);
        //store.commit('setSlate', 'LIVE')
      }  
    })
        store.dispatch("fetchVoiceNotices")
        //store.commit('focusMap', 0)

      }
      else {
        setTimeout( () => {
          if(store.state.a.liveScans != undefined && store.state.a.liveScans.length) {
            store.commit('setSlate', store.state.a.liveScans.length+' LIVE');
            store.dispatch("fetchVoiceNotices");
          }
        }, 1500);
        //store.commit('setSlate', 'LIVE')
      }  
    })

    //watch()

    return { store, focusMap, keysPressed, inputDelay, checkScreen, toggleAuto, route, toggleLabels, toggleLiveVoice, playAnnouncement, playWaypoint, playActivated }
  }
  // watch: {
  //   currentSlide: function (val) {
  //     // when the hash prop changes, this function will be fired.
  //     this.$store.commit('focusMap', this.currentSlide)
  //     this.$store.commit('setSlate', this.$store.state.a.liveScans.length+' LIVE')
  //     console.log("slide:", this.currentSlide)
  //   }
  // }
}
</script>

<style scoped>
.widemap {
  border-radius: 8px;
}


.label-wrap  {
  height: 3.5rem;
  background-color: #2c3e50;
  opacity: 0.9;
  min-width: 10rem;
  border-radius: 8px;
  display: flex;
  font-size: 20pt;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 0px .5rem;
  margin: 0px;
}

h5 {
  font-size: 1rem;
  border-radius: 0px 0px 8px 8px;
  color: rgba(255, 255, 255, 0.829);
  padding: .3rem;
  margin-top: 0px;
  background: rgb(168, 179, 14);
  text-align: center;
  text-shadow: 1px 1px #000;
}

/* Map to Content Proportions */

#imap {
    height: 100%;
    width: 100%;
}

#idiv {
    position: fixed;
    top: 150px;
    left: 0px;
    right: 60vw;
    bottom: 0px;
}

#content-wrap { 
  position: relative;    
  top: 0px;
  left: 40vw;
  bottom: 0px;
  right: 10px;
  padding-right: 10%;
}


/* Deals with all vessel data displayed as cards */
ul.cardWrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}


/* Data frame styling*/
.grid2-container {
  background-color: black;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: .07rem;
  padding: .01rem;  
}
#data-table {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start:1;
  grid-row-end:3;
  width: 15rem;  height: auto;
}
#img-frame {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start:2;
  grid-row-end:  3;
  background-color: black;
  width: 6.5rem;  height: auto;
}
div#img-frame img {
  max-width: 100%; overflow: hidden;
}


ul#all-vessels {  
  list-style-type: none;
  bottom: 0px;
  padding: 1px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.4);
}
#selected-vessel > li {
  text-align: left;
  line-height: .2rem;
  margin: 5px 5%;
  
}
.th {
  
  font-size: 1rem;
  color:rgb(255, 165, 56);
}
.td {
  color: white;
  font-size: 1rem;
  float: right;
  overflow-wrap: break-word;
}
.td.dir {
  text-transform: capitalize;
}

/* Vessel Image resizer*/
img.data-image  {
  width: 80%;
  height: auto;
  max-height: 20vh;
  transition: transform .5s ease-in-out;
}

img.data-image.bigger {
  transform: scale(5) translate(-30%, 20%);
  transition: transform .5s ease-in-out;
}

div.spader {
  height: 2rem;
}

/* Next 3 ensure footer on bottom of page */
#page-container {
  padding-top: 10rem;
  position: relative;
  min-height: 100vh;
}




.column {
  float: left;
}

.widemap.column {
  width: 30%;
  height: 100vh;
  min-width: 300px;
}

.data.column {
  width: 67%;
}

div.dataColumn {
  width: 100%;
  text-align: center;
}


@media only screen and (max-width: 1073px) {
  .data.column {
    width: 50%;
  }
  .widemap.column {
    width: 30%;
    min-width: 10px;
  }
}


#footer {
  position: absolute;
  bottom: 5px;
  height: 2.5rem;
}
/*  End of Footer controls  */


.btnBar {
  bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: .5rem;
  font-weight: bold;
}

.btnBar button {
   padding: 4px;
}

button.ann {
  position: fixed;
  top: 40px;
  right: 180px;
  z-index: 100;
}

.led  {
  height: 10px;
  display: inline-block;
  background-color: red;
  width: 10px;
  border-radius: 50%;
}

.led.on {
  background-color: rgba(6, 245, 6, 1);
}

img.dir-img {
  margin-left: auto;
  margin-right: auto;
  height: 25px;
  filter: drop-shadow(2px 2px 4px #4444dd);
}

.tile-title {
  margin-left:auto;
  margin-right: auto;
}

img.vesselImg {
  width: 30vw;
  height: auto;
}

div.btnWrapper {
  text-align:center;
}

.slide,
.dataColumn {
  align-content: center;
}

.slide ul,
.dataColumn ul.mask {
  margin: 5px;
  position: relative;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

h1.noslide {
  border-radius: 8px;
  color: white;
  padding: 2rem 0;
  background-color: #2c3e50;
  text-align: center;
  text-shadow: 2px 2px #000;
}

.map-label {
    background: aquamarine;
    color: black;
    padding: 5px 15px;
    border-radius: 60%;
    font-size: 35px;
    border: 2px solid black;  
}


/* Inside the slide  */
.slideData {
  color:  var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  padding: 0px 30px;
  height: 40vh; /* You must set a specified height */
  
  min-height: 20rem;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: auto 15rem; /* Resize the background image to cover the entire container */
}

.th {
  color:rgb(255, 165, 56);
}

.td {
  float: right;
}

.td.dir {
  text-transform: capitalize;
}

.shade {
  opacity: 0.3;
  background-color: black;
}

.carousel__slide {
  padding: 0px 30x;
}

.carousel__prev,
.carousel__next {
  box-sizing: border-box;
  border: 5px solid white;
  background-color: #2c3e50;
}

section {
  margin-left: 1rem;
  width: 95%;
}


.list-wrap  {
  background-color: #2c3e50;
  opacity: 1;
  max-height: 3rem;
  min-width: 20rem;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  font-size: 20pt;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 0.1rem 0.1rem;
  margin: 0px;
}

.list-wrap h5 {
  opacity: 1;
  padding: .2rem;
  background: rgba(232, 246, 30, 0.979);
  text-align: center;
  text-shadow: 2px 2px #000;
}

.list-wrap .map-label {
    background: aquamarine;
    color: black;
    padding: 5px 10px;
    border-radius: 60%;
    font-size: 15px;
    border: 2px solid black;  
}

.list-wrap .tile-title {
  /* font-size: var(--h4vsli); */
  color: white;
  margin: auto;
  margin-bottom: 2px;
  margin-left:auto;
  margin-right: auto;
}


.list-wrap div.dir-container {
  position: relative;
  text-align: center;
}

.list-wrap span.speed {
  color: white;
  font-size: small;
  display: inline-block; 
  position: absolute; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}



.pill {
  background-color: #ddd;
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
}

</style>