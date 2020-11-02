import Vue from 'vue'
import App from './App.vue'
import api from '../../fetch/api'
import dataFormat from '@/utils/format-time.js'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3, // 预加载高度比例
  error: 'resource/common/nodata.png',
  loading: 'resource/common/loading.gif',
  attempt: 1 // 尝试计数
})
// import '../../config/rem'
Vue.prototype.$api = api
// console.log(api)
Vue.filter('format', dataFormat)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
