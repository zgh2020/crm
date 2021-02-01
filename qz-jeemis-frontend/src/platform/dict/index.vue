<template>
    <d2-container>
        <div class="dept-body">
            <div style="padding: 8px">
                <span>代码版本：</span>
                <el-select placeholder="选择" v-model="codeVersion" size="mini" style="width: 80px">
                    <el-option
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            v-for="item in options">
                    </el-option>
                </el-select>
                <span style="margin-left: 8px">查询代码：</span>
                <el-input @keydown.enter.native="onSearchComplete"
                          placeholder="请输入要查询的代码项"
                          size="mini"
                          style="width: 200px;margin-right: 8px" v-model="searchName">
                    <i @click="onSearchComplete"
                       class="el-input__icon el-icon-search"
                       slot="suffix"
                       style="cursor: pointer"></i>
                </el-input>
                <el-button @click="addCodeCollect" icon="el-icon-plus" size="mini" type="primary">新建代码类</el-button>
                <el-button @click="modifyCodeCollect" icon="el-icon-edit-outline" size="mini" type="primary">修改代码类</el-button>
                <el-button @click="delCodeCollect" icon="el-icon-delete" size="mini" type="danger">删除代码类</el-button>
                <el-button @click="addCodeItem" icon="el-icon-tickets" size="mini" type="primary">新建代码</el-button>
                <el-button @click="modifyCodeItem" icon="el-icon-edit" size="mini" type="primary">修改代码</el-button>
                <el-button @click="delCodeItem" icon="el-icon-delete-solid" size="mini" type="danger">删除代码</el-button>
                <el-button @click="upCode" icon="el-icon-top" size="mini" type="primary">向上</el-button>
                <el-button @click="downCode" icon="el-icon-bottom" size="mini" type="primary">向下</el-button>
            </div>
            <div :style="{height: heightY+'px'}" class="main-split">
                <iv-Split v-model="split1">
                    <div class="dept-split-pane" slot="left">
                        <el-tabs  style="margin: -11px;" type="border-card"
                                 v-model="activeName">
                            <el-tab-pane label="全部代码" name="tree" style="margin: -12px">
                                <dic-tree :style="{height: treeHeightY+'px'}"
                                          @node-click="onNodeClick"
                                          ref="dicTree1"/>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div :style="{height: heightY+'px'}" class="dept-split-grid" slot="right">
                        <dic-grid @row-dblclick="onTableDbClick" ref="tableData"></dic-grid>
                    </div>
                </iv-Split>
            </div>
            <dic-add-or-update-collect @saveCodeCollect="onSaveCodeCollect" ref="dialogAddOrUpdateCollect"
                                       v-if="showAddOrUpdateCollect"/>
            <dic-add-or-update-item @saveCodeItem="onSaveCodeItem" ref="dialogAddOrUpdateItem"
                                    v-if="showAddOrUpdateItem"/>
        </div>
    </d2-container>
</template>

<script>
import resizemix from '@/components/qz-mixins/windowresize/resizemix'
import debounce from 'lodash/debounce' //  防抖动
import util from '@/libs/util'
import dicAddOrUpdateCollect from './dic-add-or-update-collect'
import dicAddOrUpdateItem from './dic-add-or-update-item'
import dicTree from './dic-tree'
import dicGrid from './dic-grid'
import * as api from './api.js'

