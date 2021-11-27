<template>
  <w-app>
    <CrtLogo></CrtLogo>
    <div class="routerView"> 
      <router-view/>
      </div>
  </w-app>
</template>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  line-height: normal;
  }

#main {
  position: relative;
}

main {
  width: 80%;
  margin: 20px auto 20px auto;
}



.nav2 a {
  color: #2c3e50;
}


.nav2 { 
    position: relative;
    top: 70px;
    width: 100%;
    margin: 0px 0px 20px 0px;
    padding: 0px 0px 10px 10px;
    background-color: #31363e;
    z-index: 0;  
    overflow: auto;
}
  
.nav2 ul { 
   margin: 0px 0px 0px 0px;
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
  
.nav2 li a, .nav2 li router-link {  
    float: left;
    vertical-align: middle;
    padding: 10px 12px;
    text-decoration: none;
    text-transform: uppercase;
    color: #e7e3d9;
    border: none;   
}

.nav2 li a.router-link-active,
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
