<template>
    <iframe :src="pdfUrl" width="100%" height="99%" frameborder="no" border="0"></iframe>
</template>
<script>
export default {
  name: 'qz-pdf-view',
  props: {
    // 值
    src: {
      type: String,
      required: false,
      default: ''
    },
    height: {
      type: Number,
      required: false,
      default: 500
    }
  },
  data () {
    return {
      title: 'pdf预览',
      pdfDoc: null,
      pdfUrl: '',
      pdfScale: 0,
      container: null
    }
  },
  mounted () {

  },
  methods: {
    async init () {
      /* let url = this.src+'&name=cehsi.pdf'
        this.pdfUrl='/pdfjs/web/viewer.html?file=' + encodeURIComponent(url) */
      /* let data =await api.downLoadRmbPdf(a0100)
        let url= util.$gen.getImageObjectURL(data) */
      this.pdfUrl = '/pdfjs/web/viewer.html?file=' + this.src
      // 当然上面的是可以的，但是此access_token 是有时效性的，只是放在这边当作个例子，至于最后我为什么加了个测试.pdf 是可以在浏览器标签叶上显示
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
