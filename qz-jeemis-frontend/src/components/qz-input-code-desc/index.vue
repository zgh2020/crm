<template>
    <div>
        <el-input :size="size" @compositionstart.native="onzhinputend" @dblclick.native="opencodedialog"
                  @keydown.native="onkeydown" maxlength="0"
                  ref="input2" :spellcheck="false" v-model="currentDesc">
            <i @click="opencodedialog" class="el-input__icon el-icon-tickets" slot="suffix"
               style="cursor: pointer"></i>
        </el-input>

        <qz-code-desc-dialog :codeid="codeid"
                             :description-label="descriptionLabel"
                             :description="currentDesc"
                             :inputlayer="inputlayer"
                             :value-label="valueLabel"
                             v-model="currentValue"
                             @closed="onclosecodedialog"
                             @change="onChange"
                             ref="codedialog1"
                             v-if="showdialog"
        />
    </div>
</template>

<script>
import qzCodeDescDialog from './qz-codedesc-dialog'

export default {
  name: 'qz-inputcodedesc',
  components: { qzCodeDescDialog },
  props: {
    // 值
    value: {
      type: String,
      required: false,
      default: ''
    },
    valueLabel: {
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
    descriptionLabel: {
      type: String,
      required: false,
      default: ''
    },
    codeid: {
      type: String,
      required: true
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
    }
  },
  data () {
    return {
      title: '组件标题',
      currentDesc: '',
      currentValue: '',
      showdialog: false,
      isValueChange: false
    }
  },
  mounted () {

  },
  methods: {
    init () {
    },
    onChange (v1, v2) {
      this.currentValue = v1
      this.currentDesc = v2
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
          if (!b || e.key.length !== 1) return
          this.opencodedialog(e)
          e.preventDefault()
      }
    },
    opencodedialog () {
      this.showdialog = true
      this.$nextTick(() => {
        this.$refs.codedialog1.init()
      })
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
