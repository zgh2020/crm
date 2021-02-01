<template>
 <!-- <i class="fa" :class="`fa-${name}`" aria-hidden="true"></i>-->
 <!-- <i :class="`${className} fa-${name}`" aria-hidden="true"></i>-->
 <i v-if="name.startsWith('el-')" :class="`${name}`"></i>
 <i v-else :class="`${className} fa-${name}`" aria-hidden="true"></i>
</template>

<script>
export default {
  name: 'd2-icon',
  props: {
    name: {
      type: String,
      required: false,
      default: 'font-awesome'
    },
    className: {
      type: String,
      required: false,
      default: 'fas'
    }
  }
}
</script>
