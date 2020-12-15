<template>
  <div class=''>
    <t-title :giftvote="giftvote"></t-title>
    <t-desc v-if="!isOver"
            :giftvote="giftvote"
            :isDesc="{info:true,count:true,time:true}"
            :params="params"></t-desc>
    <a class="baoming-btn"
       v-if="!isOver"
       @click="toSignup()">
      <img src="static/img/apply.png"
           alt="我要报名"
           style="width: 18px">
      <h4 style="margin-left: 8px">我要报名</h4>
    </a>
    <img src="static/img/order.png?time=2019-12-28"
         style="width: 100%">
    <div class="rank_list">
      <div class="list-head">
        <div class="item"
             style="width: 40px">排名</div>
        <div class="item"
             style="width: 100px">票数</div>
        <div class="item"
             style="flex: 1">参与选手</div>
      </div>
      <div class="list-content">
        <div class="list-head1"
             @click="clickItem(item)"
             v-for="(item,i) in votePlayer"
             :key="i">
          <img v-if="i<3"
               :src="`static/img//no${i+1}.png`"
               alt="">
          <div class="rank"
               v-else
               style="width: 40px;">{{i+1}}</div>
          <div class="ranknum">{{item.votenum}}票</div>
          <div class="rankname">{{item.name}}</div>
        </div>
        <!-- <div class="list-head1">
          <img src="static/img//no2.png"
               alt="">
          <div class="ranknum">5号</div>
          <div class="rankname">温泉一家人宾馆</div>
        </div>
        <div class="list-head1">
          <img src="static/img//no3.png"
               alt="">
          <div class="ranknum">71号</div>
          <div class="rankname">清华池温泉</div>
        </div>
        <div class="list-head1">
          <div class="rank"
               style="width: 40px;">4</div>
          <div class="ranknum">60号</div>
          <div class="rankname">丹东江户城水云间温泉客栈</div>
        </div> -->
      </div>
      <div class="dibu">
        <div class="total-count">
          共{{votePlayer.length}}条数据
        </div>
      </div>
    </div>

  </div>
</template>

<script>
/**
* @fileName t-rank.vue
* @author ylf
* @description
* @date 2020/10/25 14:41:54
*/
import TTitle from '@/components/v2/t-title.vue'
import TDesc from '@/components/v2/t-desc.vue'
export default {
  props: ['giftvote', 'player', 'params', 'isOver'],
  components: {
    TTitle,
    TDesc
  },
  data () {
    return {
      votePlayer: []
    }
  },
  computed: {},
  watch: {
    player (val) {
      this.votePlayer = val
    }
  },
  created () {
    this.$parent.getData(this.params.vid, 'vote', 1)
  },
  mounted () {

  },
  methods: {
    clickItem (item) {
      !this.isOver && this.$parent.goDetails(item)
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
</style>
<style>
.rank_list {
  margin: 10px auto;
  width: 94%;
  border: 3px solid #debb8a;
}

.title img {
  width: 140px;
}

.list-head {
  display: flex;
  padding: 10px 8px;
  background-image: linear-gradient(
      90deg,
      #d9b787 0%,
      #e7b77a 0%,
      #f4b66d 0%,
      #f9d197 45%,
      #feebc1 100%
    ),
    linear-gradient(#231c14, #231c14);
  background-blend-mode: normal, normal;
  color: #000000;
}

.list-head .item {
  text-align: center;
}

.list-head1 {
  color: #feeabf;
  display: flex;
  padding: 5px 8px;
  text-align: center;
  align-items: center;
  height: 35px;
}

.list-content .list-head1:nth-child(odd) {
  background: #000000;
}

.list-content .list-head1:nth-child(even) {
  background: #231c14;
}

.rankvote {
  width: 60px;
}

.rankname {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  text-align: center;
}

.ranknum {
  width: 100px;
}

.list-head1 img {
  width: 35px;
  height: 35px;
}

.rank {
  color: #000000;
  background: #ddbf86;
  border-radius: 8px;
}

.dibu {
  background: #000;
  padding: 18px 0;
}

.total-count {
  text-align: center;
  width: 120px;
  background-color: #feeabf;
  border-radius: 5px;
  color: #000000;
  font-size: 0.9rem;
  line-height: 38px;
  margin: 0 auto;
}
</style>
