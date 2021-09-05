import { createStore } from 'vuex'
//import { mapGetters } from 'vuex'
import firebase from './firebaseApp.js'
import { doc, getDoc } from 'firebase/firestore'
// onSnapshot, collection, query, where

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
  var i, k, objKey, dir, keysArr = [];
  for(objKey in dat.vesselPassages) {
    //Sort passages by dated keys before putting into waypoints
    if(dat.vesselPassages[objKey].passageMarkerAlphaTS==null && 
      dat.vesselPassages[objKey].passageMarkerBravoTS==null &&
      dat.vesselPassages[objKey].passageMarkerCharlieTS==null &&
      dat.vesselPassages[objKey].passageMarkerDeltaTS==null)
    {
      console.log("Skipping null passage "+objKey);
      continue;
    } else {
      keysArr.push(objKey)
    }
  }
  keysArr.sort();
  for(i=0; i<keysArr.length; i++) {
    k = keysArr[i];
    dir = dat.vesselPassages[k].passageDirection=="upriver" ? "up" : "down";
    waypoints.alpha[i] = {
      date: new Date(dat.vesselPassages[k].passageMarkerAlphaTS*1000),
      dir: dir
    };
    waypoints.bravo[i] = {
      date: new Date(dat.vesselPassages[k].passageMarkerBravoTS*1000),
      dir: dir
    }
    waypoints.charlie[i] = {
      date : new Date(dat.vesselPassages[k].passageMarkerCharlieTS*1000),
      dir: dir
    };

    waypoints.delta[i] = {
      date: new Date(dat.vesselPassages[k].passageMarkerDeltaTS*1000),
      dir: dir
    }
  }
  o.vesselPassages = waypoints;
  console.log("Reassembled Vessel Object: ", o)
  return o;            
}



// The shared state object that any vue component can get access to.
// Has some placeholders that we’ll use further on!
const moduleA = {
  state: () => ({ 
      passagesList: [
        {
          date: "August 6, 2021",
          id: "338075432",
          image: "https:// www.clintonrivertraffic.com/vessels/jpg/338075432",
          name: "MV Warioto",
          type: "towing" 
        }
      ],
      
      historyCache: {      
        vesselBuilt: "---",
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
      }
  }),
  actions: {
    async fetchPassagesList({ commit }) {
      const passagesAllRef = doc(db, 'Passages', 'All');
      const document = await getDoc(passagesAllRef);
      var plObj, key, listArr = [], tmpArr = {},  nameArr = [], idx = 0, nKey, nObj, i;
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
    },

    async fetchPassageHistory({ commit }, vesselID) {
      let docKey = 'mmsi'+vesselID 
      //367668810
      const vesselRef = doc(db, 'Vessels', docKey)
      const document = await getDoc(vesselRef)
      var str = JSON.stringify(document.data(), null, 2)
      
      if(document.exists()) {
        console.log("Data: ", document.data())
        var data = document.data()
        var obj = updateVesselHistory(data)
        commit('setHistoryCache', obj)
      } else {
        console.log("Data not found!")
      }
    }
  },

  mutations: {
    setPassagesList(state, val) {
      state.passagesList = val
    },
    setHistoryCache(state, payload) {
      state.historyCache = payload
    } 
  },

  getters : { 
    getVesselName: state => state.historyCache.vesselName,
    getVesselUrl:  state => state.historyCache.vesselImageUrl,
    getVesselPassages: state => state.historyCache.vesselPassages,
    getAlpha: state => state.historyCache.vesselPassages.alpha,
    getBravo: state => state.historyCache.vesselPassages.bravo,
    getCharlie: state => state.historyCache.vesselPassages.charlie,
    getDelta: state => state.historyCache.vesselPassages.delta
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