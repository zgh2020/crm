<template>
    <el-dialog
            :close-on-click-modal="false"
            :modal="false"
            :visible.sync="dialogVisible"
            @closed="closeDialog"
            :show-close="false"
            :modal-append-to-body="true"
            :title="title"
            top="40vh"
            v-qz-dialog-drag
            width="390px">
        <el-progress v-if="progressVisible" style="margin-top: 12px ;margin-bottom: 20px" :text-inside="true" :stroke-width="22" :percentage="percentage" :format="format">></el-progress>
        <img v-if="imgVisible" style="margin-top: 12px ;margin-bottom: 20px" src="./progress.gif"/>
    </el-dialog>

</template>
<script>

export default {
  name: 'qz-progress',
  props: {
    // 值 一个假的进度条
    time: {
      type: Number,
      required: false,
      default: 1000
    },
    // 描述
    title: {
      type: String,
      required: false,
      default: '正在处理请稍候...'
    }
  },
  data () {
    return {
      dialogVisible: false,
      imgVisible: false,
      progressVisible: false,
      percentage: 0,
      timer: null

    }
  },
  mounted () {

  },
  methods: {
    init (time) {
      this.percentage = 0
      this.dialogVisible = true
      clearInterval(this.timer)
      if (time) this.time = time
      if (this.time === 1000) {
        this.imgVisible = true
        this.progressVisible = false
      } else {
        this.progressVisible = true
        this.imgVisible = false
      }

      this.$nextTick(() => {
        this.progress()
      })
    },
    progress () {
      this.timer = setInterval(() => {
        this.percentage = this.percentage + 10
        if (this.percentage >= 100) {
          this.percentage = 100
          clearInterval(this.timer)
          setTimeout(() => {
            this.percentage = 0
          }, 800)
          setTimeout(() => {
            this.progress()
          }, 1500)
        }
      }, this.time / 10)
    },

    format (percentage) {
      return ''
    },
    getProgressGif () {
      return require('./progress.gif')
    },
    closeDialog () {
      clearInterval(this.timer)
      this.percentage = 0
      this.dialogVisible = false

      this.$emit('closed')
    }
  },
  computed: {},
  watch: {
  }
}
</script>

<style scoped>

</style>
