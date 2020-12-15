<template>
  <div class="w100">
    <div class=''
         v-if="!currentComponent">
      <t-title :giftvote="giftvote"></t-title>
      <div class="active-info">
        <div class="info-area">
          <div class="item"
               style="border-right: 2px solid #f5de9b">
            <div class="item_count">{{playerCensus && playerCensus.votenum ? playerCensus.votenum : voteuser.votenum }}</div>
            <div>当前票</div>
          </div>
          <div class="item"
               style="border-right: 2px solid #f5de9b">
            <div class="item_count">{{playerCensus && playerCensus.rownum ? playerCensus.rownum : '' }}</div>
            <div>排名</div>
          </div>
          <div class="item">
            <div class="item_count"> {{playerCensus && playerCensus.diffnext>-1 ? playerCensus.diffnext : 0 }}票</div>
            <div>距上一名</div>
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="user-area">
          <div class="name">{{voteuser.name}}</div>
          <div class="tips">
            <div style="width: 60%;margin: 0 auto">{{voteuser.noid}}号 商家信息</div>
          </div>
          <div class="desc">
            <p v-if="voteuser.introduction"
               v-html="voteuser.introduction"></p>
            <p v-if="voteuser.details"
               v-html="voteuser.details"></p>
          </div>
          <div class="imgurl">
            <img :src="voteuser['img1']"
                 v-if="voteuser['img1']">
            <img v-lazy="voteuser['img2']"
                 v-if="voteuser['img2']">
            <img v-lazy="voteuser['img3']"
                 v-if="voteuser['img3']">
            <img v-lazy="voteuser['img4']"
                 v-if="voteuser['img4']">
            <img v-lazy="voteuser['img5']"
                 v-if="voteuser['img5']">
            <img v-lazy="voteuser['img6']"
                 v-if="voteuser['img6']">
            <img v-lazy="voteuser['img7']"
                 v-if="voteuser['img7']">
            <img v-lazy="voteuser['img8']"
                 v-if="voteuser['img8']">
            <img v-lazy="voteuser['img9']"
                 v-if="voteuser['img9']">
            <img v-lazy="voteuser['img10']"
                 v-if="voteuser['img10']">
            <img v-lazy="voteuser['img11']"
                 v-if="voteuser['img11']">
            <video v-if="voteuser['img12']"
                   id="pic_s_img_12"
                   style="height: auto; max-height: none;"
                   :src="voteuser['img12']"
                   width="100%"
                   height="auto"
                   preload="none"
                   controls></video>
          </div>
        </div>
      </div>
      <div style="height: 70px"></div>
      <div class="vote-area">

        <div class="item">
          <a @click="postHelp()"
             class="button1"
             type="submit"
             style="border: none;outline: none;background-image: url('static/img/btnbg.png');">
            给TA投票
          </a>
        </div>

        <a class="item"
           style="flex: 1;text-align: center"
           @click="clickGive()">
          <div class="img">
            <img src="static/img/toupiao123.gif">
          </div>
          <div class="text"
               style="color: #fbf200">送个礼物</div>
        </a>

        <div class="item">
          <a class="button1"
             @click="getHb('VHb')"
             style="background-image: url('static/img/btnbg.png');">
            生成海报
          </a>
        </div>
      </div>
    </div>
    <v-hb v-if="giftvote && currentComponent"
          :voteuser="voteuser"
          :guideUrl="guideUrl"
          ref="hb"
          @posterimg="posterimg">
      <img v-if="hbImg"
           :src="hbImg"
           @load="isHbimg()"
           style="width:100%;">
    </v-hb>
    <van-overlay :show="show"
                 @click="show = false">
      <div class="wrapper">
        <img :src="hbImg"
             alt=""
             class="img">
      </div>
    </van-overlay>
  </div>
</template>

