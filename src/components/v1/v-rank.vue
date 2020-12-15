<template>
  <div class=''>
    <div class="rankp">最新排名</div>
    <div class="paihang2 pd-10 bg-purple3 bg-blue3">
      <ul>
        <li >
          <span>排名 </span>
          <span style="text-align:center;padding-left:0px">选手 </span>
          <span>票数 </span>
        </li>
        <a :href="item['url']"
        @click="clickItem(item)"
           v-for="(item,i) in rankList"
           :key="i">
          <li><span v-text="i < 2 ? ''  : i+1"></span>
            <span><img v-lazy="item['img1']"><i>{{item['name']}}</i></span>
            <span>{{item['votenum']}}</span></li>
        </a>
      </ul>

    </div>
    <div id="list_more"
    @click="getList()"
         class="box"
         style="margin-top: 16px; text-align: center;margin-bottom: 40px;"><span class="am-text-secondary">{{getListText}}</span></div>
  </div>
</template>

<script>
/**
* @fileName v-rank.vue
* @author ylf
* @description
* @date 2020/07/08 23:17:36
*/

export default {
  components: {},
  props: ['player', 'curPlayer', 'params'],
  data () {
    return {
      rankList: [],
      getListText: '点击加载数据'
    }
  },
  computed: {},
  watch: {
    player (val) {
      // console.log({ val })
      this.rankList = val
    }
  },
  created () {
    this.$parent.getData(this.params.vid, 'vote', 1)
  },
  mounted () {

  },
  methods: {
    getList () {
      let { currentPage, totalPages } = this.curPlayer
      // console.log('currentPage: ', currentPage)
      currentPage += 1

      if (currentPage === totalPages || currentPage === totalPages) {
        setTimeout(() => {
          this.getListText = '没有更多记录！'
        }, 600)
      }
      if (currentPage > totalPages) return false
      this.$parent.getData(this.params.vid, 'vote', currentPage)
    },
    clickItem (item) {
      this.$parent.goDetails(item)
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
