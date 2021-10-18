<template>
  <AdminSubMenu></AdminSubMenu>
  <div class="title4 mb2">
  Administrator Login Required
</div>

<w-input
  class="mb2"
  v-model='email'
  label="Email"
  type="email"
  label-position="left"
  outline
  inner-icon-left="mdi mdi-account">
</w-input>

<w-input np
  class="mb2"
  v-model='password'
  label="Password"
  :type="isPassword ? 'password' : 'text'"
  :inner-icon-left="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
  :inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
  @click:inner-icon-right="isPassword = !isPassword">
</w-input>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const auth = getAuth();


export default {
    data: function() {
        return {
            email: null,
            password: null
        }
        
    },
    methods: {
        submitLogin: function(e) {
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                // Signed in 
                this.$store.state.a.currentUser.cred = userCredential.user;
                this.$store.state.a.currentUser.isLoggedIn = true;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        }
    },
    components: {
        AdminSubMenu
    }
}
</script>

<style>

</style>