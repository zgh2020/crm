<template>
    <div>
        <el-tree  :data="treeData" :expand-on-click-node="false"  :props="treeProps"
                 highlight-current
                 node-key="id"
                 current-node-key="0"
                 :default-expanded-keys="[rootId0]"
                 style="height:100%;width:100%;font-size: 14px"
                 v-bind="$attrs"
                 v-on="$listeners"
                 ref="qzTree">
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
      treeData: [],
      treeProps: {
        label: 'name',
        children: 'children',
        isLeaf: 'hasLeaf'
      },
      rootId0: ''
    }
  },
  mounted () {
    this.loadMenuTree()
  },
  methods: {
    // 初始化机构树
    loadMenuTree () {
      api.getTreeAll().then(data => {
        this.treeData = data
        this.rootId0 = data[0].id
      })
    },
    setCurrentKey (key) {
      this.$refs.qzTree.setCurrentKey(key)
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
