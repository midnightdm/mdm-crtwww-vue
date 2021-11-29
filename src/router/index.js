import { createRouter, createWebHistory } from 'vue-router'
import { getUserState } from '@/store/firebaseApp.js'

import About from '../views/About.vue'
import Hero from '../views/Hero.vue'

import Logs from '../views/logs/Logs.vue'
import Detail from '../views/logs/Detail.vue'
import LastMonth from '../views/logs/LastMonth.vue'
import Past7 from '../views/logs/Past7.vue'
import Past24 from '../views/logs/Past24.vue'
import ThisMonth from '../views/logs/ThisMonth.vue'
import Today from '../views/logs/Today.vue'
import Yesterday from '../views/logs/Yesterday.vue'


import AddVess from '../views/admin/AddVess.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminVessels from '../views/admin/AdminVessels.vue'
import AdminDetail from '../views/admin/AdminDetail.vue'
import Subscriptions from '../views/admin/Subscriptions.vue'

import AlertsAll from '../views/alerts/AlertsAll.vue'
import AlertsDemo from '../views/alerts/AlertsDemo.vue'
import AlertsPass from '../views/alerts/AlertsPass.vue'
import AlertsWatch from '../views/alerts/AlertsWatch'
import Manage from '../views/alerts/Manage.vue'
import Waypoint from '../views/alerts/Waypoint.vue'

import Comments from '../views/gallery/Comments.vue'
import Image from '../views/gallery/Image.vue'
import Video from '../views/gallery/Video.vue'

import Msg404 from '../views/Msg404.vue'



const routes = [
  {
    path: '/',
    name: 'Hero',
    component: Hero,
    
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: AdminLogin,
    
  },
  {
    path: '/admin',
    redirect: '/admin/vessels'
  },
  {
    path: '/admin/add',
    name: 'Add',
    component: AddVess,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/vessels',
    name: 'AdminVessels',
    component: AdminVessels,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/admin/vessels/:vesselID',
        name: 'AdminDetail',
        props: true,
        component: AdminDetail,
        meta: { requiresAuth: true }
      }
    ]
  },
  
  {
    path: '/admin/subscriptions',
    name: 'Subscriptions',
    component: Subscriptions,
    meta: { requiresAuth: true }
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
 
  },
  {
    path: '/logs/history/:id',
    name: 'Detail',
    props: true,
    component: Detail,
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/logs/lastmonth',
    name: 'LastMonth',
    component: LastMonth,
    
  },
  {
    path: '/logs/past7',
    name: 'Past7',
    component: Past7,
    
  },
  {
    path: '/logs/past24',
    name: 'Past24',
    component: Past24,
    
  },
  {
    path: '/logs/thismonth',
    name: 'ThisMonth',
    component: ThisMonth,
    
  },
  {
    path: '/logs/today',
    name: 'Today',
    component: Today,
    
  },
  {
    path: '/logs/yesterday',
    name: 'Yesterday',
    component: Yesterday,
    
  },
  {
    path: '/alerts/all',
    name: 'AlertsAll',
    component: AlertsAll
  },
  {
    path: '/alerts',
    redirect: '/alerts/all'
  },
  {
    path: '/alerts/demo',
    name: 'AlertsDemo',
    component: AlertsDemo
  },
  {
    path: '/alerts/passenger',
    name: 'AlertsPass',
    component: AlertsPass
  },
  {
    path: '/alerts/watchlist',
    name: 'AlertsWatch',
    component: AlertsWatch
  },
  {
    path: '/alerts/manage',
    name: 'Manage',
    component: Manage,
  },
  {
    path: '/alerts/waypoint/:apubID',
    props: true,
    name: 'Waypoint',
    component: Waypoint
  },
  {
    path: '/gallery/comments',
    name: 'Comments',
    component: Comments,
  },
  {
    path: '/gallery/image',
    name: 'Image',
    component: Image,
  },
  {
    path: '/gallery/video',
    name: 'Video',
    component: Video,
  },
  {
    path: '/gallery',
    redirect: '/gallery/video'
  },
  {
    path: '/msg404',
    name: 'Msg404',
    component: Msg404,
    
  },
  
  {
    path: '/:catchAll(.*)*',
    redirect: '/msg404',
  }
  
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach( async (to, from, next) => {
  //redirects to login page if not logged in for admin pages specified in router meta data
  const isAuth = await getUserState()
  const requiresAuth   = to.matched.some(record => record.meta.requiresAuth)
  //const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)

  if(requiresAuth && !isAuth) {
    next('/admin/login')
  } else {
    next()
  }

})


export default router
