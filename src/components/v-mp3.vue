<template>
  <div class="play_yinfu"
       id="audio_btn"
       style="display: block;">
    <div id="yinfu"
         class="rotate"></div>
    <audio preload="auto"
           id="media"
           :src="`${configData.mp3}`"
           loop></audio>
    <audio v-if="configData.voiceplay && configData.voiceplay_url"
           preload="auto"
           id="media2"
           :src="`${configData.voiceplay_url}?${time}`"
           loop></audio>
  </div>
</template>

<script>
/**
* @fileName v-mp3.vue
* @author ylf
* @description
* @date 2020/07/20 22:31:52
*/
import $ from 'jquery'
import wx from 'weixin-js-sdk'
import Cookies from 'js-cookie'
export default {
  components: {},
  props: ['config'],
  data () {
    return {
      configData: this.config,
      time: Math.round(new Date().getTime() / 1000)
    }
  },
  computed: {},
  watch: {
    config (val) {
      this.configData = val
    }
  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initMp3()
      }, 1000)
    })
  },
  methods: {
    initMp3 () {
      let audio = $('#media')
      // var now=getCookie('now_time');
      // if(now>0){
      // audio[0].currentTime = now;
      // }

      // audio[0].play();
      $('#audio_btn').bind('click', function () {
        if ($(this).hasClass('off')) {
          $(this).addClass('play_yinfu').removeClass('off')
          $('#yinfu').addClass('rotate')
          $('#media')[0].play()
          if ($('#media2').length > 0) {
            $('#media2')[0].play()
          }
        } else {
          $(this).addClass('off').removeClass('play_yinfu')
          $('#yinfu').removeClass('rotate')
          $('#media')[0].pause()
          if ($('#media2').length > 0) {
            $('#media2')[0].pause()
          }
        }
      })

      wx.ready(function () {
        audio = document.getElementById('media')
        var now = Cookies.get('now_time')
        if (now > 0) {
          audio.currentTime = now
        }
        audio.play()
        if ($('#media2').length > 0) {
          let audio2 = document.getElementById('media2')
          audio2.play()
        }
      })

      setInterval(function () {
        Cookies.set('now_time', audio.currentTime)
      }, 5000)
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
