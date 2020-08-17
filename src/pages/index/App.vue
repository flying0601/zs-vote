
<template>
  <div id="Loading">
   <div class="loader-inner ball-beat">
    <div></div>
    <div></div>
    <div></div>
   </div>
  </div>
    <!-- index.html
    <a href="./list.html"> list.html</a>
    <v-hb></v-hb> -->
</template>

<script>
import Util from '@/utils/util.js'
export default {
  components: {},
  data () {
    return {
      //
    }
  },
  beforeCreate () {
    let sysid // 系统id
    let urlParam // 请求参数
    // 分享链接特殊处理
    let shareKey = Util.GetQueryString('key')
    if (shareKey) {
      // var encodeData = window.btoa('name=xiaoming&age=10')// 编码
      // encodeData = encodeURIComponent(encodeData)
      // console.log('encodeData: ', encodeData)
      let linkKey = decodeURIComponent(shareKey)
      linkKey = window.atob(linkKey)
      let initShareUrl = window.location.href.split('#')[0]
      let baseUrl = initShareUrl.split('?')[0]
      console.log('decodeData: ', baseUrl + '?' + linkKey)
      let initUrl = baseUrl + '?' + linkKey
      sysid = Util.GetQueryString('s', initUrl)
      urlParam = '?' + linkKey
    } else {
      sysid = Util.GetQueryString('s')
      urlParam = window.location.search
      console.log('urlParam: ', urlParam)
      urlParam = urlParam.split('#')[0]
    }
    this.$api.getActiveHost({ sysid: sysid }).then(res => {
      // if (!res) return
      let data = res.data || []
      if (data && data.length > 0) {
        let min = 0; let max = data.length - 1
        let index = Math.round((Math.random() * (max - min) + min) * 10) / 10
        index = Math.round(index)
        console.log('index: ', index)
        let sysHost = data[index].host
        let protocol = window.location.protocol
        let pathname = window.location.pathname
        // console.log(pathname)
        pathname = pathname.includes('index.html') ? pathname.replace('index.html', '') : pathname
        let newUrl = protocol + '//' + sysHost + pathname + 'main.html' + urlParam
        console.log('newUrl: ', newUrl)
        window.location.href = newUrl
      } else {
        alert('active host is null')
      }
    })
  },
  created () {
    console.log(this.$api)
  },
  mounted () {
    // this.$api.getConfig().then(res => {
    //   console.log(res.data)
    // })
  },
  methods: {
  }
}
</script>
<style lang="scss">

</style>
