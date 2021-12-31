<template>
  <ul class="navigation">
    <li><router-link class="nav-link sub" ref="" :to="{name: 'Today'}" :class="{selected: this.$store.state.a.pageSelected=='Today'}">Today</router-link></li>
    <li><router-link class="nav-link sub" :to="{name: 'Past24'}" :class="{selected: this.$store.state.a.pageSelected=='Past24'}">24 Hours</router-link></li> 
    <li><router-link class="nav-link sub" :to="{name: 'Yesterday'}" :class="{selected: this.$store.state.a.pageSelected=='Yesterday'}">Yesterday</router-link></li>
    <li><router-link class="nav-link sub" :to="{name: 'Past7'}" :class="{selected: this.$store.state.a.pageSelected=='Past7'}">7 Days</router-link></li>
    <li><router-link class="nav-link sub" :to="{name: 'ThisMonth'}" :class="{selected: this.$store.state.a.pageSelected=='ThisMonth'}">This Month</router-link></li>
    <li><router-link class="nav-link sub" :to="{name: 'LastMonth'}" :class="{selected: this.$store.state.a.pageSelected=='LastMonth'}">Last Month</router-link></li>
  </ul>

</template>

<script>
export default {
    name: 'LogsSubMenu',
}
</script>

<style>

</style>