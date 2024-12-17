import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
  })
  

import router from './router'

const app = createApp(App)

import globalProperties from './utils/globalProperties'

router.appInstance = app;

app.config.globalProperties.$globalMethods = globalProperties


app.use(router).use(vuetify).mount('#app')


export default app;