<template>
  <button v-bind:class="{ active: scrolled}" id="topbtn" @click="topOfPage">Top</button>
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.$store.commit('setSlate', 'LOGS')
    this.$store.commit('setLogsLinkActive', true)
    this.$store.commit('setPageSelected', 'Logs')
  },
  unmounted() {
    this.$store.commit('setLogsLinkActive', false)
  },
  data: function() {
    return {
      logoImgUrl: process.env.VUE_APP_IMG_URL+'/images/logo-towboat2.png',
      logoImgAlt: 'The logo image shows a tow boat pushing 9 barges.',
      urlAbout: process.env.VUE_APP_BASE_URL+'/about',
      urlAlerts: process.env.VUE_APP_BASE_URL+'/alerts',
      urlLive: process.env.VUE_APP_BASE_URL+'/livescan/live',
      urlManage: process.env.VUE_APP_BASE_URL+'/manage',
      urlVideo: process.env.VUE_APP_IMG_URL+'/video',
      slate: 'LOGS',
      scrolled: false
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
    }  
  },
  components: {
    LogsSubMenu
  }
}
</script>
<style scoped>
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

 
</style>