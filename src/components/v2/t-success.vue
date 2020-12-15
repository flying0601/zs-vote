<template>
  <div class="area">
    <div>
      给 {{voteuser.noid}}号 投票成功
    </div>
    <a class="button1"
       @click="clickGive(voteuser)"
       style="background-image: url('static/img/btnbg.png');">
      <i class="fa fa-gift"
         aria-hidden="true"></i>送礼物
    </a>
    <a class="button2"
       @click="clickIndex()"
       style="background-image: url('static/img/btnbg.png');">返回活动</a>
  </div>
</template>

<script>
/**
* @fileName t-success.vue
* @author ylf
* @description
* @date 2020/10/26 09:29:00
*/

export default {
  props: ['giftvote', 'voteuser'],
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
    clickGive (voteuser) {
      this.$parent.goGive(voteuser)
    },
    clickIndex () {
      this.$parent.handleSchedule('VIndex')
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
/*成功*/
.area {
  text-align: center;
  width: 94%;
  margin: 15px auto;
  font-size: 0.9rem;
  color: #c6ab7e;
  border-radius: 8px;
  padding: 20px 0;
  font-weight: bold;
  background-color: #000000;
  border: solid 1px #f9c787;
}
.button1 {
  color: #000000;
  width: 120px;
  line-height: 35px;
  text-align: center;
  margin: 20px auto;
  display: block;
  background-size: 100% 100%;
}
.button2 {
  color: #000000;
  width: 120px;
  line-height: 35px;
  text-align: center;
  margin: 20px auto;
  display: block;
  background-size: 100% 100%;
}
</style>
