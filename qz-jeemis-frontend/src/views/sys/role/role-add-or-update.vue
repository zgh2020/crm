<template>
    <el-dialog :close-on-click-modal="false"
               :close-on-press-escape="false"
               v-qz-dialog-drag
               :modal="false"
               :visible.sync="visible">
        <template slot="title">
            <div class="diaglogtitle">
                <d2-icon-svg class="dialog-icon" name="d2-admin"></d2-icon-svg>
                <span style="line-height: 0.5"> {{title}} </span>
            </div>
        </template>
        <el-form :model="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px"
                 ref="dataForm">
            <el-form-item :label="$t('role.name')" prop="name">
                <el-input :placeholder="$t('role.name')" v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('role.remark')" prop="remark">
                <el-input :placeholder="$t('role.remark')" v-model="dataForm.remark"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item size="mini" :label="$t('role.menuList')">
                        <qz-tree-menu ref="menuListTree"  show-checkbox
                                        default-expand-all
                                        style="height: 300px">
                        </qz-tree-menu>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item size="mini" :label="$t('role.deptList')">
                        <qz-dept-tree-gen-all ref="deptListTree" show-checkbox style="height: 300px"> </qz-dept-tree-gen-all>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template slot="footer">
            <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
            <el-button  v-loading="loading" @click="dataFormSubmitHandle()" type="primary">{{ $t('confirm') }}</el-button>
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
      dataForm: {
        id: '',
        name: '',
        remark: '',
        menuIdList: [],
        deptIdList: []
      },
      title: '',
      loading: false
    }
  },
  computed: {
    dataRule () {
      return {
        name: [
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
        this.$nextTick(() => {
          this.$refs.menuListTree.setCheckedKeys([])
          this.$refs.deptListTree.setCheckedKeys([])
          this.dataForm.menuIdList.forEach(item => this.$refs.menuListTree.setChecked(item, true))
          this.$refs.deptListTree.setCheckedKeys(this.dataForm.deptIdList, false)
        })
      })
    },
    // 表单提交
    async dataFormSubmitHandle () {
      const valid = await this.$refs.dataForm.validate().catch(() => {
        return util.$message.showInfo2('校验错误')
      })
      if (!valid) return
      this.loading = true
      this.dataForm.menuIdList = [
        ...this.$refs.menuListTree.getHalfCheckedKeys(),
        ...this.$refs.menuListTree.getCheckedKeys()
      ]
      this.dataForm.deptIdList = this.$refs.deptListTree.getCheckedKeys()
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
