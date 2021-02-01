<template>
    <qz-dialog :title="!dataForm.id ? $t('add') : $t('update')"
               :visible.sync="visible" top="7vh">
        <el-form :model="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px"
                 ref="dataForm" size="mini">
            <el-form-item :label="$t('user.username')" prop="username">
                <el-input :placeholder="$t('user.username')" v-model="dataForm.username"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.deptName')" class="dept-list" prop="deptId">
                <qz-input-dept-tree-gen :placeholder="$t('user.deptName')"
                                        v-model="dataForm.deptId" :autoTranslate="true"></qz-input-dept-tree-gen>
            </el-form-item>
            <el-form-item :class="{ 'is-required': !dataForm.id }" :label="$t('user.password')" prop="password">
                <el-input :placeholder="$t('user.password')" type="password" v-model="dataForm.password"></el-input>
            </el-form-item>
            <el-form-item :class="{ 'is-required': !dataForm.id }" :label="$t('user.comfirmPassword')"
                          prop="comfirmPassword">
                <el-input :placeholder="$t('user.comfirmPassword')" type="password"
                          v-model="dataForm.comfirmPassword"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.realName')" prop="realName">
                <el-input :placeholder="$t('user.realName')" v-model="dataForm.realName"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.gender')" prop="gender" size="mini">
                <el-radio-group v-model="dataForm.gender">
                    <el-radio :label="0">{{ $t('user.gender0') }}</el-radio>
                    <el-radio :label="1">{{ $t('user.gender1') }}</el-radio>
                    <el-radio :label="2">{{ $t('user.gender2') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('user.email')" prop="email">
                <el-input :placeholder="$t('user.email')" v-model="dataForm.email"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.mobile')" prop="mobile">
                <el-input :placeholder="$t('user.mobile')" v-model="dataForm.mobile"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.roleIdList')" class="role-list" prop="roleIdList">
                <qz-select-role :placeholder="$t('user.roleIdList')" multiple v-model="dataForm.roleIdList"></qz-select-role>
            </el-form-item>
            <el-form-item :label="$t('user.status')" prop="status" size="mini">
                <el-radio-group v-model="dataForm.status">
                    <el-radio :label="0">{{ $t('user.status0') }}</el-radio>
                    <el-radio :label="1">{{ $t('user.status1') }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
            <el-button @click="dataFormSubmitHandle()" type="primary">{{ $t('confirm') }}</el-button>
        </template>
    </qz-dialog>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  data () {
    return {
      visible: false,
      deptList: [],
      deptListVisible: false,
      roleList: [],
      roleIdListDefault: [],
      dataForm: {
        id: '',
        username: '',
        deptId: '0',
        deptName: '',
        password: '',
        comfirmPassword: '',
        realName: '',
        gender: 0,
        email: '',
        mobile: '',
        roleIdList: [],
        status: 1
      }
    }
  },
  computed: {
    dataRule () {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        callback()
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        if (this.dataForm.password !== value) {
          return callback(new Error(this.$t('user.validate.comfirmPassword')))
        }
        callback()
      }
      return {
        username: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: this.$t('validate.required'), trigger: 'change' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: 'blur' }
        ],
        realName: [
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
        this.roleIdListDefault = []
        if (this.dataForm.id) {
          this.getInfo()
        }
      })
    },
    // 获取信息
    getInfo () {
      this.$axios.get(`/sys/user/${this.dataForm.id}`).then((res) => {
        this.dataForm = {
          ...this.dataForm,
          ...res,
          roleIdList: []
        }
        // 角色配置, 区分是否为默认角色
        this.dataForm.roleIdList = [...res.roleIdList]
        this.roleIdListDefault = [...res.roleIdList]
      })
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs.dataForm.validate((valid) => {
        if (!valid) {
          return false
        }
        this.$axios[!this.dataForm.id ? 'post' : 'put']('/sys/user', {
          ...this.dataForm
          /* roleIdList: [
            ...this.dataForm.roleIdList,
            ...this.roleIdListDefault
          ] */
        }).then((res) => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }).catch(() => {
        })
      })
    }, 1000, { leading: true, trailing: false })
  }
}
</script>

<style lang="scss">
</style>
