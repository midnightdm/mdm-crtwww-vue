<template>
  <main id="LogsList">
    <button v-bind:class="{ active: scrolled}" id="topbtn" @click="topOfPage">Top</button>
    <section>
      <h1>{{this.$store.getters[getterName].length}} Vessel Passage<span v-if="this.$store.getters[getterName].length != 1">s</span>  {{pageTitle}} </h1>
      <h4>{{ this.formattedRange }}</h4>


      <ul class="vessels-list" v-for="vessel in this.$store.getters[getterName]" :key="vessel.vesselID">
        <li>
          <div class="shipBox tableBlock">
            <img class="shipBox" :src="vessel.vesselImageUrl" width="200" />
          </div>
          <div class="tableBlock grpA"> 
            <h4 class="title">{{ vessel.vesselName }}</h4>
            <p class="dirWrapper">
            <img class="dir-img" v-if="vessel.passageDirection=='upriver'" :src="this.upArrUrl" title='Upriver indicator' />
            <img class="dir-img" v-if="vessel.passageDirection=='downriver'" :src="this.dnArrUrl" title='Downriver indicator'/>
            <span class="adjacent"> {{vessel.passageDirection}}</span>
            </p>
          </div>

          <div class="tableBlock">
            <h4>{{vessel.marker2DO.toLocaleDateString() }}</h4>
            <br/>
            <p>
              <span class="label" v-if="this.$store.state.a.region=='clinton'">LOCK 13:</span>
              <span class="label" v-if="this.$store.state.a.region=='qc'">LOCK 14:</span> 
              <span class="value">{{ vessel.marker1DO.toLocaleTimeString() }}</span>
            </p>
            <p>
              <span class="label" v-if="this.$store.state.a.region=='clinton'">BRIDGE :</span>
              <span class="label" v-if="this.$store.state.a.region=='qc'">LOCK 15:</span> 
              <span class="value">{{ vessel.marker2DO.toLocaleTimeString() }}</span>
            </p>
          </div>

          <div class="tableBlock holder">
            <router-link class="pill btn" :to="{ name: 'Detail', params: { id: vessel.passageVesselID}}">History</router-link>
          </div>
          
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { format } from 'date-fns'
//import LogsSubMenu from '@/components/LogsSubMenu.vue'

export default {
  name: 'LogsList',
  props: {
    getterName: String,
    rangeName: String,
    pageSelected: String,
    pageTitle: String
  },
  created: function () {
    this.$store.dispatch("fetchCurrentMonth", process.env.VUE_APP_REGION)
    window.addEventListener('scroll', this.handleScroll)
    this.$store.commit('setRegion', process.env.VUE_APP_REGION)
  },
  mounted() {
    this.$store.commit('setSlate', 'LOGS')
    this.$store.commit('setLogsLinkActive', true)
    this.$store.commit('setPageSelected', this.pageSelected)
  },
  unmounted() {
    this.$store.commit('setLogsLinkActive', false)
  },
  data: function() {
    return {
      upArrUrl: process.env.VUE_APP_IMG_URL+'/images/uparr.png',
      dnArrUrl: process.env.VUE_APP_IMG_URL+'/images/dwnarr.png',
      scrolled: false
  
    }
  },
  computed: {
    formattedRange() {
      return "Range is "+
      format(this.$store.state.a.ranges[this.rangeName].lo*1000, 'h:mmaaa eeee, LLL do uu') +
      " to " +
      format(this.$store.state.a.ranges[this.rangeName].hi*1000, 'h:mmaaa eeee, LLL do uu')
    }
  },
  methods: {
    topOfPage() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    handleScroll(event) {
      if(document.documentElement.scrollTop>20) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    } 
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
#LogsList section {
  padding-top: var(--menu-pad-wide-a);
}

@media (max-width: 750px) {
  #LogsList section {
    padding-top: var(--menu-pad-mobile);
  }
}

img.vessel {
    height: 150px;
}
  
  
ul.vessels-list li {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 2px;
  padding: 2px;
  background-color:aquamarine;
  border-radius: 30px;
  border: 5px solid red;  
}  
  
.label {
  font-weight: bolder;
  float: left;
}  

.value {
  float:right;
}

h4.title {
  margin-bottom: 25px;
}
    
.tableBlock {
  min-width: 220px;
  background-color: aquamarine; 
  padding: 10px;
}

.tableBlock h4 {
  font-size: 1.5rem;
}

.dirWrapper {
  text-align: center;
}

.shipBoxData {
  background-color: white;
  opacity: .5;
  font-weight: 600;
  transform: translateY(-30px);
  padding-left: 5px;
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

img.dir-img {
  margin-left: auto;
  margin-right: auto;
  height: 25px;
  filter: drop-shadow(2px 2px 4px #4444dd);
}

.holder {
  display:flex; 
  align-items: center;
}

#topbtn {
    background-color: greenyellow;
    border: 4px solid black;
    text-align: center;
    border-radius: 10%; 
    padding: 10px;
    font-weight: bold;
    position: fixed;
    bottom: 30px;
    right: 15px;
    opacity: 0;
    transition: opacity 0.5s;
}

#topbtn.active {
  opacity: 1;
  transition: opacity 0.5s;
  cursor: pointer;
}

.btn {
  transform: translateX(35px);
}

.pill:hover {
  background-color: #f1f1f1;
}

</style>