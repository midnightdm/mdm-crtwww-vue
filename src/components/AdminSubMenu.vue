<template>
  <ul id="asub" class="navigation">
    <li><a class="nav-link sub" href="#" @click="logout">Logout</a></li>
    <li class="nav-link sub"><router-link :to="{name: 'Add'}">Add</router-link></li> 
    <li class="nav-link sub"><router-link :to="{name: 'AdminVessels'}">Vessels</router-link></li>
    <li class="nav-link sub"><router-link :to="{name: 'Subscriptions'}">Subscriptions</router-link></li>
  </ul>
</template>

<script>
import { firebase } from '@/store/firebaseApp.js'
import { userAuthState } from '@/store/firebaseApp.js'
import { getAuth, signOut, } from "firebase/auth"
//import { useRouter } from 'vue-router'
import store from '@/store/index.js'



export default {
    name: 'AdminSubMenu',
    methods: {
        logout: async () => {
            try {
                await signOut(getAuth())
                console.log('adminUser: ', store.state.b.adminUser)
                
            } catch(e) {
                alert(e.message)
            }    
        }        
    }
}
</script>

<style>
.navigation .nav-link {
    font-size: 1.2em;
    padding-bottom: 4px;
    text-transform: uppercase;
}

a, a:visited,
.nav-link, .nav-link:visited {
    font-weight: 500;
    list-style: none;
    color: #fff;
    text-decoration: none;
}

.navigation a.selected,
.navigation router-link.selected {
  background: white;
  color: red;
}

a, a:visited,
.navigation .nav-link:hover,
.dropdown-nav .nav-link:hover {
  color: #00afea;
  border-color: #00afea;
}

.navigation {
  background-color: #31363e;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  transition: 0.5x ease all;
}

.navigation2 {
  flex-direction: column;
  margin-left: 2rem;
}

ul.navigation2 {
  background-color: white; 
}
</style>