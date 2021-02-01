<template>
    <iframe :src="pdfUrl" width="100%" height="99%" frameborder="no" border="0" v-if="visible"></iframe>
</template>
<script>
import util from '@/libs/util'
import * as api from './api'
export default {
  name: 'view-pdf',
  data () {
    return {
      title: 'pdf预览',
      fileId: '',
      fileName: '',
      pdfUrl: '',
      visible: false
    }
  },
  mounted () {

  },
  methods: {
    async init () {
      this.visible = true
      const data = await api.previewPdf(this.fileId, this.fileName)
      const srcUrl = util.$gen.getImageObjectURL(data)
      this.$nextTick(() => {
        this.pdfUrl = '/pdfjs/web/viewer.html?file=' + srcUrl
      })
    },
    destroyPdf () {
      this.visible = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>

</style>
