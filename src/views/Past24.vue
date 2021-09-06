<template>
  <div id="main" class="past24">
    <h1>This is the Past 24 Hours page</h1>
<h4>Day is {{ this.$store.getters.dd }} </h4>

<ul v-for="vessel in this.$store.getters.getPast24" :key="vessel.vesselID">
  <li>
    <div>{{ vessel.date }}</div>
    <div>{{ vessel.passageDirection}}</div>
        <div>{{ vessel.vesselName}}</div>
    <img :src="vessel.vesselImageUrl" />
  </li>
</ul>

  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  created: function () {
    this.$store.dispatch("fetchCurrentMonth")
  }
}
</script>