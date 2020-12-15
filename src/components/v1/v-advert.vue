<template>
<div class="advert-box">
  <div class="advert-notice">
  <van-notice-bar
    left-icon="volume-o"
    :text="gonggao"
    scrollable
    @close="show=false"
    mode="closeable"
    :color="textColor" :background="bgColor"
  />
  </div>
  <div v-if="show" class="advert-height"></div>
</div>
</template>

<script>
/**
* @fileName v-guanggao.vue
* @author ylf
* @description
* @date 2020/07/23 23:39:28
*/
import Vue from 'vue'
import NoticeBar from 'vant/lib/notice-bar'
import 'vant/lib/notice-bar/style'
import Util from '@/utils/util.js'
Vue.use(NoticeBar)
export default {
  props: ['config', 'gonggao'],
  components: {},
  data () {
    return {
      show: true,
      textColor: '',
      bgColor: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.swapColor('#' + this.config.main_color)
  },
  mounted () {

  },
  methods: {
    swapColor (val) {
      let textColor = Util.colorRgba(val)
      let bgColor = Util.colorRgba(val, 0.15)
      // console.log(textColor, bgColor)
      this.textColor = Util.colorTo16(textColor)
      this.bgColor = Util.colorTo16(bgColor)
      // console.log(this.textColor, this.bgColor)
    }
  },
  destroyed () {}
}
</script>

<style lang='scss' scoped>
@import '@/mixins/_utils.scss';
.advert-notice{
  position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    z-index: 99;
    .van-notice-bar{
      padding: 0 8px;
      height: 36px;
    }

}
.advert-height{
      height: 36px;
    }
</style>
