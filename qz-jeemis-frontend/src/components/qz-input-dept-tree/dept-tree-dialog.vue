<template>

    <el-dialog
            :close-on-click-modal="false"
            :close-on-press-escape="true"
            :modal="false"
            :visible.sync="visible"
            @closed="closeDialog"
            top="9vh"
            v-qz-dialog-drag
            width="400px">
        <template slot="title">
            <div class="diaglogtitle">
                <d2-icon-svg class="dialog-icon" name="d2-admin"></d2-icon-svg>
                <span style="line-height: 0.5"> {{title}} </span>
            </div>
        </template>
        <div class="codeShowBox">
            <dept-tree :oldvalue="oldvalue" :rootB0110="rootB0110"
                       @keydown.enter.native="onkeyenter"
                       @keydown.esc.native="onkeyesc"
                       @node-click="onNodeClick"
                       class="codeShowBox"
                       ref="deptTree">
            </dept-tree>
        </div>

    </el-dialog>

</template>

<script>
import util from '@/libs/util'
import deptTree from '../qz-dept-tree'

export default {
  name: 'deptTreeDialog',
  components: { deptTree },
  props: {
    codeId: {
      type: String,
      required: false,
      //  UA可选所有节点 UB只能选单位和部门节点不允许分组 UN 表示只能选单位 UM 表示智能选部门 UG 表示只能选分组
      default: 'UA'
    },
    rootB0110: {
      type: String,
      required: false,
      default: ''
    },
    oldvalue: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      title: '代码选择',
      visible: false,
      selNode: null
    }
  },
  mounted () {

  },
  methods: {
    init (ekey) {
      this.visible = true
      this.$nextTick(() => {
        this.title = '选择单位'
      })
    },
    async onNodeClick (data) {
      this.selNode = data
      // 检查是否是分组
      if (this.codeId === 'UB' && this.selNode.b0194 === '3') {
        await util.$message.showInfo('不能选择分组')
        return
      }
      // 检查是否是单位
      if (this.codeId === 'UN' && this.selNode.b0194 !== '1') {
        await util.$message.showInfo('只能选择单位')
        return
      }
      // 检查是否是部门
      if (this.codeId === 'UM' && this.selNode.b0194 !== '2') {
        await util.$message.showInfo('只能选择部门')
        return
      }
      // 检查是否是分组
      if (this.codeId === 'UG' && this.selNode.b0194 !== '3') {
        await util.$message.showInfo('只能选择分组')
        return
      }
      this.$emit('onSelected', this.selNode)
      this.visible = false
      this.closeDialog()
    },

    onkeyesc (e) {
      this.visible = false
      this.closeDialog()
    },
    onkeyenter () {
      this.$refs.listcode3.getselcode()
    },
    closeDialog () {
      this.$emit('closed')
    }
  },
  computed: {},
  watch: {

  }
}
</script>

<style scoped>
    .codeShowBox {
        height: 400px;
        border: 1px solid #c8e9f6;
    }
</style>
