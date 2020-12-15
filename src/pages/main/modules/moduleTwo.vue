<template>
  <div class='module-two'>
    <div class="notice">
      <div style="background: rgba(0,0,0,0.6);width: 40px"><img src="static/img/laba.png"
             alt="">
      </div>
      <marquee behavior="scroll "
               direction="left"
               class="scroll"
               id="keyi">
        {{giftvote && giftvote.gonggao}}
      </marquee>
    </div>
    <div class="service"
         id="service"
         @click="serviceShow = !serviceShow"
         v-if="giftvote &&  giftvote.config && giftvote.config.xsad"></div>
    <div id="wechat"
         class="wechat"
         v-show="serviceShow">
      <img style="width: 80%"
           :src="giftvote &&  giftvote.config && giftvote.config.xsad"
           alt="">
      <span class="wechat-close"
            id="wechat-close"
            @click="serviceShow = !serviceShow">关闭</span>
      <div style="text-align: center;color: #ffffff">客服微信长按识别</div>
    </div>

    <div style="height: 35px;"></div>
    <component v-if="!isOver && giftvote &&  giftvote.config && giftvote.config.mp3"
               :config="giftvote.config"
               :is="'VMap3'"></component>
    <v-sider v-if="giftvote && giftvote.topimg && isSider"
             :siderData="giftvote.topimg"
             :topimgUrl="giftvote.config && giftvote.config.topimgUrl"
             :todayObj="todayObj"
             :isOver="isOver"></v-sider>
    <component v-if="giftvote &&  currentComponent && !isOver"
               :is="currentComponent"
               :giftvote="giftvote"
               :player="votePlayer"
               :curPlayer="curPlayer"
               :params="params"
               :voteuser="itemData"
               :playerCensus="playerCensus"
               :meBtn="meBtn">
    </component>
    <component v-if="isOver"
               :is="'VRank'"
               :giftvote="giftvote"
               :player="votePlayer"
               :params="params"
               :isOver="isOver">
    </component>
    <t-footer ref="footerDom"
              v-if="!isOver"
              :giftvote="giftvote"
              :meData="meData"></t-footer>
  </div>
</template>

