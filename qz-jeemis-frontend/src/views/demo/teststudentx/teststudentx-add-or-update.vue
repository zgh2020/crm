<template>
    <qz-dialog :title="title" :visible.sync="visible" top="6vh" width="600px">
        <el-form :model="dataForm" :rules="dataRule" label-width="90px" ref="dataForm" size="mini">
               <el-form-item prop="name" label="姓名">
                  <el-input clearable placeholder="姓名" v-model="dataForm.name"></el-input>
               </el-form-item>
               <el-form-item prop="birthday" label="生日">
                  <qz-input-date placeholder="生日" v-model="dataForm.birthday" valueFormat="YYYY-MM-DD"></qz-input-date>
               </el-form-item>
               <el-form-item prop="sex" label="性别">
                  <qz-select-code clearable codeid="AX" v-model="dataForm.sex"></qz-select-code>
               </el-form-item>
               <el-form-item prop="address" label="地址">
                  <el-input clearable placeholder="地址" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="dataForm.address"></el-input>
               </el-form-item>
               <el-form-item prop="age" label="年龄">
                  <el-input-number :min="0" controls-position="right" v-model="dataForm.age" style="width: 100%"/>
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
      dataForm: {
        stdId: '',
        name: '',
        birthday: '',
        sex: '',
        sexDesc: '',
        address: '',
        age: undefined
      },
      title: '',
      loading: false,
      isAdd: false
    }
  },
  computed: {
    dataRule () {
      return {
        name: [{ required: true, message: this.$t('validate.required'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    init () {
      this.title = !this.dataForm.stdId ? this.$t('add') : this.$t('update')
      this.isAdd = !this.dataForm.stdId
      this.visible = true
      this.$nextTick(() => {
        if (this.isAdd) {
          this.$refs.dataForm && this.$refs.dataForm.resetFields()
          this.dataForm.stdId = ''
        } else {
          this.getInfo()
          this.$refs.dataForm && this.$refs.dataForm.clearValidate()
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
