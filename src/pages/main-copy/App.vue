
<template>
  <div class="container container-fill">
    <v-color v-if="giftvote && !isOver && giftvote.config"
             :setting="giftvote.config"></v-color>
    <component  v-if="giftvote && !isOver && giftvote.config && giftvote.gonggao" :config="giftvote.config" :gonggao="giftvote.gonggao" :is="'VAdvert'" ></component>
    <v-sider v-if="giftvote && !isOver && giftvote.topimg && isSider"
             :siderData="giftvote.topimg"
             :topimgUrl="giftvote.config && giftvote.config.topimgUrl"
             :curComp="currentComponent"></v-sider>
    <!-- <v-index v-if="giftvote && giftvote.eventrule && false"
             :giftvote="giftvote"></v-index>
    <v-award v-if="giftvote && giftvote.prizemsg"
             :giftvote="giftvote"></v-award> -->
    <component  v-if="giftvote && !isOver && currentComponent" :is="currentComponent" :giftvote="giftvote" :player="votePlayer" :curPlayer="curPlayer" :params="params" :voteuser="itemData" :playerCensus="playerCensus" :meBtn="meBtn">
</component>
    <v-footer ref="footerDom" v-if="giftvote && !isOver && isFooter" :curComp="currentComponent" :giftvote="giftvote" :meData="meData" :voteuser="itemData"></v-footer>
     <component  v-if="giftvote && !isOver && giftvote.config && giftvote.config.mp3" :config="giftvote.config" :is="'VMap3'" ></component>
     <component  v-if="giftvote && !isOver && giftvote.config && giftvote.config.pftx" :config="giftvote.config" :is="'VPftx'" ></component>
  <component  v-if="isOver" :player="votePlayer" :params="params" :is="'VOver'" ></component>
  <v-init v-if="!giftvote && !isOver"></v-init>
  </div>

</template>

