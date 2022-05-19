<template>
<main>
  <div class="title4 mb2">    
    <h2>Administrator Login Required</h2><br>
    <form @submit.prevent="handleSigninSubmit">

        <w-input
        class="mb2"
        label="Email"
        name="email"
        type="email"
        placeholder="email"
        label-position="left"
        outline
        inner-icon-left="mdi mdi-account">
        </w-input>

        <w-input 
        class="mb2"
        placeholder="password"
        label="Password"
        name="password"
        label-position="left"
        :type="isPassword ? 'password' : 'text'"
        :inner-icon-left="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
        :inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
        @click:inner-icon-right="isPassword = !isPassword">
        </w-input>
        <br>
        <w-button
            class="px4 btnGrpA"
            type="submit"
            bg-color="primary"
            dark>
            Login
          </w-button> 
    </form>
    <br>
    <h3 v-show="store.getters.getIsAuthenticated && !store.getters.getIsAdmin" style="color: red">The logged user does not have administrative priveleges.</h3>

</div>
</main>
</template>

<script>

import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import {userAuthState} from '@/store/firebaseApp.js'

export default {
  setup() {
    const uas = userAuthState()
    const router = useRouter()
    const store = useStore()

    const dialogOn = ref(false)
    const dialogFullscreen = false
    const dialogPersistent = false
    const dialogPersistentNoAnimation = false
    const dialogWidth = 399
    const dialogRemove = false

    const handleSigninSubmit = async e => {
      const { email, password } = e.target.elements
      try {
        dialogOn.value = false
        await signInWithEmailAndPassword(uas.auth, email.value, password.value)
        .then(async (userCredentials) => {
            await store.dispatch('saveLoggeduserCredentials', userCredentials)
            await store.dispatch('testLoggeduserIsAdmin', userCredentials.user.uid)    
          })
          .catch((error) => {
              console.log("AdminLogin Error:", error.message)
          })
        .then(()=>{
          router.push('/admin/vessels')
          } )
      } catch(e) {
          alert(e.message)
      }
    }


    onMounted(async () => {

      store.commit('setPageSelected', 'AdminLogin')
      store.commit('setSlate', 'ADMIN LOGIN')

    })

    return { handleSigninSubmit, 
      dialogOn, dialogFullscreen, dialogPersistent, dialogPersistentNoAnimation, dialogWidth, dialogRemove, router, store, uas
    }
  },

  data: function() {
    return {
        isPassword: true
    }
  }
}
</script>

<style>
main {
 padding-top: var(--menu-pad-wide-a);
}

form {
  margin: auto;
  width: 80vw;
}

fieldset {
    width: 5em;
    padding: 1em;
}
</style>