<template>
  <div class="tit">
    <h3 class="content">
      {{giftvote.title}}
    </h3>
  </div>
</template>

<script>
/**
* @fileName t-title.vue
* @author ylf
* @description
* @date 2020/10/25 11:28:14
*/

export default {
  props: ['giftvote'],
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
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
