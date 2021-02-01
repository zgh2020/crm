<template>
    <d2-container>
        <div class="container-body">
            <el-form :inline="true" @keyup.enter.native="getDataList2()" class="query-form" size="small">
                <el-form-item>
                    <el-button @click="addFolderHandle" type="primary"
                               v-if="$hasPermission('platform:clouddisk:save')">新增文件夹
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="updateFolderHandle()" type="primary"
                               v-if="$hasPermission('platform:clouddisk:update')">重命名
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="deleteFolderHandle()" type="danger"
                               v-if="$hasPermission('platform:clouddisk:delete')">删除文件夹
                    </el-button>
                </el-form-item>
                <el-form-item label="查找文件">
                    <el-input clearable placeholder="文件名" v-model="dataForm.like_fileName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getDataList2()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="fileUploadHandle" type="success"
                               v-if="$hasPermission('platform:clouddisk:save')">文件上传
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="copyFileHandle" type="warning"
                               v-if="$hasPermission('platform:clouddisk:delete')">
                        复制移动文件
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="deleteFileHandle()" type="danger" v-if="$hasPermission('platform:clouddisk:delete')">
                        删除文件
                    </el-button>
                </el-form-item>
            </el-form>
            <div :style="{height: heightY+'px'}" class="main-split">
                <iv-Split v-model="split1">
                    <div class="tree-split-pane" slot="left">
                        <el-tabs style="margin: -11px;" type="border-card" v-model="activeName">
                            <el-tab-pane class="tree-tab-pane" label="文件夹" name="tree">
                                <folder-tree :style="{height: treeHeightY+'px'}" @current-change="onNodeFolderClick"
                                             ref="qzTree"/>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div :style="{height: heightY+'px'}" class="table-split-grid" slot="right">
                        <file-table  :height="heightY-38+'px'" ref="tableData" @delete-file="deleteFileHandle" @preview-file="previewFile"></file-table>
                    </div>
                </iv-Split>
            </div>
        </div>
        <!-- 文件夹弹窗, 新增 / 修改 -->
        <add-or-update @onUpdateSuccess="onUpdateFolderSuccess" ref="addOrUpdate" v-if="addOrUpdateVisible"></add-or-update>
        <file-upload ref="fileUpload" @onUpdateSuccess="onUpdateSuccess" v-if="fileUploadVisible"></file-upload>
        <file-copy  ref="copyFileDialog"  @onUpdateSuccess="onUpdateSuccess" v-if="fileCopyVisible"></file-copy>
        <qz-file-view-dialog  ref="fileViewDialog"  v-show="fileViewVisible"></qz-file-view-dialog>
    </d2-container>
</template>
<script>
import util from '@/libs/util'
import split2mix from '@/components/qz-mixins/windowresize/split2mix'
import * as api from './api'
import addOrUpdate from './folder-add-or-update'
import fileCopy from './file-copy'
import fileUpload from './file-upload'
import folderTree from './folder-tree'
import fileTable from './file-table'

