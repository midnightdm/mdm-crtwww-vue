<template>
  <ul class="navigation">
    <li><router-link class="nav-link" :to="{name: 'Comments'}" :class="{selected: this.$store.state.a.pageSelected=='Comments'}">Comments</router-link></li>
    <li><router-link class="nav-link" :to="{name: 'Image'}" :class="{selected: this.$store.state.a.pageSelected=='Image'}">Image</router-link></li> 
    <li><router-link class="nav-link" :to="{name: 'Video'}" :class="{selected: this.$store.state.a.pageSelected=='Video'}">Video</router-link></li>
</ul>
</template>

<script>
export default {
    name: 'GallerySubMenu',

}
</script>

<style>

</style>