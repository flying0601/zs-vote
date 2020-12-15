<template>
  <div class=''>
    <t-title :giftvote="giftvote"></t-title>
    <t-desc :giftvote="giftvote"
            :isDesc="{info:true}"
            :params="params"></t-desc>
    <div class="item-content">
      <div class="item-area">
        <form action="http://vote.pirnql.cnplayer/store/vGLneRrGAkx7yVpm"
              method="post">
          <input type="hidden"
                 name="_token"
                 value="MMNuO5HVxFry7RcOj7cckmSaNVYCK32kWjpdniYI">
          <div class="input-area">
            <div class="input-tit"><span class="red">*</span>企业名称</div>
            <input type="text"
                   placeholder="请填写您单位的企业或组织机构全称！"
                   v-model="formObj.name"
                   name="apply_name"
                   id="apply_name">
          </div>

          <div class="input-area"
               id="img-area">
            <div class="input-tit"><span class="red">*</span>上传照片（最多可上传5张图片）</div>
            <div class=""
                 style="margin-top: 1rem;">
              <van-uploader v-model="fileList"
                            @delete="deleteFile"
                            :after-read="afterRead"
                            :max-count="5"
                            :max-size="3000 * 1024" />
            </div>
          </div>

          <div class="input-area">
            <div class="input-tit">企业简介</div>
            <textarea type="text"
                      placeholder="请输入您公司简介"
                      v-model="formObj.introduction"
                      name="introduce"
                      id="introduce"></textarea>
          </div>
          <div class="input-area">
            <div class="input-tit">联系电话（支持座机,最大13位数字）</div>
            <input type="number"
                   placeholder="请输入您的联系方式"
                   v-model="formObj.tel"
                   name="mobile"
                   id="mobile">
          </div>

        </form>
      </div>
    </div>

    <div class="submit"
         @click="subimtSifnup()"
         style="background-image: url('static/img/submitbg.png');">提交</div>
  </div>
</template>

<script>
/**
* @fileName t-signup.vue
* @author ylf
* @description
* @date 2020/10/25 16:11:40
*/
import TTitle from '@/components/v2/t-title.vue'
import TDesc from '@/components/v2/t-desc.vue'
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
  props: ['giftvote', 'params'],
  components: {
    TTitle,
    TDesc
  },
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
          fileList = 'http://file.iactive.top/' + fileList
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
</style>
<style>
.item-area {
  padding: 12px 24px;
  color: #bea05f;
}

.input-area {
  margin-bottom: 21px;
  position: relative;
}

.item-content {
  border: 4px solid #caa964;
  width: 94%;
  margin: 10px auto 10px;
  border-radius: 10px;
  color: #bea05f;
}

.item-content h4 {
  line-height: 32px;
  font-weight: normal;
}

.input-area input {
  font-size: 14px;
  color: #999999;
  padding: 0 5%;
  width: 90%;
  line-height: 30px;
  border: 1px solid #eeeeee;
  margin: 5px 0;
}

.red {
  color: #ff0000;
}

input::-webkit-input-placeholder {
  color: #999999;
}

.uploads {
  margin: 5px 0;
  background: #caa964;
  width: 120px;
  text-align: center;
  color: #000000;
  line-height: 32px;
}

textarea {
  margin: 5px 0;
  width: 92%;
  padding: 10px 4%;
  height: 60px;
  border: 1px solid #eeeeee;
  color: #999999;
}

textarea::-webkit-input-placeholder {
  color: #999999;
}

.submit {
  width: 94%;
  margin: 20px auto;
  color: #000000;
  text-align: center;
  line-height: 40px;
  background-size: 100% 100%;
  font-weight: bold;
  letter-spacing: 8px;
  font-size: 1.1rem;
}

.weui-uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

#img-area img {
  width: 100%;
  margin: 10px 0;
}

.active-info {
  border: 4px solid #cba962;
  width: 94%;
  border-radius: 8px;
  background: #212121;
  margin: 10px auto;
}

.info-area .item {
  text-align: center;
  font-size: 15px;
  padding: 10px 0;
  width: 33.3%;
}

.info-area .item_count {
  font-weight: bold;
  font-size: 17px;
}
</style>
