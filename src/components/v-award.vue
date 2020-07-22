<template>
  <div class=''>

    <div class="rankp">活动奖品</div>
    <div class="divmain10 bg-purple4 bg-blue4 cl-white pd-b-15">
      <div class="divcon" v-html="giftvote && giftvote.prizemsg && html">
      </div>
    </div>
  </div>
</template>

<script>
/**
* @fileName v-award.vue
* @author ylf
* @description
* @date 2020/07/08 01:05:42
*/
export default {
  components: { },
  props: ['giftvote'],
  data () {
    return {
      html: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.giftvote && (this.html = this.escape2Html(this.giftvote.prizemsg))
  },
  mounted () {

  },
  methods: {
    escape2Html (str) {
      const arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' }
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
