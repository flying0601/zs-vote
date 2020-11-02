
<template>

<component  v-if="currentComponent" :is="currentComponent"></component>

</template>

<script>
import wx from 'weixin-js-sdk'
import Util from '@/utils/util.js'
import Cookies from 'js-cookie'
export default {
  components: {
    VComplaint (resolve) {
      require(['@/components/v1/v-complaint.vue'], resolve)
    }
  },
  data () {
    return {
      currentComponent: 'VComplaint',
      params: null
    }
  },

  beforeCreate () {
    let sysid = Util.GetQueryString('s') || Cookies.get('sysid')
    sysid && this.$api.getTesting({ sysid: sysid }).then(res => {
      // if (!res) return
      // console.log(res)
      if (res && res.data && res.data.testId) {
        location.href = 'http://h5.actfou.com/110.html'
      }
    })
  },
  created () {
  },
  mounted () {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.backChange, false) // false阻止默认事件
    }
  },
  methods: {
    backChange () {
      // const that = this
      console.log('监听到了')
      wx.closeWindow()
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.backChange, false) // false阻止默认事件
  }
}
</script>
<style lang="scss">
</style>
