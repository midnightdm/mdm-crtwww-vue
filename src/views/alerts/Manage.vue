<template>
  <main id="Manage" class="text-center">
    <section>
      <h1>MANAGE NOTIFICATIONS</h1>
      <p>On this browser push notifications are <w-tag class="mr4" bg-color="yellow" color="primary" round>
  {{statusTxt}}</w-tag></p>
      <p class="btnWrapper"><button v-if="isSubscribed" @click="unsubscribeUser()" class="pushtoglbtn" v-bind:disabled='pbIsDisabled'>{{pbLabel}}</button>
      <button  v-else @click="subscribeUser()"  class="pushtoglbtn" v-bind:disabled='pbIsDisabled'>{{pbLabel}}</button>&nbsp; 
      </p>
  
    <div class="boxa">
      <h3>Subscribed Events</h3>
      <ol id="actualOL">
        <li v-for="item in mm.subListActual" :key="item.key">
          <span class="listItem">{{item.title}}</span><span class="listBtns"><button v-bind="{id: 'remBtn'+item.key}" @click="removeActualEvent(item.key)">Delete</button>&nbsp;
          <button v-bind="{id: 'revBtn'+item.key}" @click="reviewActualEvent(item.key)">Review</button>
          </span>
        </li>
      </ol>
      <br>
      <w-tag v-if="!mm.subListActual.length" id="actualNone" class="mr4" bg-color="primary" color="yellow" round >None</w-tag>
      
    </div>
    <div class="boxb">
      <h3>Available Events</h3>  
      <select name="sub-list-avail" @change="getSelection" id="sub-list-avail" class="form-select" size="5" >
        <option v-for='event in mm.subListAvail' v-bind:key='event.key' :value='event.key'>{{event.title}}</option>
      </select> <br>   
      <br> 
      <!-- Button to Subscribe instantly -->
      <w-button class="btnGrpA" v-if="selectionFound" @click="removeActualEvent(mm.subListSelection.key)">Remove Event</w-button>
      <w-button v-else @click="subscribeToEvent()">Subscribe to Event</w-button>&nbsp;
      <!-- Button to trigger modal -->
      <w-button
        class="px4 btnGrpA"
        @click="getSelection; dialog1.show = true"
        bg-color="primary"
        dark>
        View Details
      </w-button> 
      &nbsp;
      <!-- Button to Subscribe to default waypoints -->
      <w-button class="btnGrpA" @click="subscribeToDefaultWaypoints">Add Default Waypoints</w-button>
      <br/>
      <!-- Button to request test notifcation -->
      <div v-if="user && user.alertTestRequest" style="color: red">Test Pending</div>
      <w-button class="ma1" bg-color="info" @click="requestNotificationTest">Notification Test</w-button>
      <div v-if="user && user.alertTestedTS!=null">Last Test Notification Sent {{user.alertTestedTS}}</div>
    </div>

    <div class="boxb boxc">Consider where along the river you like to watch riverboats. Choose one marker a few miles above your spot for downriver notices. Pick another below your spot for upriver notices. "Passenger" events will trigger less often than the "Any" vessel events which occur many times daily.
  
    </div>
    <div class="boxb boxc">Please note that "Any" means any vessel OTHER than passenger and does not include passenger vessels also. You will get passenger vessel notices only when subscribed to passenger events. 
    </div>
  </section>
</main>
<!-- Modal for available list selection -->
<w-dialog  id="availModal" 
  v-model="dialog1.show"
  :width="1000"
  :persistent="dialog1.persistent"
  :persistent-no-animation="dialog1.persistentNoAnimation"
  title-class="primary-light1--bg white"
  >    
  <template #title>
    {{ mm.subListSelection.title }} 
  </template>
<div class="modal-body">
  <img id="vm-image" class="river-map" :src="imagePath +'/'+ mm.subListSelection.image" height="600" alt="Map image of river showing boat icon at edge of target area"/><br>
  <div class="description" id="vm-description">{{ mm.subListSelection.description }}</div>
