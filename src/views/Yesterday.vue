<template>
  <div id="main" class="yesterday">
    <h1>This is the Yesterday page</h1>
<h4>Day is {{ this.$store.getters.dd }} </h4>

<ul class="vessels-list" v-for="vessel in this.$store.getters.getYesterday" :key="vessel.vesselID">
  <li>
    router-link :to="{ name: 'Detail', params: { id: vessel.vesselID}}">
    <h4>{{ vessel.vesselName}}</h4>
    <div>{{ vessel.date }}</div>
    <div>{{ vessel.passageDirection}}</div>
    <div></div>
    <img :src="vessel.vesselImageUrl" />
  </li>
</ul>

  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  created: function () {
    this.$store.dispatch("fetchCurrentMonth")
  }
}
</script>

<style>
img.vessel {
    height: 150px;
  
  }
  
  
  ul .vessels-list {
      display: flex;
      list-style: none;
      margin: 2px;
      padding: 2px;
    
  }  
  
  div .img-container {
    display:flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  
  }
  
  .img-container img {
    float: left;
  }
    
  .shipBox img{
    cursor: grab;
    height: 150px;
  }

  .shipBoxData {
    background-color: white;
    opacity: .5;
    font-weight: 600;
    transform: translateY(-30px);
    padding-left: 5px;
  }



  ul.vessels-list li {
      list-style: none;
      flex-wrap: wrap;
      justify-content: space-between;
      float: left;
      margin: 2px;
      padding: 5px;
      font-family: sans-serif;
      font-size: 12pt;
      letter-spacing: 2px;  
      border: 5px;
      border-color: #31363e; 
  }
  
  ul.vessels-list li h4 {
    margin-bottom: 0;
    padding-bottom: 0;
    line-height: 1;
    
  }

</style>