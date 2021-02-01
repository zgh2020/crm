<template>
    <div>
        <el-input :placeholder="placeholder" :size="size" @compositionstart.native="onzhinputend"
                  @dblclick.native="opencodedialog"
                  @keydown.native="onkeydown" maxlength="0"
                  ref="input2" :spellcheck="false" v-model="currentDesc" @clear="clear">
            <i @click="opencodedialog" class="el-input__icon el-icon-search" slot="suffix"
               style="cursor: pointer"></i>
        </el-input>

        <dept-tree-dialog :code-id="codeId" :oldvalue="value" @closed="onclosecodedialog"
                          @onSelected="onSelected"
                          ref="deptTreeDialog"
                          v-if="showdialog">

        </dept-tree-dialog>
    </div>
</template>

<script>
import * as api from './api.js'
import deptTreeDialog from './dept-tree-dialog'

export default {
  name: 'qz-input-dept-tree',
  components: { deptTreeDialog },
  props: {
    // 值
    value: {
      type: String,
      required: false,
      default: ''
    },
    // 描述
    description: {
      type: String,
      required: false,
      default: ''
    },
    // 是否自动翻译描述
    autoTranslate: {
      type: Boolean,
      required: false,
      default: false
    },

    placeholder: {
      type: String,
      required: false,
      default: '请选择代码'
    },
    codeId: {
      type: String,
      required: true
    },
    field: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false,
      default: 'mini'
    }
  },
  data () {
    return {
      title: '组件标题',
      currentDesc: '',
      // 组件内输入框的值
      currentValue: '',
      // 搜索的文字
      searchText: '',
      // 显示代码弹窗
      showdialog: false
    }
  },
  mounted () {
  },
  methods: {
    init () {
    },
    onSelected (node) {
      this.currentDesc = node.b0105
      this.currentValue = node.b0110
      this.$refs.input2.focus()
    },
    onclosecodedialog () {
      this.showdialog = false
      this.$refs.input2.focus()
    },
    onkeydown (e) {
      switch (e.keyCode) {
        case 13: // 回车
        case 9:
          break
        case 46: // 删除
        case 8:
          this.currentDesc = ''
          this.currentValue = ''
          e.preventDefault()
          break
        case 32:
          e.preventDefault()
          this.opencodedialog()
          break
        default:
          const p = /[0-9a-zA-Z]/i
          const b = p.test(e.key)
          if (!b || e.key.length !== 1) return
          this.opencodedialog(e)
          e.preventDefault()
      }
    },
    opencodedialog (e) {
      this.showdialog = true
      this.$nextTick(() => {
        this.$refs.deptTreeDialog.init(e)
      })
    },
    clear () {
      this.currentDesc = ''
      this.currentValue = ''
    },
    //  中文输入
    onzhinputend (event) {
      this.opencodedialog()
    }
  },
  computed: {},
  watch: {
    // 对外提供 v-model
    value: {
      handler (val) {
        if (this.currentValue !== val) {
          this.currentValue = val
          //  去取服务器翻译代码 是否自动翻译
          if (!this.autoTranslate) return
          api.getcodedescription(this.codeId, val).then(res => {
            this.currentDesc = res
          })
        }
      },
      immediate: true
    },
    description (newVal) {
      this.currentDesc = newVal
    },
    currentDesc  (newVal, oldval) {
      if (newVal === oldval) return
      this.$emit('changeDesc', this.currentValue, newVal)
    },
    // 对外提供 v-model
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('changeValue', this.val, this.currentDesc)
    }

  }
}
</script>

<style scoped>

</style>
