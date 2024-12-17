import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import login from '@/views/login.vue'
import dashboard from '@/views/dashboard.vue'
import customers from '@/views/customers.vue'
import orders from '@/views/orders.vue'
import routers from '@/views/routers.vue'

// import { authGuard } from './guards'

const routes = [
  { path: '/ts', component: login, name: 'login' },
  { path: '/dashboard', component: dashboard, name: 'dashboard' }, 
  { path: '/customer', component: customers, name: 'customer'},
  { path: '/order', component: orders, name: 'order' },
  { path: '/router', component: routers, name: 'router' }

]


const router = createRouter({
  // history: createMemoryHistory(),
  history: createWebHistory(),
  routes,
})

// router.beforeEach(async (to, from, next) => {
//   await authGuard(router.appInstance, to, from, next)
// })

export default router