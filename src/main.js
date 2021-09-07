import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import CrtLogo from '@/components/CrtLogo.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'


//register components
const registerComponents = (app) => { 
  app.component('CrtLogo', CrtLogo);
}

const app = createApp(App).use(router).use(store);

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