<template>
  <d2-container-frame :src="src"/>
</template>

<script>
export default {
  name: 'sys-druid',
  data () {
    return {
      src: `${window.SITE_CONFIG.apiURL}/druid/`
    }
  },
  mounted () {
    console.info(this.src)
  }
}
</script>
