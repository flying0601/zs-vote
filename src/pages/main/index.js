import Vue from 'vue'
import App from './App.vue'
import api from '../../fetch/api'
import dataFormat from '@/assets/js/format-time.js'
// import '../../config/rem'
Vue.prototype.$api = api
// console.log(api)
Vue.filter('format', dataFormat)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
