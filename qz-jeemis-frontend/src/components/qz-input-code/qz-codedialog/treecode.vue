<template>
    <div>
        <el-tree :data="rootnode" :load="loadchildnode"
                 :props="treeprops"
                 @node-click="onNodeClick"
                 highlight-current
                 lazy
                 node-key="code"
                 ref="tvwcode"
                 style="height:100%;width:100%;">
                <span slot-scope="{ node, data }">
                    <img :src="getnodeico(data)" style="width: 12px; height: 12px;"/>
                    <span style="margin-left: 5px;font-size:13px">{{data.code}}-{{data.description }}</span>
                </span>
        </el-tree>
    </div>
</template>

<script>
import { getcodelist, getcodepptrs } from './api.js'
import util from '@/libs/util'

export default {
  name: 'treecode',
  components: {},
  props: {
    codeid: { default: '' },
    inputlayer: {
      type: Number,
      required: false,
      default: 1
    }, // 选择最底层  0 不用非得选最底层 1必须选最底层
    oldvalue: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      title: '代码树',
      rootnode: [],
      treeprops: {
        label: 'description',
        children: 'children',
        isLeaf: 'hasleaf'
      },
      arraypptrs: [],
      isSelectOldFouces: false
    }
  },
  mounted () {
    this.init()
  },
  updated () {

  },
  methods: {
    init () {
      this.loadrootnode()
    },
    /**
       * 装载代码根节点
       */
    loadrootnode () {
      getcodelist(this.codeid, this.codeid)
        .then(res => {
          this.rootnode = res
        })
    },

    loadchildnode (node, resolve) {
      if (node.level < 1) return
      getcodelist(this.codeid, node.data.code)
        .then(res => {
          resolve(res)
          if (this.arraypptrs.length > 0) {
            const codekey = this.arraypptrs.pop() // 用队列的方式递归
            if (!codekey || codekey.length <= 0) return
            const node = this.$refs.tvwcode.getNode(codekey)
            if (node) {
              node.expanded = true
              node.loadData()
            }
          }
          if (this.$refs.tvwcode && this.oldvalue) {
            this.$refs.tvwcode.setCurrentKey(this.oldvalue)
            if (this.isSelectOldFouces) return
            const node1 = this.$refs.tvwcode.getNode(this.oldvalue)
            // 怎么卷动到选中节点位置
            if (node1) {
              const arrnode = this.$refs.tvwcode.$el.getElementsByClassName('el-tree-node__content')
              for (const elnode in arrnode) {
                if (arrnode[elnode].innerText && arrnode[elnode].innerText.replace('\n', '') === node1.data.code + '-' + node1.data.description) {
                  arrnode[elnode].parentNode.focus()
                  this.$emit('onFocusChange')
                  this.isSelectOldFouces = true
                }
              }
            }
          }
        })
    },
    getselcode () {
      const selnode = this.$ref.tvwcode.getCurrentNode()
      if (!selnode) return this.$emit('onSelected', selnode.data)
    },

    getnodeico (data) {
      if (data.hasleaf) {
        return require('@/assets/image/code/code.ico')
      } else {
        return require('@/assets/image/code/codeid.ico')
      }
    },
    async onNodeClick (data) {
      // 检查是否选择到最底层,如果是,检查是否最层,不是提醒 如果不是返回数据
      if (this.inputlayer === 1 && !data.hasleaf) {
        await util.$message.showInfo('必须选择最底层节点')
        return
      }
      this.$emit('onSelected', data)
    },

    selcoderow (oldcode) {
      // 用队列处理递归 返回父节点时必须倒排序 pop
      if (!oldcode || oldcode.length < 1) return
      getcodepptrs(this.codeid, oldcode).then(async res => {
        this.arraypptrs = res
        const codekey = this.arraypptrs.pop()
        const node = this.$refs.tvwcode.getNode(codekey)
        if (node) {
          node.expanded = true
          node.loadData()
        }
      }
      )
    }
  }
}
</script>

<style scoped>

</style>
