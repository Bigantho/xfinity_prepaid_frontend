import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import login from '@/views/login.vue'
import dashboard from '@/views/dashboard.vue'
import orders from '@/views/orders.vue'

import customer from '@/views/customer/customer.vue'
import customerTotal from '@/views/customer/customerTotal.vue'
import customerAdd from '@/views/customer/customerAdd.vue'
import customerAddCreditCard from '@/views/customer/customerAddCreditCard.vue'

import router from '@/views/router/router.vue'
import routerTotal from '@/views/router/routerTotal.vue'
import routerAdd from '@/views/router/routerAdd.vue'
// import { authGuard } from './guards'

const routes = [
  { path: '/', component: login, name: 'login', meta: { hideHeader: true } },
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
      },
      {
        path: 'add/credit_card',
        component: customerAddCreditCard,
        name: 'customerAddCreditCard'
      }
    ]
  },
  { path: '/order', component: orders, name: 'order' },
  {
    path: '/router', component: router, children: [
      {
        path: 'total',
        component: routerTotal,
        name: 'routerTotal'
      },
      {
        path: 'new',
        component: routerAdd,
        name: 'routerAdd'
      }
    ]
  }

]


const routerRouting = createRouter({
  // history: createMemoryHistory(),
  history: createWebHistory(),
  routes,
})

// router.beforeEach(async (to, from, next) => {
//   await authGuard(router.appInstance, to, from, next)
// })

export default routerRouting