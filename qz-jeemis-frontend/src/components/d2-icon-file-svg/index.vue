<template>
  <svg aria-hidden="true" :style="{height:size+'px',width:size+'px',verticalAlign: 'middle'}">
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'd2-icon-file-svg',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 16
    }
  },
  computed: {
    icon () {
      let name = this.name
      if (!this.name) name = this.name.toLowerCase()
      if (name === 'png' || name === 'bpm') return '#d2-jpg'
      if (name === 'rar' || name === '7z' || name === 'jar' || name === 'groovy') return '#d2-zip'
      if (name === 'pptx') return '#d2-ppt'
      if (name === 'docx') return '#d2-doc'
      if (name === 'xlsx') return '#d2-xls'
      name = util.getFileIcon(name)
      return `#d2-${name}`
    }
  }
}
</script>
