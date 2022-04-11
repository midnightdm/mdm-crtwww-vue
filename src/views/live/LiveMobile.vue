<template>
  <div id="page-container">
    <div id="mobile-content-wrap" class="mobile">
      <!--Map class="map"></ Map-->
      <iframe name="imap" id="imap" class="map" :class="{active: store.state.a.liveListOn}" src="../../map.html" scrolling="no" frameborder="0" seamless></iframe>  
      <section class="middle" v-show="!store.state.a.liveListOn">
        <carousel v-if="store.state.a.liveScans.length" 
        v-model="currentSlide" 
        :items-to-show="1" 
        :wrap-around="true"
        :autoplay="parseInt(store.state.a.liveAutoDelay)*1000"
        >
         
          <slide class="slide" v-for='(live, idxa) in store.state.a.liveScans' :key="live.id">
            
            <div class="list-wrap">
              <h4 class="map-label" >{{live.mapLabel}}</h4> 
              <h4 class="tile-title">{{live.name}}</h4> 
              <div class="dir-container">
                <img class="dir-img" :src="live.dirImg"/>
                <span class="speed">{{live.spd}}</span>
              </div>                           
            </div>
            <div class="data-cont grid2-container">
              <div class="data-table">
                <ul class="selected-vessel">
                  <li class="dataPoint"><span class="th">TYPE:</span> <span class="td">{{live.type}}</span></li>
                  <li class="dataPoint"><span class="th">MMSI #:</span> <span class="td">{{live.id}}</span></li>
                  <li class="dataPoint"><span class="th">COURSE:</span> <span class="td">{{live.course}}°</span></li>
                  <li class=dataPoint><span class=th>SPEED:</span> <span class=td>{{live.speed}} Knots</span></li>
                  <li class="dataPoint"><span class="th">DIRECTION:</span> <span class="td dir">{{live.dir}}</span>  </li>
                  <li class="dataPoint"><span class="th">COORDINATES:</span></li>
                  <li class="dataPoint"><span class="td co">{{live.rndLat}}, {{live.rndLng}}</span>  
                  </li>
                </ul>
              </div>
              <div class="img-frame">                
                <a href="#" @click="setSelectedA(idxa)">
                <img class="data-image" :class="{ bigger: selectedA==idxa}" :src="live.imageUrl" >      
                </a>
                <div class="btnWrapper">
                  <button class="pill" @click="route('/logs/history/'+ live.id )" >History</button>
                </div>
              </div>
        
            </div>
            <h5>{{live.liveLocation}}</h5>             
           
          </slide>

          <template #addons>
            <navigation />
            
          </template>
        </carousel>
        <h1 class="noslide" v-else>No vessel transponders are in range currently.</h1>
      </section>
      <section class="listMode" v-show="store.state.a.liveListOn">

        <ul id="all-vessels">
          <template v-if="store.state.a.segments[4].length">
          <li class="ctr" v-for="(live,idx4) in store.state.a.segments[4]" :key="live.id">
            <div class="list-wrap">
              <h4 class="map-label"  @click="focusMap(live.lsKey)">{{live.mapLabel}}</h4>
              <button @click="showDetail(live.lsKey)">Detail</button>
              <h4 class="tile-title">{{live.name}}</h4> 
              <div class="dir-container">
                <img class="dir-img" :src="live.dirImg"/>
                <span class="speed">{{live.spd}}</span>
              </div>                           
            </div>
            <div v-show="live.detail" class="data-cont grid2-container">
              <div class="data-table">
                <ul class="selected-vessel">
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
              <div class="img-frame">
                <a href="#" @click="setSelectedB(4, idx4)">
                  <img class="data-image" :class="{bigger: selectedB[4]==idx4}" :src="live.imageUrl" >      
                </a>
                <div class="btnWrapper">
                  <button class="pill" @click="route('/logs/history/'+ live.id )" >History</button>
                </div>
              </div>
            </div>
            <h5>{{live.liveLocation}}</h5>
          </li>
          </template>
          <li><span class="waypoint">3 NORTH</span></li>

          <template v-if="store.state.a.segments[3].length">
          <li class="ctr" v-for="(live, idx3) in store.state.a.segments[3]" :key="live.id">
            <div class="list-wrap">
              <h4 class="map-label"  @click="focusMap(live.lsKey)">{{live.mapLabel}}</h4>
              <button @click="showDetail(live.lsKey)">Detail</button>
              <h4 class="tile-title">{{live.name}}</h4> 
              <div class="dir-container">
                <img class="dir-img" :src="live.dirImg"/>
                <span class="speed">{{live.spd}}</span>
              </div>                           
            </div>
            <div v-show="live.detail" class="data-cont grid2-container">
              <div class="data-table">
                <ul class="selected-vessel">
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
              <div class="img-frame">
                <a href="#" @click="setSelectedB(3, idx3)">
                  <img class="data-image" :class="{bigger: selectedB[3]==idx3}" :src="live.imageUrl" >      
                </a>
                <div class="btnWrapper">
                  <button class="pill" @click="route('/logs/history/'+ live.id )" >History</button>
                </div>
              </div>
            </div>
            <h5>{{live.liveLocation}}</h5>
          </li>
          </template>
          <li><span class="waypoint">LOCK 13</span></li>
          
          <template v-if="store.state.a.segments[2].length">
          <li class="ctr" v-for="(live, idx2) in store.state.a.segments[2]" :key="live.id">
            <div class="list-wrap">
              <h4 class="map-label"  @click="focusMap(live.lsKey)">{{live.mapLabel}}</h4>
              <button @click="showDetail(live.lsKey)">Detail</button>
              <h4 class="tile-title">{{live.name}}</h4> 
              <div class="dir-container">
                <img class="dir-img" :src="live.dirImg"/>
                <span class="speed">{{live.spd}}</span>
              </div>                           
            </div>
            <div v-show="live.detail" class="data-cont grid2-container">
              <div class="data-table">
                <ul class="selected-vessel">
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
              <div class="img-frame">
                <a href="#" @click="setSelectedB(2, idx2)">
                  <img class="data-image" :class="{bigger: selectedB[2]==idx2}" :src="live.imageUrl" >      
                </a>
                <div class="btnWrapper">
                  <button class="pill" @click="route('/logs/history/'+ live.id )" >History</button>
                </div>
              </div>
            </div>
            <h5>{{live.liveLocation}}</h5>
          </li>
          </template>
          <li><span class="waypoint">RR  BRIDGE</span></li>

          <template v-if="store.state.a.segments[1].length">
          <li class="ctr" v-for="(live, idx1) in store.state.a.segments[1]" :key="live.id">
            <div class="list-wrap">
             <h4 class="map-label"  @click="focusMap(live.lsKey)">{{live.mapLabel}}</h4>
              <button @click="showDetail(live.lsKey)">Detail</button>
              <h4 class="tile-title">{{live.name}}</h4> 
              <div class="dir-container">
                <img class="dir-img" :src="live.dirImg"/>
                <span class="speed">{{live.spd}}</span>
              </div>                           
            </div>
            <div v-show="live.detail" class="data-cont grid2-container">
              <div class="data-table">
                <ul class="selected-vessel">
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
              <div class="img-frame">
                <a href="#" @click="setSelectedB(1, idx1)">
                  <img class="data-image" :class="{bigger: selectedB[1]==idx1}" :src="live.imageUrl" >      
                </a>
                <div class="btnWrapper">
                  <button class="pill" @click="route('/logs/history/'+ live.id )" >History</button>
                </div>
              </div>
            </div>
            <h5>{{live.liveLocation}}</h5>
          </li>
          </template>
          <li><span class="waypoint">3 SOUTH</span></li>

          <template v-if="store.state.a.segments[0].length">
          <li class="ctr" v-for="(live, idx0) in store.state.a.segments[0]" :key="live.id">
            <div class="list-wrap">
            <h4 class="map-label"  @click="focusMap(live.lsKey)">{{live.mapLabel}}</h4>
              <button @click="showDetail(live.lsKey)">Detail</button>
              <h4 class="tile-title">{{live.name}}</h4> 
              <div class="dir-container">
                <img class="dir-img" :src="live.dirImg"/>
                <span class="speed">{{live.spd}}</span>
              </div>                           
            </div>
            <div v-show="live.detail" class="data-cont grid2-container">
              <div class="data-table">
                <ul class="selected-vessel">
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
              <div class="img-frame">
                <a href="#" @click="setSelectedB(0, idx0)">
                  <img class="data-image" :class="{bigger: selectedB[0]==idx0}" :src="live.imageUrl" >      
                </a>
                <div class="btnWrapper">
                  <button class="pill" @click="route('/logs/history/'+ live.id )" >History</button>
                </div>
              </div>
            </div>
            <h5>{{live.liveLocation}}</h5>
          </li>
          </template>
        </ul>

      </section>
    </div>
    <section id="footer">
      <div class="btnBar">
        <button @click="toggleAuto">Auto <span class='led' :class="{'on': store.state.a.liveAutoOn}"></span></button>
        Set Delay 
        <input @change="updateDelay" type="range" name="inputDelay" ref="inputDelay" value="7" min="2" max="60">
        {{delayDisplay}} Sec
        <button @click="toggleList">List <span class='led' :class="{'on':  store.state.a.liveListOn }"></span></button>
        <button @click="toggleLiveVoice">Announce <span class='led' :class="{'on':  store.state.a.liveVoiceOn }"></span></button>
      </div>
    </section>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
