<template>
    <el-dialog
            :close-on-click-modal="false"
            :close-on-press-escape="true"
            :modal="false"
            :visible.sync="dialogVisible"
            top="22vh"
            v-qz-dialog-drag
            width="600px">
        <template slot="title">
            <div class="diaglogtitle">
                <d2-icon-svg class="dialog-icon" name="d2-admin"></d2-icon-svg>
                <span style="line-height: 0.5"> {{title}} </span>
            </div>
        </template>
        <el-form :model="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmitHandle" label-width="120px"
                 ref="dataForm" size="mini">
            <el-form-item label="类别" prop="typeid" size="mini">
                <el-input :disabled="true" placeholder="" v-model="dataForm.typeid"/>
            </el-form-item>
            <el-form-item label="代码类" prop="codeid" size="mini">
                <el-input :disabled.sync="isEdit" maxlength="2" placeholder="" v-model="dataForm.codeid"/>
            </el-form-item>
            <el-form-item label="代码类描述" prop="description" size="mini">
                <el-input placeholder="" v-model="dataForm.description"/>
            </el-form-item>
            <el-form-item label="代码长度" prop="length">
                <el-input-number :min="1" v-model="dataForm.length"></el-input-number>
            </el-form-item>
            <el-form-item label="是否录到最底层" prop="layer" size="mini">
                <el-select placeholder="请选择" v-model="dataForm.layer">
                    <el-option
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            v-for="item in options">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="dialogVisible = false" size="mini">取消</el-button>
            <el-button :loading="loading" @click="dataFormSubmitHandle" size="mini" type="primary">保存</el-button>
        </template>
    </el-dialog>
</template>
<script>
import * as api from './api.js'
import util from '@/libs/util'

export default {
  name: 'code-collect-add-or-update',
  props: [],
  data () {
    return {
      title: '',
      dialogVisible: false,
      dataForm: {
        typeid: '1:系统编码',
        codeid: '',
        description: '',
        length: '',
        hashide: '',
        layer: ''
      },
      isSave: false, //  是否保存
      loading: false,
      isEdit: false,
      dataRule: {
        codeid: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        hashide: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        layer: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      options: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }]
    }
  },
  methods: {
    async initAdd () {
      this.title = '新建代码类'
      // this.dataForm = {}
      this.dataForm = {
        typeid: '1:系统编码',
        codeid: '',
        description: '',
        length: '2',
        hashide: '0',
        layer: '0'
      }
      this.dialogVisible = true
      this.isEdit = false
    },
    async initEdit (codeId) {
      this.title = '编辑代码类'
      this.dialogVisible = true
      this.dataForm = await api.getSysCodeCollect(codeId)
      this.isEdit = true
    },
    // 表单提交
    dataFormSubmitHandle () {
      this.$refs.dataForm.validate((valid) => {
        if (!valid) {
          return false
        }
        this.loading = true
        api.saveCodeCollect(this.dataForm).then(async res => {
          this.loading = false
          this.dataForm = res
          this.isEdit = true
          this.$emit('saveCodeCollect', res)
          await util.$message.showInfo('保存成功')
          this.dialogVisible = false
        }).catch(async (err) => {
          this.loading = false
          await util.$message.showInfo(err)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
