<template>
    <div>
        <view-pdf ref="viewPdf" v-if="showViewPdf"></view-pdf>
    </div>
</template>
<script>
import viewPdf from './view-pdf'

export default {
  name: 'qz-file-view',
  components: { viewPdf },
  data () {
    return {
      title: '预览',
      fileId: '',
      fileName: '',
      fileType: '',
      showViewPdf: false,
      showViewPic: false,
      showViewXls: false,
      showViewZip: false,
      showViewPpt: false,
      showViewVideo: false
    }
  },
  mounted () {

  },
  methods: {
    init () {
      const pdfExtName = 'doc,docx,pdf,txt,'
      this.showViewPdf = this.fileType && pdfExtName.indexOf(this.fileType + ',') >= 0
      if (this.showViewPdf) {
        setTimeout(() => {
          this.openPdfView()
        }, 500)
      }
    },
    openPdfView () {
      this.$nextTick(() => {
        this.$refs.viewPdf.fileId = this.fileId
        this.$refs.viewPdf.fileName = this.fileName
        this.$refs.viewPdf.init()
      })
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>
    .contract-modal {
        width: 100%;
        overflow: scroll;
        background: rgba(139, 148, 171, 0.7);
        padding: 20px 0 0;
        z-index: 900;
    }

    .contract-modal .contract-detail {
        margin: 0 auto;
        max-width: 96%;
        height: auto;
    }

    #mycanvas {
        min-height: 50vh;
        background: #fff;
    }

    canvas {
        margin: 0 auto;
        display: block;
        border-bottom: 2px solid #aaa;
    }
</style>
