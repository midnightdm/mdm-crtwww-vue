<template>
  <LogsList 
  rangeName='past24' 
  getterName='getPast24'
  pageSelected='Past24'
  pageTitle='Past 24 Hours'
  ></LogsList>
</template>

<script>
import LogsList from '@/components/LogsList.vue'

export default {
  components: {
    LogsList
  }
}
</script>

<style>

</style>