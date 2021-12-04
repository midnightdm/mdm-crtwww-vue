<template>
  <div class="logo-container">
      <h1>clinton<span>river</span>traffic</h1>
      <img :src="logoImgUrl" :alt="logoImgAlt" :title="logoImgAlt" class="logo-img">
      <div id="mbbg" class="hasNav">
          <!-- hidden checkbox is used as click reciever -->
          <input type="checkbox" />    
          <!--    Some spans to act as a hamburger. -->
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu" class="nav">
              <li><router-link class="nav-link" :to="{name: 'About'}">ABOUT</router-link></li>
              <li><router-link id="alerts-link" :to="{name: 'AlertsAll'}" class="nav-link" :class="{ 'router-link-active': alertsLinkActive }" exact>ALERTS</router-link></li>
              <li><router-link class="nav-link" :class="{'router-link-active': galleryLinkActive}" :to="{name: 'Video'}">GALLERY</router-link></li>
              <li><a class="nav-link" :href="urlLive">LIVE</a></li>
              <li><router-link :to="{name: 'Logs'}" class="nav-link" :class="{ 'router-link-active': logsLinkActive}">LOGS</router-link></li>
              
          </ul>
      </div>
      <div id="title_slate">{{ slate }}</div>
  </div>
</template>

<script>
import AlertsPass from '@/views/alerts/AlertsPass.vue'

export default {
  data: function() {
    return {
      logoImgUrl: process.env.VUE_APP_BASE_URL+'/images/logo-towboat2.png',
      logoImgAlt: 'The logo image shows a tow boat pushing 9 barges.',
      urlAbout: process.env.VUE_APP_BASE_URL+'/about',
      urlAlerts: process.env.VUE_APP_BASE_URL+'/alerts',
      urlLive: process.env.VUE_APP_BASE_URL+'/livescan/live',
      urlManage: process.env.VUE_APP_BASE_URL+'/manage',
      urlVideo: process.env.VUE_APP_BASE_URL+'/video',
    
    }
  },
  computed: {
    slate () {
      return this.$store.state.a.slate
    },
    alertsLinkActive() {
      return this.$store.state.a.alertsLinkActive
    },
    logsLinkActive() {
      return this.$store.state.a.logsLinkActive
    },
    galleryLinkActive() {
      return this.$store.state.a.galleryLinkActive
    } 
  },
  name: 'CrtLogo'
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.logo-container {  
  height: 100px;
}

.logo-img {   
  position: absolute;
  left: 0px;
  z-index: 2;
}
 
.logo-container h1 {     
  position:absolute;
  font-family: 'Merriweather Sans', sans-serif;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.50);
  z-index: 3;
}
  
