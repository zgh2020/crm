<template>
    <d2-container>
        <el-row>
            <el-col :span="20">
                    <el-button size="mini" @click="replyMessage" type="primary" v-if="$hasPermission('platform:message:save')">回复</el-button>
                    <el-button size="mini" @click="forwardMessage" type="primary" v-if="$hasPermission('platform:message:save')">转发</el-button>
                   <!-- <el-button size="mini" @click="deleteHandle()" type="danger" v-if="$hasPermission('message:sysmessagesend:delete')">删除</el-button>-->
            </el-col>
        </el-row>
        <el-row style="margin-top: -10px">
            <el-col :span="20" align="center">
                <h1>{{dataForm.title}}</h1>
            </el-col>
        </el-row>
        <el-row align="center" style="margin-top: 10px">
            <el-col :span="24" align="center">
                <div style="font-size: 14px">
                   发件单位:【{{dataForm.deptName}}】-发件人:【{{dataForm.senderName}}】- 收件人:【{{dataForm.addresseeName}}】-发件日期:【{{dataForm.createDate}}】
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
                            <el-button @click="downloadHandle(scope.row.fileId)" size="small" type="text">下载</el-button>
                            <el-button @click="previewHandle(scope.row)" size="small" type="text"> 预览</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <qz-file-view-dialog  ref="fileViewDialog"  v-show="fileViewVisible"></qz-file-view-dialog>
        <!-- 弹窗, 新增 / 修改 -->
        <message-add-or-update ref="addOrUpdate" v-if="addOrUpdateVisible"/>
    </d2-container>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import * as api from './api.js'
import { mapActions } from 'vuex'
import util from '@/libs/util'
import messageAddOrUpdate from './message-add-or-update'
export default {
  name: 'view-notice',
  components: { messageAddOrUpdate },
  data () {
    return {
      dataForm: {},
      fileViewVisible: false,
      addOrUpdateVisible: false
    }
  },
  mounted () {
    this.init(this.$route.query.id)
  },
  methods: {
    ...mapActions('d2admin/page', [
      'updatePageTitle',
      'updateCurrentPageTitle'
    ]),
    init (id) {
      api.view(id).then((res) => {
        this.dataForm = res
        this.updatePageTitle({ fullPath: this.$route.fullPath, title: res.title })
      })
    },
    downloadHandle (fileId) {
      api.download(fileId)
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
    //  回信
    replyMessage () {
      // 检查是否选中一封信
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.dataForm.id = this.dataForm.id
        this.$refs.addOrUpdate.replyMsg()
      })
    },
    //  转发
    forwardMessage () {
      // 检查是否选中一封信
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.dataForm.id = this.dataForm.id
        this.$refs.addOrUpdate.forwardMsg()
      })
    },
    async deleteHandle () {
      const ok = await util.$message.showYesNo('是否确定删除选择的项目?')
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      const data = [this.dataForm.id]
      await api.recycle(data)
    }
  }
}
</script>

<style lang="css">

</style>
