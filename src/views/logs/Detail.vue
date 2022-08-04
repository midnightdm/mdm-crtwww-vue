<template>
  <LogsDetailClinton 
  v-if="this.region=='clinton'" 
  v-bind:id="id" 
  ></LogsDetailClinton>
    <LogsDetailQC v-if="this.region=='qc'"  
  v-bind:id="id" 
  ></LogsDetailQC>
</template>

<script>
//import LogsDetailClinton from '@/components/LogsDetailClinton.vue'
//import LogsDetailQC from '@/components/LogsDetailQC.vue'

export default {
  props: ['id'],
  data() {
      return {
          base: process.env.VUE_APP_IMG_URL,
          region: process.env.VUE_APP_REGION           
      }
    },
  components: {
    LogsDetailClinton: () => import('@/components/LogsDetailClinton.vue'),
    LogsDetailQC:      () => import('@/components/LogsDetailQC.vue')
  }
}
</script>








