import { createRouter, createWebHistory } from 'vue-router'
import Logs from '../views/Logs.vue'
import Detail from '../views/Detail.vue'
import LastMonth from '../views/LastMonth.vue'
import Past7 from '../views/Past7.vue'
import Past24 from '../views/Past24.vue'
import ThisMonth from '../views/ThisMonth.vue'
import Today from '../views/Today.vue'
import Yesterday from '../views/Yesterday.vue'


const routes = [
  {
    path: '/logs',
    name: 'Logs',
    component: Logs
  },
  {
    path: '/logs/history/:id',
    name: 'Detail',
    component: Detail
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/logs/lastmonth',
    name: 'LastMonth',
    component: LastMonth
  },
  {
    path: '/logs/past7',
    name: 'Past7',
    component: Past7
  },
  {
    path: '/logs/past24',
    name: 'Past24',
    component: Past24
  },
  {
    path: '/logs/thismonth',
    name: 'ThisMonth',
    component: ThisMonth
  },
  {
    path: '/logs/today',
    name: 'Today',
    component: Today
  },
  {
    path: '/logs/yesterday',
    name: 'Yesterday',
    component: Yesterday
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
