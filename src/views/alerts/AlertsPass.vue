<template>
  
  <main id="AlertsPass">
    <section>
      <h1 class="mobile">Passenger Vessels</h1>
      <ul>
<transition-group enter-active-class="animate__animated animate__slideInRight">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[19].apubID >-1" :key="this.$store.state.a.alertsPassenger[19].apubID" @click.prevent="routeWP(19)">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[19].apubID}}">{{this.$store.state.a.alertsPassenger[19].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[19].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[19].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[18].apubID >-1"
        :key="this.$store.state.a.alertsPassenger[18].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[18].apubID}}">{{this.$store.state.a.alertsPassenger[18].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[18].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[18].apubText}}</p>
      </li>
</transition-group>
    
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[17].apubID >-1" :key="this.$store.state.a.alertsPassenger[17].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[17].apubID}}">{{this.$store.state.a.alertsPassenger[17].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[17].date"/></h4>
       <p> {{this.$store.state.a.alertsPassenger[17].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[16].apubID >-1" :key="this.$store.state.a.alertsPassenger[16].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[16].apubID}}">{{this.$store.state.a.alertsPassenger[16].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[16].date"/></h4>
       <p> {{this.$store.state.a.alertsPassenger[16].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[15].apubID >-1" :key="this.$store.state.a.alertsPassenger[15].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[15].apubID}}">{{this.$store.state.a.alertsPassenger[15].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[15].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[15].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[14].apubID >-1" :key="this.$store.state.a.alertsPassenger[14].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[14].apubID}}">{{this.$store.state.a.alertsPassenger[14].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[14].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[14].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[13].apubID >-1" :key="this.$store.state.a.alertsPassenger[13].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[13].apubID}}">{{this.$store.state.a.alertsPassenger[13].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[13].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[13].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[12].apubID >-1" :key="this.$store.state.a.alertsPassenger[12].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[12].apubID}}">{{this.$store.state.a.alertsPassenger[12].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[12].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[12].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[11].apubID >-1" :key="this.$store.state.a.alertsPassenger[11].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[11].apubID}}">{{this.$store.state.a.alertsPassenger[11].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[11].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[11].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[10].apubID >-1" :key="this.$store.state.a.alertsPassenger[10].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[10].apubID}}">{{this.$store.state.a.alertsPassenger[10].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[10].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[10].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[9].apubID >-1" :key="this.$store.state.a.alertsPassenger[9].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[9].apubID}}">{{this.$store.state.a.alertsPassenger[9].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[9].date"/></h4>
           <p> {{this.$store.state.a.alertsPassenger[9].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[8].apubID >-1" :key="this.$store.state.a.alertsPassenger[8].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[8].apubID}}">{{this.$store.state.a.alertsPassenger[8].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[8].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[8].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[7].apubID >-1" :key="this.$store.state.a.alertsPassenger[7].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[7].apubID}}">{{this.$store.state.a.alertsPassenger[7].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[7].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[7].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[6].apubID >-1" :key="this.$store.state.a.alertsPassenger[6].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[6].apubID}}">{{this.$store.state.a.alertsPassenger[6].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[6].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[6].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[5].apubID >-1" :key="this.$store.state.a.alertsPassenger[5].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[5].apubID}}">{{this.$store.state.a.alertsPassenger[5].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[5].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[5].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[4].apubID >-1" :key="this.$store.state.a.alertsPassenger[4].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[4].apubID}}">{{this.$store.state.a.alertsPassenger[4].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[4].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[4].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[3].apubID >-1" :key="this.$store.state.a.alertsPassenger[3].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[3].apubID}}">{{this.$store.state.a.alertsPassenger[3].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[3].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[3].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
      <li class="card" v-if="this.$store.state.a.alertsPassenger[2].apubID >-1" :key="this.$store.state.a.alertsPassenger[2].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[2].apubID}}">{{this.$store.state.a.alertsPassenger[2].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[2].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[2].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
    <li class="card" v-if="this.$store.state.a.alertsPassenger[1].apubID >-1" :key="this.$store.state.a.alertsPassenger[1].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: this.$store.state.a.alertsPassenger[1].apubID}}">{{this.$store.state.a.alertsPassenger[1].apubVesselName}}</router-link> <timeago autoUpdate :datetime="this.$store.state.a.alertsPassenger[1].date"/></h4>
        <p>{{this.$store.state.a.alertsPassenger[1].apubText}}</p>
      </li>
</transition-group>
<transition-group enter-active-class="animate__animated animate__slideInDown">
    <li class="card" v-if="this.$store.state.a.alertsPassenger[0].apubID >-1" :key="this.$store.state.a.alertsPassenger[0].apubID">
        <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID:  this.$store.state.a.alertsPassenger[0].apubID}}">{{ this.$store.state.a.alertsPassenger[0].apubVesselName}}</router-link> <timeago autoUpdate :datetime=" this.$store.state.a.alertsPassenger[0].date"/></h4>
        <p>{{ this.$store.state.a.alertsPassenger[0].apubText}}</p>
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
    this.$store.dispatch("fetchPassengerAlerts")
  },
  mounted() {
    this.$store.commit('setSlate', 'ALERTS')
    this.$store.commit('setAlertsLinkActive', true)
    this.$store.commit('setPageSelected', 'AlertsPass')
  },
  unmounted() {
    this.$store.commit('setAlertsLinkActive', false)
    this.$store.commit('setPageSelected', null)
  }, 
  methods: {
    routeWP(arrKey) {
      console.log('routeWB('+arrKey+')')
      this.$router.push({ name: 'Waypoint', params: { apubID: this.$store.state.a.alertsPassenger[arrKey].apubID } })
    }
  },
  components: {
    AlertsSubMenu,
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

#AlertsPass section {
  padding-top: 170px;
}

.mobile {
  visibility: hidden;
}

@media (max-width: 750px) {
  #AlertsPass section {
    padding-top: var(--menu-pad-mobile);
  }
  .mobile {
    padding-bottom: 0;
    visibility: visible;
  }
  li:first-child.card {
    margin-top: 0;
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