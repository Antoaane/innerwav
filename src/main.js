import './assets/styles/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { clickOutsideDirective } from './directives/clickOutside';

const app = createApp(App)

app.use(router)

app.directive('click-outside', clickOutsideDirective);

app.mount('#app')
