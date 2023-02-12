// firebaseApp.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, computed, onMounted, onUnmounted } from 'vue'
//import { useStore } from 'vuex'
import store from '@/store/index.js';


const config = {
    apiKey: "AIzaSyA6KlSt8IQBSm7TiDszs29bhKaVev-e1Tw",
    authDomain: "mdm-qcrt-demo-1.firebaseapp.com",
    projectId: "mdm-qcrt-demo-1",
    storageBucket: "mdm-qcrt-demo-1.appspot.com",
    messagingSenderId: "1055119004226",
    appId: "1:1055119004226:web:1d17187e816f794b5713db"
  };
 
const firebaseApp = initializeApp(config)
export let firestore = getFirestore(firebaseApp)

/*  VUEX STORE NOW USED FOR AUTH STATE
     firebase auth object still exported  */

export const userAuthState = () => {
  const user = ref(null)
  const error = ref(null)
  //const store = useStore()
  const auth = getAuth(firebaseApp)
  
  let unsubscribe
  
  //onMounted(async ()=> {
    unsubscribe = onAuthStateChanged(
      auth,
      async (u) => {
        user.value = u;
        console.log("userAuthState:", u)
        if(u !== null && !u.isAnonymous) {
          let payload = { user: u, type: "uas"}
          await store.dispatch('saveLoggeduserCredentials', payload)
          await store.dispatch('saveUserToA', u.uid)
          await store.dispatch('testLoggeduserIsAdmin', u.uid) 
        }
        store.dispatch('setLogInForm', false)
      },
      e => {error.value = e}
    )
  //}
  //)
  //onUnmounted(() => unsubscribe())
 

  return { auth, user, error }
}




