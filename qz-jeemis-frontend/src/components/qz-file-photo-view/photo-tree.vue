// 菜单组件

<template>
    <el-tree :current-node-key="this.selectKey" :data="treeData" :render-after-expand=false @node-click="handleNodeClick" class="photoTree"
             node-key="id" ref="tree" style="height: 100%">
            <span class="custom-tree-node" slot-scope="{node,data}">
              <span style="margin-right:10px">{{data.fileType}}</span>
              <span>{{ node.label }}</span>
            </span>
    </el-tree>
</template>
<script>
export default {
  props: {
    // selectKey: [String, Number]
  },
  data: function () {
    return {
      renderAfterExpand: false,
      treeData: [],
      selectKey: 1
    }
  },
  methods: {
    handleNodeClick (data, node, dom) {
      if (data.number !== undefined) {
        this.$refs.tree.setCurrentKey(data.id)
        this.$emit('handleNodeClick', data)
      } else {
        this.$refs.tree.setCurrentKey(this.selectKey)
      }
    },
    setCurrentKey (key) {
      this.$refs.tree.setCurrentKey(key)
    }
  }
}
</script>
<style scoped>
  /*  .el-tree.photoTree {
        background-color: #f4f4f4
    }

    .el-tree.photoTree .is-current {
        background-color: #fff
    }*/
</style>
