<template>
  <main id="About">
    <div class="parent" id="content-container">
      <div class="div1">
        <h2>Welcome River Fans</h2>
        <p>This website is for river boat spotters in Clinton, Iowa. It works by collecting each vessel's radio transponder data which is parsed, stored and shown on a map.  You can then use this information to estimate when a riverboat will pass near by.</p>
        <h2>CRT 2.0 Is Here</h2>
        <p>A complete overhaul of the site for 2022 represents months of work. The goal is to make features more friendly to use and look better on mobile devices.</p>
        <p>Improvements Include:</p>
        <ul class="bullets">
          <li>Responsive layout</li>
          <li>Seperate mobile menus</li>
          <li>Side scrolling log data</li>
          <li>Alerts refresh automatically</li>
          <li>Improved notification options</li>
        </ul>
        <p>  
  <router-link :to="{name: 'Manage'}">Notifications</router-link> are now reviewable and customiseable. There was no way to review which type of notification to which you were subscribed previously. Now you can see and change notification settings. Plus there are more choices available.  Notifications for bridge and lock waypoints are still the default, but you can now pick vessel crossings of any river mile markers also. </p>
  <p>Still more enhancements are planned including a Comments page and enabling the gallery to allow user uploads of images and videos.</p>

        <h4>-- Site Owners</h4>
       </div>

        <div class="div2">
          <h1>WHAT DO YOU WANT TO SEE?</h1>
          <em>Let us know what site features you like and what we could have that is missing.</em>
          <h5 class="about">admin@clintonrivertraffic.com</h5>
        </div> 
        
        
        <div class="div3"><h1>RELATED LINKS</h1>
          <ul>
            <li><a href="http://www.cityofclintoniowa.us/departments/parks_grounds_and_facilities/riverview_park.php">Clinton Riverview Park</a></li>
            <li><a href="https://everythingriverfront.com/">Clinton Shopping</a></li>
            <li><a href="https://www.navcen.uscg.gov/?pageName=lnmDistrict&region=8&ext=r">Coast Guard Notices</a></li>
            <li><a href="https://www.mvr.usace.army.mil/Missions/Navigation/Lock-Status/">Lock Status</a></li>
          </ul>
        </div>
    </div>
  </main>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setSlate', 'ABOUT')
    this.$store.commit('setPageSelected', 'About')
  },
  unmounted() {
    this.$store.commit('setSlate', 'LOADING')
    this.$store.commit('setPageSelected', null)
  }
}
</script>

<style>

#content-container {   
  margin: 76px .3rem 13rem .3rem;
  padding-top: 65px;
}

h1 {  
  font-family: sans-serif;
  font-size: 20pt;
  line-height: 1;
}

h5.about {
  margin: 20px 5px 5px 5px;
}
  
.div1 { 
  border-radius: 8px;
  background-color: rgb(104, 10, 10); 
  padding: 1rem;
  font-size: 16px;
}


.div1 h2, 
.div1 h4, 
.div1 li {
  color:darkseagreen;
}
.div1 p {
  
  color:rgb(160, 250, 16);
}


.div2 { 
  border-radius: 8px;
  padding: 20px;
  margin-right: .3rem;
  text-justify: center;
  font-size: 18px;
  background-color: rgb(56, 165, 42);
}

.div2 h1 {
  font-style: italic;
}

.div3 { 
  border-radius: 8px;
  padding: 20px;
  margin-top: .3rem;
  margin-right: .3rem;
  background-color: rgb(75, 42, 165); 
  font-size: 18px;
  
}

.div3 h1 {
  font-style: italic;
}

.div3 ul {
  background-color: rgb(69, 141, 69);
  margin: 20px 5px 5px 5px;
  padding: 0px;
}

ul.bullets {
  list-style-type: disc;
}

@media (min-width: 931px) {
  
  #About .parent {
    padding-top: 75px;
    display: grid;
    grid-template-columns: 75% 25%;
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 3px;
    grid-row-gap: 0px;
  }
  .div1 { 
    grid-area: 1 / 1 / 4 / 2;
  }
  .div2 { 
    grid-area: 1 / 2 / 2 / 3;
  }
  .div3 { 
    grid-area: 2 / 2 / 3 / 3;
  }
  .div4 { 
    border-radius: 8px;
    grid-area: 3 / 2 / 4 / 3;
  }
}

@media (max-width: 750px) {
  #About .parent{
    padding-top: 50px;
    }
}


</style>