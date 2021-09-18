<template>
  <ul class="nav2">
    <li class="nav-link"><router-link :to="{name: 'Today'}">Today</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Past24'}">Past 24 Hours</router-link></li> |
    <li class="nav-link"><router-link :to="{name: 'Yesterday'}">Yesterday</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Past7'}">Past 7 Days</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'ThisMonth'}">This Month</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'LastMonth'}">Last Month</router-link></li>
    </ul>
  <div id="main" class="logs">
      <h1>List of Vessels Logged</h1>
    <p>The transponder-equipped vessels below passed Clinton most recently on the date shown. Select a vessel to view all its passages.</p>
    <suspense>
    <template #default>
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
    </template>
    <template #fallback>
      <h4>Please wait while all the vessels load.</h4>
      <p>This could take several seconds...</p>
    </template>
    </suspense>
  </div>
</template>
<script>
export default {
  created: function () {
    this.$store.dispatch("fetchPassagesList")
  }
}
</script>
<style>
h1 {  
    font-family: sans-serif;
    font-size: 20pt;
    line-height: 0.5;
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