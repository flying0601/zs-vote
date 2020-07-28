
<template>
  <div class="wrap">
  <div id="Loading">
   <div class="loader-inner ball-beat">
    <div></div>
    <div></div>
    <div></div>
   </div>
  </div>
    <!-- index.html
    <a href="./list.html"> list.html</a>
    <v-hb></v-hb> -->
  </div>
</template>

<script>
import Util from '@/utils/util.js'
export default {
  components: {},
  data () {
    return {
      //
    }
  },
  beforeCreate () {
    let sysid = Util.GetQueryString('s')
    this.$api.getActiveHost({ sysid: sysid }).then(res => {
      // if (!res) return
      let data = res.data || []
      if (res.data && res.data.length > 0) {
        let sysHost = data[0].host
        let urlParam = window.location.search
        console.log('urlParam: ', urlParam)
        urlParam = urlParam.split('#')[0]
        let protocol = window.location.protocol
        let pathname = window.location.pathname
        console.log(pathname)
        let newUrl = protocol + '//' + sysHost + pathname + 'main.html' + urlParam
        console.log('newUrl: ', newUrl)
        window.location.href = newUrl
      } else {
        alert('active host is null')
      }
    })
  },
  created () {
    console.log(this.$api)
  },
  mounted () {
    // this.$api.getConfig().then(res => {
    //   console.log(res.data)
    // })
  },
  methods: {
  }
}
</script>
<style lang="scss">
html,body,
.wrap{
  height: 100%;
  width: 100%;
}
 #Loading {
    top:50%;
    left:50%;
    position: absolute;
    -webkit-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
    z-index:100;
   }
   @-webkit-keyframes ball-beat {
    50% {
     opacity: 0.2;
     -webkit-transform: scale(0.75);
     transform: scale(0.75); }

    100% {
     opacity: 1;
     -webkit-transform: scale(1);
     transform: scale(1); } }

   @keyframes ball-beat {
    50% {
     opacity: 0.2;
     -webkit-transform: scale(0.75);
     transform: scale(0.75); }

    100% {
     opacity: 1;
     -webkit-transform: scale(1);
     transform: scale(1); } }

   .ball-beat > div {
    background-color: #279fcf;
    width: 15px;
    height: 15px;
    border-radius: 100% !important;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: ball-beat 0.7s 0s infinite linear;
    animation: ball-beat 0.7s 0s infinite linear; }
   .ball-beat > div:nth-child(2n-1) {
    -webkit-animation-delay: 0.35s !important;
    animation-delay: 0.35s !important;
    }
</style>
