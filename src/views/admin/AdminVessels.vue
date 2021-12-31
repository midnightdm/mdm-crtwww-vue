<template>
<AdminSubMenu></AdminSubMenu>  
  <main class="local">
  <div   class="AdminVess">     
<h2 v-if="isShowing">Admin Vessels</h2>
<p v-if="isShowing">These are vessels for which images and data have been scraped from <a href="https://www.myshiptracking.com/vessels">myshiptracking.com</a>. They are added automatically
   when a detected transponder activates our live page. Click a vessel name to see and edit its details. </p>
   <button id="topbtn" @click="topOfPage">Top</button>
<router-view v-if="!isShowing"></router-view>  
<button v-if="!isShowing" v-on:click="showList()" class="example_b">Return To List</button> 
    <div class="container" v-if="isShowing">
      <ul class="navigation sort">
        <li class="nav-link"><a href="#" @click="changePageView('default')"
        v-bind:class="{ 'router-link-exact-active': pageView=='default'}">All</a></li>
        <li class="nav-link"><a href="#" @click="changePageView('passenger')"
        v-bind:class="{ 'router-link-exact-active': pageView=='passenger'}">Passenger</a></li>
        <li class="nav-link"><a href="#" @click="changePageView('date')"
        v-bind:class="{ 'router-link-exact-active': pageView=='date'}">Date Sort</a></li>
        <li class="nav-link"><a href="#" @click="changePageView('mmsi')"
        v-bind:class="{ 'router-link-exact-active': pageView=='mmsi'}">MMSI Sort</a></li>
      </ul>
      <table loading>
        <thead>
          <tr>
            <th>Index</th>  
            <th>Type</th>
            <th>Name</th>
            <th>MMSI</th>
            <th>Date Added</th>
            <th>On Watch List?</th>
            <th></th>
          </tr>
        </thead>
        <tbody >
          <!-- Default Sort -->
          <template v-if="pageView=='default'">
            <tr v-for='(vessel, idx) in this.$store.state.b.vesselsList' :key='vessel.vesselID'>
              <td class="col_r" ><a :name="'mmsi'+vessel.vesselID">{{ idx }}</a></td>
              <td class="col_r">{{ vessel.vesselType}}</td>
              <td><router-link :to="{ name: 'AdminDetail', params: { vesselID: vessel.vesselID }}" exact-active-class="exact-active" @click="isShowing=!isShowing"><h4 class="inTable">{{ vessel.vesselName}}</h4></router-link></td>
              <td  >{{vessel.vesselID}}</td>
              <td class="wider">{{ vessel.vesselRecordAddedDate }}</td>     
              <td  :class="{ watchOn: vessel.vesselWatchOn}" class="col_c square">
                  <a href="#" @click.prevent="toggleWatchOn(vessel)" v-if="vessel.vesselWatchOn">Yes</a>
                  <a href="#" @click.prevent="toggleWatchOn(vessel)" v-else>No</a>
              </td>
              <td><h4  @click="deleteRecord(vessel)" class="inTable link">Delete?</h4></td>
            </tr>
          </template>

          <!-- MMSI Sort -->
          <template v-if="pageView=='mmsi'">
            <tr v-for='(vessel, idx) in this.$store.getters.getVesselsSortMMSI' :key='vessel.vesselID'>
              <td class="col_r" ><a :name="'mmsi'+vessel.vesselID">{{ idx }}</a></td>
              <td class="col_r">{{ vessel.vesselType}}</td>
              <td><router-link :to="{ name: 'AdminDetail', params: { vesselID: vessel.vesselID }}" exact-active-class="exact-active" @click="isShowing=!isShowing"><h4 class="inTable">{{ vessel.vesselName}}</h4></router-link></td>
              <td  >{{vessel.vesselID}}</td>
              <td class="wider">{{ vessel.vesselRecordAddedDate }}</td>     
              <td :class="{ watchOn: vessel.vesselWatchOn}" class="col_c square">
                  <a href="#" @click.prevent="toggleWatchOn(vessel)" v-if="vessel.vesselWatchOn">Yes</a>
                  <a href="#" @click.prevent="toggleWatchOn(vessel)" v-else>No</a>
              </td>
              <td><h4  @click="deleteRecord(vessel)" class="inTable link">Delete?</h4></td>
            </tr>
          </template>

          <!-- Date Added Sort -->
          <template v-if="pageView=='date'">
            <tr v-for='(vessel, idx) in this.$store.getters.getVesselsSortAdded' :key='vessel.vesselID'>
              <td class="col_r" ><a :name="'mmsi'+vessel.vesselID">{{ idx }}</a></td>
              <td class="col_r">{{ vessel.vesselType}}</td>
              <td><router-link :to="{ name: 'AdminDetail', params: { vesselID: vessel.vesselID }}" exact-active-class="exact-active" @click="isShowing=!isShowing"><h4 class="inTable">{{ vessel.vesselName}}</h4></router-link></td>
              <td  >{{vessel.vesselID}}</td>
              <td class="wider">{{ vessel.vesselRecordAddedDate }}</td>     
              <td  :class="{ watchOn: vessel.vesselWatchOn}" class="col_c square">
                  <a href="#" @click.prevent="toggleWatchOn(vessel)" v-if="vessel.vesselWatchOn">Yes</a>
                  <a href="#" @click.prevent="toggleWatchOn(vessel)" v-else>No</a>
              </td>
              <td><h4  @click="deleteRecord(vessel)" class="inTable link">Delete?</h4></td>
            </tr>
          </template>

          <!-- Passengers Only Filter -->
          <template v-if="pageView=='passenger'">
            <tr v-for='(vessel, idx) in this.$store.getters.getVesselsPassengerOnly' :key='vessel.vesselID'>
              <td class="col_r" ><a :name="'mmsi'+vessel.vesselID">{{ idx }}</a></td>
              <td class="col_r">{{ vessel.vesselType}}</td>
              <td><router-link :to="{ name: 'AdminDetail', params: { vesselID: vessel.vesselID }}" exact-active-class="exact-active" @click="isShowing=!isShowing"><h4 class="inTable">{{ vessel.vesselName}}</h4></router-link></td>
              <td  >{{vessel.vesselID}}</td>
              <td class="wider">{{ vessel.vesselRecordAddedDate }}</td>     
              <td   :class="{ watchOn: vessel.vesselWatchOn}" class="col_c square">
                  <a href="#" @click.prevent="toggleWatchOn(vessel)" v-if="vessel.vesselWatchOn">Yes</a>
                  <a href="#" @click.prevent="toggleWatchOn(vessel)" v-else>No</a>
              </td>
              <td><h4  @click="deleteRecord(vessel)" class="inTable link">Delete?</h4></td>
            </tr>
          </template>


        </tbody>
      </table>           
    </div>
  </div>
