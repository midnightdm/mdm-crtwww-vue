<template>
  <ul class="navigation">
    <li><router-link class="nav-link sub" :class="{selected: this.$store.state.a.pageSelected=='AlertsDual'}" :to="{name: 'AlertsDual'}">EVENTS</router-link></li>
    <li><router-link class="nav-link sub" :to="{name: 'AlertsWatch'}" :class="{selected: this.$store.state.a.pageSelected=='AlertsWatch'}">WATCHLIST</router-link></li>
    <li><router-link class="nav-link sub" :to="{name: 'Manage'}" :class="{selected: this.$store.state.a.pageSelected=='Manage'}">NOTIFICATIONS</router-link></li>
</ul>
</template>

<script>
export default {
    name: 'AlertsSubMenu',

}
</script>

<style>

</style>