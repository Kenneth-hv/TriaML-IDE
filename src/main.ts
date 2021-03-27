import { createApp } from 'vue'
import App from './App.vue'
import TriaMLApp from './controllers/TriaMLApp'
import { remote } from 'electron'

const win = remote.getCurrentWindow();
win.on('unmaximize', () => { document.body.classList.remove('maximized'); });
win.on('maximize', () => { document.body.classList.add('maximized'); });

createApp(App).mount('#app')
