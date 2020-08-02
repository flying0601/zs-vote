<template>
<div class="body" :style="`background-image: url('app/WeChat/GiftVote/img/xbbg.jpg');`">
<div class="close-pages">
    <!-- 头部信息 -->
    <div class="close-head" :style="`background-image: url('app/WeChat/GiftVote/img/xb_one.png');`">
      <div class="head-tit">
        <p>活动已结束</p>
        <p>-热烈祝贺-</p>
      </div>
      <div class="topHead">
        <div>
          <div class="headImg-con">
            <img class="headImg"
              :src="onePlayer && onePlayer.avatar"
              alt="">
          </div>
        </div>
      </div>
      <div class="close-head-btom">
        <span style="">{{onePlayer &&  onePlayer.name}}</span>
        <span>获得第一名</span>
      </div>
    </div>
    <!-- 内容部分信息 -->
    <div class="close-body">
      <ul class="close-body-con">
        <li class="close-clears close-menu" v-for="(item,i) in rankList" :key="i">
          <img v-if="i<3" class="rankNumber close-fl" :src="`app/WeChat/GiftVote/img/rank_${i+1}.png`" alt="">
          <div v-else class="rankNumber close-fl tc">{{i+1}}</div>
          <div class="close-fl close-con close-clears">
            <img class="userHeadImg "
              :src="item.avatar"
              alt="">
            <p class="colse-right userNames">{{item.name}}</p>
          </div>
          <div class="close-fr pollCount">{{item.votenum}}赞</div>
        </li>
      </ul>
    </div>
  </div>

</div>

</template>

<script>
/**
* @fileName v-over.vue
* @author ylf
* @description
* @date 2020/07/30 23:21:00
*/

export default {
  components: {},
  props: ['player', 'params'],
  data () {
    return {
      rankList: this.player || [],
      onePlayer: this.player[0]
    }
  },
  computed: {},
  watch: {
    player (val) {
      console.log({ val })
      this.rankList = val
      this.onePlayer = val && val[0]
    }
  },
  created () {
    this.$parent.getData(this.params.vid, 'vote', 1)
    console.log('rankList', this.rankList)
  },
  mounted () {

  },
  methods: {

  },
  destroyed () {}
}
</script>

<style lang='scss' scoped>
@import '@/mixins/_utils.scss';

</style>
<style>

    .close-clears:after {
      display: block;
      content: ".";
      height: 0;
      line-height: 0;
      overflow: hidden;
      visibility: hidden;
      clear: both;
    }

    .close-fl {
      float: left;
    }

    .close-fr {
      float: right;
    }

    .body {
      background: url(http://sylm.huodong.identitys.cn/static/blue/images/xbbg.jpg) 0 0 repeat-y;
      background-size: 100%;
      width: 100%;
      height: auto;
      z-index: -2;
    }

    /*头部内容*/
    .close-head {
      max-width: 338px;
      height: 300px;
      vertical-align: middle;
      color: #fff;
      position: relative;
      margin: 0 auto;
      color: #fff;
      background: url(http://sylm.huodong.identitys.cn/static/blue/images/xb_one.png);
      background-size: 100%;
      z-index: 0;
    }

    /*.close-head >img{
            width: 100%;
            height: 100%;
            vertical-align: middle;
        }*/
    .head-tit {
      text-align: center;
      position: absolute;
      top: 25px;
      left: 0;
      width: 100%;
    }

    .head-tit>p:first-child {
      font-size: 18px;
      letter-spacing: 3px;
      margin-bottom: 10px;
    }

    .head-tit>p:last-child {
      font-size: 22px;
      letter-spacing: 8px;
      font-weight: bold;
    }

    .topHead {
      position: absolute;
      text-align: center;
      top: 108px;
      width: 100%;
    }

    .headImg-con {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      margin: 2px auto;
      background: #fff;
    }

    .headImg-con>img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
      border-radius: 50%;
    }

    .topHead>div {
      border-radius: 50%;
      width: 60px;
      height: 60px;
      text-align: center;
      border: 1px solid #fde49f;
      margin: 0 auto;
    }

    .close-head-btom {
      position: absolute;
      left: 0;
      top: 182px;
      text-align: center;
      width: 100%;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 1px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .close-head-btom>span:first-child {
      color: #ffd752;
      margin-right: -5px;
    }

    /*排行内容*/
    .close-body {
      width: 100%;
      margin-top: -96px;
      padding: 10px 11px 20px;
      box-sizing: border-box;
    }

    .close-body-con {
      background-color: #fff;
      border-radius: 10px;
      min-height: 100px;
      padding: 10px 11px 20px;
    }

    .rankNumber,
    .rankNum {
      width: 30px;
      margin-right: 20px;
    }

    .rankNumber {
      margin-top: 7px;
    }

    .rankNum {
      text-align: center;
      line-height: 33px;
      margin-top: 4px;
    }

    .userHeadImg,
    .colse-right {
      float: left;
    }

    .userHeadImg {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 9px;
    }

    .close-body-con li {
      border-bottom: 1px solid #e4e4e4;
      padding: 5px 0px;
    }

    .pollCount {
      color: #FFBA00;
      line-height: 40px;
    }

    .pollCount,
    .colse-right {
      font-size: 14px;
    }

    .colse-right {
      width: calc(100% - 55px);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 40px;
    }

    .close-con {
      width: calc(100% - 120px);
    }

    @media screen and (max-width: 320px) {
      .close-body {
        margin-top: -103px;
      }

      .topHead {
        top: 102px;
      }

      .close-head-btom {
        top: 176px;
      }
    }
</style>
