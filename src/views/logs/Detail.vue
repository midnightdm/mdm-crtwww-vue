<template>
  <section id="History">  
    <div class="detail">    
      <h2><span>{{ this.$store.getters.getVesselName }}</span> Passages
      </h2>
      <p>This log shows the direction and time this vessel passed each of the waypoints tracked by the Clinton River Traffic website.
      </p>
    </div>

    <table>
      <tr>
        <th class="labelColumn first">Waypoint</th>
        <td class="dataHolder" rowspan="6">
          <div class="table-container">
            <table class="dataColumn">
              <tr>
                <th v-for='alpha in this.$store.state.a.historyCache.vesselPassages.alpha' :key='alpha.date' colspan="2">{{ alpha.date.toLocaleDateString() }}</th>
              </tr>
              <tr>
                <template v-for='alpha in this.$store.getters.getAlpha' :key='alpha.date'>    
                <td>
                  <img v-if='alpha.dir == "up"' class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25" />
                  <img v-if='alpha.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25"/>
                </td>
                <td class="time"> {{ alpha.date.toLocaleTimeString() }} </td>
                </template> 
              </tr>  
              <tr>
                <template v-for='bravo in this.$store.getters.getBravo' :key='bravo.date'>    
                <td >
                  <img v-if='bravo.dir == "up"' class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25"/>
                  <img v-if='bravo.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25"/>
                </td>
                <td class="time"> {{ bravo.date.toLocaleTimeString() }} </td>
                </template> 
              </tr>
              <tr>
                <template v-for='charlie in this.$store.getters.getCharlie' :key='charlie.date'>    
                <td >
                  <img v-if='charlie.dir == "up"'    class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25"/>
                  <img v-if='charlie.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25" />
                  </td>
                <td class="time"> {{ charlie.date.toLocaleTimeString() }} </td>
                </template>
              </tr>
              <tr>
                <template v-for='delta in this.$store.getters.getDelta' :key='delta.date'>    
                <td >
                  <img v-if='delta.dir == "up"' class="dir-img" :src="this.base+'/images/uparr.png'" alt="Up river indicator is present." height="25" />
                  <img v-if='delta.dir == "down"' class="dir-img" :src="this.base+'/images/dwnarr.png'" alt="Down river indicator is present." height="25" />
                </td>
                <td class="time"> {{ delta.date.toLocaleTimeString() }} </td>
                </template>
              </tr>  
            </table>

      </div>
    </td>
      </tr>
      <tr>
        <th class="labelColumn">3 Miles Above Dam</th>
      </tr>  
      <tr>
        <th class="labelColumn">Lock &amp; Dam 13</th>
      </tr>
      <tr>
        <th class="labelColumn">Railroad Drawbridge</th>
      </tr>
      <tr>
        <th class="labelColumn">3 Miles Below Drawbridge</th>  
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
import LogsSubMenu from '@/components/LogsSubMenu.vue'

export default {
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
    this.$store.commit('setLogsLinkActive', true)
    this.$store.commit('setPageSelected', 'Detail')
  },
  unmounted() {
    this.$store.commit('setLogsLinkActive', false)
  },
  components: {
    LogsSubMenu
  }

}

</script>

<style>

section#History {
  padding-top: var(--menu-pad-wide-b);
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
    max-height: 5px;
    padding: 2px 5px;
    min-width: 200px;
  }

  th.last {
    padding-bottom: 16px;
    border-bottom: 18px normal white;
    background-color: white;
    
  }

  th.first {
    background-color: transparent;
  }

  td.time {
    min-width: 100px;
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