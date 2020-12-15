<template>
<div class='' v-show="false">
  <div v-if="setting" :key="styleColor" v-html="styleColor">
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
      styleColor: ''
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
      let common = `<link rel="stylesheet" href="app/WeChat/GiftVote/css/donate.css?33">` +
        `<link rel="stylesheet" href="app/WeChat/GiftVote/css/success.css">`
      let link = {}; let style = {}
      link['1'] = `<link href="app/WeChat/GiftVote/css/purple.css?2" rel="stylesheet">`
      style['1'] = `<style> .vsavz{margin-bottom:0px} .zuanlist ul{color:white} .divmain10 .divcon{margin-top:0px;padding-top:20px;color:#FFF;} .weui-panel__bd{margin-bottom:-10px} .num_box{background-color:#4b00a7} </style>`
      link['2'] = `<link href="app/WeChat/GiftVote/css/yellow.css?23" rel="stylesheet">`
      style['2'] = `<style> .vsavz{margin-bottom:0px} .zuanlist ul{color:white} .divmain10 .divcon{margin-top:0px;padding-top:20px;color:#FFF;} .weui-panel__bd{margin-bottom:-10px} .num_box{background-color:#fd9f00} .cl-yellow{color:white !important;} .zuanlist ul li span{color:#fff} </style>`
      link['4'] = `<link href="app/WeChat/GiftVote/css/blue.css" rel="stylesheet"> `
      style['4'] = `<style> .vsavz{margin-bottom:0px} .zuanlist ul{color:white} .divmain10 .divcon{margin-top:0px;padding-top:20px;color:#FFF;} .weui-panel__bd{margin-bottom:-10px} .num_box,.user_info{background-color:#0955ff} .cl-yellow{color:white !important;} .zuanlist ul li span{color:#fff} .num_box .num_box_ul,.divbotuser h2{background-color:#0955ff} .add .i{color:white;background:#28b6f6;border:4px solid #0955ff} .zuanlist{margin-bottom:-40px } @-webkit-keyframes heartbborder{ 0% {border:4px solid #0955ff;} 20% {border:3px solid #0955ff;} 40% {border:2px solid #0955ff;} 60% {border:3px solid #0955ff;} 80% {border:4px solid #0955ff;} 100% {border:3px solid #0955ff;} } </style>`
      link['5'] = `<link href="app/WeChat/GiftVote/css/index2.css" rel="stylesheet">`
      style['5'] = `
      <style>
      .swiper-container .swiper-pagination-bullet-active{ background-color:#${config.main_color}; }
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
      link['3'] = ``
      style['3'] = `::-webkit-input-placeholder{color:#${config.text_color}}
        .add .i,.divbottommenu .divitem,.divview2,.num_box .num_box_ul li span,.day,body,.content .list_box li a.vote,.num_box .join_us a:link, .num_box .join_us a:visited,.divmain11 .divsub,.content .list_box li p,.paihang1 .divtxt,.paihang1 .divtxt,.paihang1 .divtxt,.paihang2 .datalist .tops .item2,.vbtn_tnk a:link,.vbtn_tnk a:visited,.divbaoming4 .dlist1,.fd_list2,.baomingtxt,.btn_bg_green,.time-item strong,.donate_money_edit_text span,.weui-btn_primary,.weui-media-box__desc{color:#${config.text_color}}
        body,.divbottommenu,.num_box,.num_box_ul,.time-item strong,.content,.macol,.divmain10,.paihang2,.zuanlist,.add .i,.divmain11 .inputtxt,.num_box .num_box_ul,.divbotuser h2,.divmain11{background:#${config.back_color}}
        .vbtn_tnk,.paihang1 .divtxt,.num_box .join_us,.content .list_box li a.vote,.btn_bg_green,.weui-btn_primary,.content .list_box li>div{background:#${config.button_color}}
        .content .list_box li a.vote{border:1px solid #${config.text_color}}
        #mar{background-color:#${config.button_color}}
        #maa{color:#${config.text_color}}
        .divmain11 .inputtxt{width:69%}
        #pcount{background:#${config.back_color}} `
      // console.log(' link, style: ', link, style)
      this.styleColor = common + link[config.zdy_color] + style[config.zdy_color]
      // console.log(this.styleColor, config.zdy_color)
    }
  },
  destroyed () {}
}
</script>

<style lang='scss'>
@import '@/mixins/_utils.scss';

</style>
