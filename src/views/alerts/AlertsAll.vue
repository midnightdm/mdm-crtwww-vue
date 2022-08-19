<template>
  
  <main id="AlertsAll">
    <section>
      <h1 class="mobile">All Vessels</h1>
      <ul>
<transition-group enter-active-class="animate__animated animate__slideInRight">
      <li class="card" v-if="this.$store.state.a.alertsAll[19].apubID >-1" :key="this.$store.state.a.alertsAll[19].apubID" @click="routeWP(19)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[19].apubID}}">{{this.$store.state.a.alertsAll[19].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[19].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[19].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[18].apubID >-1"
        :key="this.$store.state.a.alertsAll[18].apubID" @click="routeWP(18)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[18].apubID}}">{{this.$store.state.a.alertsAll[18].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[18].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[18].apubText}}</p>
      </li>
</transition-group>
    
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[17].apubID >-1" :key="this.$store.state.a.alertsAll[17].apubID" @click="routeWP(17)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[17].apubID}}">{{this.$store.state.a.alertsAll[17].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[17].date"/></h4>
       <p> {{this.$store.state.a.alertsAll[17].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[16].apubID >-1" :key="this.$store.state.a.alertsAll[16].apubID" @click="routeWP(16)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[16].apubID}}">{{this.$store.state.a.alertsAll[16].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[16].date"/></h4>
       <p> {{this.$store.state.a.alertsAll[16].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[15].apubID >-1" :key="this.$store.state.a.alertsAll[15].apubID" @click="routeWP(15)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[15].apubID}}">{{this.$store.state.a.alertsAll[15].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[15].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[15].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[14].apubID >-1" :key="this.$store.state.a.alertsAll[14].apubID" @click="routeWP(14)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[14].apubID}}">{{this.$store.state.a.alertsAll[14].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[14].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[14].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[13].apubID >-1" :key="this.$store.state.a.alertsAll[13].apubID" @click="routeWP(13)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[13].apubID}}">{{this.$store.state.a.alertsAll[13].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[13].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[13].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[12].apubID >-1" :key="this.$store.state.a.alertsAll[12].apubID" @click="routeWP(12)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[12].apubID}}">{{this.$store.state.a.alertsAll[12].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[12].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[12].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[11].apubID >-1" :key="this.$store.state.a.alertsAll[11].apubID" @click="routeWP(11)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[11].apubID}}">{{this.$store.state.a.alertsAll[11].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[11].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[11].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[10].apubID >-1" :key="this.$store.state.a.alertsAll[10].apubID" @click="routeWP(10)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[10].apubID}}">{{this.$store.state.a.alertsAll[10].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[10].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[10].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[9].apubID >-1" :key="this.$store.state.a.alertsAll[9].apubID" @click="routeWP(9)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[9].apubID}}">{{this.$store.state.a.alertsAll[9].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[9].date"/></h4>
           <p> {{this.$store.state.a.alertsAll[9].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[8].apubID >-1" :key="this.$store.state.a.alertsAll[8].apubID" @click="routeWP(8)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[8].apubID}}">{{this.$store.state.a.alertsAll[8].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[8].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[8].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[7].apubID >-1" :key="this.$store.state.a.alertsAll[7].apubID" @click="routeWP(7)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[7].apubID}}">{{this.$store.state.a.alertsAll[7].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[7].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[7].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[6].apubID >-1" :key="this.$store.state.a.alertsAll[6].apubID" @click="routeWP(6)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[6].apubID}}">{{this.$store.state.a.alertsAll[6].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[6].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[6].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[5].apubID >-1" :key="this.$store.state.a.alertsAll[5].apubID" @click="routeWP(5)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[5].apubID}}">{{this.$store.state.a.alertsAll[5].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[5].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[5].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[4].apubID >-1" :key="this.$store.state.a.alertsAll[4].apubID" @click="routeWP(4)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[4].apubID}}">{{this.$store.state.a.alertsAll[4].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[4].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[4].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[3].apubID >-1" :key="this.$store.state.a.alertsAll[3].apubID" @click="routeWP(3)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[3].apubID}}">{{this.$store.state.a.alertsAll[3].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[3].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[3].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsAll[2].apubID >-1" :key="this.$store.state.a.alertsAll[2].apubID" @click="routeWP(2)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[2].apubID}}">{{this.$store.state.a.alertsAll[2].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[2].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[2].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
    <li class="card" v-if="this.$store.state.a.alertsAll[1].apubID >-1" :key="this.$store.state.a.alertsAll[1].apubID" @click="routeWP(1)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[1].apubID}}">{{this.$store.state.a.alertsAll[1].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime="this.$store.state.a.alertsAll[1].date"/></h4>
        <p>{{this.$store.state.a.alertsAll[1].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
    <li class="card" v-if="this.$store.state.a.alertsAll[0].apubID >-1" :key="this.$store.state.a.alertsAll[0].apubID" @click="routeWP(0)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID:  this.$store.state.a.alertsAll[0].apubID}}">{{ this.$store.state.a.alertsAll[0].apubVesselName}}</router-link>&nbsp;&nbsp; <timeago autoUpdate :datetime=" this.$store.state.a.alertsAll[0].date"/></h4>
        <p>{{ this.$store.state.a.alertsAll[0].apubText}}</p>
      </li>
</transition-group>
      </ul>  
    </section>
  </main>
</template>

<script>
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'
import { onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default {
  created: function () {
    this.$store.dispatch("fetchAllAlerts")
  },
  mounted() {
    this.$store.commit('setSlate', 'ALERTS')
    this.$store.commit('setAlertsLinkActive', true)
    this.$store.commit('setPageSelected', 'AlertsAll')
  },
  unmounted() {
    this.$store.commit('setAlertsLinkActive', false)
    this.$store.commit('setPageSelected', null)
  },
  methods: {
    routeWP(arrKey) {
      //console.log('routeWP('+arrKey+')')
      this.$router.push({ name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsAll[arrKey].apubID } })
    }
  },
  components: {
    AlertsSubMenu
  },
  setup() {
    const store = useStore()
    const stopVoiceWatch = watchEffect( () => {
      if(store.state.a.liveVoiceOn && store.state.a.playApub) {
        playWaypoint()
      }
      if(store.state.a.liveVoiceOn && store.state.a.playVpub) {
        playAnnouncement()
      } 
    })

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

    onMounted(async () => {
      store.commit("initLiveScan", store)
      store.dispatch("fetchVoiceNotices");    
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
      
    })

    let keysPressed = {}
  }
  
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400');


#AlertsAll section {
  padding-top: 170px;
}

.mobile {
  visibility: hidden;
}

@media (max-width: 750px) {
  #AlertsAll section {
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

li.card {
    list-style: none;
    color: black;
    font-family: 'Fira Sans';
    background-color: aquamarine;
    margin: 5px;
    border-radius: 30px;
    border: 5px solid red;
    margin: 25px;
    cursor: grab;
    
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

</style>