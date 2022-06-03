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
            <!-- Only Show label-holder if logged in -->  
            <div v-show="$store.state.c.loggeduserSignedIn===true">  
              <div class="label-holder" v-if="$store.state.c.loggeduserPhotoUrl !==''">
                <img :src="$store.state.c.loggeduserPhotoUrl" class="user-photo"/><w-icon class="orange">mdi mdi-arrow-right
                </w-icon>
              </div>
              <div class="label-holder" v-else>
                <span class="user-label" :class="genColorClass($store.state.c.loggeduserName[1])">{{$store.state.c.loggeduserName[0]}}</span><w-icon class="orange">mdi mdi-arrow-right
                </w-icon>
              </div>              
            </div>
          </w-textarea>

          <input type="text" style="display: none;" />
        </div>
        <div class="right"  v-show="store.state.c.loggeduserSignedIn">
          <w-button @click="cancelComment" class="ma1 item" bg-color="secondary" md>CANCEL</w-button>
          <w-button @click="handleCommentSubmit" class="ma1 item" bg-color="gray" md>COMMENT</w-button>
        </div>
      </div>       
    </section>

    <section class="group">
      <div class="items" v-for="(item, idx) in store.state.a.comments" :key="item.msgID" :options="item">
        <div class="left">
          <div class="label-holder userImg" v-if="item.userIcon !==''">
            <img :src="item.userIcon" class="user-photo"/>
          </div>
          <div class="label-holder" v-else>
            <span class="user-label" :class="genColorClass(item.userName[1])">{{item.userName[0]}}</span>
          </div>   
        </div>
        <div class="shift">
          <div><span class="userName" :class="genColorClass(item.userName[1])">{{item.userName}}</span><timeago class="time" :datetime="new Date(item.ts * 1000)"></timeago>
          </div>
          <p>{{item.msgTxt}}</p>

          <div class="likes">
            <div class="tooltip">
              <font-awesome-icon icon="thumbs-up"  class="gray fa-solid fa-thumbs-up" :class="{self: item.selfLiked}" @click="handleThumbSubmit(item.msgID, 'msg', 'up')" />
              <span class="tooltiptext" :class="{'ison': item.selfLiked}">Remove Like</span>
              <span class="tooltiptext" :class="{'ison': !item.selfLiked}">Like</span>
              &nbsp;&nbsp;<span class="gray">{{item.likes.length}}</span> &nbsp;
            </div>
            <div class="tooltip">
              <font-awesome-icon icon="thumbs-down"   class="gray fa-solid fa-thumbs-down" :class="{self: item.selfDisliked}" @click="handleThumbSubmit(item.msgID, 'msg', 'dn')"/>
              <span class="tooltiptext" :class="{'ison': item.selfDisliked}">Remove Dislike</span>
              <span class="tooltiptext" :class="{'ison': !item.selfDisliked}">Dislike</span>
              &nbsp;<span class="gray">{{item.dislikes.length}}</span>&nbsp;
            </div>
            <a href="javascript:void(0)" class="gray" @click="toggleReplyForm(idx)">REPLY</a>
          </div>

          <!-- Reply Form Starts -->
          <div class="comment-input replyform" v-show="item.showreplyform">
            <div class="left">
              <w-textarea
              class="mb4"
              id="add-comment"
              label-position="left"
              :placeholder="rhMsg" 
              rows="1" 
              v-model="addReplyInput"      
              >   
                <div class="label-holder" v-if="$store.state.c.loggeduserPhotoUrl !==''">
                  <img :src="$store.state.c.loggeduserPhotoUrl" class="user-photo"/><w-icon class="orange">mdi mdi-arrow-right
                  </w-icon>
                </div>
                <div class="label-holder" v-else>
                  <span class="user-label" :class="genColorClass($store.state.c.loggeduserName[1])">{{$store.state.c.loggeduserName[0]}}</span><w-icon class="orange">mdi mdi-arrow-right
                  </w-icon>
                </div>              
              </w-textarea>

              <input type="text" style="display: none;" />
            </div>
            <div class="right"  v-show="store.state.c.loggeduserSignedIn">
              <w-button @click="cancelComment(idx)" class="ma1 item" bg-color="secondary" md>CANCEL</w-button>
              <w-button @click="handleReplySubmit(item, idx)" class="ma1 item" bg-color="gray" md>SUBMIT</w-button>
            </div>
          </div>
          <!-- Reply Form Ends -->
          <a href="javascript:void(0)" @click="toggleReplies(idx)">
            <font-awesome-icon icon="caret-right" class="fa-solid fa-caret-right" :class="{active: item.showreplies}" />&nbsp;{{item.repliesData.length}} REPLIES
          </a>
          <ul class="replylist" v-show="item.showreplies">
            <li v-for="(rObj, rIdx) in item.repliesData" :key="rObj.ts">
                <!-- List of Replies -->
                <div class="left">
                  <div class="label-holder userImg" v-if="rObj.userIcon !==''">
                    <img :src="rObj.userIcon" class="user-photo"/>
                  </div>
                  <div class="label-holder" v-else>
                    <span class="user-label" :class="genColorClass(rObj.userName[1])">{{rObj.userName[0]}}</span>
                  </div>   
                </div>               
                <div class="shift">
                  <div><span class="userName" :class="genColorClass(rObj.userName[1])">{{rObj.userName}}</span><timeago class="time" :datetime="new Date(rObj.ts * 1000)"></timeago>
                  </div>
                  <p>{{rObj.msgTxt}}</p>
                  <div class="likes">
                    <div class="tooltip">
                      <font-awesome-icon icon="thumbs-up" class="gray fa-solid fa-thumbs-up" :class="{self: rObj.selfLiked}" @click="handleThumbSubmit(item.msgID, rObj.ts, 'up')"/>
                      <span class="tooltiptext" :class="{'ison': rObj.selfLiked}">Remove Like</span>
                      <span class="tooltiptext" :class="{'ison': !rObj.selfLiked}">Like</span>
                      &nbsp;&nbsp;<span class="gray">{{rObj.likes.length}}</span> &nbsp;
                    </div>
                    <div class="tooltip">
                      <font-awesome-icon icon="thumbs-down"   class="gray fa-solid fa-thumbs-down" :class="{self: rObj.selfDisliked}" @click="handleThumbSubmit(item.msgID, rObj.ts, 'dn')"/>
                      <span class="tooltiptext" :class="{'ison': rObj.selfDisliked}">Remove Dislike</span>
                      <span class="tooltiptext" :class="{'ison': !rObj.selfDisliked}">Dislike</span>
                      &nbsp;<span class="gray">{{rObj.dislikes.length}}</span>&nbsp;
                    </div>
                    <a href="javascript:void(0)" class="gray" @click="toggleSubReplyForm(idx,rIdx)">REPLY</a>
                  </div>

                    <!-- Sub Reply Form Starts -->
                    <div class="comment-input replyform" v-show="rObj.showsubreplyform">
                      <div class="left">
                        <w-textarea
                        class="mb4"
                        id="add-comment"
                        label-position="left"
                        :placeholder="rhMsg" 
                        rows="1" 
                        v-model="addReplyInput"      
                        >   
                          <div class="label-holder" v-if="$store.state.c.loggeduserPhotoUrl !==''">
                            <img :src="$store.state.c.loggeduserPhotoUrl" class="user-photo"/><w-icon class="orange">mdi mdi-arrow-right
                            </w-icon>
                          </div>
                          <div class="label-holder" v-else>
                            <span class="user-label" :class="genColorClass($store.state.c.loggeduserName[1])">{{$store.state.c.loggeduserName[0]}}</span><w-icon class="orange">mdi mdi-arrow-right
                            </w-icon>
                          </div>              
                        </w-textarea>

                        <input type="text" style="display: none;" />
                      </div>
                      <div class="right"  v-show="store.state.c.loggeduserSignedIn">
                        <w-button @click="cancelComment(idx, rIdx)" class="ma1 item" bg-color="secondary" md>CANCEL</w-button>
                        <w-button @click="handleSubReplySubmit(item, rIdx)" class="ma1 item" bg-color="gray" md>SUBMIT</w-button>
                      </div>
                    </div>
                    <!-- Sub Reply Form Ends -->

                </div>  
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>





  <!-- Begin Modal Box user management -->
  <w-dialog  id="actualModal" 
    v-model="dialogOn"
    :width="500"
    :persistent="dialogPersistent"
    :persistent-no-animation="dialogPersistentNoAnimation"
    title-class="primary-light1--bg white"
    >    
    <template #title>
      Comments
       <span v-show="formShowing=='signin'">&nbsp;Login</span>
       <span v-show="formShowing=='signup'">&nbsp;Sign Up</span>
       <span v-show="formShowing=='resetpass'">&nbsp;Reset Password</span>
    </template>
    <div class="modal-body">

      <!-- Begin Sign In Form -->
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
            <p>Forgot your password? <button @click.prevent="selectForm('resetpass')">Reset</button></p>
          
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
          <p>Don't have an account? <button @click.prevent="selectForm('signup')">Sign Up</button></p>
          <w-button @click.prevent="closeDialog">Close </w-button>&nbsp;
          </form>
        </div>      
      <!-- End Sign In From -->

      <!-- Begin Sign Up Form -->
      <div class="description" id="vm-description" v-show="formShowing=='signup'">
        <form name="signup-form" @submit.prevent="handleRegisterSubmit">
            <w-input
            class="mb2"
            label="Email"
            name="email"
            type="email"
            placeholder="Email Address"
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
      <!-- End Sign Up Form -->

      <!-- Begin Reset Password Form -->
      <div class="title4 mb2" v-show="formShowing=='resetpass'">       
          
          <w-input
          class="mb2"
          label="Email"
          name="resetpass"
          type="email"
          placeholder="Email Address"
          outline
          label-position="left"
          v-model="passwordResetEmail"
          >
          </w-input>

          <p>Input the address for this account and we'll send you a password reset link by email.</p>
          <br/>
          <w-button
            class="px4 btnGrpA"
            bg-color="primary"
            dark
            @click="handleSendPasswordResetEmail">
            &nbsp;Submit&nbsp;
          </w-button> 
          &nbsp;
          <w-button @click.prevent="closeDialog; selectForm('signin')">Cancel</w-button>&nbsp;          
        </div>
      <!-- End Reset Password Form -->


    </div><!-- End Modal Body Div-->         
  </w-dialog>
  <!-- End of Modal Dialog Box-->

