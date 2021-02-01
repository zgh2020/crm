<template>
  <el-dialog :visible.sync="visible"
             :title="$t('oss.upload')"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             v-qz-dialog-drag
             :modal="false"
             width="390px">
    <el-upload :auto-upload="false"
               :before-upload="onBeforeUpload"
               :http-request="onUpload"
               :on-change="onchange"
               :on-success="onSuccess"
               :multiple="false"
               :show-file-list="false"
               :file-list="fileList"
               drag
               action="customize"
               ref="fileUpload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__tip" slot="tip">{{fileName}}</div>
      <div class="el-upload__text" v-html="$t('upload.text')"></div>
    </el-upload>
    <template slot="footer">
      <el-button @click="handleUploadSubmit" type="primary" :loading="loading">上传</el-button>
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import * as api from './api'
import util from '@/libs/util'
export default {
  data () {
    return {
      visible: false,
      isModify: false,
      fileList: [],
      fileName: '',
      loading: false
    }
  },
  methods: {
    init () {
      this.visible = true
      this.loading = false
      this.fileName = ''
      this.$nextTick(() => {
        this.$refs.fileUpload.clearFiles()
      })
    },
    // 上传之前
    onBeforeUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < 100
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      return isLt1M
    },
    async onchange () {
      const event = window.event
      const file = event.target.files[0]
      const isLt1M = file.size / 1024 / 1024 < 100
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 100MB!')
        return
      }
      if (this.$refs.fileUpload.uploadFiles.length > 1) {
        this.$refs.fileUpload.uploadFiles.splice(0, 1)
      }
      this.fileName = file.name
      this.isModify = true
    },

    onUpload (data) {
      const param = new FormData() // 创建form对象
      param.append('file', data.file)// 通过append向form对象添加数据
      this.loading = true
      api.fileUpload(param).then(() => {
        this.onSuccess()
        this.loading = false
      }).catch((err) => {
        util.$message.showInfo2(err)
        this.loading = false
      })
    },

    onSuccess (data) {
      this.$emit('refreshDataList')
      this.visible = false
    },
    /**
     * 手动提交的例子
     */
    handleUploadSubmit () {
      if (this.isModify) {
        this.$refs.fileUpload.submit()
      }
      this.isModify = false
    }
  }
}
</script>
