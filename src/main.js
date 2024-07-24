import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDiscord, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faSun, faMoon, faCloudSun, faCloudMoon } from '@fortawesome/free-solid-svg-icons'

library.add(faDiscord, faInstagram, faSpotify, faSun, faMoon, faCloudSun, faCloudMoon)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')