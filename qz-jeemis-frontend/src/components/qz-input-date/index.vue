<template>
    <div  >
        <el-date-picker  align="right" clear-icon="el-icon-date"
                        placeholder="选择日期"
                        ref="date1"
                        type="date"
                        v-model="currentValue2" style="margin-left: -50px; margin-right: 50px;left: -20px; width: 0px;height: 19px;float: right">
        </el-date-picker>
        <el-input  :placeholder="placeholder"
                  clearable
                  v-bind="$attrs"
                  @dblclick.native="openpicker"
                  @change="onChange"
                  maxlength="18"
                  ref="input2"
                  :disabled="disabled"
                  :spellcheck="false"
                  v-model="currentDesc">
            <i v-if="suffix" @click="openpicker" class="el-input__icon el-icon-date" slot="suffix" style="cursor: pointer"></i>
        </el-input>
    </div>
</template>

<script>
import util from '@/libs/util'
import moment from 'moment'

export default {
  name: 'qz-inputdate',
  components: {},
  props: {
    // 值
    value: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: '输入日期'
    },
    valueFormat: {
      type: String,
      required: false,
      default: 'YYYY.MM' //  干部系统特有的格式
    },
    suffix: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      title: '组件标题',
      currentDesc: '',
      currentValue: '',
      currentValue2: null
    }
  },
  mounted () {
    this.$refs.date1.$el.style.visibility = 'hidden'
    // this.$refs.date1.$el.style.display = 'none'
  },
  methods: {
    init () {
    },
    onChange (val) {
      if (!val) {
        this.currentValue = ''
        this.currentDesc = ''
        return
      }
      const valtmp = util.$gen.FormatSDate(val)
      const valdate = moment(valtmp).format()
      if (valtmp && valdate !== 'Invalid date') {
        this.currentValue = valtmp
        this.currentDesc = moment(this.currentValue).format(this.valueFormat)
      } else {
        this.currentValue = ''
        this.currentDesc = ''
      }
    },
    openpicker () {
      if (this.disabled) return
      if (this.currentValue) {
        this.currentValue2 = this.currentValue
      }
      this.$refs.date1.pickerVisible = true
    }
  },

  computed: {},

  watch: {
    // 对外提供 v-model
    value: {
      handler (val) {
        if (this.currentValue !== val) {
          this.onChange(val)
        }
      },
      immediate: true
    },
    // 对外提供 v-model
    currentValue (val) {
      //  if (val) { this.$emit('input', moment(val).format(this.valueFormat)) } else { this.$emit('input', null) }
      if (val) { this.$emit('input', moment(val).format('YYYY-MM-DD hh:mm:ss')) } else { this.$emit('input', null) }
    },
    currentValue2 (val) {
      this.onChange(moment(val).format('YYYY-MM-DD hh:mm:ss'))
    }
  }
}
</script>

<style scoped>

</style>
