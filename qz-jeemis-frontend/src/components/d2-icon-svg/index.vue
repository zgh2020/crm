<template>
  <svg v-if="isSvgIcon" aria-hidden="true" :style="{height:size+'px',width:size+'px',verticalAlign: 'middle'}">
    <use :xlink:href="icon"></use>
  </svg>
  <img v-else aria-hidden="true" :src="img" :style="{height:size+'px',width:size+'px',verticalAlign: 'middle'}" />
</template>

<script>
export default {
  name: 'd2-icon-svg',
  props: {
    name: {
      type: String,
      required: false
    },
    size: {
      type: Number,
      required: false,
      default: 16
    }
  },
  computed: {
    isSvgIcon () {
      return !(this.name && this.name.length > 5 && '.png,.jpg,.gif'.indexOf(this.name.substring(this.name.length - 4)) >= 0)
    },
    icon () {
      let name = this.name
      if (this.name) { name = this.name.toLowerCase() } else { name = 'unknown' }
      if (name === 'png' || name === 'bpm') return '#d2-jpg'
      if (name === 'rar' || name === '7z' || name === 'jar' || name === 'groovy') return '#d2-zip'
      if (name === 'pptx') return '#d2-ppt'
      if (name === 'docx') return '#d2-doc'
      if (name === 'xlsx') return '#d2-xls'
      if (this.name && this.name.length > 4 && (this.name.substring(this.name.length - 4) === '.svg')) {
        name = this.name.substring(0, this.name.length - 4)
      }
      return `#d2-${name}`
    },
    img () {
      return require(`@/assets/img-icons/icons/${this.name}`)
    }
  }
}
</script>