import { onMounted, onUnmounted, watch, watchEffect, ref } from 'vue'
import { useStore } from 'vuex'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { useRouter } from 'vue-router'

export default {
  components: {
    Map,
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
  data() {
    return {
      currentSlide: 0,
      delayDisplay: 7,
      selectedA: undefined,
      selectedB: [
        undefined, undefined, undefined, undefined, undefined
        ]        
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
    setSelectedB(key, val) {
      if(val==this.selectedB[key]) {
        this.selectedB[key]=undefined
      } else {
        this.selectedB[key] = val
        setTimeout(this.restoreSelectedB, 20000, key, val)  
      }
    },
    restoreSelectedB(key, val) {
      this.selectedB[key]=undefined
    }
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
      if(windowWidth >= 751) {
        router.push('/live/wide')
      }
      console.log("checkScreen()")
    }
    
    function focusMap(key, zoom=14) {
      //store.dispatch('focusMap', key)
      console.log("focusMap("+key+","+zoom+")")
      let lat = parseFloat(store.state.a.liveScans[key].rndLat)
      let lng = parseFloat(store.state.a.liveScans[key].rndLng)
      let pos = {lat: lat, lng: lng }
      window.frames["imap"].window.liveScanModel.map.setCenter(pos)
      window.frames["imap"].window.liveScanModel.map.setZoom(zoom)
    }

    function toggleMarkers() {
      if(window.frames["imap"].window.liveScanModel.markersOn == false) {
        window.frames["imap"].window.liveScanModel.markersOn = true
      } else if(window.frames["imap"].window.liveScanModel.markersOn == true) {
        window.frames["imap"].window.liveScanModel.markersOn = false
      }     
    }

    function showDetail(key) {
      store.dispatch('toggleDetail', key)
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

    function toggleList() {
      if(store.state.a.liveListOn === false) {
        store.commit('toggleLiveList', {
          on: true, 
          vh: 37,
          vw: 100, 
          zoom: 12, 
          center: store.state.a.liveScanModel.clinton
        })
        store.commit('toggleLiveAuto', {
          on: false,
          delay: 500,
          last: store.state.a.liveAutoDelay
        })  
      }
      else if(store.state.a.liveListOn === true) {
        store.commit('toggleLiveList', {
          on: false, 
          vh: 30,
          vw: 100, 
          zoom: 15, 
          center: store.state.a.focusPosition
        })
        store.commit('toggleLiveAuto', {
          on: true,
          delay: store.state.a.liveAutoLast,
          last: store.state.a.liveAutoDelay
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
    
    let keysPressed = {};

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
      store.dispatch("initLiveScan", store)
      store.commit("setInfoOn", true)
      store.commit('setPageSelected', 'Live')
      setTimeout(() =>{
        store.commit('toggleLiveList', {
            on: false, 
            vh: 30, 
            vw: 100,
            zoom: 15, 
            center: store.state.a.liveScans[0].position
          })
      }, 1500)
      
      if(true || store.liveScans != undefined) {
        store.commit('setSlate', 'LIVE')
        store.commit('focusMap', 0)
        store.dispatch("fetchVoiceNotices")
        console.log("liveScans.length",store.state.a.liveScans.length)
      }
      else {
        store.commit('setSlate', 'LIVE')
      }
      //let reference = document.getElementById("inputDelay")      
    })
    return { store, keysPressed, focusMap, showDetail, toggleList, toggleMarkers, inputDelay, checkScreen, toggleAuto, route,  toggleLiveVoice, playAnnouncement, playWaypoint, playActivated }
  },
  watch: {
    currentSlide: function () {
      // when the hash prop changes, this function will be fired.
      //this.$store.commit('focusMap', this.currentSlide)
      let key = this.currentSlide
      let lat = parseFloat(this.$store.state.a.liveScans[key].rndLat)
      let lng = parseFloat(this.$store.state.a.liveScans[key].rndLng)
      let pos = {lat: lat, lng: lng }
      window.frames["imap"].window.liveScanModel.map.setCenter(pos)
      window.frames["imap"].window.liveScanModel.map.setZoom(14)
      //this.$store.commit('setSlate', this.$store.state.a.liveScans.length+' LIVE')
      //console.log("slide:", this.currentSlide, pos)
    }
  }
}
</script>

<style scoped>
.map {
  position: relative;
  top: 95px;/* var(--menu-pad-mobile); */
  height: 35vh;
  width: 100vw;
  padding: 0px 0rem 0 0rem; 
}

.map .active {
  height: 37vh;
}

img.data-image  {
  width: 80%;
  height: auto;
  max-height: 20vh;
  transition: transform .5s ease-in-out;
}

img.data-image.bigger {
  transform: scale(3) translate(-40%, 30%);
  transition: transform .5s ease-in-out;
}



.mobile .slide ul {  
  bottom: 0px;
  padding: 2px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  background: rgba(0, 0, 0, 0.4);
}

/* List Mode  */

.listMode {
  height: 40vh;
  overflow-y: scroll;
  margin-top: 5px;
  position: relative;
  top: 100px;
}

.listMode ul {
  padding: 0px 0.2rem;
  max-width: 100vw;
  overflow: hidden;
}

.listMode ul li {
  margin: .3rem 0rem;
  padding: 0px;
  max-width: 100vw;
}

.listMode .list-wrap {
  max-width: 85vw;
}

.listMode .ctr {
  margin-left: 2%;
  margin-right: auto;
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

span.waypoint {
  display:inline-block;
  letter-spacing: .4rem;
  width: 100%;
  background-color: red;
  color: rgb(245, 230, 230);
  margin: 2px; 
  padding: 2px;
}



.list-wrap .tile-title {
  color: white;
  margin-left: auto;
  margin-right: auto;
}


.listMode .list-wrap h4.map-label {
  margin: 5px;
}


.list-wrap div.dir-container {
  position: relative;
  text-align: center;
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
  max-width: 85vw;
}

.slide h5 {
  margin: auto;
}



h4.map-label {
  background: aquamarine;
  color: black;
  padding: 4px 8px;
  margin: 4px;
  border-radius: 60%;
  font-size: 12pt;
  border: 2px solid black;  
}

.listMode .list-wrap h4.map-label {
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
}

h4.tile-title {
  font-size: 16pt;
}

#mobile-content-wrap .list-wrap  {
  background-color: #2c3e50;
  opacity: 1;
  height: 3rem;
  min-width: 20rem;
  max-width: 85vw;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  font-size: 18pt;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 0px .2rem;
  margin: 0px;
}

#mobile-content-wrap .slide .list-wrap {
  margin: auto;
}

.dataPoint {
  max-width: 85vw;
}


img.dir-img {
  margin-left: auto;
  margin-right: auto;
  height: 25px;
  filter: drop-shadow(2px 2px 4px #4444dd);
}


.middle {
  transform: translateY(150px);
  max-height: 30vh;
}




/* Next 3 ensure footer on bottom of page */
#page-container {
  position: relative;
  min-height: 100vh;
  max-height: 100vh;
}

#mobile-content-wrap {
  padding-bottom: 3.5rem;    /* Footer height */
}

#footer {
  position: absolute;
  bottom: 5px;
  height: 3.5rem;
  margin-bottom: 1.75rem;
}
/*  End of Footer controls  */

.th {
  font-size: 1rem;
  color:rgb(255, 165, 56);
}

.td {
  color: white;
  font-size: 1rem;
  float: right;
  overflow: visible; 
}

.td.co {
  font-size: .8rem;
}

.td.dir {
  text-transform: capitalize;
}


/* Carousel  */
.carousel__slide { 
  display: block;
  position: relative;
  padding: 5px 2px;
}

.carousel__track {
  height: 40vh;
}

.carousel__prev,
.carousel__next {
  /* box-sizing: border-box; */
  margin-right: 10px;
  border: 5px solid white;
  background-color: #2c3e50;
}



/** List */
ul#all-vessels {  
  list-style-type: none;
  bottom: 0px;
  padding: 1px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: .2rem;
  background: rgba(201, 199, 199, 0.718);
}


.selected-vessel > li {
  text-align: left;
  line-height: .2rem;
  margin: 5px 5%;
  max-width: 85vw;
}

.listMode .selected-vessel > li {
  line-height: normal;
}



/* Data frame styling*/

.grid2-container {
  /* margin: auto; */
  background-color: black;
  max-width: 85vw;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: .07rem;
  padding: .02rem;  
}

.slide .grid2-container {
  margin: auto;
}

.data-table {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start:1;
  grid-row-end:3;
  width: 100%;  height: auto;
  padding: 0rem 0rem;
  margin: .02rem .02rem;
}

.listMode .data-table {
  padding: .5rem;
  margin: 0;
}

.img-frame {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end:  2;
  background-color: black;
  width: 100%;  height: auto;
  padding-top: 5%;
}

div.img-frame img {
  max-width: 100%; overflow: hidden;
}

/** Button Related */

.shade {
  opacity: 0.3;
  background-color: black;
}


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

</style>