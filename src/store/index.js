import { createStore } from 'vuex'
//import { mapGetters } from 'vuex'
import firebase from './firebaseApp.js'
import { doc, getDoc } from 'firebase/firestore'
// onSnapshot, collection, query, where
import { format, lastDayOfMonth, startOfYesterday, endOfYesterday, setHours } from 'date-fns'

const db = firebase

//Object Class defintion
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
//Object initialization & update functions

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
      date: new Date(dateArr[i].passageMarkerAlphaTS*1000),
      dir: dir
    };
    waypoints.bravo[i] = {
      date: new Date(dateArr[i].passageMarkerBravoTS*1000),
      dir: dir
    }
    waypoints.charlie[i] = {
      date : new Date(dateArr[i].passageMarkerCharlieTS*1000),
      dir: dir
    };

    waypoints.delta[i] = {
      date: new Date(dateArr[i].passageMarkerDeltaTS*1000),
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




// The shared state object that any vue component can get access to.
// Has some placeholders that we’ll use further on!
const moduleA = {
  state: () => ({ 
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
      ]
    }),   
  actions: {
    /*  Old Version
    async fetchPassagesList({ commit, state }) {
      if(state.passagesList[0].type==="default") {
        const passagesAllRef = doc(db, 'Passages', 'All');
        var plObj, key, listArr = [], tmpArr = {},  nameArr = [], idx = 0, nKey, nObj, i;
        const document = await getDoc(passagesAllRef);

        //document.get().then((doc) => {
        if(document.exists()) {
          plObj = document.data();
          //console.log("plObj", plObj);
          for(key in plObj) {
            nKey = plObj[key].name;
            nObj = plObj[key];
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
      }
    },
        New Method Below
    */
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
      //Check whether cache is alraeady set to prevent reloading
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
        console.log("Vessels Passage Array: ", vessels)
        commit('setMonthCache', vessels)
      } else {
        console.log("No Passages found for "+lastMonthKey+" "+thisMonthKey)
      }

    }
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
      return state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.today.lo && item.passageMarkerCharlieTS < state.ranges.today.hi
      })
    },
    getYesterday: (state) => {
      return state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.yesterday.lo && item.passageMarkerCharlieTS < state.ranges.yesterday.hi
      })
    },
    getPast24: (state) => {
      return state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.past24.lo && item.passageMarkerCharlieTS < state.ranges.past24.hi
      })
    },
    getPast7: (state) => {
      return state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.past7.lo && item.passageMarkerCharlieTS < state.ranges.past7.hi
      })
    },
    getLastMonth: (state) => {
      return state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.lastMonth.lo && item.passageMarkerCharlieTS < state.ranges.lastMonth.hi
      })
    },
    getThisMonth: (state) => {
      return state.monthCache.filter( (item) => {
        return item.passageMarkerCharlieTS > state.ranges.thisMonth.lo && item.passageMarkerCharlieTS < state.ranges.thisMonth.hi
      })
    },
    getRanges: state => { return state.ranges.past7.lo }   
  }    
}

 

const moduleB = {
  state: () => ({  }),
  mutations: {  },
  actions: {  },
  getters: {  }
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