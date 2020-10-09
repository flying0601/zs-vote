<template>
  <div class=''>
    <div class="num_box">
      <ul class="num_box_ul bg-purple2 bg-blue2">
        <li><span class="text"><i class="glyphicon glyphicon-paperclip"></i> 参与选手</span> <span v-text="censusData.playernum">123</span></li>
        <li><span class="text"> <i class="glyphicon glyphicon-thumbs-up"></i> 累计投票</span> <span v-text="censusData.votenum">1235</span></li>
        <!-- <li><span class="text"><i class="glyphicon glyphicon-eye-open"></i> 分享量</span> <span id="sahrec">{wzx:$giftvote.sharecount|default=0}</span></li> -->
        <li><span class="text"><i class="glyphicon glyphicon-fire"></i> 访问量</span> <span v-text="Number(censusData.pvcount)  + Number(giftvote.pv) + Number(giftvote.config.virtualpv)">456</span></li>

      </ul>

      <div class="time-item5">
        <i class="glyphicon glyphicon-time"></i>
        投票日期: {{giftvote.votestarttime*1000|format('YYYY-MM-DD')}}到 {{giftvote.voteendtime*1000|format('YYYY-MM-DD')}}
      </div>
      <div class="time-item5">
        <i class="glyphicon glyphicon-time"></i>
        <span v-html="dateShow"></span>
        <!-- 活动剩余: <span id="day_show">0天</span>
        <span id="hour_show">0时</span>
        <span id="minute_show">0分</span>
        <span id="second_show" :key="secondShow" v-html="secondShow">0秒</span> -->

      </div>

      <span>

        <div class="divmain11 clearfix bg-purple3 bg-blue3">
          <input type="text"
                 value=""
                 name="sci"
                 placeholder="请输入编号或姓名"
                 v-model="searchKey"
                 class="inputtxt">
          <div class="divsub" @click="clickSearch()"><i class="glyphicon glyphicon-search"></i>&nbsp;&nbsp;搜索</div>
        </div>

        <div class="threebutton">
          <a @click="toModule('Vrank')"><span>规则/奖品</span></a>
          <a @click="toModule('VAward')"><span>比赛排名</span></a>

          <a @click="toSignup()"> <span>{{meBtn}}</span></a>

        </div>

      </span>
    </div>
    <div class="twobutton">
      <a @click="clickTab(item,i)"
      v-for="(item,i) in navTab"
      :key="i"
      :class="{active:selTab==item.value}">
        {{item.label}}
      </a>
    </div>
    <section class="content bg-purple3 bg-blue3 bg-bw"
             id="toupiao">
      <div id="pageCon"
           style="padding-bottom: 10px">
        <ul class="list_box clearfix"
            id="list_box"
            style="position: relative;">
          <li class="picCon"
              v-for="(item,i) in votePlayer"
              :key="i"
              :style="item['effect']" @click="clickItem(item)">
            <div><i class="number">{{item['noid']}}号</i>
              <a :href="item['url']"
                 class="img"><img :src="item['img1']"></a>
              <div class="clearfix">
                <p style="overflow: hidden;text-overflow: ellipsis; white-space: nowrap;">{{item['name']}}</p>
                <p style="text-align:left;margin-top:10px"><a :href="item['url']"
                     class="vote"
                     style="display:inline-block;width:84px;border:1px solid #585656;color:#585656;background:#fff;">投票</a><span style="color:red;font-size:16px;float:right;margin-right:5px">{{item['votenum']}}票</span></p>
              </div>
            </div>
          </li>
        </ul>
        <div id="list_more"
             class="box cl-white"
             style="margin-top: 16px; text-align: center;margin-bottom: 40px;"><span class="am-text-secondary"
                @click="getList()">{{getListText}}</span></div>
      </div>
    </section>
    <div style="clear:both;"></div>

    <div class="divmain10 pd-10 bg-purple4 bg-blue4">
      <div class="tabtitle macol bg-purple4 bg-blue4">
        <div class="bg-purple5 bg-blue5 cl-yellow"
             style="width:40%; border-radius:20px; height:36px; line-height:36px;margin:0 auto; text-align:center;">活动规则</div>
      </div>
      <div class="divcon" v-html="html">

      </div>

    </div>
  </div>
</template>

