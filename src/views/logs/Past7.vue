<template>
  <LogsList 
  rangeName='past7' 
  getterName='getPast7'
  pageSelected='Past7'
  pageTitle='Past 7 Days'
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