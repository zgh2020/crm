<template>
    <div class="btn1" @click="clickHandler">
        <div class="btn2" :style="{background:color}">
            <div class="btn3">
                <d2-icon-svg :size="16" :name="icon"/>
            </div>
        </div>
        <div class="text"><slot>{{title}}</slot></div>
    </div>
</template>

<script>

export default {
  name: 'button-shortcut',
  props: {
    // 值
    title: {
      type: String,
      required: false,
      default: '新快捷'
    },
    icon: {
      type: String,
      required: false,
      default: 'docx'
    },
    color: {
      type: String,
      required: false,
      default: '#63abf6'
    },
    shortcut: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {}
  },
  mounted () {
  },

  methods: {
    clickHandler (event) {
      this.$emit('click', event, this.shortcut)
    }
  }
}
</script>

<style lang="scss" scoped>
    .btn1 {
        cursor: pointer;
        display: inline-block;
        text-align: center;
        padding: 10px 14px;
        margin: 5px;
        .btn2 {
            width: 48px;
            height: 48px;
            background: #63abf6;
            border-radius: 12px;
            display: inline-block;
            position: relative;
            .btn3 {
                color: #63abf6;
                line-height: 30px;
                text-align: center;
                background: #fff;
                border-radius: 100%;
                font-size: 18px;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 30px;
                margin-left: -15px;
                margin-top: -15px;
                .text {
                    font-size: 12px;
                    line-height: 24px;
                }
            }
        }
        :hover {
            -moz-box-shadow:2px 2px 5px #8F8F8F; -webkit-box-shadow:2px 2px 5px #8F8F8F; box-shadow:2px 2px 5px #8F8F8F;
        }
    }
</style>
