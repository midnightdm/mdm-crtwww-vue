<template>
  <button v-bind:class="{ active: scrolled}" id="topbtn" @click="topOfPage">Top</button>
  <div id="main" class="logs">
    <h1>List of Vessels Logged</h1>     
    <p>The transponder-equipped vessels below passed Clinton most recently on the date shown. Select a vessel to view all its passages.</p>
    <div class="container" v-if=" this.$store.state.a.passagesList[0].type != 'default'">
      
      
      <table loading>
        <thead>
          <tr>
            <th class="expendable">Index</th>  
            <th class="nav-link" :class="{expendable: pageView=='passenger'}"><a href="#" @click="toggleListAll">Type</a></th>
            <th class="nav-link" :class="{expendable: pageView=='default'}"><a href="#" @click="changePageView('default')">Name</a></th>
            <th class="nav-link" :class="{expendable: pageView!='mmsi'}">
              <a v-if="mmsiAsc" href="javascript:void(0)" @click="toggleMmsiDir">MMSI&nbsp;<font-awesome-icon icon="caret-up" class="fa-solid fa-caret-up" :class="{active: mmsiAsc}" /></a>
              <a v-else href="javascript:void(0)" @click="toggleMmsiDir">MMSI&nbsp;<font-awesome-icon icon="caret-down" class="fa-solid fa-caret-down" :class="{active: mmsiAsc===false}"/></a>
            </th>
            <th class="nav-link wider" >
              <a v-if="dateAsc" href="javascript:void(0)" @click="toggleDateDir">Last Passage&nbsp;<font-awesome-icon icon="caret-up" class="fa-solid fa-caret-up" :class="{active: dateAsc}" /></a>
              <a v-else href="javascript:void(0)" @click="toggleDateDir">Last Passage&nbsp;<font-awesome-icon icon="caret-down" class="fa-solid fa-caret-down" :class="{active: dateAsc===false}" /></a>
            </th>
          </tr>
        </thead>
        <tbody >
          <!-- Default Sort -->
          <template v-if="pageView=='default'">
            <tr v-for="(vessel, idx) in this.$store.state.a.passagesList" :key="vessel.id">
              <td class="col_r expendable" ><a :name="'mmsi'+vessel.id">{{ idx }}</a></td>
              <td class="col_r">{{ vessel.type}}</td>
              <td><router-link :to="{ name: 'Detail', params: { id: vessel.id }}" exact-active-class="exact-active"><h4 class="inTable">{{ vessel.name}}</h4></router-link></td>
              <td class="expendable">{{vessel.id}}</td>
              <td class="wider">{{ vessel.date }}</td>        
            </tr>
          </template>

          <!-- MMSI Sort Ascending -->
          <template v-if="pageView=='mmsia'">
            <tr v-for='(vessel, idx) in this.$store.getters.getPassagesListSortMMSIAsc' :key='vessel.id'>
              <td class="col_r expendable"><a :name="'mmsi'+vessel.id">{{ idx }}</a></td>
              <td class="col_r">{{ vessel.type}}</td>
              <td><router-link :to="{ name: 'Detail', params: { id: vessel.id }}" exact-active-class="exact-active"><h4 class="inTable">{{ vessel.name}}</h4></router-link></td>
              <td>{{vessel.id}}</td>
              <td class="expendable">{{ vessel.date }}</td>     
              <td :class="{ watchOn: vessel.vesselWatchOn}" class="col_c square">
                  
              </td>
              
            </tr>
          </template>

          <!-- MMSI Sort Descending -->
          <template v-if="pageView=='mmsid'">
            <tr v-for='(vessel, idx) in this.$store.getters.getPassagesListSortMMSIDsc' :key='vessel.id'>
              <td class="col_r expendable"><a :name="'mmsi'+vessel.id">{{ idx }}</a></td>
              <td class="col_r">{{ vessel.type}}</td>
              <td><router-link :to="{ name: 'Detail', params: { id: vessel.id }}" exact-active-class="exact-active"><h4 class="inTable">{{ vessel.name}}</h4></router-link></td>
              <td>{{vessel.id}}</td>
              <td class="expendable">{{ vessel.date }}</td>                  
            </tr>
          </template>

          <!-- Date Sort Ascending -->
          <template v-if="pageView=='datea'">
            <tr v-for='(vessel, idx) in this.$store.getters.getPassagesListSortDateAsc' :key='vessel.id'>
              <td class="col_r expendable" ><a :name="'mmsi'+vessel.id">{{ idx }}</a></td>
              <td class="col_r">{{ vessel.type}}</td>
              <td><router-link :to="{ name: 'Detail', params: { id: vessel.id }}" exact-active-class="exact-active"><h4 class="inTable">{{ vessel.name}}</h4></router-link></td>
              <td class="expendable">{{vessel.id}}</td>
              <td class="wider">{{ vessel.date }}</td>     
            </tr>
          </template>

          <!-- Date Sort Descending -->
          <template v-if="pageView=='dated'">
            <tr v-for='(vessel, idx) in this.$store.getters.getPassagesListSortDateDsc' :key='vessel.id'>
              <td class="col_r expendable" ><a :name="'mmsi'+vessel.id">{{ idx }}</a></td>
              <td class="col_r">{{ vessel.type}}</td>
              <td><router-link :to="{ name: 'Detail', params: { id: vessel.id }}" exact-active-class="exact-active"><h4 class="inTable">{{ vessel.name}}</h4></router-link></td>
              <td class="expendable">{{vessel.id}}</td>
              <td class="wider">{{ vessel.date }}</td>     
            </tr>
          </template>

          <!-- Passenger Only Sort-->
          <template v-if="pageView=='passenger'">
            <tr v-for='(vessel, idx) in this.$store.getters.getPassagesListPassengerOnly' :key='vessel.id'>
              <td class="col_r expendable" ><a :name="'mmsi'+vessel.id">{{ idx }}</a></td>
              <td class="col_r">{{ vessel.type}}</td>
              <td><router-link :to="{ name: 'Detail', params: { id: vessel.id }}" exact-active-class="exact-active"><h4 class="inTable">{{ vessel.name}}</h4></router-link></td>
              <td class="expendable">{{vessel.id}}</td>
              <td class="wider">{{ vessel.date }}</td>     
              
            </tr>
            </template>
        </tbody>
      </table>
  
    </div>  
    <div v-else>
      <h1>LOADING VESSELS ...</h1>
    </div>  
  </div>
