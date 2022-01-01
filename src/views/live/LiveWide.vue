<template>
  <div id="page-container">
    <div id="content-wrap">
      <Map class="widemap column"></Map>
      <!--section class="map column"></-section-->
      <section class="data column">
        <div class="dataColumn">
          <ul v-if="store.state.a.liveScans.length" class="cardWrapper">
            <li  v-for="live in store.state.a.liveScans" :key="live.id">
              <div class="slideData" :style="'background-image: url('+live.imageUrl+');'">
              <div class="label-wrap">
                <h4 class="map-label">{{live.mapLabel}}</h4>
                <h4 class="tile-title">{{live.name}}</h4> 
                <img class="dir-img" :src="live.dirImg"/>              
              </div>

              <h5>{{live.liveLocation}}</h5>
              
              <ul class="mask">
                <li class="dataPoint"><span class="th">COURSE:</span> <span class="td">{{live.course}}°</span></li>
                <li class="dataPoint"><span class="th">SPEED:</span> <span class="td">{{live.speed}} Knots</span></li>
                <li class="dataPoint"><span class="th">DIRECTION:</span> <span class="td dir">{{live.dir}}</span>  </li>
              </ul>
              
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
import Map from '@/components/Map.vue'
import { onMounted, onUnmounted, watch, ref } from 'vue'
import { useStore } from 'vuex'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { useRouter } from 'vue-router'

export default {
  components: {
    Map,
    //Carousel,
    //Slide,
    //Pagination,
    //Navigation
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
    
    
    function checkScreen() {
      let windowWidth = window.innerWidth
      if(windowWidth <= 750) {
        router.push('/live/mobile')
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

    onUnmounted(() => {
      store.commit('setLogsLinkActive', false)
      window.removeEventListener('resize', checkScreen);
    })


    onMounted(async () => {
      window.addEventListener('resize', checkScreen)
      checkScreen()
      store.commit("initLiveScan", store)
      store.commit('setPageSelected', 'Live')
      store.commit('toggleLiveList', {
        on: true, 
        vh: 90, 
        vw: 30,
        zoom: 12, 
        center: store.state.a.liveScanModel.clinton
      })
      if(store.liveScans != undefined && store.state.liveScans.length) {
        store.commit('setSlate', store.state.a.liveScans.length+' LIVE')
        store.commit('focusMap', 0)

      }
      else {
        store.commit('setSlate', 'LIVE')
      }  
    })
    return { store, focusMap,  inputDelay, checkScreen, toggleAuto }
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

<style>
.widemap {
  border-radius: 8px;
}


.label-wrap  {
  background-color: #2c3e50;
  opacity: 0.9;
  min-width: 20rem;
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
  color: rgba(255, 255, 255, 0.829);
  padding: .3rem;
  background: rgb(168, 179, 14);
  text-align: center;
  text-shadow: 2px 2px #000;
}


/* Deals with all vessel data displayed as cards */
ul.cardWrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

}


/* Next 3 ensure footer on bottom of page */
#page-container {
  padding-top: 10rem;
  position: relative;
  min-height: 100vh;
}

#content-wrap { 
  padding-bottom: 2.5rem;    /* Footer height */
}

#content-wrap:after {
  display: table;
  clear: both;
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

.slide,
.dataColumn {
  align-content: center;
}

.slide ul,
.dataColumn ul.mask {
  position: relative;
  bottom: -15%;
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
  border-radius: 8px;
  display: flex;
  font-size: 20pt;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 0 0.5;
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
    padding: 5px 15px;
    border-radius: 60%;
    font-size: 15px;
    border: 2px solid black;  
}

.list-wrap .tile-title {
  color: white;
  margin-left:auto;
  margin-right: auto;
}


</style>