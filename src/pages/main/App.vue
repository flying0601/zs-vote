
<template>
  <div class="app-body">
    <remote-css v-for="(item,i) in csslinks"
                :key="i"
                :cdn="item"></remote-css>
    <v-init v-if="isInit"></v-init>
    <component :is="curModules"
               :giftvote="giftvote"></component>
  </div>
</template>

<script>
import Util from '@/utils/util.js'
import Cookies from 'js-cookie'
import VInit from '@/components/v1/v-init.vue'
export default {
  components: {
    'remote-css': {
      render (h) {
        return (<link rel='stylesheet' type='text/css' href={this.cdn} />)
      },
      props: {
        cdn: {
          type: String,
          required: true
        }
      }
    },
    VInit,
    modulesOne (resolve) {
      require(['./modules/moduleOne.vue'], resolve)
    },
    modulesTwo (resolve) {
      require(['./modules/moduleTwo.vue'], resolve)
    }
  },

  data () {
    return {
      csslinks: [],
      giftvote: null,
      isInit: true,
      curModules: null,
      config: null,
      params: {
        vid: null,
        sid: null
      }
    }
  },
  beforeCreate () {
    // 测试环境用的
    let host = location.host
    console.log({ host })
    if (host.includes('localhost:1315')) {
      Cookies.set('openid', 'ox4NqxBJzph_VWuwsw7yySwQzC1o', { expires: 1 })
    } else {
      let sysid = Util.GetQueryString('s') || Cookies.get('sysid')
      // 检测ip是否举报
      sysid && this.$api.getTesting({ sysid: sysid }).then(res => {
        // if (!res) return
        console.log(res)
        // 检测公众是否一致
        let appid = res && res.data && res.data.appid
        !Cookies.get('appid') && Cookies.set('appid', appid)
        console.log('检测公众是否一致', !appid.includes(Cookies.get('appid')))
        if (appid && Cookies.get('appid') && !appid.includes(Cookies.get('appid'))) {
          Cookies.remove('openid')
          Cookies.set('appid', appid, { expires: 1 })
          location.reload()
        }
        if (res && res.data && res.data.testId) {
          location.href = 'http://h5.iactive.top/110.html'
        }
      })
    }
    let openId = Cookies.get('openid')
    console.log('openId: ', openId)
    if (!openId) {
      let code = Util.GetQueryString('code')
      let sysid = Util.GetQueryString('s')
      if (!code) {
        let initUrl = location.href.split('#')[0]
        Cookies.set('initUrl', initUrl)
        let pram = {
          callback: initUrl,
          scope: 'snsapi_base',
          sysid: sysid
        }
        Cookies.set('sysid', sysid)
        this.$api.getUrl(pram).then(res => {
          // / if (!res) return
          console.log(res.data)
          location.href = res.data
        })
      } else {
        let initUrl = Cookies.get('initUrl')
        let sysid = Util.GetQueryString('s', initUrl) || Cookies.get('sysid')
        this.$api.getOpenId({ code: code, sysid: sysid }).then(res => {
          // if (!res) return
          console.log('getOpenId', res.data)
          if (res.data) {
            Cookies.set('openid', res.data.openid, { expires: 7 })
          }
        })
        history.pushState({ page: 'initUrl' }, '', initUrl)
        Cookies.remove('initUrl')
        this.params = {
          vid: Util.GetQueryString('v', initUrl),
          sid: Util.GetQueryString('s', initUrl)
        }
        Cookies.set('sysid', this.params.sid)
        console.log('Cookies', Cookies.get('openid'))
      }
    }
  },
  watch: {},
  created () {
    let initUrl = Cookies.get('initUrl')
    if (!initUrl) {
      this.params = {
        vid: Util.GetQueryString('v'),
        sid: Util.GetQueryString('s')
      }
      Cookies.set('sysid', this.params.sid)
    }
    console.log('params', this.params)
    this.params && this.params.sid && this.voteInfo()
    console.log('this.params: ', this.params)
  },
  mounted () {

    // this.getShareCensus()
  },
  methods: {

    voteInfo () {
      let pram = {
        id: this.params.vid
      }
      this.$api.getVoteInfo(pram).then(res => {
        // if (!res) return
        this.giftvote = res.data
        let { config } = this.giftvote
        document.title = this.giftvote && this.giftvote.title
        let key = config && config.zdy_color
        console.log('key: ', key)
        switch (key) {
          case 6:
            this.curModules = 'modulesTwo'
            this.csslinks = [
              'app/WeChat/GiftVote/css/swiper-3.3.1.min.css',
              'static/css/font-awesome-4.7.0/css/font-awesome.min.css',
              'static/js/layer/theme/default/layer.css?v=3.1.1',
              'static/css/mobile.css',
              'static/css/index.css'
            ]
            break
          case 1:
            this.csslinks = [
              'app/WeChat/GiftVote/css/swiper-3.3.1.min.css',
              'app/WeChat/GiftVote/css/weui1.0.1.min.css',
              'app/WeChat/GiftVote/css/bootstrap.min.css',
              'app/WeChat/GiftVote/css/index.css?34',
              'app/WeChat/GiftVote/css/main.css?34'
            ]
            this.curModules = 'modulesOne'
            break
          case 2:
            this.csslinks = [
              'app/WeChat/GiftVote/css/swiper-3.3.1.min.css',
              'app/WeChat/GiftVote/css/weui1.0.1.min.css',
              'app/WeChat/GiftVote/css/bootstrap.min.css',
              'app/WeChat/GiftVote/css/index.css?34',
              'app/WeChat/GiftVote/css/main.css?34'
            ]
            this.curModules = 'modulesOne'
            break
          case 3:
            this.csslinks = [
              'app/WeChat/GiftVote/css/swiper-3.3.1.min.css',
              'app/WeChat/GiftVote/css/weui1.0.1.min.css',
              'app/WeChat/GiftVote/css/bootstrap.min.css',
              'app/WeChat/GiftVote/css/index.css?34',
              'app/WeChat/GiftVote/css/main.css?34'
            ]
            this.curModules = 'modulesOne'
            break
          case 4:
            this.csslinks = [
              'app/WeChat/GiftVote/css/swiper-3.3.1.min.css',
              'app/WeChat/GiftVote/css/weui1.0.1.min.css',
              'app/WeChat/GiftVote/css/bootstrap.min.css',
              'app/WeChat/GiftVote/css/index.css?34',
              'app/WeChat/GiftVote/css/main.css?34'
            ]
            this.curModules = 'modulesOne'
            break
          case 5:
            this.csslinks = [
              'app/WeChat/GiftVote/css/swiper-3.3.1.min.css',
              'app/WeChat/GiftVote/css/weui1.0.1.min.css',
              'app/WeChat/GiftVote/css/bootstrap.min.css',
              'app/WeChat/GiftVote/css/index.css?34',
              'app/WeChat/GiftVote/css/main.css?34'
            ]
            this.curModules = 'modulesOne'
            break
          default:
            this.curModules = 'VInit'
            break
        }
        // console.log('data', pram.id, res.data)
      })
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.backChange, false) // false阻止默认事件
  }
}
</script>
<style lang="scss">
html,
body,
.app-body {
  width: 100%;
  height: 100%;
}
// loading大小
img[lazy="loading"] {
  width: 22px !important;
  height: auto !important;
  margin: 0 auto;
  display: block;
}
</style>
