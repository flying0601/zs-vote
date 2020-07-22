import Vue from 'vue'

export default {
  formatData () {

  },
  setCookie: function (name, value, days = 30) {
    var d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
    Vue.prototype[name] = value
  },
  getCookie: function (name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : null
  },
  clearCookie: function (name) {
    this.setCookie(name, '', -1)
  },
  createMap: function () {
    const promise = new Promise(function (resolve, reject) {
      if (typeof AMap !== 'undefined') {
        console.log('amap is append')
        resolve()
        return false
      }
      let script = document.createElement('script')
      script.src = 'http://webapi.amap.com/maps?v=1.4.5&key=2930d58e5b798679de367dc6996c5e07'
      document.body.appendChild(script)

      if (script.nodeName === 'SCRIPT') {
        script.onload = () => {
          console.log('地图加载完全')
          resolve()
        }
      } else {
        reject(new Error('Could not script image at ' + script.src))
      }
    })
    return promise
  },
  escape2Html: function (str) {
    const arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' }
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
  }
}
