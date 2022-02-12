<template>
  <LogsList 
  rangeName='lastMonth' 
  getterName='getLastMonth'
  pageSelected='LastMonth'
  pageTitle='Last Month'
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