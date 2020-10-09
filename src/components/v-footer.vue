<template>
<div>
  <div style="height:50px;"></div>
    <div class="footer">
      <ul>
        <li><a @click="clickNav('VIndex')"  :class="{on: currentComponent == 'VIndex'}">
            <div class='nav'>
              <div class='ih ispr iconfont icon-shouye'></div>
              <p>首页</p>
            </div>
          </a>
        </li>
        <li><a @click="clickNav('Vrank')" :class="{on: currentComponent == 'Vrank'}">
            <div class='nav'>
              <div class='if ispr iconfont icon-hangyepaiming'></div>
              <p>排名</p>
            </div>
          </a></li>

        <li><a  @click="clickNav('VAward')" :class="{on: currentComponent == 'VAward'}">
            <div class='nav'>
              <div class='is ispr iconfont icon-jiangpin'></div>
              <p>奖品</p>
            </div>
          </a></li>
        <li v-if="!meData"><a  @click="clickNav('Vsignup')" :class="{on: currentComponent == 'Vsignup'}">
            <div class='nav'>
              <div class='ib ispr iconfont icon-baoming'></div>
              <p>报名</p>
            </div>
          </a></li>
        <li v-else>
          <a @click="clickNav('VDetails')" :class="{on: currentComponent == 'VDetails' && meOpenid==voteuser.openid}">
            <div class='nav'>
          <div class='ic ispr iconfont icon-wode '></div><p>我的</p></div></a>
        </li>
        <li><a @click="clickNav('Vcomplaint')" :class="{on: currentComponent == 'Vcomplaint' }">
            <div class='nav'>
              <div class='is ispr'
                  id="zanzhu2" :style="`background-image: url('app/WeChat/GiftVote/img/ts.png');`"></div>
              <p>投诉</p>
            </div>
          </a></li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
* @fileName v-footer.vue
* @author ylf
* @description
* @date 2020/07/05 00:06:32
*/
import Vue from 'vue'
import Cookies from 'js-cookie'
import Toast from 'vant/lib/toast'
import 'vant/lib/toast/style'
import dataFormat from '@/assets/js/format-time.js'
// import Bus from '@/utils/Bus.js'
Vue.use(Toast)
export default {
  components: {},
  props: ['curComp', 'giftvote', 'meData', 'voteuser'],
  data () {
    return {
      currentComponent: this.curComp,
      meOpenid: Cookies.get('openid')
    }
  },
  computed: {},
  watch: {
    curComp (val) {
      this.currentComponent = val
      if (val === 'VDetails') {
        this.$parent.getMeInfo()
      }
    }
  },
  created () {
    // let _this = this
    // Bus.$on('toSignup', (data) => {
    //   // 一些操作，message就是从top组件传过来的值
    //   // console.log('toSignup', data)
    //   let openid = _this.meData && _this.meData.openid
    //   if (_this.meOpenid.includes(openid)) {
    //     _this.clickNav('VDetails')
    //   } else {
    //     _this.clickNav('Vsignup')
    //   }
    // })
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
      if (name === 'Vsignup') {
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
    },
    // 弃用
    isToSignup () {
      let openid = this.meData && this.meData.openid
      if (this.meOpenid.includes(openid)) {
        this.clickNav('VDetails')
      } else {
        this.clickNav('Vsignup')
      }
    }

  },
  destroyed () { }
}
</script>

<style lang='scss'>
@import "@/mixins/_utils.scss";
#zanzhu2 {
  background-repeat: no-repeat;
  background-size: 19px 19px;
  background-position: 0px 4px;
}
</style>
