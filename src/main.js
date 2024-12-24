import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import App from './App.vue'
import axiosInstance from './plugins/axios';

const vuetify = createVuetify({
    components,
    directives,
  })
  

import router from './router'

const pinia = createPinia()
const app = createApp(App)

import globalProperties from './utils/globalProperties'

router.appInstance = app;

app.config.globalProperties.$globalMethods = globalProperties
app.provide('$axios', axiosInstance);


app.use(pinia).use(router).use(vuetify).mount('#app')


export default app;