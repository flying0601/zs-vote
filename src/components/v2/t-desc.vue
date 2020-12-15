<template>
  <div class="active-info">
    <div class="info-area"
         v-if="isDesc &&  isDesc.info">
      <div class="item"
           style="border-right: 2px solid #f5de9b">
        <div class="item_count"
             v-text="censusData.playernum">71</div>
        <div>参与者</div>
      </div>
      <div class="item"
           style="border-right: 2px solid #f5de9b">
        <div class="item_count"
             v-text="censusData.votenum">146514</div>
        <div>投票数</div>
      </div>
      <div class="item">
        <div class="item_count"
             v-text="Number(censusData.pvcount)  + Number(giftvote.pv) + Number(giftvote.config.virtualpv)">182212</div>
        <div>访问量</div>
      </div>
    </div>
    <div class="count-down"
         v-if="isDesc && isDesc.count">
      <i class="fa fa-clock-o"
         aria-hidden="true">
      </i>
      <span v-html="dateShow"></span>
      <!-- 投票结束倒计时<span class="count-down-num"
            id="day_show">0</span>日
      <span class="count-down-num"
            id="hour_show">3</span>时
      <span class="count-down-num"
            id="minute_show">51</span>分
      <span class="count-down-num"
            id="second_show">05</span>秒 -->
    </div>
    <div class="activity-time"
         v-if="isDesc && isDesc.time">
      <div class="activity-time-content">
        <h4>
          <i class="fa fa-clock-o"
             aria-hidden="true"></i>
          报名时间:{{giftvote.apstarttime*1000|format('YYYY-MM-DD HH:mm')}} 起
        </h4>
        <h4><i class="fa fa-clock-o"
             aria-hidden="true"></i>
          活动开始:{{giftvote.votestarttime*1000|format('YYYY-MM-DD HH:mm')}} 始</h4>
        <h4><i class="fa fa-clock-o"
             aria-hidden="true"></i>
          活动截止:{{giftvote.voteendtime*1000|format('YYYY-MM-DD HH:mm')}} 止
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
/**
* @fileName t-desc.vue
* @author ylf
* @description
* @date 2020/10/25 11:30:14
*/

export default {
  props: ['giftvote', 'isDesc', 'params'],
  components: {},
  data () {
    return {
      dateShow: '',
      censusData: {
        pvcount: 0,
        votenum: 0,
        playernum: 0
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCensus()
  },
  mounted () {
    let { voteendtime } = this.giftvote
    let curTime = Math.round(new Date() / 1000)
    this.timer(voteendtime - curTime)
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
        // _this.dateShow = ` 活动剩余: <span id="day_show">${day || 0}天</span>
        // <span id="hour_show"><s id="h"></s>${hour || 0}时</span>
        // <span id="minute_show"><s></s>${minute || 0}分</span>
        // <span id="second_show"><s></s>${second || 0}秒</span>`
        _this.dateShow = `投票结束倒计时<span class="count-down-num"
            id="day_show">${day || 0}</span>日
      <span class="count-down-num"
            id="hour_show">${hour || 0}</span>时
      <span class="count-down-num"
            id="minute_show">${minute || 0}</span>分
      <span class="count-down-num"
            id="second_show">${second || 0}</span>秒`
        intDiff--
      }, 100)
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
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