export default {
  name: 'sys-dict',
  mixins: [resizemix],
  components: { dicAddOrUpdateCollect, dicAddOrUpdateItem, dicTree, dicGrid },
  props: [],
  data () {
    return {
      condition: '',
      title: '代码字典维护',
      searchName: '',
      activeName: 'tree',
      // 当前选中节点的id
      currentNodeId: '',
      // 当前选中节点的父id
      currentNodePid: '',
      showAddOrUpdateCollect: false,
      showAddOrUpdateItem: false,
      currTreeNode: {},
      currGridRow: {},
      codeVersion: 1,
      options: [{
        value: 1,
        label: '1.0版'
      }, {
        value: 2,
        label: '2.0版'
      }],
      split1: 0.25,
      topY: 150,
      heightY: document.body.clientHeight - 150,
      treeHeightY: document.body.clientHeight - 200
    }
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
      // data为当前点击的节点对象
      this.currTreeNode = data
      this.$nextTick(() => {
        this.$refs.tableData.loadTableData(data.codeid, data.code, null)
      })
    },
    onSearchComplete: debounce(function (e) {
      this.$refs.tableData.loadTableData(this.currTreeNode.codeid, null, this.searchName)
    }, 300, {
      leading: true,
      trailing: false
    }),

    // 增加代码类
    async addCodeCollect () {
      this.showAddOrUpdateCollect = true
      this.$nextTick(() => {
        this.$refs.dialogAddOrUpdateCollect.initAdd()
      })
    },
    // 修改代码类
    modifyCodeCollect () {
      // 取当前树节点
      const data = this.$refs.dicTree1.getCurrentNode()
      if (!data) {
        util.$message.showInfo2('请选中树节点')
        return
      }
      this.showAddOrUpdateCollect = true
      this.$nextTick(() => {
        this.$refs.dialogAddOrUpdateCollect.initEdit(data.codeid)
      })
    },
    async delCodeCollect () {
      // 取当前树节点
      const data = this.$refs.dicTree1.getCurrentNode()
      if (!data) {
        util.$message.showInfo2('请选中树节点')
        return
      }
      if (data.code) {
        util.$message.showInfo2('请选中一个字典类节点')
        return
      }
      let ok = await util.$message.showYesNo('是否确定删除字典类【' + data.codeid + data.description + '】?')
      if (!(ok && ok === 'confirm')) {
        return
      }
      ok = await util.$message.showYesNo('再次确认是否删除字典类【' + data.codeid + data.description + '】?')
      if (!(ok && ok === 'confirm')) {
        return
      }
      api.deleteSysCodeCollect(data.codeid).then(res => {
        this.$refs.dicTree1.removeNode(data)
        util.$message.showInfo2('删除成功')
      })
    },
    // 增加代码项
    async addCodeItem () {
      // 取当前树节点
      const data = this.$refs.dicTree1.getCurrentNode()
      if (!data) {
        util.$message.showInfo2('请选中树节点')
        return
      }
      this.showAddOrUpdateItem = true
      this.$nextTick(() => {
        this.$refs.dialogAddOrUpdateItem.initAdd(data.codeid, data.code)
      })
    },
    // 修改代码项或代码类
    async modifyCodeItem () {
      const currRow = this.$refs.tableData.getCurrRow()
      if (!currRow) {
        await util.$message.showInfo('请在表格中选择一行')
        return
      }
      this.showAddOrUpdateItem = true
      this.$nextTick(() => {
        this.$refs.dialogAddOrUpdateItem.initEdit(currRow.pkid)
      })
    },
    onSaveCodeCollect (data) {
      this.$refs.dicTree1.updateNode(data)
    },
    onSaveCodeItem (data) {
      //  刷新表格
      this.$refs.tableData.setCurrRow(data)
      // 刷新树节点
      const node1 = this.$refs.dicTree1.getNode(this.$refs.dicTree1.getCurrentNode())
      if (node1) {
        node1.loaded = false
        node1.loadData()
      }
    },
    onTableDbClick (row, column, event) {
      this.modifyCodeItem()
    },
    // 删除代码项
    async delCodeItem () {
      const currRow = this.$refs.tableData.getCurrRow()
      if (!currRow) {
        await util.$message.showInfo('请在表格中选择一行')
        return
      }
      const ok = await util.$message.showYesNo('是否删除【' + currRow.code + currRow.description + '】及子节点?')
      if (!(ok && ok === 'confirm')) {
        return
      }
      await api.deleteSysCodeItem(currRow.pkid)
      util.$message.showInfo2('删除成功')
      const node1 = this.$refs.dicTree1.getNode(this.$refs.dicTree1.getCurrentNode())
      if (node1) {
        node1.loaded = false
        node1.loadData()
      }
      this.$refs.tableData.removeRow(currRow)
    },
    downCode () {
      this.$refs.tableData.sortDownRow()
    },
    upCode () {
      this.$refs.tableData.sortUpRow()
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
        border: 1px solid #dcdee2;
    }

    .dept-split-pane {
        padding: 10px;
    }

    .dept-split-grid {
        padding: 2px;
    }
</style>
