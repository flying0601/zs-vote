<template>
  <div class=''>
    <div class="dlist1">选择上传{{giftvote['minupimg']}}-{{giftvote['maxupimg']}}'张照片，第一张为封面图。</div>
    <div class="upload_area">
                    <ul id="imglist" class="post_imglist"></ul>
                    <div class="upload_btn">
                        <input type="file" id="upload_image" value="图片上传" accept="image/*" >
                    </div>
       </div>
     <form id="formID">
      <div>
        <ul class="fd_list2">
          <li>
            <div class="tlt">{{giftvote['xs_name']}}</div>
            <div class="cont">
              <input name="name"
                     type="text"
                     placeholder="请输入{wzx:$giftvote['xs_name']}"
                     class="tx"></div>
          </li>

          <li>
            <div class="tlt">{{giftvote['xs_tel']}}</div>
            <div class="cont">
              <input name="xs_tel"
                     type="text"
                     :placeholder="`请输入${giftvote['xs_tel']}`"
                     class="tx"></div>
          </li>

        </ul>
        <div class="btn_area">
          <div class="baomingtxt"
               style="width:95%;line-height:18px;height:auto;text-align:left;text-indent:8px;">
            <p>
              <font color="">{{['signup_sm']}}</font>
            </p>
          </div>
          <div class="baomingtxt">
            <font color=""></font>
          </div>
          <div class="btn_bg_green">提交报名</div>
          <div class="baomingtxt">
            <font color=""></font>
          </div>
        </div>

      </div>
    </form>
</div>
</template>

<script>
/**
* @fileName v-signup.vue
* @author ylf
* @description
* @date 2020/08/02 12:31:30
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
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
</style>
