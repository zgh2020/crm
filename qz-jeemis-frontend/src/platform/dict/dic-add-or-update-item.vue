<template>
    <el-dialog
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal="false"
            :visible.sync="visible"
            top="22vh"
            v-qz-dialog-drag
            width="700px">
        <template slot="title">
            <div class="diaglogtitle">
                <d2-icon-svg class="dialog-icon" name="d2-admin"></d2-icon-svg>
                <span style="line-height: 0.5"> {{title}} </span>
            </div>
        </template>
        <el-form :model="codeItem" :rules="dataRule" @keyup.enter.native="dataFormSubmitHandle()"
                 label-width="100px"
                 ref="dataForm" size="mini">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="代码类" size="mini">
                        <el-input :disabled="true" placeholder="" v-model="codeIdDesc"/>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item label="上层代码" size="mini">
                        <el-input :disabled="true" placeholder="" v-model="codePptrDesc"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="代码" prop="code" size="mini">
                <el-input placeholder="" v-model="codeItem.code"/>
            </el-form-item>
            <el-form-item label="代码描述" prop="description" size="mini">
                <el-input @change="onChangeDesc" placeholder="" v-model="codeItem.description"/>
            </el-form-item>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="简称" prop="shortname" size="mini">
                        <el-input  v-model="codeItem.shortname"/>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item label="别名" prop="description1" size="mini">
                        <el-input  v-model="codeItem.description1"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="简拼" prop="spell" size="mini">
                <el-input  v-model="codeItem.spell"/>
            </el-form-item>
            <el-form-item label="是否显示" prop="hashide" size="mini">
                <el-select placeholder="选择" v-model="codeItem.hashide">
                    <el-option
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            v-for="item in options">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报送代码" prop="zzbcode" size="mini">
                <el-input placeholder="" v-model="codeItem.zzbcode"/>
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
  name: 'dic-add-or-update',
  props: [],
  data () {
    return {
      title: '增加修改机构',
      visible: false,
      isEdit: false,
      codeItem: {},
      codeCollect: {},
      codePptrItem: {},
      loading: false,
      dataRule: {
        code: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 7, message: '长度不能超过7 个字符' }
        ],
        description: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        shortname: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        spell: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        hashide: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      options: [{
        value: false,
        label: '是'
      }, {
        value: true,
        label: '否'
      }]
    }
  },
  mounted () {
  },
  methods: {
    async initAdd (codeId, pptr) {
      this.title = '新建代码项'
      let pptr1 = pptr
      if (!pptr) pptr1 = codeId
      const data = await api.getNewSysCodeItem(codeId, pptr1)
      if (!data) {
        return
      }
      this.codeItem = data.codeItem
      this.codeCollect = data.codeCollect
      this.codePptrItem = data.codePptr
      this.dataRule.code[1].max = this.codeCollect.length * 1
      this.dataRule.code[1].message = '长度不能超过' + this.codeCollect.length + '个字符'
      this.visible = true
      this.isEdit = false
    },
    async initEdit (pkid) {
      this.title = '编辑代码项'
      const data = await api.getSysCodeItem(pkid)
      if (!data) {
        return
      }
      this.codeItem = data.codeItem
      this.codeCollect = data.codeCollect
      this.codePptrItem = data.codePptr
      this.dataRule.code[1].max = this.codeCollect.length * 1
      this.dataRule.code[1].message = '长度不能超过' + this.codeCollect.length + '个字符'
      this.visible = true
      this.isEdit = false
    },
    async onChangeDesc (value) {
      if (!value) {
        this.codeItem.spell = ''
        return
      }
      this.codeItem.spell = await api.getSimplePinYin(value)
      if (!this.codeItem.description1 || this.codeItem.description === this.codeItem.description1) {
        this.codeItem.description1 = value
      }
      if (!this.codeItem.shortname || this.codeItem.description === this.codeItem.shortname) {
        this.codeItem.shortname = value
      }
    },
    // 表单提交
    dataFormSubmitHandle () {
      this.$refs.dataForm.validate((valid) => {
        if (!valid) {
          return
        }
        this.loading = true
        api.saveCodeItem(this.codeItem).then(res => {
          this.codeItem = res
          this.isEdit = true
          util.$message.showInfo2('保存成功')
          this.loading = false
          this.$emit('saveCodeItem', res)
        }).catch(async err => {
          await util.$message.showError(err)
          this.loading = false
        })
      })
    }
  },
  computed: {
    codeIdDesc: function () {
      if (!this.codeCollect) return ''
      return this.codeCollect.codeid + '-' + this.codeCollect.description
    },
    codePptrDesc: function () {
      if (!this.codePptrItem) return ''
      return this.codePptrItem.code + '-' + this.codePptrItem.description
    }

  },
  watch: {}
}
</script>

<style scoped>

</style>
