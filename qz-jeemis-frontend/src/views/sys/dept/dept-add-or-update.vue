<template>
    <el-dialog
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal="false"
            :visible.sync="visible"
            top="22vh"
            v-qz-dialog-drag
            width="500px">
        <template slot="title">
            <div class="diaglogtitle">
                <d2-icon-svg class="dialog-icon" name="d2-admin"></d2-icon-svg>
                <span style="line-height: 0.5"> {{title}} </span>
            </div>
        </template>
        <el-form :model="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px"
                 ref="dataForm" size="mini">
            <el-form-item label="上级部门" prop="pid">
                <qz-input-dept-tree-gen :autoTranslate="true" :disabled="true" placeholder="上级部门"
                                        v-model="dataForm.pid"/>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input @change="onChangeDesc" placeholder="名称" v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <qz-select-code codeid="Z3" placeholder="类型" v-model="dataForm.type"/>
            </el-form-item>
            <el-form-item label="简拼" prop="spell">
                <el-input :autoTranslate="true" placeholder="简拼" v-model="dataForm.spell"/>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="visible = false" size="mini">返回</el-button>
            <el-button :loading="loading" @click="dataFormSubmitHandle" size="mini" type="primary">保存</el-button>
        </template>
    </el-dialog>
</template>
<script>
import * as api from './api.js'
import util from '@/libs/util'

export default {
  name: 'dept-add-or-update',
  props: [],
  data () {
    return {
      title: '增加修改机构',
      visible: false,
      loading: false,
      dataForm: {},
      dataRule: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        spell: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    async initAdd (pId) {
      this.title = '新增机构'
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        this.$refs.dataForm.clearValidate()
        this.dataForm = { pid: pId }
      })
    },
    async initEdit (pkId) {
      this.title = '编辑机构'
      this.dataForm = await api.getInfo(pkId)
      if (!this.dataForm) {
        await util.$message.showInfo('未发现机构')
        return
      }
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
      this.visible = true
    },
    async onChangeDesc (value) {
      if (!value) {
        this.dataForm.spell = ''
        return
      }
      this.dataForm.spell = await util.$gen.getSimplePinYin(value)
    },
    // 表单提交 异步写法
    async dataFormSubmitHandle () {
      const valid = await this.$refs.dataForm.validate().catch(() => {
        util.$message.showInfo2('校验错误')
      })
      if (!valid) return
      this.loading = true
      const data = await api.saveInfo(this.dataForm).catch(err => {
        util.$message.showInfo2(err)
      })
      this.loading = false
      if (!data) return
      await util.$message.showInfo('保存成功')
      this.$emit('updateSuccess', data)
      this.visible = false
    },
    // 表单提交 普通写法
    dataFormSubmitHandle2 () {
      this.$refs.dataForm.validate((valid) => {
        if (!valid) {
          return
        }
        this.loading = true
        api.saveInfo(this.dataForm).then(res => {
          this.dataForm = res
          this.isEdit = true
          util.$message.showInfo2('保存成功')
          this.loading = false
          this.$emit('saveInfo', res)
        }).catch(async err => {
          await util.$message.showError(err)
          this.loading = false
        })
      })
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>

</style>
