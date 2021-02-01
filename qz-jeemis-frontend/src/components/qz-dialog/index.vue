<template>
        <el-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :modal="false"
                    v-bind="$attrs"
                    v-on="$listeners"
                    ref="dlg"
                    v-qz-dialog-drag
                    :fullscreen="isFullscreen">
                <div slot="title" class="qzDialogTitle" @dblclick="isFullscreen=!isFullscreen">
                    <d2-icon-svg class="dialog-icon" :name="icon"></d2-icon-svg>
                    <span style="line-height: 0.5"> {{title}} </span>
                    <i @click="isFullscreen=true" v-if="allowMaximize && !isFullscreen" class="fa fa-window-maximize qz-dialog-maximize" aria-hidden="true"></i>
                    <i @click="isFullscreen=false" v-if="allowMaximize && isFullscreen" class="fa fa-window-restore qz-dialog-maximize" aria-hidden="true"></i>
                </div>
                <slot name="title"></slot>
                <slot></slot>
            <template slot="footer">
                <slot name="footer"></slot>
            </template>
        </el-dialog>
</template>
<script>

export default {
  name: 'qz-dialog',
  props: {
    // 值
    title: {
      type: String,
      required: false,
      default: ''
    },
    allowMaximize: {
      type: Boolean,
      required: false,
      default: true
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
      const dlg = this.$refs.dlg.$el.querySelector('.el-dialog')
      if (val) {
        this.dlgtop = getComputedStyle(dlg).top
        this.dlgleft = getComputedStyle(dlg).left
        dlg.style.top = '0px'
        dlg.style.left = null
      } else {
        dlg.style.top = this.dlgtop
        dlg.style.left = this.dlgleft
      }
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
