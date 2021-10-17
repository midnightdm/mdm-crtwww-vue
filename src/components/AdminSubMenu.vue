<template>
  <ul class="nav2">
    <li class="nav-link"><router-link :to="{name: 'Login'}">Today</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Add'}">Past 24 Hours</router-link></li> |
    <li class="nav-link"><router-link :to="{name: 'All'}">Yesterday</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Passenger'}">Past 7 Days</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Subscribers'}">This Month</router-link></li>

</ul>
</template>

<script>
export default {
    name: 'AdminSubMenu'
}
</script>

<style>

</style>