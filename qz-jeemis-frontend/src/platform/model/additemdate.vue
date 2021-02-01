<template>
    <el-dialog class="eldialog" style="width: 80%;margin-left: 10%;" :visible.sync="visible" :title.sync="title" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form class="el-form" size="mini" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
            <el-row>
                <el-col>
                    <el-form-item prop="description" label="指标项描述:" size="mini">
                        <el-input v-model="dataForm.description" placeholder="指标项描述，不超50字符"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
                <el-col :span="12">
                    <el-form-item prop="fieldname" label="指标项名称:" size="mini">
                        <el-input @input="upper" v-model="dataForm.fieldname" placeholder="指标项名称，不超10字符"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item  label="数据类型:" size="mini">
                        <el-select v-model="dataForm.fieldtype" placeholder="请选择" @change="dataTypeChange(dataForm.fieldtype)" value="">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row  type="flex" class="row-bg">
                <el-col  :span="12">
                    <el-form-item prop="fieldlen" label="指定长度:" size="mini">
                        <el-input maxlength="11" v-model="dataForm.fieldlen" placeholder="指定长度,不超11位数字" auto-complete="off"/>
                    </el-form-item>
                </el-col>
                <el-col  :span="12">
                    <el-form-item prop="fielddec" label="小数位数:" size="mini" v-show="isnumeric">
                        <el-input maxlength = '2' v-model="dataForm.fielddec" placeholder="小数位数,不超2位数字"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item  label="相关代码:" size="mini">
                        <el-select style="width: 100%;" v-model="dataForm.codeid" placeholder="请选择" value="">
                            <el-option
                                    v-for="item in codesollect"
                                    :key="item.codeid"
                                    :label="formatCodeCollect(item)"
                                    :value="item.codeid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item prop="formula" label="计算公式:" size="mini">
                        <el-input maxlength="2" v-model="dataForm.formula" placeholder="计算公式，不超255字符"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
            <el-form-item prop="checkrule" label="审核规则:" size="mini">
                <el-input v-model="dataForm.checkrule" placeholder="审核规则，不超255字符"/>
            </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item prop="checkmsg" label="审核提示:" size="mini">
                        <el-input v-model="dataForm.checkmsg" placeholder="审核提示，不超255字符"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item prop="state" label="指标解释:" size="mini">
                        <el-input v-model="dataForm.state" placeholder="指标解释，不超255字符"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item size="mini">
                    <el-checkbox v-model="dataForm.hasSystem">系统</el-checkbox>
                    <el-checkbox v-model="dataForm.hasHide">隐藏</el-checkbox>
                    <el-checkbox v-model="dataForm.hasBusiness">业务</el-checkbox>
                </el-form-item>
            </el-row>
        </el-form>
        <template slot="footer">
            <el-button size="mini" @click="visible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="dataFormSubmitHandle()">保存</el-button>
        </template>
    </el-dialog>
