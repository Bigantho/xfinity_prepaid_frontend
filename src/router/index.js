import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import login from '@/views/login.vue'
import dashboard from '@/views/dashboard.vue'
import customerTotal from '@/views/customer/customerTotal.vue'
import orders from '@/views/orders.vue'
import routers from '@/views/routers.vue'
import customer from '@/views/customer/customer.vue'
import customerAdd from '@/views/customer/customerAdd.vue'
// import { authGuard } from './guards'

const routes = [
  { path: '/ts', component: login, name: 'login' },
  { path: '/dashboard', component: dashboard, name: 'dashboard' },
  {
    path: '/customer', component: customer, children: [
      {
        path: 'total',
        component: customerTotal,
        name: 'customerTotal'
      },
      {
        path: 'new',
        component: customerAdd,
        name: 'customerAdd'
      }
    ]
  },
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