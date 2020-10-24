<template>
<div class=''>
  <remote-css cdn="static/css/index.css"></remote-css>
<div class="tit">
      <h3 class="content">
        不要动
      </h3>
    </div>
    <div class="active-info">
      <div class="info-area">
        <div class="item" style="border-right: 2px solid #f5de9b">
          <div class="item_count">5</div>
          <div>参与者</div>
        </div>
        <div class="item" style="border-right: 2px solid #f5de9b">
          <div class="item_count">980</div>
          <div>投票数</div>
        </div>
        <div class="item">
          <div class="item_count">1324</div>
          <div>访问量</div>
        </div>
      </div>

      <div class="time">
        <i class="fa fa-clock-o" aria-hidden="true">
        </i>投票结束倒计时
        <span class="red" id="day_show">5</span>日
        <span class="red" id="hour_show">5</span>时
        <span class="red" id="minute_show">29</span>分
        <span class="red" id="second_show">21</span>秒
      </div>
      <div class="item-content">
        <div class="item-area1">
          <div class="text-area1">
            <h4>
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              报名时间:2020-09-19 08:00 起
            </h4>
            <h4><i class="fa fa-clock-o" aria-hidden="true"></i>
              活动开始:2020-09-19 08:00 始</h4>
            <h4><i class="fa fa-clock-o" aria-hidden="true"></i>
              活动截止:2020-09-24 22:00 止
            </h4>
          </div>
        </div>
      </div>
    </div>
    <a class="baoming-btn" href="">
      <img src="static/img/apply.png" alt="我要报名" style="width: 18px">
      <h4 style="margin-left: 8px">我要报名</h4>
    </a>
    <div class="search-area">
        <input value="" type="text" placeholder="输入编号或者选手名称" id="keyword" name="keyword">
        <button id="sosuo" class="button-search">搜索</button>
      </div>
    <div id="user-list" class="user-list">
        <div class="user-item">
          <a href="./details.html">
            <div class="noneimg">
              <div class="rankimg">
                1
              </div>
              <div class="vote_number">
                218票
              </div>
              <div class="apply_name">
                贵州鸿达万益工程机械设备租赁有限公司
              </div>
            </div>
            <div style="height: 30px">

            </div>
          </a><a class="vote-button">
            <div class="apply_number">2号</div>
            <div class="vote">投票</div>
          </a>

        </div>
        <div class="user-item">
          <a href="player/oqXLbDJEWjxjK3kZ">
            <div class="noneimg">
              <div class="rankimg">
                2
              </div>
              <div class="vote_number">
                202票
              </div>
              <div class="apply_name">
                罗甸县鑫宝工程机械设备租赁有限公司
              </div>
            </div>
            <div style="height: 30px">

            </div>
          </a><a class="vote-button">
            <div class="apply_number">4号</div>
            <div class="vote">投票</div>
          </a>

        </div>
        <div class="user-item">
          <a href="player/yJ672Dpzg2RYvmpO">
            <div class="noneimg">
              <div class="rankimg">
                3
              </div>
              <div class="vote_number">
                194票
              </div>
              <div class="apply_name">
                黔西宏睿工程机械租赁有限公司
              </div>
            </div>
            <div style="height: 30px">

            </div>
          </a><a class="vote-button">
            <div class="apply_number">6号</div>
            <div class="vote">投票</div>
          </a>

        </div>
        <div class="user-item">
          <a href="player/89GKyD1agrDEaXO5">
            <div class="noneimg">
              <div class="four">
                4
              </div>
              <div class="vote_number">
                188票
              </div>
              <div class="apply_name">
                贵州国平工程机械设备租赁有限公司
              </div>
            </div>
            <div style="height: 30px">

            </div>
          </a><a class="vote-button">
            <div class="apply_number">5号</div>
            <div class="vote">投票</div>
          </a>

        </div>
        <div class="user-item">
          <a href="player/wWJZVPXEbJRM6Yl4">
            <div class="noneimg">
              <div class="four">
                5
              </div>
              <div class="vote_number">
                178票
              </div>
              <div class="apply_name">
                贵州意鼎工程机械租赁有限公司
              </div>
            </div>
            <div style="height: 30px">

            </div>
          </a><a class="vote-button">
            <div class="apply_number">3号</div>
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

export default {
  components: {
    'remote-css': {
      render (h) {
        return (<link rel='stylesheet' type='text/css' href={this.cdn} />)
      },
      props: {
        cdn: {
          type: String,
          required: true
        }
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {},
  created () {

  },
  mounted () {
    // this.init()
  },
  methods: {

  },
  destroyed () {}
}
</script>

<style lang='scss' scoped>
@import '@/mixins/_utils.scss';
.time {
  width: 94%;
  height: 38px;
  background-image: linear-gradient(90deg,
      #d9b787 0%,
      #e7b77a 0%,
      #f4b66d 0%,
      #f9d197 45%,
      #feebc1 100%),
    linear-gradient(#ffffff,
      #ffffff);
  background-blend-mode: normal,
    normal;
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
  text-align: right ;
}

</style>
