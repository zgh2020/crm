<template>
    <qz-dialog :title="titleName" :visible.sync="visible" top="12vh" width="680px">
        <el-form size="small">
            <el-form-item>
                <div>请选择目的文件夹：
                <folder-tree :style="{height: '300px',border: '1px inset',margin: '2px'}" @current-change="folderChangeHandle" ref="qzTree"/>
                </div>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="dataForm.copy">复制文件</el-checkbox>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="visible = false" size="small">{{ $t('cancel') }}</el-button>
            <el-button @click="dataFormSubmitHandle" size="small" type="primary" v-loading="loading">{{ $t('confirm') }}</el-button>
        </template>
    </qz-dialog>
</template>
<script>
import * as api from './api'
import util from '@/libs/util'
import folderTree from './folder-tree'

export default {
  components: {
    folderTree
  },
  data () {
    return {
      visible: false,
      tableData: [],
      title: '复制文件',
      loading: false,
      pid: '',
      folders: [],
      dataForm: { pid: '', copy: true, files: [] }
    }
  },
  mounted () {

  },
  methods: {
    init () {
      this.loading = false
      this.visible = true
    },
    folderChangeHandle (data, node) {
      this.dataForm.pid = data.id
      this.folders = [this.pid, data.id]
    },
    async dataFormSubmitHandle () {
      if (this.pid === this.dataForm.pid) {
        util.$message.showInfo('目标目录与原目录相同')
        return
      }
      this.loading = true
      await api.copyFile(this.dataForm)
      this.loading = false
      await util.$message.showInfo('保存成功')
      this.visible = false
      this.$emit('onUpdateSuccess', this.folders)
    }
  },
  computed: {
    titleName () {
      if (this.dataForm.copy) return '复制文件'
      return '移动文件'
    }
  }
}
</script>
