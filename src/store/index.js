import { createStore } from 'vuex'
//import { mapGetters } from 'vuex'
import { firestore } from './firebaseApp.js'
import { doc, getDoc, getDocs, setDoc, collection, onSnapshot, query, where, limit, orderBy } from 'firebase/firestore'
// onSnapshot, collection, query, where
import { format, lastDayOfMonth, startOfYesterday, endOfYesterday, setHours } from 'date-fns'
import { GoogleAuthProvider } from 'firebase/auth'
import LiveScanModel from '@/assets/classes/LiveScanModel.js'
import { Loader } from '@googlemaps/js-api-loader'

//const MAP_KEY = process.env.VUE_APP_MAP_KEY
const db = firestore
//const loader = new Loader({ apiKey: MAP_KEY })


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

//LiveScan Object class
class LiveScan {
  constructor(state) {
    this.state          = state //callback
    this.liveLastScanTS = null
    this.plotTS         = null
    this.position       = null
    this.lat            = null
    this.lng            = null
    this.id             = null
    this.name           = null
    this.liveLocation   = null
    this.mapLabel       = null
    this.btnText        = "+"
    this.dir            = "undetermined"
    this.dirImg         = null
    this.callsign       = null
    this.timerOutput    = null
    this.speed          = null
    this.course         = null
    this.length         = null
    this.width          = null
    this.draft          = null
    this.marker         = null
    this.hasImage       = null
    this.imageUrl       = null
    this.type           = null
    this.liveIsLocal    = false
    this.liveMarkerAlphaWasReached = false
    this.liveMarkerAlphaTS         = null
    this.liveMarkerBravoWasReached = false
    this.liveMarkerBravoTS         = null
    this.liveMarkerCharlieWasReached = false
    this.liveMarkerCharlieTS         = null
    this.liveMarkerDeltaWasReached = false
    this.liveMarkerDeltaTS         = null
    this.expandedViewOn            = false
    this.lastMovementTS            = new Date()
    this.dataAge                   = "age-green"
    this.prevLat                   = null
    this.prevLng                   = null
    this.isMoving                  = false
    this.localVesselText           = () => {
      if(this.liveIsLocal==1) {
        return "Passages are not logged for this local operations vessel as it doesn't cross all four monitored waypoints.";
      } else if(this.liveIsLocal==0) {
        return "";
      }
    }
    this.toggleExpanded = () => {
      this.expandedViewOn = !this.expandedViewOn
    }

    this.lastMovementAgo           = () => {
      var now  = Date.now();
      var diff = Math.floor((now - this.lastMovementTS.getTime())/60000)
      //return "now: "+now +"last: " + this.lastMovementTS().getTime() + "now - diff = "+diff;
      return diff>1 ? diff + " Minutes Ago" : "Current";
    }
    
    this.url = () => {
      return "../logs/history/" + this.id;
    }
    this.setDirImg = ()=> {
      switch(this.dir) {
        case "undetermined": return "https://storage.googleapis.com/www.clintonrivertraffic.com/images/qmark.png"; break;
        case "upriver"     : return "https://storage.googleapis.com/www.clintonrivertraffic.com/images/uparr.png"; break;
        case "downriver"   : return "https://storage.googleapis.com/www.clintonrivertraffic.com/images/dwnarr.png"; break;
      }
    }
    this.alphaTime = () => {
      if(this.liveMarkerAlphaTS===null) {
        return "Not Yet Reached";
      } else {
      return formatTime(this.liveMarkerAlphaTS);
      }
    } 
    this.bravoTime = ()=> {
      if(this.liveMarkerBravoTS===null) {
        return "Not Yet Reached";
      } else {
        return formatTime(this.liveMarkerBravoTS);
      }       
    } 
    this.charlieTime = ()=> {
      if(this.liveMarkerCharlieTS===null) {
        return "Not Yet Reached";
      } else {
        return formatTime(this.liveMarkerCharlieTS);
      }      
    } 
    this.deltaTime = ()=> {
      if(this.liveMarkerDeltaTS===null) {
        return "Not Yet Reached";
      } else {
        return formatTime(this.liveMarkerDeltaTS);
      }
      
    } 
    this.zoomMap = () => {
      if(this.state.map.isZoomed) {
        this.state.map.center = this.state.liveScanModel.clinton;
        this.state.map.zoom = 12;      
        this.isZoomed = false
      } else {
        this.state.map.center = this.position;
        this.state.map.zoom = 15;
        this.state.isZoomed = true
      }
    }
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

function getKeyOfId(arr, id) {
  var key = -1;
  arr.forEach(function (currentVal, idx) {
    if(id == currentVal.id) {
      key = idx;
    }
  });
  return key;  
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

/* * * * * * * * *
* Functions used by Live page & Map component
*/

//Function used in initLiveScan()
function formatTime(ts) {
  var d, day, days, dh, h, m, merd, str;
  if(ts=="Not Yet Reached") { return ts; }
  ts = new Date(ts);
  h = ts.getHours();
  m = ts.getMinutes();
  if(m < 10) { m = "0" + m; }
  d = ts.getDay();
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  day  = days[d];
  merd = h>=12 ? 'pm':'am';
  if(h>12) { 
    dh = h-12; 
  } else if(h==0) {
    dh = 12;
  } else {
    dh = h;
  }
  str = dh +":"+m+merd+" "+day;
  return str;
}

function predictMovement(state) {
  console.log('predictMovement()')
  var speed, distance, bearing, point, coords;
  //Loop through live vessels
  state.liveScans.forEach( (o) => {
    //Skip if vessel not moving or bogus position data
    if( o.isMoving && (o.lat > 1) && (-o.lng > 1)) {
      //Remove 'kts' from speed & change to int 
      speed = parseInt(o.speed);
      //Multiply knots by 1.852 to get KPH
      speed = speed * 1.852;
      //Ignore unrealistic speed reports.
      if(speed > 50) {
        return;
      }
      //Divide KPH by 3600 to get kilometers traveled in one second
      distance = speed / 3600;
      //Clean course 
      bearing = parseInt(o.course);
      //Predict next point
      point = calculateNewPositionFromBearingDistance(o.lat, o.lng, bearing, distance);
      //Update view model
      o.lat = point[0];
      o.lng = point[1];
      o.marker.position = { lat: point[0], lng: point[1] };
      coords = getShipSpriteCoords(bearing);
      o.marker.icon.origin = {x: coords[0], y: coords[1] }; 
      console.log(o.name+' '+o.lat+' '+o.lng)    
    } 
  });  
}

function calculateNewPositionFromBearingDistance(lat, lng, bearing, distance) {
  var R = 6371; // Earth Radius in Km
  var lat2 = Math.asin(Math.sin(Math.PI / 180 * lat) * Math.cos(distance / R) + Math.cos(Math.PI / 180 * lat) * Math.sin(distance / R) * Math.cos(Math.PI / 180 * bearing));
  var lon2 = Math.PI / 180 * lng + Math.atan2(Math.sin( Math.PI / 180 * bearing) * Math.sin(distance / R) * Math.cos( Math.PI / 180 * lat ), Math.cos(distance / R) - Math.sin( Math.PI / 180 * lat) * Math.sin(lat2));
  return [180 / Math.PI * lat2 , 180 / Math.PI * lon2];
}

// The shared state object that any vue component can get access to.
// Has some placeholders that we’ll use further on!
const moduleA = {
  state: () => ({
      slate: "LOADING",
      alertsLinkActive: false,
      logsLinkActive: false,
      galleryLinkActive: false,
      pageSelected: null,
      isHero: false,
      isTest: true,
      lab: "ABCDEFGHIJKLMNOPQRSTUVWXYZ*#@&~1234567890abcdefghijklmnopqrstuvwxyz",
      red: "#ff0000",
      //isZoomed: false,
      map: {
        zoom: 12, 
        center: {lat: 41.857202, lng:-90.184084}, 
        mapTypeId: "hybrid"
      },
      focusPosition: {lat: 41.857202, lng:-90.184084},
      polylines: [],
      mileMarkersList: [],
      mileMarkerLabels: [],
      liveAutoOn: true, 
      liveAutoDelay: 7,
      liveAutoLast: 500,
      liveListOn: false,
      liveMapHeight: 50,
      liveScanModel: null,
      liveScans: [ { liveName: "loading" }
      ], 
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
        vesselImageUrl: "",
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

    initLiveScan({ commit }, payload) {
      commit('initLiveScan', payload)
      setInterval(predictMovement(state), 1000)
    },

    //Run by initMap()
    addMileMarkers( { commit } ) {
      commit('addMileMarkers')
    },  
      
    initMap({ dispatch, commit }) {   
      commit('initMap')
      dispatch('addMileMarkers')
    },

    toggleLiveAuto({ commit }, payload) {
      commit('toggleLiveAuto', payload)
    },

    toggleLiveList({ commit }, payload) {
      commit('toggleLiveList', payload)
    },
      
    focusMap({ commit }, payload) {
      commit('focusMap', payload)
    },

    deleteOldScans({ commit, state }) {
      var a, l = 0, arr = [], i = 0, now = Date.now();
      state.livescans.forEach( (obj) => {
        if((now - 1800000)> obj.lastMovementTS.getTime()) {
          arr.push(i); //array of indexes to remove    
        }
        i++
      })
      l = arr.length
      if(l) { //proceed only if any found above
        for(a in arr) {
          state.livescans = state.livescans.splice(a,1)
        }    
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
    setIsHero(state, val) {
      state.isHero = val
    },
    setPageSelected(state, val) {
      state.pageSelected = val
    },
    focusMap(state, payload) {
      if(!state.liveScans.length) {
        return
      }
      state.focusPosition = state.liveScans[payload].position
      state.map.center = state.focusPosition
      state.map.zoom = 15
      state.isZoomed = true
    },
    initMap(state) {
      state.map =  {
        zoom: 12, 
        center: {lat: 41.857202, lng:-90.184084}, 
        mapTypeId: "hybrid"
      }
      state.polylines = [
        {
          name: "alpha",
          path: [{lat: 41.938785, lng: -90.173893}, {lat: 41.938785, lng: -90.108296}],
          strokeColor: state.red,
          strokeWeight: 2,
          options: {
            clickable: false,
            draggable: false,
            editable: false
          }
        },
        {
          name: "bravo", 
          path: [{lat: 41.897258, lng: -90.174}, {lat: 41.897258, lng: -90.154058}],
          strokeColor: state.red,
          strokeWeight: 2,
          options: {
            clickable: false,
            draggable: false,
            editable: false
          }
        },
        {
          name: "charlie",
          path: [{lat: 41.836353, lng: -90.186610}, {lat: 41.836353, lng: -90.169705}],
          strokeColor: state.red,
          strokeWeight: 2,
          options: {
            clickable: false,
            draggable: false,
            editable: false
          }
        },        
        {
          name: "delta",
          path: [{lat: 41.800704, lng: -90.212768}, {lat: 41.800704, lng: -90.188677}],
          strokeColor: state.red,
          strokeWeight: 2,
          options: {
            clickable: false,
            draggable: false,
            editable: false
          }
        }
      ]         
    },
    addMileMarkers(state) {
      var dat = [
        {id:486, lngA:-90.50971806363766, latA:41.52215220467504, lngB:-90.5092203536731, latB:41.51372097487243}, 
        {id:487, lngA:-90.48875678287305, latA:41.521402024002950, lngB:-90.48856266269104, latB:41.5145424556308},
        {id:488, lngA:-90.47251555885472, latA:41.52437816051497, lngB:-90.47036467716465, latB:41.51537456609466},
        {id:489, lngA:-90.45698288389242, latA:41.53057735758976, lngB:-90.45000250745086, latB:41.52480546208061},
        {id:490, lngA:-90.4461928429114, latA:41.54182560886835, lngB:-90.43804967962095, latB:41.53668343008653},
        {id:491, lngA:-90.43225148614556, latA:41.55492191671779, lngB:-90.42465891516093, latB:41.54714647168962},
        {id:492, lngA:-90.42215634673808, latA:41.56423876538352, lngB:-90.41359632007243, latB:41.55879211219473},
        {id:493, lngA:-90.40755589318907, latA:41.57200066107595, lngB:-90.40121765684347, latB:41.56578132917156},
        {id:494, lngA:-90.39384285792221, latA:41.57842796885789, lngB:-90.38766103940617, latB:41.57132529050489},
        {id:495, lngA:-90.37455561078977, latA:41.58171517893158, lngB:-90.37097459099577, latB:41.57455780093269},
        {id:496, lngA:-90.35418070340366, latA:41.5875726488084, lngB:-90.34989801453619, latB:41.58193114855811},
        {id:497, lngA:-90.34328730016247, latA:41.59576427084198, lngB:-90.33608085417411, latB:41.59502112101575},
        {id:498, lngA:-90.34404272829823, latA:41.61119012348694, lngB:-90.33646143861851, latB:41.6111032102589},
        {id:499, lngA:-90.3472745860646, latA:41.62454773858045, lngB:-90.33663122233754, latB:41.62387063319586},
        {id:500, lngA:-90.3480736269221, latA:41.63971945269969, lngB:-90.33817941381621, latB:41.63955239006518},
        {id:501, lngA:-90.34380831321272, latA:41.65683003496228, lngB:-90.33649979303949, latB:41.65484790099703},
        {id:502, lngA:-90.33988256792307, latA:41.66828476005874, lngB:-90.3286147300638, latB:41.66790001449647},
        {id:503, lngA:-90.33882199131011, latA:41.68036827724283, lngB:-90.32843393740198, latB:41.6798418644646},
        {id:504, lngA:-90.32382303252616, latA:41.69122269168967, lngB:-90.31540075610307, latB:41.68607027095535},
        {id:505, lngA:-90.31560815565506, latA:41.70162133249737, lngB:-90.31077421309571, latB:41.70093421981962},
        {id:506, lngA:-90.32324160813617, latA:41.71865527148766, lngB:-90.3144828164786, latB:41.71893714129034},
        {id:507, lngA:-90.32043157100178, latA:41.73305742526379, lngB:-90.31219715829357, latB:41.73209034176453},
        {id:508, lngA:-90.30911551889101, latA:41.74805205206862, lngB:-90.30381674016407, latB:41.74473810650169},
        {id:509, lngA:-90.29387889379554, latA:41.75940105234584, lngB:-90.29012440316585, latB:41.7570342469618},
        {id:510, lngA:-90.28216840054604, latA:41.76853414046849, lngB:-90.27848788377898, latB:41.76498972749543},
        {id:511, lngA:-90.2654809443937, latA:41.77464017600214, lngB:-90.26200151315392, latB:41.770651247585950},
        {id:512, lngA:-90.24800719074986, latA:41.7843434632554, lngB:-90.24263626100766, latB:41.77880910965498},
        {id:513, lngA:-90.23473410036074, latA:41.79168622191222, lngB:-90.2284317808665, latB:41.78595112826723},
        {id:514, lngA:-90.2156953508097, latA:41.7973419581181, lngB:-90.21337944364016, latB:41.79404084443492},
        {id:515, lngA:-90.19822143802581, latA:41.8025198609788, lngB:-90.19581674354208, latB:41.79898355228364},
        {id:516, lngA:-90.18352536643455, latA:41.80932693789443, lngB:-90.17633565144088, latB:41.80648691881999},
        {id:517, lngA:-90.18485994749022, latA:41.8234823269278, lngB:-90.18032482162711, latB:41.82393548957531},
        {id:518, lngA:-90.18522602598576, latA:41.83743971204904, lngB:-90.18253482993897, latB:41.83749106584514},
        {id:519, lngA:-90.17908346056349, latA:41.8513020234478, lngB:-90.17295527825956, latB:41.850379130804},
        {id:521, lngA:-90.17297767304423, latA:41.87737306056449, lngB:-90.16660198044828, latB:41.8760873927711},
        {id:522, lngA:-90.16238975538499, latA:41.89065244219969, lngB:-90.15871961546813, latB:41.88892630366035},
        {id:523, lngA:-90.15857648612955, latA:41.9046208778465, lngB:-90.15204920435555, latB:41.90255202787517},
        {id:524, lngA:-90.15922331108948, latA:41.91811211350211, lngB:-90.14839637939535, latB:41.91635929261279},
        {id:525, lngA:-90.15792090703236, latA:41.92858462810474, lngB:-90.15049176877096, latB:41.92853047111586},
        {id:526, lngA:-90.15891810761379, latA:41.94107477739816, lngB:-90.15487203752069, latB:41.94093309207638},
        {id:527, lngA:-90.15826136438079, latA:41.95580911610016, lngB:-90.15471943137281, latB:41.95564703478067},
        {id:528, lngA:-90.15816804572817, latA:41.96889364389622, lngB:-90.15019283497713, latB:41.96669934783529},
        {id:529, lngA:-90.14371602128973, latA:41.9845638044717, lngB:-90.13909858199787, latB:41.98346713433521},
        {id:530, lngA:-90.14570019987397, latA:41.99916325249763, lngB:-90.13663421169025, latB:41.99881259011114},
        {id:531, lngA:-90.14783536451105, latA:42.01128988436283, lngB:-90.13865142581066, latB:42.01213328702114},
        {id:532, lngA:-90.15182067613138, latA:42.02602246774179, lngB:-90.14629338851498, latB:42.02665221822929},
        {id:533, lngA:-90.16063756667363, latA:42.03651491321578, lngB:-90.15151752534508, latB:42.03730169372241},
        {id:534, lngA:-90.16890457045166, latA:42.04885717910146, lngB:-90.16066649304122, latB:42.04930465441836},
        {id:535, lngA:-90.16873927252988, latA:42.06458933574678, lngB:-90.16266001168944, latB:42.06507225175709},
        {id:536, lngA:-90.16914609409496, latA:42.0804515612181, lngB:-90.16249823994366, latB:42.07970814767357},
        {id:537, lngA:-90.16729803875997, latA:42.09221812981502, lngB:-90.1579947493362, latB:42.09136054497117},
        {id:538, lngA:-90.16382083849952, latA:42.10622273166468, lngB:-90.15894760458957, latB:42.10600456364353},
        {id:539, lngA:-90.16773051913361, latA:42.11833177709393, lngB:-90.16024166340684, latB:42.12179322620005},
        {id:540, lngA:-90.18197341024099, latA:42.12474496670414, lngB:-90.18304430150994, latB:42.12795599576975},
        {id:520, lngA:-90.17610039282224, latA:41.86515500754595, lngB:-90.17058699252856, latB:41.86429560522607}  
      ];

      if(state.mileMarkersList.length == 0) {
        for(var i=0, len=dat.length; i<len; i++) {
          state.mileMarkersList.push({
              name: "Mile "+dat[i].id,            
              path: [
                  {lat: dat[i].latA, lng: dat[i].lngA},
                  {lat: dat[i].latB, lng: dat[i].lngB}
              ],
              strokeColor: "#34A16B",
              strokeWeight: 2,
              options: {
                clickable: false,
                draggable: false,
                editable: false
              }
          })
          state.mileMarkerLabels.push({
              position: {lat: dat[i].latA, lng: dat[i].lngA },
              title: "Mile "+dat[i].id, 
              label: String(dat[i].id),
              icon: {
                url: "https://storage.googleapis.com/www.clintonrivertraffic.com/images/green.png" ,
                labelOrigin: {x: 24, y: 15},
                scaledSize: {width: 50, height: 50}
              }
          }) 
        }
      }     
    },
    async initLiveScan( state, payload) {
      state.liveScanModel = new LiveScanModel(payload)
      if(state.liveScans[0].liveName == "loading") {
        state.liveScans = []
        const q = query(collection(db, 'LiveScan'), where('liveVesselID', '!=', false));
        const liveScanSnapshot = onSnapshot(q, (querySnapshot)=> {
          var key, o, marker, coords, course
          querySnapshot.forEach( (doc) => {
            let dat = doc.data()
            key = getKeyOfId(state.liveScans, dat.liveVesselID)
            //Create & Push
            if(key==-1) {
              state.liveScans.push(state.liveScanModel.mapper(new LiveScan(state), dat, true, state))
            }
            //Find & Update
            else {
              state.liveScans[key] = state.liveScanModel.mapper(state.liveScans[key], dat, false, state)
            }    
          })
        })
        
        console.log("map center:", state.map )     
      }
    },

    toggleLiveAuto(state, val) {
      state.liveAutoOn = val.on  
      state.liveAutoLast = state.liveAutoDelay
      state.liveAutoDelay = val.delay
    },

    toggleLiveList(state, val) {
      state.liveListOn    = val.on
      state.liveMapHeight = val.vh
      state.map.zoom      = val.zoom
      state.map.center    = val.center
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