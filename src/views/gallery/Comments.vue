<template>
  <main id="Comments">
    <h1>Comments</h1>
    <section>
      
        <div class="comment-input">
        <div class="left">
            <w-textarea
            class="mb4"
            id="add-comment"
            label-position="left"
            :placeholder="phMsg" 
            rows="1" 
            v-model="addCommentInput"      
            >
            
            <div class="label-holder" v-if="$store.state.c.loggeduserPhotoUrl !==''">
              <img :src="$store.state.c.loggeduserPhotoUrl" class="user-photo"/><w-icon class="orange">mdi mdi-arrow-right
              </w-icon>
            </div>
            <div class="label-holder" v-else>
              <span class="user-label" :class="genColorClass()">{{$store.state.c.loggeduserName[0]}}</span><w-icon class="orange">mdi mdi-arrow-right
              </w-icon>
            </div>

            
                
            </w-textarea>
            <input type="text" style="display: none;" />
          </div>
          <div class="right"  v-show="store.state.c.loggeduserSignedIn">
            <w-button @click="cancelComment" class="ma1 item" bg-color="secondary" md>CANCEL</w-button>
            <w-button class="ma1 item" bg-color="gray" md>COMMENT</w-button>
          </div>
        </div> 
      
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
    Comments <span v-show="formShowing=='signin'">&nbsp;Login</span> <span v-show="formShowing=='signup'">&nbsp;Sign Up</span>
  </template>
  <div class="modal-body">


    <!-- Sign In Form -->
    <div class="title4 mb2" v-show="formShowing=='signin'">       
        <form id="signin-form" name="signin-form" @submit.prevent="handleSigninSubmit">
          <w-input
          class="mb2"
          name="email"
          type="email"
          placeholder="Email"
          outline
          >
          </w-input>

          <w-input 
          class="mb2"
          name="password"
          :type="isPassword ? 'password' : 'text'"
          placeholder="Password"
          outline  
          :inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
          @click:inner-icon-right="isPassword = !isPassword">
          </w-input>
         
          <w-button
            type="submit"
            class="px4 btnGrpA"
            bg-color="primary"
            dark>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log In&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </w-button> 
        
        <div class="K-1uj Z7p_S">
          <div class="s311c"></div>
          <div class="_0tv-g">or</div> 
          <div class="s311c"></div>
        </div>

        <div class="spacer" />
        <p></p>
        <w-button
            
            class="px4 btnGrpA"
            bg-color="primary"
            dark
            @click.prevent="handleGoogleSignin">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign In With Google&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </w-button> 
        <p>Don't have an account? <button @click.prevent="toggleForm">Sign Up</button></p>
        <w-button @click.prevent="closeDialog">Close </w-button>&nbsp;
        </form>
      </div>
      
    
    <!-- Sign Up Form -->
    <div class="description" id="vm-description" v-show="formShowing=='signup'">
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
  
          :inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
          @click:inner-icon-right="isPassword = !isPassword">
          </w-input>
        
          <div class="spacer" />
          <w-button @click.prevent="closeDialog">Close </w-button>&nbsp;
          
          <w-button type="submit">Subscribe</w-button>  
      </form>
    </div>
  </div>
          
</w-dialog>

</template>

<script>
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from "firebase/auth"
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'
import {userAuthState} from '@/store/firebaseApp.js'

