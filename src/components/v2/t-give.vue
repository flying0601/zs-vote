<template>
  <div class=''>
    <div class="btn"
         style="letter-spacing:1px;text-align: center;font-size: 13px;background-image: url('static/img/jiasuka.png');">
      为 {{voteuser.noid}}号 {{voteuser.name}} 助力<span id="tickets">{{itemGive.giftvote}}</span>票
    </div>
    <div class="giftlist">
      <div class="item "
           :class="{active:curGive==item.giftprice}"
           v-for="(item,i) in giveData"
           :key="i"
           @click="selGive(item,i)">
        {{item.gifttitle || "钻石"}}
        <div class="img">
          <img :src="item.gifticon ||''"
               style="width: 83px;height: 50px">
        </div>
        <div class="text">
          +{{item.giftvote}}票
        </div>
      </div>
    </div>
    <div class="price"
         style="margin: 0 auto;padding-left: 2rem"> 选择
      <span id="giftname">{{itemGive.gifttitle}}</span> 实付款:￥<span id="price">{{itemGive.giftprice}}</span>
    </div>
    <div style="background-image: url('static/img/submitbg.png');"
         class="dashang"
         @click="postGive()">立即送出</div>
  </div>
</template>

<script>
/**
* @fileName t-give.vue
* @author ylf
* @description
* @date 2020/10/26 09:28:25
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
      curGive: null,
      giveData: [],
      itemGive: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getGiveData(this.giftvote.giftdata)
  },
  mounted () {

  },
  methods: {
    getGiveData (data = []) {
      this.giveData = data
      this.itemGive = data[0] || {}
      console.log(this.giveData)
    },
    selGive (item, i) {
      this.itemGive = item
      this.curGive = item.giftprice
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
        gifttitle: this.itemGive.gifttitle,
        gificon: this.itemGive.gifticon,
        fee: this.itemGive.giftprice,
        giftvote: this.itemGive.giftvote,
        body: `为${this.voteuser.name ? this.voteuser.name.replace(/\s*/g, '') : this.voteuser.name}送礼物`
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

.giftlist {
  width: 94%;
  margin: 15px auto;
  display: flex;
  flex-wrap: wrap;
}

.giftlist .item {
  width: 29.3%;
  margin: 0 2% 10px;
  text-align: center;
  background: #ffffff;
  color: #000000;
  padding: 10px 0 0;
  font-weight: bold;
  font-size: 0.85rem;
  border-radius: 8px;
  cursor: pointer;
}

.giftlist .item .img {
  width: 100%;
  background: #ffffff;
  margin-bottom: 10px;
}

.giftlist .item .img img {
  display: block;
  width: 25%;
  margin: 0 auto;
  padding: 5px 0;
}

.price {
  font-size: 16px;
  margin: 0 auto;
  color: #fee8bc;
}

.dashang {
  display: block;
  width: 70%;
  font-size: 1.1rem;
  color: #000000;
  text-align: center;
  line-height: 38px;
  margin: 0 auto 10px;
  font-weight: bold;
  border-radius: 8px;
  background-size: 100% 100%;
}

.btn {
  width: 94%;
  margin: 10px auto;
  height: 38px;
  line-height: 38px;
  color: #000000;
  letter-spacing: 6px;
  text-align: center;
  background-size: 100% 100%;
  font-weight: bold;
}

.giftlist .text {
  background: #caa964;
  border-radius: 0 0 8px 8px;
  color: #000000;
  line-height: 32px;
}

.giftlist .active {
  transform: scale(1.075);
}
</style>
