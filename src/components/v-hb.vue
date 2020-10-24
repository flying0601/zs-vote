<template>
    <!-- 海报 html 元素 -->
    <div class="main">
    <div id="posterHtml" >
      <div class="posterHtml">
        <img
          :src="'app/WeChat/GiftVote/images/hbbg.jpg'"
          style="width:100%;height:100%"
          @load="loaded"
        >
        <div class="author-img-box" id="imgBox" ref="imgBox" :style="`height:${width}px`">
           <img @load="loaded" class="author-img" :src="voteuser.avatar+'?'+new Date().getTime()" crossOrigin="anonymous">
        </div>
        <div class="author-text">{{voteuser.noid}}号 {{voteuser.name}}</div>
        <!-- <div class="author-tip">请大家支持我!</div> -->
        <!-- 二维码 -->
        <div class="author-qr" id="qrcodeImg" ></div>
      </div>
    </div>
  </div>
    <!-- <span class="tip">长按保存该海报，邀请好友来测！</span>
    <div class="" @click="createPoster()">生成海报</div>
    <div class="">
      <img style="width:100%;" :src="posterImg" alt="" srcset="">
    </div> -->
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
export default {
  props: ['voteuser', 'guideUrl'],
  components: {},
  data () {
    return {
      text: this.guideUrl,
      postcode: true,
      width: '',
      posterImg: '' // 最终生成的海报图片
    }
  },
  computed: {},
  watch: {
    voteuser: {
      handler (newName, oldName) {
        console.log({ newName })
        this.loaded()
      },
      immediate: true

    }
  },
  created () {
    console.log('voteuser', this.voteuser)
  },
  mounted () {
    this.createQrcode(this.text)
    // let url = 'http://asdas.yhkj.shop/Uploads/images/5ef609f843941.png'
    // this.getBase64Image(url, function (resUrl) {
    //   console.log('resUrl', resUrl)
    // })
    let imgBox = this.$refs.imgBox
    this.width = imgBox.offsetWidth
  },
  methods: {
    createQrcode (text) {
      // 生成二维码
      const qrcodeImgEl = document.getElementById('qrcodeImg')
      qrcodeImgEl.innerHTML = ''
      let qrcode = new QRCode(qrcodeImgEl, {
        width: 116,
        height: 116,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
      qrcode.makeCode(text)
    },
    createPoster () {
      // 生成海报
      const vm = this
      const domObj = document.getElementById('posterHtml')
      domObj && html2canvas(domObj, {
        useCORS: true,
        allowTaint: false,
        logging: true,
        letterRendering: true,
        onclone (doc) {
          let e = doc.querySelector('#posterHtml')
          e.style.display = 'block'
        }
      }).then(function (canvas) {
        // 在微信里,可长按保存或转发
        vm.posterImg = canvas.toDataURL('image/png')
        // console.log(vm.posterImg)
        vm.$emit('posterimg', vm.posterImg)
      })
    },
    loaded () {
      setTimeout(() => {
        this.createPoster()
      }, 600)
    }

  },
  destroyed () {
  }
}
</script>

<style lang='scss' scoped>
@import '@/mixins/_utils.scss';
.main{
  height: 100%;}
.posterHtml{
  position: relative;
  width: 100%;
  .author-img-box{
    position: absolute;
    top: 19%;
    left:49.2%;
    transform:translate(-51%);
    z-index: 2;
    border-radius: 50%;
    width: 61%;
    height: 218px;
    overflow: hidden;
    .author-img{
      width: 100%;
      height: 100%;
  }
  }

  .author-text{
    position:absolute;
    left:50%;
    transform:translate(-50%);
    bottom: 33%;
    text-align: center;
    background-image: linear-gradient(#9719ff, #975ad2);
    color: #fff;
    font-weight: bold;
    border-radius: 14px;
    @include hLh(40px);
    @include ellipsis(70%)
  }
  .author-tip{
    position:absolute;
    left:50%;
    transform:translate(-50%);
    bottom: 31%;
    color: #9719ff;
    font-size: 14px;
  }
  .author-qr{
    position:absolute;
    left:49%;
    transform:translate(-51%);
    bottom: 10%;
  }
}
</style>
