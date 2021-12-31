<template>
  <LogsList 
  rangeName='today' 
  getterName='getToday'
  pageSelected='Today'
  pageTitle='Today'
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