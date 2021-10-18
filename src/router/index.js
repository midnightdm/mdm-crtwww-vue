import { createRouter, createWebHistory } from 'vue-router'
import Logs from '../views/logs/Logs.vue'
import Detail from '../views/logs/Detail.vue'
import LastMonth from '../views/logs/LastMonth.vue'
import Past7 from '../views/logs/Past7.vue'
import Past24 from '../views/logs/Past24.vue'
import ThisMonth from '../views/logs/ThisMonth.vue'
import Today from '../views/logs/Today.vue'
import Yesterday from '../views/logs/Yesterday.vue'
import Manage from '../views/alerts/Manage.vue'

import AddVess from '../views/admin/AddVess.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AllVess from '../views/admin/AllVess.vue'
import PassVess from '../views/admin/PassVess.vue'
import Subscribers from '../views/admin/Subscribers.vue'
import Msg404 from '../views/Msg404.vue'

//import store from '../store/index.js'


const routes = [
  {
    path: '/admin/login',
    name: 'Login',
    component: AdminLogin
  },
  {
    path: '/admin/add',
    name: 'Add',
    component: AddVess
  },
  {
    path: '/admin/all',
    name: 'All',
    component: AllVess
  },
  {
    path: '/admin/passenger',
    name: 'Passenger',
    component: PassVess
  },
  {
    path: '/admin/subscribers',
    name: 'Subscribers',
    component: Subscribers
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs
  },
  {
    path: '/logs/history/:id',
    name: 'Detail',
    props: true,
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
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage
  },
  {
    path: '/msg404',
    name: 'Msg404',
    component: Msg404
  },
  {
    path: "/:catchAll(.*)",
    name: 'Msg404',
    componant: Msg404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  //redirects to login page if not logged in for specified pages
  const adminPages = ['/admin', '/admin/all', '/admin/add', '/admin/passenger', '/admin/subscribers', '/admin/logout'];
  const authRequired = adminPages.includes(to.path);
  //const loggedIn = this.$store.state.a.currentUser.isLoggedIn;

  if(authRequired ) {
    return next('/admin/login');
  }
})

export default router
