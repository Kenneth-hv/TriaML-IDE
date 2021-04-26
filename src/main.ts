import { createApp } from 'vue'
import i18n from './i18n'
import App from './App.vue'
import { store, key } from './store'

console.log(process.env.VUE_APP_I18N_LOCALE);

createApp(App).use(i18n).use(store, key).mount('#app')
