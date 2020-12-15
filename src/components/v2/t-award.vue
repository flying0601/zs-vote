<template>
  <div class="">
    <t-title :giftvote="giftvote"></t-title>
    <t-desc :giftvote="giftvote"
            :isDesc="{info:false,count:false,time:true}"
            :params="params"></t-desc>
    <div class="prize">
      <div class="prize-title">
        奖品介绍
      </div>
      <div class="prize-content"
           v-html="giftvote && giftvote.prizemsg && html"
           v-lazy-container="{ selector: 'img' ,error: 'resource/common/nodata.png', loading: 'resource/common/loading.gif' }"></div>
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
    this.giftvote && (this.html = this.escape2Html(this.giftvote.prizemsg))
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
.prize {
  margin: 0 auto;
  margin-top: 23px;
  width: 85%;
  background-color: #2a2a2a;
  border-radius: 3px;
  border: solid 1px #f9c787;
  font-family: PingFang-SC-Medium;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #feeabf;
  padding: 0 14px;
}

.prize-title {
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
  line-height: 38px;
  text-align: center;
  margin: 0 auto;
}

.prize-title img {
  width: 23px;
  height: 23px;
}

.prize-content img {
  width: 100%;
}
</style>
