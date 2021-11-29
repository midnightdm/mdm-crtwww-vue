import devtools from '@vue/devtools'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import CrtLogo from '@/components/CrtLogo.vue'
import router from './router'
import store from './store'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import timeago from 'vue-timeago3'
import 'animate.css'
import CommentGrid from 'vue-comment-grid'

//register components
const registerComponents = (app) => { 
  app.component('CrtLogo', CrtLogo);
}

const app = createApp(App).use(router).use(store).use(timeago).use(CommentGrid);

new WaveUI(app, {
});
registerComponents(app);

window.postMessage({
    devtoolsEnabled: true,
    vueDetected: true
  }, '*');

app.mount('#app');

