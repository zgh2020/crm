<template>
    <el-tag style="font-size: 36px" v-if="visible" type="danger">{{fileName}}文件无法预览</el-tag>
</template>
<script>
export default {
  name: 'view-unknown',
  data () {
    return {
      title: '无法预览',
      fileId: '',
      fileName: '',
      url: '',
      visible: false
    }
  },
  mounted () {

  },
  methods: {
    init () {
      this.visible = true
    },
    destroyUnknown () {
      this.visible = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>

</style>
