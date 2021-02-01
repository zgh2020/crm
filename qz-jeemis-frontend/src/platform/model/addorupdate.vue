<template>
  <el-dialog class="eldialog"
             :visible.sync="visible"
             :title.sync="title"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             v-qz-dialog-drag
             :modal="false"
             width="600px">
    <div style="text-align: center;margin-bottom: 10px;">
      <span style="font-size: 24px;font-weight: 500">{{typeName}}</span>
    </div>
    <el-form class="el-form" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
      <el-input type="hidden" v-model="dataForm.type"/>
      <el-form-item prop="setid" label="子集名称：" size="mini">
        <el-input @input="upper" v-model="dataForm.setid" placeholder="" />
      </el-form-item>
      <el-form-item prop="description" label="子集描述:" size="mini">
      <el-input v-model="dataForm.description" placeholder=""/>
    </el-form-item>
      <el-form-item label="" size="mini">
        <el-checkbox v-model="dataForm.hasSystem">系统</el-checkbox>
        <el-checkbox v-model="dataForm.hasHide">隐藏</el-checkbox>
        <el-checkbox v-model="dataForm.hasBusiness">业务</el-checkbox>
        <el-checkbox v-model="dataForm.hasOneRow">一对一</el-checkbox>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="dataFormSubmitHandle()">保存</el-button>
    </template>
  </el-dialog>
</template>
<script>
import * as api from './api.js'
import util from '@/libs/util'

export default {
  name: 'table-add-or-update',

  components: {
  },
  props: [],
  data () {
    const validSetid = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z_]+$/
      if (value) {
        if (!reg.test(value)) {
          callback(new Error('请输入数字或英文'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      title: '增加修改指标集',
      visible: false,
      typeName: '指标集',
      addoredit: true,
      dataForm: {
        id: null,
        type: null,
        setid: '',
        description: '',
        hasHide: false,
        hasSystem: false,
        hasBusiness: false,
        hasOneRow: false,
        setidOld: ''
      },
      isSave: false, //  是否保存
      loading: false,
      dataRule: {
        setid: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 20, message: '长度不能超过20个字符' },
          { validator: validSetid, message: '请输入数字或者字母' }
        ],
        description: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 150, message: '长度不能超过150个字符' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    init (isNew, type, typeName, setId) {
      if (isNew) {
        this.initAdd(type, typeName)
      } else {
        this.initEdit(type, typeName, setId)
      }
    },
    async initAdd (typeId, typeName) {
      this.$nextTick(async () => {
        this.title = '新建指标集'
        this.typeName = typeName
        this.visible = true
        this.dataForm = await api.getNewModelSet()
        this.dataForm.type = typeId
      })
    },
    initEdit (typeId, typeName, setId) {
      this.$nextTick(() => {
        this.title = '编辑指标集'
        this.dataForm.type = typeId
        this.typeName = typeName
        this.addoredit = false
        api.getModelSet(setId).then(res => {
          if (res) {
            this.dataForm = res
            this.visible = true
            this.dataForm.setidOld = setId
          }
        })
      })
    },
    // 表单提交
    dataFormSubmitHandle () {
      this.$refs.dataForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        const result = await api.checkModelSet(this.dataForm.setid, this.dataForm.type)
        if (!result) {
          util.$message.showInfo('该子集名称已存在')
          return false
        }
        await api.saveModelSet(this.dataForm).then(res => {
          let type = 'success'
          if (!res) {
            type = 'error'
          }
          this.$message({
            message: '操作成功',
            type: type,
            duration: 500,
            onClose: () => {
              if (res != null) {
                this.visible = false
                this.$emit('updateSuccess', this.dataForm.type, this.typeName)
              }
            }
          })
        })
      })
    },
    upper (value) {
      if (!value) this.dataForm.setid = ''
      value = value.toString()
      this.dataForm.setid = value.toLowerCase()
    }
  },
  computed: {},
  watch: {

  }
}
</script>

<style scoped>
  .el-form{
    padding-right : 60px
  }
</style>