</template>
<script>
import LogsSubMenu from '@/components/LogsSubMenu.vue'

export default {
  created: function () {
    this.$store.dispatch("fetchPassagesList", process.env.VUE_APP_REGION)
    window.addEventListener('scroll', this.handleScroll)

    this.$store.commit('setSlate', 'LOGS')
    this.$store.commit('setLogsLinkActive', true)
    this.$store.commit('setPageSelected', 'Logs')
  },

  data: function() {
    return {
      slate: 'LOGS',
      scrolled: false,
      idx: 0,
      isShowing: true,
      listAll: true,
      mmsiAsc: null,
      dateAsc: null,
      pageView: "default",
      lastView: "default"
    }
  },
  methods: {
    topOfPage() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    handleScroll(event) {
      if(document.documentElement.scrollTop>20) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
      console.log("scrolled?", this.scrolled)
    },
    changePageView(show) {
      console.log("lastView=",this.lastView)
      if(show!="passenger" && this.pageView != "passenger") {
        this.lastView = this.pageView
      }
      if(show!="mmsia" && show!="mmsid") {
        this.mmsiAsc=null
      }
      if(show!="datea" && show!="dated") {
        this.dateAsc=null
      }  
      this.pageView = show
    },
    toggleListAll() {
      this.listAll=!this.listAll
      if(!this.listAll) {
        this.changePageView("passenger")
      } else {
        this.changePageView(this.lastView)
      }
    },
    toggleMmsiDir() {
      if(this.mmsiAsc===true) {
        this.changePageView("mmsid")
        this.mmsiAsc=false
      } else {
        this.changePageView("mmsia")
        this.mmsiAsc=true
      }
    },
    toggleDateDir() {
      if(this.dateAsc===null || this.dateAsc===true) {
        this.changePageView("dated")
        this.dateAsc=false
      } else {
        console.log("changing to date asc")
        this.changePageView("datea")
        this.dateAsc=true
      }
    }  
  },
  components: {
    LogsSubMenu
  }
}
</script>
<style scoped>

div#main {
  padding-top: 80px;
}

.expendable {
  visibility: visible;
}

.logs {
  width: 80%;
  margin: 20px auto;
}

h1 {  
  font-family: sans-serif;
  font-size: 20pt;
  white-space: normal;
}
  
img.vessel {
  height: 150px;

}



p {
  transform: translateY(1 rem);
}

th {
  padding: 5px;
  background-color: rgb(228, 231, 231);
}

h4.inTable {
  display: inline;
}

h4.link {
  color: blue;
  text-decoration-color: blue;
  text-decoration-line: underline;
  cursor: pointer;
}

.example_b {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #7c7777;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
}

.example_b:hover {
  background: #434343;
  cursor:grab;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
  transition: all 0.4s ease 0s;
}

.wider {
  width: 10em;
}
.col_r{
  text-align: right;
  padding-right: 3px;
}

.col_c{
  text-align: center;
  
}

.col_l {
  text-align: left;
}

table {
  margin: 1rem auto;
  width: auto;
}

th, td {
  width: auto;
  padding: 5px;
}

tr:nth-child(even) {
  background-color: rgb(207, 218, 218);
}

tr:nth-child(odd) {
  background-color: rgb(166, 212, 212);
}

tr.isNew {
  background-color:rgb(167, 109, 109);
}

.cent_cont {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}


#main {
  transform: translateY(8rem);
}
  
ul .vessels-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin: 2px;
  padding: 2px;
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
    float: left;
    position: relative;
    height: 16rem;
    width: 14rem;      
    margin: 2px;
    padding: 5px;
    font-family: sans-serif;
    font-size: 12pt;
    letter-spacing: 2px;  
    border: 5px;
    border-color: #31363e; 
}
  
#topbtn {
    background-color: greenyellow;
    border: 4px solid black;
    text-align: center;
    border-radius: 10%; 
    padding: 10px;
    font-weight: bold;
    position: fixed;
    bottom: 30px;
    right: 15px;
    opacity: 0;
    transition: opacity 0.5s;
}

#topbtn.active {
  opacity: 1;
  transition: opacity 0.5s;
  cursor: pointer;
  z-index: 105;
}

.fa-caret-up {
  visibility: hidden;
  color: blue;
  
}

.fa-caret-down.active {
  visibility: visible;
}

.fa-caret-down {
  visibility: hidden;
  color: blue;
  
}

.fa-caret-up.active {
  visibility: visible;
}

div.container {
  margin-bottom: 1rem;
}

@media (max-width: 750px) {
  div#main {
    padding-top: 20px;
  }
} 
</style>