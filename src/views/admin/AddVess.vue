<template>
  <AdminSubMenu></AdminSubMenu>
  <main class="local">
    <div id="AddVess" class="AddVess">
        <h3>Add Vessel</h3>
        <p>This page allows you to add a vessel which has not yet passed Clinton while our software was watching. 
        You just need to input a known MMSI number into the form below.</p>
        <form ref="form" @submit.prevent="checkScrape">
        <fieldset>
            <legend>Enter a new MMSI</legend>
            <input type="text" name="formVesselID" size="9" maxlength="9" placeholder="9-Digits"><br>
            <button
              type="submit"
              class="example_b" 
            >Submit</button>
        </fieldset>
        </form>
        <br>
        <h1 style="color:red" v-if="this.$store.state.b.adminMsg.vesselError">ERROR: <span>{{ this.$store.state.b.adminMsg.vesselStatusMsg }}</span></h1>
        <h1 style="color:green" v-else> {{this.$store.state.b.adminMsg.vesselStatusMsg }}</h1>
        <br><br>
        <h2>Last Saved VesselID: 
          <a v-if="this.$store.state.b.adminMsg.formAwaitingReset" 
             @click="routeToAdminVessels" 
             :href="'/admin/vessels/#mmsi'+this.$store.state.b.adminMsg.vesselID"
             >{{ this.$store.state.b.adminMsg.vesselID }}</a> 
          <span v-else>{{ this.$store.state.b.adminMsg.vesselID }}</span></h2> 
        <p v-if="this.$store.state.b.adminMsg.formAwaitingReset">
          
        <button
              class="example_b" 
              @click="resetForm"
            >Reset
        </button>           
        </p>
    </div>
  </main>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { useRouter } from 'vue-router'
import { firestore } from '@/store/firebaseApp.js'
import { doc, setDoc } from 'firebase/firestore'

const db = firestore

export default {
    created: function () {
      this.$store.dispatch("fetchAdminMsg")
    },
    data: function() {
        return {
            router: useRouter(),
            errorMsg: null,
            vessel: null,
            admin: null,
            formVesselID: null,

        }
        
    },
    methods: {
        checkScrape(e) {
          const adminRef = doc(db, 'Passages', 'Admin')
          this.formVesselID = e.target.elements.formVesselID.value
          console.log("MMSI form value: ", this.formVesselID)
          setDoc(adminRef, {vesselID: this.formVesselID, vesselStatusMsg: "Process pending. This could take up to 3 minutes.", formAwaitingReset: false, vesselError: false}, {merge: true})
        },
        resetForm() {
          const adminRef = doc(db, 'Passages', 'Admin')
          setDoc(adminRef, { formAwaitingReset: false, vesselError: false, vesselStatusMsg: 'Ready for your input.' }, {merge: true})
        },
        routeToAdminVessels() {
          this.router.push("/admin/vessels/#mmsi"+this.$store.state.b.adminMsg.vesselID)
        }
   
    },
    components: {
        AdminSubMenu
    },
    deactivted() {
      this.resetForm()
    }
}
</script>

<style>
p {
    text-align: justify;
    padding: 10px;
    margin: auto;
}
th {
  padding: 5px;
  background-color: rgb(228, 231, 231);
}

fieldset {
    width: 200px;
    margin: auto;
}

h4.inTable {
  display: inline;
}

.example_b {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #7c7777;
  margin: 10px;
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

  
h4 {
    margin: 2rem 0rem 1rem;
}
  
.table-image td, .table-image th {    
  vertical-align: middle;
}
  
main.local {
  top: 50px;
}

</style>