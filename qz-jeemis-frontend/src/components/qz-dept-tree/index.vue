<template>
    <div>
        <el-tree :check-strictly="true"
                 :data="rootNode"
                 :expand-on-click-node="false"
                 :load="loadTreeDeptNode"
                 :props="treeProps"
                 @check-change="onCheckChange"
                 highlight-current
                 lazy
                 node-key="b0110"
                 ref="qzTree"
                 style="height:100%;width:100%;"
                 v-bind="$attrs"
                 v-on="$listeners">
         <span slot-scope="{ node, data }">
             <el-tooltip :content="data.UPDATED" class="item" effect="light" placement="top-start"
                         v-if="!(data.UPDATED == null || data.机构预警 == '')">
                 <i class="el-icon-bell" style="color: red"></i>
             </el-tooltip>
             <img :src="getTreeNodeIco(data)" style="width: 12px; height: 12px"/> <span hidden>{{data.b0110}}</span>{{ data.b0105 }}
         </span>
        </el-tree>
    </div>
</template>

<script>
import * as api from './api.js'

export default {
  props: {
    // 是否显示空节点(-1)节点
    non: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否其他维度维机构树节点
    dim: {
      type: Boolean,
      required: false,
      default: false
    },
    //  根节点
    rootB0110: {
      type: String,
      required: false,
      default: ''
    },
    inChildren: {
      type: Boolean,
      required: false,
      default: true
    },
    oldvalue: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      rootNode: [],
      treeProps: {
        label: 'b0105',
        children: 'children',
        isLeaf: 'hasLeaf'
      },
      // 所有父节点
      arraypptrs: [],
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
      api.gettreeroot(this.rootB0110, this.non, this.dim).then(res => {
        this.rootNode = res
        this.selTreeNode(this.oldvalue)
        this.$emit('onLoadRootEnd', res)
      })
    },
    loadTreeDeptNode (node, resolve) {
      if (node.level >= 1) this.getTreeDeptChildren(node, resolve)
    },

    getTreeDeptChildren (node, resolve) {
      api.gettreechildren(node.data.b0110, this.dim).then(res => {
        resolve(res)
        // 包含子时处理checkedbox
        if (node.data.checked && node.data.inChildren) {
          res.forEach((resdata) => {
            this.$refs.qzTree.setChecked(resdata.b0110, true, true)
            resdata.checked = true
            resdata.inChildren = true
          })
        }

        // 处理选中
        if (this.arraypptrs.length > 0) {
          const codekey = this.arraypptrs.pop() // 用队列的方式递归
          if (!codekey || codekey.length <= 0) return
          const node = this.$refs.qzTree.getNode(codekey)
          if (node) {
            node.expanded = true
            node.loadData()
          }
        }
        if (this.$refs.qzTree && this.oldvalue) {
          this.$refs.qzTree.setCurrentKey(this.oldvalue)
          if (this.isSelectOldFouces) return
          const node1 = this.$refs.qzTree.getNode(this.oldvalue)
          // 怎么卷动到选中节点位置
          if (node1) {
            const arrnode = this.$refs.qzTree.$el.getElementsByClassName('el-tree-node__content')
            for (const elnode in arrnode) {
              if (arrnode[elnode].textContent && arrnode[elnode].textContent.replace('\n', '').trim() === node1.data.b0110 + node1.data.b0105) {
                arrnode[elnode].parentNode.focus()
                this.$emit('onFocusChange')
                this.isSelectOldFouces = true
              }
            }
          }
        }
      })
    },
    setCurrentKey (b0110) {
      // this.$refs.qzTree.setCurrentKey(b0110)
      this.selTreeNode(b0110)
    },
    getNode (b0110) {
      return this.$refs.qzTree.getNode(b0110)
    },
    getCurrentNode (b0110) {
      return this.$refs.qzTree.getCurrentNode(b0110)
    },
    getCurrentKey (b0110) {
      return this.$refs.qzTree.getCurrentKey(b0110)
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
      switch (data.b0194) {
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
    onCheckChange (data, checked, e2) {
      // data.增加是否包含子 选项
      const currNode = this.$refs.qzTree.getNode(data)
      data.checked = checked
      data.inChildren = this.inChildren
      data.allChildrenChecked = checked && this.inChildren && !currNode.isLeaf
      if (this.inChildren) {
        currNode.childNodes.forEach((node) => {
          node.checked = checked
          node.data.checked = checked
          node.data.inChildren = this.inChildren
        })
      }
      // 如果checked为false 则处理父节点allChildrenChecked 为fasle
      if (!checked) {
        let parent = currNode.parent
        while (parent && parent.level > 0) {
          parent.data.allChildrenChecked = false
          parent = parent.parent
        }
      } else {
        // 如果为真 必须判断处理所有的父节点的子节点都是真,都是包含子节点 inChildren 然后设置allChildrenChecked 为真
        let parent = currNode
        let isBreak = false
        while (parent && parent.level > 0) {
          parent.childNodes.forEach((node) => {
            if (!node.checked) {
              parent.data.allChildrenChecked = false
              isBreak = true
            }
            // 判断是否是全部选择
            if (!isBreak && node.checked && (node.data.inChildren || node.isLeaf)) {
              parent.data.allChildrenChecked = true
            }
          })
          parent = parent.parent
        }
      }
      this.$emit('checkedChange', data, checked, e2)
    },

    selTreeNode (oldcode) {
      // 用队列处理递归 返回父节点时必须倒排序 pop
      if (!oldcode || oldcode.length < 1) return
      api.getDeptNodePptrs(oldcode).then(async res => {
        this.arraypptrs = res
        let codeKey = this.arraypptrs.pop()
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
