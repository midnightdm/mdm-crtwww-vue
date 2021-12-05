<template>
 <LogsSubMenu></LogsSubMenu>
 <div id="main" class="today">
<h1>{{this.$store.getters.getToday.length}} Vessel Passage<span v-if='this.$store.getters.getYesterday.length != 1'>s</span> Today</h1>
<h4>{{ this.formattedRange }}</h4>
<button v-bind:class="{ active: scrolled}" id="topbtn" @click="topOfPage">Top</button>
<main>
  <ul class="vessels-list" v-for="vessel in this.$store.getters.getToday" :key="vessel.vesselID">
  <li>
      <div class="shipBox tableBlock">
        <img class="shipBox" :src="vessel.vesselImageUrl" width="200" />
      </div>
      <div class="tableBlock">
        
        <h4 class="title">{{ vessel.vesselName }}</h4>
        <img class="icon" v-if='vessel.passageDirection=="upriver"' src='@/assets/images/uparr.png' alt='Upriver indicator' height="25"/>
        <img class="icon" v-if='vessel.passageDirection=="downriver"' src='@/assets/images/dwnarr.png' alt='Downriver indicator' height="25"/>
        <span class="adjacent"> {{vessel.passageDirection}}</span>
      </div>

      <div class="tableBlock">
        <h4>{{vessel.charlieDO.toLocaleDateString() }}</h4>
        <br/>
        <p><span class="label">LOCK 13:</span> <span class="value">{{ vessel.bravoDO.toLocaleTimeString() }}</span></p>
        <p><span class="label">BRIDGE :</span> <span class="value">{{ vessel.charlieDO.toLocaleTimeString() }}</span></p>

      </div>

      <div class="tableBlock holder">
        <router-link class="pill btn" :to="{ name: 'Detail', params: { id: vessel.passageVesselID}}">History</router-link>
      </div>
    
    </li>
  </ul>
</main>
  </div>
</template>

<script>
import { format } from 'date-fns'
import LogsSubMenu from '@/components/LogsSubMenu.vue'

export default {
  created: function () {
    this.$store.dispatch("fetchCurrentMonth")
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.$store.commit('setSlate', 'LOGS')
    this.$store.commit('setLogsLinkActive', true)
  },
  unmounted() {
    this.$store.commit('setLogsLinkActive', false)
  },
  data: function() {
    return {
      logoImgUrl: process.env.VUE_APP_IMG_URL+'/images/logo-towboat2.png',
      logoImgAlt: 'The logo image shows a tow boat pushing 9 barges.',
      urlAbout: process.env.VUE_APP_BASE_URL+'/about',
      urlAlerts: process.env.VUE_APP_BASE_URL+'/alerts',
      urlLive: process.env.VUE_APP_BASE_URL+'/livescan/live',
      urlManage: process.env.VUE_APP_BASE_URL+'/manage',
      urlVideo: process.env.VUE_APP_BASE_URL+'/video',
      scrolled: false
    }
  },
  computed: {
    formattedRange() {
      return "Range is "+
      format(this.$store.state.a.ranges.today.lo*1000, 'h:mmaaa eeee, LLL do') +
      " to " +
      format(this.$store.state.a.ranges.today.hi*1000, 'h:mmaaa eeee, LLL do')
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
  components: {
    LogsSubMenu
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style>
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
}  
  
.label {
  float: left;
  font-weight: bolder;
}

.value {
  float: right;
}

h4.title {
  margin-bottom: 25px;
}
    
.tableBlock {
  min-width: 220px;
  background-color:rgb(207, 241, 240);
  padding: 20px;
}

.icon {
  transform: translateY(10px);
  padding: 5px;
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