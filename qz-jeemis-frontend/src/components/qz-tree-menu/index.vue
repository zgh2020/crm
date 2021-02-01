<template>
    <el-tree :data="treeData" :expand-on-click-node="false"
             :props="treeProps"
             highlight-current
             node-key="id"
             current-node-key="0"
             :default-expanded-keys="['0']"
             style="height:100%;width:100%;font-size: 14px"
             v-bind="$attrs"
             v-on="$listeners"
             ref="qzTree">
            <span slot-scope="{ node, data }">
             <i :class="'fa fa-'+data.icon"></i> {{ node.label }}
            </span>
    </el-tree>
</template>

<script>
import * as api from './api.js'

export default {
  props: [],
  data () {
    return {
      treeData: [],
      treeProps: {
        label: 'title',
        children: 'children'
      }
    }
  },
  // 第一步：挂载 ，页面加载时执行
  mounted () {
    this.loadMenuTree()
  },
  methods: {
    // 初始化菜单树
    loadMenuTree () {
      api.getMenuTree().then(data => {
        this.treeData = data
      })
    },
    // 根据id设置某个节点为选中状态
    setCurrentKey (id) {
      this.$refs.qzTree.setCurrentKey(id)
    },
    getCheckedKeys () {
      return this.$refs.qzTree.getCheckedKeys()
    },
    getHalfCheckedKeys () {
      return this.$refs.qzTree.getHalfCheckedKeys()
    },
    setChecked (key, checked, deep) {
      this.$refs.qzTree.setChecked(key, checked, deep)
    },
    setCheckedKeys (keys, leafOnly) {
      this.$refs.qzTree.setCheckedKeys(keys, leafOnly)
    },
    // 根据id获取node节点
    getNode (id) {
      return this.$refs.qzTree.getNode(id)
    },
    // 获取当前的选中节点
    getCurrentNode () {
      return this.$refs.qzTree.getCurrentNode()
    },
    // 获取当前选中节点的key值
    getCurrentKey () {
      return this.$refs.qzTree.getCurrentKey()
    },
    removeNode (id) {
      if (!id) return
      const data = this.$refs.qzTree.getNode(id)
      this.$refs.qzTree.remove(data)
    },
    async updateNode (id) {
      const node1 = this.$refs.qzTree.getNode(id)
      const data = await api.getMenuItem('', id)
      const pNode = this.getCurrentNode()
      if (node1) {
        node1.data = { ...node1.data, ...data }
      } else {
        this.$refs.qzTree.append(data, pNode)
      }
    },
    findChildren (dataList, id) {
      for (const index in dataList) {
        debugger
        if (dataList[index].id === id) { return dataList[index] }
        return this.findChildren(dataList[index].children, id)
      }
    }
  }
}
</script>

<style scoped>

</style>
