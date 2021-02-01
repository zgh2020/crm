<template>
    <qz-dialog :title="$t('updatePassword.title')" :allowMaximize="false"
               :visible.sync="visible" top="17vh" width="600px" @closed="close">
        <el-form :model="dataForm" :rules="dataRule" label-width="120px" ref="dataForm" size="mini">
            <el-form-item :label="$t('updatePassword.password')" prop="password">
                <el-input :placeholder="$t('updatePassword.password')" type="password" v-model="dataForm.password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('updatePassword.newPassword')" prop="newPassword">
                <el-input :placeholder="$t('updatePassword.newPassword')" type="password" v-model="dataForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item  :label="$t('updatePassword.comfirmPassword')" prop="comfirmPassword">
                <el-input :placeholder="$t('updatePassword.comfirmPassword')" type="password"
                          v-model="dataForm.comfirmPassword"></el-input>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="close">{{ $t('cancel') }}</el-button>
            <el-button @click="dataFormSubmitHandle()" type="primary" v-loading="loading">{{ $t('confirm') }}</el-button>
        </template>
    </qz-dialog>
</template>

<script>
import util from '@/libs/util'
import Account from '@api/sys.login'
export default {
  data () {
    return {
      visible: false,
      loading: false,
      dataForm: {
        password: '',
        newPassword: '',
        comfirmPassword: ''
      }
    }
  },
  computed: {
    dataRule () {
      const validatePassword = (rule, value, callback) => {
        if (!/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        callback()
      }
      const validateComfirmPassword = (rule, value, callback) => {
        if (!/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        if (this.dataForm.newPassword !== value) {
          return callback(new Error(this.$t('user.validate.comfirmPassword')))
        }
        callback()
      }
      return {
        password: [
          { validator: validatePassword, trigger: 'blur' },
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePassword, trigger: 'blur' },
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: 'blur' },
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm && this.$refs.dataForm.resetFields()
        this.loading = false
      })
    },
    // 表单提交
    async dataFormSubmitHandle () {
      const valid = await this.$refs.dataForm.validate().catch(() => {
        return util.$message.showInfo2('校验错误')
      })
      if (!valid) { return false }
      this.loading = true
      await Account.changePassword(this.dataForm).catch((err) => {
        this.loading = false
        throw err
      })
      this.loading = false
      await util.$message.showInfo('修改成功')
      this.close()
    },
    close () {
      this.visible = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
</style>
