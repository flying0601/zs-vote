
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
    let sysid = Util.GetQueryString('s')
    this.$api.getActiveHost({ sysid: sysid }).then(res => {
      // if (!res) return
      let data = res.data || []
      if (res.data && res.data.length > 0) {
        let sysHost = data[0].host
        let urlParam = window.location.search
        console.log('urlParam: ', urlParam)
        urlParam = urlParam.split('#')[0]
        let protocol = window.location.protocol
        let pathname = window.location.pathname
        console.log(pathname)
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
