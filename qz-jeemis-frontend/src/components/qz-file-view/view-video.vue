<template>
    <video controls  autoplay name="media" v-if="visible" :src="url" > </video>
</template>
<script>
import * as api from './api'
export default {
  name: 'view-video',
  data () {
    return {
      title: '视频预览',
      fileId: '',
      fileName: '',
      type: 'video/mp4',
      url: '',
      visible: false
    }
  },
  mounted () {

  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.url = api.downloadVideo(this.fileId)
      })
    },
    destroyVideo () {
      this.visible = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>

</style>
