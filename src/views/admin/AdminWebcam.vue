<template>
  <AdminSubMenu class="adminsub"></AdminSubMenu>

  <main class="local">  
    <div id="AdminWebcam" class="AdminWebcam">

      <div class="flex-container">
        <div class="flex-item">
            <h1>Webcam Control</h1>
            <h3 v-if="this.$store.state.b.adminMsg.showClVideo" class="green">TRIGGER ACTIVE</h3>
            <h3 v-else class="red">TRIGGER OFF</h3>
           <p v-if="this.$store.state.b.adminMsg.showClVideo">Cabin webcam activation has been triggered by a near by vessel.</p>
            <p v-else>The cabin webcam is not currently triggered by any vessels.</p>
            <button class="example_b" v-on:click="toggleWebcam">
              <span v-if="this.$store.state.b.adminMsg.showClVideoOn">Disable</span>
              <span v-else>Enable</span>
            </button><br>
            <p v-if="this.$store.state.b.adminMsg.showClVideoOn">The cabin webcams are currently <span class="green">Enabled</span>. If triggered by a vessel passage, video will display publicly. Press the button above to override server control.</p>
            <p v-else>The cabin webcams are currently <span class="red">disabled</span>.  Even if triggered by a vessel passage, video will NOT go out publicly. They will remain disabled until your press the button above.</p>
            
        </div>
        <div class="flex-item">
          <div class="flex-item thumbnail-container slotb">
          <div class="thumbnail">
            <iframe src="https://173.16.65.69:41080" frameborder="0"></iframe>
          </div>
        </div>
        </div>
        <div class="flex-item">
          <video id="cameraA" ref="videoCamA" autoplay="true" muted></video>
          </div>
        <div class="flex-item">
          <video id="camaraB" ref="videoCamB" autoplay="true" muted></video>
        </div>
      </div>
         
       
          
          
        
    </div>
  </main>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import Hls from '@/assets/classes/hls.min.js'
//import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { firestore } from '@/store/firebaseApp.js'
import { doc, setDoc } from 'firebase/firestore'

const db = firestore
const adminMsgRef = doc(db, 'Passages', 'Admin')
const hlsA = new Hls()
const hlsB = new Hls()

export default {


    created() {
      this.$store.dispatch("fetchAdminMsg")
    },
    mounted() { 
      this.$store.commit('setSlate', 'ADMIN')
      this.$store.commit('setPageSelected', 'AdminWebcam')
      this.initCameras()
    },
    data: function() {
      return {
        router: useRouter(),
        adminMsgClone: {},
         
      }
    },
    // computed: {
    //   adminMsg() {
    //     this.adminMsgClone = Object.assign({}, this.$store.state.b.adminMsg )
    //     return this.$store.state.b.adminMsg      
    //   }
    // },
    methods: {
      toggleWebcam() {
        this.$store.commit('saveShowClVideoOn', !this.$store.state.b.adminMsg.showClVideoOn);
        let adminMsg = this.$store.state.b.adminMsg
        setDoc(adminMsgRef, adminMsg, {merge: true})
        
      },
      initCameras() {
        hlsA.attachMedia(this.$refs.videoCamA)
        hlsB.attachMedia(this.$refs.videoCamB)
        hlsA.loadSource("http://173.16.65.69:41080/clintonWebcamA.m3u8");
        hlsB.loadSource("http://173.16.65.69:41080/clintonWebcamB.m3u8");
        
      },

      showObj() {
        console.log("adminMsg called", this.adminMsg)
  
      },

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


.red {
  color: red;
}

.green {
  color: rgb(5, 198, 5);
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem;
  gap: 10px 20px;
}

.thumbnail iframe {
  width: 1920px;
  height: 1080px;
}

.flex-item {
  max-width: 40vw;
}

.slota, .slotb {
  max-height: 280px;
}
.thumbnail {
  position: relative;
  -ms-zoom: 0.25;
  -moz-transform: scale(0.25);
  -moz-transform-origin: 0 0;
  -o-transform: scale(0.25);
  -o-transform-origin: 0 0;
  -webkit-transform: scale(0.25);
  -webkit-transform-origin: 0 0;
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
  main#AdminWebcam {
    padding-top: var(--menu-pad-mobile);
  }
}

</style>