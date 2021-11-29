import { createStore } from 'vuex'
//import { mapGetters } from 'vuex'
import { firestore } from './firebaseApp.js'
import { doc, getDoc, getDocs, setDoc, collection, onSnapshot, query, where, limit, orderBy } from 'firebase/firestore'
// onSnapshot, collection, query, where
import { format, lastDayOfMonth, startOfYesterday, endOfYesterday, setHours } from 'date-fns'

const db = firestore

/* * * * * * * * * * * * * *
 *
 *  Object Class defintions
 *  used in the Store
 * 
 * * * * * * * * * * * * * */
 class Vessel {
  constructor() {
    this.localIndex          = null;
    this.vesselID            = null;
    this.vesselName          = "";
    this.vesselCallSign      = "";
    this.vesselType          = "";
    this.vesselLength        = "";
    this.vesselWidth         = "";
    this.vesselDraft         = "";
    this.vesselHasImage      = "";
    this.vesselImageUrl      = "";
    this.vesselOwner         = "";
    this.vesselBuilt         = "";
    this.vesselWatchOn       = "";    
    this.vesselRecordAddedTS = "";
    this.vesselPassages      = null;
  }
}

class Ranges {
  constructor() {
    var now = new Date();
    var nowSt = Math.floor( now.getTime()/1000 );
    var month = now.getMonth();
    var self = this;
    this.today = {
      lo: now,
      hi: nowSt
    };
    this.today.lo.setHours(0);
    this.today.lo.setMinutes(0);
    this.today.lo.setSeconds(0);
    this.today.lo = Math.floor(this.today.lo.getTime() / 1000);
    
    this.yesterday = {
      lo: startOfYesterday(),
      hi: endOfYesterday()
    };
    this.yesterday.lo = Math.floor(this.yesterday.lo.getTime()/1000)
    this.yesterday.hi = Math.floor(this.yesterday.hi.getTime()/1000)

    this.past24 = {
      lo: nowSt - (24*60*60),
      hi: nowSt
    };
    this.past7 = {
      lo: nowSt - (7*24*60*60),
      hi: nowSt
    };
    this.thisMonth = {
      lo: now,
      hi: nowSt
    };
    this.thisMonth.lo.setDate(1);
    this.thisMonth.lo = Math.floor( this.thisMonth.lo.getTime()/1000 );

    this.lastMonth = {
      lo: now,
      hi: lastDayOfMonth(now.setMonth(month-1))
    };
    this.lastMonth.lo.setMonth(month-1);
    this.lastMonth.lo = Math.floor( this.lastMonth.lo.getTime()/1000 );
    this.lastMonth.hi = Math.floor( this.lastMonth.hi.getTime()/1000 );
  }
}


class SubListItem { 
  constructor() {
    this.key;
    this.title;
    this.description;
    this.image
  }
}

/* * * * * * * * * * * * * * * * * 
 * Initilization & update function  definitions 
 *
 */

function updateVesselHistory(dat) {
  var o;           
  o = new Vessel();
  //o.localIndex = logsPageModel.vesselList().length;      
  o.vesselRecordAddedTS = dat.vesselRecordAddedTS
  o.vesselID = dat.vesselID
  o.vesselName = dat.vesselName
  o.vesselCallSign = dat.vesselCallSign
  o.vesselType = dat.vesselType
  o.vesselLength = dat.vesselLength
  o.vesselWidth = dat.vesselWidth
  o.vesselDraft = dat.vesselDraft
  o.vesselHasImage = dat.vesselHasImage
  o.vesselImageUrl = dat.vesselImageUrl
  o.vesselOwner = dat.vesselOwner
  o.vesselBuilt = dat.vesselBuilt
  o.vesselWatchOn = dat.vesselWatchOn
  //Create array from vesselPassage data
  let waypoints = {
    alpha : [  ],
    bravo : [  ],
    charlie: [  ],
    delta: [  ]
  };
  var i, k, objKey, dir, dateArr = [];
  for(objKey in dat.vesselPassages) {
    //Sort passages by dated keys before putting into waypoints
    if(dat.vesselPassages[objKey].passageMarkerCharlieTS==null)
    {
      console.log("Skipping null passage "+objKey);
      continue;
    } else {
      dateArr.push(dat.vesselPassages[objKey])
    }
  }
  dateArr.sort((a,b) => parseInt(a.passageMarkerCharlieTS) < parseInt(b.passageMarkerCharlieTS) ? -1 : 1);
  for(i=0; i<dateArr.length; i++) {
    dir = dateArr[i].passageDirection=="upriver" ? "up" : "down";
    waypoints.alpha[i] = {
      date: new Date(parseInt(dateArr[i].passageMarkerAlphaTS)*1000),
      dir: dir
    };
    waypoints.bravo[i] = {
      date: new Date(parseInt(dateArr[i].passageMarkerBravoTS)*1000),
      dir: dir
    }
    waypoints.charlie[i] = {
      date : new Date(parseInt(dateArr[i].passageMarkerCharlieTS)*1000),
      dir: dir
    };

    waypoints.delta[i] = {
      date: new Date(parseInt(dateArr[i].passageMarkerDeltaTS)*1000),
      dir: dir
    }
  }
  o.vesselPassages = waypoints;
  console.log("Reassembled Vessel Object: ", o)
  return o;            
}




