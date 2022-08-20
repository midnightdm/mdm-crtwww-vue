<template>
  <AdminSubMenu class="adminsub"></AdminSubMenu>
  <!-- Buttons placed outside flow to use fixed css positions-->
  <button v-if="changedQC" v-on:click="saveQCData()"
  type="submit"
  class="example_b saveBtnQc" 
>Save QC Changes</button>

<button v-if="changedClinton" v-on:click="saveClintonData()"
  type="submit"
  class="example_b saveBtnCl" 
>Save Clinton Changes</button>

  <main class="local">  
    <div id="AddVess" class="AddVess">
        <h1>Edit Announcements</h1>
        <p>This page allows you to add or remove announcements that apppear at the bottom of the dashboard.</p>
          <ul class="instruct">
            <li>Disable unused slots by setting expire date.</li>
            <li> "Day Limit" slots will run on the selected day only if enabled.</li>
            <li>Use <code>&lt;em&gt;&lt;/em&gt;</code> tags in text to enable <span class="high">highlight</span></li>
          </ul>
        <button class="example_b" v-on:click="showObj">Show Fields</button>  
            
        <form ref="form" @submit.prevent="updateAnnc">
        <h2>QC Announcements</h2>

        <fieldset v-for="annc in anncQcArr" :key="annc.key" :class="annc.status">
            <legend>QC Field {{annc.num}}</legend>
            <legend class="sideways">{{annc.status}}</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC[annc.key].text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC[annc.key].hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC[annc.key].hasOnlyDay" v-bind:class="{'watchOn': anncQC[annc.key].hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC[annc.key].hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC[annc.key].onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="datetime-local" name="formStartTS" v-model="anncQC[annc.key].startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="datetime-local" name="formEndTS" v-model="anncQC[annc.key].endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>

          <button v-on:click="addQcField">Add a QC Field</button><br><br>


        <h2>Clinton Announcements</h2>
        <fieldset v-for="annc in anncClArr" :key="annc.key" :class="annc.status">
            <legend :class="annc.status">Clinton Field {{annc.num}}</legend>
            <legend class="sideways">{{annc.status}}</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncCL[annc.key].text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncCL[annc.key].hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="anncCL[annc.key].hasOnlyDay" v-bind:class="{'watchOn': anncCL[annc.key].hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncCL[annc.key].hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncCL[annc.key].onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="datetime-local" name="formStartTS" v-model="anncCL[annc.key].startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="datetime-local" name="formEndTS" v-model="anncCL[annc.key].endTS" v-on:change="changeDetectedClinton">
            
            <br>
          </fieldset>
          <button v-on:click="addClField">Add a Clinton Field</button>
        </form>
        <br>
       
          
          
        
    </div>
  </main>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { useRouter } from 'vue-router'
import { firestore } from '@/store/firebaseApp.js'
import { doc, setDoc } from 'firebase/firestore'

const db = firestore
const anncQcRef = doc(db, 'AnnouncementsQC', 'dashboard')
const anncClRef = doc(db, 'Announcements', 'dashboard')
let ts  = new Date(),
    day = ts.getDay(),
    now, 
    oneDay = 86400000 //miliseconds


export default {
    created() {
      this.$store.dispatch("fetchAdminAnnc")
    },
    mounted() { 
      this.$store.commit('setSlate', 'ADMIN')
      this.$store.commit('setPageSelected', 'EditAnnc')
      this.anncCL
      this.anncQC
    },
    data: function() {
      return {
        router: useRouter(),
        errorMsg: null,
        admin: null,
        changedClinton: false,
        changedQC: false,
        objTemplate: {
          endTS: "2022-07-02",
          hasOnlyDay: false,
          onlyDay: "saturday",
          startTS: "2022-07-01",
          text: ""
        },
        anncQcArr: [],
        anncQcClone: {},
        anncClArr: [],
        anncClClone: [],
        now: new Date() 
      }
    },
    computed: {
      anncQC() {
        let anncQcClone = Object.assign({}, this.$store.state.b.adminAnncQC )
        let aKey, nKey, status, start, end
        this.anncQcArr = []
        for(aKey in anncQcClone) {
          nKey = aKey.substring(1)
          start = new Date(anncQcClone[aKey].startTS)
          end   = new Date(anncQcClone[aKey].endTS)
          now       = ts.getTime()
          status = "inactive"
          if(start.getTime() < now && end.getTime() > now) {
            status = "active"
            if( (end.getTime() - now) < oneDay) {
            status = "short"
            }
          }
          this.anncQcArr.push({key: aKey, num: parseInt(nKey), status: status, obj: anncQcClone[aKey]})
        }
        this.anncQcArr.sort( (a,b) => a.num - b.num )
        return this.$store.state.b.adminAnncQC
      },
      anncCL() {
        let anncClClone = Object.assign({}, this.$store.state.b.adminAnnc )
        let aKey, nKey, status, start, end
        this.anncClArr = []   
        for(aKey in anncClClone) {
          nKey = aKey.substring(1)
          start = new Date(anncClClone[aKey].startTS)
          end   = new Date(anncClClone[aKey].endTS)
          now       = ts.getTime()
          status = "inactive"
          if(start.getTime() < now && end.getTime() > now) {
            status = "active"
            if((end.getTime() - now) < oneDay) {
              status = "short"
            }
          }
          this.anncClArr.push({key: aKey, num: parseInt(nKey), status: status, obj: anncClClone[aKey]})
        }
        this.anncClArr.sort( (a,b) => a.num - b.num )  
        return this.$store.state.b.adminAnnc
      }
    },
    methods: {
      changeDetectedClinton() {
        this.changedClinton = true
      },
      changeDetectedQC() {
        this.changedQC = true
      },
      saveClintonData() {
        //Clone annc obj... 
        let  anncClClone = Object.assign({}, this.anncCL)
        
        setDoc(anncClRef, anncClClone, {merge: true})
        this.changedClinton = false
      },
      /*
      saveClintonData2() {
        let anncClClone = {}, i=1
        this.anncClArr.forEach( (item) => {
          anncClClone["f"+i] = item.obj
          i++
        })
        setDoc(anncClRef, anncClClone, {merge: true})
        this.changedClinton = false
      },
      */
      saveQCData() {
        //Clone annc obj... 
        let  anncQcClone = Object.assign({}, this.anncQC) 
        setDoc(anncQcRef, anncQcClone, {merge: true})
        this.changedQC = false
      },
      /*
      saveQCData2() {
        let anncQcClone = {}
        let i=1
        this.anncQcArr.forEach((item) => {
          anncQcClone["f"+i] = item.obj
          i++
        })
        setDoc(anncQcRef, anncQcClone, {merge: true})
        this.changedQC = false
      },
      */
      showObj() {
        console.log("anncQC", this.anncQC)
        console.log("anncCL", this.anncCL)
      },
      addQcField() {
        let anncQcClone = Object.assign({}, this.anncQC)
        let key = "f"+(this.anncQcArr.length+1)
        anncQcClone[key] = Object.assign({}, this.objTemplate)
        setDoc(anncQcRef, anncQcClone, {merge: true})
      },
      addClField() {
        let anncClClone = Object.assign({}, this.anncCL)
        let key = "f"+(this.anncClArr.length+1)
        anncClClone[key] = Object.assign({}, this.objTemplate)
        setDoc(anncClRef, anncClClone, {merge: true})
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
    padding: 0 5rem;
    margin: auto;
}
th {
  padding: 5px;
  background-color: rgb(228, 231, 231);
}

ul.instruct {
  list-style-type: square;
  margin-left: 20%;
  margin-right: auto;
}

ul.instruct > li {
  text-align: left;
}

fieldset {
    width: 250px;
    margin: 10px auto;
    padding: .1rem .1rem .2rem 1.5rem;
    line-height: 1.5rem
}

fieldset.inactive {
  border: solid 2px black;
}
fieldset.active {
  border: solid 4px green;

}

fieldset.short {
  border: solid 4px yellow;
}

legend.sideways {
  bottom: 50%;
  padding: 1px 1px 20px 1px;
  top: unset !important;
  transform: translate(-50%, 3.2rem) rotate(-90deg);
  text-transform:uppercase;
  font-weight: bold;
}

input {
  border-top-style:solid;
  padding: .2rem;
  margin: .2rem;
  line-height: 1rem;
}

span.high {
  background-color: black;
  color: orange;
  padding: .2rem;
}

input:focus {
  background-color: yellow;
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


.saveBtnQc {
    z-index: 5;
    position: fixed;
    bottom: 30px;
    right: 15px;
}

.saveBtnCl {
    z-index: 5;
    position: fixed;
    bottom: 90px;
    right: 15px;
}

h4 {
    margin: 2rem 0rem 1rem;
}
  
.table-image td, .table-image th {    
  vertical-align: middle;
}
  
main.local {
  top: -50px;
  transform: translateY(-50px);
}

/*
#asub {
  background-color: #31363e;
  transform: translateY(140px);
}
*/

@media (max-width: 750px) {
  /*
  #asub {
    transform: translateY(94px);
  }
  */ 
  main#AdminVessels {
    padding-top: var(--menu-pad-mobile);
  }
}

</style>