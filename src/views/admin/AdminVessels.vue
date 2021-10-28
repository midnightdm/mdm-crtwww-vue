<template>
  <AdminSubMenu></AdminSubMenu>
  <main>
  <div   class="AdminVess">
       
<h2>Admin Vessels</h2>

<p>These are vessels for which images and data have been scraped from myshiptracking.com. They are added automatically
   when a detected transponder activates our live page. Click a vessel name to see and edit its details. Correct anything 
   the source website didn't have right. The Watched page shows only those vessels specially flagged for alert notifications.
   You can add or remove a flagged vessel's status with a checkbox on the edit page.</p>
<table loading>
  <thead>
    <tr>
      <th>Index</th>  
      <th>Type</th>
      <th>Name</th>
      <th>MMSI</th>
      <th>Date Added</th>
      <th>On Watch List?</th>
    </tr>
  </thead>
  <tbody v-for='(vessel, idx) in this.$store.state.b.vesselsList' :key='vessel.vesselID'>
    <tr>
      <td class="col_r" >{{ idx }}</td>
      <td class="col_r">{{ vessel.vesselType}}</td>
      <td><router-link :to="{ name: 'AdminDetail', params: { vesselID: vessel.vesselID }}"><h4>{{ vessel.vesselName}}</h4></router-link></td>
      <td class="col_r" >{{vessel.vesselID}}</td>
      <td>{{ vessel.vesselRecordAddedTS }}</td>     
      <td  :class="{ watchOn: vessel.vesselWatchOn}">
          <span v-if="vessel.vesselWatchOn">Yes</span>
          <span v-else>No</span>
      </td>     
    </tr>
  </tbody>
</table>
        
  </div>
  
  </main>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { userAuthState }  from '@/store/firebaseApp.js'

export default {
    created: function () {
        this.$store.dispatch("fetchAllVessels")
    },
    beforeUpdate() {
      this.$store.commit('setSlate', 'Admin')
    },
    data: function() {
        return {
           idx: 0
           
        }
    
    },
    components: {
        AdminSubMenu
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


.col_r{
  text-align: right;
  padding-right: 2%;
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
  padding: .3em;
}

.container {
    padding: 2rem 0rem;
}
  
h4 {
    margin: 2rem 0rem 1rem;
}
  
.table-image td, .table-image th {    
  vertical-align: middle;
}
  

</style>