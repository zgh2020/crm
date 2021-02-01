<template>
    <d2-container>
        <el-form :inline="true" @keyup.enter.native="getDataList()" size="small" style="margin-top: -10px">
            <el-form-item>
                <el-button @click="addOrUpdateHandle" type="primary" v-if="$hasPermission('platform:message:save')">写信
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="openMessageHandle()" type="primary"
                           v-if="$hasPermission('platform:message:info')">打开
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="forwardMessage()" type="success" v-if="$hasPermission('platform:message:save')">转发
                </el-button>
            </el-form-item>
            <el-form-item v-if="dataForm.folder === '1' ">
                <el-button @click="replyMessage()" type="success" v-if="$hasPermission('platform:message:save')">回复
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="deleteHandle()" type="danger" v-if="$hasPermission('platform:message:delete')">
                    删除
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="readAll()" type="primary" v-if="$hasPermission('platform:message:info')">
                    设置全部已读
                </el-button>
            </el-form-item>
            <el-form-item v-if="dataForm.folder === '9' ">
                <el-button @click="clearRecycle()" type="danger"
                           v-if="$hasPermission('platform:message:delete')">清空回收站
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-input clearable placeholder="标题" v-model="dataForm.like_title"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="12">
            <el-col :span="3">
                <message-nav ref="msgFolder" :style="{height: heightY-topY+'px'}" @select="navMenuSelectHandle"/>
            </el-col>
            <el-col :span="21">
                <message-table :call-data-form="getDataForm" :height="heightY-topY+'px'"
                               @onViewInfo="openMessageHandle" @row-dblclick="openMessageHandle"
                               @onEditRow="editMessageHandle"
                               ref="tableData"
                />
            </el-col>
        </el-row>
        <!-- 弹窗, 新增 / 修改 -->
        <message-add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-if="addOrUpdateVisible"/>
    </d2-container>
</template>
<script>
import resizemix from '@/components/qz-mixins/windowresize/resizemix'
import messageNav from './message-nav'
import messageTable from './message-table'
import messageAddOrUpdate from './message-add-or-update'
import * as api from './api'
import util from '@/libs/util'

export default {
  name: 'message-index',
  mixins: [resizemix],
  components: { messageNav, messageTable, messageAddOrUpdate },
  data () {
    return {
      dataForm: {
        folder: '1',
        like_title: ''
      },
      viewVisible: false,
      addOrUpdateVisible: false
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
    getDataForm () {
      return this.dataForm
    },
    navMenuSelectHandle (index, indexPath) {
      this.dataForm.folder = index
      this.$refs.tableData.page = 1
      this.getDataList()
    },
    getDataList () {
      this.$refs.tableData.getDataList()
      this.$refs.msgFolder.init()
    },
    //  写信
    addOrUpdateHandle () {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    //  回信
    replyMessage () {
      // 检查是否选中一封信
      const data = this.$refs.tableData.getCurrRow()
      if (!data) {
        util.$message.showInfo2('没有选择待回复的消息')
        return
      }
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.dataForm.id = data.id
        this.$refs.addOrUpdate.replyMsg()
      })
    },
    //  转发
    forwardMessage () {
      // 检查是否选中一封信
      const data = this.$refs.tableData.getCurrRow()
      if (!data) {
        util.$message.showInfo2('没有选择待回复的消息')
        return
      }
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.dataForm.id = data.id
        this.$refs.addOrUpdate.forwardMsg()
      })
    },
    editMessageHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.dataForm.id = id
        this.$refs.addOrUpdate.editMsg()
      })
    },
    deleteHandle () {
      this.$refs.tableData.recycleHandle()
    },
    async readAll () {
      const ok = await util.$message.showYesNo('是否确定全部设成已读?')
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      await api.readAll(this.dataForm.folder)
      this.getDataList()
    },
    // 打开
    openMessageHandle (data) {
      if (!data) {
        data = this.$refs.tableData.getCurrRow()
      }
      this.$router.push({
        path: '/oa/view/message',
        params: { id: data.id },
        query: {
          id: data.id
        }
      })
      this.$refs.tableData.updateReadStatus(data.id)
    },
    /**
       * 撤回消息
       */
    revokeMessage () {
      this.$refs.tableData.revokeHandle()
    },
    async clearRecycle () {
      const ok = await util.$message.showYesNo('是否确定清空回收站?')
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      await api.clearRecycle()
      this.getDataList()
    },
    // 导出
    exportHandle () {
      api.exportXls(this.dataForm)
    }
  }
}
</script>
<style lang="scss">
</style>
