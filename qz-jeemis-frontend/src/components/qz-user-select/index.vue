<template>
    <div style="background: #f0f5f9;overflow:hidden">
        <el-form label-width="110px" size="small"  ref="form" style="margin-top: 12px">
            <el-row :gutter="2">
                <el-col :span="10">
                    <el-form-item label="选择联系人：">
                        <el-input placeholder="请输入内容" v-model="searchName">
                            <el-button @click="searchHandle" icon="el-icon-search" slot="append"></el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2" align="right">
                    <el-button plain size="small" @click="selectItemAll" style="margin-right: 10px">{{btnAllText}}</el-button>
                </el-col>
                <el-col :span="10">
                    <label style="line-height:32px;margin-left: 10px">已选联系人 </label>
                </el-col>
                <el-col :span="2" align="right">
                    <label style="line-height:32px;margin-right: 20px"> {{listUserChecked.length}} 人 </label>
                </el-col>
            </el-row>
        </el-form>
            <el-row  >
                <el-col :span="12" >
                    <el-row class="breadcrumb">
                        <el-breadcrumb ref="breadcrumb" size="mini" separator-class="el-icon-arrow-right" style="margin:10px 10px 10px 10px;line-height:20px">
                            <el-breadcrumb-item v-for="item in listBreadcrumbs" v-bind:key="item.id">
                                <el-link  @click="clickBreadcrumbHandel(item)" underline  type="primary" style="font-size: 12px">{{item.name}}</el-link>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-row>
                    <el-row style="margin-top: 2px">
                        <list-box-user ref="listBoxUserAll"
                                       @onClickItem="clickItemHandle"
                                       @onClickCheckBox="clickCheckBoxAllHandle"
                                       :height="listAllUserHeight"
                                       class="list-box-user-select"/></el-row>
                </el-col>
                <el-col :span="12">
                    <list-box-user ref="listBoxUserSelect"   @onClickCheckBox="clickCheckBoxSelectHandle"
                                   type-select="true" :height="tableHeight"
                                   style="margin:0px 10px 10px 10px "/>
                </el-col>
            </el-row>

    </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'
import listBoxUser from './list-box-user'
import * as api from './api'
import util from '@/libs/util'
export default {
  name: 'qz-user-select',
  components: { listBoxUser },
  props: {
    // 是否多选
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否允许选择单位
    allowGroup: {
      type: Boolean,
      required: false,
      default: true
    },
    // 最大选择的项目
    maxSelect: {
      type: Number,
      required: false,
      default: 200
    },
    tableHeight: {
      type: Number,
      required: false,
      default: 300
    }
  },
  data () {
    return {
      searchName: '',
      selectCount: 0,
      btnAllText: '全选',
      pid: '',
      listAllUserHeight: '500px',
      // 上側面包屑
      listBreadcrumbs: [{ name: '联系人', id: '', pkid: '' }],
      // 所有的用户和机构
      listAllUser: [],
      // 被选中的用户和机构
      listSelectUser: [],
      // 初始被选中的机构和用户
      listUserChecked: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      addResizeListener(this.$refs.breadcrumb.$el, this.resizeListener)
    })
  },
  destroyed () {
    if (this.resizeListener) removeResizeListener(this.$refs.breadcrumb.$el, this.resizeListener)
  },
  methods: {
    init () {
      this.$nextTick(() => {
        api.getDeptAndUser(this.pid).then(data => {
          this.listAllUser = data
          this.setListSelectUser()
          this.$refs.listBoxUserAll.tableData = this.listAllUser
          this.$refs.listBoxUserSelect.tableData = this.listSelectUser
        })
      })
    },
    setListSelectUser () {
      this.listAllUser.forEach((item) => {
        // 注意 listAllUser listSelectUser 存的其实是一个item内存 注意
        if (this.listUserChecked.indexOf(item.id) >= 0) {
          item.checked = true
          this.listSelectUser.push(item)
        }
      })
    },
    async searchHandle () {
      const data = await api.getSearchDeptAndUser(this.searchName)
      this.listAllUser = data
      this.setListSelectUser()
      this.$refs.listBoxUserAll.tableData = this.listAllUser
      this.$refs.listBoxUserSelect.tableData = this.listSelectUser
    },
    clickBreadcrumbHandel (data) {
      this.pid = data.id
      this.init()
      const index = this.listBreadcrumbs.indexOf(data)
      if (index > 0) {
        this.listBreadcrumbs.splice(index + 1)
      } else {
        this.listBreadcrumbs.splice(1)
      }
    },
    clickItemHandle (data, typeSelect) {
      if (data.hasDept) {
        if (!data.checked) {
          this.pid = data.id
          this.listBreadcrumbs.push(data)
          this.init()
        } else {
          util.$message.showInfo2('已经选中机构、子机构及机构下所有人员！')
        }
      }
    },
    selectItemAll () {
      const checked = (this.btnAllText === '全选')
      if (checked) { this.btnAllText = '撤选' } else { this.btnAllText = '全选' }
      this.listAllUser.forEach((item) => {
        // 注意 listAllUser listSelectUser 存的其实是一个item内存 注意
        item.checked = checked
        this.clickCheckBoxAllHandle(item)
      })
    },
    clickCheckBoxAllHandle (data) {
      let index = -1
      if (data.checked) {
        index = this.listSelectUser.indexOf(data)
        if (index < 0) {
          this.listSelectUser.push(data)
          this.listUserChecked.push(data.id)
        }
      } else {
        index = this.listSelectUser.indexOf(data)
        this.listSelectUser.splice(index, 1)
        index = this.listUserChecked.indexOf(data.id)
        this.listUserChecked.splice(index, 1)
      }
    },
    clickCheckBoxSelectHandle (data) {
      let index = this.listSelectUser.indexOf(data)
      this.listSelectUser.splice(index, 1)
      index = this.listUserChecked.indexOf(data.id)
      this.listUserChecked.splice(index, 1)
    },
    resizeListener () {
      this.$nextTick(() => {
        this.listAllUserHeight = this.resizeListBoxUser()
      })
    },
    resizeListBoxUser () {
      const i = this.tableHeight - this.$refs.breadcrumb.$el.clientHeight - 22
      return i + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
    .breadcrumb{
        background: #ffffff;margin:0px 10px 0px 10px
    }
    .list-box-user-select{
        margin:0px 10px -50px 10px
    }
</style>
