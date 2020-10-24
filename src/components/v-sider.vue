<template>
<div class="">
  <div class="swiper-container" v-if="data">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,i) in data" :key="i">
        <a :href="item.url"><img :src="item.img" /></a></div>
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
        autoplay: 2000, // 可选选项，自动滑动
        speed: 500,
        pagination: '.swiper-pagination',
        autoHeight: true
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
