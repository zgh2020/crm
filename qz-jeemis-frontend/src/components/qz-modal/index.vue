<template>
    <qz-modal-ext  showFooter
               :mask='false'
               resize
               v-bind="$attrs"
               v-on="$listeners" >
        <span slot="title"><d2-icon-svg name="d2-admin" style="margin-right: 8px" />{{title}}</span>
        <slot style="margin: 10px"></slot>
        <template slot="footer">
            <slot name="footer"></slot>
        </template>
    </qz-modal-ext>
</template>
<script>
import qzModalExt from './src/modal'
export default {
  name: 'qz-modal',
  components: { qzModalExt },
  props: {
    // 值
    title: {
      type: String,
      required: false,
      default: ''
    },
    // 图标
    icon: {
      type: String,
      required: false,
      default: 'd2-admin'
    }
  },
  data () {
    return {
      isFullscreen: false
    }
  },
  watch: {
    isFullscreen (val) {
      this.$emit('fullscreen', val)
    }
  }
}
</script>

<style lang="css">
    .qz-dialog-maximize {
        position: absolute;
        right: 40px;
        top: 15px;
        font-size: 12px;
        cursor: pointer;
        color: #a2a5ad;
    }
</style>
