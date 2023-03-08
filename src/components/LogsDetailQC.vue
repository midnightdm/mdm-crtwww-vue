<template>
  <section id="History">  
    <div class="detail">    
      <h2><span>{{ this.$store.getters.getVesselName }}</span> Passages
      </h2>
      <p>This log shows the direction and time this vessel passed each of the waypoints tracked by the QC River Traffic website.
      </p>
    </div>

    <table>
      <tr>
        <th id="waypoint" class="labelColumn first">Waypoint</th>
        <td class="dataHolder" rowspan="9">
          <div class="table-container">
            <table class="dataColumn">
              <tr>
                <th v-for='echo in this.$store.state.a.historyCache.vesselPassages.alpha' :key='echo.titleTS' colspan="2">
                  <span>{{ echo.titleTS.toLocaleDateString() }}</span>
                </th>
              </tr>
              <tr>
                <template v-for='echo in this.$store.getters.getEcho' :key='echo'>    
                <td>
                  <img v-if='echo.dir == "up"' class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25" />
                  <img v-if='echo.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25"/>
                </td>
                <td class="time" v-if="echo.date=='---'"> --- </td>
                <td class="time" v-else> {{ echo.date.toLocaleTimeString() }} </td>
                </template> 
              </tr>
              
              <tr>
                <template v-for='foxtrot in this.$store.getters.getFoxtrot' :key='foxtrot.date'>    
                <td>
                  <img v-if='foxtrot.dir == "up"' class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25" />
                  <img v-if='foxtrot.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25"/>
                </td>
                <td class="time" v-if="foxtrot.date=='---'"> --- </td>
                <td class="time" v-else> {{ foxtrot.date.toLocaleTimeString() }} </td>
                </template> 
              </tr>  
              
              <tr>
                <template v-for='m486 in this.$store.getters.getM486' :key='m486.date'>    
                <td >
                  <img v-if='m486.dir == "up"' class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25"/>
                  <img v-if='m486.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25"/>
                </td>
                <td class="time" v-if="m486.date=='---'"> --- </td>
                <td class="time" v-else> {{ m486.date.toLocaleTimeString() }} </td>
                </template> 
              </tr>
              <tr>
                <template v-for='golf in this.$store.getters.getGolf' :key='golf.date'>    
                <td>
                  <img v-if='golf.dir == "up"' class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25" />
                  <img v-if='golf.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25"/>
                </td>
                <td class="time" v-if="golf.date=='---'"> --- </td>
                <td class="time" v-else> {{ golf.date.toLocaleTimeString() }} </td>
                </template> 
              </tr>
              <tr>
                <template v-for='m482 in this.$store.getters.getM482' :key='m482.date'>    
                <td >
                  <img v-if='m482.dir == "up"'    class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25"/>
                  <img v-if='m482.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25" />
                  </td>
                <td class="time" v-if="m482.date=='---'"> --- </td>
                <td class="time" v-else> {{ m482.date.toLocaleTimeString() }} </td>
                </template>
              </tr>
              <tr>
                <template v-for='hotel in this.$store.getters.getHotel' :key='hotel.date'>    
                <td >
                  <img v-if='hotel.dir == "up"' class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25" />
                  <img v-if='hotel.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25" />
                </td>
                <td class="time" v-if="hotel.date=='---'"> --- </td>
                <td class="time" v-else> {{ hotel.date.toLocaleTimeString() }} </td>
                </template>
              </tr>
              <tr>
                <template v-for='m475 in this.$store.getters.getM475' :key='m475.date'>    
                <td>
                  <img v-if='m475.dir == "up"' class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25" />
                  <img v-if='m475.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25"/>
                </td>
                <td class="time" v-if="m475.date=='---'"> --- </td>
                <td class="time" v-else> {{ m475.date.toLocaleTimeString() }} </td>
                </template> 
              </tr>  
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <th class="labelColumn">I-80 Bridge</th>
      </tr> 
      <tr>
        <th class="labelColumn">Lock 14</th>
      </tr>  
      <tr>
        <th class="labelColumn">m486 I-74 Bridge</th>
      </tr>
      <tr>
        <th class="labelColumn">Lock 15</th>
      </tr>
      <tr>
        <th class="labelColumn">m482 Centennial Bridge</th>
      </tr>
      <tr>
        <th class="labelColumn">I-280 Bridge</th>  
      </tr>
            <tr>
        <th class="labelColumn">m475 3.5 Mi Below I-280</th>  
      </tr>
      <tr>
        <th class="labelColumn last"></th>
      </tr>  
    </table>

    <!-- Label Table (Left) -->
    <div class="img-container-2">
      <img :src='this.$store.getters.getVesselUrl' :title='"Shows images of vessel " +this.$store.getters.getVesselName' height="200" />
      <img :src="this.base+'/images/lock13.jpg'" height="200" title="an ariel view of Lock and Dam 13" />
      <img :src="this.base+'/images/drawbridge.jpg'" height="200" title="and the Clinton railroad drawbridge" />
    </div>
  </section>
</template>

<script>
//import LogsSubMenu from '@/components/LogsSubMenu.vue'

export default {
  name: 'LogsDetailQC',
  props: ['id'],
  data() {
      return {
          base: process.env.VUE_APP_IMG_URL,
          region: process.env.VUE_APP_REGION           
      }
    },
  created: function () {
    let region = process.env.VUE_APP_REGION
    console.log("Region is",region, " ID is", this.id)
    this.$store.dispatch("fetchPassageHistory", {vesselID: this.id, region: region} )
  },
  mounted() {
    this.$store.commit('setSlate', 'LOGS')
    //this.$store.commit('setLogsLinkActive', true)
    this.$store.commit('setPageSelected', 'Detail')
  },
  unmounted() {
    this.$store.commit('setLogsLinkActive', false)
  }
  // components: {
  //   LogsSubMenu
  // }

}

</script>

<style>

section#History {
  padding-top: 9rem;
}

.detail {
  transform: translateY(40px);
  width: 100%;
  margin: 20px 20px 20px auto;
  padding: 15px 15px 15px 15px;
}

div.table-container {
  width: 100%;
  max-width: 50vw;
  overflow-x: scroll;
}

table.dataColumn th, table.dataColumn td {
  padding: 5px;
  height: 20px;
}

th.labelColumn {
  height: 11px;
  padding: 9px 5px 9px 5px;
  min-width: 200px;
  
}

th.last {
  padding-bottom: 16px;
  border-bottom: 18px normal white;
  background-color: white;
  
}

th.labelColumn.first {
  background-color: transparent;
}

#waypoint {
  height: 11px;
  padding: 6px;
}

td.time {
  min-width: 102px;
}

td.dataHolder {
  background-color: white;
  padding: initial;
  height: initial;
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

@media (max-width: 750px) {
  section#History {
    padding-top:50px;
  }

  .detail {
    width: 100%;
    margin: 20px auto;
    padding: 15px;
  }

  th.labelColumn {
    min-width: 40vw;
  }

  .img-container-2 img {
    height: 140px;
  }
}
  
</style>