export default {
  name: 'platform-cloud-disk',
  mixins: [split2mix],
  components: {
    addOrUpdate,
    folderTree,
    fileTable,
    fileUpload,
    fileCopy
  },
  data () {
    return {
      dataForm: {
        // 文件名字
        like_fileName: ''
      },
      activeName: 'tree',
      addOrUpdateVisible: false, // 新增／更新，弹窗addOrUpdateVisible状态
      fileUploadVisible: false,
      fileCopyVisible: false,
      fileViewVisible: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getDataList()
    })
  },
  methods: {
    init () {

    },
    //  增加文件夹
    addFolderHandle () {
      const data = this.$refs.qzTree.getCurrentNode()
      if (!data) {
        util.$message.showInfo2('没有选择目录节点')
        return
      }
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        // 取回父节点
        this.$refs.addOrUpdate.dataForm.id = ''
        this.$refs.addOrUpdate.dataForm.pid = data.id
        this.$refs.addOrUpdate.init()
      })
    },
    //  文件夹改名
    updateFolderHandle () {
      const data = this.$refs.qzTree.getCurrentNode()
      if (!data) {
        util.$message.showInfo2('没有选择目录节点')
        return
      }
      if (data.pid === '0') {
        util.$message.showInfo2('根目录不允许修改')
        return
      }
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        // 取回父节点
        this.$refs.addOrUpdate.dataForm.id = data.id
        this.$refs.addOrUpdate.dataForm.pid = data.pid
        this.$refs.addOrUpdate.init()
      })
    },
    async deleteFolderHandle () {
      const data = this.$refs.qzTree.getCurrentNode()
      if (!data) {
        util.$message.showInfo2('没有选择目录节点')
        return
      }
      if (data.pid === '0') {
        util.$message.showInfo2('根目录不允许删除')
        return
      }
      const ok = await util.$message.showYesNo(`是否确定删除【${data.fileName}】?`)
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      await api.remove([data.id])
      this.$refs.qzTree.removeNode(data.id)
    },
    async deleteFileHandle (id) {
      if (!id && this.$refs.tableData.dataListSelections.length <= 0) {
        return util.$message.showInfo2('请选择需要删除的文件')
      }
      const ok = await util.$message.showYesNo('是否确定删除选择的文件?')
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      const data = id ? [id] : this.$refs.tableData.dataListSelections.map(item => item.id)
      await api.remove(data)
      this.getDataList()
      const folder = this.$refs.qzTree.getCurrentNode()
      this.$refs.qzTree.updateNode(folder.id)
    },
    onUpdateFolderSuccess (data) {
      this.$refs.qzTree.updateNode(data.id)
    },
    onUpdateSuccess (data) {
      data.forEach((id, index) => {
        this.$refs.qzTree.updateNode(id)
      })
      this.getDataList()
    },
    // 文件上传
    async fileUploadHandle () {
      const pid = this.$refs.qzTree.getCurrentKey()
      if (!pid) {
        await util.$message.showInfo('没有选择目录')
        return
      }
      this.fileUploadVisible = true
      await this.$nextTick()
      this.$refs.fileUpload.pid = pid
      this.$refs.fileUpload.init()
    },
    onNodeFolderClick (data, node) {
      this.$refs.tableData.dataForm.pid = data.id
      this.$refs.tableData.page = 1
      this.$nextTick(() => {
        this.$refs.tableData.getDataList()
      })
    },
    getDataList2 () {
      this.$refs.tableData.dataForm = { pid: '', ...this.dataForm }
      this.$refs.tableData.getDataList()
    },
    getDataList () {
      // this.$refs.tableData.dataForm = { ...this.dataForm }
      this.$refs.tableData.getDataList()
    },
    async copyFileHandle () {
      if (this.$refs.tableData.dataListSelections.length <= 0) {
        return util.$message.showInfo2('请选择需要复制的项')
      }
      const pid = this.$refs.qzTree.getCurrentKey()
      if (!pid) {
        await util.$message.showInfo('没有选择目录')
        return
      }
      this.fileCopyVisible = true
      this.$nextTick(() => {
        this.$refs.copyFileDialog.pid = pid
        this.$refs.copyFileDialog.dataForm.files = this.$refs.tableData.dataListSelections.map(item => item.id)
        this.$refs.copyFileDialog.init()
      })
    },
    previewFile (data) {
      this.fileViewVisible = true
      this.$nextTick(() => {
        this.$refs.fileViewDialog.fileId = data.fileId
        this.$refs.fileViewDialog.fileName = data.fileName
        this.$refs.fileViewDialog.fileType = data.fileType
        this.$refs.fileViewDialog.init()
      })
    }
  }
}
</script>
<style lang="css" scoped>
    .container-body {
        margin: -20px;
    }

    .tree-tab-pane {
        margin: -12px
    }

    .query-form {
        padding: 8px 0px 0px 8px
    }

    .main-split {
        /*height: 600px;*/
        margin-top: -13px;
        border: 1px solid #dcdee2;
    }

    .tree-split-pane {
        padding: 10px;
    }

    .table-split-grid {
        padding: 2px;
    }

    .el-tabs__item {
        line-height: 30px;
        height: 30px;
    }

</style>
