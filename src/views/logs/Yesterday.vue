<template>
  <LogsList 
  rangeName='yesterday' 
  getterName='getYesterday'
  pageSelected='Yesterday'
  pageTitle='Yesterday'
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