<script>
/**
* @fileName v-index.vue
* @author ylf
* @description
* @date 2020/07/05 00:06:32
*/
// import $ from 'jquery'
// import Bus from '@/utils/Bus.js'
export default {
  components: { },
  props: ['giftvote', 'player', 'curPlayer', 'params', 'meBtn'],
  data () {
    return {
      votePlayer: [],
      html: '',
      dateShow: '',
      navTab: [{ label: '人气选手', value: 'vote' }, { label: '最新参与', value: 'new' }],
      selTab: 'vote',
      censusData: {
        pvcount: 0,
        votenum: 0,
        playernum: 0
      },
      getListText: '查看更多',
      searchKey: null
    }
  },
  computed: {
  },
  watch: {
    player (val) {
      this.votePlayer = val
    }
  },
  beforeCreate () {

  },
  created () {
    // console.log(this.giftvote.eventrule, 'eventrule')
    this.$parent.getData(this.params.vid, 'vote', 1)
  },
  mounted () {
    let { voteendtime } = this.giftvote
    let curTime = Math.round(new Date() / 1000)
    this.timer(voteendtime - curTime)

    // console.log(this.giftvote.eventrule, 'giftvote.eventrule')
    this.giftvote && (this.html = this.escape2Html(this.giftvote.eventrule))
    // console.log(this.html, 'this.html')
    this.getCensus()
  },
  methods: {
    timer (date) {
      let _this = this
      var intDiff = parseInt(date)// 倒计时总秒数量
      intDiff *= 10

      window.setInterval(function () {
        var day = 0
        var hour = 0
        var minute = 0
        var second = 0// 时间默认值
        // let mini = 0
        if (intDiff > 0) {
          day = Math.floor(intDiff / (60 * 600 * 24))
          hour = Math.floor(intDiff / (60 * 600)) - (day * 24)
          minute = Math.floor(intDiff / 600) - (day * 24 * 60) - (hour * 60)
          second = Math.floor(intDiff) - (day * 24 * 60 * 600) - (hour * 60 * 600) - (minute * 600)
          second /= 10
          second = second.toFixed(1)
        }
        if (minute <= 9) minute = '0' + minute

        // $('#day_show').html(day + '天')
        // $('#hour_show').html('<s id="h"></s>' + hour + '时')
        // $('#minute_show').html('<s></s>' + minute + '分')
        //  $('#second_show').html('<s></s>' + second + '秒')
        // _this.secondShow = '<s></s>' + second + '秒'
        _this.dateShow = ` 活动剩余: <span id="day_show">${day || 0}天</span>
        <span id="hour_show"><s id="h"></s>${hour || 0}时</span>
        <span id="minute_show"><s></s>${minute || 0}分</span>
        <span id="second_show"><s></s>${second || 0}秒</span>`
        intDiff--
      }, 100)
    },
    escape2Html (str) {
      const arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' }
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
    },
    clickItem (item) {
      this.$parent.goDetails(item)
    },
    clickTab (item, i) {
      this.selTab = item.value
      this.$parent.getData(this.params.vid, item.value, 1)
    },
    toModule (name) {
      this.$parent.handleSchedule(name)
    },
    getList () {
      let { currentPage, totalPages } = this.curPlayer
      currentPage += 1

      if (currentPage === totalPages || currentPage === totalPages) {
        setTimeout(() => {
          this.getListText = '没有更多记录！'
        }, 600)
      } else {
        this.getListText = '查看更多'
      }
      if (currentPage > totalPages) return false
      this.$parent.getData(this.params.vid, 'vote', currentPage)
    },
    clickSearch () {
      let { searchKey } = this
      console.log('searchKey', searchKey)
      if (searchKey) {
        this.$parent.getData(this.params.vid, 'vote', 1, searchKey)
        let { votePlayer } = this
        if (votePlayer && votePlayer.length === 0) {
          this.getListText = '没有搜索到内容！'
        } else {
          this.getListText = '没有更多记录！'
        }
      } else {
        this.$parent.getData(this.params.vid, 'vote', 1)
      }
    },
    getCensus () {
      let pram = {
        vid: this.params.vid
      }
      this.$api.getCensus(pram).then(res => {
      // if (!res) return
        this.censusData = res.data
        // console.log('getCensus', pram.vid, res.data)
      })
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
