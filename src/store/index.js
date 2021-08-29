import { createStore } from 'vuex'
import firestore from './firebaseApp.js'

const db = firestore

// The shared state object that any vue component can get access to.
// Has some placeholders that we’ll use further on!
//
// Doc help at https://www.smashingmagazine.com/2018/04/vuejs-firebase-firestore/
//

const moduleA = {
  state: () => ({ 
      passagesList: [] 
  }),
  actions: {
    fetchPassagesList({ commit }) {
      var passagesRef = db.collection('Passages');
      var document = passagesRef.doc("All");
      var plObj, key, listArr = [], tmpArr = {},  nameArr = [], idx = 0, nKey, nObj, i;
      document.get().then((doc) => {
        if(doc.exists) {
          plObj = doc.data();
          console.log("plObj", plObj);
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
  mutations: {
    setPassagesList(state, val) {
      state.passagesList = val
    } 
  },
  getters: {  }
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