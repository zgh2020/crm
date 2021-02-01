<!--autor：zhangliangliang-->
<template>
<d2-container >
    <div class="dept-body" style="overflow:hidden">
        <div style="padding: 8px">
            <el-button @click="addOrModifyModel(true)" icon="el-icon-document-copy" size="mini" type="primary">新建指标集</el-button>
            <el-button @click="addOrModifyModel(false)" type="primary" size="mini"  icon="el-icon-edit">修改指标集</el-button>
            <el-button @click="delTarget()" icon="el-icon-delete" size="mini" type="danger">删除指标集</el-button>
            <el-button @click="addOrModifyItem(true)" icon="el-icon-document-copy" size="mini" type="primary">新建指标项</el-button>
            <el-button @click="addOrModifyItem(false)" type="primary" size="mini"  icon="el-icon-edit">修改指标项</el-button>
            <el-button @click="delItem()" icon="el-icon-delete" size="mini" type="danger">删除指标项</el-button>
            <el-button @click="up()" type="primary" size="mini"  icon="el-icon-top">向上</el-button>
            <el-button @click="down()" type="primary" size="mini"  icon="el-icon-bottom">向下</el-button>
        </div>
        <div :style="{height: heightY+'px'}" class="main-split">
            <iv-Split v-model="split1">
                <div class="dept-split-pane" slot="left">
                    <el-tabs style="margin: -11px;" type="border-card" v-model="activeName">
                        <el-tab-pane label="指标集" name="tree" style="margin: -12px">
                            <treetarget :style="{height: treeHeightY+'px'}"
                                @node-click="onNodeClick"
                                ref="modelTree" />
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div :style="{height: heightY+'px'}" class="dept-split-grid" slot="right">
                    <target-table :style="{height: heightY+'px'}"  @table-click="onTableClick" ref="tableData"></target-table>
                </div>
            </iv-Split>
        </div>
        <menu-addorupdate class="dept-addorupdate" @updateSuccess="onUpdateSuccess" ref="dialogAddOrUpdate" >
        </menu-addorupdate>
        <addOrUpdateitem class="dept-addorupdate" @onUpdateTableSuccess="onUpdateTableSuccess" ref="dialogAddOrUpdateitem" >
        </addOrUpdateitem>
    </div>
</d2-container>
</template>

<script>
import resizemix from '@/components/qz-mixins/windowresize/resizemix'
import util from '@/libs/util'
import targetTable from './components/qz-target-table/qz-target-table'
import addOrUpdate from './addorupdate'
import addOrUpdateitem from './additemdate'
import treetarget from './components/qz-target-tree/qz-target-tree'
import * as api from './api.js'

