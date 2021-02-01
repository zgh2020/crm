<template>
    <audio controls  autoplay name="media" v-if="visible">
        <source :src="url" >
    </audio>
</template>
<script>
import * as api from './api'
export default {
  name: 'view-audio',
  data () {
    return {
      title: '音频预览',
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
      this.$nextTick(() => {
        this.url = api.downloadVideo(this.fileId)
      })
    },
    destroyAudio () {
      this.visible = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>

</style>
