<template>
    <qz-dialog :title="title" :visible.sync="visible" top="6vh" width="600px">
        <el-form :model="dataForm" :rules="dataRule" label-width="90px" ref="dataForm" size="mini">
               <el-form-item prop="id" label="编号ID">
                  <el-input clearable placeholder="ID" v-model="dataForm.id"></el-input>
               </el-form-item>
               <el-form-item prop="fileTitle" label="文件标题">
                  <el-input clearable placeholder="文件标题" v-model="dataForm.fileTitle"></el-input>
               </el-form-item>
            <el-form-item label="" label-width="0px" prop="fileList">
                <qz-file-list :multipleFile="false" v-model="fileList" folder="officetemplate"></qz-file-list>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button size="small" @click="visible = false">{{ $t('cancel') }}</el-button>
            <el-button size="small" @click="dataFormSubmitHandle()" type="primary" v-loading="loading">{{ $t('confirm') }}</el-button>
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
      fileList: [],
      dataForm: {
        id: '',
        fileId: '',
        fileTitle: '',
        fileName: '',
        fileType: '',
        orderid: '',
        creator: '',
        createDate: '',
        updater: '',
        updateDate: ''
      },
      title: '',
      loading: false,
      isAdd: false
    }
  },
  computed: {
    dataRule () {
      return {
      }
    }
  },
  methods: {
    init () {
      this.title = !this.dataForm.id ? this.$t('add') : this.$t('update')
      this.isAdd = !this.dataForm.id
      this.visible = true
      this.$nextTick(() => {
        if (!this.dataForm.id) {
          this.$refs.dataForm.resetFields()
          this.fileList = []
          this.dataForm.id = ''
          this.dataForm.fileId = ''
          this.dataForm.fileName = ''
        }
        if (this.dataForm.id) this.getInfo()
      })
    },
    // 获取信息
    getInfo () {
      api.info(this.dataForm.id).then(data => {
        this.dataForm = data
        this.fileList = []
        this.fileList.push(data)
      })
    },
    // 表单提交
    async dataFormSubmitHandle () {
      const valid = await this.$refs.dataForm.validate().catch(() => {
        return util.$message.showInfo2('校验错误')
      })
      if (!valid) return
      if (this.fileList.length < 1) {
        debugger
        util.$message.showInfo2('没有选择文件')
        return
      }
      const fileObj = this.fileList[0]
      this.dataForm.fileName = fileObj.fileName
      this.dataForm.fileId = fileObj.fileId
      this.loading = true
      const method = !this.isAdd ? 'put' : 'post'
      await api.save(this.dataForm, method).catch((err) => {
        this.loading = false
        throw err
      })
      this.loading = false
      this.visible = false
      this.isAdd = false
      this.$emit('refreshDataList', this.dataForm)
    }
  }
}
</script>
