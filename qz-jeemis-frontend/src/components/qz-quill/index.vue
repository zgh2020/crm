<template>
    <div>
        <quillEditor ref="quillEditor1" :options="editorOption" v-bind="$attrs" v-on="$listeners" :style="{height:height+'px'}"></quillEditor>
        <input v-show="false" type='file' @change="uploadImageHandle" accept="image/png,image/jpeg,image/gif,image/jpg"  ref='uploadFile'/>
        <input v-show="false" type='file' @change="uploadVideoHandle" accept="video/*"  ref='uploadVideo'/>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import util from '@/libs/util'
import * as api from './api'
import ImageResize from '@taoqf/quill-image-resize-module'
import VideoResize from 'quill-video-resize-module2'
//  注册拓展
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/videoResize', VideoResize)
// 注册字体大小
const Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '32px']
Quill.register(Size, true)
//  注册字体
const fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif']
const Font = Quill.import('formats/font')
Font.whitelist = fonts // 将字体加入到白名单
Quill.register(Font, true)

export default {
  components: {
    quillEditor
  },
  props: {
    // 值
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    height: {
      type: Number,
      required: false,
      default: 300
    },
    toolbars: {
      type: Array,
      required: false,
      default: null
    }
  },
  data () {
    return {
      // 富文本框参数设置
      editorOption: {
        modules: {
          imageResize: { modules: ['Resize', 'DisplaySize'] },
          videoResize: { },
          toolbar: {
            container: this.toolbars ? this.toolbars : [
              ['bold', 'italic', 'underline', 'strike'],
              [{ font: ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'] }],
              [{ size: ['10px', '12px', '14px', '16px', '18px', '20px', '32px'] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              [{ header: 1 }, { header: 2 }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ['clean'],
              ['image'],
              ['link', 'video']],
            handlers: {
              image: this.openSelectImageFile,
              video: this.openSelectVideoFile
            }
          }
        },
        placeholder: this.placeholder
      }
    }
  },
  methods: {
    openSelectImageFile () {
      //  [{ 'list': 'ordered' }, { 'list': 'bullet' }],[{ 'script': 'sub' }, { 'script': 'super' }],
      //  元素触发事件
      this.$refs.uploadFile.dispatchEvent(new MouseEvent('click'))
    },

    openSelectVideoFile () {
      //  元素触发事件
      this.$refs.uploadVideo.dispatchEvent(new MouseEvent('click'))
    },
    uploadImageHandle (event) {
      const param = new FormData() // 创建form对象
      const file = event.target.files[0]
      param.append('file', file, file.name)
      api.fileUpload(param).then((res) => {
        this.$refs.quillEditor1.quill.insertEmbed(this.$refs.quillEditor1.quill.selection.lastRange.axios, 'image', api.getImageUrl(res))
      }).catch((err) => {
        util.$message.showInfo2(err)
      })
    },
    uploadVideoHandle (event) {
      const param = new FormData() // 创建form对象
      const file = event.target.files[0]
      param.append('file', file, file.name)
      api.fileUpload(param).then((res) => {
        const url = api.getVideoUrl(res)
        this.$refs.quillEditor1.quill.insertEmbed(this.$refs.quillEditor1.quill.selection.lastRange.axios, 'video', url)
      }).catch((err) => {
        util.$message.showInfo2(err)
      })
    },

    test () {
      this.$refs.quillEditor1.quill.insertEmbed(this.$refs.quillEditor1.quill.selection.lastRange.axios, 'video', 'http://img.ksbbs.com/asset/Mon_1703/d30e02a5626c066.mp4')
    }
  }
}
</script>
<style lang="css">
    .ql-snow .ql-picker.ql-size,
    .ql-snow .ql-picker.ql-header {
        width: 75px !important;
    }

    .ql-snow .ql-picker.ql-font {
        width: 80px !important;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
        content: '10px';
        font-size: 10px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
        content: '12px';
        font-size: 12px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
        content: '14px';
        font-size: 14px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
        content: '16px';
        font-size: 16px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
        content: '18px';
        font-size: 18px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
        content: '20px';
        font-size: 20px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
        content: '32px';
        font-size: 32px;
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
        content: "宋体";
        font-family: "SimSun";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
        content: "黑体";
        font-family: "SimHei";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
        content: "微软雅黑";
        font-family: "Microsoft YaHei";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
        content: "楷体";
        font-family: "KaiTi";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
        content: "仿宋";
        font-family: "FangSong";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
        content: "Arial";
        font-family: "Arial";
    }

    .ql-font-SimSun {
        font-family: "SimSun";
    }

    .ql-font-SimHei {
        font-family: "SimHei";
    }

    .ql-font-Microsoft-YaHei {
        font-family: "Microsoft YaHei";
    }

    .ql-font-KaiTi {
        font-family: "KaiTi";
    }

    .ql-font-FangSong {
        font-family: "FangSong";
    }

    .ql-font-Arial {
        font-family: "Arial";
    }
</style>
