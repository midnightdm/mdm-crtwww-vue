import { createRouter, createWebHistory } from 'vue-router'
import Logs from '../views/Logs.vue'
import Detail from '../views/Detail.vue'
import LastMonth from '../views/LastMonth.vue'
import Past7 from '../views/Past7.vue'
import Past24 from '../views/Past24.vue'
import ThisMonth from '../views/ThisMonth.vue'
import Today from '../views/Today.vue'
import Yesterday from '../views/Yesterday.vue'
import Manage from '../views/Manage.vue'



const routes = [
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//Added 10/16/21 as fix for sub page problem
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.html" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})


// [replaced with below]  export default router
export { router, http, fs, httpPort }