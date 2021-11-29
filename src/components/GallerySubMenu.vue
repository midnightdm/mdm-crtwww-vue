<template>
  <ul class="nav2">
    <li class="nav-link"><router-link :to="{name: 'Comments'}">Comments</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Image'}">Image</router-link></li> |
    <li class="nav-link"><router-link :to="{name: 'Video'}">Video</router-link></li>
    
    

</ul>
</template>

<script>
export default {
    name: 'GallerySubMenu'
}
</script>

<style>

</style>