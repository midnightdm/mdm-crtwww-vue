<template>
 
  <GoogleMap
   :api-key="apiKey"
   :style="'width: 100vw; max-width: 1100px; height:'+ store.state.a.liveMapHeight+'vh;'"
   :center="store.state.a.map.center"
   :zoom="store.state.a.map.zoom"
   :mapTypeId="store.state.a.map.mapTypeId"
   
   >
    <div class="vesselMarkers" v-if="store.state.a.liveScans.length">
      <Marker  v-for="vessel in store.state.a.liveScans" :key="vessel.id" :options="vessel.marker" />
    </div>
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

    function predictMovement() {
      var speed, distance, bearing, point, coords;
      //Loop through live vessels
      store.state.a.liveScans.forEach( (o, key, map) => {
      //Skip if vessel not moving or bogus position data
      if( o.isMoving && (o.lat > 1) && (-o.lng > 1)) {
      //Remove 'kts' from speed & change to int 
      speed = parseInt(o.speed);
      //Multiply knots by 1.852 to get KPH
      speed = speed * 1.852;
      //Ignore unrealistic speed reports.
      if(speed > 50 || speed < 1) {
        return;
      }
      //Divide KPH by 3600 to get kilometers traveled in one second
      distance = speed / 3600;
      //Clean course 
      bearing = parseInt(o.course);
      //Predict next point
      point = calculateNewPositionFromBearingDistance(o.lat, o.lng, bearing, distance);
      //Update view model
      o.lat = point[0];
      o.lng = point[1];
      o.marker.position = { lat: point[0], lng: point[1] };
      coords = getShipSpriteCoords(bearing);
      o.marker.icon.origin = {x: coords[0], y: coords[1] }; 
      //Reintegrate updated object into original array
      map[key] = o;
      console.log(o.name+' '+o.lat+' '+o.lng)    
    } 

    function calculateNewPositionFromBearingDistance(lat, lng, bearing, distance) {
      var R = 6371; // Earth Radius in Km
      var lat2 = Math.asin(Math.sin(Math.PI / 180 * lat) * Math.cos(distance / R) + Math.cos(Math.PI / 180 * lat) * Math.sin(distance / R) * Math.cos(Math.PI / 180 * bearing));
      var lon2 = Math.PI / 180 * lng + Math.atan2(Math.sin( Math.PI / 180 * bearing) * Math.sin(distance / R) * Math.cos( Math.PI / 180 * lat ), Math.cos(distance / R) - Math.sin( Math.PI / 180 * lat) * Math.sin(lat2));
      return [180 / Math.PI * lat2 , 180 / Math.PI * lon2];
    }

    function getShipSpriteCoords(course) {
      if(course >=   0 && course <=  15) return [  0,   0];
      if(course >=  16 && course <=  30) return [ 55,   0];
      if(course >=  31 && course <=  45) return [110,   0];
      if(course >=  46 && course <=  60) return [165,   0];
      if(course >=  61 && course <=  75) return [220,   0];
      if(course >=  76 && course <=  90) return [275,   0];
      if(course >=  91 && course <= 105) return [  0,  55];
      if(course >= 106 && course <= 120) return [ 55,  55];
      if(course >= 121 && course <= 135) return [110,  55];
      if(course >= 136 && course <= 150) return [165,  55];
      if(course >= 151 && course <= 165) return [220,  55];
      if(course >= 166 && course <= 180) return [275,  55];
      if(course >= 181 && course <= 195) return [  0, 110];
      if(course >= 196 && course <= 210) return [ 55, 110];
      if(course >= 211 && course <= 225) return [110, 110];
      if(course >= 226 && course <= 240) return [165, 110];
      if(course >= 241 && course <= 255) return [220, 110];
      if(course >= 256 && course <= 270) return [275, 110];
      if(course >= 271 && course <= 285) return [  0, 165];
      if(course >= 286 && course <= 300) return [ 55, 165];
      if(course >= 301 && course <= 315) return [110, 165];
      if(course >= 316 && course <= 330) return [165, 165];
      if(course >= 331 && course <= 345) return [220, 165];
      if(course >= 346)                  return [275, 165];
      else                               return [  0,   0];
    }

  });  
}
 
    onMounted(async () => {
      initMap()
      setInterval(predictMovement, 1000)
    })
    
    return { initMap, store, toggleMileLabels, apiKey}
    
  }  

}
</script>

<style>

</style>