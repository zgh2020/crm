<template>
    <el-row>
        <el-col :span="3">
            <el-upload :action="uploadUrl"
                       :before-upload="beforeUpload"
                       :on-progress="uploadProgress"
                       :on-success="uploadSuccess"
                       :show-file-list="false"
                       multiple
                       style="float: left">
                <el-button plain size="small">+附件</el-button>
            </el-upload>
        </el-col>
        <el-col :span="21">
            <div ref="wrapper" style="overflow: hidden">
                <div ref="fileContent">
                    <el-tag  v-for="item in fileList" :key="item.id" closable ref="fileItem" @close="handleClose(item)">
                        <d2-icon-svg v-if="item.fileType" :size="16" :name="item.fileType"/>
                        {{item.fileName}}
                    </el-tag>
                </div>
            </div>
            <el-progress :percentage="uploadPercent" v-if="showProgress"></el-progress>
        </el-col>
    </el-row>
</template>

<script>
import BScroll from 'better-scroll'
import * as api from './api'
import util from '@/libs/util'
export default {
  name: 'file-list',
  props: {
    // 值
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    folder: {
      type: String,
      required: false,
      default: ''
    },
    multipleFile: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      fileList: [],
      scroll: null,
      uploadUrl: api.uploadUrl(this.folder),
      uploadPercent: 0,
      showProgress: false,
      isUpdate: false
    }
  },
  mounted () {
    this.fileList = []
  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  methods: {
    scrollInit () {
      this.$nextTick(() => {
        let width = 0
        for (let i = 0; i < this.fileList.length; i++) {
          width += this.$refs.fileItem[i].$el.clientWidth
        }
        this.$refs.fileContent.style.width = width + 32 + 'px'

        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            mouseWheel: true,
            click: true,
            scrollX: true,
            scrollY: false
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    scrollDestroy () {
      if (this.scroll) {
        this.scroll.destroy()
      }
    },
    beforeUpload (file) {
      if (this.fileList.length > 0 && !this.multipleFile) {
        util.$message.showInfo2('只能选择一个文件')
        return false
      }
      this.showProgress = true
    },
    handleClose (tag) {
      this.fileList.splice(this.fileList.indexOf(tag), 1)
    },
    uploadProgress (event, file, fileList) {
      this.uploadPercent = Math.round(event.percent)
    },
    uploadSuccess (response, file, fileList) {
      this.uploadPercent = 100
      this.isUpdate = true
      const fileObj = {}
      fileObj.fileName = file.name
      fileObj.fileSize = file.size
      fileObj.fileId = response.data
      fileObj.id = util.getUUID()
      fileObj.fileType = util.extname(file.name)
      this.fileList.push(fileObj)
      this.scrollInit()
      this.showProgress = false
      this.uploadPercent = 0
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val.length < 1 && this.fileList.length > 0) {
          this.fileList.splice(0, this.fileList.length)
          return
        }
        if (val.length < 1) {
          return
        }
        if (this.fileList.length < 1) {
          this.fileList.push(...val)
          this.scrollInit()
          this.isUpdate = true
        }
      }
    },
    fileList (value) {
      if (!this.isUpdate) return
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
