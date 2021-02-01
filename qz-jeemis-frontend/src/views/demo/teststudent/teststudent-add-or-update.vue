<template>
    <qz-dialog ref="qzDialog" :title="title" :visible.sync ="visible" top="6vh" width="600px">
        <el-form :model="dataForm" :rules="dataRule" label-width="90px" ref="dataForm" size="mini">
            <el-form-item label="姓名" prop="name">
                <el-input clearable placeholder="姓名" v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <qz-input-date placeholder="生日" v-model="dataForm.birthday" valueFormat="YYYY-MM-DD"></qz-input-date>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <qz-select-code clearable codeid="AX" v-model="dataForm.sex"></qz-select-code>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input :autosize="{ minRows: 3, maxRows: 5}" clearable placeholder="地址" type="textarea"
                          v-model="dataForm.address"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input-number :min="0" controls-position="right" style="width: 100%" v-model="dataForm.age"/>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="visible = false" size="small">{{ $t('cancel') }}</el-button>
            <el-button @click="dataFormSubmitHandle()" size="small" type="primary" v-loading="loading">{{ $t('confirm') }}
            </el-button>
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
        stdId: '',
        name: '',
        birthday: '',
        sexDesc: '',
        address: '',
        age: ''
      },
      title: '',
      loading: false,
      isAdd: false
    }
  },
  computed: {
    dataRule () {
      return {
        name: [{ required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.visible = true

    this.$nextTick(() => {
      setTimeout(() => {
        console.info(this.$refs.qzDialog)
        console.info(this.$refs.dataForm)
        console.info(this.$refs.dataForm)
      }, 50)
    })
  },
  methods: {
    init () {
      this.visible = true
      this.title = !this.dataForm.stdId ? this.$t('add') : this.$t('update')
      this.isAdd = !this.dataForm.stdId
      this.$nextTick(() => {
        if (this.isAdd) {
          this.$refs.dataForm.resetFields()
          this.dataForm.stdId = ''
        } else {
          this.getInfo()
          this.$refs.dataForm.clearValidate()
        }
      })
    },
    // 获取信息
    getInfo () {
      api.info(this.dataForm.stdId).then(data => {
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
