<template>
  <ul class="nav2">
    <li class="nav-link">
        <a href="#" @click="logout">Logout</a>
    </li>
    <li class="nav-link"><router-link :to="{name: 'Add'}">Add</router-link></li> 
    <li class="nav-link"><router-link :to="{name: 'AdminVessels'}">Vessels</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Subscriptions'}">Subscriptions</router-link></li>

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

</style>