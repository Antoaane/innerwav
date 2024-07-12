import './assets/styles/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { clickOutsideDirective } from './directives/clickOutside';

const app = createApp(App)

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token')

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'register' })
    } else {
        next()
    }
});

app.use(router)

app.directive('click-outside', clickOutsideDirective);

app.mount('#app')
