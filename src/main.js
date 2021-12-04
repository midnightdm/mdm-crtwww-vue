import devtools from '@vue/devtools'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import CrtLogo from '@/components/CrtLogo.vue'
import Hero from '@/views/Hero.vue'
import router from './router'
import store from './store'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import timeago from 'vue-timeago3'
import 'animate.css'


//register components
const registerComponents = (app) => { 
  app.component('CrtLogo', CrtLogo);
  app.component('Hero', Hero);
}

const app = createApp(App).use(router).use(store).use(timeago);

new WaveUI(app, {
});
registerComponents(app);

window.postMessage({
    devtoolsEnabled: true,
    vueDetected: true
  }, '*');

app.mount('#app');