</div>
  <template #actions>
    <div class="spacer" />
    <w-button @click="dialog1.show = false">Close </w-button>&nbsp;
    <w-button v-if="dialog1.remove" @click="removeActualEvent(mm.subListSelection.key); dialog1.show = false; ">Remove This Event</w-button>
    <w-button v-else @click="subscribeToEvent(); dialog1.show = false; ">Subscribe to This Event</w-button>  
  </template>      
</w-dialog>

<!-- Modal for active list selection -->
<w-dialog  id="actualModal" 
  v-model="dialog2.show"
  :width="1000"
  :persistent="dialog2.persistent"
  :persistent-no-animation="dialog2.persistentNoAnimation"
  title-class="primary-light1--bg white"
  >    
  <template #title>
    {{ mm.actListSelection.title }} 
  </template>
<div class="modal-body">
  <img id="vm-image" class="river-map" :src="imagePath + '/'+mm.actListSelection.image" height="600" alt="Map image of river showing boat icon at edge of target area"/><br>
  <div class="description" id="vm-description">{{ mm.actListSelection.description }}</div>
</div>
  <template #actions>
    <div class="spacer" />
    <w-button @click="dialog2.show = false">Close </w-button>&nbsp;
    <w-button v-if="dialog1.remove" @click="removeActualEvent(); dialog2.show = false; ">Remove This Event</w-button>
    <w-button v-else @click="subscribeToEvent(); dialog2.show = false; ">Subscribe to This Event</w-button>  
  </template>      
</w-dialog>

</template>

