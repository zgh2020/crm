<template>
    <div style="height: 100%">
        <div id="iframeEditor"></div>
    </div>
</template>
<script>
import * as api from './api'
export default {
  name: 'view-office',
  data () {
    return {
      title: 'office预览',
      fileId: '',
      fileName: '',
      docEditor: null
    }
  },
  mounted () {

  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.iniOnlyOfficeConfig()
      })
    },
    async iniOnlyOfficeConfig () {
      // 显示组件
      const config = await api.onlyOfficeConfig(this.fileId)
      this.title = config.document.title
      config.height = '100%'
      // PC桌面查看 手机请改成mobile 嵌入式:embedded
      config.type = 'desktop'
      config.document.url = api.downloadUrl(this.fileId)
      // 仅查看
      config.editorConfig.mode = 'view'
      config.editorConfig.customization = {}
      config.editorConfig.customization.goback = {}
      config.editorConfig.customization.goback.url = ''
      config.editorConfig.customization.chat = false
      config.editorConfig.customization.comments = false
      config.editorConfig.customization.help = false
      config.editorConfig.customization.about = false
      config.editorConfig.customization.zoom = '-2'
      config.editorConfig.embedded = null
      // console.info(JSON.stringify(config))
      /* eslint-disable */
      this.docEditor = new DocsAPI.DocEditor('iframeEditor', config)
    },
    destroyEditor () {
      this.docEditor.destroyEditor()
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>

</style>
