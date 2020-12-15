<template>
  <div class="">
    <div class="swiper-container"
         v-if="data && !isOver">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(item,i) in data"
             :key="i">
          <a :href="item.url"><img v-if="i===1"
                 :src="item.img+'?v='+time" /><img v-else
                 :src="item.img" /></a>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <img v-else
         style="width:100%"
         :src="siderData && siderData.pic_1">
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
  props: ['siderData', 'topimgUrl', 'todayObj', 'isOver'],
  data () {
    return {
      data: [],
      time: Date.parse(new Date())
    }
  },
  computed: {},
  watch: {
    todayObj (val) {
      val && !this.isOver && this.initSider(1)
    }
  },
  created () {
    let { siderData, topimgUrl } = this
    topimgUrl = topimgUrl.split(',')
    console.log('topimgUrl: ', topimgUrl)
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
      !this.mySwiper && !this.isOver && this.initSider()
    })
  },
  methods: {
    initSider (index = 0) {
      let mySwiper = new Swiper('.swiper-container', {
        autoplay: 2000, // 可选选项，自动滑动
        speed: 500,
        pagination: '.swiper-pagination',
        autoHeight: true,
        initialSlide: index
      })
      this.mySwiper = mySwiper
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
