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
        <!-- <li><a  @click="clickNav('Vsignup')" :class="{on: currentComponent == 'Vsignup'}">
            <div class='nav'>
              <div class='ib ispr iconfont icon-baoming'></div>
              <p>报名</p>
            </div>
          </a></li> -->
        <li><a @click="clickNav('Vcomplaint')" :class="{on: currentComponent == 'Vcomplaint'}">
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

export default {
  components: {},
  props: ['curComp'],
  data () {
    return {
      currentComponent: this.curComp
    }
  },
  computed: {},
  watch: {
    curComp (val) {
      this.currentComponent = val
    }
  },
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
      this.$parent.handleSchedule(name)
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
