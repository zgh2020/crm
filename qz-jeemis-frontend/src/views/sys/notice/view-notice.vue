<template>
    <d2-container>
        <el-row style="margin-top: -10px">
            <el-col :span="22" align="center">
                <h1>{{dataForm.title}}</h1>
            </el-col>
        </el-row>
        <el-row align="center" style="margin-top: 10px">
            <el-col :span="22" align="center">
                <div style="font-size: 16px">
                    {{dataForm.deptName}}于{{dataForm.createDate}}发布{{dataForm.noticeType1Desc}}
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16" align="center" :offset="3">
                <div class="ql-editor" v-html="dataForm.content"></div>
            </el-col>
            <el-col :span="5" align="left" class="qz-notice-table">
                <el-table :data="dataForm.fileList" size="small" stripe style="width: 100%">
                    <el-table-column min-width="120" prop="fileName">
                        <template slot="header">
                            <d2-icon-svg name="att" :size="26" style="margin-right: 5px;margin-top: -2px"/> <span style="font-size: 18px">附件</span>
                        </template>
                        <template slot-scope="scope">
                            <d2-icon-svg :name="scope.row.fileType" :size="16" style="margin-right: 5px"/>{{scope.row.fileName}}
                        </template>
                    </el-table-column>
                    <el-table-column width="120">
                        <template slot-scope="scope">
                            <el-button @click="downloadHandle(scope.row.fileId)" size="small" type="text"> 下载
                            </el-button>
                            <el-button @click="previewHandle(scope.row)" size="small" type="text"> 预览</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <qz-file-view-dialog  ref="fileViewDialog"  v-show="fileViewVisible"></qz-file-view-dialog>
    </d2-container>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import * as api from './api.js'
import { mapActions } from 'vuex'

export default {
  name: 'view-notice',
  data () {
    return {
      dataForm: {},
      fileViewVisible: false
    }
  },
  methods: {
    ...mapActions('d2admin/page', [
      'updatePageTitle',
      'updateCurrentPageTitle'
    ]),
    init (id) {
      api.info(id).then((res) => {
        this.dataForm = res
      })
    },
    previewHandle (data) {
      this.fileViewVisible = true
      this.$nextTick(() => {
        this.$refs.fileViewDialog.fileId = data.fileId
        this.$refs.fileViewDialog.fileName = data.fileName
        this.$refs.fileViewDialog.fileType = data.fileType
        this.$refs.fileViewDialog.init()
      })
    },
    downloadHandle (fileId) {
      api.download(fileId)
    }
  },
  components: {},
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter (to, from, next) {
    const id = to.query.id
    if (id) {
      next(instance => {
        instance.init(id)
        const title = '通告内容'
        instance.updatePageTitle({ fullPath: to.fullPath, title: title })
      })
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate (to, from, next) {
    const id = to.query.id
    if (id) {
      this.init(id)
      next()
    }
  }
}
</script>

<style lang="css">

</style>
