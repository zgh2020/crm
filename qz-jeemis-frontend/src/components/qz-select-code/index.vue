<template>
        <el-select  :spellcheck="false"
                    v-bind="$attrs"
                    v-on="$listeners"
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
  }
}
</script>

<style scoped>

</style>