</main>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'

import { userAuthState }  from '@/store/firebaseApp.js'
import { useRouter } from 'vue-router'
import { firestore } from '@/store/firebaseApp.js'
import { doc, deleteDoc, setDoc } from 'firebase/firestore'


const db = firestore

export default {

    created: function () {
        this.$store.dispatch("fetchAllVessels")
        this.$store.commit('setSlate', 'ADMIN')
        this.$store.commit('setPageSelected', 'AdminVessels')
    },
    data: function() {
        return {
           idx: 0,
           isShowing: true,
           router: useRouter(),
           pageView: "default"
           
        }
    
    },
    methods: {
      showList() {
        this.isShowing = !this.isShowing
        //var router = useRouter()
        this.router.push('/admin/vessels')
      },
      async deleteRecord(vessel) {
        let vID = "mmsi"+vessel.vesselID
        console.log("Confirm to delete "+vID)
        
        const docRef = doc(db, "Vessels", vID)
        if(confirm("Are your sure you want to delete vessel ID "+vessel.vesselID+", "+vessel.vesselName+", from the database?")){
          await deleteDoc( docRef ).catch(err => alert(err)).then(()=> console.log("delteDoc finished"));
        }
      },
      changePageView(show) {
        this.pageView = show
      },
      toggleWatchOn(vessel) {
        let vID = "mmsi"+vessel.vesselID
        let vWo = vessel.vesselWatchOn===true ? false : true
        console.log("New vesselWatchOn", vWo)
        const vessRef = doc(db, "Vessels", vID)
        setDoc(vessRef, {vesselWatchOn: vWo}, {merge: true})
      },
      topOfPage() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }      
    },
    components: {
        AdminSubMenu,
    }
}
</script>

<style>

p {
    text-align: justify;
    padding: 10px;
}
th {
  padding: 5px;
  background-color: rgb(228, 231, 231);
}

h4.inTable {
  display: inline;
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

.watchOn {
  background-color: forestgreen;
  color:ghostwhite;
  padding: 1px;
  text-align: center;
}

td.watchOn a {
  color: ghostwhite;
  text-decoration-color: white;
  text-decoration-line: underline;
}
  
h4 {
    margin: 2rem 0rem 1rem;
}

h4.link {
  color: blue;
  text-decoration-color: blue;
  text-decoration-line: underline;
  cursor: pointer;
}

 
.table-image td, .table-image th {    
  vertical-align: middle;
}
  
main.local {
  top: 50px;
}

.sort {
    transform: translateY(-50spx);
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

}

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