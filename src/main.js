import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

const isProd = process.env.NODE_ENV === 'production'

Vue.use(VueAnalytics, {
  id: 'UA-71796222-8',
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
})

Vue.use(VueMaterial)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
