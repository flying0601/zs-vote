<template>
  <ul class="bg-bubbles">
   <li v-for="i in 15" :key="i"><img :src="'.'+configData.pftx" alt="飘浮装饰" /></li>

</ul>
</template>

<script>
/**
* @fileName v-pftx.vue
* @author ylf
* @description
* @date 2020/07/20 23:08:23
*/
import $ from 'jquery'
export default {
  components: {},
  props: ['config'],
  data () {
    return {
      configData: this.config
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
    this.initBubbles()
  },
  methods: {
    initBubbles () { // 初始化漂浮物
    // 漂浮物设置
      $('.bg-bubbles li').each(function (k, v) {
        var i = k + 1
        var delayMin = 200
        var delayMax = 10000
        var leftMin = 0
        var leftMax = 90
        var durationMin = 2000
        var durationMax = 20000
        var widthMin = 2
        var widthMax = 6
        var delay = Math.floor(delayMin + Math.random() * (delayMax - delayMin)) + Math.floor(200 + Math.random() * (200 - 50))
        var left = Math.floor(leftMin + Math.random() * (leftMax - leftMin))
        var duration = Math.floor(durationMin + Math.random() * (durationMax - durationMin)) + Math.floor(1000 + Math.random() * (1000 - 200))
        var width = Math.floor(widthMin + Math.random() * (widthMax - widthMin))
        $('.bg-bubbles li:nth-child(' + i + ')').css({
          'left': left + '%',
          'animation-delay': delay + 'ms',
          'animation-duration': duration + 'ms',
          'width': width + 'rem'
        })
      })
    }
  },
  destroyed () {}
}
</script>

<style lang='scss' scoped>
@import '@/mixins/_utils.scss';
.bg-bubbles li{position:fixed;top:-10%;list-style:none;display:block;width:3rem;animation:downFloat 10s infinite;-webkit-transition-timing-function:linear;transition-timing-function:linear;z-index:10}
.bg-bubbles li img{width:100%}
@keyframes downFloat{
0%{top:-20%;-webkit-transform:translateY(0);transform:translateY(0)}
100%{top:110%;-webkit-transform:rotate(600deg);transform:rotate(600deg)}}
@keyframes upFloat{
0%{-webkit-transform:translateY(0);transform:translateY(0)}
100%{-webkit-transform:translateY(-2000px) rotate(600deg);
transform:translateY(-2000px) rotate(600deg)}}
</style>
