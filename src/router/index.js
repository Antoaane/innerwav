import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import AccountInfos from '../views/AccountSections/PersonalInfos.vue'
import Orders from '../views/AccountSections/Orders.vue'
import Contact from '../views/Contact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '', // Chemin vide pour le composant "Account" par défaut
          name: 'account',
          component: AccountInfos, // Composant par défaut pour "/account"
        },
        {
          path: 'infos', // Chemin relatif à "/account"
          name: 'account-infos',
          component: AccountInfos,
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
        }
      ],
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})

export default router
