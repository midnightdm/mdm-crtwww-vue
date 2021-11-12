<template>
  <AlertsSubMenu></AlertsSubMenu>
  <main>
  <ul>
    <li v-for="alert in alerts" :key="alert.apubID">
      <h4><router-link :to="{name: 'Waypoint', route: '/alerts/waypoint', params: { apubID: alert.apubID}}">{{alert.apubVesselName}}</router-link> <timeago :datetime="alert.date"/></h4>
      {{alert.apubText}}
    </li>
  </ul>
  </main>
</template>

<script>
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'




export default {
    mounted() {
      this.$store.dispatch('fetchPassengerAlerts')
      this.$store.commit('setSlate', 'ALERTS')
    },
    beforeUpdate() {
      this.$store.commit('setSlate', 'ALERTS')
    },
    data: function() {
      return {
        alerts: this.getAlerts()
      }
    },
    methods: {
      getAlerts() {
        return this.$store.state.a.alertsPassenger
      }
    },     
    components: {
        AlertsSubMenu,
    }
}
</script>

<style>

</style>