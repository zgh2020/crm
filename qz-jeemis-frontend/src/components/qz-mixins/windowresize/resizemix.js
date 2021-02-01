export default {
  data () {
    return {
      split1: 0.2,
      topY: 210,
      heightY: document.body.clientHeight
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
        this.heightY = e.h
      }
    }
  }
}
