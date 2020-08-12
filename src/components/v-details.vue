<template>
  <div class='details-box'>
    <div class="" v-if="!currentComponent">
      <div class="swiper-container" v-if="giftvote && giftvote.topimg && giftvote.topimg.pic_1">
      <img :src="giftvote.topimg.pic_1">
      </div>
      <div class="rq"
           v-if="giftvote.config && giftvote.config.rqb">
        <p v-text="`<<网络人气榜>>`"></p>
        <ul>
          <li v-for="(item,i) in rankList"
              :key="i"
              :style="`background-image:url('app/WeChat/GiftVote/img/hg${i<3?1:2}.gif');`">
            <a @click="clickItem(item)"><img :src="item['img1']"></a>
            <p>{{item['name']}}</p>
            <p>{{item['votenum']}}</p>
          </li>
        </ul>
      </div>
      <div style="width: 90%; margin: 0 auto;margin-top:20px;overflow:hidden;">
        <div style="width: 100%; text-align: left; padding-bottom: 20px;">
          <div id="jiandiv2">
            <div id="jiandiv">
              选手介绍
            </div>
            <div style="padding: 0px 0px 10px 10px; margin-top: -10px;">
              <div style="width: 70%; float: left;">
                名称：{{voteuser.name}}</div>
              <div style="width: 26%; text-align: right; float: left;">
                编号：{{voteuser.noid}}</div>
              <div style="clear:both"></div>
              <div style="margin-top:5px">
                <div v-if="voteuser.details" v-html="'自我介绍:'+voteuser.details">
                </div>
              </div>
              <div v-if="giftvote.xs_js">
                <p style="margin-top:5px" v-html="giftvote.xs_js+'：'+voteuser.introduction" >
                </p>

              </div>

            </div>
          </div>
          <!--主体 -->
          <div style="width: 100%; margin-left: 0px; text-align: center;"
               id="zlb">

            <div class="zlb">
              当前票数</div>
            <div class="zlb"
                 style="margin-left: -1px; width: 38%;">
              距上一名差</div>
            <div class="zlb"
                 style="margin-left: 1px; width: 35%;">
              票数榜</div>
            <div style="clear: both;">
            </div>
            <div style="margin-top: -10px;"
                 class="zlb"
                 id="pcount">
              <span id="votenum2">{{playerCensus && playerCensus.votenum ? playerCensus.votenum : voteuser.votenum }}</span>票</div>
            <div class="zlb"
                 style="margin-left: -1px; width: 38%; margin-top: -10px;"
                 id="pcha">
              {{playerCensus && playerCensus.diffnext>-1 ? playerCensus.diffnext : 0 }}票</div>
            <div class="zlb"
                 style="margin-left: 1px; width: 35%; margin-top: -10px;"
                 id="pzcount">
              第{{playerCensus && playerCensus.rownum ? playerCensus.rownum : '' }}名</div>
            <div style="clear: both;">
            </div>
          </div>
          <div class="img">
            <img :src="voteuser['img1']"
                 v-if="voteuser['img1']">
            <img :src="voteuser['img2']"
                 v-if="voteuser['img2']">
            <img :src="voteuser['img3']"
                 v-if="voteuser['img3']">
            <img :src="voteuser['img4']"
                 v-if="voteuser['img4']">
            <img :src="voteuser['img5']"
                 v-if="voteuser['img5']">
            <img :src="voteuser['img6']"
                 v-if="voteuser['img6']">
            <img :src="voteuser['img7']"
                 v-if="voteuser['img7']">
            <img :src="voteuser['img8']"
                 v-if="voteuser['img8']">
            <img :src="voteuser['img9']"
                 v-if="voteuser['img9']">
            <img :src="voteuser['img10']"
                 v-if="voteuser['img10']">
            <img :src="voteuser['img11']"
                 v-if="voteuser['img11']">
            <video v-if="voteuser['img12']"
                   id="pic_s_img_12"
                   style="height: auto; max-height: none;"
                   :src="voteuser['img12']"
                   width="100%"
                   height="auto"
                   controls></video>
          </div>
        </div>
      </div>
      <div class='vsav'>
        <div class='vbtn_tnk'><a href="">我也要参加</a></div>
      </div>
      <div class="bg-purple3 bg-blue3 mg-t-40"
           style="height:144px;"></div>
        <div class="lapiao">
          <a href="javascript:;"
             class='l'
             :style="`background-image: url('app/WeChat/GiftVote/img/zuan_01.png')`"
             @click="postHelp()"
             id="mytoupiao">给ta投票</a>
          <a href="javascript:;"
             v-if="giftvote.config.hb"
             :style="`background-image: url('app/WeChat/GiftVote/img/zuan_05.png')`"
             class='r'
             @click="getHb('VHb')">生成海报</a>
          <div v-if="giftvote.config.diamondmodel==0">
            <div class="add">
              <a @click="clickGive()">
                <div class="i">助力</div>
              </a>
            </div>
          </div>
          <div v-if="giftvote.config.diamondmodel==2">
            <div class="add">
              <a href="">
                <div class="i">砸金蛋</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- <component  v-if="giftvote && currentComponent" :voteuser="voteuser" ref="hb"  @posterimg="posterimg" :is="currentComponent" ></component> -->
        <v-hb v-if="giftvote && currentComponent"
              :voteuser="voteuser"
              :guideUrl="guideUrl"
              ref="hb"
              @posterimg="posterimg"></v-hb>
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
* @date 2020/07/10 23:47:47
*/
import Vue from 'vue'
import Toast from 'vant/lib/toast'
import 'vant/lib/toast/style'
import Overlay from 'vant/lib/overlay'
import 'vant/lib/overlay/style'
import VHb from '@/components/v-hb.vue'
import dataFormat from '@/assets/js/format-time.js'
Vue.use(Toast)
Vue.use(Overlay)
export default {
  props: ['giftvote', 'voteuser', 'player', 'params', 'playerCensus'],
  components: {
    VHb
    // VHb (resolve) {
    //   require(['@/components/v-hb.vue'], resolve)
    // }
  },
  data () {
    return {
      currentComponent: null,
      rankList: [],
      show: false,
      hbImg: '',
      guideUrl: ''
    }
  },
  computed: {},
  watch: {
    player (val) {
      this.rankList = val.slice(0, 5)
    }

  },
  created () {
    // console.log(this.giftvote.topimg.pic_1)
    this.$parent.getData(this.params.vid, 'vote', 1)
    this.getGuideUrl()
  },
  mounted () {

  },
  methods: {
    clickGive (item) {
      this.$parent.goGive(item)
    },
    goSuccess () {
      this.$parent.goSuccess()
    },
    clickItem (item) {
      this.$parent.goDetails(item)
    },
    postHelp () {
      let { giftvote } = this
      let { votestarttime } = giftvote
      let curTime = Math.round(new Date() / 1000)
      if (curTime < votestarttime) {
        return Toast.loading({
          message: `未开始投票！投票时间为：${dataFormat(giftvote.votestarttime * 1000, 'YYYY-MM-DD HH:mm')}\n至\n${dataFormat(giftvote.voteendtime * 1000, 'YYYY-MM-DD HH:mm')}`,
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
        console.log(res)
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
            message: `选手异常锁定${parseInt(res.data)}秒！`,
            icon: 'warn-o'
          })
        }
        if (res && res.errno === 1002) {
          Toast.loading({
            message: `选手异常禁止了！`,
            icon: 'warn-o'
          })
        }
        // console.log('getCensus', pram.vid, res.data)
      })
    },
    postPlayerCensus () {
      let pram = {
        noid: this.voteuser.noid,
        sysid: this.params.sid,
        pid: this.params.vid
      }
      this.$api.getPlayerCensus(pram).then(res => {
        this.playerCensus = res && res.data && res.data[0]
        console.log(this.playerCensus)
      })
    },
    getHb (name) {
      document.documentElement.scrollTop = 0
      this.currentComponent = name
      // this.$parent.isSider = false
      console.log('this.currentComponent')
    },
    showHb () {
      this.show = true
    },
    posterimg (val) {
      this.hbImg = val
      this.showHb()
      // this.$parent.isSider = true
      this.currentComponent = null
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
.details-box {
  position: relative;
  background: #fff;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .img {
      width: 90%;
    }
  }
}
.lapiao {
  background-color: rgba(0, 0, 0, 0.6);
  border-top: none;
  height: 65px;
}
.lapiao .add {
  width: 80px;
  height: 73px;
  top: 12px;
  margin: -40px;
}
.add .i {
  color: #fff;
  font-weight: 700;
  padding-top: 63px;
  padding-left: 15px;
}
#jiandiv {
  width: 100px;
  height: 40px;
  position: relative;
  top: -15px;
  left: 40px;
  line-height: 30px;
  font-size: 16px;
  color: #2dcc70;
  text-align: center;
  font-weight: bold;
  background: #fff;
}
#jiandiv2 {
  width: 100%;
  margin-top: 20px;
  border: 1px #ccc solid;
  border-radius: 10px;
}