<script>
/**
* @fileName v-details.vue
* @author ylf
* @description
* @date 2020/10/26 09:26:19
*/
import Vue from 'vue'
import Toast from 'vant/lib/toast'
import 'vant/lib/toast/style'
import Overlay from 'vant/lib/overlay'
import 'vant/lib/overlay/style'
import VHb from '@/components/v1/v-hb.vue'
import dataFormat from '@/utils/format-time.js'
import TTitle from '@/components/v2/t-title.vue'
Vue.use(Toast)
Vue.use(Overlay)
export default {
  props: ['giftvote', 'voteuser', 'player', 'params', 'playerCensus'],
  components: {
    TTitle,
    VHb
  },
  data () {
    return {
      currentComponent: null,
      show: false,
      hbImg: '',
      guideUrl: ''
    }
  },
  computed: {},
  watch: {
    show (val) {
      if (val === false) {
        this.hbImg = ''
      }
    }
  },
  created () {
    // this.$parent.getData(this.params.vid, 'vote', 1)
    this.getGuideUrl()
  },
  mounted () {

  },
  methods: {
    goSuccess () {
      this.$parent.goSuccess()
    },
    clickGive () {
      this.$parent.handleSchedule('VGive')
    },
    isHbimg () {
      this.showHb()
      this.$parent.isSider = true
      this.currentComponent = null
      this.toastHb.clear()
    },
    postHelp () {
      let { giftvote } = this
      let { votestarttime, voteendtime } = giftvote
      let curTime = Math.round(new Date() / 1000)
      if (curTime < votestarttime) {
        return Toast.loading({
          message: `未开始投票！投票时间为：${dataFormat(giftvote.votestarttime * 1000, 'YYYY-MM-DD HH:mm')}\n至\n${dataFormat(giftvote.voteendtime * 1000, 'YYYY-MM-DD HH:mm')}`,
          icon: 'warn-o'
        })
      }
      if (curTime > voteendtime) {
        return Toast.loading({
          message: `已结束投票！投票时间为：${dataFormat(giftvote.votestarttime * 1000, 'YYYY-MM-DD HH:mm')}\n至\n${dataFormat(giftvote.voteendtime * 1000, 'YYYY-MM-DD HH:mm')}`,
          icon: 'warn-o'
        })
      }
      const toastStart = Toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: false,
        loadingType: 'spinner'
      })
      let pram = {
        did: this.params.did,
        pid: this.params.vid,
        userid: this.params.uid
      }
      this.$api.postHelp(pram).then(res => {
        // if (!res) return
        // console.log(res)
        toastStart.clear()
        if (res && res.errno === 0) {
          Toast.loading({
            message: '投票成功',
            icon: 'like-o'
          })
          setTimeout(() => {
            this.goSuccess()
          }, 200)
        }
        if (res && res.errno === 1000) {
          Toast.loading({
            message: `每人每日只能投票${res.data}次\n明天再来吧！`,
            icon: 'warn-o'
          })
        }
        if (res && res.errno === 1001) {
          Toast.loading({
            message: `选手异常锁定${res.data}分钟！`,
            icon: 'warn-o'
          })
        }
        if (res && res.errno === 1002) {
          Toast.loading({
            message: `选手异常禁止了！`,
            icon: 'warn-o'
          })
        }
        if (res && res.errno === 1003) {
          Toast.loading({
            message: res.errmsg || '异常操作！',
            icon: 'warn-o'
          })
        }
        // console.log('getCensus', pram.vid, res.data)
      })
    },
    getHb (name) {
      this.toastHb = Toast.loading({
        message: '生成中...',
        duration: 0,
        forbidClick: false,
        loadingType: 'spinner',
        overlay: true
      })
      document.documentElement.scrollTop = 0
      this.currentComponent = name
      this.$parent.isSider = false
      console.log('this.currentComponent')
    },
    showHb () {
      this.show = true
    },
    posterimg (val) {
      this.hbImg = val
    },
    getGuideUrl () {
      let param = {
        sysid: this.params.sid,
        use: 3
      }
      this.$api.getActiveHost(param).then(res => {
        // if (!res) return
        let data = res.data || []
        if (res.data && res.data.length > 0) {
          let sysHost = data[0].host
          let urlParam = window.location.search
          console.log('urlParam: ', urlParam)
          urlParam = urlParam.split('#')[0]
          let protocol = window.location.protocol
          this.guideUrl = protocol + '//' + sysHost + '/vt/' + urlParam
          console.log('newUrl: ', this.guideUrl)
        } else {
          this.guideUrl = window.location.href.split('#')[0]
        }
      })
    }

  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
.user-info {
  width: 94%;
  margin: 0 auto;
  font-size: 0.85rem;
  background: #222122;
  border-radius: 10px;
  border: 4px solid #caa964;
}

.user-area {
  padding: 8px 12px;
  color: #caa964;
  text-align: center;
}

.user-area .name {
}

.tips {
  color: #caa964;
  font-size: 18px;
  padding: 10px 0;
  font-weight: 500;
  border-bottom: 2px solid #caa964;
}

.desc {
  margin: 10px 0;
  font-size: 16px;
}

.vote-area {
  position: fixed;
  bottom: 55px;
  display: flex;
  background: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  justify-content: space-around;
  left: 0;
  width: 94%;
  height: 70px;
  padding: 0 3%;
}

.vote-area .item img {
  width: 70px;
  height: 70px;
  display: block;
  margin: -35px auto 6px;
}
.button1 {
  color: #000000;
  font-weight: bold;
  line-height: 35px;
  width: 80px;
  text-align: center;
  margin: 15px 0;
  display: block;
  background-size: 100% 100%;
}
.imgurl {
  img {
    width: 100%;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .img {
    width: 90%;
  }
}
</style>
