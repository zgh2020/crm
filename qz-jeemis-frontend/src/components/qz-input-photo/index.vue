<template>
    <el-upload :auto-upload="false"
               :before-upload="onBeforeUpload"
               :http-request="onUpload"
               :on-success="onSuccess"
               :multiple="false"
               :on-change="onchange"
               :show-file-list="false"
               accept="image/jpeg,image/jpg,image/png"
               action="customize"
               ref="photo">
        <el-image :src="imageUrl" class="avatar">
            <div slot="error">
                <img src="./image/photo.jpg">
            </div>
        </el-image>
    </el-upload>
</template>

<script>

import * as api from './api'
import util from '@/libs/util'
import debounce from 'lodash/debounce' //  防抖动
export default {
  name: 'qz-inputphoto',
  components: {},
  props: { // 值
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      title: '照片',
      imageUrl: '',
      currentValue: '',
      isModify: false
    }
  },
  mounted () {
    this.currentValue = this.value
    this.isModify = false
  },
  methods: {
    init () {
      this.isModify = false
      if (this.currentValue) { this.imageUrl = util.$gen.getImageURL(this.currentValue) } else { this.imageUrl = '' }
    },
    onBeforeUpload (file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
      }

      /*   if (isIMAGE && isLt1M) {
            debugger
            this.imageUrl = URL.createObjectURL(file.raw);
          } */
      return isIMAGE && isLt1M
    },
    // 当上传图片后，调用onchange方法，获取图片本地路径
    async onchange () {
      const event = window.event
      const file = event.target.files[0]
      const isLt1M = file.size / 1024 / 1024 < 1
      const isLt20k = file.size / 1024 > 5
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
        return
      }
      if (!isLt20k) {
        this.$message.error('上传文件大小不能小于 5K!')
        return
      }
      // 转base64
      const reader = new FileReader()
      reader.onload = (e) => {
        // 将图片路径赋值给src
        this.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
      this.isModify = true
      this.currentValue = await api.getFileName()
    },
    onUpload: debounce(function (data) {
      const param = new FormData() // 创建form对象
      param.append('file', data.file)// 通过append向form对象添加数据
      const fileId = this.currentValue
      api.fileUpload(param, fileId).then((res) => {
        this.currentValue = res
        this.isModify = false
      })
    }, 300, { leading: false, trailing: true }),

    onUpload2 (data) {
      const param = new FormData() // 创建form对象
      param.append('file', data.file)// 通过append向form对象添加数据
      const fileId = this.currentValue
      api.fileUpload(param, fileId).then((res) => {
        this.currentValue = res
        this.isModify = false
      })
    },
    onSuccess (data) {
      this.$emit('uploadSuccess')
    },
    uploadPhoto () {
      if (this.isModify) {
        this.$refs.photo.submit()
      }
      this.isModify = false
    }
  },
  computed: {},
  watch: {
    // 对外提供 v-model
    value: {
      handler (val) {
        this.currentValue = val
        if (this.isModify) return
        if (val) { this.imageUrl = util.$gen.getImageURL(val) } else { this.imageUrl = '' }
      }
    },
    // 对外提供 v-model
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('changeValue', val)
    }
  }
}
</script>

<style scoped>
    /*.avatar-uploader {
        width: 146px;
        height: 163px;
        !*  opacity: 0;
          z-index: 10;
          filter: alpha(opacity=0);*!
    }*/
    .avatar {
        width: 146px;
        height: 163px;
    }
</style>
