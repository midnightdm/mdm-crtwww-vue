<template>
  <Map class="map"></Map>
  <section>
  <carousel v-model="currentSlide" :items-to-show="1" :wrap-around="true">
    <slide class="slide" v-for="live in store.state.a.liveScans" :key="live.id">
      <div class="slideData" :style="'background-image: url('+live.imageUrl+');'">
        <div class="label-wrap">
          <h4 class="map-label">{{live.mapLabel}}</h4>
          <h4 class="tile-title">{{live.name}}</h4> 
          <img class="dir-img" :src="live.dirImg"/>              
        </div>

        <h5>{{live.liveLocation}}</h5>
        
        <ul>
          <li class="dataPoint"><span class="th">COURSE:</span> <span class="td">{{live.course}}°</span></li>
          <li class="dataPoint"><span class="th">SPEED:</span> <span class="td">{{live.speed}} Knots</span></li>
          <li class="dataPoint"><span class="th">DIRECTION:</span> <span class="td">{{live.dir}}</span>  </li>
        </ul>
        
      </div>
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
  </section>
</template>

<script>
import Map from '@/components/Map.vue'
import { onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

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
      currentSlide: 0
    }
  },
  setup() {
    const store = useStore()
    //const caro = ref(null)
    
    function focusMap(key) {
      store.dispatch('focusMap', key)
    }

    function toggleZoom() {
      store.dispatch('toggleZoom')
    }

    onMounted(async () => {
      //setTimeout(() => { console.log("carosel obj", caro)}, 2000)
      store.dispatch("initLiveScan", store)
      console.log("liveScans:", store.liveScans)
      this.$store.commit('setSlate', this.$store.state.a.liveScans.length+' LIVE')
      store.commit('setPageSelected', 'Live')
      this.$store.commit('focusMap', 0)
    })
    return { store, toggleZoom, focusMap }
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
.map {
  border-radius: 8px;
  padding: 8rem 2rem 0 2rem;
}

.label-wrap  {
  background-color: #2c3e50;
  opacity: 0.9;
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
  padding: .2rem;
  background: rgb(231, 246, 30, 0.4);
  text-align: center;
  text-shadow: 2px 2px #000;
}
 

img.dir-img {
  margin-left: auto;
  margin-right: auto;
  height: 25px;
}

.tile-title {
  margin-left:auto;
  margin-right: auto;
}

img.vesselImg {
  width: 30vw;
  height: auto;
}

.slide {
  align-content: center;
}

.slide ul {
  position: relative;
  bottom: -15%;
  background: rgba(0, 0, 0, 0.4);
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
  background-size: cover; /* Resize the background image to cover the entire container */
}

.th {
  color:rgb(255, 165, 56);
}

.td {
  float: right;
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
</style>