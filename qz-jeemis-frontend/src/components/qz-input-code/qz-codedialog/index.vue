<template>

    <qz-dialog
            :visible.sync="visible"
            width="410px"
            top="9vh"
            append-to-body
            :title="title"
            @closed="closeDialog">
        <el-input ref="inputkeys" v-model="searchkeys" :spellcheck="false" @keydown.down.native="selectnextrow(1)"
                  @keydown.up.native="selectnextrow(-1)" @keydown.enter.native="onkeyenter"
                  @keydown.esc.native="onkeyesc"
                  size="small" placeholder="输入搜索内容"></el-input>
        <div>
            <el-radio-group v-model="radiocurr" size="mini" @change="onRadioChange">
                <el-radio-button label="最近使用"></el-radio-button>
                <el-radio-button label="全部代码"></el-radio-button>
                <el-radio-button label="搜索结果"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="codeshow">
            <listcode ref="listcode1" :codeid="codeid" :inputlayer="currinputlayer" :searchkeys.sync="searchkeys"
                      :typelist="'最近'" @onSelected="onSelected" v-show="radiocurr=='最近使用'">
            </listcode>
            <listcode ref="listcode2" :codeid="codeid" :inputlayer="currinputlayer" :searchkeys.sync="searchkeys"
                      @onSelected="onSelected" v-show="radiocurr=='搜索结果'">
            </listcode>
            <treecode ref="listcode3" class="codeshow" :codeid="codeid" :inputlayer="currinputlayer"
                      :oldvalue="oldvalue"
                      @onSelected="onSelected" @onFocusChange="onfoucuschage" v-show="radiocurr=='全部代码'">
            </treecode>
        </div>

    </qz-dialog>

</template>

<script>
import { getcodecollectinfo, savecoderecent } from './api.js'
import listcode from './listcode'
import treecode from './treecode'

export default {
  name: 'com-codedialog',
  components: { listcode, treecode },
  props: {
    codeid: { default: 'AB' },
    // 选择最底层  如果是-1则采用默认,  0 不用非得选最底层 1必须选最底层
    inputlayer: {
      type: Number,
      required: false,
      default: 9
    },
    oldvalue: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      title: '代码选择',
      collectdata: null, // 代码集合数据
      searchkeys: '',
      activeName: '最近使用',
      visible: false,
      radiocurr: '最近使用',
      currinputlayer: 9, //  使用默认
      switchcount: 0
    }
  },
  mounted () {

  },
  methods: {
    init (ekey) {
      this.visible = true
      this.$nextTick(() => {
        this.setcodedialoginfo()
        if (this.$refs.inputkeys) this.$refs.inputkeys.focus()
        if (ekey && ekey.key !== undefined) this.searchkeys = ekey.key
      })
    },
    // 设置代码窗的一些属性 如:最低层 代码窗体标题等
    setcodedialoginfo () {
      getcodecollectinfo(this.codeid).then(res => {
        let strdesc = res.description
        if (strdesc.length > 20) strdesc = strdesc.substr(0, 20)
        this.title = res.codeid + '-' + strdesc
        if (this.inputlayer === 9) this.currinputlayer = Number(res.layer)
      })
    },
    selectnextrow (dir) {
      if (this.radiocurr === '最近使用') this.$refs.listcode1.nextrow(dir)
      if (this.radiocurr === '搜索结果') this.$refs.listcode2.nextrow(dir)
    },

    onSelected (e) {
      savecoderecent(this.codeid, e.code)
      this.$emit('onSelected', e)
      this.visible = false
      this.closeDialog()
    },
    onkeyesc (e) {
      this.visible = false
      this.closeDialog()
    },
    onkeyenter () {
      switch (this.radiocurr) {
        case '最近使用':
          this.$refs.listcode1.getselcode()
          break
        case '全部代码':
          this.$refs.listcode3.getselcode()
          break
        case '搜索结果':
          this.$refs.listcode2.getselcode()
          break
      }
    },
    onRadioChange () {
      if (this.radiocurr === '全部代码') {
        this.$nextTick(() => {
          if (this.switchcount !== 1) this.$refs.listcode3.selcoderow(this.oldvalue)
          this.switchcount = 1
        })
      }
    },
    onfoucuschage () {
      this.$refs.inputkeys.focus()
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
</style>
