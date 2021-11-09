<template>
 <LogsSubMenu></LogsSubMenu>
  <div id="main" class="logs">
      <h1>List of Vessels Logged</h1>
    <p>The transponder-equipped vessels below passed Clinton most recently on the date shown. Select a vessel to view all its passages.</p>
      <div v-if=" this.$store.state.a.passagesList[0].type != 'loading'">
        <ul class="vessels-list" v-for="vessel in this.$store.state.a.passagesList" :key="vessel.id">
        <li>
        <router-link :to="{ name: 'Detail', params: { id: vessel.id }}"><h4>{{ vessel.name}}</h4>
          <div class="shipBox">
            <img class="img-fluid img-thumbnail" :src="vessel.image" :alt="'Shows an image of vessel '+ vessel.name"   width="200">
            <div class="shipBoxData">
                <span>{{vessel.date}}</span>
            </div>
          </div>
          </router-link>
        </li>    
      </ul>  
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
    this.$store.dispatch("fetchPassagesList")
  },
  beforeUpdate() {
    this.$store.commit('setSlate', 'LOGS')
  },
  data: function() {
    return {
      logoImgUrl: process.env.VUE_APP_BASE_URL+'/images/logo-towboat2.png',
      logoImgAlt: 'The logo image shows a tow boat pushing 9 barges.',
      urlAbout: process.env.VUE_APP_BASE_URL+'/about',
      urlAlerts: process.env.VUE_APP_BASE_URL+'/alerts',
      urlLive: process.env.VUE_APP_BASE_URL+'/livescan/live',
      urlManage: process.env.VUE_APP_BASE_URL+'/manage',
      urlVideo: process.env.VUE_APP_BASE_URL+'/video',
      slate: 'LOGS'
    }
  },
  components: {
    LogsSubMenu
  }
}
</script>
<style>
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
  
  
  ul .vessels-list {
      display: flex;
      list-style: none;
      margin: 2px;
      padding: 2px;
    
  }  
  
  div .img-container {
    display:flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  
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
      flex-wrap: wrap;
      justify-content: space-between;
      float: left;
      margin: 2px;
      padding: 5px;
      font-family: sans-serif;
      font-size: 12pt;
      letter-spacing: 2px;  
      border: 5px;
      border-color: #31363e; 
  }
  


 
</style>