<template>
 <ul class="nav2">
    <li class="nav-link"><router-link :to="{name: 'Today'}">Today</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Past24'}">Past 24 Hours</router-link></li> |
    <li class="nav-link"><router-link :to="{name: 'Yesterday'}">Yesterday</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Past7'}">Past 7 Days</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'ThisMonth'}">This Month</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'LastMonth'}">Last Month</router-link></li>
  </ul>
<div id="main" class="past7">
    <h1>{{this.$store.getters.getPast7.length}} Vessel Passage<span v-if='this.$store.getters.getPast7.length != 1'>s</span> in the Past 7 Days</h1>
    <h4>{{ this.formattedRange }}</h4>
<ul class="vessels-list" v-for="vessel in this.$store.getters.getPast7" :key="vessel.vesselID">
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
      <p><span class="label">BRIDGE :</span> {{ vessel.charlieDO.toLocaleTimeString() }}</p>
      <p><span class="label">LOCK 13:</span> {{ vessel.bravoDO.toLocaleTimeString() }}</p>
    </div>

    <div class="tableBlock holder">
      <router-link class="pill" :to="{ name: 'Detail', params: { id: vessel.passageVesselID}}">History</router-link>
    </div>
   
  </li>
</ul>

  </div>
</template>

<script>
import format from 'date-fns/format'

export default {
  created: function () {
    this.$store.dispatch("fetchCurrentMonth")
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
      format(this.$store.state.a.ranges.past7.lo*1000, 'h:mmaaa eeee, LLL Mo') +
      " to " +
      format(this.$store.state.a.ranges.past7.hi*1000, 'h:mmaaa eeee, LLL Mo')

    }
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
  font-weight: bolder;
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

.pill:hover {
  background-color: #f1f1f1;
}

</style>