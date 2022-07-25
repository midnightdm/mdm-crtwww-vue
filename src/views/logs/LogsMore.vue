<template>
  <main id="LogsMore">
  <button v-bind:class="{ active: scrolled}" id="topbtn" @click="topOfPage">Top</button>
    <section>
      <h1>{{this.$store.getters.getOtherMonth.length}} Vessel Passage<span v-if="this.$store.getters.getOtherMonth.length != 1">s</span> In {{pageTitle}} 
      <w-button
        class="px4 btnGrpA"
        @click="getSelection; dialog1.show = true"
        bg-color="primary"
        dark>Change Month</w-button></h1>
      <h4>{{ this.formattedRange }}</h4>
      

      <ul class="vessels-list" v-for="vessel in this.$store.getters.getOtherMonth" :key="vessel.vesselID">
        <li>
          <div class="shipBox tableBlock">
            <img class="shipBox" :src="vessel.vesselImageUrl" width="200" />
          </div>
          <div class="tableBlock grpA"> 
            <h4 class="title">{{ vessel.vesselName }}</h4>
            <p class="dirWrapper">
            <img class="dir-img" v-if="vessel.passageDirection=='upriver'" :src="this.upArrUrl" title='Upriver indicator' />
            <img class="dir-img" v-if="vessel.passageDirection=='downriver'" :src="this.dnArrUrl" title='Downriver indicator'/>
            <span class="adjacent"> {{vessel.passageDirection}}</span>
            </p>
          </div>

          <div class="tableBlock">
            <h4>{{vessel.charlieDO.toLocaleDateString() }}</h4>
            <br/>
            <p><span class="label">LOCK 13:</span> <span class="value">{{ vessel.bravoDO.toLocaleTimeString() }}</span></p>
            <p><span class="label">BRIDGE :</span> <span class="value">{{ vessel.charlieDO.toLocaleTimeString() }}</span></p>
          </div>

          <div class="tableBlock holder">
            <router-link class="pill btn" :to="{ name: 'Detail', params: { id: vessel.passageVesselID}}">History</router-link>
          </div>
          
        </li>
      </ul>

    </section>
  </main>

<!-- Modal for available list selection -->
<w-dialog  id="availModal" 
  v-model="dialog1.show"
  :width="200"
  :persistent="dialog1.persistent"
  :persistent-no-animation="dialog1.persistentNoAnimation"
  title-class="primary-light1--bg white"
  >    
  <template #title>
    Past Logs 
  </template>
<div class="modal-body">
  <h3>Available Months</h3>  
  <select v-model="selectedMonth" class="form-select" size="5" >
    <option v-for='event in listData' v-bind:key="event.key" :value="event.key">{{event.name}}</option>
  </select> <br> 
</div>
  <template #actions>
    <div class="spacer" />
    <w-button @click="dialog1.show = false">Close </w-button>&nbsp;
    <w-button @click="updateMonth(); dialog1.show = false">Submit</w-button>  
  </template>      
</w-dialog>

</template>

<script>
import ManageModel from '@/assets/classes/ManageModel.js'
import LogsSubMenu from '@/components/LogsSubMenu.vue'
import format from 'date-fns/format'

function getSelection() {
  let qs = document.querySelector('#sub-list-avail');
  return qs.key;
}

export default {
  created: function () {
    window.addEventListener('scroll', this.handleScroll)
    //Calculate key for 2 months ago as default
    let now = new Date()
    now.setDate(15) 
    let mili = now.getTime()
    let twoago = mili - 5184000000
    let dt2 = format(new Date(twoago), "yyyyMM")
    this.$store.dispatch("fetchOtherMonth", dt2)
    //Create array of months 9/2020 thru present -2
    let nine20 = new Date('2020-09-01')
    let nine20mili = nine20.getTime()
    this.listData = []
    while(twoago > nine20mili) {
      if(this.listData.length > 200) break;
      this.listData.push({
        key: format(new Date(twoago), 'yyyyMM'),
        name: format(new Date(twoago), 'MMMM yyyy')
      })
      twoago-= 2592000000
    }

  },
  mounted() {
    this.$store.commit('setSlate', 'LOGS')
    this.$store.commit('setLogsLinkActive', true)
    this.$store.commit('setPageSelected', "LogsMore")
  },
  computed: {
    formattedRange() {
      if(this.$store.state.a.otherMonthRange == undefined) {
        return "Undefined"
      }
      return "Range is "+
      format(this.$store.state.a.otherMonthRange.lo, 'h:mmaaa eeee, LLL do uu') +
      " to " +
      format(this.$store.state.a.otherMonthRange.hi, 'h:mmaaa eeee, LLL do uu')
    },
    pageTitle() {
      if(this.$store.state.a.otherMonthRange==undefined) {
        return "Change Month"
      }
      return format(this.$store.state.a.otherMonthRange.lo, 'MMMM yyyy')
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
    },
    updateMonth() {
      console.log('updateMonth()', this.selectedMonth)
      this.$store.dispatch("fetchOtherMonth", {monthKey: this.selectedMonth, region: this.region})
    } 
  },
  data() {
    return {
      scrolled: false,
      upArrUrl: process.env.VUE_APP_IMG_URL+'/images/uparr.png',
      dnArrUrl: process.env.VUE_APP_IMG_URL+'/images/dwnarr.png',
      region: process.env.VUE_APP_REGION,
      dialog1: {
        show: false,
        fullscreen: false,
        persistent: false,
        persistentNoAnimation: false,
        width: 300,
        remove: false
      },
      listAvail: null,
      listData: [],
      selectedMonth: ""
    }
  },
  components: {
    LogsSubMenu
  }
}
</script>

<style scoped>
#LogsMore section {
  padding-top: var(--menu-pad-wide-a);
}

@media (max-width: 750px) {
  #LogsMore section {
    padding-top: var(--menu-pad-mobile);
  }
}

img.vessel {
    height: 150px;
}
  
  
ul.vessels-list li {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 2px;
  padding: 2px;
  background-color:aquamarine;
  border-radius: 30px;
  border: 5px solid red;  
}  
  
.label {
  font-weight: bolder;
  float: left;
}  

.value {
  float:right;
}

h4.title {
  margin-bottom: 25px;
}
    
.tableBlock {
  min-width: 220px;
  background-color: aquamarine; 
  padding: 10px;
}

.tableBlock h4 {
  font-size: 1.5rem;
}

.dirWrapper {
  text-align: center;
}

.shipBoxData {
  background-color: white;
  opacity: .5;
  font-weight: 600;
  transform: translateY(-30px);
  padding-left: 5px;
}

.pill {
  background-color: #ddd;
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
}

img.dir-img {
  margin-left: auto;
  margin-right: auto;
  height: 25px;
  filter: drop-shadow(2px 2px 4px #4444dd);
}

.holder {
  display:flex; 
  align-items: center;
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
}

.btn {
  transform: translateX(35px);
}

.pill:hover {
  background-color: #f1f1f1;
}

</style>