<template>
<div class="main">

    <!-- 海报 html 元素 -->
    <div id="posterHtml" >
      <div class="posterHtml">
        <img
          :src="'app/WeChat/GiftVote/images/hbbg.jpg'"
          style="width:100%;height:100%"
        >
        <div class="posterklass">我是,邀请您:</div>

        <!-- 二维码 -->

        <div id="qrcodeImg" :if="postcode"></div>

      </div>
    </div>
    <div id="myCanvas"></div>
    <span class="tip">长按保存该海报，邀请好友来测！</span>
    <div class="" @click="createQrcode(text)">生成海报</div>
  </div>
</template>

<script>
/**
* @fileName v-hb.vue
* @author ylf
* @description
* @date 2020/07/24 20:53:22
*/
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas'
import Canvas2Image from 'canvas2image'
export default {
  components: {},
  data () {
    return {
      text: window.location.href,
      postcode: ''
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    createQrcode (text) {
      // 生成二维码
      const qrcodeImgEl = document.getElementById('qrcodeImg')
      qrcodeImgEl.innerHTML = ''
      let width = document.documentElement.clientWidth
      width = width * 0.32

      let qrcode = new QRCode(qrcodeImgEl, {
        width: width,
        height: width,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
      qrcode.makeCode(text)
      this.createPoster()
    },
    createPoster () {
      // 生成海报
      const vm = this
      const domObj = document.getElementById('posterHtml')

      var width = document.documentElement.clientWidth
      var height = document.documentElement.clientHeight
      var canvas = document.createElement('canvas')
      var scale = 2

      canvas.width = width * scale
      canvas.height = height * scale
      canvas.getContext('2d').scale(scale, scale)

      var opts = {
        scale: scale,
        canvas: canvas,
        logging: true,
        width: width,
        height: height,
        useCORS: true,
        allowTaint: false,
        logging: false,
        letterRendering: true

      }
      html2canvas(domObj, opts).then(function (canvas) {
        var context = canvas.getContext('2d')

        // 重要 关闭抗锯齿

        context.mozImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.imageSmoothingEnabled = false

        var img = Canvas2Image.convertToImage(
          canvas,
          canvas.width,
          canvas.height
        )
        vm.postshow = false
        vm.postcode = false
        img.style.width = canvas.width / 2 + 'px'

        img.style.height = canvas.height / 2 + 'px'
        img.style.position = 'absolute'
        img.style.top = '0px'

        document.getElementById('myCanvas').appendChild(img)

        vm.$nextTick(() => {
          let e = document.querySelector('#posterHtml')
          e.style.display = 'none'
        })
      })
    }
  },
  destroyed () {}
}
</script>

<style lang='scss' scoped>
@import '@/mixins/_utils.scss';

</style>