/* * * * * * * * * * * * * * *
*  Function definitions used by manage page
*/
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

/** 
 *  Probably Relocate some of these functions to Manage.vue for
 *  page specific events rather than being here in the store.
 */

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(process.env.MDM_VKEY_PUB);
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
    setTimeout(()=>{ deviceRef.doc(vm.userID).set( {subscription: {is_enabled: true}}, {merge: true});} , 2000 );   
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function initialiseUI() {
  //Review for rework, move event handlers
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });
// Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
      //Get list of subscribed events
      getSubList();
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

function updateBtn() {
  //Review for Vue component integration
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked';
    pushButton.disabled = true;
    statusTxt.textContent = 'Blocked';
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push';
    statusTxt.textContent = 'Enabled';
  } else {
    pushButton.textContent = 'Enable Push';
    statusTxt.textContent = 'Disabled';
  }
  pushButton.disabled = false;
}


function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  }).catch(function(error) {
    console.log('Error unsubscribing', error);
  }).then(function() {
    deviceRef.doc(vm.userID).set( {subscription: {is_enabled: false}}, {merge: true});
    console.log('User is unsubscribed.');
    isSubscribed = false;
    vm.subListActual = [];
    updateBtn();
    updateSubListActualView();
    
  });
}


/**
 * This has db tasks and can work here, but update for v9 firestore
 */
function getSubList() {
  navigator.serviceWorker.ready
  .then(serviceWorkerRegistration => serviceWorkerRegistration.pushManager.getSubscription())
  .then(subscription => {
      if (!subscription) {
          alert('Please enable push notifications');
          return;
      }

      //Login annonymously to firebase auth and get unique uid
      firebase.auth().signInAnonymously().catch(function(error) {
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
          vm.userID = userObj.user.uid;   
          if(vm.userID==null) { alert("Error generating a UUID.  Try again later."); }     
      
          let document = deviceRef.doc(vm.userID);
          /*   BLOCK START                 */
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
              deviceRef.doc(vm.userID).set(user)         
                .then(() => {
                  deviceRef.doc(vm.userID).onSnapshot((snapshot)  => {
                    user = snapshot.data();
                    console.log("New user created. Snapshot: ", user);
                  })
                });
                
            } else {
              user = snapshot.data();
              console.log('user: ', user);
            }
            vm.subListActual = [];
            user.subscription.is_enabled = isSubscribed;
            user.events.forEach(loadSubListActual);
            updateSubListActualView(); 
            
          });  //End of document.onSnapshot()
          
          /**
           *  BLOCK END
           */
                 
      }); //End of then ((userObj)=>)

  }); //End of then(subscription)=>


} //End of get subList()


function loadSubListActual(tird, srcIdx, srcArray) { //This function used by getSubList()
  //console.log('scrVal: ', tird, '\n srcIdx: ', srcIdx, '\n scrArray: ', srcArray, '\n');
  let item = vm.subListAvail.find(o => o.key === tird);
  vm.subListActual.push(item);
}

/**
 * Definately a page specific function for Manage.vue
 * 
 */
