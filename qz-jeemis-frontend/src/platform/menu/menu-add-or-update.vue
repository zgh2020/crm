<template>
    <qz-dialog
            :visible.sync="dialogVisible"
            @closed="closeDialog"
            width="800px"
            top="10vh"
            :title="title">
        <el-form class="el-form" :model="dataForm" :rules="dataRule" ref="dataForm"
                 @keyup.enter.native="dataFormSubmitHandle()" label-width="120px" size="small" style="margin: 20px">
            <el-form-item prop="type" label="菜单类型" size="mini">
                <el-radio-group v-model="dataForm.type">
                    <el-radio :label="0">菜单</el-radio>
                    <el-radio :label="1">按钮</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-show="false" prop="id">
                <el-input v-model="dataForm.id" placeholder=""/>
            </el-form-item>
            <el-form-item prop="title" label="菜单名称">
                <el-input v-model="dataForm.title" placeholder=""/>
            </el-form-item>
            <el-form-item prop="pid" v-show="false">
                <el-input v-show="false" placeholder=""/>
            </el-form-item>
            <el-form-item prop="parentName" label="父菜单名称" class="menu-list">
                <el-popover v-model="menuListVisible" ref="menuListPopover" placement="bottom-start" trigger="click">
                    <menu-tree @node-click="onMenuTreeNodeClick" ref="menuTree"/>
                </el-popover>
                <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true" placeholder="根节点">
                    <i slot="suffix" @click.stop="restParentTitle()" class="el-icon-circle-close el-input__icon"/>
                </el-input>
            </el-form-item>
            <el-form-item v-if="dataForm.type === 0" prop="path" label="路由">
                <el-input v-model="dataForm.path" placeholder=""/>
            </el-form-item>
            <el-form-item v-if="dataForm.type === 0" prop="component" label="组件名称">
                <el-input v-model="dataForm.component" placeholder=""/>
            </el-form-item>
            <el-form-item v-if="dataForm.type === 0" prop="componentpath" label="组件路径">
                <el-input v-model="dataForm.componentpath" placeholder=""/>
            </el-form-item>
            <el-form-item prop="permissions" label="授权标识">
                <el-input v-model="dataForm.permissions" placeholder="授权标识"/>
            </el-form-item>
            <el-form-item v-if="dataForm.type === 0" prop="icon" label="菜单图标" class="icon-list">
                <el-col :span="12">
                    <el-input v-model="dataForm.icon" @input="getIconName" placeholder="菜单图标"/>
                </el-col>
                <el-col :span="12">
                    <d2-icon-select ref='icon-select' v-model="dataForm.icon"></d2-icon-select>
                </el-col>
            </el-form-item>
            <el-form-item v-if="dataForm.type === 0" prop="hasCache" label="页面缓存" >
                <el-checkbox v-model="dataForm.hasCache">缓存</el-checkbox>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" v-loading="loading" @click="dataFormSubmitHandle()">保存</el-button>
        </template>
    </qz-dialog>
</template>
<script>
import * as api from './api.js'
import menuTree from './menu-tree'
import util from '@/libs/util'

export default {
  name: 'menu-add-or-update',
  components: { menuTree },
  props: [],
  data () {
    return {
      title: '增加修改机构',
      dialogVisible: false,
      menuInputTreeData: [],
      menuListVisible: false,
      dataForm: {},
      loading: false,
      dataRule: {
        title: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        pid: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        parentName: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    initAdd (pid) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.title = '新增菜单'
        api.getMenuItem(pid, '').then((data) => {
          this.dataForm = data
          this.$refs.dataForm.clearValidate()
        })
      })
    },
    initEdit (id) {
      this.title = '编辑菜单'
      this.dialogVisible = true
      api.getMenuItem('', id).then((data) => {
        this.dataForm = data
        this.$refs.dataForm.clearValidate()
      })
    },
    // 表单提交
    async dataFormSubmitHandle () {
      const valid = this.$refs.dataForm.validate().catch(() => {
        util.$message.showInfo2('校核错误')
      })
      if (!valid) { return }
      this.loading = true
      const data = await api.saveMenuInfo(this.dataForm).catch(() => { this.loading = false })
      if (!data) return
      this.loading = false
      await util.$message.showInfo('保存成功')
      this.$emit('onUpdateSuccess', data)
      this.closeDialog()
    },

    onMenuTreeNodeClick (data) {
      // data为当前点击的节点对象
      this.$nextTick(() => {
        this.dataForm.parentName = data.title
        this.dataForm.pid = data.id
      })
    },
    getIconName (name) {
      this.dataForm.icon = name
    },
    restParentTitle () {
      this.dataForm.pid = '0'
      this.dataForm.parentName = '根节点'
    },
    closeDialog () {
      this.dialogVisible = false
      this.$emit('closed')
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>

</style>
