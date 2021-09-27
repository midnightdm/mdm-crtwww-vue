<template>
  <ul class="nav2">
    <li class="nav-link"><router-link :to="{name: 'Today'}">Today</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Past24'}">Past 24 Hours</router-link></li> |
    <li class="nav-link"><router-link :to="{name: 'Yesterday'}">Yesterday</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Past7'}">Past 7 Days</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'ThisMonth'}">This Month</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'LastMonth'}">Last Month</router-link></li>
</ul>
</template>

<script>
export default {
    name: 'LogsSubMenu'
}
</script>

<style>

</style>