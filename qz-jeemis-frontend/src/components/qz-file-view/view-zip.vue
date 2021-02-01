<template>
    <el-tree :data="treeData" :props="treeProps" v-if="visible" >
                <span slot-scope="{ node, data }">
                    <d2-icon-file-svg v-if="data.fileType" :size="16" :name="data.fileType"/> {{ node.label }}
                </span>
    </el-tree>
</template>
<script>
import * as api from './api'
import util from '@/libs/util'
export default {
  name: 'view-zip',
  data () {
    return {
      title: 'zip预览',
      fileId: '',
      fileName: '',
      treeData: [],
      visible: false,
      treeProps: {
        label: 'originName',
        children: 'childList'
      }
    }
  },
  mounted () {

  },
  methods: {
    async init () {
      this.visible = true
      this.treeData = await api.previewZip(this.fileId).catch(() => {
        this.treeData = []
        util.$message.showInfo2('rar文件版本高于4.0不允许预览')
      })
    },

    destroyZip () {
      this.visible = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>

</style>
