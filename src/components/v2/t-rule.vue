<template>
  <div class="">
    <t-title :giftvote="giftvote"></t-title>
    <t-desc :giftvote="giftvote"
            :isDesc="{info:false,count:false,time:true}"
            :params="params"></t-desc>
    <div class="trade">
      <div class="trade-content"
           v-html="html"
           v-lazy-container="{ selector: 'img' ,error: 'resource/common/nodata.png', loading: 'resource/common/loading.gif' }"></div>
    </div>
    <div class="special-version">
      <div class="special-version-title">特别说明</div>
      <div class="special-version-remark">备注：由于客户点击量过高，活动结束系统票数会延迟2分钟</div>
      <div class="special-version-content">
        本次活动真实有效公平公正，选手免费报名，绝不收取选手任何费用，请选手放心参与！系统里自带礼物功能属于第三方插件，本次活动意在宣传推广，我们不提倡赠送功能，所有功能属自愿行为，购买后无法退款，与主办方无关！
      </div>
    </div>

    <div class="select-mean">
      <div class="select-mean-title">
        评选意义
      </div>
      <div class="select-mean-content">
        <p>1、选手在参赛过程，将有数十万人看到你的店铺门面照片以及你的经营范围，将给你的宣传带来很大的帮助。</p>
        <p>2、获奖选手拥有更多的展示机会</p>
        <p>3、整合选手资源，提高选手互动和资源共享，达到共赢</p>
        <p>本活动免费参加，只要你觉得自己的颜值够高，信誉够好那就赶紧报名参赛吧！</p>
      </div>
    </div>

    <div class="platform">
      <div class="platform-welfare-title">平台福利</div>
      <div class="platform-welfare">
        <div class="platform-welfare-content">
          凡开启活动后每天排名第一名选手免费赠送 <span>价值2000元的首页顶部滚轴广告推广一天，</span>活动中以每天上午 10:30为准确开始更新。更强有力地增加选手曝光度和知名度！！！
        </div>
      </div>
    </div>

  </div>

</template>

<script>
/**
* @fileName v-award.vue
* @author ylf
* @description
* @date 2020/10/25 12:11:22
*/
import TTitle from '@/components/v2/t-title.vue'
import TDesc from '@/components/v2/t-desc.vue'
import replaceAllImg from '@/utils/replaceAllImg.js'

export default {
  props: ['giftvote', 'params'],
  components: {
    TTitle,
    TDesc
  },
  data () {
    return {
      html: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.giftvote && (this.html = this.escape2Html(this.giftvote.eventrule))
  },
  mounted () {

  },
  methods: {
    escape2Html (str) {
      const arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' }
      // console.log(replaceAllImg(str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })))
      return replaceAllImg(str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] }))
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
<style>
.trade img {
  max-width: 100%;
}

.trade-content {
  font-family: PingFang-SC-Medium;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: 0px;
  color: #feeabf;
}

.trade {
  width: 85%;
  margin: 0 auto;
}

.time {
  width: 260px;
  background-color: #2a2a2a;
  border-radius: 3px;
  border: solid 1px #f9c787;
  font-family: PingFang-SC-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #feeabf;
  padding: 40px;
  margin: 0 auto;
}

.special-version {
  width: 344px;
  background-color: #2a2a2a;
  border-radius: 3px;
  border: solid 1px #f9c787;
  margin: 0 auto;
  padding-bottom: 20px;
}

.special-version-title {
  width: 235px;
  height: 38px;
  background-image: linear-gradient(
      90deg,
      #d9b787 0%,
      #e7b77a 0%,
      #f4b66d 0%,
      #f9d197 45%,
      #feebc1 100%
    ),
    linear-gradient(#ffcf83, #ffcf83);
  background-blend-mode: normal, normal;
  border-radius: 0px 0px 10px 10px;
  font-family: PingFang-SC-Bold;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #000000;
  margin: 0 auto;
  line-height: 38px;
  text-align: center;
}

.special-version-remark {
  width: 325px;
  height: 23px;
  background-color: #dc3d2a;
  border-radius: 3px;
  font-family: PingFang-SC-Medium;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #feeabf;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

.special-version-content {
  width: 317px;
  height: 84px;
  font-family: PingFang-SC-Medium;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: 0px;
  color: #feeabf;
  margin: 0 auto;
}

.platform-welfare {
  width: 304px;
  background-color: #f9daa1;
  border-radius: 3px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
}

.platform-welfare-content {
  width: 313px;
  height: 68px;
  font-family: PingFang-SC-Medium;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: 0px;
  color: #000000;
}

.platform-welfare-content span {
  font-family: PingFang-SC-Bold;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #ff0000;
}

.platform-welfare-title {
  height: 18px;
  font-family: FZZDHJW--GB1-0;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: -1px;
  color: #feeabf;
  text-align: center;
  margin-top: 20px;
}

.select-mean-title {
  text-align: center;
  height: 19px;
  font-family: FZZDHJW--GB1-0;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: -1px;
  color: #feeabf;
  margin-top: 20px;
}

.select-mean-content {
  width: 317px;
  height: 156px;
  font-family: PingFang-SC-Medium;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: 0px;
  color: #feeabf;
  margin: 0 auto;
}
</style>
