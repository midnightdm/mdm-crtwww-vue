<template>
    <main>
        <AlertsWatched class="column"></AlertsWatched>
        <AlertsOther class="column"></AlertsOther>

    </main>
</template>
<script>
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'
import AlertsWatched from '@/components/AlertsWatched.vue'
import AlertsOther from '@/components/AlertsOther.vue'


export default {
  data() {
      return {
          base: process.env.VUE_APP_IMG_URL,
          region: process.env.VUE_APP_REGION           
      }
    },
  components: {
    AlertsSubMenu,
    AlertsWatched,
    AlertsOther

  }
}
</script>
<style>
/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 300px; /* Should be removed. Only for demonstration */
}
</style>