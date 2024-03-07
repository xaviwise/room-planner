import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdiAccount } from '@mdi/js'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

// create pinia instance
const pinia = createPinia();

app.use(router)
app.use(pinia)
app.use(vuetify)

app.mount('#app')
