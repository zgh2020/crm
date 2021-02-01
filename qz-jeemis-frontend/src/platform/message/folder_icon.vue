<template>
    <!-- <i class="fa" :class="`fa-${name}`" aria-hidden="true"></i>-->
    <i v-if="name.startsWith('el-')" :class="`${name}`"></i>
    <i v-else :class="`${className} fa-${name}`" aria-hidden="true"></i>
</template>

<script>
export default {
  name: 'folder-icon',
  props: {
    id: {
      type: String,
      required: 1,
      default: '1'
    }
  },
  data () {
    return {
      className: 'far',
      name: 'envelope-open',
      isElement: false
    }
  },
  mounted () {
    switch (this.id) {
      case '1':
        this.name = 'envelope-open'
        return
      case '2':
        this.name = 'comment-alt'
        return
      case 'A':
        this.name = 'el-icon-collection-tag'
        return
      case '5':
        this.name = 'paper-plane'
        return
      case '6':
        this.name = 'el-icon-edit'
        return
      case '8':
        this.name = 'paper-plane'
        return
      case '9':
        this.name = 'trash-alt'
        return
      default:
        return false
    }
  },
  methods: {}
}
</script>
