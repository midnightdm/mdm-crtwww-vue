// firebaseApp.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyA6KlSt8IQBSm7TiDszs29bhKaVev-e1Tw",
    authDomain: "mdm-qcrt-demo-1.firebaseapp.com",
    projectId: "mdm-qcrt-demo-1",
    storageBucket: "mdm-qcrt-demo-1.appspot.com",
    messagingSenderId: "1055119004226",
    appId: "1:1055119004226:web:1d17187e816f794b5713db"
  };

const firebaseApp = initializeApp(config);
const firestore = getFirestore()

export default firestore;
