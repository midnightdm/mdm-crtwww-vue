<template>
  <div id="main" class="today">
<h2>Vessel Passages Today</h2>
<h4>Day is {{ this.$store.getters.dd }} </h4>

<ul v-for="vessel in this.$store.getters.getToday" :key="vessel.vesselID">
  <li>
    <div>{{ vessel.date }}</div>
    <div>{{ vessel.passageDirection}}</div>
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