<template>
  <div class=''>
    <!-- <div class=""
         v-html="style"
         v-show="false"></div> -->
    <div class="donate_donate"
         :v-if="giveData && giveData.length"
         style="padding-top:0px">
      <div class="weui-panel__bd user_info bg-purple2 bg-blue2">
        <a @click="clickDetails(voteuser)"
           class="weui-media-box weui-media-box_appmsg weui-cell_access">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb"
                 :src="voteuser.headimgurl || voteuser.img1"
                 :alt="`${voteuser['noid']}`"
                 style="border-radius: 50%;height: 100%; border: 1px solid #ffffff;">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title cl-white">{{voteuser.noid}}号 {{voteuser.name}}</h4>
            <p class="weui-media-box__desc cl-white">给Ta赞助吧</p>
          </div>
          <span class="weui-cell__ft"></span>
        </a>

      </div>

      <div class="divbottommenu  bg-purple3 bg-blue3 clearfix pd-b-10 bg-bw"
           style="margin-top:10px;border-top: 1px dashed #d5d5d5;">

        <div class="divitem">
          <span><i class="fa fa-user fa-fw"></i>编号</span>
          <span>{{voteuser['noid']}}</span>
        </div>
        <div class="divitem">
          <span><i class="fa fa-ticket fa-fw"></i>票数</span>
          <span>{{voteuser['votenum']}}</span>
        </div>
        <div class="divitem">
          <span><i class="fa fa-fire fa-fw"></i>热度</span>
          <span>{{voteuser['pvcount']}}</span>
        </div>

        <!-- <div class="divitem" v-if="data=[]['diamondmodel']==0 && giftvote['dot_open']==1">
          <span><i class="fa fa-diamond fa-fw"></i>礼物</span>
          <span>${voteuser['giftcount']*giftvote['giftscale'].giftvote['giftunit']}></span>
        </div> -->
      </div>
      <div class="divview2 bg-purple4 bg-blue4">

        <div> <i class="glyphicon glyphicon-stats"
             style="margin-right:5px"></i>排名：第{{voteuser.rank || 0}}名 </div>
        <div v-if="voteuser['rank'] >1"> <i class="glyphicon glyphicon-hand-right"
             style="margin-right:2px"></i>
          <!-- <span>与第一名差${voteuser.maxrank}票</span> -->

          <span>与上一名差{{voteuser.minrank}}票</span>

        </div>

      </div>

      <div class="donate_money_p_p"
           style="margin-bottom:30px">
        <div class="donate_money_choose_p">

          <div class="donate_money_choose donate_money_choose1"
               v-for="(item,i) in giveData"
               :key="i">
            <div class="donate_money"
            :class="{active:curGive==ktem.giftprice}"
                 v-for="(ktem,i) in item"
                 :key="i"
                 @click="selGive(ktem,i)"
                 :title="`支付${ktem['giftprice']}元，赞助 ${voteuser['name']} ${voteuser['gifttitle']}，抵${ktem['giftvote']}票！`">
              <p class="donate_money_icon"><img :src="ktem.gifticon ||''"
                     width="50%" /></p>
              <span class="donate_money_title">{{ktem.gifttitle || "钻石"}}</span>
              <span class="donate_money_num">{{ktem.giftprice}}点</span>
            </div>

          </div>

        </div>
        <div class="donate_money_edit">
          <div class="donate_money_edit_text"
               style="text-align:left">
               <span id="tsy" v-if="!isSel">请选择以上赞助 </span>
               <span id="tsy" v-else>支付{{subGive.giftprice}}元，赞助{{voteuser.name}}助力，抵{{subGive.giftvote}}票！</span>
            <span style="float:right">数量:
              <select name="pcount"
              v-model="pcount"
                      id="pcount">
                <option value="1"
                        selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="520">520</option>
                <option value="666">666</option>
                <option value="1314">1314</option>
              </select>

            </span>
          </div>
          <div class="donate_money_edit_text"
               style="text-align:left">

          </div>
        </div>
      </div>
      <div style="height:50px;"></div>
      <div class="donate_bank_p"
           style="position:fixed;bottom:5px;width:100%;margin:0 auto;">
        <a @click="postGive()"
           id="weixin"
           style="width:90%;margin:0 auto"
           class="weui-btn weui-btn_primary">友情赞助</a>
      </div>

    </div>
  </div>
</template>

<script>
/**
* @fileName v-give.vue
* @author ylf
* @description
* @date 2020/07/12 14:19:39
*/
import Vue from 'vue'
import Toast from 'vant/lib/toast'
import 'vant/lib/toast/style'
import wx from 'weixin-js-sdk'
Vue.use(Toast)
export default {
  props: ['giftvote', 'voteuser', 'params'],
  components: {},
  data () {
    return {
      // style: '<link rel="stylesheet" href="app/WeChat/GiftVote/css/donate.css?33">',
      giveData: [],
      curGive: null,
      pcount: 1,
      isSel: false,
      itemGive: null
    }
  },
  computed: {
    subGive () {
      return {
        gifticon: this.itemGive.gifticon,
        giftprice: this.itemGive.giftprice * this.pcount,
        gifttitle: this.itemGive.gifttitle + 'x' + this.pcount,
        giftvote: this.itemGive.giftvote * this.pcount
      }
    }
  },
  watch: {

  },
  created () {
    // console.log(this.voteuser)
    this.getGiveData(this.giftvote.giftdata)
  },
  mounted () {

  },
  methods: {
    getGiveData (data = []) {
      for (let i = 0; i < data.length; i += 3) {
        this.giveData.push(data.slice(i, i + 3))
      }
      console.log(this.giveData)
    },
    selGive (ktem, i) {
      this.isSel = true
      this.itemGive = ktem
      this.curGive = ktem.giftprice
    },
    clickDetails (item) {
      this.$parent.goDetails(item)
    },
    postGive () {
      let _this = this
      Toast.loading({
        message: '加载中...',
        // duration: 0,
        forbidClick: false,
        loadingType: 'spinner'
      })
      let prams = {
        did: this.params.did,
        pid: this.params.vid,
        userid: this.params.uid,
        sysid: this.params.sid,
        gifttitle: this.subGive.gifttitle,
        gificon: this.subGive.gifticon,
        fee: this.subGive.giftprice,
        giftvote: this.subGive.giftvote,
        body: `为${this.voteuser.name}送礼物`
      }
      this.$api.postGive(prams).then(result => {
      // if (!res) return
        let res = result.data
        if (res) {
          wx.chooseWXPay({
            timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
            package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.paySign, // 支付签名
            success: function (res) {
              // 成功
              console.log('支付成功', res)
              // alert('支付成功')
              _this.$parent.goDetails(_this.voteuser)
            },
            cancel: function (res) {
              // 取消
              console.log('cancel-pay', res)
              // alert('支付取消')
            },
            fail: function (res) {
              // 失败
              console.log('pay-fail', res)
              alert('支付失败！')
            }
          })
        }

        // console.log('getCensus', pram.vid, res.data)
      })
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
.divbottommenu .divitem {
  width: 33.333%;
}
</style>
