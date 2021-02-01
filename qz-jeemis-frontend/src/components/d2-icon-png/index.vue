<template>
  <img aria-hidden="true" :src="icon" :style="{height:size+'px',width:size+'px',verticalAlign: 'middle'}" />
</template>

<script>
export default {
  name: 'd2-icon-png',
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
      return require(`@/assets/img-icons/icons/${this.name}`)
    }
  }
}
</script>
