<template>
  <ul class="nav2">
    <li class="nav-link"><router-link :to="{name: 'AlertsAll'}">All</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'AlertsPass'}">Passenger</router-link></li> |
    <li class="nav-link"><router-link :to="{name: 'AlertsWatch'}">Watchlist</router-link></li>
    <li>|</li>
    <li class="nav-link"><router-link :to="{name: 'Manage'}">Manage Notifications</router-link></li>
    

</ul>
</template>

<script>
export default {
    name: 'AlertsSubMenu'
}
</script>

<style>

</style>