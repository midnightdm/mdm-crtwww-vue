<template>
  
  
  <div class="AdminDetail">
      
      <h3>Edit data for <span>{{vessel.vesselName}}</span> below.</h3>

        <div class="container">
            <div class="dmodel">
                <div class="col-12">
                    <table class="table table-image">		  
                        <tr>
                        <th scope="row">MMSI#</th><td><span>{{vessel.vesselID}}</span></td>
                    </tr>  
                        <tr>
                        <th scope="row">Type</th><td><input class="wfc" name="vesselType" type="text" v-model="vessel.vesselType" v-on:change="changeDetected" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Name</th><td><input class="wfc" name="vesselName" type="text" v-model="vessel.vesselName" v-on:change="changeDetected" /></td>
                    </tr>  
                        <tr>
                        <th scope="row">Call Sign</th><td><input class="wfc" name="vesselCallSign" type="text" v-model="vessel.vesselCallSign" v-on:change="changeDetected" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Length</th><td><input class="wfc" name="vesselLength" type="text" v-model="vessel.vesselLength" v-on:change="changeDetected" /></td>
                    </tr>  
                        <tr>
                        <th scope="row">Width</th><td><input class="wfc" name="vesselWidth" type="text" v-model="vessel.vesselWidth" v-on:change="changeDetected" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Draft</th><td><input class="wfc" name="vesselDraft" type="text" v-model="vessel.vesselDraft" v-on:change="changeDetected" /></td>
                    </tr>  
                    <tr>
                        <th scope="row">Owner</th><td><input class="wfc" name="vesselOwner" type="text" v-model="vessel.vesselOwner" v-on:change="changeDetected" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Built</th><td><input class="wfc" name="vesselBuilt" type="text" v-model="vessel.vesselBuilt" v-on:change="changeDetected" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Has Image?</th><td><input class="wfc" type="checkbox" v-model="vessel.vesselHasImage" v-on:change="changeDetected" />&nbsp;
                         <span v-if="vessel.vesselHasImage" v-bind:class="{ 'watchOn': vessel.vesselHasImage}">Yes</span>
                        <span v-else>No</span>  </td>
                    </tr>
                    <tr>
                        <th scope="row">Is On Watch List?</th><td><input class="wfc" type="checkbox" v-model="vessel.vesselWatchOn" v-on:change="changeDetected" />&nbsp;
                         <span v-if="vessel.vesselWatchOn" v-bind:class="{'watchOn': vessel.vesselWatchOn}">Yes</span>
                         <span v-else>No</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Image URL</th><td><input class="wfc" name="vesselImageUrl" type="text" v-model="vessel.vesselImageUrl" v-on:change="changeDetected" size="100"></td>
                    </tr>  
                    <tr>      
                        <td colspan="2" class="w-25">
                            <img data-bind="attr: { src: vesselImageUrl, alt:'Image of '+ vesselName}" class="img-fluid img-thumbnail" :src="vessel.vesselImageUrl" height="240" >
                            <button v-if="changed" v-on:click="saveData()" class="example_a">Save Changes</button>
                            <button v-on:click="useDefaultUrl()" class="example_b">Default URL</button>
                            <button v-on:click="useOldUrl()" class="example_b">Old URL</button>
                            <button v-on:click="useNoImageUrl()" class="example_b">No Image URL</button>
                        </td>
                    </tr>	  		  
                    </table>   
                </div>
            </div>
        </div>
    </div>
  
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { firestore } from '@/store/firebaseApp.js'
import { doc, setDoc } from 'firebase/firestore'
// onSnapshot, collection, query, where
//import { format, lastDayOfMonth, startOfYesterday, endOfYesterday, setHours } from 'date-fns'

const db = firestore

export default {
    props: ['vesselID'],
    mounted() {
      this.refreshData()
      this.$store.commit('setSlate', 'ADMIN')
      this.$store.commit('setPageSelected', 'AdminDetail')
    },
    data: function() {
        return {
            changed: false,
            vessel: "", //this.$store.getters.getVesselDetail(this.vesselID)[0],
            oldUrl: ""
        }        
    },
    methods: {
        refreshData() {
            this.vessel = this.$store.getters.getVesselDetail(this.vesselID)[0]
            if(typeof this.vessel == 'object') {
              this.oldUrl = this.vessel.vesselImageUrl
            }
            
        },
        useOldUrl() {
          this.vessel.vesselImageUrl = this.oldUrl
          this.changed = true
        },
        useDefaultUrl() {
          this.vessel.vesselImageUrl = process.env.VUE_APP_IMG_URL + "images/vessels/mmsi" + this.vessel.vesselID + ".jpg"
          this.changed = true
        },
        useNoImageUrl() {
          this.vessel.vesselImageUrl = process.env.VUE_APP_NOIMG_URL
        },
        changeDetected() {
            this.changed = true
        },

        saveData() {
            //Clone vessel obj... 
            var  vesselClone = Object.assign({}, this.vessel)
            //...and remove extra properties before sending to db
            delete vesselClone.index
            delete vesselClone.vesselRecordAddedDate
            const vessRef = doc(db, 'Vessels', 'mmsi'+this.vessel.vesselID)
            setDoc(vessRef, vesselClone, {merge: true})
            this.changed = false
        },
        
    }

}
</script>

