<template>
  <main id="Comments">
    <section v-show="store.state.c.loggeduserShowForm">
     
      <div class="title4 mb2">    
        <h2>Login Required To Write Comments</h2>
        <form name="signin-form" @submit.prevent="handleSigninSubmit">

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
          <button type="submit">Login</button>&nbsp;
          <!-- Button to trigger modal -->
          <w-button
            class="px4 btnGrpA"
            @click="dialogOn = true"
            bg-color="primary"
            dark>
            Register New
          </w-button> 
        </form>
      </div>
    </section>
    <section>
      <h1>Comments</h1>
       
    </section>
  </main>

<!-- Modal for active list selection -->
<w-dialog  id="actualModal" 
  v-model="dialogOn"
  :width="500"
  :persistent="dialogPersistent"
  :persistent-no-animation="dialogPersistentNoAnimation"
  title-class="primary-light1--bg white"
  >    
  <template #title>
    Create Login Credentials
  </template>
  <div class="modal-body">
    <div class="description" id="vm-description">
      <form name="signup-form" @submit.prevent="handleRegisterSubmit">

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
        
          <div class="spacer" />
          <w-button @click="dialogOn = false">Close </w-button>&nbsp;
          
          <w-button type="submit">Subscribe</w-button>  
      </form>
    </div>
  </div>
          
</w-dialog>

</template>

<script>
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import {userAuthState} from '@/store/firebaseApp.js'

export default {
  name: 'VModel',
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
              alert(error.message)
          })
      } catch(e) {
          alert(e.message)
      }
    }

    const handleRegisterSubmit = async e => {
      const { email, password } = e.target.elements
      console.log("handleRegisterSubmit()")
      dialogOn.value = false
        try {
            await createUserWithEmailAndPassword(uas.auth, email.value, password.value)
            .then(async (userCredentials) => {
                if(userCredentials.user.email == email.value)
                await store.dispatch('saveLoggeduserCredentials', userCredentials)
                await store.dispatch('testLoggeduserIsAdmin', userCredentials.user.uid)   
            })
            .catch((error) => {
                alert(error.message)
            })
        } catch(e) {
            alert(e.message)
        }
    }

    onMounted(async () => {
      store.commit('setPageSelected', 'Comments')
      store.commit('setSlate', 'COMMENTS')
    })


    return { 
      handleSigninSubmit, handleRegisterSubmit, store, dialogOn, dialogFullscreen, dialogPersistent, dialogPersistentNoAnimation, dialogWidth, dialogRemove, uas
    }
  },
  data: function() {
    return {
      isPassword: true,
    }
  }
}
</script>

<style>
#Comments section { 
  padding-top: var(--menu-pad-wide-a);

}


form {
  margin: auto;
  width: 25rem;
}

fieldset {
    width: 5em;
    padding: 1em;
}

@media (max-width: 750px) {
  #Comments section {
    padding-top: var(--menu-pad-mobile);
    
  }
}
</style>