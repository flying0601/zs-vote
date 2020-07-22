
<template>
  <div class="container container-fill">
    <v-color v-if="giftvote && giftvote.config"
             :setting="giftvote.config"></v-color>
    <v-sider v-if="giftvote && giftvote.topimg && isSider"
             :siderData="giftvote.topimg"></v-sider>
    <!-- <v-index v-if="giftvote && giftvote.eventrule && false"
             :giftvote="giftvote"></v-index>
    <v-award v-if="giftvote && giftvote.prizemsg"
             :giftvote="giftvote"></v-award> -->
    <component  v-if="giftvote && currentComponent" :is="currentComponent" :giftvote="giftvote" :player="votePlayer" :curPlayer="curPlayer" :params="params" :voteuser="itemData">
</component>
    <v-footer  v-if="giftvote && isFooter" :curComp="currentComponent"></v-footer>
     <component  v-if="giftvote && giftvote.config && giftvote.config.mp3" :config="giftvote.config" :is="'Vmap3'" ></component>
     <component  v-if="giftvote && giftvote.config && giftvote.config.pftx" :config="giftvote.config" :is="'Vpftx'" ></component>
  </div>
</template>

<script>

import VFooter from '@/components/v-footer.vue'
import VColor from '@/components/v-color.vue'
import VSider from '@/components/v-sider.vue'
import wx from 'weixin-js-sdk'
import Cookies from 'js-cookie'
import Util from '@/utils/util.js'
export default {
  components: {
    VFooter,
    VColor,
    VSider,
    VAward (resolve) {
      let date = new Date()
      console.log(date.valueOf())
      require(['@/components/v-award.vue'], resolve)
      let dates = new Date()
      console.log(dates.valueOf())
    },
    VIndex (resolve) {
      require(['@/components/v-index.vue'], resolve)
    },
    Vrank (resolve) {
      require(['@/components/v-rank.vue'], resolve)
    },
    VDetails (resolve) {
      require(['@/components/v-details.vue'], resolve)
    },
    VGive (resolve) {
      require(['@/components/v-give.vue'], resolve)
    },
    VSuccess (resolve) {
      require(['@/components/v-success.vue'], resolve)
    },
    Vmap3 (resolve) {
      require(['@/components/v-mp3.vue'], resolve)
    },
    Vpftx (resolve) {
      require(['@/components/v-pftx.vue'], resolve)
    }
  },

  data () {
    return {
      giftvote: null,
      votePlayer: [],
      currentComponent: 'VIndex',
      isSider: true,
      isFooter: true,
      itemData: null, // 选手详情
      giveData: null,
      curPlayer: null,
      params: {
        mname: null,
        vid: null,
        sid: null,
        uid: null,
        did: null
      }
    }
  },
  beforeCreate () {
    let host = window.location.host
    console.log({ host })
    if (host.includes('localhost:1315')) {
      Cookies.set('openid', 'ox4NqxP83fAYlQ6QxkLQJqlwssFo')
    }
    let openId = Cookies.get('openid')
    console.log('openId: ', openId)
    if (!openId) {
      let code = Util.GetQueryString('code')
      let sysid = Util.GetQueryString('s')
      if (!code) {
        let initUrl = window.location.href.split('#')[0]
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
          window.location.href = res.data
        })
      } else {
        let initUrl = Cookies.get('initUrl')
        let sysid = Util.GetQueryString('s', initUrl) || Cookies.get('sysid')
        this.$api.getOpenId({ code: code, sysid: sysid }).then(res => {
          // if (!res) return
          console.log('getOpenId', res.data)
          if (res.data) {
            Cookies.set('openid', res.data.openid)
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
  watch: {
    itemData (val) {

    }
  },
  created () {
    console.log('Cookies', Cookies.get('openid'))
    console.log('created', window.location.href)
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

    !this.itemData && this.params.did && (this.params.mname === 'VDetails' || this.params.mname === 'VGive' || this.params.mname === 'VSuccess') && this.playerInfo()
    this.params && this.params.mname && this.handleSchedule(this.params.mname)
  },
  mounted () {

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
        default:
          this.isSider = true
          this.isFooter = true
          break
      }
      Util.updUrl('m', name)
    },
    goDetails (item) {
      this.itemData = item
      this.handleSchedule('VDetails')
      this.params.did = item.id
      Util.updUrl('d', item.id)
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
        document.title = this.giftvote.title
        console.log('data', pram.id, res.data)
        this.getConfigData()
      })
    },
    playerInfo () {
      let pram = {
        id: this.params.did
      }
      this.$api.getVotePlayerInfo(pram).then(res => {
      // if (!res) return
        this.itemData = res.data
        console.log('itemData', pram.id, res.data)
      })
    },
    getData (pid = 300, order = 'vote', page = 1, size = 10) {
      let pram = {
        pid: pid,
        page: page,
        size: size,
        order: order
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
    getConfigData () {
      let pram = { url: window.location.href.split('#')[0], sysid: this.params.sid }
      this.$api.getConfig(pram).then(res => {
      // if (!res) return
        console.log('getConfig', res.data)
        res && res.data && this.getConfig(res.data)
      })
      this.$nextTick(() => {
        wx.ready(() => {
          this.wxJsJdk()
        })
      })
    },
    // 微信分享
    getConfig (data) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // ', // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'updateTimelineShareData', // 分享到朋友圈
          'updateAppMessageShareData', // 分享给朋友
          'chooseWXPay'// 微信支付
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.error(function (result) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(result + '测试报错，上线后就可以修复')
      })
    },
    wxJsJdk () {
      wx.ready(() => {
        // 分享给朋友
        wx.updateAppMessageShareData(this.winxin())
        // 分享到朋友圈
        wx.updateTimelineShareData(this.winxin())
      })
    },
    weixinShare () {
      // 分享到朋友圈
      console.log('updateTimelineShareData 朋友圈')
      wx.updateTimelineShareData(this.winxin())
    },
    weixinShareFirend () {
      // 分享给朋友
      console.log('updateAppMessageShareData 微信朋友')
      wx.updateAppMessageShareData(this.winxin())
    },
    winxin () {
      let shareContent = this.shareContent()
      // console.log('shareContent: ', shareContent)
      return {
        title: shareContent.title,
        desc: shareContent.content,
        link: shareContent.Link,
        imgUrl: shareContent.imgUrl,
        success: function () {
          console.log({
            mes: '分享成功！',
            timeout: 1500,
            icon: 'success'
          })
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log({
            mes: '分享失败',
            timeout: 1500,
            icon: 'success'
          })
        }
      }
    },
    shareContent () {
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
          Link: window.location.href.split('#')[0],
          title: giftvote['item_sharetitle'],
          content: content
        }
      } else {
        shareObj = {
          imgUrl: giftvote['shareimg'],
          Link: window.location.href.split('#')[0],
          title: giftvote['sharetitle'],
          content: giftvote['sharedesc']
        }
      }
      console.log('ddd', shareObj)
      return shareObj
    }
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
