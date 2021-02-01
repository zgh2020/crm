<template>

    <el-dialog
            :close-on-click-modal="false"
            :close-on-press-escape="true"
            :modal="false"
            :visible.sync="dialogVisible"
            @closed="closeDialog"
            top="9vh"
            v-qz-dialog-drag
            width="460px">
        <template slot="title">
            <div class="diaglogtitle">
                <d2-icon-svg class="dialog-icon" name="d2-admin"></d2-icon-svg>
                <span style="line-height: 0.5"> {{title}} </span>
            </div>
        </template>
        <el-form label-width="120px" ref="form">
            <el-form-item :label="valueLabel">
                <qz-inputcode :autoTranslate="true" :codeid="codeid"  @changeDesc="onChangeDesc" ref="inputCode"
                              style="width: 300px" v-model="currValue"></qz-inputcode>
            </el-form-item>
            <el-form-item :label="descriptionLabel">
                <el-input size="mini" style="width: 300px" v-model="currDescription"></el-input>
            </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">
             <el-button @click="closeDialog" size="mini">取 消</el-button>
             <el-button @click="onOk" size="mini" type="primary">确 定</el-button>
        </span>
    </el-dialog>

</template>

<script>
export default {
  name: 'com-codedialog1',
  components: {},
  props: {
    codeid: { default: 'AB' },
    value: {
      type: String,
      required: false,
      default: ''
    },
    valueLabel: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    descriptionLabel: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      title: '代码维护',
      currValue: '',
      currDescription: '',
      dialogVisible: false,
      isValueChange: false
    }
  },
  mounted () {
    this.isValueChange = false
    this.currValue = this.value
    this.currDescription = this.description
  },
  methods: {
    init () {
      this.dialogVisible = true
      this.currValue = this.value
      this.currDescription = this.description
    },
    onOk () {
      this.$emit('input', this.currValue)
      this.$emit('change', this.currValue, this.currDescription)
      this.$emit('closed')
      this.dialogVisible = false
    },

    onChangeDesc (value, desc) {
      if (this.value === value) return
      this.currDescription = desc
    },
    closeDialog () {
      this.$emit('closed')
    }
  },
  computed: {},
  watch: {
    searchkeys (value) {
      this.radiocurr = '搜索结果'
    }
  }
}
</script>

<style scoped>
    .codeshow {
        height: 360px;
        border: 1px solid #c8e9f6;
    }

    /*.el-tabs__content {
        margin: -10px;
    }*/

    /*el-tab-pane{
        margin: -10px;
    }*/

</style>
