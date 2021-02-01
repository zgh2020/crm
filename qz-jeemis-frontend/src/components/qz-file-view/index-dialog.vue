<template>
    <qz-dialog :title="title"  :visible.sync="visible" top="6vh" width="800px" @close="closeHandle" @fullscreen="fullscreen">
        <view-pdf :style="{height:height}"  ref="viewPdf" v-if="showViewPdf"></view-pdf>
        <view-office :style="{height:height,margin:'-10px'}"  ref="viewOffice" v-if="showViewOffice"></view-office>
        <view-video :style="{height:height,width:'100%',marginTop:'-10px'}" ref="viewVideo"  v-if="showViewVideo"></view-video>
        <view-video-decode :style="{height:height,width:'100%',marginTop:'-10px'}" ref="viewVideo"  v-if="false"></view-video-decode>
        <view-audio :style="{height:height,width:'100%'}" ref="viewAudio"  v-if="showViewAudio"></view-audio>
        <viewUnknown :style="{height:height,width:'100%',lineHeight:'300px',textAlign:'center'}" ref="viewUnknown"  v-if="showViewUnknown"></viewUnknown>
        <viewZip :style="{height:height}"  ref="viewZip"   v-if="showViewZip"></viewZip>
        <viewPhoto :style="{height:height}" style="margin: -10px -15px -10px -15px "  ref="viewPhoto"  v-if="showViewPhoto"> </viewPhoto>
    </qz-dialog>
</template>
<script>
import viewPdf from './view-pdf'
import viewOffice from './view-office'
import viewVideo from './view-video'
import viewVideoDecode from './view-video-decode'
import viewAudio from './view-audio'
import viewUnknown from './view-unknown'
import viewZip from './view-zip'
import viewPhoto from '../qz-file-photo-view'
export default {
  name: 'qz-file-view',
  components: { viewPdf, viewOffice, viewVideo, viewVideoDecode, viewAudio, viewUnknown, viewZip, viewPhoto },
  data () {
    return {
      title: '预览',
      fileId: '',
      fileName: '',
      fileType: '',
      height: '500px',
      visible: false,
      showViewPdf: false,
      showViewOffice: false,
      onlyOfficeEnable: window.SITE_CONFIG.onlyOfficeEnable,
      showViewPic: false,
      showViewXls: false,
      showViewZip: false,
      showViewPpt: false,
      showViewVideo: false,
      showViewAudio: false,
      showViewPhoto: false,
      showViewUnknown: false
    }
  },
  mounted () {

  },
  methods: {
    init () {
      this.visible = true
      this.title = this.fileName
      const officeExtName = 'doc,docx,pdf,txt,xls,xlsx,csv,html,htm,ppt,pptx,'
      this.showViewOffice = this.onlyOfficeEnable === '1' && this.fileType && officeExtName.indexOf(this.fileType + ',') >= 0
      if (this.showViewOffice) {
        this.openOfficeView()
        return
      }
      const videoExtName = 'mp4,ogg,avi,'
      this.showViewVideo = this.fileType && videoExtName.indexOf(this.fileType + ',') >= 0
      if (this.showViewVideo) {
        this.openVideoView()
        return
      }
      const audioExtName = 'mp3,wav,'
      this.showViewAudio = this.fileType && audioExtName.indexOf(this.fileType + ',') >= 0
      if (this.showViewAudio) {
        this.openAudioView()
        return
      }
      const zipExtName = 'zip,rar,'
      this.showViewZip = this.fileType && zipExtName.indexOf(this.fileType + ',') >= 0
      if (this.showViewZip) {
        this.openZipView()
        return
      }

      const pdfExtName = 'doc,docx,pdf,txt,xls,xlsx,cvs,'
      this.showViewPdf = this.fileType && pdfExtName.indexOf(this.fileType + ',') >= 0
      if (this.showViewPdf) {
        this.openPdfView()
        return
      }

      const photoExtName = 'gif,jpg,png,bmp,jfif,'
      this.showViewPhoto = this.fileType && photoExtName.indexOf(this.fileType + ',') >= 0
      if (this.showViewPhoto) {
        this.openPhotoView()
        return
      }
      this.showViewUnknown = true
      this.openUnknownView()
    },
    openOfficeView () {
      this.$nextTick(() => {
        this.$refs.viewOffice.fileId = this.fileId
        this.$refs.viewOffice.fileName = this.fileName
        this.$refs.viewOffice.init()
      })
    },
    openVideoView () {
      this.$nextTick(() => {
        this.$refs.viewVideo.fileId = this.fileId
        this.$refs.viewVideo.fileName = this.fileName
        this.$refs.viewVideo.init()
      })
    },
    openAudioView () {
      this.$nextTick(() => {
        this.$refs.viewAudio.fileId = this.fileId
        this.$refs.viewAudio.fileName = this.fileName
        this.$refs.viewAudio.init()
      })
    },
    openPdfView () {
      this.$nextTick(() => {
        this.$refs.viewPdf.fileId = this.fileId
        this.$refs.viewPdf.fileName = this.fileName
        this.$refs.viewPdf.init()
      })
    },
    openUnknownView () {
      this.$nextTick(() => {
        this.$refs.viewUnknown.fileId = this.fileId
        this.$refs.viewUnknown.fileName = this.fileName
        this.$refs.viewUnknown.init()
      })
    },
    openZipView () {
      this.$nextTick(() => {
        this.$refs.viewZip.fileId = this.fileId
        this.$refs.viewZip.fileName = this.fileName
        this.$refs.viewZip.init()
      })
    },
    openPhotoView () {
      this.$nextTick(() => {
        this.$refs.viewPhoto.fileId = this.fileId
        this.$refs.viewPhoto.fileName = this.fileName
        this.$refs.viewPhoto.init()
      })
    },
    fullscreen (val) {
      if (val) {
        this.height = '100%'
      } else {
        this.height = '500px'
      }
    },
    closeHandle () {
      this.$refs.viewOffice && this.$refs.viewOffice.destroyEditor()
      this.$refs.viewVideo && this.$refs.viewVideo.destroyVideo()
      this.$refs.viewAudio && this.$refs.viewAudio.destroyAudio()
      this.$refs.viewPdf && this.$refs.viewPdf.destroyPdf()
      this.$refs.viewUnknown && this.$refs.viewUnknown.destroyUnknown()
      this.showViewUnknown = false
      this.showViewPhoto = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>
</style>
