<template>
  <ul id="asub" class="navigation">
    <li class="nav-link sub"><router-link :to="{name: 'Add'}">Add</router-link></li> 
    <li class="nav-link sub"><router-link :to="{name: 'AdminVessels'}">Vessels</router-link></li>
    <li class="nav-link sub"><router-link :to="{name: 'Subscriptions'}">Subscriptions</router-link></li>
    <li class="nav-link sub"><router-link :to="{name: 'AdminAnnouncements'}"> Dashboard</router-link></li>
      <li class="nav-link sub"><router-link :to="{name: 'AdminWebcam'}"> Webcam</router-link></li>
  </ul>
</template>

<script>

export default {
    name: 'AdminSubMenu',
}
</script>

<style>
.navigation .nav-link {
    font-size: 1.2em;
    padding-bottom: 4px;
    text-transform: uppercase;
}

a, a:visited,
.nav-link, .nav-link:visited {
    font-weight: 500;
    list-style: none;
    color: #fff;
    text-decoration: none;
}

.navigation a.selected,
.navigation router-link.selected {
  background: white;
  color: red;
}

a, a:visited,
.navigation .nav-link:hover,
.dropdown-nav .nav-link:hover {
  color: #00afea;
  border-color: #00afea;
}

.navigation {
  background-color: #31363e;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: 0.5x ease all;
}



.navigation2 {
  flex-direction: column;
  margin-left: 2rem;
}

ul.navigation2 {
  background-color: white; 
}


</style>