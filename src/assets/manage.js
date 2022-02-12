import ManageModel from '@/assets/classes/ManageModel.js'
import { firestore } from '@/store/firebaseApp.js'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getAuth, signInAnonymously } from "firebase/auth";


//Declare globals
const db = firestore
const mm = new ManageModel();
const fsAuth = getAuth();
//OLD: const deviceRef = db.collection('user_devices');


//let isSubscribed = false;
//let authEnc = null;
//let user = {};

//These were DOM elements, rework for Vue
const pushButton = document.querySelector('.pushtoglbtn');
const statusTxt = document.querySelector('#status');
const btnActEvent = document.querySelector('#btnActEvent');
const availEventSelectBox = document.querySelector('#sub-list-avail');



/* * * * * * * * * * * * * * *
*  Function definitions
*

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');
    isSubscribed = true;
    getSubList()
    updateBtn();  
    //Delay to ensure userID is set. Couldn't figure how to get promise to work here.
    setTimeout(()=>{ doc(db, mm.userID).set( {subscription: {is_enabled: true}}, {merge: true});} , 2000 );   
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function initialiseUI() {
  // Set the initial subscription value
  vm.swRegistration.pushManager.getSubscription()
  .then( (subscription) => {
    vm.isSubscribed = !(subscription === null);
    if (vm.isSubscribed) {
      console.log('User IS subscribed.');
      //Get list of subscribed events
      vm.getSubList();
    } else {
      console.log('User is NOT subscribed.');
    }
    vm.updateBtn();
  });
}

function unsubscribeUser() {
  vm.swRegistration.pushManager.getSubscription()
  .then( (subscription) => {
    if (subscription) {
      return subscription.unsubscribe();
    }
  }).catch( (error)  => {
    console.log('Error unsubscribing', error);
  }).then( () => {
    //deviceRef.doc(mm.userID).set( {subscription: {is_enabled: false}}, {merge: true});

    setDoc(db, 'user_devices/'+mm.userID, {subscription: {is_enabled: false}}, {merge: true} );

    console.log('User is unsubscribed.');
    vm.isSubscribed = false;
    vm.mm.subListActual = [];
    vm.updateBtn();
    updateSubListActualView();
    
  });
}

function getSubList() {
  navigator.serviceWorker.ready
  .then(serviceWorkerRegistration => serviceWorkerRegistration.pushManager.getSubscription())
  .then(subscription => {
      if (!subscription) {
          alert('Please enable push notifications');
          return;
      }
      //Login annonymously to firebase auth and get unique uid
      
      signInAnonymously(fsAuth).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      
        if (errorCode === 'auth/operation-not-allowed') {
          alert('You must enable Anonymous auth in the Firebase Console.');
        } else {
          console.error(error);
        }
      })
      .then((userObj)=> {
          //Use returned user object's uid to get or create new db document
          console.log("Returned userObj: ",userObj);
          mm.userID = userObj.user.uid;   
          if(mm.userID==null) { 
            alert("Error generating a UUID.  Try again later.");
          }     
          this.deviceRef = doc(db, 'user_device', mm.userID);
          let document = getDoc(this.deviceRef);
          /*   BLOCK START                 /
          document.onSnapshot((snapshot) => {
            console.log('snapshot exists? ', snapshot.exists, snapshot.data());
            if(!snapshot.exists) {
              user = { 
                events: [],
                subscription: {
                  auth:  btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))),
                  endpoint: subscription.endpoint,
                  is_enabled: isSubscribed,
                  p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))) 
                }
              };             
              deviceRef.doc(mm.userID).set(user)         
                .then(() => {
                  deviceRef.doc(mm.userID).onSnapshot((snapshot)  => {
                    user = snapshot.data();
                    console.log("New user created. Snapshot: ", user);
                  })
                });
                
            } else {
              user = snapshot.data();
              console.log('user: ', user);
            }
            mm.subListActual = [];
            user.subscription.is_enabled = isSubscribed;
            user.events.forEach(loadSubListActual);
            vm.updateSubListActualView(); 
            
          });  //End of document.onSnapshot()
          
          /**
           *  BLOCK END
           /
                 
      }); //End of then ((userObj)=>)

  }); //End of then(subscription)=>


} //End of get subList()



function loadSubListActual(tird, srcIdx, srcArray) { //This function used by getSubList()
  //console.log('scrVal: ', tird, '\n srcIdx: ', srcIdx, '\n scrArray: ', srcArray, '\n');
  let item = mm.subListAvail.find(o => o.key === tird);
  mm.subListActual.push(item);
}

function updateSubListActualView() {
  let none = document.getElementById('actualNone');
  let ol = document.getElementById('actualOL');
  if(mm.subListActual.length > 0) {
    
    let li = "";
    for(let i=0; i<mm.subListActual.length; i++) {
      li += '<li><span>'+ mm.subListActual[i].title + '</span> '
       +'<button id="remBtn'+mm.subListActual[i].key +'" onclick="removeActualEvent(\''+mm.subListActual[i].key+'\')">Delete</button> '
       +'<button id="revBtn'+mm.subListActual[i].key +'" onclick="reviewActualEvent(\''+mm.subListActual[i].key+'\')" '
       + 'data-bs-toggle="modal" data-bs-target="#subscribedModal">Review</button>\n   </li>';
    }
    ol.innerHTML = li;
    none.style.visibility = "hidden";
  } else {
    none.style.visibility = "visible";
    ol.innerHTML = "";
  }
  
}
*/

export default{
  db,
  mm,
  fsAuth,
  isSubscribed,
  authEnc,
  user,
  
}