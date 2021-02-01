<template>
    <qz-dialog :title="title" :visible.sync="visible" top="26vh" width="500px">
        <el-form :model="dataForm" :rules="dataRule" label-width="90px" ref="dataForm" size="mini">
            <el-form-item label="文件名" prop="fileName">
                <el-input clearable placeholder="文件名" v-model="dataForm.fileName" maxlength="30"></el-input>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="visible = false" size="small">{{ $t('cancel') }}</el-button>
            <el-button @click="dataFormSubmitHandle()" size="small" type="primary" v-loading="loading">{{ $t('confirm') }}</el-button>
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
        id: '',
        pid: '',
        fileId: '',
        fileName: ''
      },
      title: '',
      loading: false
    }
  },
  computed: {
    dataRule () {
      return {
        fileName: [{ required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.title = !this.dataForm.id ? this.$t('add') : this.$t('update')
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm && this.$refs.dataForm.resetFields()
        if (this.dataForm.id) this.getInfo()
      })
    },
    // 获取信息
    getInfo () {
      api.info(this.dataForm.id).then(data => {
        this.dataForm = data
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
      this.dataForm.id = await api.save(this.dataForm, method).catch((err) => {
        this.loading = false
        throw err
      })
      this.loading = false
      this.visible = false
      this.$emit('onUpdateSuccess', { ...this.dataForm })
    }
  }
}
</script>
