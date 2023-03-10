import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
