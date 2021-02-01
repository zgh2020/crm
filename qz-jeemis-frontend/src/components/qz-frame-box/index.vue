<template>
    <div class="exframebox">
        <span class="extitle" :style="{width:widthx+'px'}">{{header}}</span>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'framebox',
  props: {
    header: { default: '' },
    widthx: { default: 100 }
  },
  mounted () {
    if (this.header.length < 10) { this.widthx = 100 } else { this.widthx = this.header.length * 15 }
  }
}
</script>

<style scoped>
    div.exframebox {
        margin-top: 30px ;
        margin-left: 8px;
        margin-right: 12px;
        padding: 12px;
        border: 1px solid #d4d4d4;
    }

    span.extitle {
        display: block;
        width: 100px;
        height: 30px;
        position: relative;
        top: -25px;
        left: 5px;
        text-align: center;
        background: white;
    }
</style>
