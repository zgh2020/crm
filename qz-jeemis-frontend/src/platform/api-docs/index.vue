<template>
  <d2-container-frame :src="src"/>
</template>

<script>
export default {
  data () {
    return {
      src: `${window.SITE_CONFIG.apiURL}/swagger-ui.html`
    }
  },
  mounted () {
    console.info(this.src)
  }
}
</script>
