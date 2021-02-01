<template>
    <el-tree :data="deptTreeData" :expand-on-click-node="false"
             :props="treeProps"
             highlight-current
             node-key="id"
             ref="qzTree"
             style="height:100%;width:100%;font-size: 14px"
             v-bind="$attrs"
             v-on="$listeners">
              <span slot-scope="{ node, data }">
             <img :src="getNodeIco(data)" style="width: 12px; height: 12px;"/>
             {{data.setid}}{{'-' + data.description }}
            </span>
    </el-tree>
</template>

<script>
import * as api from './api.js'

export default {
  props: [],
  data () {
    return {
      deptTreeData: [],
      treeProps: {
        label: 'description',
        children: 'children',
        isLeaf: 'hasLeaf'
      },
      treeDto: {
        rootId: '',
        rootName: ''
      }
    }
  },
  /* 页面渲染时加载 */
  mounted () {
    this.loadTargetRootNodes()
  },
  methods: {
    loadTargetRootNodes () {
      api.getModelTree().then(data => {
        this.deptTreeData = data
      })
    },
    /* 根据当前节点的ID设置选中状态 */
    setCurrentKey (id) {
      this.$refs.qzTree.setCurrentKey(id)
    },
    /* 根据ID获取node节点 */
    getNode (id) {
      return this.$refs.qzTree.getNode(id)
    },
    /* 获取当前选中的节点 */
    getCurrentNode () {
      return this.$refs.qzTree.getCurrentNode()
    },
    /* 获取当前节点的key值 */
    getCurrentKey () {
      return this.$refs.qzTree.getCurrentKey()
    },
    updateKeyChildren (id, res) {
      return this.$refs.qzTree.updateKeyChildren(id, res)
    },
    getNodeIco (data) {
      if (data.hasTypeNode) {
        return require('@/assets/image/model/type.ico')
      }
      return require('@/assets/image/model/table.ico')
    }

  }
}
</script>

<style scoped>
    > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
    }
</style>
