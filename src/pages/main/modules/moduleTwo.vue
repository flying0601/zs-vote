<template>
<div class='module-two'>

  <remote-css cdn="static/css/mobile.css"></remote-css>
  <remote-css cdn="static/css/font-awesome-4.7.0/css/font-awesome.min.css"></remote-css>
  <remote-css cdn="static/js/layer/theme/default/layer.css?v=3.1.1"></remote-css>
  <div class="notice">
      <div style="background: rgba(0,0,0,0.6);width: 40px"><img src="static/img/laba.png" alt="">
      </div>
      <marquee behavior="scroll " direction="left" class="scroll" id="keyi">
        不要动活动正在火热进行中！
      </marquee>
  </div>
   <div style="height: 35px;"></div>

    <audio id="bgmusic"
      src="http://srkcz.oss-cn-hangzhou.aliyuncs.com/audio/2020/09/19/v2pEVlFqV6DBis3C37xOvmROb4ZUvFyP4RCsB3WY.mpga"
      loop="loop" autoplay="autoplay"></audio>

    <audio id="bgmusic1" src="" autoplay="autoplay" loop="loop"></audio>
    <div class="video_show xuanzhuan">
      <img src="static/img/music2.png" alt="">
    </div>
    <remote-js cdn="static/js/swiper.min.js"></remote-js>
    <remote-css cdn="static/css/swiper.min.css"></remote-css>
    <v-sider v-if="giftvote && !isOver && giftvote.topimg && isSider"
             :siderData="giftvote.topimg"
             :topimgUrl="giftvote.config && giftvote.config.topimgUrl"
             :curComp="currentComponent"></v-sider>
  <t-index></t-index>
  <t-footer></t-footer>
</div>
</template>

<script>
/**
* @fileName moduleTwo.vue
 * @author ylf
 * @description
* @date 2020/10/12 21:59:11
*/
import VSider from '@/components/v-sider.vue'
import TIndex from '@/components/t-index.vue'
import TFooter from '@/components/t-footer.vue'
export default {
  props: ['giftvote'],
  components: {
    VSider,
    TIndex,
    TFooter,
    'remote-css': {
      render (h) {
        return (<link rel='stylesheet' type='text/css' href={this.cdn} />)
      },
      props: {
        cdn: {
          type: String,
          required: true
        }
      }
    },
    'remote-js': {
      render (createElement) {
        return createElement('script', {
          attrs: {
            type: 'text/javascript',
            src: this.cdn
          }
        })
      },
      props: {
        cdn: {
          type: String,
          required: true
        }
      }
    }
  },
  data () {
    return {
      isOver: false, // 活动是否结束
      isSider: true,
      currentComponent: 'VIndex'
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
  destroyed () {}
}
</script>

<style lang='scss'>
@import '@/mixins/_utils.scss';
html,
body {
   width: 100%;
  height: 100%;
}
.module-two{
  width: 100%;
  height: 100%;
  .swiper-container{
    margin: 0;
    padding: 0;
    .swiper-wrapper{
       margin: 0;
       padding: 0;
       width: 100%;
      .swiper-slide{
        margin: 0;
        padding: 0;
      a,
      img{
        display: block;
        width: 100%;
      }
  }
    }

  }

}
</style>