function updateSubListActualView() {
  let none = document.getElementById('actualNone');
  let ol = document.getElementById('actualOL');
  if(vm.subListActual.length > 0) {
    
    let li = "";
    for(let i=0; i<vm.subListActual.length; i++) {
      li += '<li><span>'+ vm.subListActual[i].title + '</span> '
       +'<button id="remBtn'+vm.subListActual[i].key +'" onclick="removeActualEvent(\''+vm.subListActual[i].key+'\')">Delete</button> '
       +'<button id="revBtn'+vm.subListActual[i].key +'" onclick="reviewActualEvent(\''+vm.subListActual[i].key+'\')" '
       + 'data-bs-toggle="modal" data-bs-target="#subscribedModal">Review</button>\n   </li>';
    }
    ol.innerHTML = li;
    none.style.visibility = "hidden";
  } else {
    none.style.visibility = "visible";
    ol.innerHTML = "";
  }
}

//A function used for updating alert arrays
function objectQueue(arr, add, size=20) {
  //Returns the updated array
  arr.push(add)
  console.log("arr length: ", arr.length, " size: ", size)
  if(arr.length >=size) {
    arr.shift()
  }
  return arr
}

// The shared state object that any vue component can get access to.
// Has some placeholders that we’ll use further on!
const moduleA = {
  state: () => ({
      slate: "LOADING",
      alertsLinkActive: false,
      logsLinkActive: false,
      galleryLinkActive: false,
      isNotHero: true, 
      passagesList: [
        {
          date: "",
          id: "338075432",
          image: "",
          name: "Vessels Loading... ",
          type: "default" 
        }
      ],
      
      historyCache: {      
        vesselBuilt: "default",
        vesselCallSign: "---",
        vesselDraft: "---",
        vesselHasImage: 1,
        vesselID: 338211453,
        vesselImageUrl: "https://www.clintonrivertraffic.com/vessels/jpg/338211453",
        vesselLastDetectedTS: null,
        vesselLength: "16m",
        vesselName: "Makameya",
        vesselOwner: "---",
        vesselPassages: { 
          alpha:   [{date: new Date(), dir: "images/uparr.png"}],
          bravo:   [{date: new Date(), dir: "images/uparr.png"}], 
          charlie: [{date: new Date(), dir: "images/uparr.png"}], 
          delta:   [{date: new Date(), dir: "images/uparr.png"}]} 
      },
      
      galleryVideo: [ {vessel: "loading" }

      ],

      ranges: new Ranges(),

      monthCache: [
        {
          data: "2021-06-30",
          passageDirection: "default",
          passengeEvents: [],
          passageMarkerAlphaTS: 16251229514,
          passageMarkerBravoTS: 16251229514,
          passageMarkerCharlieTS: 16251229514,
          passageMarkerDeltaTS: 16251229514,
          passageVesselID: 366961530  
        }
      ],
      currentUser: {
        cred: null,
        isLoggedIn: false
      },
      alertsAll: [
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()}
      ],
      alertsPassenger: [
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()},
        {apubVesselName: "loading", apubID:"loading", date: new Date()}
      ]
    }),   
  actions: {

    async fetchPassagesList({ commit, state }) {
      if(state.passagesList[0].type==="default") {
        const passagesAllRef = doc(db, 'Passages', 'All');
        var plObj, key, listArr = [], tmpArr = {},  nameArr = [], idx = 0, nKey, nObj, i;
        //const document;
        await getDoc(passagesAllRef).then(
          (document) => {
            if(document.exists()) {
              plObj = document.data();
              //console.log("plObj", plObj);
              for(key in plObj) {
                nKey = plObj[key].name;
                nObj = plObj[key];
                if(nKey=="---") { continue; }
                nameArr.push(nKey);
                tmpArr[nKey] = nObj;
              }
              nameArr.sort();
              for(i=0; i<nameArr.length; i++) {
                nKey = nameArr[i];
                nObj = tmpArr[nKey];
                nObj.localIndex = i;
                listArr.push(nObj);
              }
              commit("setPassagesList", listArr)  
            }     
        });
        
      }
    },

    async fetchPassageHistory({ commit }, vesselID) {
      let docKey = 'mmsi'+vesselID 
      //367668810
      const vesselRef = doc(db, 'Vessels', docKey)
      const document = await getDoc(vesselRef)
            
      if(document.exists()) {
        console.log("Data: ", document.data())
        var data = document.data()
        var obj = updateVesselHistory(data)
        commit('setHistoryCache', obj)
      } else {
        console.log("Data not found!")
      }
    },

    async fetchCurrentMonth({ commit, state } ) {
      //Check whether cache is already set to prevent reloading
      if(state.monthCache[0].passageDirection !=="default") {
        return;
      }
      let thisMonthObj = new Date()
      let yr = thisMonthObj.getFullYear()
      let mo = thisMonthObj.getMonth()
      let lm = mo == 0 ? 11 : mo-1; //Last Month 
      let thisMonthKey = format(new Date(yr, mo), "yyyyMM")
      let lastMonthKey = format(new Date(yr, lm), "yyyyMM")
      const vesselRef1 = doc(db, 'Passages', lastMonthKey)
      const vesselRef2 = doc(db, 'Passages', thisMonthKey)
      const document1 = await getDoc(vesselRef1)
      const document2 = await getDoc(vesselRef2)
      var vessels = [], lmData, tmData, vkey, dkey, found = false;
      //Put lastMonth & thisMonth passage in 1 vessels array
      if(document1.exists()) {
        lmData = document1.data()  
        for(dkey in lmData) {
          for(vkey in lmData[dkey]) {
            lmData[dkey][vkey]['alphaDO']   = new Date( lmData[dkey][vkey].passageMarkerAlphaTS * 1000)
            lmData[dkey][vkey]['bravoDO']   = new Date( lmData[dkey][vkey].passageMarkerBravoTS * 1000)
            lmData[dkey][vkey]['charlieDO'] = new Date( lmData[dkey][vkey].passageMarkerCharlieTS * 1000)
            lmData[dkey][vkey]['deltaDO']   = new Date( lmData[dkey][vkey].passageMarkerDeltaTS * 1000)
            vessels.push(lmData[dkey][vkey])
          }
        }
        found = true;
      }
      if(document2.exists()) {
        tmData = document2.data()
        for(dkey in tmData) {
          for(vkey in tmData[dkey]) {
            
            tmData[dkey][vkey]['alphaDO']   = new Date( tmData[dkey][vkey].passageMarkerAlphaTS * 1000)
            tmData[dkey][vkey]['bravoDO']   = new Date( tmData[dkey][vkey].passageMarkerBravoTS * 1000)
            tmData[dkey][vkey]['charlieDO'] = new Date( tmData[dkey][vkey].passageMarkerCharlieTS * 1000)
            tmData[dkey][vkey]['deltaDO']   = new Date( tmData[dkey][vkey].passageMarkerDeltaTS * 1000)
            vessels.push(tmData[dkey][vkey])
          }
        }
        found = true;
      }
      if(found) {
        //Sort by passageMarkerCharlieTS
        vessels.sort( (a,b) => parseInt(a.passageMarkerCharlieTS) < parseInt(b.passageMarkerCharlieTS) ? -1 : 1)
        //console.log("Vessels Passage Array: ", vessels)
        commit('setMonthCache', vessels)
      } else {
        //console.log("No Passages found for "+lastMonthKey+" "+thisMonthKey)
      }

    },

    async fetchAllAlerts({ commit, state }) {
      if(state.alertsAll[0].apubID == "loading") {
        const apubSnapshot = onSnapshot(doc(db, "Alertpublish", "all"), (querySnapshot) => {
          let tempAlertsAll = []
          let dataSet = querySnapshot.data()
          let i = 0
          for(var data in dataSet) {
            dataSet[data]['date'] = new Date(dataSet[data]['apubTS']*1000)
            tempAlertsAll.push(dataSet[data])
            i++
          }
          //Add placeholder data if not 20 results
          let j = 20 - tempAlertsAll.length
          while(j>0) {
            console.log("value of j: ", j)
            tempAlertsAll.push( { apubID: -1, date: new Date() } )
            j--
          }
          //Sort by apubTS decending
          tempAlertsAll.sort( (a,b) => parseInt(a.apubTS) - parseInt(b.apubTS))
          state.alertsAll = [...tempAlertsAll]
          console.log("alertsAll array replaced", state.alertsAll)
        })
      }
      
    },

    async fetchPassengerAlerts({ commit, state }) {
      if(state.alertsPassenger[0].apubID == "loading") {
        const apubSnapshot = onSnapshot(doc(db, "Alertpublish", "passenger"), (querySnapshot) => {
          let tempAlertsPassenger = []
          let dataSet = querySnapshot.data()
          let i = 0
          for(var data in dataSet) {
            dataSet[data]['date'] = new Date(dataSet[data]['apubTS']*1000)
            tempAlertsPassenger.push(dataSet[data])
            i++
          }
          //Add placeholder data if not 20 results
          let j = 20 - tempAlertsPassenger.length
          while(j>0) {
            console.log("value of j: ", j)
            tempAlertsPassenger.push( { apubID: -1, apubTS:1630614794 , date: new Date(1630614794000) } )
            j--
          }
          //Sort by apubTS decending
          tempAlertsPassenger.sort( (a,b) => parseInt(a.apubTS) - parseInt(b.apubTS))
          //After building array replace state version
          state.alertsPassenger = [...tempAlertsPassenger]
          console.log(state.alertsPassenger)
        })
      }
    },

    async fetchGalleryVideo({ commit, state }) {
      if(state.galleryVideo[0].vessel==="loading") {
        const vidSnapshot = await getDocs(collection(db, "GalleryVideo"))
        let tempGalleryVideo = []
        vidSnapshot.forEach( (doc) => {
          let data = doc.data()
          data['id'] = doc.id
          tempGalleryVideo.push(data);        
        })
        tempGalleryVideo.sort( (a,b) => b.sequence - a.sequence) 
        state.galleryVideo = [...tempGalleryVideo]
      }
    },
  },
  mutations: {
    setPassagesList(state, val) {
      state.passagesList = val
    },
    setHistoryCache(state, payload) {
      state.historyCache = payload
    },
    setMonthCache(state, payload) {
      console.log("Ranges: ", state.ranges)
      state.monthCache = payload
    },
    setSlate(state, val) {
      state.slate = val
    },
    setAlertsLinkActive(state, val) {
      state.alertsLinkActive = val
    },
    setLogsLinkActive(state, val) {
      state.logsLinkActive = val
    },
    setGalleryLinkActive(state, val) {
      state.galleryLinkActive = val
    },
    setIsNotHero(state, val) {
      state.isNotHero = val
    }
  },

  getters : { 
    getVesselName: state => state.historyCache.vesselName,
    getVesselUrl:  state => state.historyCache.vesselImageUrl,
    getVesselPassages: state => state.historyCache.vesselPassages,
    getAlpha: state => state.historyCache.vesselPassages.alpha,
    getBravo: state => state.historyCache.vesselPassages.bravo,
    getCharlie: state => state.historyCache.vesselPassages.charlie,
    getDelta: state => state.historyCache.vesselPassages.delta,
    dd: () => { return format(new Date(), "dd")},
    ymd: () => { return format(new Date(), "yyyy-mm-dd") },
    getToday: (state) => {
      let ret = state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.today.lo && item.passageMarkerCharlieTS < state.ranges.today.hi
      })
      ret.sort( (a,b) => a.passageMarkerCharlieTS > b.passageMarkerCharlieTS ? -1 : 1) 
      return ret
    },
    getYesterday: (state) => {
      let ret = state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.yesterday.lo && item.passageMarkerCharlieTS < state.ranges.yesterday.hi
      })
      ret.sort( (a,b) => a.passageMarkerCharlieTS > b.passageMarkerCharlieTS ? -1 : 1) 
      return ret
    },
    getPast24: (state) => {
      let ret = state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.past24.lo && item.passageMarkerCharlieTS < state.ranges.past24.hi
      })
      ret.sort( (a,b) => a.passageMarkerCharlieTS > b.passageMarkerCharlieTS ? -1 : 1) 
      return ret
    },
    getPast7: (state) => {
      let ret = state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.past7.lo && item.passageMarkerCharlieTS < state.ranges.past7.hi
      })
      ret.sort( (a,b) => a.passageMarkerCharlieTS > b.passageMarkerCharlieTS ? -1 : 1) 
      return ret
    },
    getLastMonth: (state) => {
      let ret = state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.lastMonth.lo && item.passageMarkerCharlieTS < state.ranges.lastMonth.hi
      })
      ret.sort( (a,b) => a.passageMarkerCharlieTS > b.passageMarkerCharlieTS ? -1 : 1) 
      return ret
    },
    getThisMonth: (state) => {
      let ret = state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.thisMonth.lo && item.passageMarkerCharlieTS < state.ranges.thisMonth.hi
      })
      ret.sort( (a,b) => a.passageMarkerCharlieTS > b.passageMarkerCharlieTS ? -1 : 1) 
      return ret
    },
    getRanges: state => { return state.ranges.past7.lo }   
  }    
}