<style>
th {
  padding: 5px;
  background-color: rgb(228, 231, 231);
}

.container {
  margin: auto; 
  width: 50em;
  padding: 2rem 0rem; 
}

.example_a {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #ed3330;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
}

.example_a:hover {
  background: #434343;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
  transition: all 0.4s ease 0s;
}

.myForm {
font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
font-size: 0.8em;
width: 20em;
padding: 1em;
border: 1px solid #ccc;
}

.myForm * {
box-sizing: border-box;
}

.myForm fieldset {
border: none;
padding: 0;
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

td {
  text-align: left;
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

.example_a {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #ed3330;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
}

.example_a:hover {
  background: #434343;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
  transition: all 0.4s ease 0.4s;
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
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
  transition: all 0.4s ease 0s;
}
.myForm legend,
.myForm label {
padding: 0;
font-weight: bold;
}

.myForm label.choice {
font-size: 0.9em;
font-weight: normal;
}

.myForm input[type="text"],
.myForm input[type="tel"],
.myForm input[type="email"],
.myForm input[type="datetime-local"],
.myForm select,
.myForm textarea {
display: block;
width: 100%;
border: 1px solid #ccc;
font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
font-size: 0.9em;
padding: 0.3em;
}

.myForm textarea {
height: 100px;
}


.myForm button {
padding: 1em;
border-radius: 0.5em;
background: #eee;
border: none;
font-weight: bold;
margin-top: 1em;
}

.myForm button:hover {
background: #ccc;
cursor: pointer;
}



  
h4 {
    margin: 2rem 0rem 1rem;
}
  
.table-image td, .table-image th {    
  vertical-align: middle;
}
  
/* Experimental form style from a site */


.form-style-3{
	max-width: 450px;
	font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}

.form-style-3 div {
	padding-bottom: .5rem;
}
.form-style-3 label{
	display:block;
	margin-bottom: 10px;
}
.form-style-3 label > span{
	float: left;
	width: 100px;
	color: #F072A9;
	font-weight: bold;
	font-size: 13px;
	text-shadow: 1px 1px 1px #fff;
}
.form-style-3 fieldset{
	border-radius: 10px;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	margin: 0px 0px 10px 0px;
	border: 1px solid #FFD2D2;
	padding: 20px;
	background: #FFF4F4;
	box-shadow: inset 0px 0px 15px #FFE5E5;
	-moz-box-shadow: inset 0px 0px 15px #FFE5E5;
	-webkit-box-shadow: inset 0px 0px 15px #FFE5E5;
}
.form-style-3 fieldset legend{
	color: #FFA0C9;
	border-top: 1px solid #FFD2D2;
	border-left: 1px solid #FFD2D2;
	border-right: 1px solid #FFD2D2;
	border-radius: 5px 5px 0px 0px;
	-webkit-border-radius: 5px 5px 0px 0px;
	-moz-border-radius: 5px 5px 0px 0px;
	background: #FFF4F4;
	padding: 0px 8px 3px 8px;
	box-shadow: -0px -1px 2px #F1F1F1;
	-moz-box-shadow:-0px -1px 2px #F1F1F1;
	-webkit-box-shadow:-0px -1px 2px #F1F1F1;
	font-weight: normal;
	font-size: 12px;
}
.form-style-3 textarea{
	width:250px;
	height:100px;
}
.form-style-3 input[type=text],
.form-style-3 input[type=date],
.form-style-3 input[type=datetime],
.form-style-3 input[type=number],
.form-style-3 input[type=search],
.form-style-3 input[type=time],
.form-style-3 input[type=url],
.form-style-3 input[type=email],
.form-style-3 select, 
.form-style-3 textarea,
.form-style-3 datalist {
	border-radius: 3px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	border: 1px solid #FFC2DC;
	outline: none;
	color: #F072A9;
	padding: 5px 8px 5px 8px;
	box-shadow: inset 1px 1px 4px #FFD5E7;
	-moz-box-shadow: inset 1px 1px 4px #FFD5E7;
	-webkit-box-shadow: inset 1px 1px 4px #FFD5E7;
	background: #FFEFF6;
	width:50%;
}
.form-style-3  input[type=submit],
.form-style-3  input[type=button]{
	background: #EB3B88;
	border: 1px solid #C94A81;
	padding: 5px 15px 5px 15px;
	color: #FFCBE2;
	box-shadow: inset -1px -1px 3px #FF62A7;
	-moz-box-shadow: inset -1px -1px 3px #FF62A7;
	-webkit-box-shadow: inset -1px -1px 3px #FF62A7;
	border-radius: 3px;
	border-radius: 3px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;	
	font-weight: bold;
}
.required{
	color:red;
	font-weight:normal;
}
</style>