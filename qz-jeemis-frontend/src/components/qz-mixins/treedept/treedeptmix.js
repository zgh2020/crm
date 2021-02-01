//  最大的缺点 不能同时放两棵机构树 但封装成组件需要传出的属性又特别多 折中一下 以后单独封装一个机构树组件简单点的
//  以后增加警告图标
import { gettreeroot, gettreechildren } from './api.js'
export default {
  props: [],
  data () {
    return {
      rootnode: [],
      treeprops: {
        label: 'b0101',
        children: 'children',
        isLeaf: 'hasleaf'
      }
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
      gettreeroot('').then(res => {
        this.rootnode = res
        if (typeof (this.onLoadRootTreeData) === 'function') this.onLoadRootTreeData(res)
      })
    },
    loadTreeDeptNode (node, resolve) {
      if (node.level >= 1) this.getTreeDeptChildren(node, resolve)
    },

    getTreeDeptChildren (node, resolve) {
      gettreechildren(node.data.id).then(res => {
        resolve(res)
        // 装载时树子节点可以定义装载的一些相关处理
        if (typeof (this.OnLoadChildTreeData) === 'function') this.onLoadChildTreeData(res)
      })
    },
    getTreeNodeIco (data) {
      switch (data.B0194) {
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
  }
}