#mbbg {
  position: absolute;
  left: 0;
  /* top: 125px; */
  width: 100%;
  height: 50px;
  background: #31363e;
}
 
 #title_slate {
   font-family: 'Rubik', sans-serif;
   font-size: 2em;
   position: absolute;
   right: 25px;
   background-color: #FFFF00;
   border: 0px solid #000000;
   text-align: center;
   z-index: 4;
 }
 
 .logo-container h1 span {
  color: blue;
  -webkit-background-clip: text;
  background-clip: text;  
  -webkit-text-fill-color: transparent;
  background-image: url(https://www.clintonrivertraffic.com/images/crushpixel-1625816-ID1625816-640x427.jpg);
}
 
.nav {
   margin: 0px 0 0px 0;
   padding: 0px 0px 0px 0;
   background: #31363e;
   z-index: 1;  
}

.nav ul { 
  margin: 0px 0px 0px 0px;
  padding: 5px 5px 5px 5px;
  background: #31363e;
}
 
                         
.nav li {
  list-style: none;
  float: left;
  margin: 7px;
  padding: 0;
  font-family: sans-serif;
  font-size: 1em;
  letter-spacing: 2px;  
  border: 5px;
  border-color: #31363e; 
}
 
 .nav li a, .nav li router-link {  
   float: left;
   vertical-align: middle;
   padding: 10px 12px;
   text-decoration: none;
   color: #e7e3d9;
   border: none; 
 }
 
 .nav li a.selected, .nav li .router-link-active {
   background: white;
   color: red;
  
 }
 
 .nav li .selected {
   border: 5px;
   border-color: #31363e;
 }
 
 .nav li a:hover {
   color: red;
  
 }

/* insert */

 /* Phone */
 @media (max-width: 400px) {
  #logo-img {
    top: 10px;
    width: 175px;
    height: 70px;
  }
  .logo-container h1 {
    font-size: 16pt;
    top: 20px;
    left: 40px;
  }
  #title_slate {
    font-size: .75em;
    margin: 18px 25px 24px 0;
    padding: 5px 5px 5px 5px;
  }
  #mbbg {
    top: 70px;
  }


  #mbbg
  {
    display: block;
    position: relative;
    top: 60px;
    left: 0px; 
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
  }
  
  
  #mbbg a
  {
    text-decoration: none;
    color: #e7e3d9;
    transition: color 0.3s ease;
  }
  
  #mbbg a:hover, a.selected
  {
    color: red;
  }
  
  
  #mbbg input
  {
    display: block;
    width: 40px;
    height: 50px;
    position: absolute;
    top: 0px;
    left: 0px; 
    cursor: pointer;
    opacity: 0; /* hide this */
    z-index: 2; /* and place it over the hamburger */
    -webkit-touch-callout: none;
  }
  
  /*
   * Just a quick hamburger
   */
  #mbbg span
  {
    display: block;
    width: 33px;
    height: 4px;
    margin-left: 10px;
    margin-bottom: 5px;
    position: relative;
    top: 15px;
    left: 0px;
    background: #cdcdcd;
    border-radius: 3px;
    
    z-index: 4;
    
    transform-origin: 4px 0px;
    
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                opacity 0.55s ease;
  }
  
  #mbbg span:first-child
  {
    transform-origin: 0% 0%;
    margin-top: 10px;
  }
  
  #mbbg span:nth-last-child(2)
  {
    transform-origin: 0% 100%;
  }
  
  /* 
   * Transform all the slices of hamburger
   * into a crossmark.
   */
  #mbbg input:checked ~ span
  {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: red;
  }
  
  /*
   * But let's hide the middle one.
   */
  #mbbg input:checked ~ span:nth-last-child(3)
  {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }
  
  /*
   * Ohyeah and the last one should go the other direction
   */
  #mbbg input:checked ~ span:nth-last-child(2)
  {
    transform: rotate(-45deg) translate(0, -1px);
  }

  #menu
{
  position: absolute;
  width: 300px;
  margin: -100px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;
  
  background: #31363e;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */
  
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}

#menu li
{
  border: 2px solid red;
  padding: 10px 0;
  width: 300px;
  font-size: 22px;
}

/*
 * And let's slide it in from the left
 */
#mbbg input:checked ~ ul
{
  transform: none;
}

 }
 
 /* Tablet */
 @media (min-width: 401px) {
  .logo-img {
    top: 10px;
    width: 200px;
    height: 95px;
  }
  .logo-container h1 {
    font-size: 24pt;
    top: 20px;
    left: 50px;
  }
  #title_slate {
    font-size: 1.5em;
    margin: 75px 25px 24px 0;
    padding: 5px 5px 5px 5px;
  }
  #mbbg {
    top: 95px;
  }
  #main {
    top: 90px;
  }
  #mbbg input { display:none; }
  #mmbg span { display:none; }
 }
 /* Desktop*/
 @media (min-width: 601px) {
  .logo-img {
    top: 10px;
    width: 320px;
    height: 130px;
  }
  .logo-container h1 {
    font-size: 40pt;
    top: 20px;
    left: 65px;
  }
  #title_slate {
    font-size: 2em;
    margin: 95px 25px 24px 0;
    padding: 10px 10px 10px 10px;
  }
  #mbbg {
    top: 125px;
  }
  #main {
    top: 70px;
  }
  #mbbg input { display:none; }
  #mmbg span { display:none; }
 }

 
</style>
