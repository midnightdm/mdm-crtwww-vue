<template>
  <div id="map" ref="mapDiv" style="width: 100%; height: 80vh"></div>
</template>

<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { firestore } from '@/store/firebaseApp.js'
//import { Loader } from '@googlemaps/js-api-loader'
//const MAP_KEY = process.env.VUE_APP_MAP_KEY

//const goo = google

export default {
  name: 'Map',
  setup() {
    const store = useStore()

    function initMap(mapDomRef) {
      store.dispatch("initMap", mapDomRef)
    }

     async function initLiveScan(payload) {
      await store.dispatch("initLiveScan", payload)
      if(typeof store.state.a.google != undefined) {
        return true
      }
    }

    function deleteOldScans() {
      store.dispatch("deleteOldScans")
    }

    function toggleMileLabels() {
      store.dispatch("toggleMileLabels")
    }

    //const loader = new Loader({ apiKey: MAP_KEY })
    const mapDiv = ref(null)
    //const map    = ref(null)
    //const google = ref(null)
    const liveScan = ref(null)
    /*
    onMounted(async () => {
      initLiveScan(goo).then(()=>{
        initMap(mapDiv.value)
        //google.value   = store.state.a.google
        //map.value      = store.state.a.map
        liveScan.value = store.state.a.liveScan
      })
    })
    return { mapDiv, liveScan, toggleMileLabels, deleteOldScans, initMap, initLiveScan }
    */
  }  

}
</script>

<style>

</style>