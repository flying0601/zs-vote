<template>
  <div class='signup-main'>
    <div class="fee_feedback_wrapper">
      <div class="divbaoming4">
        <div class="dlist1">
          选择上传1-5张照片，第一张为封面图。
        </div>
        <div class="dlist2"></div>

        <div class="upload_area">
          <van-uploader v-model="fileList" @delete="deleteFile" :after-read="afterRead" :max-count="5" :max-size="3000 * 1024" />
          </div>
        </div>
      <form id="formID">
        <div>
          <ul class="fd_list2">
            <li>
              <div class="tlt">名称</div>
              <div class="cont">
                <input name="name"
                       type="text"
                       v-model="formObj.name"
                       placeholder="请输入名称"
                       class="tx"></div>
            </li>
            <li>
              <div class="tlt">手机号码</div>
              <div class="cont">
                <input name="xs_tel"
                       type="text"
                        v-model="formObj.tel"
                       placeholder="请输入手机号码"
                       class="tx"></div>
            </li>
            <li>
              <div class="tlt">参赛宣言</div>
              <div class="cont">
                <textarea name="introduction"
                          v-model="formObj.introduction"
                          class="ta"
                          cols=""
                          placeholder="请输入参赛宣言"></textarea></div>
            </li>
          </ul>
          <div class="btn_area">
            <div class="baomingtxt"
                 style="width:95%;line-height:18px;height:auto;text-align:left;text-indent:8px;">
              <p>
                <font color="">请如实填写报名信息，提交信息为唯一获奖凭证</font>
              </p>
            </div>
            <div class="baomingtxt">
              <font color=""></font>
            </div>
            <div class="btn_bg_green" @click="subimtSifnup()">提交报名</div>
            <div class="baomingtxt">
              <font color=""></font>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/**
* @fileName v-signup.vue
* @author ylf
* @description
* @date 2020/08/02 12:31:30
*/

import Vue from 'vue'
import Uploader from 'vant/lib/uploader'
import 'vant/lib/uploader/style'
import Notify from 'vant/lib/notify'
import 'vant/lib/notify/style'
import Toast from 'vant/lib/toast'
import 'vant/lib/toast/style'
import { compressImage } from '@/utils/imagesUtils'
Vue.use(Uploader)
Vue.use(Notify)
Vue.use(Toast)
export default {
  components: {},
  props: ['giftvote', 'params'],
  data () {
    return {
      fileList: [
        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
      ],
      sucessFile: [],
      formObj: {
        name: '',
        tel: '',
        introduction: ''
      }
    }
  },
  computed: {},
  watch: {
    fileList (val) {
      console.log('fileList', val)
    },
    sucessFile (val) {
      console.log('sucessFile', val)
    }
  },
  created () {
    console.log(this.giftvote, this.params)
  },
  mounted () {

  },
  methods: {
    // 读取完图片后
    afterRead (file) {
      this.file = file
      this.file.status = 'uploading'
      this.file.message = '上传中...'
      console.log('afterRead------', file)
      this._compressAndUploadFile(file)
    },
    // 压缩图片上传
    _compressAndUploadFile (file) {
      compressImage(file.content, file.file.name).then(result => {
        // console.log('压缩后的结果', result) // result即为压缩后的结果
        // console.log('压缩前大小', file.file.size)
        // console.log('压缩后大小', result.size)
        if (result.size > file.file.size) {
          console.log('上传原图')
          // 压缩后比原来更大，则将原图上传
          this.imgUpload(file.file)
        } else {
          // 压缩后比原来小，上传压缩后的
          console.log('上传压缩图', result)
          this.imgUpload(result)
        }
      })
    },
    imgUpload (file) {
      // console.log(file)
      let formData = new FormData()
      formData.append('file', file)
      formData.append('name', 'signup')
      // console.log('pram: ', formData)
      this.$api.postUpload(formData).then(res => {
        if (res.errno === 0) {
          this.file.status = ''
          this.file.message = ''
          let fileList = res.data.fileList[0].path
          fileList = 'http://file.actfou.com/' + fileList
          this.sucessFile.push(fileList)
        } else {
          this.file.status = 'failed'
          this.file.message = '上传失败'
        }
      })
    },
    deleteFile (file, detail) {
      console.log(file, detail)
      let index = detail.index
      this.sucessFile.splice(index, 1)
    },
    subimtSifnup () {
      let { sucessFile, formObj } = this
      if (!sucessFile || sucessFile.length < 1) {
        return Notify({ type: 'warning', message: '请上传图片！' })
      }
      if (!sucessFile && sucessFile.length > 5) {
        return Notify({ type: 'warning', message: '请上传图片小于5！' })
      }
      if (formObj && !formObj.name) {
        return Notify({ type: 'warning', message: '请输入名称' })
      }
      if (formObj && !formObj.tel) {
        return Notify({ type: 'warning', message: '请输入电话号码' })
      }
      console.log((/^\d+$/).test(formObj.tel))
      if (formObj && formObj.tel && !(/^\d+$/).test(formObj.tel)) {
        return Notify({ type: 'warning', message: '请检查电话号码格式' })
      }
      let params = {
        pid: this.params.vid,
        userid: this.params.uid,
        ischecked: this.giftvote.config.ischecked,
        formObj: JSON.stringify(this.formObj),
        imglist: JSON.stringify(this.sucessFile)
      }
      const toastStart = Toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: false,
        loadingType: 'spinner'
      })
      console.log(params)
      console.log(this.sucessFile)
      this.$api.postSginup(params).then(res => {
        toastStart.clear()
        if (res && res.errno === 0) {
          Notify({ type: 'success', message: '报名成功！' })
          this.$parent.params.did = res.data
          this.$parent.playerInfo('init')
        } else {
          Notify({ type: 'danger', message: '报名失败！' })
        }
        console.log(res)
      })
    }
  },
  destroyed () { }
}
</script>

<style lang='scss' scoped>
@import "@/mixins/_utils.scss";
.signup-main{
  padding: 10px 0 0;
  box-sizing: border-box;
}
</style>
