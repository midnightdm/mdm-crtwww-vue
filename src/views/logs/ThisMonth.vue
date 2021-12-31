<template>
  <LogsList 
   rangeName='thisMonth' 
   getterName='getThisMonth'
   pageSelected='ThisMonth'
   pageTitle='This Month'
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