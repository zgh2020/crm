<template>
        <el-select  :spellcheck="false"
                    v-bind="$attrs"
                    v-on="$listeners"
                    v-model="currentValue"
                    style="width:100%">
            <el-option
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-for="item in options">
            </el-option>
        </el-select>
</template>
<script>
import * as api from './api.js'

export default {
  name: 'qz-select-code',
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
    codeid: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      title: '组件标题',
      currentDesc: '',
      // 组件内输入框的值
      currentValue: '',
      options: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }]
    }
  },
  mounted () {
    if (!this.codeid) return
    api.getcodelistAll(this.codeid).then(res => {
      this.options = []
      res.forEach((value1, index) => {
        const option = { value: value1.code, label: value1.description }
        this.options.push(option)
      })
    })
  },
  methods: {
    init () {
    }
  },
  computed: {},
  watch: {
    // 对外提供 v-model
    value: {
      handler (val) {
        this.currentValue = val
        if (!this.currentValue) {
          this.currentDesc = ''
          return
        }
        for (let i = 1; i < this.options.length; i++) {
          const obj = this.options[i]
          if (obj.value === val) {
            this.currentDesc = obj.label
            return
          }
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
