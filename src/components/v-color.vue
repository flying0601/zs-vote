<template>
<div class='' v-show="false">
  <div v-if="setting && setting.zdy_color==5" :key="index2" v-html="index2">

</div>
</div>
</template>

<script>
/**
* @fileName v-color.vue
 * @author ylf
 * @description
* @date 2020/07/05 11:25:19
*/

export default {
  components: {},
  props: ['setting'],
  data () {
    return {
      index2: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    // console.log('ddd', this.setting)
    this.setColor(this.setting)
  },
  mounted () {

  },
  methods: {
    setColor (config) {
      // console.log('config: ', config.main_color)

      let link = `<link href="app/WeChat/GiftVote/css/index2.css" rel="stylesheet"> `
      let style = `
      <style>
      .threebutton a{background-color:#${config.main_color};}
      .divmain11 .divsub{background:#${config.main_color};}
      .content .list_box li a.vote{background:#${config.main_color};}
      .macol{background:#${config.main_color};}
      .footer li>a.on .nav{color:#${config.main_color}}
      .footer li>a.on .nav p{color:#${config.main_color}}
      .footer li>a.on .nav{color:#${config.main_color}}
      .rankp{background:#${config.main_color};}
      .lapiao .l{background:#${config.main_color};}
      .lapiao .r{background:#${config.main_color};}
      .donate_bank_p .weui-btn_primary{background:#${config.main_color};color:#fff;}
      .threebutton a:link{color:#fff}
      .threebutton a:visited{color:#fff}
      #mar{background-color:#666;}
      .content .list_box li>div .number{background-color:#${config.main_color};}
      .twobutton a.active{background-color:#${config.main_color}}
      .twobutton a:nth-child(2).active{background-color:#${config.main_color}}
      </style>`
      this.index2 = link + style
      // console.log(this.index2)
    }
  },
  destroyed () {}
}
</script>

<style lang='scss'>
@import '@/mixins/_utils.scss';

</style>
