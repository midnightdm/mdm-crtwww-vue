<template>
  
  <main id="AlertsDemo">
    <section>
    <button @click="updateArray">Update</button>
    <ul>
    <transition-group
        
        enter-active-class="animate__animated animate__slideInRight"
                >  
    <li class="card" v-if="this.alerts[4].apubID >-1" :key="this.alerts[4].apubID">
      <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.alerts[4].apubID}}">{{this.alerts[4].apubVesselName}}</router-link> &nbsp;&nbsp;<timeago class="time" :datetime="this.alerts[4].date"/></h4>
      <p>{{this.alerts[4].apubText}}</p>
    </li>
    
    </transition-group>
    <transition-group enter-active-class="animate__animated animate__slideInDown">
    <li class="card" v-if="this.alerts[3].apubID >-1" :key="this.alerts[3].apubID">
      <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.alerts[3].apubID}}">{{this.alerts[3].apubVesselName}}</router-link> &nbsp;&nbsp;<timeago class="time" :datetime="this.alerts[3].date"/></h4>
      <p>{{this.alerts[3].apubText}}</p>
    </li>
    </transition-group>
    <transition-group
        
        enter-active-class="animate__animated animate__slideInDown">
    <li class="card" v-if="this.alerts[2].apubID >-1" :key="this.alerts[2].apubID">
      <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.alerts[2].apubID}}">{{this.alerts[2].apubVesselName}}</router-link> &nbsp;&nbsp;<timeago class="time" :datetime="this.alerts[2].date"/></h4>
      <p>{{this.alerts[2].apubText}}</p>
    </li>
    </transition-group>
    <transition-group
        
        enter-active-class="animate__animated animate__slideInDown">
   <li class="card" v-if="this.alerts[1].apubID >-1" :key="this.alerts[1].apubID">
      <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.alerts[1].apubID}}">{{this.alerts[1].apubVesselName}}</router-link> &nbsp;&nbsp;<timeago class="time" :datetime="this.alerts[1].date"/></h4>
      <p>{{this.alerts[1].apubText}}</p>
    </li>
    </transition-group>
    <transition-group
        
        enter-active-class="animate__animated animate__slideInDown">
   <li class="card" v-if="this.alerts[0].apubID >-1" :key="this.alerts[0].apubID">
      <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID:  this.alerts[0].apubID}}">{{ this.alerts[0].apubVesselName}}</router-link> &nbsp;&nbsp;<timeago class="time" :datetime=" this.alerts[0].date"/></h4>
      <p>{{ this.alerts[0].apubText}}</p>
    </li>
    </transition-group>
  </ul>
  </section>
  </main>
</template>

<script>
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'

function objectQueue(arr, add, size=5) {
  //Returns the updated array
  arr.push(add)
  console.log("arr length: ", arr.length, " size: ", size)
  if(arr.length >=size) {
    arr.shift()
  }
  return arr
}

export default {
  created: function () {
      this.$store.dispatch('fetchPassengerAlerts')
  },
  mounted() {    
    this.$store.commit('setSlate', 'ALERTS')
    this.$store.commit('setPageSelected', 'AlertsDemo')
  },
  data: function() {
    return {
      alerts: [
        {apubVesselName: "Vessel 0", apubID: 10314, apubText: "Alert# 103144: Towing Vessel Christopher Mysko_ki crossed 3 mi S of drawbridge traveling downriver. 11/25/2021 12:44:02pm", date: new Date()},
        {apubVesselName: "Vessel 1", apubID: 10315, apubText: "Alert# 103134: Towing Vessel Prairie Dawn crossed 3 mi S of drawbridge traveling upriver. 11/25/2021 12:27:21pm", date: new Date()},
        {apubVesselName: "Vessel 2", apubID: 10316, apubText: "Alert# 103124: Towing Vessel Christopher Mysko_ki passed the Clinton RR drawbridge traveling downriver. 11/25/2021 12:15:21pm", date: new Date()},
        {apubVesselName: "Vessel 3", apubID: 10317, apubText: "Alert# 103114: Towing Vessel Louisiana Legend passed the Clinton RR drawbridge traveling upriver. 11/25/2021 11:58:21am", date: new Date()},
        {apubVesselName: "Vessel 4", apubID: 10318, apubText: "Alert# 103104: Towing Vessel Christopher Mysko_ki left Lock 13 traveling downriver. 11/25/2021 10:43:41am", date: new Date()}
      ],
      replacements: [
        {apubVesselName: "Vessel 5", apubID: 10319, apubText: "Alert# 103114: Towing Vessel Louisiana Legend passed the Clinton RR drawbridge traveling upriver. 11/25/2021 11:58:21am", date: new Date()},
        {apubVesselName: "Vessel 6", apubID: 10320, apubText: "Alert# 103084: Towing Vessel City Of Cassville Transponder detected. 11/25/2021 09:28:59am Location: 41.787405,-90.242231666667", date: new Date()},
        {apubVesselName: "Vessel 7", apubID: 10321, apubText: "Alert# 103074: Towing Vessel Christopher Mysko_ki crossed 3 mi N of Lock 13 traveling downriver. 11/25/2021 08:38:27am", date: new Date()},
        {apubVesselName: "Vessel 8", apubID: 10322, apubText: "Alert# 103064: Towing Vessel Christopher Mysko_ki Transponder detected. 11/25/2021 07:50:07am Location: 42.003375,-90.14331", date: new Date()},
        {apubVesselName: "Vessel 9", apubID: 10323, apubText: "Alert# 103024: Towing Vessel City Of Cassville left Lock 13 traveling downriver. 11/25/2021 05:06:28am", date: new Date()}
      ],
      rc: 0
    }
  },
  methods: {
    updateArray() {
      let obj = this.replacements[this.rc]
      this.alerts = objectQueue(this.alerts, obj, 5)
      this.rc++
      if(this.rc>this.replacements.length) {
        this.rc = 0
      }
      console.log("alerts 0 is ", this.alerts[0], "rc is ", this.rc)
    }
  },     
  components: {
      AlertsSubMenu
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400');

#AlertsDemo section {
  padding-top: 170px;
}

li.card {
    list-style: none;
    color: black;
    font-family: 'Fira Sans';
    background-color: aquamarine;
    margin: 5px;
    border-radius: 30px;
    border: 5px solid red;
    margin: 25px;
    
}

li.card h4 {
   
   padding: 0px 5px 0px 25px;

}

li.card p {
  font-family: Arial;
  padding: 0px 5px 25px 25px;
}

li.time {
  display: block;
  padding-left: 25px;
}

@media (max-width: 750px) {
  #AlertsDemo section {
    padding-top: var(--menu-pad-mobile);
  }
  .mobile {
    padding-bottom: 5px;
    visibility: visible;
  }

  li:first-child.card {
    margin-top: 5px;
  }
}

</style>