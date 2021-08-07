import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/events/add',
    name: 'AddEvent',
    component: () => import(/* webpackChunkName: "about" */ '../components/AddEvent.vue')
  },
  {
    path: '/event/confirm',
    name: 'ConfirmEvent',
    component: () => import(/* webpackChunkName: "about" */ '../components/ConfirmEvent.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

// router.beforeEach((to, from, next) => {
//   const access_token = localStorage.getItem('access_token')
//   if(!access_token) next('/login')
//   // const roles = localStorage.getItem('roles')
//   // if(access_token && to.name === 'Login') next('/')
//   // else if(!access_token && to.name !== 'Login') next('/login')
//   // else if(!access_token && to.name === 'HR' && roles !== 'HR') next('/login')
//   else next()
// })

export default router
