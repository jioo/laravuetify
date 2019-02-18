import Vue from 'vue'
import store from '~/store'
import router from '~/router'
import App from './App.vue'
import VueWait from 'vue-wait'

Vue.use(VueWait)

import '~/plugins'

import '~/components'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  wait: new VueWait(),
  ...App
})