<script>
/**
* @fileName moduleTwo.vue
 * @author ylf
 * @description
* @date 2020/10/12 21:59:11
*/
import Cookies from 'js-cookie'
import Util from '@/utils/util.js'
import VSider from '@/components/v1/v-sider.vue'
import TFooter from '@/components/v2/t-footer.vue'
import wx from 'weixin-js-sdk'
import Vue from 'vue'
import Dialog from 'vant/lib/dialog'
import 'vant/lib/dialog/style'
Vue.use(Dialog)
export default {
  props: ['giftvote'],
  components: {
    VSider,
    TFooter,
    VIndex (resolve) {
      require(['@/components/v2/t-index.vue'], resolve)
    },
    VAward (resolve) {
      require(['@/components/v2/t-award.vue'], resolve)
    },
    VRule (resolve) {
      require(['@/components/v2/t-rule.vue'], resolve)
    },
    VRank (resolve) {
      require(['@/components/v2/t-rank.vue'], resolve)
    },
    VSignup (resolve) {
      require(['@/components/v2/t-signup.vue'], resolve)
    },
    VDetails (resolve) {
      require(['@/components/v2/t-details.vue'], resolve)
    },
    VGive (resolve) {
      require(['@/components/v2/t-give.vue'], resolve)
    },
    VSuccess (resolve) {
      require(['@/components/v2/t-success.vue'], resolve)
    },
    VMap3 (resolve) {
      require(['@/components/v2/t-mp3.vue'], resolve)
    }
  },
  data () {
    return {
      serviceShow: false,
      isOver: false, // 活动是否结束
      votePlayer: [],
      currentComponent: 'VIndex',
      preComponet: [], // 记录上一个模块
      isSider: true,
      itemData: null, // 选手详情
      playerCensus: null, // 选手详情统计
      curPlayer: null,
      todayObj: null, // 今日之星
      params: {
        mname: null,
        vid: null,
        sid: null,
        uid: null,
        did: null
      },
      sdkConfig: null,
      shareContent: null,
      meBtn: '我要报名',
      meData: null
    }
  },
  computed: {},
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
    if (!this.itemData && this.params.did && (this.params.mname === 'VDetails' || this.params.mname === 'VGive' || this.params.mname === 'VSuccess')) {
      this.playerInfo('init')
    } else {
      this.params && this.params.mname && this.handleSchedule(this.params.mname)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$parent.isInit = false
    })
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.backChange, false) // false阻止默认事件
    }
  },
  methods: {
    handleSchedule (name, type) {
      // console.log('name: ', name)
      if (!this.currentComponent.includes(name)) {
        !type && this.preComponet.push(this.currentComponent) // 记录上一个模块
      }
      // console.log('this.preComponet: ', this.preComponet)
      this.currentComponent = name
      switch (name) {
        case 'VGive':
          this.isSider = false
          break
        case 'VSuccess':
          this.isSider = false
          break
        case 'VSignup':
          this.isSider = false
          break
        default:
          this.isSider = true
          break
      }
      Util.updUrl('m', name)
      // 加载分享内容
      this.sdkConfig && this.getConfig(this.sdkConfig)
    },
    goDetails (item, type) {
      this.itemData = item
      this.handleSchedule('VDetails', type)
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
      // 活动是否结束
      let { voteendtime } = this.giftvote
      let curTime = Math.round(new Date() / 1000)
      let timeSapn = voteendtime - curTime
      console.log('timeSapn: ', timeSapn)
      if (timeSapn < 0) {
        this.isOver = true
      }
      let { giftvote } = this
      // console.log('object', parseInt(giftvote.status) === 0)
      if (giftvote && parseInt(giftvote.status) === 0) {
        this.isOver = true
      }
      if (!this.meData || (this.meData && !this.meData.id)) {
        this.getMeInfo()
      }
      this.getConfigData()
      // })
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
    getData (pid = 300, order = 'vote', page = 1, searchKey, size = 1000) {
      let pram = {
        pid: pid,
        page: page,
        size: size,
        order: order
      }
      // console.log('searchKey', searchKey)
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
        console.log('getConfig', res.data)
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
      console.log('giftvote, itemData: ', giftvote, itemData)
      let shareObj
      if (this.currentComponent === 'VDetails' && giftvote && itemData) {
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
      // console.log('ddd', shareObj)
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
          this.meBtn = '我的报名'
        }
        // console.log('this.meData: ', this.meData)
        // console.log('itemData', pram.id, res.data)
      })
    },
    backChange () {
      // const that = this
      console.log('监听到了')
      let { currentComponent, preComponet } = this
      console.log('currentComponent, preComponet: ', currentComponent, preComponet)
      // let { currentComponent } = this
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
        default:
          if (preComponet && preComponet.length > 0) {
            let preName = this.preComponet.pop()
            console.log('preName-----: ', preName)
            if (preName === 'VDetails') {
              this.goDetails(this.itemData, 'back')
            } else {
              this.handleSchedule(preName, 'back')
            }
          } else {
            this.handleSchedule('VIndex')
          }
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

<style lang='scss'>
@import "@/mixins/_utils.scss";
html,
body {
  width: 100%;
  height: 100%;
}
.module-two {
  width: 100%;
  height: 100%;
  .swiper-container {
    margin: 0;
    padding: 0;
    .swiper-wrapper {
      margin: 0;
      padding: 0;
      width: 100%;
      .swiper-slide {
        margin: 0;
        padding: 0;
        a,
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .swiper-pagination-bullet-active {
      opacity: 0.9;
      background: #edd595;
    }
  }
}
</style>
