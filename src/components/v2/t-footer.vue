<template>
  <div class=''>
    <div style="height: 60px"></div>
    <div class="foot">
      <a class="item"
         @click="clickNav('VIndex')">
        <div class="icon">
          <img src="static/img/shouye2.png"
               alt="" />
        </div>
        <div class="text">首页</div>
      </a>
      <a class="item"
         @click="clickNav('VAward')">
        <div class="icon">
          <img src="static/img/jiangpin2.png"
               alt="">
        </div>
        <div class="text">奖品</div>
      </a>

      <a class="item"
         v-if="meData"
         @click="clickNav('VDetails')">
        <div class="icon">
          <img src="static/img/jieshao.png"
               alt="">
        </div>
        <div class="text">我的</div>
      </a>
      <a class="item"
         v-else
         @click="clickNav('VSignup')">
        <div class="icon">
          <img src="static/img/jieshao.png"
               alt="">
        </div>
        <div class="text">报名</div>
      </a>
      <a class="item"
         @click="clickNav('VRank')">
        <div class="icon">
          <img src="static/img/paiming2.png"
               alt="">
        </div>
        <div class="text">排名</div>
      </a>

      <a class="item"
         @click="clickNav('VRule')">
        <div class="icon">
          <img src="static/img/guize.png">
        </div>
        <div class="text">规则</div>
      </a>
    </div>
  </div>
</template>

<script>
/**
* @fileName t-footer.vue
* @author ylf
* @description
* @date 2020/10/14 01:01:56
*/
import Vue from 'vue'
import Toast from 'vant/lib/toast'
import 'vant/lib/toast/style'
import dataFormat from '@/utils/format-time.js'
Vue.use(Toast)
export default {
  components: {},
  props: ['giftvote', 'meData'],
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    clickNav (name) {
      if (name === 'Vcomplaint') {
        let urlParam = window.location.search
        window.location.href = './complaint.html' + urlParam
        return false
      }
      if (name === 'VDetails') {
        this.$parent.goDetails(this.meData)
        return false
      }
      if (name === 'VSignup') {
        let { giftvote } = this
        let { apstarttime, apendtime } = giftvote
        let curTime = Math.round(new Date() / 1000)
        if (curTime < apstarttime) {
          return Toast.loading({
            message: `未开始报名！报名时间为：${dataFormat(giftvote.apstarttime * 1000, 'YYYY-MM-DD HH:mm')}\n至\n${dataFormat(giftvote.apendtime * 1000, 'YYYY-MM-DD HH:mm')}`,
            icon: 'warn-o'
          })
        }
        if (curTime > apendtime) {
          return Toast.loading({
            message: `报名结束了！报名时间为：${dataFormat(giftvote.apstarttime * 1000, 'YYYY-MM-DD HH:mm')}\n至\n${dataFormat(giftvote.apendtime * 1000, 'YYYY-MM-DD HH:mm')}`,
            icon: 'warn-o'
          })
        }
      }
      this.$parent.handleSchedule(name)
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
