export default {
  data () {
    return {
      split1: 0.2,
      topY: 150,
      heightY: document.body.clientHeight - 150,
      treeHeightY: document.body.clientHeight - 200,
      leftHeightY: document.body.clientHeight - 100
    }
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        if (typeof (this.onResize) === 'function') {
          this.onResize({
            w: document.body.clientWidth,
            h: document.body.clientHeight
          })
        }
      })()
    }
  },
  methods: {
    onResize (e) {
      if (e.h >= 400) {
        this.heightY = e.h - this.topY
        this.treeHeightY = e.h - 200
        this.leftHeightY = e.h - 100
      }
    }
  }
}
