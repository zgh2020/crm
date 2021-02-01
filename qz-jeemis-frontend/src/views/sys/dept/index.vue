<template>
    <d2-container>
        <div class="dept-body">
            <div style="padding: 5px">
                <el-button :disabled="!$hasPermission(['sys:dept:save'])" @click="newDept" icon="el-icon-circle-plus-outline" size="mini" type="primary">新增 </el-button>
                <el-button :disabled="!$hasPermission('sys:dept:save')" @click="modifyDept()" icon="el-icon-edit-outline" size="mini" type="primary">修改</el-button>
                <el-dropdown size="small" style="margin-left: 8px;margin-right: 8px" trigger="click" @command="handleDeleteCommand" v-if="this.$hasPermission('sys:dept:delete')">
                    <el-button icon="el-icon-delete" size="mini" type="danger">
                        删除<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="删除机构">删除机构</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button @click="upCode" icon="el-icon-top" size="mini" type="primary" v-if="$hasPermission('sys:dept:save')">向上</el-button>
                <el-button @click="downCode" icon="el-icon-bottom" size="mini" type="primary" v-if="$hasPermission('sys:dept:save')">向下</el-button>
                <el-button  icon="el-icon-download" size="mini" type="primary" @click="exportHandle"  v-if="$hasPermission('sys:dept:list')">机构导出</el-button>
                <el-button  icon="el-icon-download" size="mini" type="primary" @click="exportHandle2" v-if="$hasPermission('sys:dept:list')">机构导出2</el-button>
            </div>
            <div :style="{height: heightY+'px'}" class="main-split">
                <iv-Split v-model="split1">
                    <div class="dept-split-pane" slot="left">
                        <el-tabs style="margin: -11px;" type="border-card"
                                 v-model="activeName">
                            <el-tab-pane label="机构树" name="tree" style="margin: -12px">
                                <qz-dept-tree-gen
                                        :style="{height: treeHeightY+'px'}"
                                        @node-click="onNodeClick"
                                        @onLoadRootEnd="onLoadRootEnd"
                                        @node-contextmenu="deptTreeRightClick"
                                        ref="treeDept"/>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div :style="{height: heightY+'px'}" class="dept-split-grid" slot="right">
                        <dept-grid ref="tableList" @row-dblclick="modifyDept"></dept-grid>
                    </div>
                </iv-Split>
            </div>
            <dept-add-or-update @updateSuccess="onUpdateSuccess"
                    ref="dialogAddOrUpdate"
                    v-if="showAddOrUpdate">
            </dept-add-or-update>
            <v-contextmenu ref="contextmenu">
                <v-contextmenu-item @click="modifyDeptRight">修改</v-contextmenu-item>
            </v-contextmenu>
        </div>
    </d2-container>
</template>

<script>
import resizemix from '@/components/qz-mixins/windowresize/resizemix'
import util from '@/libs/util'
import deptGrid from './dept-grid'
import deptAddOrUpdate from './dept-add-or-update'
import * as api from './api'
import qs from 'qs'

export default {
  name: 'sys-dept',
  mixins: [resizemix],
  components: { deptGrid, deptAddOrUpdate },
  props: [],
  data () {
    return {
      title: '机构维护',
      searchName: '',
      activeName: 'tree',
      selDeptPkId: '',
      selDeptId: '',
      selRightCilckData: null,
      split1: 0.2,
      topY: 146,
      heightY: document.body.clientHeight - 146,
      treeHeightY: document.body.clientHeight - 195,
      showAddOrUpdate: false,
      downloading: false
    }
  },
  mounted () {

  },
  methods: {
    init () {
    },
    onResize (e) {
      if (e.h >= 400) {
        this.heightY = e.h - this.topY
        this.treeHeightY = e.h - 200
      }
    },
    onNodeClick (data) {
      this.$nextTick(() => {
        this.selDeptId = data.id
        this.selDeptPkId = data.pkid
        this.$refs.tableList.loadDataList(this.selDeptId)
      })
      this.$refs.contextmenu.hide()
    },
    //  增加机构
    async newDept () {
      this.showAddOrUpdate = true
      this.$nextTick(() => {
        this.$refs.dialogAddOrUpdate.initAdd(this.selDeptId)
      })
    },
    //  增加修改机构
    async modifyDept (data) {
      if (!data) data = this.$refs.tableList.getCurrRow()
      if (!data) {
        await util.$message.showInfo('没有机构行,在右侧表中选择一个机构')
        return
      }
      this.showAddOrUpdate = true
      this.$nextTick(() => {
        this.$refs.dialogAddOrUpdate.initEdit(data.pkid)
      })
    },

    //  增加修改机构
    async handleDeleteCommand () {
      const data = this.$refs.tableList.getCurrRow()
      if (!data) {
        await util.$message.showInfo('没有机构行,在右侧表中选择一个机构')
        return
      }
      const ok = await util.$message.showYesNo('是否删除【' + data.name + '】返回?')
      if (!(ok && ok === 'confirm')) return
      await api.delInfo(data.pkid)
      this.$refs.tableList.removeRow(data)
      await util.$message.showInfo('删除完成')
    },
    // 导出
    exportHandle () {
      const params = qs.stringify({
        token: util.cookies.get('token')
      })
      const url = '/api/sys/dept/export'
      window.location.href = `${window.SITE_CONFIG.apiURL}${url}?${params}`
    },
    exportHandle2 () {
      const params = qs.stringify({
        token: util.cookies.get('token')
      })
      const url = '/api/sys/dept/export2'
      window.location.href = `${window.SITE_CONFIG.apiURL}${url}?${params}`
    },
    onUpdateSuccess (data) {
      let node1 = {}
      debugger
      if (data && this.selRightCilckData && (data.pkid === this.selRightCilckData.pkid)) {
        node1 = this.$refs.treeDept.getNode(this.selRightCilckData.id)
        node1.data = { ...node1.data, ...data }
      }
      // 刷新树节点
      if (data) {
        node1 = this.$refs.treeDept.getNode(this.selDeptId)
        if (!node1) return
        if (data && (data.pkid === this.selDeptPkId)) {
          node1.data = { ...node1.data, ...data }
        } else {
          node1.loaded = false
          node1.loadData()
        }
        // 刷新右侧
        this.$refs.tableList.setCurrRow(data)
      }
    },
    downCode () {
      this.$refs.tableList.sortDownRow()
    },
    upCode () {
      this.$refs.tableList.sortUpRow()
    },
    //  右键菜单例子
    deptTreeRightClick (event, data, node) {
      this.selRightCilckData = data
      const postition = {
        top: event.clientY,
        left: event.clientX
      }
      this.$refs.contextmenu.show(postition)
    },
    modifyDeptRight () {
      this.modifyDept(this.selRightCilckData)
    },
    onLoadRootEnd (data) {
      this.$nextTick(() => {
        if (data.length < 1) {
          return
        }
        this.$refs.treeDept.setCurrentKey(data[0].id)
        this.onNodeClick(data[0])
      })
    }
  },

  computed: {},
  watch: {}
}
</script>

<style scoped>
    .dept-body {
        margin: -20px;
    }

    .main-split {
        /*height: 600px;*/
        border: 1px solid #dcdee2;
    }

    .dept-split-pane {
        padding: 10px;
    }

    .dept-split-grid {
        padding: 1px 2px 2px 7px;
    }

    .el-tabs__item {
        line-height: 30px;
        height: 30px;
    }
</style>
