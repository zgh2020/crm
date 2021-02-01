<template>
    <d2-container>
        <div class="dept-body">
            <div style="padding: 8px">
                <el-button v-if="this.$hasPermission(['sys:menu:add'])" @click="addMenu(true)"
                           icon="el-icon-circle-plus-outline" size="mini" type="primary">新增菜单</el-button>
                <el-button @click="upSort" icon="el-icon-top" size="mini" type="primary">向上</el-button>
                <el-button @click="downSort" icon="el-icon-bottom" size="mini" type="primary">向下</el-button>
            </div>
            <div :style="{height: heightY+'px'}" class="main-split">
                <iv-Split v-model="split1">
                    <div class="dept-split-pane" slot="left">
                        <el-tabs  style="margin: -11px;" type="border-card"
                                 v-model="activeName">
                            <el-tab-pane label="菜单树" name="tree" style="margin: -12px">
                                <menu-tree :style="{height: treeHeightY+'px'}" @node-click="onNodeClick" ref="menuTree"/>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div :style="{height: heightY+'px'}" class="dept-split-grid" slot="right">
                        <menu-table ref="tableData" @updateMenu="updateMenu" @deleteSuccess="onDeleteSuccess"></menu-table>
                    </div>
                </iv-Split>
            </div>
            <menu-add-or-update @onUpdateSuccess="onUpdateSuccess"   ref="dialogAddOrUpdate" v-if="showAddOrUpdate"/>
        </div>
    </d2-container>
</template>

<script>
import split2mix from '@/components/qz-mixins/windowresize/split2mix'
import util from '@/libs/util'
import menuTable from './menu-table'
import menuAddOrUpdate from './menu-add-or-update'
import menuTree from './menu-tree'

export default {
  name: 'sys-menu',
  mixins: [split2mix],
  components: {
    menuAddOrUpdate,
    // 引入菜单树组件
    menuTree,
    // 引入菜单列表
    'menu-table': menuTable
  },
  props: [],
  data () {
    return {
      condition: null,
      title: '菜单',
      activeName: 'tree',
      showAddOrUpdate: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.tableData.loadTableData('0')
    })
  },
  methods: {
    onNodeClick (data) {
      this.$refs.tableData.loadTableData(data.id)
    },
    // 增加
    addMenu () {
      this.showAddOrUpdate = true
      this.$nextTick(() => {
        const data = this.$refs.menuTree.getCurrentNode()
        if (!data) {
          util.$message.showInfo2('没有选择树节点')
          return
        }
        this.$refs.dialogAddOrUpdate.initAdd(data.id)
      })
    },
    // 修改
    updateMenu (id) {
      this.showAddOrUpdate = true
      this.$nextTick(() => {
        if (!id) { return }
        this.$refs.dialogAddOrUpdate.initEdit(id)
      })
    },
    // 修改成功后的刷新
    onUpdateSuccess (id) {
      this.$refs.menuTree.updateNode(id)
      const node1 = this.$refs.menuTree.getCurrentNode()
      this.$refs.tableData.loadTableData(node1.id)
    },
    onDeleteSuccess (id) {
      this.$refs.menuTree.removeNode(id)
    },
    upSort () {
      this.$refs.tableData.sortRow(true)
    },
    downSort () {
      this.$refs.tableData.sortRow(false)
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

    button[data-v-a0b325b8] {
        margin-left: 5px;
    }
</style>