<script>
import VInit from '@/components/v1/v-init.vue'
import VFooter from '@/components/v1/v-footer.vue'
import VColor from '@/components/v1/v-color.vue'
import VSider from '@/components/v1/v-sider.vue'
import wx from 'weixin-js-sdk'
import Cookies from 'js-cookie'
import Util from '@/utils/util.js'
import Vue from 'vue'
import Dialog from 'vant/lib/dialog'
import 'vant/lib/dialog/style'
Vue.use(Dialog)
export default {
  components: {
    VInit,
    VFooter,
    VColor,
    VSider,
    VAward (resolve) {
      // let date = new Date()
      // console.log(date.valueOf())
      require(['@/components/v1/v-award.vue'], resolve)
      // let dates = new Date()
      // console.log(dates.valueOf())
    },
    VIndex (resolve) {
      require(['@/components/v1/v-index.vue'], resolve)
    },
    Vrank (resolve) {
      require(['@/components/v1/v-rank.vue'], resolve)
    },
    VDetails (resolve) {
      require(['@/components/v1/v-details.vue'], resolve)
    },
    VGive (resolve) {
      require(['@/components/v1/v-give.vue'], resolve)
    },
    VSuccess (resolve) {
      require(['@/components/v1/v-success.vue'], resolve)
    },
    VSignup (resolve) {
      require(['@/components/v1/v-signup.vue'], resolve)
    },
    VMap3 (resolve) {
      require(['@/components/v1/v-mp3.vue'], resolve)
    },
    VPftx (resolve) {
      require(['@/components/v1/v-pftx.vue'], resolve)
    },
    VAdvert (resolve) {
      require(['@/components/v1/v-advert.vue'], resolve)
    },
    VOver (resolve) {
      require(['@/components/v1/v-over.vue'], resolve)
    }
  },

  data () {
    return {
      isOver: false, // 活动是否结束
      giftvote: null,
      votePlayer: [],
      currentComponent: 'VIndex',
      isSider: true,
      isFooter: true,
      itemData: null, // 选手详情
      playerCensus: null, // 选手详情统计
      giveData: null,
      curPlayer: null,
      params: {
        mname: null,
        vid: null,
        sid: null,
        uid: null,
        did: null
      },
      sdkConfig: null,
      shareContent: null,
      meBtn: '我的报名',
      meData: null
    }
  },
  beforeCreate () {
    // 分享链接特殊处理
    let shareKey = Util.GetQueryString('key')
    if (shareKey) {
      // var encodeData = window.btoa('name=xiaoming&age=10')// 编码
      // encodeData = encodeURIComponent(encodeData)
      // console.log('encodeData: ', encodeData)
      let linkKey = decodeURIComponent(shareKey)
      // linkKey = window.atob(linkKey)
      let initShareUrl = location.href.split('#')[0]
      let baseUrl = initShareUrl.split('?')[0]
      console.log('decodeData: ', baseUrl + '?' + linkKey)
      location.href = baseUrl + '?' + linkKey
    }
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
          location.href = 'http://h5.actfou.com/110.html'
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
          mname: Util.GetQueryString('m', initUrl),
          vid: Util.GetQueryString('v', initUrl),
          sid: Util.GetQueryString('s', initUrl),
          uid: Util.GetQueryString('u', initUrl),
          did: Util.GetQueryString('d', initUrl)
        }
        Cookies.set('sysid', this.params.sid)
        console.log('Cookies', Cookies.get('openid'))
      }
    }
  },
  watch: {},
  created () {
    console.log('Cookies', Cookies.get('openid'))
    // console.log('created', location.href)
    let initUrl = Cookies.get('initUrl')
    if (!initUrl) {
      this.params = {
        mname: Util.GetQueryString('m'),
        vid: Util.GetQueryString('v'),
        sid: Util.GetQueryString('s'),
        uid: Util.GetQueryString('u'),
        did: Util.GetQueryString('d')
      }
      Cookies.set('sysid', this.params.sid)
    }
    console.log('params', this.params)
    this.params && this.params.sid && this.voteInfo()

    !this.itemData && this.params.did && (this.params.mname === 'VDetails' || this.params.mname === 'VGive' || this.params.mname === 'VSuccess') && this.playerInfo('init')
    this.params && this.params.mname && this.handleSchedule(this.params.mname)
  },
  mounted () {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.backChange, false) // false阻止默认事件
    }

    // this.getShareCensus()
  },
  methods: {
    handleSchedule (name) {
      this.currentComponent = name
      switch (name) {
        case 'VGive':
          this.isSider = false
          this.isFooter = false
          break
        case 'VSuccess':
          this.isSider = false
          break
        case 'VSignup':
          this.isSider = false
          break
        case 'VDetails':
          this.isSider = false
          this.isFooter = true
          break
        default:
          this.isSider = true
          this.isFooter = true
          break
      }
      Util.updUrl('m', name)
      // 加载分享内容
      this.sdkConfig && this.getConfig(this.sdkConfig)
    },
    goDetails (item) {
      this.preComponet = this.currentComponent // 记录上一个模块
      this.itemData = item
      this.handleSchedule('VDetails')
      this.params.did = item.id
      this.playerInfo()
      Util.updUrl('d', item.id)
      this.sdkConfig && this.getConfig(this.sdkConfig)
    },
    goGive (item) {
      this.handleSchedule('VGive')
    },
    goSuccess (item) {
      this.handleSchedule('VSuccess')
    },
    voteInfo () {
      let pram = {
        id: this.params.vid
      }
      this.$api.getVoteInfo(pram).then(res => {
      // if (!res) return
        this.giftvote = res.data
        document.title = this.giftvote && this.giftvote.title
        // console.log('data', pram.id, res.data)
        this.getConfigData()
        // 活动是否结束
        let { voteendtime } = this.giftvote
        let curTime = Math.round(new Date() / 1000)
        let timeSapn = voteendtime - curTime
        console.log('timeSapn: ', timeSapn)
        if (timeSapn < 0) {
          this.isOver = true
          this.giftvote = null
        }
        let{ giftvote } = this
        // console.log('object', parseInt(giftvote.status) === 0)
        if (giftvote && parseInt(giftvote.status) === 0) {
          this.isOver = true
          this.giftvote = null
        }
        if (!this.meData || (this.meData && !this.meData.id)) {
          this.getMeInfo()
        }
      })
    },
    playerInfo (data) {
      this.type = data
      let pram = {
        id: this.params.did
      }
      this.$api.getVotePlayerInfo(pram).then(res => {
      // if (!res) return
        this.itemData = res.data
        this.type && this.handleSchedule('VDetails')
        this.postPlayerCensus()
        // console.log('itemData', pram.id, res.data)
      })
    },
    postPlayerCensus () {
      let pram = {
        noid: this.itemData.noid,
        sysid: this.params.sid,
        pid: this.params.vid
      }
      this.$api.getPlayerCensus(pram).then(res => {
        this.playerCensus = res && res.data && res.data[0]
        // console.log(this.playerCensus)
      })
    },
    getData (pid = 300, order = 'vote', page = 1, searchKey, size = 10) {
      let pram = {
        pid: pid,
        page: page,
        size: size,
        order: order
      }
      console.log('searchKey')
      if (searchKey) {
        if (this.isNaN(searchKey)) {
          pram.noid = searchKey
        } else {
          pram.name = searchKey
        }
      }
      this.$api.getVotePlayer(pram).then(res => {
        this.curPlayer = res.data
        // if (!res) return
        if (page === 1) {
          this.votePlayer = res.data.data
        } else {
          this.votePlayer.push(...res.data.data)
        }

        // console.log('votePlayer', res.data)
      })
    },
    isNaN (value) {
      let reg = /\d/
      return reg.test(value)
    },
    getConfigData () {
      // 测试start
      // let newShareUrl = 'http://zsapp.vtfour.wlnikiz.cn/vote/?v=300&u=1&s=2'
      // let pram = { url: newShareUrl, sysid: this.params.sid }
      // 测试end
      let pram = { url: location.href.split('#')[0], sysid: this.params.sid }
      this.$api.getConfig(pram).then(res => {
        // if (!res) return
        // console.log('getConfig', res.data)
        res && res.data && (this.sdkConfig = res.data) && this.getConfig(res.data)
      })
    },
    // 微信分享
    getConfig (data) {
      let _this = this
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // ', // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareTimeline', // 旧分享到朋友圈
          'onMenuShareAppMessage', // 旧分享给朋友
          'chooseWXPay'// 微信支付
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })

      let initShareUrl = location.href.split('#')[0]
      console.log('initShareUrl: ', initShareUrl)
      let key = initShareUrl.split('?')[1]
      // key = window.btoa(key)// 编码
      key = encodeURIComponent(key) // url编码
      console.log(key)
      // 测试start
      // let newShareUrl = 'http://test.active.iactive.top/vote/?v=300&u=1&s=2'
      // 测试end
      let protocol = location.protocol
      let shareHost
      let hosts = data.host
      if (hosts && hosts.length > 0) {
        let min = 0; let max = hosts.length - 1
        let index = Math.round((Math.random() * (max - min) + min) * 10) / 10
        index = Math.round(index)
        console.log('index: ', index)
        shareHost = hosts[index].host
      } else {
        shareHost = location.host
      }
      let pathname = location.pathname
      pathname = pathname.replace('main', 'index')
      let newShareUrl = protocol + '//' + shareHost + pathname + '?sharekey=' + key
      console.log('newShareUrl: ', newShareUrl)
      let { giftvote, itemData } = this
      let shareObj
      if (this.currentComponent === 'VDetails' && giftvote) {
        itemData.ID = itemData.noid
        let content = giftvote['item_sharedesc']
        let regex = /([^\\{\]]+)(?=\}})/g
        let params = content.match(regex)
        for (let i in params) {
          let value = itemData[params[i]]
          content = content.replace(`{{${params[i]}}}`, value)
        }
        shareObj = {
          imgUrl: itemData['img1'],
          Link: newShareUrl,
          title: giftvote['item_sharetitle'],
          content: content
        }
      } else {
        shareObj = {
          imgUrl: giftvote && giftvote['shareimg'],
          Link: newShareUrl,
          title: giftvote && giftvote['sharetitle'],
          content: giftvote && giftvote['sharedesc']
        }
      }
      console.log('ddd', shareObj)
      this.shareContent = shareObj
      let { shareContent } = this
      // console.log('分享方式:', _this.shareType)
      // 分享给朋友
      // wx.updateAppMessageShareData(this.winxin())
      wx.ready(() => {
        wx.onMenuShareAppMessage({
          title: shareContent.title,
          desc: shareContent.content,
          link: shareContent.Link,
          imgUrl: shareContent.imgUrl,
          success: function () {
            // 设置成功
            console.log('old朋友设置成功', shareContent)
            _this.getShareCensus()
          }
        })
        // 分享到朋友圈
        // wx.updateTimelineShareData(this.winxin())
        wx.onMenuShareTimeline({
          title: shareContent.title,
          desc: shareContent.content,
          link: shareContent.Link,
          imgUrl: shareContent.imgUrl,
          success: function () {
            // 设置成功
            console.log('old朋友圈设置成功', shareContent)
            _this.getShareCensus()
          }
        })
      })

      wx.error(function (result) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(result + '测试报错，上线后就可以修复')
      })
    },
    getShareCensus () {
      let pram = {
        id: this.params.vid
      }
      if (this.currentComponent === 'VDetails') {
        pram.did = this.params.did
      }
      this.$api.getShare(pram).then(res => {
        console.log('分享统计:', res.data)
      })
    },
    getMeInfo () {
      let pram = {
        pid: this.params.vid,
        openid: Cookies.get('openid'),
        v: Date.parse(new Date())
      }
      this.$api.getVotePlayerInfo(pram).then(res => {
      // if (!res) return
        if (res && res.data && res.data.id) {
          this.meData = res.data
          this.meBtn = '我的'
        }
        // console.log('this.meData: ', this.meData)
        // console.log('itemData', pram.id, res.data)
      })
    },
    backChange () {
      // const that = this
      console.log('监听到了')
      let { currentComponent, preComponet } = this
      switch (currentComponent) {
        case 'VIndex':
          Dialog.confirm({
            // title: '标题',
            message: '是否确定退出?'
          })
            .then(() => {
              // on confirm
              wx.closeWindow()
            })
            .catch(() => {
              // on cancel
            })
          break
        case 'VAward':
          this.handleSchedule('VIndex')
          break
        case 'VSignup':
          this.handleSchedule('VIndex')
          break
        case 'Vrank':
          this.handleSchedule('VIndex')
          break
        case 'VDetails':
          preComponet = preComponet || 'VIndex'
          this.handleSchedule(preComponet)
          break
        case 'VSuccess':
          this.goDetails(this.itemData)
          break
        case 'VGive':
          this.goDetails(this.itemData)
          break
        default:
          break
      }
    },
    parToSignup () {
      // this.$refs.footerDom.isToSignup()
      let openid = this.meData && this.meData.openid
      let meOpenid = Cookies.get('openid')
      if (meOpenid.includes(openid)) {
        this.$refs.footerDom.clickNav('VDetails')
      } else {
        this.$refs.footerDom.clickNav('VSignup')
      }
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
.container  {
  height: 100%;
}
</style>