</template>

<script>
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,  sendPasswordResetEmail} from "firebase/auth"
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue'
import { useStore } from 'vuex'
import {userAuthState} from '@/store/firebaseApp.js'

export default {
  name: 'VModel',

  setup() {
    const uas = userAuthState()
    const router = useRouter()
    const store = useStore()
    const provider = new GoogleAuthProvider();
    const posturl = process.env.VUE_APP_POST_COMMENTS_URL;
    
    const dialogOn = ref(false)
    let addCommentInput = ref("")
    let addReplyInput = ref("")
    let passwordResetEmail = ref("")
    const formShowing = ref("signin")
     

    const dialogFullscreen = false
    const dialogPersistent = true
    const dialogPersistentNoAnimation = false
    const dialogWidth = 450
    const dialogRemove = false
    const now = new Date()

    const phMsg = computed(
      () => { 
        if(store.state.c.loggeduserSignedIn) {
          return "Add a comment as "+store.state.c.loggeduserName+"..."
         } else {
           return "Log in to add a comment"
         }
      }
    )

    const unixTS = () => {
        return Math.round(now.getTime()/1000)
    }
    

    const rhMsg = computed(
      () => { 
        if(store.state.c.loggeduserSignedIn) {
          return "Add a reply as "+store.state.c.loggeduserName+"..."
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


    const handleSendPasswordResetEmail = async () => {
      console.log("handlePasswordResetEamil()",passwordResetEmail.value)
      const actionCodeSettings = {
        url: 'https://www.clintonrivertraffic.com/gallery/comments'
      }

      sendPasswordResetEmail(uas.auth, passwordResetEmail.value, actionCodeSettings)
      .then(()=>{
        alert("Password Reset Form emailed to "+passwordResetEmail.value)
        selectForm('signin')
      }).catch((error) =>{
        alert(error.message)
      })
    }    

    const handleGoogleSignin = async e => {
      signInWithPopup(uas.auth, provider).then( async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const guser = result.user;
        //console.log("Google User Signed In:", guser)
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
                await store.dispatch('saveUserToA', payload)
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

    const genColorClass = (lc="r") => { //Input a letter
        let lc2 = lc.toLowerCase()
        let ascii = lc2.charCodeAt(0)
        if(ascii <  97 || ascii > 122) return 'v0';
        if(ascii >  96 && ascii < 101) return 'v1';
        if(ascii > 100 && ascii < 106) return 'v2';
        if(ascii > 105 && ascii < 110) return 'v3';
        if(ascii > 109 && ascii < 114) return 'v4';
        if(ascii > 113 && ascii < 119) return 'v5';
        if(ascii > 118 && ascii < 123) return 'v6';
    }

    const handleCommentSubmit = () => {
      let comment = {
        msgType: "newcomment",
        msgID : "newcomment",
        userName: store.state.c.loggeduserName,
        userIcon: store.state.c.loggeduserPhotoUrl,
        ts: unixTS(),
        msgTxt: addCommentInput.value,
        likes: [],
        dislikes: [],
        repliesCount: 0,
        repliesData: []
      }
      let myvalue =JSON.stringify(comment)   
      console.log("post url: ", posturl)  
      fetch(posturl, {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/json'
          },
          body: myvalue
      }).catch(function (error){
          console.error(error);
      })
      addCommentInput.value = ""
    }

    const handleReplySubmit = (item, idx) => {
      let reply = {
        msgType: "reply",
        msgID : item.msgID,
        userName: store.state.c.loggeduserName,
        userIcon: store.state.c.loggeduserPhotoUrl,
        ts: unixTS(),
        msgTxt: addReplyInput.value,
        likes: [],
        dislikes: [],
      }
      let myvalue =JSON.stringify(reply)   
      console.log("post url: ", posturl)  
      console.log("handleReplySubmit()", reply)
      fetch(posturl, {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/json'
          },
          body: myvalue
      }).catch(function (error){
          console.error(error);
      })
      addReplyInput.value = ""
      toggleReplyForm(idx)
    }

const handleSubReplySubmit = (item, idx, rIdx) => {
      let reply = {
        msgType: "reply",
        msgID : item.msgID,
        userName: store.state.c.loggeduserName,
        userIcon: store.state.c.loggeduserPhotoUrl,
        ts: unixTS(),
        msgTxt: addReplyInput.value,
        likes: [],
        dislikes: [],
      }
      let myvalue =JSON.stringify(reply)   
      console.log("post url: ", posturl)  
      console.log("handleSubReplySubmit()", reply)
      fetch(posturl, {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/json'
          },
          body: myvalue
      }).catch(function (error){
          console.error(error);
      })
      addReplyInput.value = ""
      toggleSubReplyForm(item, idx, rIdx)
    }


    const handleThumbSubmit = (id, target, dir) => {
      let thumb = {
        msgType: "thumbs",
        msgID: id,
        thumbTarget: target,
        thumbDir: dir,
        userID: store.state.c.loggeduserCredentials.uid
      }
      let myvalue = JSON.stringify(thumb)
      console.log("handleThumbSubmit()", thumb)
      fetch(posturl, {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/json'
          },
          body: myvalue
      }).catch(function (error){
          console.error(error);
      })
      //Save user thumbs to store to prevent duplicates
      
    }

    const selectForm = (form) => {
      //Valid form names: 'signin','signup','resetpass'
      formShowing.value =  form
      console.log(formShowing.value)
    }

    const toggleReplies = (key) => {  
      store.dispatch('toggleReplies', key)
    }

    const toggleReplyForm = (key) => {  
      store.dispatch('toggleReplyForm', key)
    }

    const toggleSubReplyForm = (idx, rIdx) => {  
      store.dispatch('toggleSubReplyForm', {idx, rIdx})
    }
    
    const cancelComment = (idx=-1, rIdx=-1) => {
      addCommentInput.value = ""
      addReplyInput.value = ""
      if(rIdx>-1) {
        toggleSubReplyForm(idx, rIdx)
      } else {
        if  (idx>-1) {
          toggleReplyForm(idx)
        }
      }
    }

    onMounted(async () => {
      store.commit('setPageSelected', 'Comments')
      store.commit('setSlate', 'COMMENTS')
      store.commit('setCommentsLinkActive', true)
      store.dispatch("initComments")
    })

    onUnmounted( ()=> {
      store.commit('setCommentsLinkActive', false)
    })


    return { 
      addCommentInput, addReplyInput, handleCommentSubmit, handleReplySubmit, handleSubReplySubmit, handleSigninSubmit, handleRegisterSubmit, 
      handleThumbSubmit, toggleSubReplyForm, handleSendPasswordResetEmail, handleGoogleSignin, cancelComment,  toggleReplies, toggleReplyForm, posturl, store, dialogOn, closeDialog, dialogFullscreen, dialogPersistent, unixTS, dialogPersistentNoAnimation, dialogWidth, dialogRemove, genColorClass, formShowing, passwordResetEmail, phMsg, rhMsg, uas, selectForm
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

p, div {
  line-height: 1.4rem;
}

.gray {
  color:#8e8e8e
}

.left {
  text-align: left;
}
.right {
  text-align: right;
}

div.likes {
  margin-top: .4rem;
  margin-bottom: .5rem;
}

.label-holder {
  display: inline;
}

.time {
  display: inline;
  font-size: .8rem;
  font-weight: bold;
  padding-left: 5px;
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

.userName.v1 {
  color: navy;
}

.userName.v2 {
  color: maroon;
}

.userName.v3 {
  color: rgba(161, 161, 15, 0.938);
}

.userName.v4 {
  color: green;
}

.userName.v5 {
  color: salmon;
}

.userName.v6 {
  color: orangered;
}

#signup-form, #signin-form {
  max-width: 375px;
  padding: 1.5rem 0rem;
  line-height: 3rem;
}

.group {
  margin: 2rem;
}

.items {
  text-align: left;
}

.shift {
  margin-left: 3rem;
  transform: translateY(-25px);
}

.fa-caret-right {
  color: blue;
  transition: transform .2s;
}

.fa-caret-right.active {
  transform: rotate(90deg);
  transition: transform .2s;
}

.fa-thumbs-up, .fa-thumbs-down {
  cursor: pointer;
}

.fa-thumbs-up.self, .fa-thumbs-down.self {
  color: black;
}

.fa-thumbs-up:hover, .fa-thumbs-down:hover {
  color:blue;
}

/* Begin Tool Tip Effect */


 /* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 80px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext.ison {
  visibility: visible;
  opacity: 1;
} 

/* End Tool Tip Effect   */

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