<template>
<div class="">
  <div class="swiper-container" v-if="data">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,i) in data" :key="i">
        <a href="#"><img :src="item" /></a></div>
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
  props: ['siderData'],
  data () {
    return {
      data: this.siderData
    }
  },
  computed: {},
  watch: {},
  created () {
    console.log(this.data)
  },
  mounted () {
    this.$nextTick(() => {
      this.initSider()
    })
  },
  methods: {
    initSider () {
      let mySwiper = new Swiper('.swiper-container', {
        autoplay: 2000, // 可选选项，自动滑动
        speed: 500,
        pagination: '.swiper-pagination'
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
