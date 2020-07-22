
<template>
  <div class="wrap">
    index.html
    <a href="./list.html"> list.html</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  },
  beforeCreate () {
    let pram = {
      callback: 'http://app.web.tprnwia.cn/vote/?v=300&m=Vrank&s=4',
      scope: 'snsapi_base',
      sysid: 2
    }
    this.$api.getUrl(pram).then(res => {
      // if (!res) return
      console.log(res.data)
      // window.location.href = res.data
    })
  },
  created () {
    console.log(this.$api)
  },
  mounted () {
    this.$api.getConfig().then(res => {
      // if (!res) return
      console.log(res.data)
    })
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>
