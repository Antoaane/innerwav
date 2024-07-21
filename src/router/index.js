import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Contact from '../views/Contact.vue'
import Register from '../views/Register.vue'
import ComingSoon from '../views/ComingSoon.vue'
import Login from '../views/Login.vue'
import Masteriser from '../views/Masteriser.vue'
import Checkout from '../views/Checkout.vue'
import Account from '../views/Account.vue'
import AccountInfos from '../views/AccountSections/PersonalInfos.vue'
import Orders from '../views/AccountSections/Orders.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/register',
      name: 'register',
      component: ComingSoon
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/masteriser',
      name: 'masteriser',
      component: Masteriser,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/checkout/:id',
      name: 'checkout',
      component: Checkout,
      props: true
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '',
          name: 'account',
          component: AccountInfos,
        },
        {
          path: 'infos',
          name: 'account-infos',
          component: AccountInfos,
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
        }
      ],
    }
  ]
})

export default router
