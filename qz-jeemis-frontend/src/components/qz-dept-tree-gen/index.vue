<template>
    <div>
        <el-tree :check-strictly="false"
                 :data="rootNode"
                 :expand-on-click-node="false"
                 :load="loadTreeDeptNode"
                 :props="treeProps"
                 highlight-current
                 lazy
                 node-key="id"
                 ref="qzTree"
                 style="height:100%;width:100%;"
                 v-bind="$attrs"
                 v-on="$listeners">
         <span slot-scope="{ node, data }">
             <img :src="getTreeNodeIco(data)" style="width: 12px; height: 12px"/> <span hidden>{{data.id}}</span>{{ data.name }}
         </span>
        </el-tree>
    </div>
</template>

<script>
import * as api from './api.js'

export default {
  props: {
    //  根据ID默认
    rootId: {
      type: String,
      required: false,
      default: ''
    },
    oldValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      rootNode: [],
      treeProps: {
        label: 'name',
        children: 'children',
        isLeaf: 'hasLeaf'
      },
      // 所有父节点
      arrayPids: [],
      // 控制当前选中焦点
      isSelectOldFouces: false
    }
  },
  mounted () {
    this.initTreeDept()
  },
  methods: {
    initTreeDept () {
      this.getTreeDeptRoot()
    },
    getTreeDeptRoot () {
      api.getTreeRoot(this.rootId).then(res => {
        this.rootNode = res
        this.selTreeNode(this.oldValue)
        this.$emit('onLoadRootEnd', res)
      })
    },
    loadTreeDeptNode (node, resolve) {
      if (node.level >= 1) this.getTreeDeptChildren(node, resolve)
    },

    getTreeDeptChildren (node, resolve) {
      api.getTreeChildren(node.data.id).then(res => {
        resolve(res)
        // 处理选中
        if (this.arrayPids.length > 0) {
          const codekey = this.arrayPids.pop() // 用队列的方式递归
          if (!codekey || codekey.length <= 0) return
          const node = this.$refs.qzTree.getNode(codekey)
          if (node) {
            node.expanded = true
            node.loadData()
          }
        }
        if (this.$refs.qzTree && this.oldValue) {
          this.$refs.qzTree.setCurrentKey(this.oldValue)
          if (this.isSelectOldFouces) return
          const node1 = this.$refs.qzTree.getNode(this.oldValue)
          // 怎么卷动到选中节点位置
          if (node1) {
            const arrnode = this.$refs.qzTree.$el.getElementsByClassName('el-tree-node__content')
            for (const elnode in arrnode) {
              if (arrnode[elnode].textContent && arrnode[elnode].textContent.replace('\n', '').trim() === node1.data.id + node1.data.name) {
                arrnode[elnode].parentNode.focus()
                this.$emit('onFocusChange')
                this.isSelectOldFouces = true
              }
            }
          }
        }
      })
    },
    setCurrentKey (id) {
      // this.$refs.qzTree.setCurrentKey(b0110)
      this.selTreeNode(id)
    },
    getNode (id) {
      return this.$refs.qzTree.getNode(id)
    },
    getCurrentNode (id) {
      return this.$refs.qzTree.getCurrentNode(id)
    },
    getCurrentKey (id) {
      return this.$refs.qzTree.getCurrentKey(id)
    },
    getCheckedKeys () {
      return this.$refs.qzTree.getCheckedKeys()
    },
    getHalfCheckedKeys () {
      return this.$refs.qzTree.getHalfCheckedKeys()
    },
    getCheckedNodes (leafOnly, includeHalfChecked) {
      return this.$refs.qzTree.getCheckedNodes(leafOnly, includeHalfChecked)
    },
    setChecked (key, checked, deep) {
      this.$refs.qzTree.setChecked(key, checked, deep)
    },
    setCheckedKeys (keys, leafOnly) {
      this.$refs.qzTree.setCheckedKeys(keys, leafOnly)
    },
    getTreeNodeIco (data) {
      switch (data.type) {
        case '1':
          return require('@/assets/image/dept/dw2.ico')
        case '2':
          return require('@/assets/image/dept/bm.ico')
        case '3':
          return require('@/assets/image/dept/group.ico')
        default:
          return require('@/assets/image/dept/dw2.ico')
      }
    },
    selTreeNode (oldcode) {
      // 用队列处理递归 返回父节点时必须倒排序 pop
      if (!oldcode || oldcode.length < 1) return
      api.getDeptNodePids(oldcode).then(async res => {
        this.arrayPids = res
        let codeKey = this.arrayPids.pop()
        while (codeKey && codeKey !== this.rootNode[0].id) {
          codeKey = this.arrayPids.pop()
        }
        const node = this.$refs.qzTree.getNode(codeKey)
        if (node) {
          node.expanded = true
          node.loadData()
        }
      }
      )
    }
  },
  computed: {
    tree () {
      return this.$refs.qzTree
    }
  }
}

</script>

<style scoped>

</style>
