<template>
  <div class="zh_CN "
       ontouchstart="">
    <div style="position:absolute;z-index:1;top:17px;font-size:14px;height:25px; line-height:25px; text-align:center; width:100%;color:rgb(105,106,108); font-family: Helvetica, &#39;Hiragino Sans GB&#39;, &#39;Microsoft Yahei&#39;, &#39;微软雅黑&#39;, Arial, sans-serif;">
      此网页由&nbsp;&nbsp;weixin110.qq.com&nbsp;&nbsp;提供
    </div>
    <div class="page_bd"
         id="container"
         style="position: absolute; z-index: 2; background-color: rgb(255, 255, 255); width: 100%; height: 100%; transition: all 0s; transform: translate(0px, 0px);">
      <div id="tips"
           style="display:none;"
           class="top_tips warning"></div>

      <div id="step1"
           class="category_item">
        <h3 class="category_title">请选择投诉该网页的原因:</h3>

        <form id="form1">
          <ul class="checkbox_list">
            <li data-type="1"
                class="checkbox">
              <input id="radio_1"
                     name="complaintype"
                     value='1'
                     class="frm_checkbox"
                     type="radio">
              <label for="radio_1"
                     class="frm_checkbox_label checkbox_title "
                     data-tid="1" data-text="网页包含欺诈信息(如:假红包)">
                <div class="checkbox_label_inner">网页包含欺诈信息(如:假红包)</div>
              </label>
            </li>
            <li data-type="2"
                class="checkbox">
              <input id="radio_2"
                     name="complaintype"
                     value='2'
                     class="frm_checkbox"
                     type="radio">
              <label for="radio_2"
                     class="frm_checkbox_label checkbox_title"
                     data-tid="2" data-text="网页包含色情信息">
                <div class="checkbox_label_inner">网页包含色情信息</div>
              </label>
            </li>
            <li data-type="3"
                class="checkbox">
              <input id="radio_3"
                     name="complaintype"
                     value='3'
                     class="frm_checkbox"
                     type="radio">
              <label for="radio_3"
                     class="frm_checkbox_label checkbox_title"
                     data-tid="3" data-text="网页包含暴力恐怖信息">
                <div class="checkbox_label_inner">网页包含暴力恐怖信息</div>
              </label>
            </li>
            <li data-type="4"
                class="checkbox">
              <input id="radio_4"
                     name="complaintype"
                     value='4'
                     class="frm_checkbox"
                     type="radio">
              <label for="radio_4"
                     class="frm_checkbox_label checkbox_title"
                     data-tid="4" data-text="网页包含政治敏感信息">
                <div class="checkbox_label_inner">网页包含政治敏感信息</div>
              </label>
            </li>
            <li data-type="5"
                class="checkbox">
              <input id="radio_5"
                     name="complaintype"
                     value='5'
                     class="frm_checkbox"
                     type="radio">
              <label for="radio_5"
                     class="frm_checkbox_label checkbox_title"
                     data-tid="5" data-text="网页在收集个人隐私信息(如:钓鱼链接)">
                <div class="checkbox_label_inner">网页在收集个人隐私信息(如:钓鱼链接)</div>
              </label>
            </li>
            <li data-type="6"
                class="checkbox">
              <input id="radio_6"
                     name="complaintype"
                     value='6'
                     class="frm_checkbox"
                     type="radio">
              <label for="radio_6"
                     class="frm_checkbox_label checkbox_title"
                     data-id="1"
                     data-tid="6"
                     data-text="网页包含诱导分享/关注性质的内容">
                <div class="checkbox_label_inner">网页包含诱导分享/关注性质的内容</div>
              </label>
            </li>
            <li data-type="7"
                class="checkbox">
              <input id="radio_7"
                     name="complaintype"
                     value='7'
                     class="frm_checkbox"
                     type="radio">
              <label for="radio_7"
                     class="frm_checkbox_label checkbox_title"
                     data-id="3"
                     data-tid="7"
                     data-text="网页可能包含谣言信息">
                <div class="checkbox_label_inner">网页可能包含谣言信息</div>
              </label>
            </li>

          </ul>
        </form>
        <!-- <div class="opr_area">
          <a id="nextBtn" href="javascript:void(0);" target="_self" class="btn btn_primary btn_disabled js_btn_submit">下一步</a>
        </div> -->
        <p style="padding-left:10px">
          <a href="http://mp.weixin.qq.com/s?__biz=MzIzNzAzODg4OA==&mid=401352390&idx=1&sn=49d7f7d99a4944b065ba5cc54b060130&mpshare=1&scene=23&srcid=0319snh0EkOKsH5w40RjrfI4#rd
