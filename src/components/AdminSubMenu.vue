<template>
  <ul class="nav2">
    <li class="nav-link">
        <router-link v-if='this.$store.state.a.currentUser.isLoggedIn'  :to="{name: 'Login'}" v-on="logout">Logout</router-link>
        <router-link v-else  :to="{name: 'Login'}">Login</router-link>
    </li>
    <li class="nav-link"><router-link :to="{name: 'Add'}">Add</router-link></li> |
    <li class="nav-link"><router-link :to="{name: 'All'}">All</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Passenger'}">Passenger</router-link></li>
    <li class="nav-link"><router-link :to="{name: 'Subscribers'}">Subscribers</router-link></li>

</ul>
</template>

<script>
import firebase from '@/store/firebaseApp.js'
import { getAuth, signOut, } from "firebase/auth";

const auth = getAuth();

export default {
    name: 'AdminSubMenu',
    methods: {
        logout: function() {
            signOut(auth).then(()=>{
                //Signout sucessful
                this.$store.state.a.currentUser.isLoggedIn = false;
                this.$store.state.a.currentUser.cred = null;
            })
        }
    }
}
</script>

<style>

</style>