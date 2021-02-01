<template>
    <qz-dialog :title="title" :visible.sync="visible" top="20vh" width="680px" @close="closeHandle">
        <el-form  :inline="true" ref="dataForm" size="mini">
            <el-form-item>
            <el-upload :action="uploadUrl"
                       :on-progress="uploadProgress"
                       :on-success="uploadSuccess"
                       :on-change="onchange"
                       :show-file-list="false"
                       :auto-upload="false"
                       multiple
                       ref="elUpload"
                       style="float: left">
                <el-button  type="primary" >选择文件</el-button>
            </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="uploadHandle" type="success">开始上传</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="removeFileHandle" type="danger">移除文件</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                border
                stripe
                height="300px"
                style="width: 100%"
                :row-style="{height:'20px'}"
                :cell-style="{padding:'0'}"
                highlight-current-row
                @current-change="handleCurrentChange"
                size="small"
                ref="tableData">
            <el-table-column prop="fileName" label="文件名" width="230px" align="center">
                <template slot-scope="scope">
                    <d2-icon-svg v-if="scope.row.fileType" :size="16" :name="item.fileType"/>{{scope.row.fileName}}
                </template>
            </el-table-column>
            <el-table-column prop="fileSize" label="大小"  width="100px" align="center"></el-table-column>
            <el-table-column prop="" label="上传进度"  width="220px" align="center">
                <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="16" :percentage="scope.row.percentage" status="warning"></el-progress>
                </template>
            </el-table-column>
            <el-table-column prop="fileStatus" label="上传状态"  width="90px" align="center"></el-table-column>
        </el-table>

    </qz-dialog>
</template>
<script>
import * as api from './api'
import util from '@/libs/util'

export default {
  data () {
    return {
      visible: false,
      tableData: [],
      title: '上传文件',
      uploadUrl: api.uploadUrl('clouddisk'),
      loading: false,
      pid: '',
      currentRow: null,
      fileData: {}
    }
  },
  mounted () {

  },
  methods: {
    init () {
      this.visible = true
      this.tableData = []
      this.$nextTick(() => {
        this.$refs.elUpload && this.$refs.elUpload.clearFiles()
      })
    },
    async onchange (file, fileList) {
      if (file.status !== 'ready') return
      const hist = {}
      fileList.map(function (a) { if (a.name in hist) hist[a.name]++; else hist[a.name] = 1 })
      for (const i in hist) {
        if (hist[i] > 1) {
          util.$message.showInfo2(`【${i}】已经存在`)
          fileList.pop()
          return
        }
      }
      const isLt1M = file.size / 1024 / 1024 > 300
      if (isLt1M) {
        this.$message.error('上传文件大小不能超过 300M!')
        return
      }
      this.tableData.push({ fileName: file.name, fileSize: util.getFileSize(file.size), percentage: file.percentage, fileStatus: '等待上传' })
    },
    uploadProgress (event, file, fileList) {
      this.tableData.splice(0, this.tableData.length)
      fileList.forEach((item, index, arr) => {
        this.tableData.push({ fileName: item.name, fileSize: util.getFileSize(item.size), percentage: parseInt(item.percentage), fileStatus: '上传中...' })
      })
    },
    uploadSuccess (response, file, fileList) {
      this.tableData.splice(0, this.tableData.length)
      fileList.forEach((item, index, arr) => {
        this.tableData.push({ fileName: item.name, fileSize: util.getFileSize(item.size), percentage: 100, fileStatus: '上传完成' })
      })
      // console.info(this.$refs.elUpload.uploadFiles)
      this.fileData.pid = this.pid
      this.fileData.fileId = response.data
      this.fileData.fileName = file.name
      this.fileData.fileSize = file.size
      api.saveFile(this.fileData)
    },

    handleCurrentChange (currentRow, oldCurrentRow) {
      this.currentRow = currentRow
    },
    uploadHandle () {
      this.$refs.elUpload.submit()
    },
    removeFileHandle () {
      if (!this.currentRow) return
      let currIndex = -1
      this.$refs.elUpload.uploadFiles.forEach((file, index, arr) => {
        if (file.name === this.currentRow.fileName) {
          currIndex = index
        }
      })
      if (currIndex === -1) return
      this.$refs.elUpload.uploadFiles.splice(currIndex, 1)
      this.tableData.splice(currIndex, 1)
    },
    closeHandle () {
      this.$emit('onUpdateSuccess', [this.pid])
    }
  }
}
</script>
