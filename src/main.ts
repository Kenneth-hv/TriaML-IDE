import { createApp } from 'vue'
import i18n from './i18n'
import App from './App.vue'
import { store, key } from './store'

createApp(App).use(i18n).use(store, key).mount('#app')
