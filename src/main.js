import devtools from '@vue/devtools'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import CrtLogo from '@/components/CrtLogo.vue'
import router from './router'
import store from './store'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'


/*
if (process.env.NODE_ENV === 'development') {
  devtools.connect()
}
*/





//register components
const registerComponents = (app) => { 
  app.component('CrtLogo', CrtLogo);
}

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