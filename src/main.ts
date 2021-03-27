import { createApp } from 'vue'
import App from './App.vue'
import { remote } from 'electron'
import { store, key } from './store'

const win = remote.getCurrentWindow();
win.on('unmaximize', () => { document.body.classList.remove('maximized'); });
win.on('maximize', () => { document.body.classList.add('maximized'); });

// add key
createApp(App).use(store, key).mount('#app')