export default {
  name: 'sys-model',
  mixins: [resizemix],
  components: {
    'menu-addorupdate': addOrUpdate,
    addOrUpdateitem: addOrUpdateitem,
    // 引入菜单树组件
    treetarget: treetarget,
    // 引入菜单列表
    'target-table': targetTable
  },
  data () {
    return {
      condition: '',
      title: '组件标题',
      searchName: '',
      includeChild: false,
      activeName: 'tree',
      // 当前选中节点的id
      currentNodeId: '',
      // 当前选中节点的父id
      currentNodePid: '',
      currentTableId: '',
      split1: 0.25,
      topY: 150,
      heightY: document.body.clientHeight - 150,
      treeHeightY: document.body.clientHeight - 200,
      currModel: { setid: '', type: '' }
    }
  },
  methods: {
    onResize (e) {
      if (e.h >= 400) {
        this.heightY = e.h - this.topY
        this.treeHeightY = e.h - 200
      }
    },
    onTableClick (data) {
      if (data) {
        this.currentTableId = data.id
      }
    },
    onNodeClick (data) {
      this.$nextTick(() => {
        this.$refs.tableData.loadTableData(data.setid)
      })
    },
    // 增加或修改指标集类(模型)
    async addOrModifyModel (isNew) {
      const data = this.$refs.modelTree.getCurrentNode()
      if (!data) {
        util.$message.showInfo2('请选择树节点')
      }
      if ((!isNew && data && !data.setid) || (!isNew && data.hasTypeNode)) {
        await util.$message.showInfo('请选择指标集(数据表)')
        return
      }
      this.$nextTick(() => {
        this.$refs.dialogAddOrUpdate.init(isNew, data.type, data.description, data.setid)
      })
    },
    async addOrModifyItem (isNew) {
      if (isNew) {
        if (!this.setid) {
          await util.$message.showInfo('请选择相应的指标集')
          return
        }
      }
      if (!isNew) {
        if (!this.currentTableId) {
          await util.$message.showInfo('请选择右侧其中一指标项')
          return
        }
      }
      if (this.typeId === '') {
        await util.$message.showInfo('请选择相应的指标集')
        return
      }
      this.$nextTick(() => {
        if (isNew) {
          this.$refs.dialogAddOrUpdateitem.initAdd(this.setid)
        } else {
          this.$refs.dialogAddOrUpdateitem.initEdit(this.setid, this.currentTableId)
        }
      })
    },
    async delItem () {
      if (!this.currentTableId) {
        await util.$message.showInfo('请选择右侧其中一指标项')
        return
      }
      if (this.typeId === '') {
        await util.$message.showInfo('请选择右侧其中一指标项')
        return
      }
      this.$nextTick(async () => {
        const ok = await util.$message.showYesNo('确认删除当前指标项吗?')
        if (!(ok && ok === 'confirm')) {
          return
        }
        const objData = await api.delModelItem(this.currentTableId)
        if (objData) {
          await util.$message.showInfo('删除成功')
          this.onUpdateTableSuccess(this.setid)
        }
      })
    },
    async delTarget () {
      if (!this.setid) {
        await util.$message.showInfo('请选择相应的指标集')
        return
      }
      if (this.typeId === '') {
        await util.$message.showInfo('请选择相应的指标集')
        return
      }
      this.$nextTick(async () => {
        const ok = await util.$message.showYesNo('确认删除当前指标集吗?')
        if (!(ok && ok === 'confirm')) {
          return
        }
        const objData = await api.delModelSet(this.setid)
        if (objData) {
          await util.$message.showInfo('删除成功')
          this.updateKeyChildren(this.rootId)
        }
      })
    },
    onUpdateTableSuccess (setId) {
      // 刷新右侧
      this.$refs.tableData.loadTableData(setId)
    },
    onUpdateSuccess (typeId, typeName) {
      // 刷新左侧节点
      if (typeId != null) {
        this.updateKeyChildren(typeId, typeName)
      }
    },
    updateKeyChildren (id, typeName) {
      this.treeDto.rootId = id
      this.treeDto.rootName = typeName
      api.getTargetChildNode(this.treeDto).then(res => {
        this.$refs.targetTree.updateKeyChildren(res[0].rootId, res)
      })
    },
    // 向上
    async up () {
      const selEl = this.$refs.tableData.getCurrRowIdValue()
      if (selEl == null) {
        await util.$message.showInfo('请在表格中选择一行进行操作')
        return
      }
      const selEl2 = this.$refs.tableData.getLastLine()
      console.log(selEl)
      console.log(selEl2)
      if (selEl2 == null) {
        await util.$message.showInfo('该代码项已经是优先级最高序号')
        return
      }
      const objData = await api.orderupdown(selEl2, selEl)
      if (objData) {
        // 刷新表格
        this.onUpdateTableSuccess(this.setid)
      }
    },
    // 向下
    async down () {
      // this.showAddOrUpdate = true
      const selEl = this.$refs.tableData.getCurrRowIdValue()
      if (selEl == null) {
        await util.$message.showInfo('请在表格中选择一行进行操作')
        return
      }
      const selEl2 = this.$refs.tableData.getNextLine()
      if (selEl2 == null) {
        await util.$message.showInfo('该代码项已经是优先级最高序号')
        return
      }
      const objData = await api.orderupdown(selEl, selEl2)
      if (objData) {
        // 刷新表格
        this.onUpdateTableSuccess(this.setid)
      }
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
    padding: 2px;
}

.el-tabs__item {
    line-height: 30px;
    height: 30px;
}
button[data-v-a0b325b8]{
    margin-left:5px;
}
</style>
