<template>
  <div id="page-container">
    <div id="mobile-content-wrap" class="mobile">
      <Map class="map"></Map>
      <section class="middle" v-show="!store.state.a.liveListOn">
        <carousel v-if="store.state.a.liveScans.length" 
        v-model="currentSlide" 
        :items-to-show="1" 
        :wrap-around="true"
        :autoplay="parseInt(store.state.a.liveAutoDelay)*1000"
        >
          <slide class="slide" v-for="live in store.state.a.liveScans" :key="live.id">
            <div class="slideData" :style="'background-image: url('+live.imageUrl+');'">
              <div class="label-wrap">
                <h4 class="map-label">{{live.mapLabel}}</h4>
                <h4 class="tile-title">{{live.name}}</h4> 
                <img class="dir-img" :src="live.dirImg"/>              
              </div>

              <h5>{{live.liveLocation}}</h5>
              <div class="btnWrapper">
                <button class="pill" @click="route('/logs/history/'+ live.id )" >History</button>
              </div>
                 
              
              <ul>
                <li class="dataPoint"><span class="th">COURSE:</span> <span class="td">{{live.course}}°</span></li>
                <li class="dataPoint"><span class="th">SPEED:</span> <span class="td">{{live.speed}} Knots</span></li>
                <li class="dataPoint"><span class="th">DIRECTION:</span> <span class="td dir">{{live.dir}}</span>  </li>
              </ul>
             
            </div>
          </slide>

          <template #addons>
            <navigation />
            
          </template>
        </carousel>
        <h1 class="noslide" v-else>No vessel transponders are in range currently.</h1>
      </section>
      <section class="listMode" v-show="store.state.a.liveListOn">
        <ul>
          <li v-for="(live, idx) in store.state.a.liveScans" :key="live.id">
            <div @click="focusMap(idx)" class="list-wrap">
              <h4 class="map-label">{{live.mapLabel}}</h4>
              <h4 class="tile-title">{{live.name}}</h4> 
              <img class="dir-img" :src="live.dirImg"/>              
            </div>
            <h5>{{live.liveLocation}}</h5>
          </li>
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
      </div>
    </section>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
import { onMounted, onUnmounted, watch, ref } from 'vue'
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
      delayDisplay: 7     
    }
  },
  methods: {
    updateDelay(e) {
      this.delayDisplay = e.target.value
      this.$store.commit('toggleLiveAuto', {
        on: true,
        delay: this.delayDisplay 
      })
    }
  },
  setup() {
    const store = useStore()
    const inputDelay = ref(null)
    const router = useRouter()

    function route(path) {
      router.push(path)
    }
    
    function checkScreen() {
      let windowWidth = window.innerWidth
      if(windowWidth >= 751) {
        router.push('/live/wide')
      }
    }
    
    function focusMap(key) {
      store.dispatch('focusMap', key)
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

    onUnmounted(() => {
      store.commit('setLogsLinkActive', false)
      window.removeEventListener('resize', checkScreen)
    })
    
    onMounted(async () => {
      window.addEventListener('resize', checkScreen)
      checkScreen()
      store.commit("initLiveScan", store)
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
      
      if(store.liveScans != undefined && store.state.liveScans.length>0) {
        store.commit('setSlate', store.state.a.liveScans.length+' LIVE')
        store.commit('focusMap', 0)
      }
      else {
        store.commit('setSlate', 'LIVE')
      }
      //let reference = document.getElementById("inputDelay")      
    })
    return { store, focusMap, toggleList, inputDelay, checkScreen, toggleAuto, route }
  },
  watch: {
    currentSlide: function (val) {
      // when the hash prop changes, this function will be fired.
      this.$store.commit('focusMap', this.currentSlide)
      this.$store.commit('setSlate', this.$store.state.a.liveScans.length+' LIVE')
      console.log("slide:", this.currentSlide)
    }
  }
}
</script>

<style scoped>
.map {
  position: relative;
  top: var(--menu-pad-mobile);
  padding: 0px .4rem 0 .4rem; 
}

.mobile .label-wrap  {
  background-color: #2c3e50;
  opacity: 0.9;
  max-height: 3.5rem;
  min-width: 20rem;
  display: flex;
  font-size: 20pt;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 1rem 0.75rem;
  margin: 5px;
}

h5 {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.829);
  padding: .3rem;
  margin-top: 0px;
  border-radius: 0px 0px 8px 8px;
  background: rgb(168, 179, 14);
  text-align: center;
  text-shadow: 2px 2px #000;
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

.label-wrap h4.tile-title {
  margin: 5px 5px 5px 15px;
}

img.vesselImg {
  width: 30vw;
  height: auto;
  max-height: 10vh;
}

.middle {
  transform: translateY(150px);
  max-height: 30vh;
}

div.btnWrapper {
  text-align:center;
}


.mobile .slide ul {  
  bottom: 0px;
  padding: 1px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
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

h4.map-label {
  background: aquamarine;
  color: black;
  padding: 5px 15px;
  margin: 5px;
  border-radius: 60%;
  font-size: 26px;
  border: 2px solid black;  
}

.middle .slideData {
  color:  var(--vc-clr-white);
  text-align:center;
  font-size: 20px;
  border-radius: 8px;
  margin-right: 10px;
  padding: 1px 5px;
  /* height: 30vh; /* You must set a specified height */
 
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: auto 50vh; /* Resize the background image to cover the entire container */
}

.mobile .slide {
  align-content: center;
  margin-right: 2rem;
}

.th {
  font-size: 1rem;
  color:rgb(255, 165, 56);
}

.td {
  font-size: 1rem;
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

section {
  margin-left: 1rem;
  width: 90%;
}

#mobile-content-wrap .list-wrap  {
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
  padding: 10px 0.5rem;
  margin: 3px;
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

.mobile .pill {
  text-align: center;
}

.mobile .list-wrap h5 {
  opacity: 1;
  margin-top: 5px;
  padding: .2rem;
  background: rgba(232, 246, 30, 0.979);
  text-align: center;
  text-shadow: 2px 2px #000;
}

.listMode {
  height: 35vh;
  overflow-y: scroll;
  margin-top: 25px;
  position: relative;
  top: 100px;
}

.listMode ul {
  padding: 0px 5px;
  max-width: 30rem;
}

.list-wrap h4.map-label {
    background: aquamarine;
    color: black;
    padding: 5px 15px;
    border-radius: 60%;
    font-size: 15px;
    border: 2px solid black;  
}

.listMode .list-wrap h4.map-label {
  padding: 5px 8px;
  margin: 5px;
}

.list-wrap .tile-title {
  color: white;
  margin: auto;
  margin-left:auto;
  margin-right: auto;
}

.listMode .list-wrap {
 cursor: pointer;
}



</style>