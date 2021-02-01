<template>
    <div>
        <el-tree style="height:100%;width:100%;" :props="treeProps" :data="rootNode"
                 :load="loadTreeCodeNode"
                 :expand-on-click-node="false"
                 node-key="pkid"
                 ref="qzTree"
                 highlight-current
                 lazy
                 v-bind="$attrs"
                 v-on="$listeners">
            <span  slot-scope="{ node, data }">
             <img :src="getNodeIco(data)" style="width: 12px; height: 12px;"/>
             {{data.code || data.codeid}}{{'-' + data.description }}
            </span>
        </el-tree>
    </div>
</template>

<script>
import * as api from './api.js'

export default {
  props: [],
  data () {
    return {
      rootNode: [],
      treeProps: {
        label: 'description',
        children: 'children',
        isLeaf: 'hasleaf'
      },
      codeId: ''
    }
  },
  /* 页面渲染时加载 */
  mounted () {
    this.init()
  },
  methods: {
    /* 初始化 */
    init () {
      api.getCodeTreeRoots().then(res => {
        this.rootNode = res
      })
    },
    /* 加载子节点 */
    loadTreeCodeNode (node, resolve) {
      if (node.level >= 1) {
        let code = node.data.codeid
        if (node.data.code) code = node.data.code
        api.getCodeTreeNodes(node.data.codeid, code).then(res => {
          resolve(res)
        })
      }
    },
    getCurrentNode () {
      return this.$refs.qzTree.getCurrentNode()
    },
    getNode (pkId) {
      return this.$refs.qzTree.getNode(pkId)
    },
    getIndex (pkId) {
      for (const index in this.rootNode) {
        if (!this.rootNode[index].pkid && this.rootNode[index].pkid === pkId) { return index }
      }
      return -1
    },
    getIndexByCodeId (codeId) {
      for (const index in this.rootNode) {
        if (!this.rootNode[index].code && this.rootNode[index].codeid === codeId) { return index }
      }
      return -1
    },
    updateNode (data) {
      const index = this.getIndexByCodeId(data.codeid)
      if (index === -1) { this.rootNode.splice(this.rootNode.length, 0, data) } else { this.rootNode[index].description = data.description }
    },
    removeNode (data) {
      if (data) { return this.$refs.qzTree.remove(data) } else { return this.$refs.qzTree.remove(this.$refs.qzTree.getCurrentNode()) }
    },
    removeKey (pkId) {
      const index = this.getIndex(pkId)
      if (index === -1) return
      return this.$refs.qzTree.remove(this.rootNode[index])
    },
    getNodeIco (data) {
      if (data.hasleaf) {
        return require('@/assets/image/code/code.ico')
      }
      if (data.code) {
        return require('@/assets/image/code/code1.ico')
      }
      return require('@/assets/image/code/codeid.ico')
    }
  }
}
</script>

<style scoped>

</style>
