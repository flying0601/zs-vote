<template>
  <div class=''>
    <div class="btn"
         style="letter-spacing:1px;text-align: center;font-size: 13px;background-image: url('static/img/jiasuka.png');">
      为 {{voteuser.noid}}号 {{voteuser.name}} 助力<span id="tickets">30</span>票
    </div>
    <div class="giftlist">
      <div class="item active"
           data-id="1"
           data-price="10.00"
           data-title="糖果"
           data-ticket="30">
        糖果
        <div class="img">
          <img src="resource/home/images/gift/1.png"
               style="width: 83px;height: 50px">
        </div>
        <div class="text">
          +30 票
        </div>
      </div>
      <div class="item"
           data-id="2"
           data-price="50.00"
           data-title="锦囊"
           data-ticket="150">
        锦囊
        <div class="img">
          <img src="resource/home/images/gift/2.png"
               style="width: 83px;height: 50px">
        </div>
        <div class="text">
          +150 票
        </div>
      </div>
      <div class="item"
           data-id="3"
           data-price="100.00"
           data-title="福袋"
           data-ticket="300">
        福袋
        <div class="img">
          <img src="resource/home/images/gift/3.png"
               style="width: 83px;height: 50px">
        </div>
        <div class="text">
          +300 票
        </div>
      </div>
      <div class="item"
           data-id="4"
           data-price="300.00"
           data-title="游艇"
           data-ticket="900">
        游艇
        <div class="img">
          <img src="resource/home/images/gift/4.png"
               style="width: 83px;height: 50px">
        </div>
        <div class="text">
          +900 票
        </div>
      </div>
      <div class="item"
           data-id="5"
           data-price="500.00"
           data-title="飞机"
           data-ticket="1500">
        飞机
        <div class="img">
          <img src="resource/home/images/gift/5.png"
               style="width: 83px;height: 50px">
        </div>
        <div class="text">
          +1500 票
        </div>
      </div>
      <div class="item"
           data-id="6"
           data-price="1000.00"
           data-title="邮轮"
           data-ticket="3000">
        邮轮
        <div class="img">
          <img src="resource/home/images/gift/6.png"
               style="width: 83px;height: 50px">
        </div>
        <div class="text">
          +3000 票
        </div>
      </div>
      <div class="item"
           data-id="7"
           data-price="1500.00"
           data-title="火箭"
           data-ticket="4500">
        火箭
        <div class="img">
          <img src="resource/home/images/gift/7.png"
               style="width: 83px;height: 50px">
        </div>
        <div class="text">
          +4500 票
        </div>
      </div>
      <div class="item"
           data-id="8"
           data-price="2000.00"
           data-title="飞船"
           data-ticket="6000">
        飞船
        <div class="img">
          <img src="resource/home/images/gift/8.png"
               style="width: 83px;height: 50px">
        </div>
        <div class="text">
          +6000 票
        </div>
      </div>
      <div class="item"
           data-id="9"
           data-price="3000.00"
           data-title="超级火箭"
           data-ticket="9000">
        超级火箭
        <div class="img">
          <img src="resource/home/images/gift/9.png"
               style="width: 83px;height: 50px">
        </div>
        <div class="text">
          +9000 票
        </div>
      </div>
    </div>
    <div class="price"
         style="margin: 0 auto;padding-left: 2rem"> 选择
      <span id="giftname">糖果</span> 实付款:￥<span id="price">10.00</span>
    </div>
    <button style="background-image: url('static/img/submitbg.png');"
            class="dashang">立即送出</button>
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
// import wx from 'weixin-js-sdk'
Vue.use(Toast)
export default {
  props: ['giftvote', 'voteuser', 'params'],
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {

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