<script>
import ManageModel from '@/assets/classes/ManageModel.js'
//import 'material-design-icons/iconfont/material-icons.css'
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'
import { firestore } from '@/store/firebaseApp.js'
import { doc, getDoc, setDoc, updateDoc, arrayRemove, onSnapshot } from 'firebase/firestore'
import { getAuth, signInAnonymously } from "firebase/auth";
export default {
  beforeMount() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');
      //mysw.js has the push method and payload, mysw.js also has the eventhandler for when the notification is clicked
      navigator.serviceWorker.register('../mysw.js') 
      .then( (swReg) => {
        console.log('Service Worker is registered', swReg);
        this.swRegistration = swReg;
        console.log("swRegistration value: ", this.swRegistration);
        this.initialiseUI();

      })
      .catch( (error) => {
        console.error('Service Worker Error', error);
      });
    } else {
      console.warn('Push messaging is not supported');
      this.pbLabel = 'Push Not Supported';
    }
  },
  mounted() {
    this.$store.commit('setSlate', 'ALERTS')
    this.$store.commit('setAlertsLinkActive', true)
    this.$store.commit('setPageSelected', 'Manage')
  },
  unmounted() {
    this.$store.commit('setAlertsLinkActive', false)
    this.$store.commit('setPageSelected', null)
  },
  data: function() {
    return {
      applicationServerPublicKey: process.env.VUE_APP_MDM_VKEY,
      publicPath: process.env.BASE_URL,
      imagePath:  process.env.VUE_APP_IMG_URL,
      swRegistration: "",
      db: firestore,
      mm: this.initializeMM(),
      fsAuth: getAuth(),
      isSubscribed: false,
      authEnc: null,
      user: null,
      pbIsDisabled: false,
      pbLabel: 'Enable Push',
      statusTxt: 'Disabled',
      deviceRef: "",
      dialog1: {
        show: false,
        fullscreen: false,
        persistent: false,
        persistentNoAnimation: false,
        width: 300,
        remove: false
      },
      dialog2: {
        show: false,
        fullscreen: false,
        persistent: false,
        persistentNoAnimation: false,
        width: 300,
      },
      selectionFound: false
    }
  },
  methods: {
    initializeMM() {
      return new ManageModel()
    },
    showAlert(msg) {
      alert(msg)
    },
    updateBtn() {
      if (Notification.permission === 'denied') {
        this.pbLabel = 'Push Messaging Blocked';
        this.pbIsDisabled = true;
        this.statusTxt = 'Blocked';
        //updateSubscriptionOnServer(null);
        return;
      }
      if (this.isSubscribed) {
        this.pbLabel = 'Disable Push';
        this.statusTxt = 'Enabled';
        this.pbIsDisabled = false;
        //this.unsubscribeUser();
      } else {
        this.pbLabel = 'Enable Push';
        this.pbIsDisabled = false;
        this.statusTxt = 'Disabled';
        //this.subscribeUser();
      }
     
    },
    urlB64ToUint8Array(base64String) {
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
    },
    subscribeUser() {
      const applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey);
      this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then( (subscription) => {
        //this.getSubList();
        console.log('User is subscribed.');
        this.isSubscribed = true;
        this.updateBtn();  
        //Delay to ensure userID is set. Couldn't figure how to get promise to work here.
        let auth = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth'))));
        let p246dh = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh'))));
        this.user = {
          alertMethod: "notification",
          alertTestRequest: false,
          alertTestedTS: null,
          events: [],
          subscription: {
            auth:  auth,
            endpoint: subscription.endpoint,
            is_enabled: this.isSubscribed,
            p256dh: p246dh 
          }
        }
        setDoc(this.deviceRef, this.user, {merge:true})
      })
      .catch( (err) => {
        console.log('Failed to subscribe the user: ', err);
        this.updateBtn();
      });//
    },
    initialiseUI() {
      // Set the initial subscription value
      this.swRegistration.pushManager.getSubscription()
        .then( (subscription) => {
          this.isSubscribed = !(subscription === null);
          if (this.isSubscribed) {
            console.log('User IS subscribed.');
            //Get list of subscribed events
            this.getSubList();
          } else {
            console.log('User is NOT subscribed.');
          }
          this.updateBtn();
        });
    },
    unsubscribeUser() {
      this.swRegistration.pushManager.getSubscription()
      .then( (subscription) => {
        if (subscription) {
          return subscription.unsubscribe();
        }
      }).catch( (error)  => {
        console.log('Error unsubscribing', error);
      }).then( () => {

        setDoc(this.deviceRef, {subscription: {is_enabled: false}}, {merge:true});
        console.log('User is unsubscribed.');
        this.isSubscribed = false;
        this.mm.subListActual = [];
        this.updateBtn();
      });
    },
    getSubList() {
      navigator.serviceWorker.ready
      .then(serviceWorkerRegistration => serviceWorkerRegistration.pushManager.getSubscription())
      .then(subscription => {
          if (!subscription) {
              alert('Please enable push notifications');
              return;
          }
          //Login annonymously to firebase auth and get unique uid  
          signInAnonymously(this.fsAuth).catch( (error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
          
            if (errorCode === 'auth/operation-not-allowed') {
              alert('You must enable Anonymous auth in the Firebase Console.');
            } else {
              console.error(error);
            }
          })
          .then( (userObj) => {
            //Use returned user object's uid to get or create new db document
            console.log("Returned userObj: ",userObj);
            this.mm.userID = userObj.user.uid;   
            if(this.mm.userID==null) { 
              alert("Error generating a UUID.  Try again later.");
            } else {
              console.log('this.mm.userID=',this.mm.userID);
            }    
            this.deviceRef = doc(this.db, 'user_devices', this.mm.userID);
            /*   BLOCK START                 */
            onSnapshot(this.deviceRef, 
              (doc) => {
                //Done each time db updates
                this.user = doc.data();
                console.log("doc.data()", this.user);
                this.mm.subListActual = [];
                if(this.user !== undefined) {
                  if(Array.isArray(this.user.events) && this.user.events.length) {
                    this.user.events.forEach(this.loadSubListActual);
                  }  
                } 
              }, 
              () => {
                let user = {
                  alertMethod: "notification",
                  alertTestRequest: false,
                  alertTestedTS: null,
                  events: [],
                  subscription: {
                    auth:  "",
                    endpoint: subscription.endpoint,
                    is_enabled: false,
                    p256dh: "" 
                  }
                };
                setDoc(this.deviceRef, {
                  alertMethod: "notification",
                  alertTestRequest: false,
                  alertTestedTS: null,
                  events: [],
                  subscription: {
                    auth:  "",
                    endpoint: subscription.endpoint,
                    is_enabled: false,
                    p256dh: "" 
                  }
                })
            })
          })              
      }); 
      
    }, 
    loadSubListActual(tird, srcIdx, srcArray) {
      //This function used by getSubList()
      //console.log('scrVal: ', tird, '\n srcIdx: ', srcIdx, '\n scrArray: ', srcArray, '\n');
      let item = this.mm.subListAvail.find(o => o.key === tird);
      this.mm.subListActual.push(item);
    },
    reviewActualEvent(key) {
      let sel = this.mm.subListAvail.find(o => o.key === key);
      sel['isSubscribed'] = true;
      this.mm.actListSelection = sel;
      console.log("actSel description: ", this.mm.actListSelection.description);
      this.dialog2.show = true;
      this.dialog1.remove = true;
    },
    removeActualEvent(key="", isModal=false) {
      //Get key alternately if in param
      if(key=="") {
        key = this.mm.actListSelection.key;
      }
      //Update db
      console.log("removeActualEvent() subListSelection.key =", this.mm.actListSelection.key);
      console.log("removeActualEvent("+key+")")
      updateDoc(this.deviceRef, {events: arrayRemove(key)})
        .then( console.log("removeActualEvent("+key+")") )
      this.selectionFound = false;
      this.dialog1.remove = false;  
    },
    subscribeToEvent() {
      if(this.user===undefined)  {
        alert("You must enable (or re-enable) Push service before you can add events.");
        return;
      }
      console.log("subListSelection =", this.mm.subListSelection.key);
      this.user.events.push(this.mm.subListSelection.key);
      setDoc(this.deviceRef, {events: this.user.events} , {merge:true})
      console.log('subscribeToEvent()');
      this.getSelection();
    },
    requestNotificationTest() {
      console.log("requestNotificationTest()")
      setDoc(this.deviceRef, {alertTestRequest: true }, {merge:true})
      alert("Please allow up to 3 minutes for test message to be sent to you.")
    },
    subscribeToDefaultWaypoints() {
      if(this.user===null)  {
        alert("You must enable Push service before you can add events.");
        return;
      }
      this.user.events.push('alphadp', 'deltaup');
      setDoc(this.deviceRef, {events: this.user.events} , {merge:true});
      //this.getSelection();
    },
    getSelection() {
      this.mm.getSelection().then( () => {
        let sel = this.mm.subListActual.find(o => o.key === this.mm.subListSelection.key);
        if(sel !== undefined) {
          this.selectionFound = true;
          this.dialog1.remove = true;
        } else {
          this.selectionFound = false;
          this.dialog1.remove = false;
        }
      });
    }  
  },
  components: {
    AlertsSubMenu
  }
}
</script>

<style>

#Manage section {
  padding-top: var(--menu-pad-wide-a);
}

img.river-map {
  overflow: scroll;
}

li {
  margin: 2px 2px 2px 5%;
  text-align: left;  
}

.listItem {
  float: left;
}

.listBtns {
  display: block;
  text-align: right; 
}

.btnGrpA {
  padding: .5rem;
  margin: .5rem;
}

.boxa {
  margin: auto;
  width: 40em; 
  text-align: center; 
  background-color: #dccce0; 
  padding: 1em;
  border-bottom: 2em;
  border-spacing: 1em;
}

.boxb {
  margin: auto; 
  width: 40em; 
  text-align: center; 
  background-color: #cce0e0; 
  padding: 1em;
}

.boxb.boxc {
  text-align: justify;
}


@media (max-width: 750px) {
  #Manage section {
    padding-top: var(--menu-pad-mobile);
  }
  .boxa, .boxb {
    width: 26rem;
  }
}
</style>

