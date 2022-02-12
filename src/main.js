import devtools from '@vue/devtools'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'
import AlertsSubMenuWide from '@/components/AlertsSubMenuWide.vue'
import GallerySubMenu from '@/components/GallerySubMenu.vue'
import LogsSubMenu from '@/components/LogsSubMenu.vue'
import Navigation from '@/components/Navigation.vue'
import Hero from '@/views/Hero.vue'
import router from './router'
import store from './store'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import timeago from 'vue-timeago3'
import 'animate.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


library.add(faBars);

//register components
const registerComponents = (app) => { 
  app.component('Hero', Hero);
  app.component('Navigation', Navigation);
  app.component('AlertsSubMenu', AlertsSubMenu);
  app.component('AlertsSubMenuWide', AlertsSubMenuWide);
  app.component('GallerySubMenu', GallerySubMenu);
  app.component('LogsSubMenu', LogsSubMenu);
  app.component('font-awesome-icon', FontAwesomeIcon);
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