">遇到网页流量被劫持怎么办</a>
        </p>
      </div>

      <div id="xz"
           style="position:absolute;bottom:5px;text-align:center;width:100%"><a href="https://weixin110.qq.com/security/readtemplate?t=w_security_center_website/report_agreement&lang=zh_CN
">投诉须知</a></div>

      <div id="step2"
           class="category_item"
           style="display:none;">
        <h3 class="category_title">你可以:</h3>
        <form>
          <ul class="checkbox_list">
            <li data-type="1"
                class="checkbox">
              <input id="radio_1"
                     name="complaintype"
                     value='2'
                     class="frm_checkbox"
                     type="radio">
              <label for="radio_1"
                     class="frm_checkbox_label  checkbox_title "
                     data-id="2">
                <div class="checkbox_label_inner"
                     id="tj">提交给微信团队审核</div>
              </label>
            </li>
          </ul>
        </form>
        <p style="padding-left:10px;display:none"
           id="yd"><a href="http://mp.weixin.qq.com/s?__biz=MzA5MzEzNDg3MQ==&mid=505283668&idx=4&sn=45f26dca2cf10f70ea792352ff762277&chksm=0b882d2c3cffa43a2a77f2beb57eef3be1a5635ef37928e2c7d01cf854a1b9842425eadf3312&mpshare=1&scene=23&srcid=0319Ulnpkg5OJcT7PAzpCVOD#rd">了解什么是诱导分享类内容</a></p>

        <p style="padding-left:10px;display:none"
           id="yy"><a href="https://mp.weixin.qq.com/s?__biz=MzA5MzEzNDg3MQ==&mid=505283668&idx=1&sn=a6db3d0554f7c1c1071ac783f3d574a5&chksm=0b882d2c3cffa43a73004ee3ab3d715b37baff1c277ef8e7199ec611bf378a625d89089ba662&mpshare=1&scene=23&srcid=03198a2HkymB9NH06qRclC52#rd">了解微信对谣言的治理</a></p>
      </div>

      <div id="step3"
           style="display:none;">
      </div>
      <div id="result_tmpl"
           v-show="false">

        <div class="page_msg">
          <div class="icon_area"><i class="icon_msg success"></i></div>
          <div class="text_area">
            <h2 id=""
                class="title">投诉已提交</h2>
            <p id="suc_desc"
               class="desc">微信团队会尽快核实,并通过"微信团队"通知你审核结果.感谢你的支持.</p>
          </div>
          <div class="opr_area">
            <a id="successBtn_1"
               class="btn btn_primary">关闭</a>
          </div>
        </div>

      </div>

      <div id="success_text_tmpl"
           v-show="false">
        感谢你的参与，微信坚决反对色情、暴力、欺诈等违规信息，我们会认真处理你的举报，维护绿色、健康的网络环境。</div>
      <div id="ori_fail_text_tmpl"
           v-show="false">
        你举报的文章未进行原创声明，感谢你的参与。微信坚决反对色情、暴力、欺诈等违规信息，我们会认真处理你的举报，维护绿色、健康的网络环境。</div>
    </div>
  </div>
</template>

<script>
/**
* @fileName v-complaint.vue
* @author ylf
* @description
* @date 2020/07/08 23:59:27
*/
import $ from 'jquery'
import wx from 'weixin-js-sdk'
import Util from '@/utils/util.js'
export default {
  components: {},
  data () {
    return {
      tid: '',
      text: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.params = {
      mname: Util.GetQueryString('m'),
      vid: Util.GetQueryString('v'),
      sid: Util.GetQueryString('s'),
      uid: Util.GetQueryString('u'),
      did: Util.GetQueryString('d')
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      let _this = this
      $('.frm_checkbox_label').click(function () {
        if ($(this).data('tid')) {
          _this.tid = $(this).data('tid')
          _this.text = $(this).data('text')
          console.log(_this.tid, _this.text)
        }

        $('#step1').hide()
        if ($(this).data('id') !== 2) {
          $('#step2').show()
          if ($(this).data('id') === 1) {
            $('#yd').show()
          }
          if ($(this).data('id') === 3) {
            $('#yy').show()
          }
        }
      })

      $('#tj').click(function () {
        var t = $('#result_tmpl').html()
        $('#xz').hide()
        $('#step2').hide()
        $('#step3').html(t).show()
        $('#setp3').show()
        // 提交接口
        _this.postData()
        console.log('提交接口')
      })
      $(document).on('click', '#successBtn_1', function () {
        // console.log(wx, 'dd')
        wx.closeWindow()
      })
    },
    postData () {
      let pram = {
        tid: this.tid,
        uid: this.params.uid,
        pid: this.params.vid,
        action: this.params.mname
      }
      this.$api.postComplaint(pram).then(res => {
        // if (!res) return
        console.log(res)
        // console.log('getCensus', pram.vid, res.data)
      })
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
