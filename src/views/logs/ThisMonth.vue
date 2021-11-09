<template>
 <LogsSubMenu></LogsSubMenu>
  <div id="main" class="thisMonth">
    <h1>{{this.$store.getters.getThisMonth.length}} Vessel Passage<span v-if='this.$store.getters.getThisMonth.length != 1'>s</span> This Month</h1>
    <h4>{{ this.formattedRange }}</h4>
    <main>
    <ul class="vessels-list" v-for="vessel in this.$store.getters.getThisMonth" :key="vessel.vesselID">
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
          <h4>{{vessel.alphaDO.toLocaleDateString() }}</h4>
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
  },
  beforeUpdate() {
    this.$store.commit('setSlate', 'LOGS')
  },
  data: function() {
    return {
      logoImgUrl: process.env.VUE_APP_BASE_URL+'/images/logo-towboat2.png',
      logoImgAlt: 'The logo image shows a tow boat pushing 9 barges.',
      urlAbout: process.env.VUE_APP_BASE_URL+'/about',
      urlAlerts: process.env.VUE_APP_BASE_URL+'/alerts',
      urlLive: process.env.VUE_APP_BASE_URL+'/livescan/live',
      urlManage: process.env.VUE_APP_BASE_URL+'/manage',
      urlVideo: process.env.VUE_APP_BASE_URL+'/video',
      slate: 'LOGS'
    }
  },
  computed: {
    formattedRange() {
      return "Range is "+
      format(this.$store.state.a.ranges.thisMonth.lo*1000, 'h:mmaaa eeee, LLL do') +
      " to " +
      format(this.$store.state.a.ranges.thisMonth.hi*1000, 'h:mmaaa eeee, LLL do')

    }
  },
  components: {
    LogsSubMenu
  }
}
</script>

<style>
main {
  width: 80%;
  margin: 20px auto 20px auto;
}

img.vessel {
    height: 150px;
}
  
  
ul.vessels-list li {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  background-color:rgb(207, 241, 240);
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

    
.tableBlock {
  min-width: 220px;
  
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
  margin-left: 50% auto;
  display:flex; 
}

.btn {
  transform: translateX(35px);
}

.pill:hover {
  background-color: #f1f1f1;
}

</style>