export default {
  name: 'VModel',
  setup() {
    const uas = userAuthState()
    const router = useRouter()
    const store = useStore()
    const provider = new GoogleAuthProvider();
    
    const dialogOn = ref(false)
    let addCommentInput = ref("")
    const formShowing = ref("signin")
    const dialogFullscreen = false
    const dialogPersistent = true
    const dialogPersistentNoAnimation = false
    const dialogWidth = 450
    const dialogRemove = false

    const phMsg = computed(
      () => { 
        if(store.state.c.loggeduserSignedIn) {
          return "Add a comment as "+store.state.c.loggeduserName+"..."
         } else {
           return "Log in to add a comment"
         }
      }
    )

    const dialogWatch = watchEffect( () => {
      if(store.state.c.loggeduserShowForm) {
        dialogOn.value = true
      } else {
        dialogOn.value = false
      } 
    })

    const handleSigninSubmit = async e => {
      const { email, password } = e.target.elements
      try {
          console.log("handleSigninSubmit()")
          closeDialog()
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

    const handleGoogleSignin = async e => {
      signInWithPopup(uas.auth, provider).then( async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const guser = result.user;
        console.log("Google User Signed In:", guser)
        await store.dispatch('saveLoggeduserCredentials', guser)
        await store.dispatch('testLoggeduserIsAdmin', guser.uid)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Google Sign In Error:", errorMessage, email)
        // ...
      });
    }

    const handleRegisterSubmit = async e => {
      const { email, password } = e.target.elements
      console.log("handleRegisterSubmit()")
      closeDialog()
        try {
            await createUserWithEmailAndPassword(uas.auth, email.value, password.value)
            .then(async (userCredentials) => {
                let payload = { user: userCredentials, type: "cred"}
                if(userCredentials.user.email == email.value)
                await store.dispatch('saveLoggeduserCredentials', payload)
                await store.dispatch('testLoggeduserIsAdmin', userCredentials.user.uid)   
            })
            .catch((error) => {
                alert(error.message)
            })
        } catch(e) {
            alert(e.message)
        }
    }

    const closeDialog = () => {
      store.commit('SHOW_LOG_IN_FORM', false)
      formShowing.value='signin'
    }

    const genColorClass = () => { //Input a letter
        let lc = store.state.c.loggeduserName.toLowerCase()
        let ascii = lc.charCodeAt(0)
        if(ascii <  97 || ascii > 122) return 'v0';
        if(ascii >  96 && ascii < 101) return 'v1';
        if(ascii > 100 && ascii < 106) return 'v2';
        if(ascii > 105 && ascii < 110) return 'v3';
        if(ascii > 109 && ascii < 114) return 'v4';
        if(ascii > 113 && ascii < 119) return 'v5';
        if(ascii > 118 && ascii < 123) return 'v6';
    }

    const handleCommentSubmit = () => {
      const comment = {
        'userName': store.state.c.loggeduserName,
        'userIcon': store.state.c.loggeduserPhotoUrl,
        'msgTxt': addCommentInput.value,
        'likeCount': 0,
        'dislikeCount': 0,
        'repliesCount': 0,
        'replies': []
      }
    }

    const toggleForm = () => {
      if(formShowing.value == 'signup') {
        formShowing.value = 'signin'
      } else if(formShowing.value = 'signin') {
        formShowing.value = 'signup'
      }
      console.log(formShowing.value)
    }

    const submitComment = () => {}
    const cancelComment = () => {
      addCommentInput.value = ""
    }

    onMounted(async () => {
      store.commit('setPageSelected', 'Comments')
      store.commit('setSlate', 'COMMENTS')
    })


    return { 
      addCommentInput, handleCommentSubmit, handleSigninSubmit, handleRegisterSubmit, handleGoogleSignin, cancelComment, submitComment, store, dialogOn, closeDialog, dialogFullscreen, dialogPersistent, dialogPersistentNoAnimation, dialogWidth, dialogRemove, genColorClass, formShowing, phMsg, uas, toggleForm
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
#Comments { 
  padding-top: 10rem;

}

.comment-input {
  padding-inline: 1rem;
  
}

form#signin-form {
  width: 80vw;
  margin-left: 10%;
  margin-right: auto;
}

.left {
  text-align: left;
}
.right {
  text-align: right;
}

.label-holder {
  display: inline;
}

.orange {
  transform: translateY(-13px);
}
.user-photo {
  width: 50px;
  height: 50px;
  border-radius: 60%;
  padding: 5px;
}

.user-label {
  text-transform: uppercase;
  transform: translateY(10px); 
  color: white;
  padding: 5px 8px 3px 8px;
  border-radius: 60%;
  font-size: 18px; 
  margin: 6px 1px; 
}

.user-label.v0 {
  background-color: black;
}

.user-label.v1 {
  background-color: navy;
}

.user-label.v2 {
  background-color: maroon;
}

.user-label.v3 {
  background-color: rgba(255, 255, 0, 0.603);
}

.user-label.v4 {
  background-color: green;
}

.user-label.v5 {
  background-color: salmon;
}

.user-label.v6 {
  background-color: orangered;
}


#signup-form, #signin-form {
  max-width: 375px;
  padding: 1.5rem 0rem;
  line-height: 3rem;
}

/* Begin Line Seperator Effect */
._0tv-g {
  color: #8e8e8e;
  color: rgba(var(--f52,142,142,142),1);
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  margin: 0 18px;
  text-transform: uppercase;
}

.Z7p_S {
  margin: 10px 40px 18px;
}

.K-1uj {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}

.s311c {
  background-color: #dbdbdb;
  background-color: rgba(var(--b38,219,219,219),1);
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  height: 1px;
  position: relative;
  top: .45em;
}

/* End Line Seperator Effect */

@media (max-width: 750px) {
  #Comments {
    padding-top: 7rem;
    
  }
}
</style>