<template>

    <AboutClinton v-if="this.region=='clinton'" v-bind:id="id"></AboutClinton>
    <AboutQC v-if="this.region=='qc'" v-bind:id="id"></AboutQC>
  
</template>

<script>
import AboutClinton from '@/components/AboutClinton.vue'
import AboutQC from '@/components/AboutQC.vue'

export default {
  props: ['id'],
  data() {
      return {
          base: process.env.VUE_APP_IMG_URL,
          region: process.env.VUE_APP_REGION           
      }
    },
  components: {
    AboutClinton,
    AboutQC
   
  }
}
</script>