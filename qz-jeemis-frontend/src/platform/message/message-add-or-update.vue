<template>
    <qz-dialog :title="title" :visible.sync="visible" top="3vh" width="920px">
        <el-row >
            <el-col :span="24">
                <el-form :model="dataForm" :rules="dataRule" label-width="90px" ref="dataForm"
                         size="mini">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item style="margin-left:-80px">
                                <el-button @click="sendSubmitHandle" size="small" type="primary"
                                           v-loading="loading">发送</el-button>
                                <el-button @click="draftsSubmitHandle" size="small" v-loading="loading">存草稿</el-button>
                                <el-button @click="closed" size="small" v-loading="loading">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5">
                        <el-col :span="21">
                            <el-form-item label="收件人" prop="addresseeName">
                                <el-input placeholder="收件人" v-model="dataForm.addresseeName"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-button  size="mini" type="">选择收件人</el-button>
                        </el-col>
                    </el-row>
                    <el-form-item label="消息主题" prop="title">
                        <el-input placeholder="消息主题" v-model="dataForm.title"></el-input>
                    </el-form-item>

                    <el-form-item label="" label-width="0px" prop="fileList">
                        <qz-file-list folder="message" v-model="dataForm.fileList"></qz-file-list>
                    </el-form-item>
                    <el-form-item label="" label-width="0px" prop="content" style="height: 390px">
                        <qz-quill :height="370" v-model="dataForm.content"></qz-quill>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </qz-dialog>
</template>

<script>
import * as api from './api'
import util from '@/libs/util'

export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: '',
        title: '',
        msgId: '',
        addressee: '',
        addresseeName: '',
        folder: '',
        content: '',
        fileList: []
      },
      title: '新消息',
      loading: false,
      uploadPercent: 0,
      showProgress: false,
      uploadUrl: api.uploadUrl()
    }
  },
  computed: {
    dataRule () {
      return {
        title: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        address: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.title = '发消息'
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        this.$refs.dataForm.id = null
        this.$refs.dataForm.msgId = null
        this.$refs.dataForm.folder = ''
      })
    },
    replyMsg () {
      this.title = '回复消息'
      this.visible = true
      this.$nextTick(() => {
        if (!this.dataForm.id) { return }
        api.view(this.dataForm.id).then(data => {
          data.content = this.getOriginalContent(data)
          data.addressee = data.sender
          data.addresseeName = data.senderName
          data.title = `回复: ${data.title}`
          data.id = null
          data.sender = ''
          data.senderName = ''
          this.dataForm = data
        })
      })
    },
    forwardMsg () {
      this.title = '转发消息'
      this.visible = true
      this.$nextTick(() => {
        if (!this.dataForm.id) { return }
        api.view(this.dataForm.id).then(data => {
          data.content = this.getOriginalContent(data)
          data.addressee = ''
          data.addresseeName = ''
          data.title = `转发: ${data.title}`
          data.id = null
          data.sender = ''
          data.senderName = ''
          this.dataForm = data
        })
      })
    },
    editMsg () {
      this.title = '编辑消息'
      this.visible = true
      this.$nextTick(() => {
        if (!this.dataForm.id) { return }
        api.view(this.dataForm.id).then(data => {
          this.dataForm = data
        })
      })
    },
    // 获取原始消息内容
    getOriginalContent (data) {
      return `</br> =======原始邮件======</br>
            主题:${data.title}</br>
            发件时间:${data.createDate}</br>
            发件人:${data.senderName}</br>
            </br>${data.content}`
    },
    // 表单提交
    async sendSubmitHandle () {
      const valid = await this.$refs.dataForm.validate().catch(() => {
        return util.$message.showInfo2('校验错误')
      })
      if (!valid) return
      this.loading = true
      const method = 'post'
      this.dataForm.folder = ''
      this.dataForm.msgId = ''
      this.dataForm.id = ''
      await api.save(this.dataForm, method).catch((err) => {
        this.loading = false
        throw err
      })
      this.loading = false
      this.visible = false
      this.$emit('refreshDataList', this.dataForm)
    },
    // 草稿表单提交
    async draftsSubmitHandle () {
      const valid = await this.$refs.dataForm.validate().catch(() => {
        return util.$message.showInfo2('校验错误')
      })
      if (!valid) return
      this.loading = true
      // 草稿箱
      this.dataForm.folder = '6'
      await api.saveDrafts(this.dataForm).catch((err) => {
        this.loading = false
        throw err
      })
      this.loading = false
      this.visible = false
      this.$emit('refreshDataList', this.dataForm)
    },
    async closed () {
      const ok = await util.$message.showYesNo('是否取消保存，并关闭?')
      if (ok && ok === 'confirm') {
        this.loading = false
        this.visible = false
        this.$emit('refreshDataList', this.dataForm)
      }
    }
  }
}
</script>
