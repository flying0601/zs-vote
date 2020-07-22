<template>
  <div class=''>
    <div class=""
         v-html="style"
         v-show="false"></div>
    <div class="contestant_page_header">
      <div>
        <h3 style="font-size: 30px;font-weight: bold;line-height: 70px;">给{{voteuser.noid}}号投票成功！</h3>
      </div>
      <div style="color:#f90012">
        <div style="text-align: center">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAYAAADvCdDvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpCOERGN0UxNEQzQjZFNzExODU0NUNERjQ4M0QzQzkwNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNjE4QkYzNUI2RDMxMUU3OUM3REY1MjA5NDJDNkY3RSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNjE4QkYzNEI2RDMxMUU3OUM3REY1MjA5NDJDNkY3RSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI4REY3RTE0RDNCNkU3MTE4NTQ1Q0RGNDgzRDNDOTA2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI4REY3RTE0RDNCNkU3MTE4NTQ1Q0RGNDgzRDNDOTA2Ii8+IDwvcmRmOkRlc2NyaXB0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"
               alt=""
               width="80">
        </div>
      </div>
      <div style="font-size:18px;font-weight:600;margin-top:10px">亲, 再送我个钻石呗!</div>

    </div>
    <div style="background-color: #ffa603; border: solid 1px #000;"
         id="zbtn">
      <a @click="clickGive(voteuser)"
         style="font-size: 18px;color:#000">助力</a>
    </div>
    <div style="background-color: #fff; border: solid 1px #000;"
         id="zbtn">
      <a @click="clickIndex()"
         style="font-size: 18px;color:#000">返回活动</a>
    </div>
    <div style="margin: 40px 5% 0px; width: 90%;"
         id="jiandiv2">
      <div style="margin-left: 25%;"
           id="jiandiv">
        奖品设置
      </div>
      <div style="padding: 0px 0px 10px 10px"
           v-html="giftvote && giftvote.prizemsg && html">
      </div>
    </div>
  </div>
</template>

<script>
/**
* @fileName v-success.vue
 * @author ylf
 * @description
* @date 2020/07/12 22:53:59
*/

export default {
  components: {},
  props: ['giftvote', 'voteuser'],
  data () {
    return {
      html: '',
      style: '<link rel="stylesheet" href="app/WeChat/GiftVote/css/success.css">'
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
    },
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

</style>
