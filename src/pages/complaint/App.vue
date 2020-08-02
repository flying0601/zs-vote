
<template>

<component  v-if="currentComponent" :is="currentComponent"></component>

</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  components: {
    VComplaint (resolve) {
      require(['@/components/v-complaint.vue'], resolve)
    },
    VOver (resolve) {
      require(['@/components/v-over.vue'], resolve)
    }
  },
  data () {
    return {
      currentComponent: 'VComplaint',
      params: null
    }
  },

  beforeCreate () {

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
