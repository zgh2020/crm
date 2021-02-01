<template>
    <div>
        <el-input :placeholder="placeholder" :size="size" @compositionstart.native="onzhinputend" @dblclick.native="opencodedialog"
                  @keydown.native="onkeydown" maxlength="0"
                  ref="input2" :disabled="disabled" :spellcheck="false" v-model="currentDesc"
                  @clear="clear">
            <i @click="opencodedialog" class="el-input__icon el-icon-search" slot="suffix"
               style="cursor: pointer"></i>
        </el-input>

        <qz-codedialog :codeid="codeid" :inputlayer="inputlayer" :oldvalue="value" @closed="onclosecodedialog"
                       @onSelected="onSelected"
                       ref="codedialog1"
                       v-if="showdialog"></qz-codedialog>
    </div>
</template>

<script>
import { getcodedescription } from './qz-codedialog/api.js'
import qzcodedialog from './qz-codedialog'

export default {
  name: 'qz-inputcode',
  components: { 'qz-codedialog': qzcodedialog },
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
    codeid: {
      type: String,
      required: true
    },
    field: {
      type: String,
      required: false
    },
    inputlayer: {
      type: Number,
      required: false,
      default: 9
    },
    size: {
      type: String,
      required: false,
      default: 'mini'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    beforeChange: Function

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
      showdialog: false,
      currinputlayer: 9,
      isValueChange: false
    }
  },
  mounted () {
  },
  methods: {
    init () {
    },
    onSelected (e) {
      if (typeof this.beforeChange === 'function') {
        if (!this.beforeChange(e)) return
      }
      this.currentDesc = e.description
      this.currentValue = e.code
      this.$refs.input2.focus()
    },
    onclosecodedialog () {
      this.showdialog = false
      this.$refs.input2.focus()
    },
    onkeydown (e) {
      if (this.disabled) return
      switch (e.keyCode) {
        case 13: // 回车
        case 9:
          break
        case 46: // 删除
        case 8:
          // this.value = ''
          this.currentDesc = ''
          this.currentValue = ''
          e.preventDefault()
          break
        case 32:
          e.preventDefault()
          this.opencodedialog()
          break
        default:
          // this.searchText=e.keyCode
          const p = /[0-9a-zA-Z]/i
          const b = p.test(e.key)
          if (!b || !e.key || e.key.length !== 1) return
          this.opencodedialog(e)
          e.preventDefault()
      }
    },
    opencodedialog (e) {
      if (this.disabled) return
      this.showdialog = true
      this.$nextTick(() => {
        this.$refs.codedialog1.init(e)
      })
    },
    clear () {
      if (this.disabled) return
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
          if (!this.autoTranslate) {
            if (!this.currentValue) { this.currentDesc = '' } else { this.currentDesc = this.description }
            return
          }
          getcodedescription(this.codeid, val).then(res => {
            this.currentDesc = res
          })
        }
      },
      immediate: true
    },
    currentDesc (newVal, oldval) {
      if (newVal === oldval) return
      this.$emit('changeDesc', this.currentValue, newVal)
    },
    description (newVal) {
      this.currentDesc = newVal
    },
    // 对外提供 v-model
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('changeValue', val, this.currentDesc)
    }

  }
}
</script>

<style scoped>

</style>
