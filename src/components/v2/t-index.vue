<template>
  <div class=''>
    <t-title :giftvote="giftvote"></t-title>
    <div v-if="todayObj"
         v-show="isToDay"
         style="position: relative;margin: 0 auto;text-align: center">
      <img src="static/img/starbg.png"
           style="width: 344px;max-width: 100%"
           alt=""
           @load="isToDay=true">
      <div style="position: absolute;bottom: 50px;width: 100%;font-size: 16px;font-weight: bold;color: #fefcf5;">
        {{todayObj.name}}
      </div>
      <div style="position: absolute;bottom: 24px;width: 100%;font-size: 15px;font-weight: bold;color: #fefcf5;">
        选手编号：{{todayObj.noid}}
      </div>
    </div>
    <t-desc :giftvote="giftvote"
            :isDesc="{info:true,count:true,time:true}"
            :params="params"></t-desc>
    <a class="baoming-btn"
       @click="toSignup()">
      <img src="static/img/apply.png"
           :alt="`${meBtn}`"
           style="width: 18px">
      <h4 style="margin-left: 8px">{{meBtn}}</h4>
    </a>
    <div class="search-area">
      <input value=""
             type="text"
             placeholder="输入编号或者选手名称"
             id="keyword"
             v-model="searchKey"
             name="keyword">
      <button id="sosuo"
              @click="clickSearch()"
              class="button-search">搜索</button>
    </div>
    <div id="user-list"
         class="user-list">
      <div class="nodata"
           v-if="votePlayer && votePlayer.length===0"
           v-text="'没有搜索到内容！'"></div>
      <div class="user-item"
           v-for="(item,i) in votePlayer"
           :key="i">
        <a @click="clickItem(item)">
          <div class="noneimg">
            <div :class="i<3 ? 'rankimg' : 'four'">
              {{i+1}}
            </div>
            <div class="vote_number">
              {{item['votenum']}}票
            </div>
            <div class="apply_name">
              {{item['name']}}
            </div>
          </div>
          <div style="height: 30px">

          </div>
        </a><a class="vote-button">
          <div class="apply_number">{{item['noid']}}号</div>
          <div class="vote">投票</div>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
/**
  * @fileName b-index.vue
 * @author ylf
 * @description
  * @date 2020/10/13 22:31:50
*/
import TTitle from '@/components/v2/t-title.vue'
import TDesc from '@/components/v2/t-desc.vue'
export default {
  props: ['giftvote', 'player', 'curPlayer', 'params', 'meBtn'],
  components: {
    TTitle,
    TDesc
  },
  data () {
    return {
      votePlayer: [],
      todayObj: null,
      isToDay: false,
      searchKey: null
    }
  },
  computed: {

  },
  watch: {
    player (val) {
      this.votePlayer = val
      !this.isToDay && this.setToday()
    }
  },
  created () {
    this.$parent.getData(this.params.vid, 'vote', 1)
  },
  mounted () {
    // this.init()

  },
  methods: {
    clickItem (item) {
      this.$parent.goDetails(item)
    },
    setToday () {
      let today = this.giftvote.topimg && this.giftvote.topimg.pic_2
      if (today && today.includes('N')) {
        let todayId = today.split('N')[1]
        // console.log('todayId: ', todayId)
        this.todayObj = this.player.find(function (obj) {
          return obj.id === Number(todayId)
        })
        this.$parent.todayObj = this.todayObj
        // console.log('this.todayObj: ', this.todayObj)
      }
    },
    clickSearch () {
      let { searchKey } = this
      console.log('searchKey', searchKey)
      if (searchKey) {
        this.$parent.getData(this.params.vid, 'vote', 1, searchKey)
      } else {
        this.$parent.getData(this.params.vid, 'vote', 1)
      }
    },
    toSignup () {
      // Bus.$emit('toSignup', 'toSignup')
      this.$parent.parToSignup()
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
.time {
  width: 94%;
  height: 38px;
  background-image: linear-gradient(
      90deg,
      #d9b787 0%,
      #e7b77a 0%,
      #f4b66d 0%,
      #f9d197 45%,
      #feebc1 100%
    ),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  border-radius: 14px;
  line-height: 38px;
  margin: 10px auto;
}

.apply_name {
  font-family: PingFang-SC-Bold;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fde3b4;
  display: block;
  position: absolute;
  top: 50px;
  width: 70%;
  left: 15%;
}

.vote_number {
  position: absolute;
  top: 6px;
  right: 4px;
  font-family: PingFang-SC-Medium;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #feeabf;
  text-align: right;
}
.nodata {
  margin: 1rem auto;
  text-align: center;
  font-size: 1.1rem;
  color: #edd595;
}
</style>
