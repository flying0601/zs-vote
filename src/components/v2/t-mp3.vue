<template>
  <div class=''>
    <audio id="bgmusic"
           :src="`${configData.mp3}`"
           loop="loop"
           autoplay="autoplay"></audio>
    <audio id="bgmusic1"
           v-if="configData.voiceplay && configData.voiceplay_url"
           :src="`${configData.voiceplay_url}?${time}`"
           autoplay="autoplay"
           loop="loop"></audio>
    <div class="video_show "
         :class="{xuanzhuan:!paused}"
         @click="playAudio()">
      <img src="static/img/music2.png"
           alt="">
    </div>
  </div>
</template>

<script>
/**
* @fileName t-mp3.vue
* @author ylf
* @description
* @date 2020/11/14 15:45:01
*/
import wx from 'weixin-js-sdk'
export default {
  components: {},
  props: ['config'],
  data () {
    return {
      configData: this.config,
      time: Math.round(new Date().getTime() / 1000),
      paused: true
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {
    let _this = this
    if (this.configData.mp3) {
      _this.music = document.getElementById('bgmusic')
      _this.music.addEventListener('canplay', function () {
        // 监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
        // console.log('mp3加载完成............')
        _this.autoBgmusic()
      })
    }
    if (this.configData.voiceplay_url) {
      _this.music1 = document.getElementById('bgmusic1')
      _this.music1.addEventListener('canplay', function () {
        // 监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
        // console.log('mp31加载完成............')
        _this.autoBgmusic1()
      })
    }
  },
  methods: {
    autoBgmusic () {
      let _this = this
      wx.ready(function () {
        _this.music.play()
      })
      document.addEventListener(
        'WeixinJSBridgeReady',
        function () {
          _this.music.play()
        },
        false
      )
      if (this.music.paused) {
        setTimeout(() => {
          this.playAudio()
        }, 800)
      } else {
        this.paused = this.music.paused
      }
      console.log(' [0].paused: ', document.getElementById('bgmusic').paused)
    },
    autoBgmusic1 () {
      let _this = this
      wx.ready(function () {
        _this.music1.play()
      })
      document.addEventListener(
        'WeixinJSBridgeReady',
        function () {
          _this.music1.play()
        },
        false
      )
    },
    playAudio () {
      this.paused = this.music.paused
      if (this.paused) {
        this.music && this.music.play()
        this.music1 && this.music1.play()
      } else {
        this.music && this.music.pause()
        this.music1 && this.music1.pause()
      }
      this.paused = this.music.paused
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
