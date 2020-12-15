<template>
<div class="">
  <div class="swiper-container" v-if="data">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,i) in data" :key="i">
        <a :href="item.url">
          <img v-if="i==0||i==(data.length-1)" :src="item.img" class="swiper-lazy" />
          <img v-else src="resource/common/loading.gif" :data-src="item.img" class="swiper-lazy" />
          </a></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    </div>
</template>

<script>
/**
* @fileName sider.vue
 *@authorylf
* @date 2020/07/04 23:04:25
*/
import Swiper from 'swiper'
export default {
  components: {},
  props: ['siderData', 'topimgUrl', 'curComp'],
  data () {
    return {
      data: []
    }
  },
  computed: {},
  watch: {
    curComp (val) {
      // console.log(val)
    }
  },
  created () {
    let { siderData, topimgUrl } = this
    topimgUrl = topimgUrl.split(',')
    // console.log('topimgUrl: ', topimgUrl)
    let index = 0
    for (let key in siderData) {
      let item = {
        img: siderData[key]
      }
      if (topimgUrl && topimgUrl[index]) {
        item.url = topimgUrl[index]
      } else {
        item.url = ''
      }
      siderData[key] && this.data.push(item)
      index += 1
    }
    // console.log(this.data)
  },
  mounted () {
    this.$nextTick(() => {
      this.initSider()
    })
  },
  methods: {
    initSider (playType) {
      let mySwiper = new Swiper('.swiper-container', {
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        loop: true,
        autoplay: 2000, // 可选选项，自动滑动
        speed: 500,
        lazyLoading: true, // 懒加载开启
        pagination: '.swiper-pagination',
        autoHeight: true,
        onSlideChangeEnd: function (swiper) {
          swiper.update()
        }
      })
      console.log(mySwiper)
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
<style >

</style>
