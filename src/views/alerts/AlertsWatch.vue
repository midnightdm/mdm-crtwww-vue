<template>
  <main id="AlertsWatch">
    <section>
      <h1>Watch List</h1>
      
      <p class="boxA">The vessels listed here trigger alerts in our Passenger Vessel category. Click <router-link class="nav-link" :to="{name: 'Manage'}" :class="{selected: this.$store.state.a.pageSelected=='Manage'}">NOTIFICATIONS</router-link> to register your device to receive free notifications when ever one crosses a waypoint of your choosing.</p>
      <table loading class="boxB">
        <thead>
          <tr>
            <th>Index</th>  
            <th>Type</th>
            <th>Name</th>
            <th>MMSI</th>
            
            
            <th></th>
          </tr>
        </thead>
        <tbody >          
          <tr v-for='(vessel, idx) in this.$store.getters.getVesselsWatchOnOnly' :key='vessel.vesselID'>
            <td class="col_r" >{{ idx }}</td>
            <td class="col_r">{{ vessel.vesselType}}</td>
            <td><h4 class="inTable">{{ vessel.vesselName}}</h4></td>
            <td  >{{vessel.vesselID}}</td>
                
            
            <td><img :src="vessel.vesselImageUrl" height="100"/></td>
          </tr>
          
        </tbody>
      </table>           
   

    </section>
  
  </main>
</template>

<script>
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'
export default {
  created() {
    this.$store.dispatch("fetchAllVessels")
  },
  mounted() {
    this.$store.commit('setSlate', 'ALERTS')
    this.$store.commit('setAlertsLinkActive', true)
    this.$store.commit('setPageSelected', 'AlertsWatch')
  },
  unmounted() {
    this.$store.commit('setPageSelected', null)
  },   
  components: {
      AlertsSubMenu,
  }
}
</script>

<style scoped>
#AlertsWatch section {
  padding-top: 130px;
}

@media (max-width: 750px) {
  #AlertsWatch section {
    padding-top: 80px;
  }
}



section {
  margin: 1rem;
}

p {
  color:rgb(160, 250, 16);
  border-radius: 8px;
  background-color: rgb(104, 10, 10); 
  padding: 1rem;
  margin-bottom: 3rem;
  width: 20rem;
  font-size: 16px;
}

</style>