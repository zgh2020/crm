<template>
        <el-select :spellcheck="false"
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
  name: 'qz-select-role',
  data () {
    return {
      options: []
    }
  },
  mounted () {
    api.list().then(res => {
      this.options = []
      res.forEach((data, index) => {
        const option = { value: data.id, label: data.name }
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