.zlb {
  float: left;
  width: 50%;
  line-height: 30px;
  border-right: solid 1px #ccc;
  width: 27%;
}
#zlb {
  border: solid 1px #ccc;
  border-right: 0px;
  width: 80%;
  margin: 10px 10%;
}
.lapiao .l,
.lapiao .r {
  background: #fff;
  border-radius: 3px;
  color: #000;
  font-weight: 600;
  padding: 5px 10px;
  width: 100px;
  height: 36px;
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 7px 11px;
  padding-left: 30px;
  line-height: 28px;
}
.lapiao .l {
  // background-image: url("/app/WeChat/GiftVote/img/zuan_01.png");
  margin-left: 20px;
}
.lapiao .r {
  // background-image: url("/app/WeChat/GiftVote/img/zuan_05.png");
  background-position: 7px 9px;
  margin-right: 20px;
}
.rq {
  width: 98%;
  padding: 5px;
  text-align: center;
  margin: 0px auto;
  margin-top: 20px;
  margin-bottom: -10px;
}
.rq ul {
  list-style: none;
  display: flex;
}
.rq ul li {
  flex: 1 20%;
}
.rq ul li img {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}
.rq p:first-child {
  font-size: 18px;
  font-weight: 600;
  color: red;
}
/*.rq ul li p:nth-child(2){margin-top:6px;min-height:35px}
.rq ul li p:nth-child(3){margin-top:12px}*/
.rq ul li p:nth-child(2) {
  margin-top: 6px;
  min-height: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.rq ul li p:nth-child(3) {
  margin-top: 8px;
}
.rq ul li {
  background-repeat: no-repeat;
  background-position: 45% 7px;
  padding-top: 30px;
  background-size: 40px;
}
.rq ul li:nth-child(4) {
  background: url("/app/WeChat/GiftVote/img/hg2.gif") no-repeat;
  background-position: 45% 7px;
  padding-top: 30px;
  background-size: 40px;
}
.rq ul li:nth-child(5) {
  background: url("/app/WeChat/GiftVote/img/hg2.gif") no-repeat;
  background-position: 45% 7px;
  padding-top: 30px;
  background-size: 40px;
}

.img {
  margin: 0px;
  padding: 0px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
.img img {
  width: 100%;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 2px;
}

// .lapiao .add {
//   background: url("/app/WeChat/GiftVote/egg/icon2.png") no-repeat;
//   background-size: cover;
// }
</style>
