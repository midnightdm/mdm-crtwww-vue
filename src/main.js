import devtools from '@vue/devtools'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import CrtLogo from '@/components/CrtLogo.vue'
import router from './router'
import store from './store'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'




//register components
const registerComponents = (app) => { 
  app.component('CrtLogo', CrtLogo);
}
//Added 10/16/21 to attempt subpage routing fix
//const history = require('connect-history-api-fallback')


const app = createApp(App).use(router).use(store);
new WaveUI(app, {
});
registerComponents(app);

window.postMessage({
    devtoolsEnabled: true,
    vueDetected: true
  }, '*');

app.mount('#app');

/*
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
*/