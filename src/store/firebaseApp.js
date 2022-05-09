// firebaseApp.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
//import { ref, computed, onMounted, onUnmounted } from 'vue'


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
  //const user = ref(null)
  //const error = ref(null)
  
  const auth = getAuth(firebaseApp)
  /*
  let unsubscribe
  
  onMounted(async ()=> {
    unsubscribe = onAuthStateChanged(
      auth,
      async u => {
        user.value = u;
      },
      e => {error.value = e}
    )
  })
  onUnmounted(() => unsubscribe())
 */

  return { auth }
}

/*

//For Admin pages
export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
)

//For loggedUser page(s)
export const getLoggedState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
)

*/


