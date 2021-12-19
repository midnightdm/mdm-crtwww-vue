<template>
 
  <GoogleMap
   :api-key="apiKey"
   style="width: 100vw; max-width: 1100px; height: 50vh;"
   :center="store.state.a.map.center"
   :zoom="store.state.a.map.zoom"
   :mapTypeId="store.state.a.map.mapTypeId"
   >

    <Marker   v-for="vessel in store.state.a.liveScans" :key="vessel.id" :options="vessel.marker" />
    <Polyline v-for="item in store.state.a.polylines" :key="item.name" :options="item" />
    <Polyline v-for="mile in store.state.a.mileMarkersList" :key="mile.name" :options="mile"/>
    <div v-if="store.state.a.infoOn">
      <Marker v-for="label in store.state.a.mileMarkerLabels" :key="label.title" :options="label"/>
    </div>
 
   </GoogleMap>
</template>

<script>

import { computed, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
//import { firestore } from '@/store/firebaseApp.js'

import { GoogleMap, Marker, Polyline } from 'vue3-google-map'

export default {
  name: 'Map',
  components: { GoogleMap, Marker, Polyline },
  setup() {
    const apiKey = process.env.VUE_APP_MAP_KEY
    const store = useStore()

    function initMap() {
      store.dispatch("initMap")
    }

    function toggleMileLabels() {
      store.dispatch("toggleMileLabels")
    }
 
    onMounted(async () => {
      initMap()
    })
    
    return { initMap, store, toggleMileLabels, apiKey}
    
  }  

}
</script>

<style>

</style>