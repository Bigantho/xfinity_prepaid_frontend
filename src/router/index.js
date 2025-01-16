import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import login from '@/views/login.vue'
import dashboard from '@/views/dashboard.vue'

import order from '@/views/order/order.vue'
import orderTotal from '@/views/order/orderTotal.vue'
import orderPlace from '@/views/order/orderPlace.vue'
import orderPrintLabel from '@/views/order/orderPrintLabel.vue'

import customer from '@/views/customer/customer.vue'
import customerTotal from '@/views/customer/customerTotal.vue'
import customerAdd from '@/views/customer/customerAdd.vue'
import customerAddCreditCard from '@/views/customer/customerAddCreditCard.vue'
import customerAddVirtualPhone from '@/views/customer/customerAddVirtualPhone.vue'
import customerPaymentHistory from '@/views/customer/customerPaymentHistory.vue'
import customerEdit from '@/views/customer/customerEdit.vue'

import router from '@/views/router/router.vue'
import routerTotal from '@/views/router/routerTotal.vue'
import routerAdd from '@/views/router/routerAdd.vue'

import payment from '@/views/payment/payment.vue'
import paymentTotal from '@/views/payment/paymentTotal.vue'
import paymentAdd from '@/views/payment/paymentAdd.vue'
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
        path: 'edit',
        component: customerEdit,
        name: 'customerEdit'
      },
      {
        path: 'add/credit_card',
        component: customerAddCreditCard,
        name: 'customerAddCreditCard'
      },
      {
        path: 'add/virtual_phone',
        component: customerAddVirtualPhone,
        name: 'customerAddVirtualPhone'
      },
      {
        path: 'payments',
        component: customerPaymentHistory,
        name: 'customerPaymentHistory'
      }
    ]
  },
  {
    path: '/order', component: order, children: [
      {
        path: 'total',
        component: orderTotal,
        name: 'orderTotal'
      }, 
      {
        path: 'place',
        component: orderPlace, 
        name:'orderPlace'
      }, 
      {
        // path: 'print',
        path: 'print/:id_router',
        component: orderPrintLabel,
        name: 'orderPrintLabel',
        meta: { hideHeader: true } 
      }
    ]
  },
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
  },
  {
    path: '/payment', component: payment, children: [
      {
        path: 'total',
        component: paymentTotal,
        name: 'paymentTotal'
      }, 
      {
        path: 'add',
        component: paymentAdd, 
        name:'paymentAdd'
      }, 
      // {
      //   path: 'print/:id_router',
      //   component: orderPrintLabel,
      //   name: 'orderPrintLabel',
      //   meta: { hideHeader: true } 
      // }
    ]
  },
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