</template>
<script>
import * as api from './api.js'
import debounce from 'lodash/debounce' //  防抖动
import util from '@/libs/util'
export default {
  name: 'dept-add-or-update',

  components: {
  },
  props: [],
  data () {
    const validfieldname = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]+$/
      if (value) {
        if (!reg.test(value)) {
          callback(new Error('请输入数字或字母'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validfield = (rule, value, callback) => {
      const reg = /^[0-9]+$/
      if (value) {
        if (!reg.test(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      title: '增加修改指标项',
      visible: false,
      isnumeric: false,
      codesollect: [],
      dataForm: {
        id: '',
        setid: '',
        fieldtype: '',
        fieldname: '',
        description: '',
        fieldlen: 0,
        fielddec: 0,
        checkmsg: '',
        checkrule: '',
        codeid: '',
        formula: '',
        state: '',
        hasHide: false,
        hasSystem: false,
        hasBusiness: false
      },
      isSave: false, //  是否保存
      loading: false,
      dataRule: {
        fieldname: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 10, message: '长度不能超过10 个字符' },
          { validator: validfieldname, message: '请输入数字或者字母' }
        ],
        description: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 50, message: '长度不能超过50 个字符' }
        ],
        formula: [
          { max: 255, message: '长度不能超过255个字符' }
        ],
        checkrule: [
          { max: 255, message: '长度不能超过255个字符' }
        ],
        checkmsg: [
          { max: 255, message: '长度不能超过255个字符' }
        ],
        state: [
          { max: 255, message: '长度不能超过255个字符' }
        ],
        fieldlen: [
          { validator: validfield, message: '输入数字' }
        ],
        fielddec: [
          { validator: validfield, message: '输入数字' }
        ]
      },
      options: [{
        value: 'varchar',
        label: '字符型'
      }, {
        value: 'int',
        label: '数字型'
      }, {
        value: 'datetime',
        label: '日期型'
      }, {
        value: 'text',
        label: '文本型'
      }, {
        value: 'datetime8',
        label: '八位日期型'
      }, {
        value: 'datetime6',
        label: '六位日期型'
      }, {
        value: 'numeric',
        label: '精确数字型'
      }]
    }
  },
  mounted () {
  },
  methods: {
    async initAdd (setId) {
      this.title = '新增指标项'
      this.clearHistory()
      this.getCodeCollect()
      this.dataForm.setid = setId
      this.visible = true
    },
    async initEdit (setId, id) {
      this.title = '编辑代码项'
      this.getCodeCollect()
      this.dataForm.setid = setId
      this.dataForm = await api.getModelItem(id)
      this.isnumeric = this.dataForm.fieldtype === 'numeric'
      this.visible = true
    },
    getCodeCollect () {
      api.getCodeCollect().then(res => {
        this.codesollect = res
      })
    },
    formatCodeCollect (item) {
      return item.codeid + ': ' + item.description
    },
    dataTypeChange (value) {
      this.isnumeric = value === 'numeric'
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs.dataForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        const result = await api.checkModelItem(this.dataForm)
        if (!result) {
          util.$message.showInfo('该指标项名称已存在')
          return false
        }
        api.saveModelItem(this.dataForm).then(res => {
          let msg = '操作成功'
          let type = 'success'
          if (!res) {
            msg = '操作失败'
            type = 'error'
          }
          this.$message({
            message: msg,
            type: type,
            duration: 500,
            onClose: () => {
              if (res != null) {
                this.$emit('onUpdateTableSuccess', this.dataForm.setid)
                this.visible = false
              }
            }
          })
        })
      })
    }, 1000, { leading: true, trailing: false }),
    async onNextAdd () {

    },
    async onClosed () {

    },
    onNodeClick (data) {
      // data为当前点击的节点对象
      this.$nextTick(() => {
        this.dataForm.parentTitle = data.title
        this.dataForm.pid = data.id
      })
    },
    getIconName (name) {
      this.dataForm.icon = name
    },
    restParentTitle () {
      this.dataForm.pid = ''
      this.dataForm.parentTitle = '根节点'
    },
    upper (value) {
      if (!value) this.dataForm.fieldname = ''
      value = value.toString()
      this.dataForm.fieldname = value.toLowerCase()
    },
    clearHistory () {
      this.dataForm.id = ''
      this.dataForm.setid = ''
      this.dataForm.fieldtype = ''
      this.dataForm.fieldname = ''
      this.dataForm.description = ''
      this.dataForm.fieldlen = ''
      this.dataForm.fielddec = ''
      this.dataForm.checkmsg = ''
      this.dataForm.checkrule = ''
      this.dataForm.codeid = ''
      this.dataForm.formula = ''
      this.dataForm.state = ''
      this.dataForm.hasHide = false
      this.dataForm.hasSystem = false
      this.dataForm.hasBusiness = false
      this.isnumeric = false
    }
  },
  computed: {},
  watch: {

  }
}
</script>

<style scoped>
    >>> .el-dialog{
        width: 40% ! important;
    }
    .el-form{
        padding-right: 60px;
    }
    .el-input[data-v-215bf53a]{
        display: inline;
    }
    .el-input[data-v-215bf53a] .el-input__inner{
        width:70%;
    }

</style>
