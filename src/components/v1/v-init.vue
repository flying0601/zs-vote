<template>
<div data-server-rendered=true class="skeleton page">
      <div class=skeleton-banner></div>
      <div class=skeleton-productions></div>
      <div class=skeleton-productions></div>
      <ul class=skeleton-tabs>
        <li class=skeleton-tabs-item><span></span></li>
        <li class=skeleton-tabs-item><span></span></li>
      </ul>
      <ul class=skeleton-tabs>
        <li class=skeleton-tabs-item><span></span></li>
        <li class=skeleton-tabs-item><span></span></li>
      </ul>
      <ul class=skeleton-tabs>
        <li class=skeleton-tabs-item><span></span></li>
        <li class=skeleton-tabs-item><span></span></li>
      </ul>
    </div>
</template>

<script>
/**
* @fileName v-init.vue
* @author ylf
* @description
* @date 2020/07/28 23:56:20
*/

export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {

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
    .skeleton {
      position: fixed;
      height: 100%;
      overflow: hidden;
      padding: 15px;
      box-sizing: border-box;
      background: #fff;
      width: 100%;
      top: 0;
      left: 0;
    }

    .skeleton-tabs {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .skeleton-tabs-item {
      width: 48%;
      height: 180px;
      box-sizing: border-box;
      text-align: center;
    }

    .skeleton-tabs-item span {
      display: inline-block;
      width: 100%;
      height: 100%;
      background: #eee;
    }

    .skeleton-banner {
      height: 250px;
      background: #eee;
      margin-bottom: 15px;
    }

    .skeleton-productions {
      height: 50px;
      margin-bottom: 15px;
      background: #eee;
    }
</style>
