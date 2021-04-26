import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'

// add key
createApp(App).use(store, key).mount('#app')
