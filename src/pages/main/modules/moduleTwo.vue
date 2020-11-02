<template>
  <div class='module-two'>
    <div class="notice">
      <div style="background: rgba(0,0,0,0.6);width: 40px"><img src="static/img/laba.png"
             alt="">
      </div>
      <marquee behavior="scroll "
               direction="left"
               class="scroll"
               id="keyi">
        {{giftvote && giftvote.gonggao}}
      </marquee>
    </div>
    <div style="height: 35px;"></div>

    <audio id="bgmusic"
           src="http://srkcz.oss-cn-hangzhou.aliyuncs.com/audio/2020/09/19/v2pEVlFqV6DBis3C37xOvmROb4ZUvFyP4RCsB3WY.mpga"
           loop="loop"
           autoplay="autoplay"></audio>

    <audio id="bgmusic1"
           src=""
           autoplay="autoplay"
           loop="loop"></audio>
    <div class="video_show xuanzhuan">
      <img src="static/img/music2.png"
           alt="">
    </div>
    <v-sider v-if="giftvote && !isOver && giftvote.topimg && isSider"
             :siderData="giftvote.topimg"
             :topimgUrl="giftvote.config && giftvote.config.topimgUrl"
             :curComp="currentComponent"></v-sider>
    <component v-if="giftvote && !isOver && currentComponent"
               :is="currentComponent"
               :giftvote="giftvote"
               :player="votePlayer"
               :curPlayer="curPlayer"
               :params="params"
               :voteuser="itemData"
               :playerCensus="playerCensus">
    </component>
    <t-footer></t-footer>
  </div>
</template>

<script>
/**
* @fileName moduleTwo.vue
 * @author ylf
 * @description
* @date 2020/10/12 21:59:11
*/
import Cookies from 'js-cookie'
import Util from '@/utils/util.js'
import VSider from '@/components/v1/v-sider.vue'
import TFooter from '@/components/v2/t-footer.vue'
export default {
  props: ['giftvote'],
  components: {
    VSider,
    TFooter,
    VIndex (resolve) {
      require(['@/components/v2/t-index.vue'], resolve)
    },
    VAward (resolve) {
      require(['@/components/v2/t-award.vue'], resolve)
    },
    VRule (resolve) {
      require(['@/components/v2/t-rule.vue'], resolve)
    },
    VRank (resolve) {
      require(['@/components/v2/t-rank.vue'], resolve)
    },
    VSignup (resolve) {
      require(['@/components/v2/t-signup.vue'], resolve)
    },
    VDetails (resolve) {
      require(['@/components/v2/t-details.vue'], resolve)
    },
    VGive (resolve) {
      require(['@/components/v2/t-give.vue'], resolve)
    },
    VSuccess (resolve) {
      require(['@/components/v2/t-success.vue'], resolve)
    }
  },
  data () {
    return {
      isOver: false, // 活动是否结束
      votePlayer: [],
      currentComponent: 'VIndex',
      preComponet: [], // 记录上一个模块
      isSider: true,
      itemData: null, // 选手详情
      playerCensus: null, // 选手详情统计
      curPlayer: null,
      params: {
        mname: null,
        vid: null,
        sid: null,
        uid: null,
        did: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    console.log('Cookies', Cookies.get('openid'))
    // console.log('created', location.href)
    let initUrl = Cookies.get('initUrl')
    if (!initUrl) {
      this.params = {
        mname: Util.GetQueryString('m'),
        vid: Util.GetQueryString('v'),
        sid: Util.GetQueryString('s'),
        uid: Util.GetQueryString('u'),
        did: Util.GetQueryString('d')
      }
      Cookies.set('sysid', this.params.sid)
    }
    console.log('params', this.params)
    /* this.params && this.params.sid && this.voteInfo() */
    !this.itemData && this.params.did && (this.params.mname === 'VDetails' || this.params.mname === 'VGive' || this.params.mname === 'VSuccess') && this.playerInfo('init')

    this.params && this.params.mname && this.handleSchedule(this.params.mname)
  },
  mounted () {
    this.$nextTick(() => {
      this.$parent.isInit = false
    })
  },
  methods: {
    handleSchedule (name, type) {
      console.log('name: ', name)
      if (!this.currentComponent.includes(name)) {
        !type && this.preComponet.push(this.currentComponent) // 记录上一个模块
      }
      console.log('this.preComponet: ', this.preComponet)
      this.currentComponent = name
      switch (name) {
        case 'VGive':
          this.isSider = false
          break
        case 'VSuccess':
          this.isSider = false
          break
        case 'VSignup':
          this.isSider = false
          break
        default:
          this.isSider = true
          break
      }
      Util.updUrl('m', name)
      // 加载分享内容
      // this.sdkConfig && this.getConfig(this.sdkConfig)
    },
    goDetails (item, type) {
      this.itemData = item
      this.handleSchedule('VDetails', type)
      this.params.did = item.id
      this.playerInfo()
      Util.updUrl('d', item.id)
      // this.sdkConfig && this.getConfig(this.sdkConfig)
    },
    goGive (item) {
      this.handleSchedule('VGive')
    },
    goSuccess (item) {
      this.handleSchedule('VSuccess')
    },
    playerInfo (data) {
      this.type = data
      let pram = {
        id: this.params.did
      }
      this.$api.getVotePlayerInfo(pram).then(res => {
        // if (!res) return
        this.itemData = res.data
        this.type && this.handleSchedule('VDetails')
        this.postPlayerCensus()
        console.log('itemData', pram.id, res.data)
      })
    },
    postPlayerCensus () {
      let pram = {
        noid: this.itemData.noid,
        sysid: this.params.sid,
        pid: this.params.vid
      }
      this.$api.getPlayerCensus(pram).then(res => {
        this.playerCensus = res && res.data && res.data[0]
        // console.log(this.playerCensus)
      })
    },
    getData (pid = 300, order = 'vote', page = 1, searchKey, size = 10) {
      let pram = {
        pid: pid,
        page: page,
        size: size,
        order: order
      }
      console.log('searchKey')
      if (searchKey) {
        if (this.isNaN(searchKey)) {
          pram.noid = searchKey
        } else {
          pram.name = searchKey
        }
      }
      this.$api.getVotePlayer(pram).then(res => {
        this.curPlayer = res.data
        // if (!res) return
        if (page === 1) {
          this.votePlayer = res.data.data
        } else {
          this.votePlayer.push(...res.data.data)
        }

        // console.log('votePlayer', res.data)
      })
    }
  },
  destroyed () { }
}
</script>

<style lang='scss'>
@import "@/mixins/_utils.scss";
html,
body {
  width: 100%;
  height: 100%;
}
.module-two {
  width: 100%;
  height: 100%;
  .swiper-container {
    margin: 0;
    padding: 0;
    .swiper-wrapper {
      margin: 0;
      padding: 0;
      width: 100%;
      .swiper-slide {
        margin: 0;
        padding: 0;
        a,
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
</style>
