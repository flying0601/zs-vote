import Vue from 'vue'
import App from './App.vue'
import api from '../../fetch/api'
// import '../../config/rem'
Vue.prototype.$api = api
console.log(api)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
