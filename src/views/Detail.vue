<template>
  <div id="main" class="detail">
    
<h2><span>{{ this.$store.getters.getVesselName }}</span> Passages</h2>
<p>This log shows the direction and time this vessel passed each of the waypoints tracked by the Clinton River Traffic website.</p>

<!-- -->

<table class="labelColumn">
<tr>
    <th>Waypoint</th>
    <td class="dataHolder" rowspan="6"></td>
  </tr>
  <tr>
    <th>3 Miles Above Dam</th>
  </tr>  
  <tr>
    <th>Lock &amp; Dam 13</th>
  </tr>
  <tr>
    <th>Railroad Drawbridge</th>
  </tr>
  <tr>
    <th>3 Miles Below Drawbridge</th>  
  </tr>  
</table>

<!-- Label Table (Left) -->




<table class="dataColumn">
<tr>
    <th v-for='alpha in this.$store.state.a.historyCache.vesselPassages.alpha' :key='alpha.date' colspan="2">{{ alpha.date.toLocaleDateString() }}</th>
  </tr>
  <tr>
    <template v-for='alpha in this.$store.getters.getAlpha' :key='alpha.date'>    
    <td>
      <img v-if='alpha.dir == "up"' class="dir-img" src='@/assets/images/uparr.png' alt="Up river indicator is present." height="25" />
      <img v-if='alpha.dir == "down"' class="dir-img" src='@/assets/images/dwnarr.png' alt="Down river indicator is present." height="25"/>
    </td>
    <td> {{ alpha.date.toLocaleTimeString() }} </td>
    </template> 
  </tr>  
  <tr>
    <template v-for='bravo in this.$store.getters.getBravo' :key='bravo.date'>    
    <td >
      <img v-if='bravo.dir == "up"' class="dir-img" src='@/assets/images/uparr.png' alt="Up river indicator is present." height="25"/>
      <img v-if='bravo.dir == "down"' class="dir-img" src='@/assets/images/dwnarr.png' alt="Down river indicator is present." height="25"/>
    </td>
    <td> {{ bravo.date.toLocaleTimeString() }} </td>
    </template> 
  </tr>
  <tr>
    <template v-for='charlie in this.$store.getters.getCharlie' :key='charlie.date'>    
    <td >
      <img v-if='charlie.dir == "up"'    class="dir-img" src='@/assets/images/uparr.png' alt="Up river indicator is present." height="25"/>
      <img v-if='charlie.dir == "down"' class="dir-img" src='@/assets/images/dwnarr.png' alt="Down river indicator is present." height="25" />
      </td>
    <td> {{ charlie.date.toLocaleTimeString() }} </td>
    </template>
  </tr>
  <tr>
    <template v-for='delta in this.$store.getters.getDelta' :key='delta.date'>    
    <td >
      <img v-if='delta.dir == "up"' class="dir-img" src='@/assets/images/uparr.png' alt="Up river indicator is present." height="25" />
      <img v-if='delta.dir == "down"' class="dir-img" src='@/assets/images/dwnarr.png' alt="Down river indicator is present." height="25" />
    </td>
    <td> {{ delta.date.toLocaleTimeString() }} </td>
    </template>
  </tr>  
</table>


<div class="img-container-2">
    <img :src='this.$store.getters.getVesselUrl' :alt='"Shows images of vessel " +this.$store.getters.getVesselName' height="200" />
    <img src="@/assets/images/lock13.jpg" height="200" alt="an ariel view of Lock and Dam 13" />
    <img src="@/assets/images/drawbridge.jpg" height="200" alt="and the Clinton railroad drawbridge" />
    </div>
    

  </div>
</template>

<script>


export default {
  props: ['id'],
  created: function () {
    this.$store.dispatch("fetchPassageHistory", this.id)
  }

}

</script>

<style>
 table.dataColumn {
    width: 900px;
    overflow: scroll;
    float: left;
  }
  
  th, td {
    padding: 5px;
    height: 20px;
  }
  
  tr:nth-child(even) {
    background-color: rgb(153, 158, 158);
  }
  
  tr:nth-child(odd) {
    background-color: rgb(93, 221, 221);
  }
  
  .img-container {
    width: 800px;   
  }
  
  .img-container img { 
    padding: 5px;
    float: right;
  }
  
  .img-container-2 {
    
    width: auto;  
    align-content: center;   
  }
  
  .img-container-2 img { 
    padding: 5px;
    
  }
  
</style>