<template>
    <qz-dialog :title="title" :visible.sync="visible" top="3vh" width="900px">
        <el-form :model="dataForm" :rules="dataRule" label-width="90px" ref="dataForm"
                 size="mini">
            <el-form-item label="公告标题" prop="title">
                <el-input placeholder="公告标题" v-model="dataForm.title"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="18">
                    <el-form-item label="发文机构" prop="deptName">
                        <el-input placeholder="发文机构" v-model="dataForm.deptName"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="排序" prop="orderid" title="排序">
                        <el-input-number :min="0" controls-position="right" label="排序"
                                         v-model="dataForm.orderid" style="width: 100%"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="一级栏目" prop="noticeType1">
                        <qz-select-code codeid="DW" v-model="dataForm.noticeType1"></qz-select-code>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="二级栏目" prop="noticeType2">
                        <qz-select-code codeid="DX" v-model="dataForm.noticeType2"></qz-select-code>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="查看范围" prop="noticeScope">
                        <qz-select-code codeid="DY" v-model="dataForm.noticeScope"></qz-select-code>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="" label-width="0px" prop="fileList">
                <qz-file-list v-model="dataForm.fileList" folder="notice"></qz-file-list>
            </el-form-item>
            <el-form-item label="" label-width="0px" prop="content" style="height: 350px">
                <qz-quill :height="330" v-model="dataForm.content"></qz-quill>
            </el-form-item>
        </el-form>

        <template slot="footer">
            <el-row>
                <el-col :span="6">
                    <span>&nbsp;</span><el-progress :percentage="uploadPercent" v-if="showProgress"></el-progress>
                </el-col>
                <el-col :span="18">
                    <el-button size="small" @click="visible = false">{{ $t('cancel') }}</el-button>
                    <el-button size="small" @click="dataFormSubmitHandle()" type="primary" v-loading="loading">{{ $t('confirm') }}
                    </el-button>
                </el-col>
            </el-row>
        </template>
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
        title: '',
        deptName: '',
        content: '',
        noticeType1: '',
        noticeType2: '',
        noticeScope: '',
        fileList: [],
        orderid: 1
      },
      title: '',
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
        noticeType1: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.title = !this.dataForm.id ? this.$t('add') : this.$t('update')
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        if (this.dataForm.id) this.getInfo()
      })
    },
    // 获取信息
    getInfo () {
      api.info(this.dataForm.id).then(data => {
        this.dataForm = data
        console.info(this.dataForm)
      })
    },
    // 表单提交
    async dataFormSubmitHandle () {
      const valid = await this.$refs.dataForm.validate().catch(() => {
        return util.$message.showInfo2('校验错误')
      })
      if (!valid) return
      this.loading = true
      const method = this.dataForm.id ? 'put' : 'post'
      await api.save(this.dataForm, method).catch((err) => {
        this.loading = false
        throw err
      })
      this.loading = false
      this.visible = false
      this.$emit('refreshDataList', this.dataForm)
    }
  }
}
</script>