const moduleB = {
  //This module for Admin pages
  state: () => ({
    adminUser: false,
    adminMsg: false,
    adminFormChanged: false,
    adminFormSaved: false,
    subscribedEventsList: [],
    vesselsList: [
      {
        vesselID: "000",
        vesselName: "Loading..."
      }
    ]

  }),
  mutations: { 
    SAVE_ADMIN_CREDENTIALS(state, value) {
      state.adminUser = value
    },
    SET_ADMIN_FORM_CHANGED(state, value) {
      state.adminFormChanged = value
    },
    SET_ADMIN_FORM_SAVED(state, value) {
      state.adminFormSaved = payload
    }
  },
  actions: {
    async fetchAllSubscribedEvents({ commit, state }) {
      const udSnapshot = await getDocs(collection(db, "user_devices"))
      udSnapshot.forEach( (doc) => {
        let data = doc.data()
        let events = data.events
        let obj =  null
        events.forEach((event) => {
          //Increment counter if event in array already
          if( obj = state.subscribedEventsList.find( ({name}) => name === event) ) {
            obj.count++  
          //Otherwise add event to array
          } else {
            let ab = {name: event, count: 1 }
            state.subscribedEventsList.push(ab);
          }          
        })        
      })
      state.subscribedEventsList.sort( (a,b) => a.name < b.name ? -1 : 1)     
    },

    async fetchAllVessels({ commit, state }) {
      if(state.vesselsList[0].vesselID !=="000") {
        return;
      }
      const q = query(collection(db, 'Vessels'), where('vesselID', '!=', false))
      const vessSnapshot = onSnapshot(q, (querySnapshot) => { 
        var tempList = []   
        querySnapshot.forEach( (ret) => {
          let data = ret.data()
          let index = 0
          data['index'] = index++
          data['vesselRecordAddedDate'] = format(new Date(parseInt(data.vesselRecordAddedTS)*1000), "iii MMM d, yyyy")
          tempList.push(data) 
        })
        tempList.sort( (a,b) => a.vesselName < b.vesselName ? -1 : 1)
        state.vesselsList = tempList
      })
    },



    fetchAdminMsg({ commit, state }) {
      if(state.adminMsg != false) {
        return
      }
      const passSnapshot = onSnapshot(doc(db, 'Passages', 'Admin'), (item) => {
        state.adminMsg = item.data()
      })
    },
    saveAdminCredentials: ({commit, state} , value) => {
      commit('SAVE_ADMIN_CREDENTIALS', value)
      console.log('saveAdminCredentials: ', state.adminUser)
      return state.adminUser
    },
    setAdminFormChanged: ({commit, state}, value) => {
      commit('SET_ADMIN_FORM_CHANGED', value)
    },
    setAdminFormSaved: ({commit, state}, value) => {
      commit('SET_ADMIN_FORM_SAVED', value)
    }


  },
  getters: {
    getVesselDetail: (state) => (vesselID) => {
      return state.vesselsList.filter( (item) => {
        return item.vesselID == vesselID
      })
    },
    getVesselsPassengerOnly: (state) => {
      return state.vesselsList.filter( (item) => {
        return item.vesselType.includes("assenger")
      })
    },
    getVesselsSortAdded: (state) => {
      let tempList = []
      state.vesselsList.forEach( (item) => {
        tempList.push(item)
      })
      tempList.sort( (a,b) => a.vesselRecordAddedTS > b.vesselRecordAddedTS ? -1 : 1)
      return tempList      
    },
    getVesselsSortMMSI: (state) => {
      let tempList = []
      state.vesselsList.forEach( (item) => {
        tempList.push(item)
      })  
      tempList.sort( (a,b) => a.vesselID < b.vesselID ? -1 : 1)
      return tempList 
    },
  }
}

const moduleC = {
  state: () => ({  }),
  mutations: {  },
  actions: {  },
  getters: {  }
}

const moduleD = {
  state: () => ({  }),
  mutations: { },
  actions: {  },
  getters: {  }
}

const moduleE = {
  state: () => ({  }),
  mutations: {  },
  actions: {  },
  getters: {  }
}

const moduleF = {
  state: () => ({  }),
  mutations: {  },
  actions: {  },
  getters: {  }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB,
    c: moduleC,
    d: moduleD,
    e: moduleE,
    f: moduleF
  }
})

export default store