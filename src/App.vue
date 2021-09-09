<template>
<CrtLogo></CrtLogo>
  <ul class="nav2">
    <li class="nav-link"><router-link :to="{name: 'Today'}">Today</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Past24'}">Past 24 Hours</router-link></li> |
    <li class="nav-link"><router-link :to="{name: 'Yesterday'}">Yesterday</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Past7'}">Past 7 Days</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'ThisMonth'}">This Month</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'LastMonth'}">Last Month</router-link></li>
  </ul>
  <router-view/>
</template>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main {
  position: relative;
}

.nav2 {
  padding: 30px;
}

.nav2 a {
  font-weight: bold;
  color: #2c3e50;
}


.nav2 { 
    position: relative;
    top: 70px;
    width: 100%;
    margin: 0px 0px 20px -10px;
    padding: 0 0 0 0;
    background-color: #31363e;
    z-index: 0;  
    overflow: auto;
}
  
.nav2 ul { 
   margin: 0 0 0px 0px;
   padding: 5px 5px 5px 5px;
   background-color: #31363e;
 }
  
                          
.nav2 li {
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
  
.nav2 li a {  
    float: left;
    font-weight: bold;
    vertical-align: middle;
    padding: 10px 12px;
    text-decoration: none;
    color: #e7e3d9;
    border: none;   
}
  
.nav2 li a.router-link-exact-active {
    background: white;
    color: red;
   
}
  
.nav2 li .selected {
    border: 5px;
    border-color: #31363e;
}
  
.nav2 li a:hover {
    color: red;
   
}
</style>
